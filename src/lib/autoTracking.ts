/**
 * Site-wide automatic tracking: every click, how far people read, which
 * sections they actually reach, and any script error they hit.
 *
 * Components only need explicit `trackEvent` calls for things the DOM cannot
 * describe on its own (puzzle moves, accordion state, ...). Anything an element
 * already expresses -- a label, a destination, the section it sits in -- is
 * captured here so new links and buttons are tracked the day they ship.
 *
 * Opt an element out with `data-analytics-skip` when its component sends a
 * richer event of its own, so a single interaction is not counted twice.
 */
import { describeElement, resolveSection, trackEvent } from './analytics'

const INTERACTIVE_SELECTOR = 'a[href], button, [role="button"], summary'
const SCROLL_MILESTONES = [25, 50, 75, 90]
const SECTION_SELECTOR = 'section[id], [data-analytics-section]'
/** Second sweep for sections that arrive with a lazily loaded route. */
const SECTION_RESCAN_MS = 800
/** Grace period for a lazily loaded route to replace its loading placeholder. */
const PAGE_SETTLE_MS = 900

function parseUrl(value: string): URL | null {
  try {
    return new URL(value, window.location.href)
  } catch {
    return null
  }
}

function elementType(element: Element): string {
  if (element instanceof HTMLAnchorElement) return 'link'
  if (element instanceof HTMLButtonElement) return 'button'
  return element.getAttribute('role') ?? element.tagName.toLowerCase()
}

function onDocumentClick(event: MouseEvent): void {
  const source = event.target instanceof Element ? event.target : null
  const element = source?.closest(INTERACTIVE_SELECTOR)
  if (!element || element.closest('[data-analytics-skip]')) return

  const shared = {
    element_text: describeElement(element),
    element_type: elementType(element),
    element_id: element.id || undefined,
    section: resolveSection(element),
    page_path: window.location.pathname,
  }

  const href = element.getAttribute('href')
  if (href?.startsWith('mailto:') || href?.startsWith('tel:')) {
    trackEvent('contact_click', {
      ...shared,
      method: href.startsWith('mailto:') ? 'email' : 'phone',
      contact_target: href.slice(href.indexOf(':') + 1).split('?')[0],
    })
    return
  }

  const url = href ? parseUrl(href) : null
  if (url && url.origin !== window.location.origin) {
    // Same event name GA4 enhanced measurement uses, so outbound clicks show up
    // in the standard report alongside anything the tag detects itself.
    trackEvent('click', {
      ...shared,
      link_url: url.href,
      link_domain: url.hostname,
      outbound: true,
    })
    return
  }

  trackEvent('ui_click', { ...shared, link_url: url ? `${url.pathname}${url.hash}` : undefined })
}

function onError(event: ErrorEvent): void {
  trackEvent('exception', {
    description: `${event.message} (${event.filename}:${event.lineno})`.slice(0, 150),
    fatal: false,
    page_path: window.location.pathname,
  })
}

function onRejection(event: PromiseRejectionEvent): void {
  trackEvent('exception', {
    description: `Unhandled rejection: ${String(event.reason)}`.slice(0, 150),
    fatal: false,
    page_path: window.location.pathname,
  })
}

/**
 * Installs the listeners that live for the whole session. Returns a cleanup so
 * React can tear them down.
 */
export function startInteractionTracking(): () => void {
  document.addEventListener('click', onDocumentClick, true)
  window.addEventListener('error', onError)
  window.addEventListener('unhandledrejection', onRejection)

  return () => {
    document.removeEventListener('click', onDocumentClick, true)
    window.removeEventListener('error', onError)
    window.removeEventListener('unhandledrejection', onRejection)
  }
}

function startScrollTracking(): () => void {
  let deepest = 0
  let queued = false
  const startedAt = performance.now()

  const measure = () => {
    queued = false
    // A lazily loaded route shows a short placeholder before its real content
    // arrives, which would otherwise read as a fully scrolled page. Ignore that
    // window unless the visitor has actually scrolled.
    if (window.scrollY === 0 && performance.now() - startedAt < PAGE_SETTLE_MS) return

    const doc = document.documentElement
    const scrollable = doc.scrollHeight - window.innerHeight
    const percent =
      scrollable <= 0
        ? 100
        : Math.min(100, Math.round(((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100))

    for (const milestone of SCROLL_MILESTONES) {
      if (percent >= milestone && deepest < milestone) {
        deepest = milestone
        trackEvent('scroll_depth', {
          percent_scrolled: milestone,
          page_path: window.location.pathname,
        })
      }
    }
  }

  const onScroll = () => {
    if (queued) return
    queued = true
    window.requestAnimationFrame(measure)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  const settle = window.setTimeout(measure, PAGE_SETTLE_MS)

  return () => {
    window.clearTimeout(settle)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }
}

function startSectionTracking(): () => void {
  if (typeof IntersectionObserver === 'undefined') return () => {}

  const observed = new WeakSet<Element>()
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        trackEvent('section_view', {
          section: resolveSection(entry.target),
          page_path: window.location.pathname,
        })
      }
    },
    // Fires once a section reaches the middle band of the viewport, which works
    // for sections both shorter and taller than the screen.
    { rootMargin: '-25% 0px -25% 0px' },
  )

  const scan = () => {
    document.querySelectorAll(SECTION_SELECTOR).forEach((section) => {
      if (observed.has(section)) return
      observed.add(section)
      observer.observe(section)
    })
  }

  scan()
  const rescan = window.setTimeout(scan, SECTION_RESCAN_MS)

  return () => {
    window.clearTimeout(rescan)
    observer.disconnect()
  }
}

/**
 * Per-route engagement tracking. Call on every navigation so scroll depth and
 * section views are measured against the page currently on screen.
 */
export function startPageEngagementTracking(): () => void {
  const stopScroll = startScrollTracking()
  const stopSections = startSectionTracking()
  return () => {
    stopScroll()
    stopSections()
  }
}
