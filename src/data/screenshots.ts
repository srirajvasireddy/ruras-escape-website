/**
 * Gameplay gallery.
 *
 * Drop real captures at the paths below (portrait phone screenshots, ideally
 * .webp around 1080x1920) and they appear automatically. Until then each card
 * renders a labelled placeholder rather than a broken image.
 */

export interface Screenshot {
  id: string
  src: string
  alt: string
  caption: string
}

export const screenshots: Screenshot[] = [
  {
    id: 'gameplay-1',
    src: '/images/screenshots/gameplay-1.webp',
    alt: "A Rura’s Escape puzzle board with Rura glowing at the start of a path",
    caption: 'Plan the route',
  },
  {
    id: 'gameplay-2',
    src: '/images/screenshots/gameplay-2.webp',
    alt: 'Rura moving through a puzzle level, leaving a glowing trail behind',
    caption: 'Light the way',
  },
  {
    id: 'gameplay-3',
    src: '/images/screenshots/gameplay-3.webp',
    alt: 'A completed puzzle level with Rura reaching the exit',
    caption: 'Find the escape',
  },
  {
    id: 'gameplay-4',
    src: '/images/screenshots/gameplay-4.webp',
    alt: 'The Chill Mode puzzle collection screen',
    caption: 'Chill Mode collections',
  },
  {
    id: 'gameplay-5',
    src: '/images/screenshots/gameplay-5.webp',
    alt: 'The cosmetics screen showing Rura outfits and trails',
    caption: 'Make Rura yours',
  },
  {
    id: 'gameplay-6',
    src: '/images/screenshots/gameplay-6.webp',
    alt: 'The daily puzzle screen',
    caption: 'Daily challenge',
  },
]
