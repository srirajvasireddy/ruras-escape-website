interface Particle {
  left: string
  top: string
  size: number
  delay: string
  duration: string
  opacity: number
}

/** Fixed layout so the field renders identically on every load. */
const fireflies: Particle[] = [
  { left: '8%', top: '22%', size: 6, delay: '0s', duration: '24s', opacity: 0.55 },
  { left: '18%', top: '68%', size: 4, delay: '-6s', duration: '30s', opacity: 0.4 },
  { left: '31%', top: '38%', size: 8, delay: '-12s', duration: '27s', opacity: 0.35 },
  { left: '44%', top: '78%', size: 5, delay: '-3s', duration: '33s', opacity: 0.45 },
  { left: '57%', top: '18%', size: 7, delay: '-18s', duration: '26s', opacity: 0.4 },
  { left: '69%', top: '58%', size: 4, delay: '-9s', duration: '31s', opacity: 0.5 },
  { left: '81%', top: '30%', size: 6, delay: '-21s', duration: '28s', opacity: 0.42 },
  { left: '91%', top: '72%', size: 5, delay: '-15s', duration: '35s', opacity: 0.36 },
]

const stars: Particle[] = [
  { left: '12%', top: '12%', size: 2, delay: '0s', duration: '7s', opacity: 0.6 },
  { left: '25%', top: '52%', size: 2, delay: '-2s', duration: '9s', opacity: 0.5 },
  { left: '38%', top: '8%', size: 3, delay: '-4s', duration: '6s', opacity: 0.45 },
  { left: '52%', top: '44%', size: 2, delay: '-1s', duration: '8s', opacity: 0.55 },
  { left: '63%', top: '86%', size: 2, delay: '-5s', duration: '10s', opacity: 0.4 },
  { left: '74%', top: '14%', size: 3, delay: '-3s', duration: '7s', opacity: 0.5 },
  { left: '86%', top: '48%', size: 2, delay: '-6s', duration: '9s', opacity: 0.45 },
  { left: '95%', top: '20%', size: 2, delay: '-2.5s', duration: '8s', opacity: 0.5 },
]

export interface ParticleFieldProps {
  className?: string
  /** Scales the whole field's opacity for busier sections. */
  intensity?: number
}

/**
 * Decorative drifting fireflies and stars. CSS-animated and purely presentational,
 * and the reduced-motion rule in the global stylesheet freezes it in place.
 */
export function ParticleField({ className = '', intensity = 1 }: ParticleFieldProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <span
          key={`star-${star.left}-${star.top}`}
          className="animate-twinkle absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity * intensity,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
      {fireflies.map((fly) => (
        <span
          key={`fly-${fly.left}-${fly.top}`}
          className="animate-drift bg-glow-300 absolute rounded-full blur-[2px]"
          style={{
            left: fly.left,
            top: fly.top,
            width: fly.size,
            height: fly.size,
            opacity: fly.opacity * intensity,
            animationDelay: fly.delay,
            animationDuration: fly.duration,
            boxShadow: '0 0 12px 4px rgba(255, 201, 77, 0.45)',
          }}
        />
      ))}
    </div>
  )
}
