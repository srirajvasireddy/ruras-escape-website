import { Link } from 'react-router-dom'
import { HOME_SECTION_IDS } from '../../config/navigation'
import { hasGooglePlayUrl } from '../../config/site'
import { GooglePlayButton } from '../ui/GooglePlayButton'
import { AppStoreButton } from '../ui/AppStoreButton'
import { ParticleField } from '../ui/ParticleField'
import { Reveal } from '../ui/Reveal'
import { RuraMascot } from '../ui/RuraMascot'
import { Section } from '../ui/Section'

export function DownloadCTA() {
  return (
    <Section id={HOME_SECTION_IDS.download} aria-labelledby="download-heading" width="wide">
      <Reveal>
        <div className="from-night-850 via-night-900 to-night-950 relative overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br px-5 py-16 text-center sm:px-10 sm:py-20">
          <ParticleField intensity={0.8} />
          <div
            className="absolute bottom-[-40%] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(247,172,31,0.22),transparent_65%)] blur-2xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl">
            <RuraMascot className="animate-float-slow mx-auto h-24 w-24 sm:h-28 sm:w-28" />
            <h2
              id="download-heading"
              className="mt-6 text-[1.8rem] leading-tight font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]"
            >
              Ready to help Rura find the way home?
            </h2>
            <p className="text-mist-300 mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
              {hasGooglePlayUrl
                ? 'Download Rura’s Escape on Android and start with the very first puzzle. The rest is up to you.'
                : 'Rura’s Escape is coming first to Android, then to iPhone and iPad in 2027.'}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <GooglePlayButton size="lg" />
              <AppStoreButton size="lg" />
            </div>

            <p className="text-mist-400 mt-8 text-sm">
              Questions before you start?{' '}
              <Link to="/support" className="text-glow-300 underline-offset-4 hover:underline">
                Visit support
              </Link>
              {' · '}
              <Link
                to={`/#${HOME_SECTION_IDS.features}`}
                className="text-glow-300 underline-offset-4 hover:underline"
              >
                See the features
              </Link>
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
