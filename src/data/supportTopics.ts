import type { IconName } from '../components/ui/Icon'

export interface SupportTopic {
  id: string
  title: string
  description: string
  icon: IconName
  /** Optional extra guidance rendered as a short list. */
  points?: string[]
}

export const supportTopics: SupportTopic[] = [
  {
    id: 'gameplay',
    title: 'Gameplay questions',
    description:
      'Stuck on a level, unsure how a mechanic works, or wondering what a mode is for? Tell us where you are and what you have tried.',
    icon: 'puzzle',
    points: ['The level or mode you are playing', 'What you expected to happen'],
  },
  {
    id: 'purchases',
    title: 'Purchase issues',
    description:
      'Purchases in the game are processed through Google Play. Billing problems, payment methods and refund requests are handled by Google Play under its own policies, so start there — we can help with anything that did not appear in the game afterwards.',
    icon: 'card',
    points: [
      'Raise billing and refund requests through Google Play',
      'Contact us if a completed purchase is missing in-game',
    ],
  },
  {
    id: 'ads',
    title: 'Ads & rewards',
    description:
      'If a rewarded ad failed to load, cut out partway, or did not grant the Rura Coins you earned, let us know what happened.',
    icon: 'sparkles',
    points: ['Roughly when it happened', 'Whether the ad finished playing'],
  },
  {
    id: 'bugs',
    title: 'Bugs & crashes',
    description:
      'Something broken, frozen or visually wrong? Detailed reports get fixed fastest.',
    icon: 'bug',
    points: [
      'Device model and Android version',
      'Steps that reproduce the problem',
      'A screenshot or recording if you have one',
    ],
  },
  {
    id: 'feedback',
    title: 'Feedback & ideas',
    description:
      'Puzzle ideas, cosmetics you would like to see, or notes on difficulty — player feedback genuinely shapes what gets built next.',
    icon: 'lightbulb',
  },
  {
    id: 'privacy',
    title: 'Privacy questions',
    description:
      'Questions about data, advertising consent or your privacy choices are covered on the privacy policy page, and you can always reach out directly.',
    icon: 'shield',
  },
]
