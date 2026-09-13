variable "publish_dns" {
  description = "Enable only after the CloudFront endpoint passes the pre-cutover checks."
  type        = bool
  default     = false
}

locals {
  domain  = "donamus.co"
  zone_id = "Z0963966IR8NSPCPJ9MA"
  bucket  = "donamus.co-157409413604-us-west-1-an"
}

data "aws_s3_bucket" "website" {
  bucket = local.bucket
}

resource "aws_acm_certificate" "website" {
  provider                  = aws.certificate
  domain_name               = local.domain
  subject_alternative_names = ["www.${local.domain}"]
  validation_method         = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "certificate" {
  for_each = toset([local.domain, "www.${local.domain}"])
  zone_id  = local.zone_id
  name     = one([for option in aws_acm_certificate.website.domain_validation_options : option.resource_record_name if option.domain_name == each.key])
  type     = "CNAME"
  ttl      = 300
  records  = [one([for option in aws_acm_certificate.website.domain_validation_options : option.resource_record_value if option.domain_name == each.key])]

}

resource "aws_acm_certificate_validation" "website" {
  provider                = aws.certificate
  certificate_arn         = aws_acm_certificate.website.arn
  validation_record_fqdns = [for record in aws_route53_record.certificate : record.fqdn]
}

resource "aws_cloudfront_origin_access_control" "website" {
  name                              = "donamus-production-s3"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_function" "routes" {
  name    = "donamus-production-static-routes"
  runtime = "cloudfront-js-2.0"
  comment = "Resolve Next.js static export routes to their HTML objects."
  publish = true
  code    = file("${path.module}/routes.js")
}

data "aws_cloudfront_cache_policy" "uncached" {
  name = "Managed-CachingDisabled"
}

data "aws_cloudfront_cache_policy" "immutable" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_response_headers_policy" "revalidate" {
  name = "donamus-production-revalidate"
  custom_headers_config {
    items {
      header   = "Cache-Control"
      value    = "public, max-age=0, must-revalidate"
      override = true
    }
  }
}

resource "aws_cloudfront_distribution" "website" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Donamus production website"
  aliases             = [local.domain, "www.${local.domain}"]
  default_root_object = "index.html"
  price_class         = "PriceClass_100"
  http_version        = "http2and3"
  wait_for_deployment = true

  origin {
    domain_name              = data.aws_s3_bucket.website.bucket_regional_domain_name
    origin_id                = "donamus-production-s3"
    origin_access_control_id = aws_cloudfront_origin_access_control.website.id
  }

  default_cache_behavior {
    target_origin_id           = "donamus-production-s3"
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    cache_policy_id            = data.aws_cloudfront_cache_policy.uncached.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.revalidate.id
    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.routes.arn
    }
  }

  ordered_cache_behavior {
    path_pattern           = "_next/static/*"
    target_origin_id       = "donamus-production-s3"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    cache_policy_id        = data.aws_cloudfront_cache_policy.immutable.id
  }

  # A private S3 origin returns 403 for missing objects. Preserve a real 404 status.
  dynamic "custom_error_response" {
    for_each = toset([403, 404])
    content {
      error_code            = custom_error_response.value
      response_code         = 404
      response_page_path    = "/404.html"
      error_caching_min_ttl = 0
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.website.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_policy" "website" {
  bucket = local.bucket
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "CloudFrontReadOnly"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${data.aws_s3_bucket.website.arn}/*"
      Condition = { StringEquals = { "AWS:SourceArn" = aws_cloudfront_distribution.website.arn } }
    }]
  })
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket                  = local.bucket
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_route53_record" "apex_ipv4" {
  count   = var.publish_dns ? 1 : 0
  zone_id = local.zone_id
  name    = local.domain
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "apex_ipv6" {
  count   = var.publish_dns ? 1 : 0
  zone_id = local.zone_id
  name    = local.domain
  type    = "AAAA"
  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

# Retain the existing www CNAME; both hostnames are covered by CloudFront and ACM.
resource "aws_route53_record" "www" {
  count   = var.publish_dns ? 1 : 0
  zone_id = local.zone_id
  name    = "www.${local.domain}"
  type    = "CNAME"
  ttl     = 300
  records = [local.domain]
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.website.domain_name
}
output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.website.id
}
output "website_url" {
  value = "https://${local.domain}"
}
