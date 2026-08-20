import type { Feature } from '../../data/features'
import { Icon } from './Icon'

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="group border-white/8 from-night-800/80 to-night-900/60 hover:border-glow-400/30 relative h-full overflow-hidden rounded-card border bg-linear-to-b p-6 transition duration-500 hover:-translate-y-1 sm:p-7">
      {/* Warm glow that lifts on hover */}
      <span
        className="bg-glow-400/12 pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <span className="border-glow-400/25 bg-glow-400/10 text-glow-300 relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border">
        <Icon name={feature.icon} className="h-6 w-6" />
      </span>
      <h3 className="relative text-lg font-semibold tracking-tight sm:text-xl">{feature.title}</h3>
      <p className="text-mist-300 relative mt-3 text-[0.95rem] leading-relaxed">
        {feature.description}
      </p>
    </article>
  )
}
