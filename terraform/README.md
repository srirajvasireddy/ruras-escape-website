# Infrastructure

Static site hosted on S3, served through CloudFront (HTTPS via ACM). DNS stays
at GoDaddy: `rurasescape.srirajvasireddy.com` is a CNAME to CloudFront. Because
this is a subdomain of an existing GoDaddy domain, there is no apex forwarding
to set up — one CNAME is the whole DNS story.

Content deploys (build + sync to S3 + CloudFront invalidation) run in GitHub
Actions on every push to `main`. Infrastructure changes under `terraform/` are
applied manually from your machine, not from CI — the deploy workflow ignores
this directory.

This stack mirrors the `srirajvasireddy.com` infrastructure, with two
deliberate differences:

- **Real 404s.** That site maps every missing path to `/index.html` with a 200,
  which is correct for a pure SPA. This site prerenders its routes and must not
  emit soft 404s, so both 403 and 404 from S3 return `/404.html` with a genuine
  HTTP 404.
- **A viewer-request function and a response-headers policy** are attached to
  the default behavior. Both are read from `../deployment/`, which is also what
  `npm run verify:production` asserts against — one source of truth, not two
  copies that drift.

## Naming and tags

Every resource in both stacks is tagged `Project = ruras-escape-website` and
`ManagedBy = terraform`, and the names of the created resources — the OAC, the
CloudFront function, the IAM role — are prefixed with the same value. Both come
from the single `project_name` variable, so nothing inherits the naming of the
`srirajvasireddy.com` project it was modelled on.

The only places that string legitimately appears are the site's own domain
(`rurasescape.srirajvasireddy.com`) and `github_owner`, which has to match the
GitHub account for the OIDC trust policy to authenticate.

Two S3 buckets, both in **us-east-1**:

| Bucket | Stack | Holds |
|---|---|---|
| `ruras-escape-website` | `site` | The built site, private, read only by CloudFront |
| `ruras-escape-website-tfstate` | `bootstrap` | Terraform state, versioned and encrypted |

S3 bucket names are globally unique across all of AWS. If either name is
already taken, override `bucket_name` / `state_bucket_name` in your tfvars —
resource naming and tags come from `project_name`, so they are unaffected.

## One-time setup

### 1. AWS credentials

Use the same AWS account as the other site, or a separate one. Either works;
see step 3 for the one account-level detail that differs.

```
aws configure
```

### 2. Bootstrap the Terraform backend

Creates the S3 bucket holding Terraform's own state (locking is native to the
S3 backend via `use_lockfile`, no DynamoDB needed).

```
cd terraform/bootstrap
terraform init
terraform apply
```

You can skip this entirely and reuse the `srirajvasireddy-com-tfstate` bucket
instead — this stack's state key is already namespaced under
`ruras-escape-website/`, so the two projects cannot collide. Just point
`backend.hcl` at that bucket in the next step.

### 3. Configure and apply the site stack

```
cd terraform/site
cp backend.hcl.example backend.hcl               # edit if you changed the bucket name
cp terraform.tfvars.example terraform.tfvars     # fill in github_owner/github_repo
terraform init -backend-config=backend.hcl
terraform apply
```

**If you are deploying into a brand-new AWS account**, also set
`create_github_oidc_provider = true` in `terraform.tfvars`. The GitHub OIDC
provider is a per-account singleton, and the `srirajvasireddy.com` stack
already creates one — so in that account this stack reuses it (the default)
rather than failing with `EntityAlreadyExists`.

The ACM certificate can't be validated automatically because DNS lives at
GoDaddy, not Route53. On first apply:

1. Terraform creates the certificate and then waits on `aws_acm_certificate_validation`.
2. In another terminal, run `terraform output acm_validation_records` to see the CNAME name/value ACM needs.
3. Add that CNAME record in GoDaddy's DNS management for `srirajvasireddy.com`.
4. Wait for the original `terraform apply` to detect validation and finish (a few minutes after the DNS record is live).

### 4. Point DNS at CloudFront (GoDaddy dashboard)

In GoDaddy → `srirajvasireddy.com` → DNS, add a **CNAME**: host
`rurasescape`, pointing to the value of
`terraform output cloudfront_domain_name`.

### 5. Wire up GitHub Actions

In the GitHub repo → Settings → Secrets and variables → Actions → **Variables**:

| Variable | Value |
|---|---|
| `AWS_DEPLOY_ROLE_ARN` | `terraform output github_actions_role_arn` |
| `S3_BUCKET_NAME` | `terraform output bucket_name` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `terraform output cloudfront_distribution_id` |
| `AWS_REGION` | `us-east-1` (optional; the workflow defaults to this) |

These are plain repo variables, not secrets. The role ARN is safe to expose —
its trust policy already restricts who can assume it to GitHub Actions runs on
this repo's `main` branch or its `production` environment.

Push to `main` and the `deploy.yml` workflow will build and publish the site.

## Making infra changes later

```
cd terraform/site
terraform plan
terraform apply
```

Editing `deployment/cloudfront-function.js` or
`deployment/cloudfront-response-headers-policy.json` is an infrastructure
change: the deploy workflow will not pick it up, so run `terraform apply`
after changing either file.
