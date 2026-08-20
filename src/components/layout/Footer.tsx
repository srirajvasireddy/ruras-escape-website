import { Link } from 'react-router-dom'
import { footerNavLinks } from '../../config/navigation'
import { activeSocialLinks, siteConfig } from '../../config/site'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

const socialLabels: Record<string, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  x: 'X',
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-night-950">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="text-mist-400 mt-4 text-sm leading-relaxed">{siteConfig.tagline}</p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <h2 className="text-mist-100 font-display text-sm font-semibold tracking-[0.16em] uppercase">
                Site
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {footerNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-mist-300 hover:text-glow-200 text-sm transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {activeSocialLinks.length > 0 ? (
              <div>
                <h2 className="text-mist-100 font-display text-sm font-semibold tracking-[0.16em] uppercase">
                  Follow
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {activeSocialLinks.map(({ key, url }) => (
                    <li key={key}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-mist-300 hover:text-glow-200 inline-flex items-center gap-2 text-sm transition"
                      >
                        {socialLabels[key] ?? key}
                        <Icon name="externalLink" className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-mist-400 text-xs sm:text-sm">
              &copy; {year} {siteConfig.publisher}. All rights reserved.
            </p>
            <p className="text-mist-400/80 text-xs">
              Powered by{' '}
              <a
                href={siteConfig.creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mist-200 hover:text-glow-200 font-medium transition"
              >
                Sriraj Vasireddy
              </a>
            </p>
          </div>
          <p className="text-mist-400/80 text-xs sm:text-right">
            Google Play is a trademark of Google LLC. Apple and App Store are trademarks of Apple Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
