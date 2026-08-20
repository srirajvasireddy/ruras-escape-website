/**
 * Small inline icon set.
 *
 * Everything is drawn with currentColor so icons inherit text colour, and no
 * icon library ships in the bundle. Decorative by default: pass a `title` only
 * when the icon carries meaning on its own.
 */

export type IconName =
  | 'puzzle'
  | 'map'
  | 'leaf'
  | 'calendar'
  | 'sparkles'
  | 'lightbulb'
  | 'trophy'
  | 'card'
  | 'bug'
  | 'shield'
  | 'mail'
  | 'arrowRight'
  | 'chevronDown'
  | 'menu'
  | 'close'
  | 'externalLink'

const paths: Record<IconName, string[]> = {
  puzzle: [
    'M9 4.5a2 2 0 1 1 4 0V6h3.5A1.5 1.5 0 0 1 18 7.5V11h1.5a2 2 0 1 1 0 4H18v3.5a1.5 1.5 0 0 1-1.5 1.5H13v-1.5a2 2 0 1 0-4 0V20H5.5A1.5 1.5 0 0 1 4 18.5V15h1.5a2 2 0 1 0 0-4H4V7.5A1.5 1.5 0 0 1 5.5 6H9V4.5Z',
  ],
  map: ['M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z', 'M9 4v13', 'M15 6.5v13'],
  leaf: ['M4 20c0-8.3 6-14 16-14 0 10-6.3 15-13 15H4v-1Z', 'M4.5 19.5c3-4.5 6.5-7.3 10.5-9'],
  calendar: [
    'M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v10a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-10Z',
    'M4 10h16',
    'M9 3v4',
    'M15 3v4',
  ],
  sparkles: [
    'M11 3.5 12.6 8 17 9.6 12.6 11.2 11 15.7 9.4 11.2 5 9.6 9.4 8 11 3.5Z',
    'M18 14.5l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4Z',
  ],
  lightbulb: [
    'M12 3a6 6 0 0 0-3.4 10.9c.6.4.9 1 .9 1.7V17h5v-1.4c0-.7.3-1.3.9-1.7A6 6 0 0 0 12 3Z',
    'M9.5 20h5',
  ],
  trophy: [
    'M8 4h8v5.5a4 4 0 0 1-8 0V4Z',
    'M8 5.5H5V7a3.5 3.5 0 0 0 3.2 3.5',
    'M16 5.5h3V7a3.5 3.5 0 0 1-3.2 3.5',
    'M12 13.5V17',
    'M8.5 20h7',
  ],
  card: [
    'M3 8a2.5 2.5 0 0 1 2.5-2.5h13A2.5 2.5 0 0 1 21 8v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16V8Z',
    'M3 10.5h18',
    'M6.5 15h3.5',
  ],
  bug: [
    'M8 9a4 4 0 1 1 8 0v4.5a4 4 0 0 1-8 0V9Z',
    'M8 11H4.5',
    'M19.5 11H16',
    'M8 15.5 4.8 17',
    'M16 15.5l3.2 1.5',
    'M9.2 6 7.5 4',
    'M14.8 6 16.5 4',
  ],
  shield: ['M12 3.2 19 6v6c0 4.3-2.9 8-7 8.8C7.9 20 5 16.3 5 12V6l7-2.8Z', 'm9.2 12 2 2 3.6-3.7'],
  mail: [
    'M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Z',
    'm3.6 7 8.4 5.8L20.4 7',
  ],
  arrowRight: ['M4.5 12h15', 'm13.5 6 6 6-6 6'],
  chevronDown: ['m6.5 9.5 5.5 5.5 5.5-5.5'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['m6.5 6.5 11 11', 'm17.5 6.5-11 11'],
  externalLink: ['M14 4.5h5.5V10', 'M19.5 4.5 12 12', 'M18 14v4.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4.5'],
}

export interface IconProps {
  name: IconName
  className?: string
  /** Accessible label. Omit for purely decorative icons. */
  title?: string
  strokeWidth?: number
}

export function Icon({ name, className = 'h-5 w-5', title, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

/** The Google Play mark, drawn as the four facets of the store's prism. */
export function GooglePlayMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" role="presentation">
      <path d="M4 2.5 13 12l-9 9.5V2.5Z" fill="currentColor" opacity="0.95" />
      <path d="M4 2.5 16.8 8.1 13 12 4 2.5Z" fill="currentColor" opacity="0.72" />
      <path d="M4 21.5 13 12l3.8 3.9L4 21.5Z" fill="currentColor" opacity="0.72" />
      <path d="M16.8 8.1 20.6 12l-3.8 3.9L13 12l3.8-3.9Z" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
