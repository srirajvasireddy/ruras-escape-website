import { useId } from 'react'

export interface RuraMascotProps {
  className?: string
  /** Rendered as an accessible image when a label is supplied. */
  label?: string
  /** Slows or disables the wing flutter for calmer contexts. */
  animated?: boolean
}

/**
 * Placeholder artwork for Rura, drawn as inline SVG so the site never depends on
 * a missing image file.
 *
 * When final character art is available, swap this component's internals for an
 * <img> (or keep both and choose per surface) -- every usage site passes only
 * className/label, so nothing else needs to change.
 */
export function RuraMascot({ className = 'h-48 w-48', label, animated = true }: RuraMascotProps) {
  const id = useId()
  const bodyGradient = `rura-body-${id}`
  const glowGradient = `rura-glow-${id}`
  const tailGradient = `rura-tail-${id}`
  const wingGradient = `rura-wing-${id}`

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role={label ? 'img' : 'presentation'}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      {label ? <title>{label}</title> : null}
      <defs>
        <radialGradient id={glowGradient} cx="50%" cy="52%" r="50%">
          <stop offset="0%" stopColor="#ffdd85" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#f7ac1f" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f7ac1f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={bodyGradient} cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#fff7e0" />
          <stop offset="45%" stopColor="#ffd066" />
          <stop offset="100%" stopColor="#e0930f" />
        </radialGradient>
        <radialGradient id={tailGradient} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffdf5" />
          <stop offset="55%" stopColor="#ffd066" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#f7ac1f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={wingGradient} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7fe3e0" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Ambient glow */}
      <circle
        cx="100"
        cy="104"
        r="86"
        fill={`url(#${glowGradient})`}
        className={animated ? 'animate-glow-pulse origin-center' : undefined}
      />

      {/* Wings */}
      <g className={animated ? 'animate-wing origin-[86px_84px]' : undefined}>
        <ellipse
          cx="66"
          cy="80"
          rx="30"
          ry="17"
          fill={`url(#${wingGradient})`}
          transform="rotate(-28 66 80)"
        />
      </g>
      <g className={animated ? 'animate-wing origin-[118px_84px]' : undefined}>
        <ellipse
          cx="134"
          cy="80"
          rx="30"
          ry="17"
          fill={`url(#${wingGradient})`}
          transform="rotate(28 134 80)"
        />
      </g>

      {/* Tail light */}
      <circle cx="100" cy="146" r="26" fill={`url(#${tailGradient})`} />

      {/* Body */}
      <ellipse cx="100" cy="106" rx="40" ry="44" fill={`url(#${bodyGradient})`} />
      <path
        d="M62 118c8 7 22 11 38 11s30-4 38-11"
        stroke="#c97f0c"
        strokeOpacity="0.35"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Antennae */}
      <path
        d="M86 68c-4-11-10-17-18-20"
        stroke="#e0930f"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M114 68c4-11 10-17 18-20"
        stroke="#e0930f"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="67" cy="47" r="5.5" fill="#ffedb8" />
      <circle cx="133" cy="47" r="5.5" fill="#ffedb8" />

      {/* Face */}
      <ellipse cx="88" cy="98" rx="6" ry="7.5" fill="#3a2503" />
      <ellipse cx="112" cy="98" rx="6" ry="7.5" fill="#3a2503" />
      <circle cx="90" cy="95" r="2.2" fill="#fffdf5" />
      <circle cx="114" cy="95" r="2.2" fill="#fffdf5" />
      <path
        d="M92 112c2.5 2.6 5.2 3.9 8 3.9s5.5-1.3 8-3.9"
        stroke="#3a2503"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
