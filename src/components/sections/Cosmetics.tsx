import { HOME_SECTION_IDS } from '../../config/navigation'
import { cosmeticCategories, ruraStyles } from '../../data/cosmetics'
import { ArtworkFrame } from '../ui/ArtworkFrame'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function Cosmetics() {
  return (
    <Section
      id={HOME_SECTION_IDS.cosmetics}
      aria-labelledby="cosmetics-heading"
      width="wide"
      className="scroll-mt-24"
    >
      <SectionHeading
        id="cosmetics-heading"
        eyebrow="Cosmetics"
        title="Make Rura your own"
        description="Rewards you earn by playing: a wardrobe of styles, glowing trails and puzzle board themes. All cosmetic, none of it changes how a puzzle is solved."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-3 sm:gap-6">
        {cosmeticCategories.map((category, index) => (
          <Reveal key={category.id} delay={index * 90} className="h-full">
            <div className="border-white/8 bg-night-900/60 hover:border-glow-400/25 h-full rounded-card border p-6 transition duration-500 sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{category.title}</h3>
              <p className="text-mist-300 mt-3 text-[0.95rem] leading-relaxed">
                {category.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {category.examples.map((example) => (
                  <li
                    key={example}
                    className="text-mist-200 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Style showcase. Each frame swaps to real art as soon as the file exists. */}
      <Reveal delay={120}>
        <div className="mt-14">
          <h3 className="text-mist-100 font-display text-center text-sm font-semibold tracking-[0.2em] uppercase">
            Rura Styles
          </h3>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {ruraStyles.map((style) => (
              <li key={style.id}>
                <ArtworkFrame
                  src={style.image}
                  alt={`Rura wearing the ${style.name} style`}
                  aspect="aspect-square"
                  caption={style.name}
                />
                <p className="text-mist-400 mt-2 text-center text-xs leading-relaxed">
                  {style.blurb}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
