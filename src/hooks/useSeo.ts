import { useEffect } from 'react'
import { siteConfig } from '../config/site'
import { reportPageMetadata } from '../lib/analytics'

export interface SeoOptions {
  /** Full document title, including any suffix. */
  title: string
  description: string
  /** Route path, e.g. `/support`. Used for the canonical and og:url. */
  path: string
  /** Absolute or root-relative image path. Defaults to the site OG image. */
  image?: string
  /** Set false for legal/utility pages that should not be indexed separately. */
  index?: boolean
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

/**
 * Applies per-route document metadata.
 *
 * This is a static single-page site, so metadata is set on the client rather
 * than pre-rendered. Crawlers that execute JavaScript pick it up; the static
 * fallbacks in index.html cover the rest.
 */
export function useSeo({ title, description, path, image, index = true }: SeoOptions): void {
  useEffect(() => {
    const url = `${siteConfig.websiteUrl}${path === '/' ? '' : path}`
    const imageUrl = `${siteConfig.websiteUrl}${image ?? siteConfig.ogImage}`

    document.title = title

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[name="robots"]', 'name', 'robots', index ? 'index, follow' : 'noindex, follow')

    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl)
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', siteConfig.name)

    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    // Release the queued page view now that this route's title is on the
    // document, so analytics never reports the previous page's title.
    reportPageMetadata(path, title)
  }, [title, description, path, image, index])
}
