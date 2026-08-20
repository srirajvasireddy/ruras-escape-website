import { mkdir, readFile, writeFile } from 'node:fs/promises'

const dist = new URL('../dist/', import.meta.url)
const source = await readFile(new URL('index.html', dist), 'utf8')

const routes = [
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | Rura’s Escape',
    description: 'How Rura’s Escape handles player information, analytics, advertising, purchases and privacy choices.',
    robots: 'index, follow',
  },
  {
    path: 'terms',
    title: 'Terms of Use | Rura’s Escape',
    description: 'Terms governing Rura’s Escape, virtual items, purchases, rewarded ads and the official website.',
    robots: 'index, follow',
  },
  {
    path: 'support',
    title: 'Support | Rura’s Escape',
    description: 'Help with Rura’s Escape gameplay, purchases, rewarded ads, bugs and privacy questions.',
    robots: 'index, follow',
  },
]

const siteUrl = 'https://rurasescape.srirajvasireddy.com'
const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

function routeHtml({ path, title, description, robots }) {
  const url = `${siteUrl}/${path}`
  return source
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta\s+name="robots"[\s\S]*?\/>/, `<meta name="robots" content="${robots}" />`)
    .replace(/<link\s+rel="canonical"[\s\S]*?\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta\s+property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${url}" />`)
}

for (const route of routes) {
  const directory = new URL(`${route.path}/`, dist)
  await mkdir(directory, { recursive: true })
  await writeFile(new URL('index.html', directory), routeHtml(route))
}

const notFound = routeHtml({
  path: '404',
  title: 'Page not found | Rura’s Escape',
  description: 'The requested Rura’s Escape page could not be found.',
  robots: 'noindex, follow',
})
await writeFile(new URL('404.html', dist), notFound)

console.log(`Generated static route metadata for ${routes.length} routes and 404.html.`)
