import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { primaryNavLinks } from '../../config/navigation'
import { useScrolled } from '../../hooks/useScrolled'
import { trackEvent } from '../../lib/analytics'
import { GooglePlayButton } from '../ui/GooglePlayButton'
import { AppStoreButton } from '../ui/AppStoreButton'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrolled = useScrolled(28)
  const location = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // While the menu is open: lock background scrolling and allow Escape to close.
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer'))
    document.body.style.overflow = 'hidden'
    background.forEach((element) => element.setAttribute('inert', ''))
    panelRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      )
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        event.preventDefault()
        toggleRef.current?.focus()
      } else if (event.shiftKey && document.activeElement === toggleRef.current) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        toggleRef.current?.focus()
      } else if (!event.shiftKey && document.activeElement === toggleRef.current) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      background.forEach((element) => element.removeAttribute('inert'))
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  const isCurrent = (href: string) => href === location.pathname && !location.hash

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || isMenuOpen
          ? 'border-b border-white/10 bg-night-950/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Logo onClick={() => setIsMenuOpen(false)} />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              aria-current={isCurrent(link.href) ? 'page' : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isCurrent(link.href)
                  ? 'text-glow-200'
                  : 'text-mist-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <GooglePlayButton size="md" className="ml-3" />
          <AppStoreButton size="md" />
        </nav>

        <button
          ref={toggleRef}
          type="button"
          data-analytics-skip
          onClick={() => {
            trackEvent('menu_toggle', {
              action: isMenuOpen ? 'close' : 'open',
              page_path: location.pathname,
            })
            setIsMenuOpen((open) => !open)
          }}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="text-mist-100 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10 lg:hidden"
        >
          <Icon
            name={isMenuOpen ? 'close' : 'menu'}
            className="h-5 w-5"
            title={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-menu"
        ref={panelRef}
        tabIndex={-1}
        hidden={!isMenuOpen}
        className="border-t border-white/10 bg-night-950/95 backdrop-blur-xl outline-none lg:hidden"
      >
        <nav aria-label="Primary mobile" className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
          <ul className="flex flex-col gap-1">
            {primaryNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  aria-current={isCurrent(link.href) ? 'page' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition ${
                    isCurrent(link.href)
                      ? 'text-glow-200 bg-white/5'
                      : 'text-mist-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                  <Icon name="arrowRight" className="text-mist-400 h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <GooglePlayButton size="lg" className="w-full" />
            <AppStoreButton size="lg" className="w-full" />
          </div>
        </nav>
      </div>
    </header>
  )
}
