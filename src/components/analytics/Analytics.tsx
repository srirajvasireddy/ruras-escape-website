import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, trackPageView } from '../../lib/analytics'
import { startInteractionTracking, startPageEngagementTracking } from '../../lib/autoTracking'

/**
 * Mounts Google Analytics for the whole app: loads the tag once, reports a
 * page view for every route change, and keeps the site-wide interaction
 * listeners in sync with the page on screen.
 *
 * Rendered after <Routes> so the route's own effects (scroll restore, document
 * title) have already run when a navigation is measured.
 */
export function Analytics() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    initAnalytics()
    return startInteractionTracking()
  }, [])

  useEffect(() => {
    trackPageView(`${pathname}${search}${hash}`, pathname)
    return startPageEngagementTracking()
  }, [pathname, search, hash])

  return null
}
