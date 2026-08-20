import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/site'

export interface LogoProps {
  className?: string
  /** Rendered as a link to the home page unless disabled. */
  asLink?: boolean
  onClick?: () => void
}

export function Logo({ className = '', asLink = true, onClick }: LogoProps) {
  const content = (
    <>
      <img
        src="/icons/icon-192.png"
        alt=""
        width="192"
        height="192"
        decoding="async"
        className="h-9 w-9 shrink-0 rounded-[0.7rem] shadow-[0_0_24px_rgba(237,201,81,0.18)] sm:h-10 sm:w-10"
      />
      <span className="font-display text-mist-100 text-[1.05rem] font-semibold tracking-tight sm:text-lg">
        Rura<span className="text-glow-300">&rsquo;s</span> Escape
      </span>
    </>
  )

  if (!asLink) {
    return <span className={`flex items-center gap-2.5 ${className}`}>{content}</span>
  }

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} — home`}
      className={`flex items-center gap-2.5 rounded-lg transition hover:opacity-90 ${className}`}
    >
      {content}
    </Link>
  )
}
