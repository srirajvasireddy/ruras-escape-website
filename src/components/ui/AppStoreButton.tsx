import { siteConfig } from '../../config/site'
import type { ButtonSize } from './buttonStyles'
import { buttonClasses } from './buttonStyles'

function AppleMark() {
  return (
    <svg
      className="h-7 w-7 shrink-0 fill-current"
      viewBox="0 0 384 512"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M279.55 250.58c-.13-26.45 11.83-46.37 36.58-61.04-13.84-19.78-34.74-30.66-62.68-32.76-26.47-2.09-55.39 15.41-65.99 15.41-11.2 0-36.83-14.68-57.58-14.68-27.5.43-52.96 15.98-67.12 40.36-28.45 49.31-7.27 121.97 20.41 162.02 13.84 19.93 30.39 42.35 51.99 41.55 20.75-.81 28.58-13.44 53.7-13.44 24.4 0 31.29 13.44 53.2 13.44 22.63-.32 37.02-20.26 50.86-40.22 15.91-23.13 22.5-45.51 22.91-46.65-.5-.17-43.85-16.73-43.85-64.02ZM233.27 129.4c11.7-14.03 19.61-33.6 17.47-53.4-16.9.68-37.32 11.93-49.2 25.96-10.62 12.29-19.93 32.2-17.47 51.22 18.84 1.46 37.5-9.55 49.2-23.78Z" />
    </svg>
  )
}

export function AppStoreButton({
  size = 'lg',
  className = '',
}: {
  size?: ButtonSize
  className?: string
}) {
  return (
    <button
      type="button"
      disabled
      aria-label={`Coming to the Apple App Store in ${siteConfig.appStoreReleaseYear}`}
      className={buttonClasses('secondary', size, `cursor-not-allowed opacity-75 ${className}`)}
    >
      <AppleMark />
      <span className="flex flex-col items-start leading-none">
        <span className="text-[0.62rem] font-medium tracking-[0.16em] uppercase opacity-75">
          Coming to Apple
        </span>
        <span className="mt-1 text-[1.05rem] font-semibold">App Store · {siteConfig.appStoreReleaseYear}</span>
      </span>
    </button>
  )
}
