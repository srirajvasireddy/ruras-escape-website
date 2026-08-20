import type { IconName } from '../components/ui/Icon'

export interface Feature {
  id: string
  title: string
  description: string
  icon: IconName
}

/**
 * Marketing copy for the feature grid. Every claim here maps to something that
 * exists in the game today -- no multiplayer, leaderboards or cloud saves.
 */
export const features: Feature[] = [
  {
    id: 'handcrafted-puzzles',
    title: 'Handcrafted Puzzles',
    description:
      'Every level is designed by hand, not generated. Each one is a small, self-contained problem built to reward patience, spatial reasoning and a plan made two moves ahead.',
    icon: 'puzzle',
  },
  {
    id: 'campaign',
    title: 'A Growing Campaign',
    description:
      'Work through worlds that introduce new ideas gently, then ask you to combine them. The difficulty curve climbs, but never leaves you behind.',
    icon: 'map',
  },
  {
    id: 'chill-mode',
    title: 'Chill Mode',
    description:
      'Puzzle collections sorted by difficulty, with no pressure attached. Pick a level that matches your mood and take as long as you like.',
    icon: 'leaf',
  },
  {
    id: 'daily-weekly',
    title: 'Daily & Weekly Challenges',
    description:
      'A fresh puzzle each day and a larger one each week — a short, satisfying reason to come back and keep your thinking sharp.',
    icon: 'calendar',
  },
  {
    id: 'customize-rura',
    title: 'Customize Rura',
    description:
      'Earn Rura Coins as you play and spend them on outfits, glowing trails and puzzle board themes that make the game feel like yours.',
    icon: 'sparkles',
  },
  {
    id: 'play-your-way',
    title: 'Play Your Way',
    description:
      'Hints are there when a level stops being fun and starts being a wall. Use one, or ignore them entirely — progression respects both choices.',
    icon: 'lightbulb',
  },
]
