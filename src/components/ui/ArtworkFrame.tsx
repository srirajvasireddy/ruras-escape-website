import { useState } from 'react'
import { RuraMascot } from './RuraMascot'

export interface ArtworkFrameProps {
  /** Path under /public. If the file is missing, a placeholder is shown instead. */
  src: string
  alt: string
  /** Shown inside the placeholder and under the image. */
  caption?: string
  /** Tailwind aspect ratio class, e.g. `aspect-[9/16]`. */
  aspect?: string
  className?: string
  /** The first gallery item can load eagerly; everything else stays lazy. */
  priority?: boolean
}

/**
 * Renders game artwork, degrading to a styled placeholder when the file has not
 * been added yet. This keeps the layout intact whether or not screenshots exist.
 */
export function ArtworkFrame({
  src,
  alt,
  caption,
  aspect = 'aspect-[9/16]',
  className = '',
  priority = false,
}: ArtworkFrameProps) {
  const [failed, setFailed] = useState(false)

  return (
    <figure className={`group relative ${className}`}>
      <div
        className={`border-white/8 from-night-800 to-night-900 relative overflow-hidden rounded-card border bg-linear-to-b ${aspect} transition duration-500 group-hover:-translate-y-1 group-hover:border-white/15`}
      >
        {failed ? (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center"
            data-placeholder-for={src}
          >
            <span
              className="bg-glow-400/10 absolute inset-0 opacity-60 blur-2xl"
              aria-hidden="true"
            />
            {/* Faint puzzle-grid texture so empty frames still read as game art */}
            <span
              className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-size-[28px_28px]"
              aria-hidden="true"
            />
            <RuraMascot className="relative h-20 w-20 opacity-40" animated={false} />
            <span className="text-mist-400 relative text-xs tracking-[0.18em] uppercase">
              {caption ?? 'Artwork coming soon'}
            </span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {caption && !failed ? (
        <figcaption className="text-mist-400 mt-3 text-center text-sm">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
