import type { LegalSection } from '../../data/legal/types'
import { hasSupportEmail, siteConfig } from '../../config/site'
import { Icon } from '../ui/Icon'
import { ParticleField } from '../ui/ParticleField'

export interface LegalPageLayoutProps {
  title: string
  intro: string
  effectiveDate: string
  lastUpdated: string
  sections: LegalSection[]
}

/** Shared shell for the privacy policy and terms pages. */
export function LegalPageLayout({
  title,
  intro,
  effectiveDate,
  lastUpdated,
  sections,
}: LegalPageLayoutProps) {
  return (
    <article>
      <header className="relative isolate overflow-hidden px-5 pt-28 pb-12 sm:px-8 sm:pt-36 sm:pb-16">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="from-night-900 to-night-950 absolute inset-0 bg-linear-to-b" />
          <div className="absolute top-[-30%] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(247,172,31,0.12),transparent_65%)] blur-2xl" />
          <ParticleField intensity={0.5} />
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <h1 className="text-[2rem] leading-tight font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="text-mist-300 mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
            {intro}
          </p>

          <dl className="text-mist-400 mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <div>
              <dt className="text-[0.65rem] tracking-[0.18em] uppercase">Effective date</dt>
              <dd className="text-mist-200 mt-1">{effectiveDate}</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-[0.18em] uppercase">Last updated</dt>
              <dd className="text-mist-200 mt-1">{lastUpdated}</dd>
            </div>
          </dl>

          <div className="border-glow-400/25 bg-glow-400/8 mt-8 flex gap-3 rounded-2xl border p-4 sm:p-5">
            <Icon name="shield" className="text-glow-300 mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-glow-100/90 text-sm leading-relaxed">
              <strong className="font-semibold">Clear by design.</strong> We use plain language
              where possible. Section headings are for convenience and do not limit the document.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-4xl gap-12 px-5 pb-24 sm:px-8 lg:max-w-6xl lg:grid-cols-[16rem_1fr] lg:gap-14">
        {/* Table of contents */}
        <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-mist-100 font-display text-xs font-semibold tracking-[0.2em] uppercase">
            On this page
          </h2>
          <ol className="mt-4 space-y-2 border-l border-white/10 pl-4">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-mist-400 hover:text-glow-200 block text-sm leading-snug transition"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 pt-10 first:pt-0">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-mist-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.bullets ? (
                <ul className="text-mist-300 mt-5 space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 leading-relaxed">
                      <span
                        className="bg-glow-400/70 mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.links ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {section.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-glow-300 inline-flex items-center gap-1.5 text-sm underline-offset-4 hover:underline"
                    >
                      {link.label}
                      <Icon name="externalLink" className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          <section className="scroll-mt-28 pt-12">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Contact</h2>
            {hasSupportEmail ? (
              <>
                <p className="text-mist-300 mt-4 leading-relaxed">
                  Questions about this document can be sent to{' '}
                  <a
                    href={`mailto:${siteConfig.privacyEmail}`}
                    className="text-glow-300 underline-offset-4 hover:underline"
                  >
                    {siteConfig.privacyEmail}
                  </a>
                  .
                </p>
                <address className="text-mist-300 mt-3 leading-relaxed not-italic">
                  {siteConfig.publisher}, individual publisher<br />
                  {siteConfig.businessMailingAddress}
                </address>
              </>
            ) : (
              <p className="text-mist-300 mt-4 leading-relaxed">
                Use the <a href="/support" className="text-glow-300 underline-offset-4 hover:underline">Support page</a> for
                the current contact route. A dedicated privacy address will be published there before launch.
              </p>
            )}
          </section>
        </div>
      </div>
    </article>
  )
}
