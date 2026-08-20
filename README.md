# Rura's Escape — official website

Production marketing, legal, and support website for **Rura's Escape**, built for
`https://rurasescape.srirajvasireddy.com` with React 19, TypeScript, Vite,
Tailwind CSS, and React Router.

## Local development

```bash
npm install
npm run dev
npm run check
npm run preview
```

`npm run check` runs ESLint, the production build, route-metadata generation,
and production assertions for reward claims, disclosures, static routes,
deployment files, image formats, and the asset budget.

## Launch configuration

Runtime values live in `src/config/site.ts`:

- Set `googlePlayUrl` when the store listing becomes public. Until then, every
  Play CTA is an intentionally disabled “Coming soon” button.
- `supportEmail` must be a monitored player/privacy inbox.
- `privacyEmail` and `businessMailingAddress` are public legal-contact details.
- `publisher` must match the legal operator named in the Terms, Privacy Policy,
  store listing, contracts, and copyright notice.
- Update each legal “Last updated” date whenever its substantive text changes.
- Social links remain hidden while empty.

The current legal text is tailored to the implemented game behavior, including
local saves, optional opt-in Firebase analytics, optional rewarded ads, Google
Play Billing, deterministic virtual items, retention, and player choices. It is
not a substitute for approval by licensed counsel in the publisher's jurisdiction
and launch markets.

## Content and artwork

The active product page is `src/pages/HomePage.tsx`. Legal content is maintained
in `src/data/legal/privacy.ts` and `src/data/legal/terms.ts`.

Optimized files served to visitors live in `public/`. Larger source artwork that
must not be copied into the production bundle lives in `source-assets/`. Keep
below-the-fold images lazy-loaded, include intrinsic dimensions, and use WebP or
AVIF for new artwork. `npm run verify:production` enforces the current asset
budget and rejects legacy PNGs under `public/assets`.

## Routes and static metadata

The client routes are `/`, `/privacy-policy`, `/terms`, `/support`, and the 404
screen. After Vite builds, `scripts/postbuild.mjs` creates metadata-specific
static HTML for the three named secondary routes plus `404.html`. This lets
search engines and link-preview services see the correct title, description,
canonical, Open Graph URL, and indexing directive without executing JavaScript.

## Infrastructure as code

All AWS infrastructure for this site lives in `terraform/` — the S3 bucket,
the CloudFront distribution and its ACM certificate, the route-rewrite
function, the security-headers policy, and the IAM role GitHub Actions
assumes. It mirrors the `srirajvasireddy.com` stack, with real 404s instead of
SPA catch-all rewrites. See `terraform/README.md` for first-time setup.

```bash
cd terraform/site
terraform plan
terraform apply
```

DNS stays at GoDaddy: `rurasescape.srirajvasireddy.com` is a CNAME to the
CloudFront distribution, and the ACM certificate is validated by a CNAME added
there by hand. Terraform prints both records as outputs.

`deployment/cloudfront-function.js` and
`deployment/cloudfront-response-headers-policy.json` are read directly by the
Terraform config, so those checked-in files are the single source of truth for
routing and security headers. Changing either one requires a `terraform apply`;
the deploy workflow does not pick them up.

## Automated deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which installs
dependencies, runs `npm run check`, uploads `dist/` to S3, invalidates the
CloudFront HTML paths, and smoke-tests the live URLs. A failing lint, build,
or production assertion stops the deploy before anything reaches S3. Changes
under `terraform/` and to Markdown files do not trigger it. The workflow can
also be started manually from the Actions tab.

GitHub authenticates to AWS with short-lived OIDC credentials; no AWS keys are
stored in the repository. The role, its trust policy, and its permissions are
defined in `terraform/site/iam-oidc.tf`. After applying the stack, set these
repo variables from the Terraform outputs:

| Variable | Terraform output |
| --- | --- |
| `AWS_DEPLOY_ROLE_ARN` | `github_actions_role_arn` |
| `S3_BUCKET_NAME` | `bucket_name` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `cloudfront_distribution_id` |
| `AWS_REGION` | `us-east-1` (optional; workflow defaults to this) |

Uploads are ordered so content-hashed `assets/*` land first with
`public, max-age=31536000, immutable`, other static files get a one-week TTL,
HTML and crawler files get `no-cache`, and stale objects are deleted last — so
a visitor never sees HTML referencing an asset that is not yet uploaded. Add
required reviewers to the `production` environment in GitHub if you want
deploys to wait for approval.

## Deployment architecture

Terraform provisions all of this; the list is the reference for what the stack
guarantees.

1. CI runs `npm ci && npm run check` before any upload.
2. `dist/` syncs to a private S3 bucket reachable only through CloudFront
   Origin Access Control.
3. `deployment/cloudfront-function.js` runs as a viewer-request function. It
   rewrites only the known application routes to their metadata-specific
   `index.html` files. Unknown paths remain unknown.
4. CloudFront's 403 and 404 custom error responses serve `/404.html` while
   preserving an HTTP **404** response. Missing paths are never mapped to
   `/index.html`, which would create soft 404s.
5. The response-headers policy in
   `deployment/cloudfront-response-headers-policy.json` is attached to the
   default behavior, so production responses carry CSP, HSTS, frame
   protection, MIME-sniffing protection, Referrer-Policy, Permissions-Policy,
   and Cross-Origin-Opener-Policy.
6. Content-hashed `assets/*` are served with
   `public, max-age=31536000, immutable`; HTML is served `no-cache`.
7. The workflow invalidates HTML paths after deployment and smoke-tests every
   direct URL, including an unknown path.

## Store-launch controls outside this repository

Before enabling the Play Store URL:

- Complete Google Play Data Safety from actual Firebase, AdMob, UMP, Billing,
  support, and hosting behavior.
- Complete and document the target-audience determination. The current product
  configuration and legal flow are strictly 13+/general audience.
- The current individual publisher, mailing address, and shared support/privacy
  inbox are confirmed in `src/config/site.ts`; keep them synchronized with the
  store account and replace them everywhere if a company later becomes publisher.
- Confirm insurance, trademark clearance, contributor assignments, and asset licences.
- Test the final Android artifact, not only the website, including first-run
  Terms acceptance, analytics opt-in/out, UMP privacy options, billing recovery,
  refunds, and accessibility.
