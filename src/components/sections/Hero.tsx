import { Link } from 'react-router-dom'
import { HOME_SECTION_IDS } from '../../config/navigation'
import { siteConfig } from '../../config/site'
import { GooglePlayButton } from '../ui/GooglePlayButton'
import { AppStoreButton } from '../ui/AppStoreButton'
import { Icon } from '../ui/Icon'
import { ParticleField } from '../ui/ParticleField'
import { PuzzleBoardArt } from '../ui/PuzzleBoardArt'
import { RuraMascot } from '../ui/RuraMascot'
import { buttonClasses } from '../ui/buttonStyles'

const heroTags = ['Handcrafted puzzles', 'Play at your pace', 'Family friendly']

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
      {/* Atmosphere: layered midnight gradients, a warm pool of Rura light, drifting particles */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="from-night-900 via-night-950 to-night-950 absolute inset-0 bg-linear-to-b" />
        <div className="absolute top-[-18%] left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(247,172,31,0.16),transparent_65%)] blur-2xl" />
        <div className="bg-dusk-500/10 absolute top-1/3 -left-40 h-[30rem] w-[30rem] rounded-full blur-3xl" />
        <div className="bg-aurora-500/10 absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full blur-3xl" />
        <ParticleField />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <span className="border-glow-400/25 bg-glow-400/10 text-glow-200 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-medium tracking-[0.18em] uppercase">
            <span className="bg-glow-300 animate-glow-pulse h-1.5 w-1.5 rounded-full" />
            A mobile puzzle adventure
          </span>

          <h1 className="font-display mt-7 text-[2.75rem] leading-[0.95] font-semibold tracking-tight sm:text-7xl lg:text-[5rem]">
            <span className="text-mist-100 block">Rura&rsquo;s</span>
            <span className="from-glow-200 via-glow-300 to-glow-500 block bg-linear-to-r bg-clip-text text-transparent">
              Escape
            </span>
          </h1>

          <p className="text-glow-100/90 font-display mx-auto mt-6 max-w-md text-lg font-medium tracking-tight text-balance sm:text-xl lg:mx-0">
            {siteConfig.tagline}
          </p>

          <p className="text-mist-300 mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg lg:mx-0">
            Rura is a small firefly with a big problem: the way home keeps folding in on itself.
            Read the board, move what stands in the way, and light a route through puzzles built to
            be thought about — not rushed.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <GooglePlayButton size="lg" />
            <AppStoreButton size="lg" />
            <Link
              to={`/#${HOME_SECTION_IDS.game}`}
              className={buttonClasses('secondary', 'lg', 'w-full sm:w-auto')}
            >
              Explore the Game
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>

          <ul className="text-mist-400 mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs tracking-wide sm:text-sm lg:justify-start">
            {heroTags.map((tag) => (
              <li key={tag} className="flex items-center gap-2">
                <span className="bg-glow-400/70 h-1 w-1 rounded-full" aria-hidden="true" />
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Hero artwork */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[19rem] sm:max-w-[21rem]">
            <div
              className="bg-glow-400/15 absolute inset-0 -z-10 scale-110 rounded-[3rem] blur-3xl"
              aria-hidden="true"
            />
            {/* Device frame */}
            <div className="from-night-800 to-night-950 relative h-full w-full overflow-hidden rounded-[2.25rem] border border-white/10 bg-linear-to-b p-3 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] sm:rounded-[2.5rem] sm:p-4">
              <div className="bg-night-900/80 flex h-full w-full flex-col justify-between rounded-[1.6rem] px-4 py-6 sm:rounded-[1.9rem] sm:py-8">
                <div className="flex w-full items-center justify-between px-1 text-[0.6rem] tracking-[0.2em] text-white/35 uppercase">
                  <span>Level 24</span>
                  <span>Campaign</span>
                </div>
                <PuzzleBoardArt className="my-4 w-full drop-shadow-[0_18px_40px_rgba(247,172,31,0.18)]" />
                <div className="text-mist-400 flex w-full items-center justify-between px-1 text-[0.65rem]">
                  <span className="text-glow-300/90">Moves 6</span>
                  <span>Hint available</span>
                </div>
              </div>
            </div>

            {/* Rura floating just outside the frame */}
            <RuraMascot
              className="animate-float-slow absolute -top-12 -left-10 h-28 w-28 drop-shadow-[0_0_40px_rgba(247,172,31,0.55)] sm:-top-16 sm:-left-14 sm:h-36 sm:w-36"
              label="Rura, the glowing firefly"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
