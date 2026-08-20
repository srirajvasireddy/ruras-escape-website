import type { ReactNode } from 'react'

export interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  /** Constrains the inner container width. */
  width?: 'default' | 'wide' | 'narrow'
  'aria-labelledby'?: string
}

const widths: Record<NonNullable<SectionProps['width']>, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
}

/** Consistent vertical rhythm and responsive gutters for every page section. */
export function Section({
  id,
  children,
  className = '',
  width = 'default',
  ...rest
}: SectionProps) {
  return (
    <section id={id} className={`relative px-5 py-20 sm:px-8 sm:py-24 lg:py-28 ${className}`} {...rest}>
      <div className={`mx-auto w-full ${widths[width]}`}>{children}</div>
    </section>
  )
}
