import { Link } from 'react-router-dom'
import { FAQAccordion } from '../components/ui/FAQAccordion'
import { Icon } from '../components/ui/Icon'
import { ParticleField } from '../components/ui/ParticleField'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'
import { buttonClasses } from '../components/ui/buttonStyles'
import { hasSupportEmail, siteConfig } from '../config/site'
import { faqItems } from '../data/faq'
import { supportTopics } from '../data/supportTopics'
import { useSeo } from '../hooks/useSeo'

function ContactCard() {
  return (
    <div className="border-glow-400/20 from-night-850 to-night-900 rounded-card border bg-linear-to-br p-6 sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Get in touch</h2>
      {hasSupportEmail ? (
        <>
          <p className="text-mist-300 mt-3 leading-relaxed">
            Email us and include as much detail as you can — it usually saves a round trip.
          </p>
          <a
            href={`mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(
              `${siteConfig.name} support`,
            )}`}
            className={buttonClasses('primary', 'md', 'mt-6')}
          >
            <Icon name="mail" className="h-5 w-5" />
            {siteConfig.supportEmail}
          </a>
          <address className="text-mist-400 mt-5 text-sm leading-relaxed not-italic">
            {siteConfig.publisher}, individual publisher<br />
            {siteConfig.businessMailingAddress}
          </address>
        </>
      ) : (
        <>
          <p className="text-mist-300 mt-3 leading-relaxed">
            A dedicated support address is being set up and will be published here before launch.
            Once {siteConfig.name} is live on Google Play, the developer contact details on the
            store listing will also reach us.
          </p>
          <p className="text-mist-400 mt-5 inline-flex items-center gap-2 rounded-full border border-dashed border-white/15 px-4 py-2 text-sm">
            <Icon name="mail" className="h-4 w-4" />
            Support address coming soon
          </p>
        </>
      )}
    </div>
  )
}

export function SupportPage() {
  useSeo({
    title: `Support | ${siteConfig.name}`,
    description: `Help with ${siteConfig.name}: gameplay questions, purchases through Google Play, rewarded ads, bug reports and privacy questions.`,
    path: '/support',
  })

  return (
    <>
      <section className="relative isolate overflow-hidden px-5 pt-28 pb-8 sm:px-8 sm:pt-36 sm:pb-12">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="from-night-900 to-night-950 absolute inset-0 bg-linear-to-b" />
          <div className="absolute top-[-28%] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(247,172,31,0.13),transparent_65%)] blur-2xl" />
          <ParticleField intensity={0.6} />
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="text-[2rem] leading-tight font-semibold tracking-tight sm:text-5xl">
              Need help?
            </h1>
            <p className="text-mist-300 mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
              Whether a puzzle has you stuck, a reward did not arrive, or something is plainly
              broken — tell us what happened and we will take a look.
            </p>
          </div>
          <ContactCard />
        </div>
      </section>

      <Section aria-labelledby="support-topics-heading" width="wide" className="pt-12 sm:pt-16">
        <SectionHeading
          id="support-topics-heading"
          eyebrow="What can we help with?"
          align="left"
          title="Pick the closest match"
          description="Each of these gets to the right place faster if you include a little context."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {supportTopics.map((topic, index) => (
            <Reveal key={topic.id} delay={(index % 3) * 80} className="h-full">
              <article className="border-white/8 bg-night-900/60 hover:border-glow-400/25 h-full rounded-card border p-6 transition duration-500">
                <span className="border-glow-400/25 bg-glow-400/10 text-glow-300 mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border">
                  <Icon name={topic.icon} className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{topic.title}</h3>
                <p className="text-mist-300 mt-3 text-[0.95rem] leading-relaxed">
                  {topic.description}
                </p>
                {topic.points ? (
                  <ul className="text-mist-400 mt-4 space-y-2 text-sm">
                    {topic.points.map((point) => (
                      <li key={point} className="flex gap-2.5 leading-relaxed">
                        <span
                          className="bg-glow-400/70 mt-2 h-1 w-1 shrink-0 rounded-full"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {topic.id === 'privacy' ? (
                  <Link
                    to="/privacy-policy"
                    className="text-glow-300 mt-4 inline-flex items-center gap-1.5 text-sm underline-offset-4 hover:underline"
                  >
                    Read the privacy policy
                    <Icon name="arrowRight" className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="faq-heading" width="default" className="pt-0">
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Common questions"
          description="Short answers to the things players ask most."
        />
        <div className="mt-12">
          <FAQAccordion items={faqItems} defaultOpenId={faqItems[0]?.id} />
        </div>

        <p className="text-mist-400 mt-10 text-center text-sm">
          Still stuck? Head back to the{' '}
          <Link to="/" className="text-glow-300 underline-offset-4 hover:underline">
            home page
          </Link>{' '}
          or review the{' '}
          <Link to="/terms" className="text-glow-300 underline-offset-4 hover:underline">
            terms of use
          </Link>
          .
        </p>
      </Section>
    </>
  )
}
