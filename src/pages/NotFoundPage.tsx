import { Link } from 'react-router-dom'
import { ParticleField } from '../components/ui/ParticleField'
import { RuraMascot } from '../components/ui/RuraMascot'
import { buttonClasses } from '../components/ui/buttonStyles'
import { siteConfig } from '../config/site'
import { useSeo } from '../hooks/useSeo'

export function NotFoundPage() {
  useSeo({
    title: `Page not found | ${siteConfig.name}`,
    description: 'The page you were looking for could not be found.',
    path: '/404',
    index: false,
  })

  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden px-5 py-24 sm:px-8">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="from-night-900 to-night-950 absolute inset-0 bg-linear-to-b" />
        <ParticleField intensity={0.6} />
      </div>

      <div className="mx-auto max-w-lg text-center">
        <RuraMascot className="animate-float-slow mx-auto h-32 w-32" />
        <p className="text-glow-300 mt-6 text-sm font-semibold tracking-[0.2em] uppercase">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Rura took a wrong turn
        </h1>
        <p className="text-mist-300 mt-4 leading-relaxed">
          This page does not exist — but the way back is well lit.
        </p>
        <Link to="/" className={buttonClasses('primary', 'md', 'mt-8')}>
          Return home
        </Link>
      </div>
    </section>
  )
}
