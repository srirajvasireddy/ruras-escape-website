import { HOME_SECTION_IDS } from '../../config/navigation'
import { features } from '../../data/features'
import { FeatureCard } from '../ui/FeatureCard'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function Features() {
  return (
    <Section
      id={HOME_SECTION_IDS.features}
      aria-labelledby="features-heading"
      width="wide"
      className="scroll-mt-24"
    >
      {/* Soft ambient light behind the grid */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-[28rem] max-w-4xl rounded-full bg-[radial-gradient(circle,rgba(139,123,240,0.10),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />
      <SectionHeading
        id="features-heading"
        eyebrow="Features"
        title="Built for people who like a proper puzzle"
        description="Everything in the game is there to keep the thinking front and centre — and to make coming back easy."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Reveal key={feature.id} delay={(index % 3) * 90} className="h-full">
            <FeatureCard feature={feature} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
