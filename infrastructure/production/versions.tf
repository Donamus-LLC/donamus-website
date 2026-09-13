terraform {
  required_version = ">= 1.10, < 2.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
  backend "s3" {
    bucket       = "donamus-terraform-state-157409413604-us-west-1"
    key          = "website/production.tfstate"
    region       = "us-west-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region              = "us-west-1"
  allowed_account_ids = ["157409413604"]
  default_tags {
    tags = { Project = "donamus-website", Environment = "production", ManagedBy = "Terraform" }
  }
}

provider "aws" {
  alias               = "certificate"
  region              = "us-east-1"
  allowed_account_ids = ["157409413604"]
}
