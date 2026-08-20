import { access, readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const root = new URL('../', import.meta.url)
let failures = 0

function check(label, condition) {
  if (!condition) failures += 1
  console.log(`${condition ? 'PASS' : 'FAIL'}  ${label}`)
}

async function exists(relative) {
  try { await access(new URL(relative, root)); return true } catch { return false }
}

const homeSource = await readFile(new URL('src/pages/HomePage.tsx', root), 'utf8')
check('truthful daily reward range is present', homeSource.includes('<b>10–25</b>'))
check('illustrative daily challenge total matches the economy', homeSource.includes('35 coins available'))
check('stale 50-coin completion claim is absent', !homeSource.includes('<small>COMPLETE FOR</small>'))
check('in-app purchase and rewarded-ad disclosure is prominent', homeSource.includes('Includes optional in-app purchases and optional rewarded video ads'))
check('earned-or-purchased currency wording is used', homeSource.includes('earned or purchased Rura Coins'))

for (const route of ['privacy-policy', 'terms', 'support']) {
  const path = `dist/${route}/index.html`
  check(`${route} has prerendered metadata`, await exists(path))
  if (await exists(path)) {
    const html = await readFile(new URL(path, root), 'utf8')
    check(`${route} has its own canonical`, html.includes(`/${route}`))
    check(`${route} does not use the homepage title`, !html.includes('<title>Rura&rsquo;s Escape | Mobile Puzzle Game</title>'))
  }
}

const bundleDirectory = new URL('dist/assets/', root)
const bundles = (await readdir(bundleDirectory)).filter((name) => name.endsWith('.js'))
const bundleSources = await Promise.all(
  bundles.map((name) => readFile(new URL(name, bundleDirectory), 'utf8')),
)
const measurementId = (await readFile(new URL('src/config/site.ts', root), 'utf8')).match(/googleMeasurementId: '([^']+)'/)?.[1]
check('a Google Analytics measurement id is configured', Boolean(measurementId))
check('the analytics tag ships in the built bundle', bundleSources.some((source) => measurementId && source.includes(measurementId)))
check('page views are sent by the app rather than the tag', bundleSources.some((source) => source.includes('send_page_view')))

const privacySource = await readFile(new URL('src/data/legal/privacy.ts', root), 'utf8')
check('the privacy policy discloses website analytics', privacySource.includes('Google Analytics 4'))
check('the privacy policy no longer claims the site sets no analytics cookies', !privacySource.includes('does not currently use advertising or analytics cookies'))

const csp = JSON.parse(await readFile(new URL('deployment/cloudfront-response-headers-policy.json', root), 'utf8'))
  .ResponseHeadersPolicyConfig.SecurityHeadersConfig.ContentSecurityPolicy.ContentSecurityPolicy
check('CSP allows the analytics tag to load', /script-src [^;]*googletagmanager\.com/.test(csp))
check('CSP allows analytics measurement requests', /connect-src [^;]*google-analytics\.com/.test(csp))
check('CSP still blocks inline script', !/script-src [^;]*unsafe-inline/.test(csp))

check('a deployable 404 document exists', await exists('dist/404.html'))
check('CloudFront route function is documented as code', await exists('deployment/cloudfront-function.js'))
check('CloudFront security headers policy is present', await exists('deployment/cloudfront-response-headers-policy.json'))

const assetDirectory = new URL('public/assets/', root)
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory.pathname, entry.name)
    return entry.isDirectory() ? walk(new URL(`file://${path}/`)) : path
  }))
  return nested.flat()
}
const assets = await walk(assetDirectory)
check('website asset directory contains no legacy PNG payloads', !assets.some((path) => path.endsWith('.png')))
const assetBytes = (await Promise.all(assets.map(async (path) => (await stat(path)).size))).reduce((sum, size) => sum + size, 0)
check('website asset payload stays below 6 MiB', assetBytes < 6 * 1024 * 1024)

if (failures > 0) {
  console.error(`\n${failures} production verification check(s) failed.`)
  process.exitCode = 1
} else {
  console.log('\nAll production website checks passed.')
}

