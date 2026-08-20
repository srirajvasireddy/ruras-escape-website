import { hasGooglePlayUrl, siteConfig } from '../../config/site'
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
 * While `siteConfig.googlePlayUrl` is empty this renders a disabled
 * "Coming Soon" state instead of a link that goes nowhere.
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

  if (!hasGooglePlayUrl) {
    return (
      <button
        type="button"
        disabled
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
      className={buttonClasses(variant, size, className)}
    >
      <GooglePlayMark className="h-6 w-6" />
      {label}
      <span className="sr-only">{`Download ${siteConfig.name} on Google Play (opens in a new tab)`}</span>
    </a>
  )
}
