import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

export interface RevealProps {
  children: ReactNode
  /** Stagger delay in milliseconds. */
  delay?: number
  className?: string
}

/** Wraps content in the shared scroll-reveal transition. */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { setNode, className: revealClassName } = useReveal()

  return (
    <div
      ref={setNode}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${revealClassName} ${className}`}
    >
      {children}
    </div>
  )
}
