import { useEffect, useState } from 'react'

function shouldSkipAnimation(): boolean {
  if (typeof window === 'undefined') return true
  if (typeof IntersectionObserver === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export interface RevealState {
  /** Attach to the element that should animate in. */
  setNode: (node: HTMLElement | null) => void
  /** Ready-made class string for the shared reveal transition. */
  className: string
}

/**
 * Reveals an element once it scrolls into view.
 *
 * Uses a callback ref so the observer attaches as soon as the node mounts, and
 * skips the animation entirely for visitors who prefer reduced motion.
 */
export function useReveal(): RevealState {
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(shouldSkipAnimation)

  useEffect(() => {
    if (!node || isVisible) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, isVisible])

  return {
    setNode,
    className: isVisible ? 'reveal reveal-visible' : 'reveal',
  }
}
