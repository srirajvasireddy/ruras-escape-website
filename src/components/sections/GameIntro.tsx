import { HOME_SECTION_IDS } from '../../config/navigation'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const pillars = [
  {
    title: 'Read the board',
    body: 'Every level opens as a puzzle you can take in at a glance — and unravel only by thinking it through.',
  },
  {
    title: 'Move with intent',
    body: 'Shift obstacles, open routes and commit to a plan. The right answer is always there to be found.',
  },
  {
    title: 'Light the way home',
    body: 'Guide Rura to the exit and watch the path glow shut behind you. Then do it again, one step harder.',
  },
]

export function GameIntro() {
  return (
    <Section id={HOME_SECTION_IDS.game} aria-labelledby="game-intro-heading" className="scroll-mt-24">
      <SectionHeading
        id="game-intro-heading"
        eyebrow="The Game"
        title="A quiet puzzle world that asks you to think two moves ahead"
        description="Rura’s Escape trades noise and timers for something calmer and sharper: handcrafted levels, clean rules, and that specific satisfaction of seeing the solution a moment before you make it."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-3 sm:gap-6">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 90} className="h-full">
            <div className="border-white/8 bg-night-900/60 h-full rounded-card border p-6 sm:p-7">
              <span className="text-glow-400/70 font-display text-sm font-semibold tracking-[0.2em]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{pillar.title}</h3>
              <p className="text-mist-300 mt-3 text-[0.95rem] leading-relaxed">{pillar.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
