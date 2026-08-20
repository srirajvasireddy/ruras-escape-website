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

## S3 and CloudFront deployment

1. Run `npm ci && npm run check` in CI.
2. Sync `dist/` to a private S3 bucket through CloudFront Origin Access Control.
3. Associate `deployment/cloudfront-function.js` as a viewer-request function.
   It rewrites only the known application routes to their metadata-specific
   `index.html` files. Unknown paths remain unknown.
4. Configure CloudFront's 403 and 404 custom error responses to use `/404.html`
   while preserving an HTTP **404** response. Do not map every missing path to
   `/index.html`, which creates soft 404s.
5. Create/attach the response-headers policy described by
   `deployment/cloudfront-response-headers-policy.json`. Confirm the production
   response contains CSP, HSTS, frame protection, MIME-sniffing protection,
   Referrer-Policy, Permissions-Policy, and Cross-Origin-Opener-Policy.
6. Serve content-hashed `assets/*` with `public, max-age=31536000, immutable`.
   Serve HTML with `no-cache` or a short TTL.
7. Invalidate HTML paths after deployment and smoke-test every direct URL,
   including an unknown path.

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
