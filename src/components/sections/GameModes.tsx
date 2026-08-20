import { HOME_SECTION_IDS } from '../../config/navigation'
import { gameModes } from '../../data/gameModes'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function GameModes() {
  return (
    <Section id={HOME_SECTION_IDS.modes} aria-labelledby="game-modes-heading" width="wide" className="scroll-mt-24">
      <SectionHeading
        id="game-modes-heading"
        eyebrow="Game Modes"
        title="Four ways to play"
        description="Settle in for the campaign, unwind in Chill Mode, or drop by for a single puzzle. Nothing here expires if you miss a day."
      />

      <div className="mt-14 grid gap-5 sm:gap-6 lg:grid-cols-2">
        {gameModes.map((mode, index) => (
          <Reveal key={mode.id} delay={(index % 2) * 100} className="h-full">
            <article
              className={`group border-white/8 from-night-850 to-night-900 relative h-full overflow-hidden rounded-card border bg-linear-to-br p-7 transition duration-500 hover:-translate-y-1 sm:p-9 ${mode.accent.border}`}
            >
              <span
                className={`pointer-events-none absolute -top-20 -right-10 h-52 w-52 rounded-full blur-3xl transition duration-500 group-hover:opacity-90 ${mode.accent.glow} opacity-40`}
                aria-hidden="true"
              />
              <div className="relative flex items-start gap-4">
                <span
                  className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 ${mode.accent.text}`}
                >
                  <Icon name={mode.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{mode.name}</h3>
                  <p
                    className={`mt-1 text-xs font-medium tracking-[0.16em] uppercase ${mode.accent.text}`}
                  >
                    {mode.tagline}
                  </p>
                </div>
              </div>
              <p className="text-mist-300 relative mt-5 text-[0.95rem] leading-relaxed sm:text-base">
                {mode.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
