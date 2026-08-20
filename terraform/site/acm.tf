resource "aws_acm_certificate" "site" {
  domain_name       = var.site_domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# DNS lives at GoDaddy, not Route53, so Terraform can't create the
# validation record itself. Apply once to create the certificate, add
# the printed CNAME to GoDaddy DNS, then apply again to let this
# resource observe the validation and complete.
resource "aws_acm_certificate_validation" "site" {
  certificate_arn = aws_acm_certificate.site.arn
}
