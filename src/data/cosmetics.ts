/**
 * Cosmetic showcase content.
 *
 * `image` points at an optional artwork file under /public/images/cosmetics/.
 * Missing files fall back to a styled placeholder, so entries can be added here
 * before the art exists.
 */

export interface RuraStyle {
  id: string
  name: string
  blurb: string
  image: string
}

export interface CosmeticCategory {
  id: string
  title: string
  description: string
  examples: string[]
}

export const ruraStyles: RuraStyle[] = [
  {
    id: 'classic',
    name: 'Classic',
    blurb: 'Rura as you first meet them — pure, warm firefly light.',
    image: '/images/cosmetics/rura-classic.webp',
  },
  {
    id: 'biker',
    name: 'Biker',
    blurb: 'Leather jacket, quiet confidence, same steady glow.',
    image: '/images/cosmetics/rura-biker.webp',
  },
  {
    id: 'joker',
    name: 'Joker',
    blurb: 'A playful hat and a mischievous streak.',
    image: '/images/cosmetics/rura-joker.webp',
  },
  {
    id: 'christmas',
    name: 'Christmas',
    blurb: 'Seasonal cheer for the coldest puzzle nights.',
    image: '/images/cosmetics/rura-christmas.webp',
  },
  {
    id: 'halloween',
    name: 'Halloween',
    blurb: 'A little spooky, still entirely friendly.',
    image: '/images/cosmetics/rura-halloween.webp',
  },
  {
    id: 'football-pro',
    name: 'Football Pro',
    blurb: 'Match-day kit for the competitive solver.',
    image: '/images/cosmetics/rura-football-pro.webp',
  },
]

export const cosmeticCategories: CosmeticCategory[] = [
  {
    id: 'styles',
    title: 'Rura Styles',
    description:
      'Outfits that change how Rura looks without ever changing who Rura is — the same glowing golden firefly, dressed for the occasion.',
    examples: ['Classic', 'Biker', 'Joker', 'Christmas', 'Halloween', 'Football Pro'],
  },
  {
    id: 'trails',
    title: 'Trails',
    description:
      'The light Rura leaves behind when moving across the board. Pick the one that best matches your mood.',
    examples: ['Soft glow', 'Sparkles', 'Embers', 'Stardust'],
  },
  {
    id: 'themes',
    title: 'Board Themes',
    description:
      'Reskin the puzzle board itself, from calm and minimal to rich and atmospheric.',
    examples: ['Midnight', 'Forest', 'Amber', 'Frost'],
  },
]
