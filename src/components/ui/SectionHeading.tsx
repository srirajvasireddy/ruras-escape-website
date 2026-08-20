import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

export interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  /** Anchors the section's aria-labelledby reference. */
  id?: string
  className?: string
  as?: 'h2' | 'h3'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  id,
  className = '',
  as: Heading = 'h2',
}: SectionHeadingProps) {
  const { setNode, className: revealClassName } = useReveal()
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left'

  return (
    <div
      ref={setNode}
      className={`flex max-w-2xl flex-col ${alignment} ${revealClassName} ${className}`}
    >
      {eyebrow ? (
        <span className="text-glow-300/90 mb-4 inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.22em] uppercase">
          <span className="bg-glow-400/70 h-px w-6" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
      <Heading
        id={id}
        className="text-[1.75rem] leading-tight font-semibold tracking-tight sm:text-4xl lg:text-[2.6rem]"
      >
        {title}
      </Heading>
      {description ? (
        <p className="text-mist-300 mt-5 text-base leading-relaxed sm:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
