/** Navigation shared by the header and the footer. */

export interface NavLink {
  label: string
  /** Route path, or a home-page hash target such as `/#game`. */
  href: string
}

/** Anchor ids used by the home page sections that navigation scrolls to. */
export const HOME_SECTION_IDS = {
  story: 'story',
  game: 'game',
  mechanics: 'mechanics',
  features: 'game',
  rura: 'rewards',
  modes: 'modes',
  cosmetics: 'cosmetics',
  collection: 'collection',
  screenshots: 'worlds',
  download: 'download',
} as const

export const primaryNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Story', href: `/#${HOME_SECTION_IDS.story}` },
  { label: 'Game', href: `/#${HOME_SECTION_IDS.game}` },
  { label: 'Modes', href: `/#${HOME_SECTION_IDS.modes}` },
  { label: 'Collection', href: `/#${HOME_SECTION_IDS.collection}` },
  { label: 'Support', href: '/support' },
]

export const footerNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Support', href: '/support' },
]
