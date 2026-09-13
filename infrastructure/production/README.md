# Production website infrastructure

Account `157409413604`; infrastructure source is maintained in this repository.

Traffic flows from Route 53 (`donamus.co`, `www.donamus.co`) through CloudFront
with an ACM certificate to the existing website bucket in `us-west-1`.
CloudFront signs S3 requests with Origin Access Control. The bucket's public
access is blocked; its previously enabled website endpoint is not used.

This configuration manages the production distribution, certificate and its DNS
validation, bucket read policy/public-access block, and production web records.
The bucket itself is an existing data source: Terraform does not manage or delete
website objects. Email records and the old server remain outside this
configuration. The previous staging resources have been retired (see below).

## Work with Terraform

Install Terraform >= 1.10 and configure AWS CLI credentials for account
`157409413604` with infrastructure administration permissions. The GitHub deployment
user only uploads site files and should not be used to apply this infrastructure.

```sh
cd infrastructure/production
terraform init
terraform fmt -check
terraform validate
node --test routes.test.mjs
terraform plan -out=production.tfplan
terraform apply production.tfplan
```

Review each plan before applying. CI checks formatting, validates Terraform without state access, and runs the route
tests. Applying infrastructure is manual; pushing
`develop` does not apply Terraform or deploy production site content.
`production.auto.tfvars` enables the live DNS records after the initial cutover.
Do not disable `publish_dns` after cutover: Terraform would remove those records.

## State storage

State is encrypted in the dedicated versioned bucket
`donamus-terraform-state-157409413604-us-west-1`, key
`website/production.tfstate`. S3 lock files prevent concurrent applies. This bucket
was bootstrapped with AWS CLI before `terraform init`, and is intentionally outside
this stack so destroying the stack cannot destroy its own history.

Bootstrap settings: region `us-west-1`, all four public-access blocks enabled,
versioning Enabled, default encryption AES256. Preserve this bucket and its object
versions. Terraform administrators need access to the state object and `.tflock`
object. Never store state or credentials in Git; `.terraform/`, state, and plans
are ignored. Commit `.terraform.lock.hcl` to retain verified provider versions. When changing
providers, record checksums for the CI runner and development machine with
`terraform providers lock -platform=linux_amd64 -platform=darwin_amd64`.

## Routing and caching

`routes.js` maps `/` to `/index.html` and clean page paths to `.html`, preserving
asset and Next.js `.txt` prefetch requests. Missing S3 objects return the site's
404 page with HTTP 404, not a successful homepage response.

Only hashed `/_next/static/*` assets are cached at CloudFront. Other files use the
managed CachingDisabled policy so HTML and navigation payload updates are visible
without invalidation. A response headers policy forces browser revalidation for
these paths, overriding the deployment workflow’s blanket immutable S3 metadata.
Hashed assets retain their long-lived browser cache headers.

## Initial migration and rollback

Before cutover the apex A record was `3.228.142.237`, TTL 300; `www` was a CNAME to
`donamus.co`, TTL 300. The previous server is retained. To roll back, update the
apex A record to that address and remove the new apex AAAA record together in a
Route 53 change batch. Leave `www` pointing at the apex. Also reconcile this
configuration before the next apply, otherwise Terraform restores CloudFront.

The initial migration imports the existing bucket public-access block, matching
ACM validation records, apex A record, and www CNAME rather than replacing the
hosted zone. Create and validate CloudFront first, test its endpoint, then import
web records with `publish_dns=true` and apply the DNS-only cutover plan.

## Deployed resources

- Website: `https://donamus.co` and `https://www.donamus.co`
- CloudFront distribution: `E3OU6HP7TR8UIA`
- CloudFront endpoint: `d2b5zfqyi41sqe.cloudfront.net`
- Origin bucket: `donamus.co-157409413604-us-west-1-an`
- Route 53 hosted zone: `Z0963966IR8NSPCPJ9MA`

Pre-cutover checks covered all five pages, trailing-slash routes, Next.js prefetch
payloads, assets, 404s, HTTP-to-HTTPS redirects, TLS for both domain names, and
browser client navigation. Direct unsigned S3 reads return 403 as intended.

## Staging retirement — September 13, 2026

The unused `new.donamus.co` and `www.new.donamus.co` sites were removed with AWS CLI
after checking for shared dependencies:

- Deleted CloudFront distribution `E1YV7TCT4Y78AU` after disabling it and waiting
  for deployment to complete.
- Deleted its dedicated origin access control `E1U7W4NVWZWKX7` and the ACM
  certificate ending in `0a524f19-fbbf-4ace-a494-2b747ee22da9` in `us-east-1`.
- Deleted both S3 buckets, including all 38 versions in `new.donamus.co` and the
  empty `www.new.donamus.co` redirect bucket.
- Deleted the two staging web aliases and their two certificate-validation CNAMEs.

The distribution had no Lambda/CloudFront function associations, WAF attachment,
or custom cache policy. The buckets had no replication, notifications, access
points, or logging destinations. The certificate and origin access control were
not shared. These resources were never part of the production Terraform state;
no state removal or Terraform destroy was needed.

Production DNS, its certificate/distribution, the website bucket, the Terraform
state bucket, email records, and the previous production server were preserved.
The production bucket's website-hosting setting is managed separately by the
owner; this retirement did not change it.
