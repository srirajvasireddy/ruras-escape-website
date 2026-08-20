variable "project_name" {
  description = "Name used for the Project tag and as the prefix for created resource names"
  type        = string
  default     = "ruras-escape-website"
}

variable "site_domain" {
  description = "Domain CloudFront serves; a CNAME for this host points at the distribution in GoDaddy"
  type        = string
  default     = "rurasescape.srirajvasireddy.com"
}

variable "bucket_name" {
  description = "Globally-unique S3 bucket name to hold the built site"
  type        = string
  default     = "ruras-escape-website"
}

variable "aws_region" {
  description = "Region for the S3 bucket and the ACM certificate. CloudFront requires the certificate in us-east-1"
  type        = string
  default     = "us-east-1"
}

variable "price_class" {
  description = "CloudFront price class. PriceClass_100 is US/Canada/Europe only and is the cheapest"
  type        = string
  default     = "PriceClass_100"
}

variable "github_owner" {
  description = "GitHub username or org that owns this repo"
  type        = string
}

variable "github_repo" {
  description = "GitHub repo name (without owner)"
  type        = string
}

# The GitHub OIDC provider is an account-level singleton. The
# srirajvasireddy.com stack already creates one, so this defaults to
# reusing the existing provider rather than failing on EntityAlreadyExists.
variable "create_github_oidc_provider" {
  description = "Create the account's GitHub OIDC provider. Leave false if another stack already created it"
  type        = bool
  default     = false
}
