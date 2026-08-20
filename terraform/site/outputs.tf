output "bucket_name" {
  value       = aws_s3_bucket.site.bucket
  description = "Set as the S3_BUCKET_NAME repo variable in GitHub"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.site.id
  description = "Set as the CLOUDFRONT_DISTRIBUTION_ID repo variable in GitHub"
}

output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.site.domain_name
  description = "Add a CNAME for the rurasescape host -> this value in GoDaddy DNS"
}

output "github_actions_role_arn" {
  value       = aws_iam_role.github_actions_deploy.arn
  description = "Set as the AWS_DEPLOY_ROLE_ARN repo variable in GitHub"
}

output "acm_certificate_arn" {
  value = aws_acm_certificate.site.arn
}

output "acm_validation_records" {
  value = [
    for dvo in aws_acm_certificate.site.domain_validation_options : {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  ]
  description = "Add these CNAME record(s) in GoDaddy DNS to validate the ACM certificate"
}
