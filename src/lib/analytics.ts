/**
 * Google Analytics 4 wiring for the marketing site.
 *
 * The tag is injected from here rather than from an inline snippet in
 * index.html so the production Content-Security-Policy can keep
 * `script-src 'self' https://www.googletagmanager.com` without needing
 * `unsafe-inline` or a per-build hash.
 *
 * Components should not touch `window.gtag` directly -- call `trackEvent` so
 * every event goes through the same guard, parameter cleanup and dev logging.
 */
import { siteConfig } from '../config/site'

/** Parameter values GA4 accepts. `undefined` entries are dropped before sending. */
export type AnalyticsParams = Record<string, string | number | boolean | undefined>

type ConsentState = Record<string, 'granted' | 'denied'>

type GtagCommand =
  | ['js', Date]
  | ['config', string, AnalyticsParams]
  | ['event', string, AnalyticsParams]
  | ['consent', 'default' | 'update', ConsentState]

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: GtagCommand) => void
  }
}

/**
 * `VITE_GA_MEASUREMENT_ID` overrides the checked-in id, which is handy for a
 * staging property. `VITE_GA_DEBUG=true` turns the tag on during `npm run dev`
 * and routes events into the GA DebugView.
 */
const measurementId = String(
  import.meta.env.VITE_GA_MEASUREMENT_ID ?? siteConfig.analytics.googleMeasurementId,
).trim()

const debugMode = import.meta.env.VITE_GA_DEBUG === 'true'

/** True when a real tag should load. Dev builds only log unless GA debug is on. */
export const isAnalyticsEnabled = measurementId.length > 0 && (import.meta.env.PROD || debugMode)

/** Longest element label or title sent as an event parameter. */
const MAX_TEXT_LENGTH = 80

/** How long a queued page view waits for its route to report a title. */
const PAGE_VIEW_TIMEOUT_MS = 800

let initialized = false

function clean(params: AnalyticsParams): AnalyticsParams {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined))
}

/**
 * Loads gtag.js and configures the property. Safe to call more than once.
 */
export function initAnalytics(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  if (!isAnalyticsEnabled) {
    if (import.meta.env.DEV) {
      console.debug('[analytics] disabled — events are logged instead of sent')
    }
    return
  }

  const dataLayer: unknown[] = window.dataLayer ?? []
  window.dataLayer = dataLayer

  // gtag.js only treats an Arguments object in the data layer as a command.
  // Pushing a plain array instead makes the tag file it as a data-layer
  // variable and silently ignore it -- the tag loads and never sends a hit.
  // Do not "modernize" this into `dataLayer.push(args)`.
  function gtag(...args: GtagCommand): void {
    void args
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments)
  }
  window.gtag = gtag

  // Consent Mode v2. The website itself runs no advertising and stores no ad
  // identifiers, so every advertising signal stays denied; measurement storage
  // is what the analytics property actually needs.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })

  gtag('js', new Date())
  gtag('config', measurementId, {
    // Route changes are reported by trackPageView so each SPA navigation is
    // counted exactly once, with the title the route actually applied.
    send_page_view: false,
    // Only send debug_mode when it is on; passing false tags every event with
    // a pointless ep.debug_mode parameter.
    ...(debugMode ? { debug_mode: true } : {}),
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.appendChild(script)
}

/**
 * Sends one GA4 event. Every tracked interaction on the site funnels through
 * here, so this is the single place to add shared parameters or a kill switch.
 */
export function trackEvent(name: string, params: AnalyticsParams = {}): void {
  const payload = clean({ ...params, debug_mode: debugMode || undefined })

  if (!isAnalyticsEnabled) {
    if (import.meta.env.DEV) console.debug('[analytics]', name, payload)
    return
  }

  window.gtag?.('event', name, payload)
}

function sendPageView(path: string, title: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: title,
  })
}

let pending: { path: string; pathname: string; timer: number } | null = null
const reportedTitles = new Map<string, string>()

function flush(path: string, title: string): void {
  if (pending) window.clearTimeout(pending.timer)
  pending = null
  sendPageView(path, title)
}

/**
 * Reports the page view for a route change.
 *
 * Route components apply their own document title, and a lazily loaded route
 * does it a beat after the URL changes. So the view is sent as soon as the
 * route's title is known, and otherwise held until `reportPageMetadata`
 * confirms it -- or until the fallback timer fires, so a page that never
 * reports metadata is still counted.
 */
export function trackPageView(path: string, pathname: string): void {
  if (typeof window === 'undefined') return
  if (pending) {
    window.clearTimeout(pending.timer)
    pending = null
  }

  const knownTitle = reportedTitles.get(pathname)
  if (knownTitle !== undefined) {
    sendPageView(path, knownTitle)
    return
  }

  const timer = window.setTimeout(() => flush(path, document.title), PAGE_VIEW_TIMEOUT_MS)
  pending = { path, pathname, timer }
}

/** Called by `useSeo` once a route has applied its metadata to the document. */
export function reportPageMetadata(pathname: string, title: string): void {
  reportedTitles.set(pathname, title)
  if (pending?.pathname === pathname) flush(pending.path, title)
}

/** Readable label for an element: its accessible name, falling back to its text. */
export function describeElement(element: Element): string {
  const label =
    element.getAttribute('aria-label') ??
    element.getAttribute('title') ??
    element.textContent ??
    ''
  return label.replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT_LENGTH)
}

/**
 * Names the page region an element belongs to (`hero`, `download`, `footer`,
 * ...) so clicks can be compared across the page rather than in aggregate.
 */
export function resolveSection(element: Element | null): string {
  const container = element?.closest<HTMLElement>(
    '[data-analytics-section], section[id], footer, header',
  )
  if (!container) return 'page'
  return container.dataset.analyticsSection || container.id || container.tagName.toLowerCase()
}
