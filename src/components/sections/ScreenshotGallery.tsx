import { HOME_SECTION_IDS } from '../../config/navigation'
import { screenshots } from '../../data/screenshots'
import { ArtworkFrame } from '../ui/ArtworkFrame'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function ScreenshotGallery() {
  return (
    <Section
      id={HOME_SECTION_IDS.screenshots}
      aria-labelledby="screenshots-heading"
      width="wide"
      className="scroll-mt-24"
    >
      <SectionHeading
        id="screenshots-heading"
        eyebrow="Gameplay"
        title="A look inside the caves"
        description="Clean boards, readable rules and a warm glow in the dark — here is how Rura’s Escape actually plays."
      />

      <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {screenshots.map((shot, index) => (
          <li key={shot.id}>
            <Reveal delay={(index % 3) * 80}>
              <ArtworkFrame
                src={shot.src}
                alt={shot.alt}
                caption={shot.caption}
                priority={index === 0}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
