import { useId } from 'react'

const GRID = 5
const CELL = 52
const GAP = 8
const OFFSET = 4

/** Tiles forming the solved route from the start cell to the exit. */
const litPath: Array<[number, number]> = [
  [0, 4],
  [0, 3],
  [0, 2],
  [1, 2],
  [2, 2],
  [2, 1],
  [2, 0],
  [3, 0],
  [4, 0],
]

/** Blocked tiles the route has to work around. */
const blockedTiles: Array<[number, number]> = [
  [1, 4],
  [3, 3],
  [4, 2],
  [1, 1],
]

const EXIT: [number, number] = [4, 0]

const key = (col: number, row: number) => `${col}-${row}`
const litKeys = new Set(litPath.map(([c, r]) => key(c, r)))
const blockedKeys = new Set(blockedTiles.map(([c, r]) => key(c, r)))

const position = (index: number) => OFFSET + index * (CELL + GAP)
const centre = (index: number) => position(index) + CELL / 2

/**
 * Stylised puzzle board used as hero and section artwork.
 *
 * Vector-drawn rather than an image so the hero renders instantly and stays
 * crisp at any size. Replace with a real gameplay capture whenever one exists.
 */
export function PuzzleBoardArt({ className = '' }: { className?: string }) {
  const id = useId()
  const litGradient = `board-lit-${id}`
  const boardGlow = `board-glow-${id}`
  const size = GRID * CELL + (GRID - 1) * GAP + OFFSET * 2

  const cells = []
  for (let row = 0; row < GRID; row += 1) {
    for (let col = 0; col < GRID; col += 1) {
      cells.push({ col, row })
    }
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={litGradient} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffdd85" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f7ac1f" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={boardGlow} cx="18%" cy="86%" r="85%">
          <stop offset="0%" stopColor="#f7ac1f" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#f7ac1f" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width={size} height={size} rx="26" fill="#0a0f20" />
      <rect x="0" y="0" width={size} height={size} rx="26" fill={`url(#${boardGlow})`} />

      {cells.map(({ col, row }) => {
        const cellKey = key(col, row)
        const isLit = litKeys.has(cellKey)
        const isBlocked = blockedKeys.has(cellKey)

        return (
          <g key={cellKey}>
            <rect
              x={position(col)}
              y={position(row)}
              width={CELL}
              height={CELL}
              rx="12"
              fill={isLit ? `url(#${litGradient})` : isBlocked ? '#151d38' : '#0e1428'}
              stroke={isLit ? '#ffdd85' : '#ffffff'}
              strokeOpacity={isLit ? 0.55 : 0.07}
              strokeWidth="1.5"
            />
            {isBlocked ? (
              <rect
                x={position(col) + 14}
                y={position(row) + 14}
                width={CELL - 28}
                height={CELL - 28}
                rx="6"
                fill="#2b3a63"
                fillOpacity="0.9"
              />
            ) : null}
          </g>
        )
      })}

      {/* Exit portal */}
      <circle
        cx={centre(EXIT[0])}
        cy={centre(EXIT[1])}
        r="15"
        fill="none"
        stroke="#fff7e0"
        strokeOpacity="0.85"
        strokeWidth="2.5"
      />
      <circle cx={centre(EXIT[0])} cy={centre(EXIT[1])} r="7" fill="#fff7e0" fillOpacity="0.9" />
    </svg>
  )
}
