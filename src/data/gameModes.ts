import type { IconName } from '../components/ui/Icon'

export interface GameMode {
  id: string
  name: string
  tagline: string
  description: string
  icon: IconName
  /** Tailwind classes for the mode card's accent treatment. */
  accent: {
    text: string
    glow: string
    border: string
  }
}

export const gameModes: GameMode[] = [
  {
    id: 'campaign',
    name: 'Campaign',
    tagline: 'The main journey',
    description:
      'A structured progression of handcrafted levels. New mechanics arrive one at a time, then start working together as the worlds open up.',
    icon: 'map',
    accent: {
      text: 'text-glow-300',
      glow: 'bg-glow-400/20',
      border: 'group-hover:border-glow-400/40',
    },
  },
  {
    id: 'chill-mode',
    name: 'Chill Mode',
    tagline: 'Puzzles without pressure',
    description:
      'Browse puzzle collections grouped by difficulty and solve whatever suits the moment. No progress gates, no timers — just the puzzle in front of you.',
    icon: 'leaf',
    accent: {
      text: 'text-aurora-300',
      glow: 'bg-aurora-400/20',
      border: 'group-hover:border-aurora-400/40',
    },
  },
  {
    id: 'daily-puzzle',
    name: 'Daily Puzzle',
    tagline: 'A new one every day',
    description:
      'One fresh puzzle, every day, for everyone. A few focused minutes that fit neatly into a commute or a coffee break.',
    icon: 'calendar',
    accent: {
      text: 'text-dusk-300',
      glow: 'bg-dusk-400/20',
      border: 'group-hover:border-dusk-400/40',
    },
  },
  {
    id: 'weekly-puzzle',
    name: 'Weekly Puzzle',
    tagline: 'The bigger challenge',
    description:
      'A larger recurring puzzle for when you want something to chew on. Bring your best planning — these are built to make you think.',
    icon: 'trophy',
    accent: {
      text: 'text-glow-300',
      glow: 'bg-glow-500/20',
      border: 'group-hover:border-glow-500/40',
    },
  },
]
