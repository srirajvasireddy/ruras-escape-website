import { HOME_SECTION_IDS } from '../../config/navigation'
import { ParticleField } from '../ui/ParticleField'
import { Reveal } from '../ui/Reveal'
import { RuraMascot } from '../ui/RuraMascot'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const traits = [
  { label: 'Species', value: 'Firefly' },
  { label: 'Glow', value: 'Warm gold' },
  { label: 'Goal', value: 'Get home' },
]

export function MeetRura() {
  return (
    <Section
      id={HOME_SECTION_IDS.rura}
      aria-labelledby="meet-rura-heading"
      width="wide"
      className="scroll-mt-24 overflow-hidden"
    >
      <div className="from-night-900 via-night-850 to-night-900 relative overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br px-5 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <ParticleField intensity={0.7} />
        <div
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(247,172,31,0.18),transparent_65%)] blur-2xl"
          aria-hidden="true"
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Character artwork. Swap RuraMascot for final art when it exists. */}
          <Reveal className="flex justify-center">
            <div className="relative">
              <div
                className="animate-glow-pulse absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(247,172,31,0.35),transparent_65%)] blur-2xl"
                aria-hidden="true"
              />
              <span
                className="border-glow-400/20 animate-float-slower absolute inset-[-14%] rounded-full border"
                aria-hidden="true"
              />
              <RuraMascot
                className="animate-float-slow h-56 w-56 sm:h-72 sm:w-72"
                label="Rura, a small glowing firefly with translucent wings"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              id="meet-rura-heading"
              eyebrow="Meet Rura"
              align="left"
              title="A small light with a long way to go"
              description="Rura is the reason every puzzle matters. Not a cursor, not a token — a firefly whose glow is the only thing lighting the next square of a very dark maze."
            />

            <div className="text-mist-300 mt-6 space-y-4 text-base leading-relaxed">
              <p>
                Rura is curious to a fault, which is roughly how this whole situation started. One
                wrong turn into a shifting cave system, and the way out became a puzzle worth
                solving.
              </p>
              <p>
                Rura never changes colour and never stops glowing — that steady golden light is the
                character. Outfits, trails and themes simply dress it up for the occasion.
              </p>
            </div>

            <dl className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {traits.map((trait) => (
                <div
                  key={trait.label}
                  className="border-white/8 bg-white/4 rounded-2xl border px-4 py-3.5"
                >
                  <dt className="text-mist-400 text-[0.65rem] tracking-[0.18em] uppercase">
                    {trait.label}
                  </dt>
                  <dd className="text-glow-200 font-display mt-1.5 text-base font-medium">
                    {trait.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  )
}
