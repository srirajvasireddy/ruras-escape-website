import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { trackEvent } from '../../lib/analytics'

type Hex = { q: number; r: number }
type Axis = 'q' | 'r' | 's' | 'free'
type BlockStyle = 'amber' | 'stone' | 'moss'

type BlockDefinition = {
  id: string
  cells: Hex[]
  movementAxis: Axis
  visualStyle: BlockStyle
}

type LevelDefinition = {
  id: number
  name: string
  start: Hex
  home: Hex
  blocks: BlockDefinition[]
}

type BoardState = { firefly: Hex; anchors: Hex[] }
type PuzzleMove =
  | { type: 'block'; blockId: string; cells: Hex[] }
  | { type: 'firefly'; to: Hex }

const AXIS_DIRECTIONS: Record<Axis, readonly Hex[]> = {
  q: [{ q: 1, r: 0 }, { q: -1, r: 0 }],
  r: [{ q: 0, r: 1 }, { q: 0, r: -1 }],
  s: [{ q: 1, r: -1 }, { q: -1, r: 1 }],
  free: [
    { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
    { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 },
  ],
}

const BOARD_CELLS: Hex[] = [3, 4, 5, 4, 3].flatMap((width, index) => {
  const r = index - 2
  const qStart = Math.round(-(width - 1) / 2 - r / 2)
  return Array.from({ length: width }, (_, offset) => ({ q: qStart + offset, r }))
})

const LEVEL_ONE: LevelDefinition = {
  id: 1,
  name: 'Choose Your Door',
  start: { q: 1, r: -2 },
  home: { q: -1, r: 2 },
  blocks: [
    { id: 'tower', cells: [{ q: 1, r: 0 }, { q: 1, r: 1 }], movementAxis: 'r', visualStyle: 'amber' },
    { id: 'bar', cells: [{ q: -1, r: 1 }, { q: 0, r: 1 }], movementAxis: 'q', visualStyle: 'moss' },
    { id: 'beam', cells: [{ q: -2, r: 1 }, { q: -1, r: 0 }], movementAxis: 's', visualStyle: 'amber' },
    { id: 'mid-stone', cells: [{ q: 0, r: -1 }], movementAxis: 'free', visualStyle: 'stone' },
    { id: 'east-stone', cells: [{ q: 1, r: -1 }], movementAxis: 'free', visualStyle: 'stone' },
  ],
}

const TRAIL_SEVENTEEN: LevelDefinition = {
  id: 17,
  name: 'Crossed Reeds',
  start: { q: 1, r: -2 },
  home: { q: 0, r: 2 },
  blocks: [
    { id: 'anvil', cells: [{ q: 1, r: -1 }, { q: 1, r: 0 }], movementAxis: 'r', visualStyle: 'amber' },
    { id: 'barrow', cells: [{ q: -1, r: 1 }, { q: 0, r: 0 }], movementAxis: 's', visualStyle: 'amber' },
    { id: 'cinder', cells: [{ q: 0, r: 1 }], movementAxis: 's', visualStyle: 'stone' },
    { id: 'drift', cells: [{ q: -2, r: 2 }], movementAxis: 's', visualStyle: 'moss' },
    { id: 'ember', cells: [{ q: 2, r: -2 }, { q: 2, r: -1 }], movementAxis: 'r', visualStyle: 'amber' },
    { id: 'fallow', cells: [{ q: -1, r: 2 }], movementAxis: 'q', visualStyle: 'moss' },
    { id: 'gorse', cells: [{ q: -1, r: 0 }], movementAxis: 's', visualStyle: 'stone' },
  ],
}

const TRAIL_SEVENTEEN_SOLUTION: PuzzleMove[] = [
  { type: 'block', blockId: 'anvil', cells: [{ q: 1, r: 0 }, { q: 1, r: 1 }] },
  { type: 'block', blockId: 'ember', cells: [{ q: 2, r: -1 }, { q: 2, r: 0 }] },
  { type: 'block', blockId: 'barrow', cells: [{ q: 1, r: -1 }, { q: 2, r: -2 }] },
  { type: 'block', blockId: 'drift', cells: [{ q: 0, r: 0 }] },
  { type: 'block', blockId: 'fallow', cells: [{ q: -2, r: 2 }] },
  { type: 'firefly', to: { q: 0, r: 2 } },
]

const TRAIL_STEPS = [
  'Lower the first amber reed and create space in the center.',
  'Bring the eastern reed down to unlock the upper lane.',
  'Slide the crossed reed up and right into the space you made.',
  'Move the green stone through the newly opened center.',
  'Shift the last green stone left. The trail is now clear.',
  'Guide Rura along the open path and across the checkpoint.',
] as const

const keyOf = (hex: Hex) => `${hex.q},${hex.r}`
const sameHex = (a: Hex, b: Hex) => a.q === b.q && a.r === b.r
const addHex = (a: Hex, b: Hex, distance = 1): Hex => ({ q: a.q + b.q * distance, r: a.r + b.r * distance })
const WALKABLE = new Set(BOARD_CELLS.map(keyOf))

function initialState(level: LevelDefinition): BoardState {
  return { firefly: { ...level.start }, anchors: level.blocks.map((block) => ({ ...block.cells[0]! })) }
}

function blockCells(level: LevelDefinition, state: BoardState, index: number): Hex[] {
  const definition = level.blocks[index]!
  const origin = definition.cells[0]!
  const stateAnchor = state.anchors[index]!
  return definition.cells.map((cell) => ({
    q: stateAnchor.q + cell.q - origin.q,
    r: stateAnchor.r + cell.r - origin.r,
  }))
}

function occupiedCells(level: LevelDefinition, state: BoardState, excluded = -1): Set<string> {
  const occupied = new Set<string>()
  level.blocks.forEach((_, index) => {
    if (index !== excluded) blockCells(level, state, index).forEach((cell) => occupied.add(keyOf(cell)))
  })
  return occupied
}

function legalBlockMoves(level: LevelDefinition, state: BoardState, index: number): Hex[][] {
  const definition = level.blocks[index]!
  const definitionAnchor = definition.cells[0]!
  const stateAnchor = state.anchors[index]!
  const occupied = occupiedCells(level, state, index)
  occupied.add(keyOf(state.firefly))
  const destinations: Hex[][] = []

  for (const direction of AXIS_DIRECTIONS[definition.movementAxis]) {
    for (let distance = 1; ; distance += 1) {
      const anchor = addHex(stateAnchor, direction, distance)
      const cells = definition.cells.map((cell) => ({
        q: anchor.q + cell.q - definitionAnchor.q,
        r: anchor.r + cell.r - definitionAnchor.r,
      }))
      const valid = cells.every((cell) => WALKABLE.has(keyOf(cell)) && !occupied.has(keyOf(cell)) && !sameHex(cell, level.home))
      if (!valid) break
      destinations.push(cells)
    }
  }
  return destinations
}

function fireflyDestinations(level: LevelDefinition, state: BoardState): Hex[] {
  const occupied = occupiedCells(level, state)
  const visited = new Set<string>([keyOf(state.firefly)])
  const queue = [state.firefly]
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const direction of AXIS_DIRECTIONS.free) {
      const next = addHex(queue[cursor]!, direction)
      const key = keyOf(next)
      if (!visited.has(key) && WALKABLE.has(key) && !occupied.has(key)) {
        visited.add(key)
        queue.push(next)
      }
    }
  }
  return queue.slice(1)
}

function fireflyPath(level: LevelDefinition, state: BoardState, destination: Hex): Hex[] {
  const occupied = occupiedCells(level, state)
  const startKey = keyOf(state.firefly)
  const visited = new Set<string>([startKey])
  const queue: { cell: Hex; path: Hex[] }[] = [{ cell: state.firefly, path: [] }]

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!
    for (const direction of AXIS_DIRECTIONS.free) {
      const next = addHex(current.cell, direction)
      const key = keyOf(next)
      if (visited.has(key) || !WALKABLE.has(key) || occupied.has(key)) continue
      const path = [...current.path, next]
      if (sameHex(next, destination)) return path
      visited.add(key)
      queue.push({ cell: next, path })
    }
  }

  return []
}

function applyMove(level: LevelDefinition, state: BoardState, move: PuzzleMove): BoardState {
  if (move.type === 'firefly') return { ...state, firefly: { ...move.to } }
  const index = level.blocks.findIndex((block) => block.id === move.blockId)
  const anchors = state.anchors.slice()
  anchors[index] = { ...move.cells[0]! }
  return { ...state, anchors }
}

function stateKey(state: BoardState): string {
  return `${keyOf(state.firefly)}|${state.anchors.map(keyOf).join('|')}`
}

function solve(level: LevelDefinition, start: BoardState): PuzzleMove[] | null {
  if (sameHex(start.firefly, level.home)) return []
  const states = [start]
  const parents = [-1]
  const parentMoves: (PuzzleMove | null)[] = [null]
  const seen = new Set([stateKey(start)])

  for (let cursor = 0; cursor < states.length && states.length < 60000; cursor += 1) {
    const state = states[cursor]!
    const moves: PuzzleMove[] = []
    level.blocks.forEach((block, index) => {
      legalBlockMoves(level, state, index).forEach((cells) => moves.push({ type: 'block', blockId: block.id, cells }))
    })
    fireflyDestinations(level, state).forEach((to) => moves.push({ type: 'firefly', to }))

    for (const move of moves) {
      const next = applyMove(level, state, move)
      const key = stateKey(next)
      if (seen.has(key)) continue
      seen.add(key)
      states.push(next)
      parents.push(cursor)
      parentMoves.push(move)
      if (sameHex(next.firefly, level.home)) {
        const path: PuzzleMove[] = []
        let index = states.length - 1
        while ((parents[index] ?? -1) >= 0) {
          path.unshift(parentMoves[index]!)
          index = parents[index]!
        }
        return path
      }
    }
  }
  return null
}

function directionLabel(from: Hex, to: Hex): string {
  const dx = to.q + to.r / 2 - (from.q + from.r / 2)
  const dy = to.r - from.r
  if (Math.abs(dx) > Math.abs(dy) * 0.55) return dx > 0 ? 'right' : 'left'
  return dy > 0 ? 'down' : 'up'
}

function hintMessage(level: LevelDefinition, state: BoardState, move: PuzzleMove): string {
  if (move.type === 'firefly') {
    return sameHex(move.to, level.home) ? 'The trail is open—guide Rura to the checkpoint.' : `Guide Rura ${directionLabel(state.firefly, move.to)} to the glowing cell.`
  }
  const index = level.blocks.findIndex((block) => block.id === move.blockId)
  return `Slide the glowing ${level.blocks[index]!.cells.length > 1 ? 'long block' : 'stone'} ${directionLabel(state.anchors[index]!, move.cells[0]!)}.`
}

function pieceImage(block: BlockDefinition): string {
  if (block.movementAxis === 'q') return '/assets/board/block-tan.webp'
  if (block.movementAxis === 'r') return '/assets/board/block-orange.webp'
  if (block.movementAxis === 's') return '/assets/board/block-green.webp'
  return '/assets/board/block-purple.webp'
}

export function CheckpointFlag({ className = '' }: { className?: string }) {
  return (
    <span className={`checkpoint-flag ${className}`} role="img" aria-label="Finish checkpoint">
      <i className="checkpoint-flag__halo" />
      <i className="checkpoint-flag__pole" />
      <i className="checkpoint-flag__pennant" />
      <i className="checkpoint-flag__base" />
    </span>
  )
}

function nearestBoardHex(event: ReactPointerEvent<HTMLElement>): Hex {
  const board = event.currentTarget.parentElement!.getBoundingClientRect()
  let nearest = BOARD_CELLS[0]!
  let nearestDistance = Number.POSITIVE_INFINITY
  for (const cell of BOARD_CELLS) {
    const x = board.left + board.width * (0.5 + (cell.q + cell.r / 2) * 0.225)
    const y = board.top + board.height * (0.5 + cell.r * 0.198)
    const distance = Math.hypot(event.clientX - x, event.clientY - y)
    if (distance < nearestDistance) {
      nearest = cell
      nearestDistance = distance
    }
  }
  return nearest
}

type DragPiece = { kind: 'block'; id: string } | { kind: 'firefly'; id: 'rura' }

function adjacentPairs(cells: Hex[]): { first: Hex; second: Hex; angle: number }[] {
  const pairs: { first: Hex; second: Hex; angle: number }[] = []
  for (let firstIndex = 0; firstIndex < cells.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < cells.length; secondIndex += 1) {
      const first = cells[firstIndex]!
      const second = cells[secondIndex]!
      const dq = second.q - first.q
      const dr = second.r - first.r
      const ds = -dq - dr
      if (Math.max(Math.abs(dq), Math.abs(dr), Math.abs(ds)) !== 1) continue
      const angle = dr === 0 ? 90 : dq === 0 ? 149 : 31
      pairs.push({ first, second, angle })
    }
  }
  return pairs
}

type PuzzleBoardProps = {
  level: LevelDefinition
  state: BoardState
  selectedBlock?: string | null
  targets?: Hex[][]
  hintedMove?: PuzzleMove | null
  draggingPiece?: string | null
  dragOffset?: { x: number; y: number }
  demonstrationMove?: PuzzleMove | null
  demonstrationDragging?: boolean
  demonstrationPosition?: Hex | null
  interactive?: boolean
  completed?: boolean
  onCompletionClose?: () => void
  onBlockClick?: (id: string) => void
  onTargetClick?: (cells: Hex[]) => void
  onFireflyClick?: () => void
  onPiecePointerDown?: (piece: DragPiece, event: ReactPointerEvent<HTMLButtonElement>) => void
  onPiecePointerMove?: (piece: DragPiece, event: ReactPointerEvent<HTMLButtonElement>) => void
  onPiecePointerUp?: (piece: DragPiece, event: ReactPointerEvent<HTMLButtonElement>) => void
}

function PuzzleBoard({ level, state, selectedBlock, targets = [], hintedMove, draggingPiece, dragOffset, demonstrationMove, demonstrationDragging, demonstrationPosition, interactive, completed, onCompletionClose, onBlockClick, onTargetClick, onFireflyClick, onPiecePointerDown, onPiecePointerMove, onPiecePointerUp }: PuzzleBoardProps) {
  const hintedKeys = new Set(
    hintedMove?.type === 'block' ? hintedMove.cells.map(keyOf) : hintedMove?.type === 'firefly' ? [keyOf(hintedMove.to)] : [],
  )
  const demonstrationDelta = (pieceId: string): { x: string; y: string } => {
    if (!demonstrationDragging || !demonstrationMove) return { x: '0%', y: '0%' }
    if (demonstrationMove.type === 'firefly') {
      if (pieceId !== 'rura') return { x: '0%', y: '0%' }
      const destination = demonstrationPosition ?? demonstrationMove.to
      const dq = destination.q - state.firefly.q
      const dr = destination.r - state.firefly.r
      return { x: `${(dq + dr / 2) * 22.5}%`, y: `${dr * 19.8}%` }
    }
    if (demonstrationMove.blockId !== pieceId) return { x: '0%', y: '0%' }
    const blockIndex = level.blocks.findIndex((block) => block.id === pieceId)
    const dq = demonstrationMove.cells[0]!.q - state.anchors[blockIndex]!.q
    const dr = demonstrationMove.cells[0]!.r - state.anchors[blockIndex]!.r
    return { x: `${(dq + dr / 2) * 22.5}%`, y: `${dr * 19.8}%` }
  }

  return (
    // Board interactions are reported as game_* events, so the generic click
    // tracker skips this subtree rather than logging every tap on a hex.
    <div className={`web-puzzle-board${completed ? ' is-complete' : ''}`} data-analytics-skip role="group" aria-label={`Trail ${level.id}: ${level.name}`}>
      {BOARD_CELLS.map((cell) => (
        <img key={`tile-${keyOf(cell)}`} className="web-puzzle-board__tile" src="/assets/themes/tiles/classic.webp" alt="" width="384" height="384" loading="lazy" decoding="async" style={{ '--q': cell.q + cell.r / 2, '--r': cell.r } as CSSProperties} />
      ))}
      <span className="web-puzzle-board__checkpoint-position" style={{ '--q': level.home.q + level.home.r / 2, '--r': level.home.r } as CSSProperties}>
        <CheckpointFlag />
      </span>
      {level.blocks.flatMap((block, index) => {
        const demo = demonstrationDelta(block.id)
        return blockCells(level, state, index).map((cell, cellIndex) => (
        <button
          className={`web-puzzle-board__piece web-puzzle-board__piece--${block.visualStyle} web-puzzle-board__piece--axis-${block.movementAxis}${selectedBlock === block.id ? ' is-selected' : ''}${draggingPiece === block.id ? ' is-dragging' : ''}${demonstrationDragging && demonstrationMove?.type === 'block' && demonstrationMove.blockId === block.id ? ' is-demonstrating' : ''}`}
          key={`${block.id}-${cellIndex}`}
          type="button"
          style={{ '--q': cell.q + cell.r / 2, '--r': cell.r, '--drag-x': draggingPiece === block.id ? `${dragOffset?.x ?? 0}px` : '0px', '--drag-y': draggingPiece === block.id ? `${dragOffset?.y ?? 0}px` : '0px', '--demo-x': demo.x, '--demo-y': demo.y } as CSSProperties}
          aria-label={`Drag ${block.cells.length > 1 ? 'long block' : 'stone'} ${block.id}`}
          aria-hidden={cellIndex > 0 ? true : undefined}
          tabIndex={cellIndex > 0 ? -1 : undefined}
          disabled={!interactive}
          onClick={() => onBlockClick?.(block.id)}
          onPointerDown={(event) => onPiecePointerDown?.({ kind: 'block', id: block.id }, event)}
          onPointerMove={(event) => onPiecePointerMove?.({ kind: 'block', id: block.id }, event)}
          onPointerUp={(event) => onPiecePointerUp?.({ kind: 'block', id: block.id }, event)}
          onPointerCancel={(event) => onPiecePointerUp?.({ kind: 'block', id: block.id }, event)}
        ><img src={pieceImage(block)} alt="" width="512" height="512" loading="lazy" decoding="async" /></button>
        ))
      })}
      {level.blocks.flatMap((block, index) => {
        const cells = blockCells(level, state, index)
        const demo = demonstrationDelta(block.id)
        return adjacentPairs(cells).map(({ first, second, angle }, pairIndex) => (
          <span
            className={`web-puzzle-board__joint${selectedBlock === block.id ? ' is-selected' : ''}${draggingPiece === block.id ? ' is-dragging' : ''}${demonstrationDragging && demonstrationMove?.type === 'block' && demonstrationMove.blockId === block.id ? ' is-demonstrating' : ''}`}
            key={`${block.id}-joint-${pairIndex}`}
            style={{
              '--q': (first.q + first.r / 2 + second.q + second.r / 2) / 2,
              '--r': (first.r + second.r) / 2,
              '--joint-angle': `${angle}deg`,
              '--drag-x': draggingPiece === block.id ? `${dragOffset?.x ?? 0}px` : '0px',
              '--drag-y': draggingPiece === block.id ? `${dragOffset?.y ?? 0}px` : '0px',
              '--demo-x': demo.x,
              '--demo-y': demo.y,
            } as CSSProperties}
            aria-hidden="true"
          ><i /><b /><b /></span>
        ))
      })}
      <button
        className={`web-puzzle-board__rura${hintedMove?.type === 'firefly' ? ' is-selected' : ''}${draggingPiece === 'rura' ? ' is-dragging' : ''}${demonstrationDragging && demonstrationMove?.type === 'firefly' ? ' is-demonstrating is-following-path' : ''}`}
        type="button"
        style={{ '--q': state.firefly.q + state.firefly.r / 2, '--r': state.firefly.r, '--drag-x': draggingPiece === 'rura' ? `${dragOffset?.x ?? 0}px` : '0px', '--drag-y': draggingPiece === 'rura' ? `${dragOffset?.y ?? 0}px` : '0px', '--demo-x': demonstrationDelta('rura').x, '--demo-y': demonstrationDelta('rura').y } as CSSProperties}
        aria-label="Drag Rura"
        disabled={!interactive || completed}
        onClick={onFireflyClick}
        onPointerDown={(event) => onPiecePointerDown?.({ kind: 'firefly', id: 'rura' }, event)}
        onPointerMove={(event) => onPiecePointerMove?.({ kind: 'firefly', id: 'rura' }, event)}
        onPointerUp={(event) => onPiecePointerUp?.({ kind: 'firefly', id: 'rura' }, event)}
        onPointerCancel={(event) => onPiecePointerUp?.({ kind: 'firefly', id: 'rura' }, event)}
      ><img src="/assets/rura/rura-board-classic.webp" alt="" width="512" height="512" loading="lazy" decoding="async" /></button>
      {targets.map((cells) => {
        const anchor = cells[0]!
        const hinted = cells.some((cell) => hintedKeys.has(keyOf(cell)))
        return (
          <button
            className={`web-puzzle-board__target${hinted ? ' is-hinted' : ''}`}
            key={`target-${cells.map(keyOf).join('-')}`}
            type="button"
            style={{ '--q': anchor.q + anchor.r / 2, '--r': anchor.r } as CSSProperties}
            aria-label="Move to highlighted cell"
            disabled={!interactive}
            onClick={() => onTargetClick?.(cells)}
          />
        )
      })}
      {completed && (
        <div className="web-puzzle-board__victory">
          <span className="web-puzzle-board__victory-mark">✦</span>
          <small>TRAIL {String(level.id).padStart(2, '0')} COMPLETE</small>
          <strong>Checkpoint reached</strong>
          <p>The trail is clear.</p>
          {onCompletionClose && <button type="button" onClick={onCompletionClose}>Close</button>}
        </div>
      )}
    </div>
  )
}

export function TrailSeventeenDemo() {
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState<'select' | 'drag'>('select')
  const [flightIndex, setFlightIndex] = useState(0)
  const [playing, setPlaying] = useState(() => typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const state = useMemo(
    () => TRAIL_SEVENTEEN_SOLUTION.slice(0, step).reduce((current, move) => applyMove(TRAIL_SEVENTEEN, current, move), initialState(TRAIL_SEVENTEEN)),
    [step],
  )
  const activeMove = step < TRAIL_SEVENTEEN_SOLUTION.length ? TRAIL_SEVENTEEN_SOLUTION[step] : null
  const openFlightPath = useMemo(
    () => activeMove?.type === 'firefly' ? fireflyPath(TRAIL_SEVENTEEN, state, activeMove.to) : [],
    [activeMove, state],
  )

  useEffect(() => {
    if (!playing) return
    if (step === TRAIL_SEVENTEEN_SOLUTION.length) {
      const timer = window.setTimeout(() => { setStep(0); setPhase('select'); setFlightIndex(0) }, 2800)
      return () => window.clearTimeout(timer)
    }
    const timer = window.setTimeout(() => {
      if (phase === 'select') {
        setFlightIndex(0)
        setPhase('drag')
      } else if (activeMove?.type === 'firefly' && flightIndex < openFlightPath.length - 1) {
        setFlightIndex((current) => current + 1)
      } else {
        setStep((current) => current + 1)
        setPhase('select')
        setFlightIndex(0)
      }
    }, phase === 'select' ? 850 : activeMove?.type === 'firefly' ? 360 : 1150)
    return () => window.clearTimeout(timer)
  }, [activeMove, flightIndex, openFlightPath.length, phase, playing, step])

  const selectionInstruction = activeMove?.type === 'firefly'
    ? 'Select Rura for the final flight.'
    : `Select the ${activeMove ? TRAIL_SEVENTEEN.blocks.find((block) => block.id === activeMove.blockId)!.cells.length > 1 ? 'joined double block' : 'single stone' : 'next piece'}.`

  return (
    <article className="trail-demo">
      <div className="trail-demo__topline">
        <div><span>GUIDED SOLUTION · THE FIREFLY FIELDS</span><strong>Trail 17 · Crossed Reeds</strong></div>
        <span>PERFECT · 6</span>
      </div>
      <PuzzleBoard
        level={TRAIL_SEVENTEEN}
        state={state}
        selectedBlock={activeMove?.type === 'block' ? activeMove.blockId : null}
        hintedMove={activeMove}
        demonstrationMove={activeMove}
        demonstrationDragging={phase === 'drag'}
        demonstrationPosition={activeMove?.type === 'firefly' ? openFlightPath[flightIndex] ?? activeMove.to : null}
        completed={step === 6}
      />
      <div className="trail-demo__progress" aria-label={`Move ${Math.min(step + 1, 6)} of 6`}>
        {TRAIL_SEVENTEEN_SOLUTION.map((_, index) => <span className={index < step ? 'is-done' : index === step ? 'is-current' : ''} key={index} />)}
      </div>
      <div className="trail-demo__caption" aria-live="polite">
        <span>{step === 6 ? 'TRAIL COMPLETE' : `${phase === 'select' ? 'SELECT' : 'DRAG'} · MOVE ${step + 1} OF 6`}</span>
        <p>{step === 6 ? 'Five careful slides create one uninterrupted flight to the checkpoint.' : phase === 'select' ? selectionInstruction : TRAIL_STEPS[step] ?? ''}</p>
      </div>
      <div className="trail-demo__controls">
        <button type="button" onClick={() => { setPlaying(false); setPhase('select'); setFlightIndex(0); setStep((current) => Math.max(0, current - 1)) }} aria-label="Previous move">←</button>
        <button className="trail-demo__play" type="button" onClick={() => {
          if (!playing && step === 6) { setStep(0); setPhase('select'); setFlightIndex(0) }
          setPlaying((current) => !current)
        }}>{playing ? 'Pause walkthrough' : 'Play walkthrough'}</button>
        <button type="button" onClick={() => { setPlaying(false); setPhase('select'); setFlightIndex(0); setStep((current) => Math.min(6, current + 1)) }} aria-label="Next move">→</button>
      </div>
    </article>
  )
}

export function PlayLevelModal({ open, onClose, returnFocusTo }: { open: boolean; onClose: () => void; returnFocusTo?: HTMLElement | null }) {
  const [state, setState] = useState(() => initialState(LEVEL_ONE))
  const [history, setHistory] = useState<BoardState[]>([])
  const [selected, setSelected] = useState<string | 'rura' | null>(null)
  const [hintedMove, setHintedMove] = useState<PuzzleMove | null>(null)
  const [message, setMessage] = useState('Drag any enchanted block in the direction of its markings.')
  const [draggingPiece, setDraggingPiece] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const closeButton = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const dragSession = useRef<{ piece: DragPiece; pointerId: number; x: number; y: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)
  const completed = sameHex(state.firefly, LEVEL_ONE.home)

  // Every exit route funnels through here so analytics can tell an abandoned
  // puzzle apart from one that was closed after the trail was solved.
  const closeGame = (method: string) => {
    trackEvent('game_close', { method, moves: history.length, completed })
    onClose()
  }
  // Kept in a ref so the focus-trap effect below can close the puzzle without
  // re-registering its listeners after every move.
  const closeGameRef = useRef(closeGame)
  useEffect(() => {
    closeGameRef.current = closeGame
  })

  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    const root = document.getElementById('root')
    const previousAriaHidden = root?.getAttribute('aria-hidden')
    document.body.style.overflow = 'hidden'
    root?.setAttribute('inert', '')
    root?.setAttribute('aria-hidden', 'true')
    closeButton.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeGameRef.current('escape')
        return
      }
      if (event.key !== 'Tab') return
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute('aria-hidden'))
      if (focusable.length === 0) {
        event.preventDefault()
        closeButton.current?.focus()
        return
      }
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      root?.removeAttribute('inert')
      if (previousAriaHidden === null) root?.removeAttribute('aria-hidden')
      else if (previousAriaHidden !== undefined) root?.setAttribute('aria-hidden', previousAriaHidden)
      window.removeEventListener('keydown', onKeyDown)
      window.requestAnimationFrame(() => (returnFocusTo ?? previouslyFocused.current)?.focus())
    }
  }, [open, returnFocusTo])

  const targets = useMemo(() => {
    if (selected === 'rura') return fireflyDestinations(LEVEL_ONE, state).map((cell) => [cell])
    if (selected) return legalBlockMoves(LEVEL_ONE, state, LEVEL_ONE.blocks.findIndex((block) => block.id === selected))
    return []
  }, [selected, state])

  if (!open) return null

  const commit = (move: PuzzleMove, method: 'drag' | 'tap') => {
    setHistory((current) => [...current, state])
    const next = applyMove(LEVEL_ONE, state, move)
    const solved = sameHex(next.firefly, LEVEL_ONE.home)
    const moveNumber = history.length + 1

    trackEvent('game_move', { move_type: move.type, method, move_number: moveNumber })
    if (solved) trackEvent('game_complete', { moves: moveNumber, perfect: moveNumber <= 3 })

    setState(next)
    setSelected(null)
    setHintedMove(null)
    setMessage(solved ? 'Checkpoint reached—trail complete!' : 'Beautiful move. Read the new shape of the board.')
  }

  const reset = () => {
    trackEvent('game_reset', { moves: history.length, completed })
    setState(initialState(LEVEL_ONE))
    setHistory([])
    setSelected(null)
    setHintedMove(null)
    setDraggingPiece(null)
    setDragOffset({ x: 0, y: 0 })
    setMessage('Drag any enchanted block in the direction of its markings.')
  }

  const requestHint = () => {
    const path = solve(LEVEL_ONE, state)
    const move = path?.[0] ?? null
    trackEvent('game_hint', { moves: history.length, available: Boolean(move) })
    if (!move) {
      setMessage(completed ? 'Rura has already reached the checkpoint.' : 'Restart the trail and try another route.')
      return
    }
    setHintedMove(move)
    setSelected(move.type === 'block' ? move.blockId : 'rura')
    setMessage(hintMessage(LEVEL_ONE, state, move))
  }

  const beginDrag = (piece: DragPiece, event: ReactPointerEvent<HTMLButtonElement>) => {
    if (completed) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    dragSession.current = { piece, pointerId: event.pointerId, x: event.clientX, y: event.clientY, moved: false }
    setDraggingPiece(piece.id)
    setDragOffset({ x: 0, y: 0 })
    setHintedMove(null)
    setSelected(piece.kind === 'block' ? piece.id : 'rura')
    setMessage(piece.kind === 'block' ? 'Drag along the glowing lane, then release to place the block.' : 'Drag Rura to any glowing open cell.')
  }

  const moveDrag = (piece: DragPiece, event: ReactPointerEvent<HTMLButtonElement>) => {
    const session = dragSession.current
    if (!session || session.pointerId !== event.pointerId || session.piece.id !== piece.id) return
    const dx = event.clientX - session.x
    const dy = event.clientY - session.y
    if (Math.hypot(dx, dy) > 7) session.moved = true

    if (piece.kind === 'firefly') {
      setDragOffset({ x: dx, y: dy })
      return
    }

    const block = LEVEL_ONE.blocks.find((candidate) => candidate.id === piece.id)!
    if (block.movementAxis === 'free') {
      setDragOffset({ x: dx, y: dy })
      return
    }
    const board = event.currentTarget.parentElement!.getBoundingClientRect()
    const vector = block.movementAxis === 'q'
      ? { x: board.width * 0.225, y: 0 }
      : block.movementAxis === 'r'
        ? { x: board.width * 0.1125, y: board.height * 0.198 }
        : { x: board.width * 0.1125, y: -board.height * 0.198 }
    const lengthSquared = vector.x * vector.x + vector.y * vector.y
    const projection = (dx * vector.x + dy * vector.y) / lengthSquared
    setDragOffset({ x: vector.x * projection, y: vector.y * projection })
  }

  const endDrag = (piece: DragPiece, event: ReactPointerEvent<HTMLButtonElement>) => {
    const session = dragSession.current
    if (!session || session.pointerId !== event.pointerId || session.piece.id !== piece.id) return
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    const landedHex = nearestBoardHex(event)
    const wasDragged = session.moved
    dragSession.current = null
    setDraggingPiece(null)
    setDragOffset({ x: 0, y: 0 })

    if (!wasDragged) return
    suppressClick.current = true
    window.setTimeout(() => { suppressClick.current = false }, 0)

    if (piece.kind === 'firefly') {
      const destination = fireflyDestinations(LEVEL_ONE, state).find((cell) => sameHex(cell, landedHex))
      if (destination) commit({ type: 'firefly', to: destination }, 'drag')
      else {
        setSelected(null)
        setMessage('Rura can only land on a connected open cell. Try another path.')
      }
      return
    }

    const index = LEVEL_ONE.blocks.findIndex((block) => block.id === piece.id)
    const destinations = legalBlockMoves(LEVEL_ONE, state, index)
    const destination = destinations.find((cells) => cells.some((cell) => sameHex(cell, landedHex)))
    if (destination) commit({ type: 'block', blockId: piece.id, cells: destination }, 'drag')
    else {
      setSelected(null)
      setMessage('That block cannot rest there. It snapped safely back into place.')
    }
  }

  return createPortal(
    <div className="play-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeGame('backdrop') }}>
      <section ref={dialogRef} className="play-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="play-level-title">
        <button ref={closeButton} className="play-modal__close" type="button" data-analytics-skip onClick={() => closeGame('close_button')} aria-label="Close playable puzzle">×</button>
        <div className="play-modal__copy">
          <p className="game-eyebrow"><span /> Play the first trail</p>
          <h2 id="play-level-title">Choose Your Door</h2>
          <p>Drag the enchanted stones naturally across the board, open a route, and guide Rura to the checkpoint flag. No timer. No penalties. Unlimited hints.</p>
          <dl><div><dt>Perfect</dt><dd>3 moves</dd></div><div><dt>Your moves</dt><dd>{history.length}</dd></div></dl>
          <div className="play-modal__message" aria-live="polite"><span>✦</span><p>{message}</p></div>
        </div>
        <div className="play-modal__board-wrap">
          <div className="play-modal__board-header"><span>TRAIL 01</span><strong>THE FIREFLY FIELDS</strong></div>
          <PuzzleBoard
            level={LEVEL_ONE}
            state={state}
            selectedBlock={selected === 'rura' ? null : selected}
            targets={targets}
            hintedMove={hintedMove}
            draggingPiece={draggingPiece}
            dragOffset={dragOffset}
            interactive
            completed={completed}
            onCompletionClose={() => closeGame('completion')}
            onBlockClick={(id) => {
              if (suppressClick.current) return
              setSelected(id); setHintedMove(null); setMessage('Drag this piece—or tap a glowing destination.')
            }}
            onFireflyClick={() => {
              if (suppressClick.current) return
              setSelected('rura'); setHintedMove(null); setMessage('Drag Rura—or tap a glowing open cell.')
            }}
            onPiecePointerDown={beginDrag}
            onPiecePointerMove={moveDrag}
            onPiecePointerUp={endDrag}
            onTargetClick={(cells) => {
              if (selected === 'rura') commit({ type: 'firefly', to: cells[0]! }, 'tap')
              else if (selected) commit({ type: 'block', blockId: selected, cells }, 'tap')
            }}
          />
          <p className="play-modal__board-note"><span aria-hidden="true">↔</span> Drag to move · release to snap</p>
          <div className="play-modal__hex-actions" aria-label="Puzzle actions">
            <button type="button" data-analytics-skip onClick={() => {
              const previous = history.at(-1)
              if (!previous) return
              trackEvent('game_undo', { moves: history.length })
              setState(previous)
              setHistory((current) => current.slice(0, -1))
              setSelected(null)
              setHintedMove(null)
              setMessage('Move undone. Take another look at the trail.')
            }} disabled={!history.length} aria-label="Undo last move"><img src="/assets/board/actions/undo-rounded.svg" alt="" width="48" height="48" /></button>
            <button type="button" data-analytics-skip onClick={reset} aria-label="Restart puzzle"><img src="/assets/board/actions/restart-rounded.svg" alt="" width="48" height="48" /></button>
            <button type="button" data-analytics-skip onClick={requestHint} disabled={completed} aria-label="Show an unlimited hint"><img src="/assets/board/actions/hint-rounded.svg" alt="" width="48" height="48" /></button>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  )
}
