/**
 * Single source of truth for values that change outside of code reviews:
 * store links, contact addresses, social profiles and legal dates.
 *
 * Nothing in this file should be duplicated inside components -- import from
 * here instead so a launch-day update is a one-line change.
 */

export interface SocialLinks {
  instagram: string
  youtube: string
  x: string
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  websiteUrl: string
  /** Leave empty until the Google Play listing is public. */
  googlePlayUrl: string
  /** Planned Apple platform release year. */
  appStoreReleaseYear: number
  /** Player support inbox. */
  supportEmail: string
  /** Privacy-rights inbox. May match supportEmail for an individual publisher. */
  privacyEmail: string
  /** Displayed in the footer copyright line. Individual publisher, no company. */
  publisher: string
  /** Public legal/contact address supplied by the individual publisher. */
  businessMailingAddress: string
  /** Portfolio linked from the footer creator credit. */
  creatorUrl: string
  social: SocialLinks
  legal: {
    privacyEffectiveDate: string
    privacyLastUpdated: string
    termsEffectiveDate: string
    termsLastUpdated: string
  }
  /** Shared 1200 × 630 social preview image. */
  ogImage: string
}

export const siteConfig: SiteConfig = {
  name: "Rura’s Escape",
  tagline: 'Light the trail. Solve the puzzle. Help Rura find the way home.',
  description:
    'Help Rura escape four mystical worlds by solving 200 handcrafted checkpoint mazes in a cozy path-puzzle adventure.',
  websiteUrl: 'https://rurasescape.srirajvasireddy.com',

  // TODO: Set to the live Google Play listing URL once the store page is public.
  googlePlayUrl: '',

  appStoreReleaseYear: 2027,

  supportEmail: 'rurasescape@gmail.com',
  privacyEmail: 'rurasescape@gmail.com',

  publisher: 'Sriraj Vasireddy',
  businessMailingAddress: '137 Hodge Ave, Buffalo, NY 14222, United States',
  creatorUrl: 'https://www.srirajvasireddy.com',

  // TODO: Fill in any social profiles that get created; empty values are hidden.
  social: {
    instagram: '',
    youtube: '',
    x: '',
  },

  legal: {
    privacyEffectiveDate: 'August 15, 2026',
    privacyLastUpdated: 'August 16, 2026',
    termsEffectiveDate: 'August 15, 2026',
    termsLastUpdated: 'August 16, 2026',
  },

  ogImage: '/images/og-image.jpg',
}

/** True when the Play Store listing is live and buttons should link out. */
export const hasGooglePlayUrl = siteConfig.googlePlayUrl.trim().length > 0

/** True when a support inbox is configured and mailto links are safe to render. */
export const hasSupportEmail = siteConfig.supportEmail.trim().length > 0

/** Social entries that are actually configured, ready to render as links. */
export const activeSocialLinks = (
  Object.entries(siteConfig.social) as [keyof SocialLinks, string][]
)
  .filter(([, url]) => url.trim().length > 0)
  .map(([key, url]) => ({ key, url }))
