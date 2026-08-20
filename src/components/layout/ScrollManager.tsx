import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Restores sensible scroll behaviour for a single-page app: hash links scroll to
 * their section (including when arriving from another route), everything else
 * starts at the top.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait one frame so the target section exists after a route change.
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(hash.slice(1))
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => cancelAnimationFrame(frame)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
