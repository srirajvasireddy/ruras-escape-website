variable "project_name" {
  description = "Name used for the Project tag on the state bucket"
  type        = string
  default     = "ruras-escape-website"
}

variable "state_bucket_name" {
  description = "Globally-unique S3 bucket name to hold Terraform state for this repo"
  type        = string
  default     = "ruras-escape-website-tfstate"
}
