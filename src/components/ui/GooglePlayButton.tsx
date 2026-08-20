import type { MouseEvent } from 'react'
import { hasGooglePlayUrl, siteConfig } from '../../config/site'
import { resolveSection, trackEvent } from '../../lib/analytics'
import { GooglePlayMark } from './Icon'
import type { ButtonSize, ButtonVariant } from './buttonStyles'
import { buttonClasses } from './buttonStyles'

export interface GooglePlayButtonProps {
  size?: ButtonSize
  variant?: ButtonVariant
  className?: string
}

/**
 * The single place the Google Play call to action is defined.
 *
 * While `siteConfig.googlePlayUrl` is empty this renders a "Coming Soon" state
 * instead of a link that goes nowhere. That state uses `aria-disabled` rather
 * than `disabled` so pre-launch download intent is still measurable -- browsers
 * suppress events on a truly disabled button.
 */
export function GooglePlayButton({
  size = 'lg',
  variant = 'primary',
  className = '',
}: GooglePlayButtonProps) {
  const label = (
    <span className="flex flex-col items-start leading-none">
      <span className="text-[0.62rem] font-medium tracking-[0.16em] uppercase opacity-75">
        {hasGooglePlayUrl ? 'Get it on' : 'Coming soon on'}
      </span>
      <span className="mt-1 text-[1.05rem] font-semibold">Google Play</span>
    </span>
  )

  const track = (event: MouseEvent<HTMLElement>) => {
    trackEvent('cta_click', {
      cta: 'google_play',
      cta_state: hasGooglePlayUrl ? 'available' : 'coming_soon',
      section: resolveSection(event.currentTarget),
      page_path: window.location.pathname,
      link_url: hasGooglePlayUrl ? siteConfig.googlePlayUrl : undefined,
    })
  }

  if (!hasGooglePlayUrl) {
    return (
      <button
        type="button"
        aria-disabled="true"
        data-analytics-skip
        onClick={track}
        className={buttonClasses(variant, size, `cursor-not-allowed opacity-70 ${className}`)}
      >
        <GooglePlayMark className="h-6 w-6" />
        {label}
      </button>
    )
  }

  return (
    <a
      href={siteConfig.googlePlayUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-skip
      onClick={track}
      className={buttonClasses(variant, size, className)}
    >
      <GooglePlayMark className="h-6 w-6" />
      {label}
      <span className="sr-only">{`Download ${siteConfig.name} on Google Play (opens in a new tab)`}</span>
    </a>
  )
}
