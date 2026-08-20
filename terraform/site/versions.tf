terraform {
  required_version = ">= 1.10.0" # needed for native S3 state locking

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    # bucket/region filled in via -backend-config, or copy
    # backend.hcl.example to backend.hcl and run:
    # terraform init -backend-config=backend.hcl
    #
    # The key is repo-scoped so this state can safely share a bucket with
    # the other srirajvasireddy.com stacks if you point it at that bucket.
    key          = "ruras-escape-website/site/terraform.tfstate"
    use_lockfile = true
  }
}

# CloudFront requires its ACM certificate in us-east-1, and everything
# else in this stack is global or cheap to co-locate there.
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project   = var.project_name
      ManagedBy = "terraform"
    }
  }
}
