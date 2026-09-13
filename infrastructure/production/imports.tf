# Adopt existing settings and DNS records; retained as migration documentation.
import {
  to = aws_s3_bucket_public_access_block.website
  id = "donamus.co-157409413604-us-west-1-an"
}
import {
  to = aws_route53_record.certificate["donamus.co"]
  id = "Z0963966IR8NSPCPJ9MA__66faa026c692bd771a4648b3ee3c817b.donamus.co_CNAME"
}
import {
  to = aws_route53_record.certificate["www.donamus.co"]
  id = "Z0963966IR8NSPCPJ9MA__c2b20c168b6bf864d9ff846239244080.www.donamus.co_CNAME"
}
import {
  to = aws_route53_record.apex_ipv4[0]
  id = "Z0963966IR8NSPCPJ9MA_donamus.co_A"
}
import {
  to = aws_route53_record.www[0]
  id = "Z0963966IR8NSPCPJ9MA_www.donamus.co_CNAME"
}
