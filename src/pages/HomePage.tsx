import { useState, type CSSProperties } from 'react'
import { CheckpointFlag, PlayLevelModal, TrailSeventeenDemo } from '../components/game/PuzzleExperience'
import { GooglePlayButton } from '../components/ui/GooglePlayButton'
import { AppStoreButton } from '../components/ui/AppStoreButton'
import { siteConfig } from '../config/site'
import { useSeo } from '../hooks/useSeo'
import { describeElement, resolveSection, trackEvent } from '../lib/analytics'

const worlds = [
  {
    number: '01',
    name: 'The Fields',
    image: '/assets/worlds/firefly-fields.webp',
    width: 1400,
    height: 933,
    description: 'Rura wakes beneath an unfamiliar moon. Fifty checkpoint mazes reveal the first way forward.',
    mechanic: 'Pure sliding-block puzzles',
    chapter: 'Rura wakes here',
    color: 'mint',
  },
  {
    number: '02',
    name: 'Locked Gardens',
    image: '/assets/worlds/locked-gardens.webp',
    width: 1400,
    height: 926,
    description: 'Beyond The Fields, living walls and sealed gates guard the path into the deeper worlds.',
    mechanic: 'Gates & pressure plates',
    chapter: 'The first crossing',
    color: 'violet',
  },
  {
    number: '03',
    name: 'Ancient Ruins',
    image: '/assets/worlds/ancient-ruins.webp',
    width: 1400,
    height: 935,
    description: 'The third crossing bends distance itself, turning forgotten passageways into impossible routes.',
    mechanic: 'Paired portals',
    chapter: 'Farther from home',
    color: 'blue',
  },
  {
    number: '04',
    name: 'Bloomhaven',
    image: '/assets/worlds/bloomhaven.webp',
    width: 1400,
    height: 908,
    description: 'The final world blooms with nectar—and beyond its fiftieth flag, the familiar light of home.',
    mechanic: 'Gather every drop',
    chapter: 'The final threshold',
    color: 'gold',
  },
] as const

const ruraStyles = [
  ['Classic', '/assets/cosmetics/firefly-classic.webp'],
  ['Biker', '/assets/cosmetics/firefly-biker.webp'],
  ['Frost', '/assets/cosmetics/firefly-christmas.webp'],
  ['Match Day', '/assets/cosmetics/firefly-football.webp'],
  ['Spooky', '/assets/cosmetics/firefly-halloween.webp'],
  ['Joker', '/assets/cosmetics/firefly-joker.webp'],
] as const

const mechanics = [
  {
    number: '01',
    name: 'Sliding blocks',
    image: '/assets/board/block-orange.webp',
    detail: 'Follow the arrows',
    description:
      'Each enchanted block slides only along its marked hex axis. It never rotates, so every move changes what the next piece can do.',
  },
  {
    number: '02',
    name: 'Gates & plates',
    image: '/assets/board/gate.webp',
    detail: 'Hold every matching plate',
    description:
      'A numbered gate opens only while every linked pressure plate is occupied by Rura or a block. Move too soon and the path seals again.',
  },
  {
    number: '03',
    name: 'Paired portals',
    image: '/assets/board/portal.webp',
    detail: 'Step in. Emerge at its twin.',
    description:
      'Matching colors and markings reveal each pair. Portals carry Rura—not blocks—and arriving at the twin completes that move.',
  },
  {
    number: '04',
    name: 'Firefly Nectar',
    image: '/assets/board/nectar.webp',
    detail: 'Gather every glowing drop',
    description:
      'Land on nectar to collect it; passing over it is not enough. The checkpoint remains dormant until every drop has been gathered.',
  },
] as const

const themes = [
  ['Classic', 'Moonlit slate', 'classic'],
  ['Forest', 'Ancient emerald', 'forest'],
  ['Ice', 'Aurora crystal', 'ice'],
  ['Desert', 'Carved sandstone', 'desert'],
  ['Neon', 'Electric glass', 'neon'],
  ['Halloween', 'Haunted autumn stone', 'halloween'],
  ['Christmas', 'Lantern-lit evergreen', 'christmas'],
  ['New Year', 'Champagne-gold midnight', 'new-year'],
  ['City', 'Art-deco steel & teal', 'city'],
  ['Space', 'Violet star-metal', 'space'],
  ['Mars', 'Copper canyon tech', 'mars'],
  ['Sports', 'Championship-night gold', 'sports'],
] as const

const celebrations = [
  {
    name: 'Trail Bounce',
    move: 'Backflip Pop',
    dance: 'hop_spin',
    effect: 'glow',
    colors: ['#ffd97a', '#4cae7d', '#ffffff'],
    description: 'Rura throws a clean glowing backflip and sticks the landing.',
  },
  {
    name: 'Lunar Glide',
    move: 'Moon Glide',
    dance: 'moonwalk',
    effect: 'burst',
    colors: ['#ffd65c', '#ffb347', '#ffffff'],
    description: 'Rura moonwalks across the stage, then glides home through the air.',
  },
  {
    name: 'Hula Glow',
    move: 'Hula Hoop',
    dance: 'hula_hoop',
    effect: 'glow',
    colors: ['#ff8bc7', '#ffd97a', '#ffffff'],
    description: 'A graceful figure-eight, shoulder shimmy, and glowing flourish.',
  },
  {
    name: 'Holo DJ',
    move: 'Deck Drop',
    dance: 'holo_dj',
    effect: 'aurora',
    colors: ['#52d2ae', '#69c8ff', '#ad6bff'],
    description: 'A holographic deck appears for a scratch, bounce, and bass drop.',
  },
  {
    name: 'Starlight Drumline',
    move: 'Drum Solo',
    dance: 'drums',
    effect: 'lightning',
    colors: ['#69e7ff', '#7fc4ff', '#f4f16a'],
    description: 'Rapid tom hits build into a bright cymbal-crash finale.',
  },
  {
    name: 'Golden Touch',
    move: 'Freestyle Strike',
    dance: 'soccer',
    effect: 'burst',
    colors: ['#f8ffcf', '#78e06d', '#ffd65c'],
    description: 'Juggle the glowball, balance it, then strike it at the camera.',
  },
] as const

type Celebration = (typeof celebrations)[number]

function CelebrationPreview({ celebration }: { celebration: Celebration }) {
  const previewStyle = {
    '--c0': celebration.colors[0],
    '--c1': celebration.colors[1],
    '--c2': celebration.colors[2],
  } as CSSProperties

  return (
    <div
      className={`celebration-preview celebration-preview--${celebration.effect} celebration-preview--dance-${celebration.dance}`}
      style={previewStyle}
      aria-hidden="true"
    >
      <span className="celebration-preview__stage" />
      <span className="celebration-preview__prop-back"><i /><i /></span>
      <span className="celebration-preview__prop"><i /><i /></span>
      <span className="celebration-preview__performer">
        <img className="celebration-preview__rura" src="/assets/rura/rura-classic-hd.webp" alt="" width="512" height="512" loading="lazy" decoding="async" />
        {celebration.dance === 'holo_dj' && (
          <span className="celebration-preview__dj-gear">
            <i className="celebration-preview__headphones" />
            <i className="celebration-preview__sunglasses" />
          </span>
        )}
      </span>
      <span className="celebration-preview__move">{celebration.move}</span>
    </div>
  )
}

export function HomePage() {
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [gameTrigger, setGameTrigger] = useState<HTMLButtonElement | null>(null)

  const openGame = (trigger: HTMLButtonElement) => {
    trackEvent('game_open', {
      element_text: describeElement(trigger),
      section: resolveSection(trigger),
    })
    setGameTrigger(trigger)
    setIsGameOpen(true)
  }

  useSeo({
    title: `${siteConfig.name} | Help Rura Find the Way Home`,
    description:
      'Help Rura escape four mystical worlds by solving 200 handcrafted checkpoint mazes in a cozy path-puzzle adventure.',
    path: '/',
  })

  return (
    <>
      <section className="game-hero" id="top">
        <div className="game-hero__backdrop" aria-hidden="true" />
        <div className="game-fireflies" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="game-shell game-hero__content">
          <div className="game-hero__copy">
            <p className="game-eyebrow"><span /> The night a game became an escape</p>
            <img
              className="game-hero__logo"
              src="/assets/brand/ruras-escape-logo.webp"
              alt="Rura's Escape — Help Rura Find the Way Home"
              width="400"
              height="451"
              decoding="async"
            />
            <h1>Four worlds away.<br />One way home.</h1>
            <p className="game-hero__lede">
              Rura was chasing lights with friends when the sky shimmered—and home vanished.
              Now one small firefly must solve 200 checkpoint mazes across four mystical
              worlds to return to the lantern trees.
            </p>
            <div className="game-hero__actions">
              <button className="game-button game-button--gold" type="button" data-analytics-skip onClick={(event) => openGame(event.currentTarget)}>Discover the game <span aria-hidden="true">↗</span></button>
              <a className="game-button game-button--glass" href="#story">Discover Rura&apos;s story</a>
            </div>
            <ul className="game-hero__notes" aria-label="Game highlights">
              <li>Rura is lost</li>
              <li>200 checkpoint mazes</li>
              <li>You are the way home</li>
            </ul>
          </div>

          <div className="game-phone-stage" aria-label="A Rura's Escape puzzle board">
            <div className="game-phone-glow" aria-hidden="true" />
            <div className="game-phone">
              <img
                className="game-phone__screenshot"
                src="/images/screenshots/gameplay-current.webp"
                alt="Current Rura's Escape gameplay UI showing Trail 24 in The Fields"
                width="440"
                height="900"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="game-shell game-hero__stats" aria-label="Game content totals">
          <div><strong>200</strong><span>Checkpoints to clear</span></div>
          <div><strong>4</strong><span>Mystical worlds</span></div>
          <div><strong>50</strong><span>Mazes in each world</span></div>
          <div><strong>1</strong><span>Way back home</span></div>
        </div>
      </section>

      <section className="game-section game-story" id="story">
        <div className="game-shell">
          <header className="game-story__prologue">
            <p className="game-eyebrow"><span /> Campaign · Prologue</p>
            <h2>Rura looked away for one second.<br />Home disappeared.</h2>
            <p>
              Beneath the old lantern trees, Rura and friends played their favorite game:
              chase the brightest glow before it faded. Then a fifth light appeared—silent,
              blue, and far too bright to be a firefly.
            </p>
          </header>

          <div className="game-story__cinema">
            <img src="/assets/modes/campaign-journey.webp" alt="A lantern-lit path crossing four mystical worlds toward a distant home" width="1280" height="720" loading="lazy" decoding="async" />
            <div className="game-story__cinema-shade" />
            <div className="game-story__memory">
              <span>THE LAST MEMORY OF HOME</span>
              <strong>A game of light beneath the trees.</strong>
              <p>Laughter, warm lanterns, and the familiar glow of friends close enough to follow.</p>
              <div className="game-story__friend-lights" aria-hidden="true"><i /><i /><i /><i /></div>
            </div>
            <div className="game-story__rift" aria-hidden="true"><i /><i /><i /></div>
            <img className="game-story__rura" src="/assets/rura/rura-classic-hd.webp" alt="Rura alone at the beginning of the path" width="512" height="512" loading="lazy" decoding="async" />
            <div className="game-story__arrival">
              <span>WHEN THE LIGHT CLEARS</span>
              <strong>World 01 · The Fields</strong>
              <p>No friends. No lantern trees. Only a maze—and one checkpoint flag pulsing in the dark.</p>
            </div>
          </div>

          <div className="game-story__turn">
            <article>
              <span>THE MYSTERY</span>
              <h3>Then the sky blinked.</h3>
              <p>
                The blue light opened like an eye. The trees stretched into streaks, every
                friendly glow scattered, and the world folded around Rura. When the silence
                returned, even the stars were unfamiliar.
              </p>
            </article>
            <blockquote>
              <span>RURA&apos;S PROMISE</span>
              <p>“If every flag opens the next path, then the last one must lead home.”</p>
            </blockquote>
            <article>
              <span>THE WAY OUT</span>
              <h3>One checkpoint at a time.</h3>
              <p>
                Each maze is a lock. Clear the trail and reach its flag to break it open.
                The fiftieth checkpoint reveals the crossing to the next world. Four worlds
                later, checkpoint 200 is the only door left between Rura and home.
              </p>
            </article>
          </div>

          <div className="game-story__route">
            <div className="game-story__route-heading">
              <div><span>THE CAMPAIGN</span><strong>200 steps through the impossible</strong></div>
              <button className="game-button game-button--gold" type="button" data-analytics-skip onClick={(event) => openGame(event.currentTarget)}>Try a level <span aria-hidden="true">→</span></button>
            </div>
            <ol aria-label="The four-world route home">
              {worlds.map((world, index) => (
                <li key={world.name}>
                  <span>WORLD {world.number}</span>
                  <strong>{world.name}</strong>
                  <small>{index === worlds.length - 1 ? 'Checkpoint 200 opens the way home' : '50 checkpoint mazes'}</small>
                </li>
              ))}
              <li className="game-story__home"><span>DESTINATION</span><strong>Home</strong><small>Friends are waiting</small></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="game-section game-gameplay" id="game">
        <div className="game-shell game-gameplay__layout">
          <div className="game-gameplay__copy">
            <p className="game-eyebrow"><span /> How Rura escapes</p>
            <h2>Read the maze.<br />Clear the way forward.</h2>
            <p>
              Every Campaign level is one obstacle on the journey home. Slide marked blocks,
              open gates, travel through portals, and gather nectar until Rura has an unbroken
              route to the checkpoint flag. Undo and restart freely—the journey never punishes curiosity.
            </p>
            <ol className="game-gameplay__principles">
              <li><span>01</span><div><strong>Understand the maze</strong><p>Arrows, gates, portals, and nectar show what must change before Rura can move.</p></div></li>
              <li><span>02</span><div><strong>Build a clear trail</strong><p>Every slide reshapes the route and creates the next possibility.</p></div></li>
              <li><span>03</span><div><strong>Reach the checkpoint</strong><p>Guide Rura to the flag, finish the level, and continue toward the next world.</p></div></li>
            </ol>
          </div>
          <TrailSeventeenDemo />
        </div>
      </section>

      <section className="game-section game-mechanics" id="mechanics">
        <div className="game-shell">
          <div className="game-heading game-heading--split">
            <div>
              <p className="game-eyebrow"><span /> The language of each maze</p>
              <h2>Four mechanics.<br />One purpose: escape.</h2>
            </div>
            <p>
              Each new world adds another layer to Rura&apos;s journey. The rules stay readable,
              every solution is logical, and nothing depends on luck.
            </p>
          </div>

          <div className="game-mechanic-grid">
            {mechanics.map((mechanic) => (
              <article className="game-mechanic-card" key={mechanic.name}>
                <div className="game-mechanic-card__top">
                  <span>{mechanic.number}</span>
                  <b>{mechanic.detail}</b>
                </div>
                <div className="game-mechanic-card__art">
                  <span aria-hidden="true" />
                  <img src={mechanic.image} alt={`${mechanic.name} game piece`} width="512" height="512" loading="lazy" decoding="async" />
                </div>
                <h3>{mechanic.name}</h3>
                <p>{mechanic.description}</p>
              </article>
            ))}
          </div>

          <div className="game-objective-strip" aria-label="The goal of every puzzle">
            <img src="/assets/rura/rura-classic-hd.webp" alt="Rura" width="512" height="512" loading="lazy" decoding="async" />
            <div>
              <span>EVERY FLAG MEANS FORWARD</span>
              <h3>Clear the trail. Reach the checkpoint. Keep the promise.</h3>
              <p>Every finished maze carries Rura closer to the next world—and eventually back to the friends waiting beneath the lantern trees.</p>
            </div>
            <div className="game-objective-strip__flag"><CheckpointFlag /></div>
          </div>
        </div>
      </section>

      <section className="game-section game-modes" id="modes">
        <div className="game-shell">
          <div className="game-heading game-heading--center">
            <p className="game-eyebrow"><span /> Story first. Puzzles forever.</p>
            <h2>One journey home.<br />Two ways to keep solving.</h2>
            <p>Campaign carries Rura&apos;s story. Chill and Arcade step outside the journey for players who simply want more beautifully crafted puzzles.</p>
          </div>

          <div className="game-mode-grid">
            <article className="game-mode-card game-mode-card--campaign">
              <img src="/assets/modes/campaign-journey.webp" alt="A lantern-lit route crossing the four Campaign worlds" width="1280" height="720" loading="lazy" decoding="async" />
              <div className="game-mode-card__shade" />
              <div className="game-mode-card__top"><span>Rura&apos;s story</span><b>4 worlds · 200 checkpoints</b></div>
              <div className="game-mode-card__body">
                <p>THE JOURNEY HOME</p><h3>Campaign</h3>
                <span>Follow Rura from the moment home disappears to the final checkpoint. Every solved maze opens another fragment of the road back to friends.</span>
                <dl>
                  <div><dt>Story worlds</dt><dd>4</dd></div><div><dt>Levels each</dt><dd>50</dd></div><div><dt>Final goal</dt><dd>Home</dd></div>
                </dl>
              </div>
            </article>

            <article className="game-mode-card">
              <img src="/assets/modes/chill-sanctuary.webp" alt="A moonlit crystal sanctuary for Chill Mode" width="1280" height="720" loading="lazy" decoding="async" />
              <div className="game-mode-card__shade" />
              <div className="game-mode-card__top"><span>Pure puzzle play</span><b>No timer</b></div>
              <div className="game-mode-card__body">
                <p>CHOOSE YOUR PACE</p><h3>Chill Mode</h3>
                <span>No story progression—just Gentle, Flow, and Deep puzzle paths for players who want a quiet place to think.</span>
                <dl><div><dt>Free puzzles</dt><dd>300</dd></div><div><dt>Pressure</dt><dd>None</dd></div></dl>
              </div>
            </article>

            <article className="game-mode-card">
              <img src="/assets/modes/premium-vault.webp" alt="A glowing puzzle vault for Arcade Mode" width="1280" height="720" loading="lazy" decoding="async" />
              <div className="game-mode-card__shade" />
              <div className="game-mode-card__top"><span>Pure puzzle mastery</span><b>Coin unlock</b></div>
              <div className="game-mode-card__body">
                <p>TEST YOUR MASTERY</p><h3>Arcade Mode</h3>
                <span>No campaign boundaries—just two demanding 50-level packs that combine the game&apos;s full puzzle language.</span>
                <dl><div><dt>Packs</dt><dd>2</dd></div><div><dt>Puzzles</dt><dd>100</dd></div></dl>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="game-section game-worlds" id="worlds">
        <div className="game-shell">
          <div className="game-heading game-heading--split">
            <div>
              <p className="game-eyebrow"><span /> The road back home</p>
              <h2>Four worlds.<br />Four chapters of the escape.</h2>
            </div>
            <p>
              Rura must clear all 50 checkpoints in a world before the next passage opens.
              New mechanics deepen the mazes, but every flag brings home one world closer.
            </p>
          </div>

          <div className="game-world-grid">
            {worlds.map((world) => (
              <article className={`game-world-card game-world-card--${world.color}`} key={world.name}>
                <img src={world.image} alt={`Landscape artwork for ${world.name}`} width={world.width} height={world.height} loading="lazy" decoding="async" />
                <div className="game-world-card__shade" />
                <span className="game-world-card__number">{world.number}</span>
                <div className="game-world-card__body">
                  <p>WORLD {Number(world.number)} · {world.chapter}</p>
                  <h3>{world.name}</h3>
                  <span>{world.description}</span>
                  <b>50 checkpoints · {world.mechanic}</b>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="game-section game-rewards" id="rewards">
        <div className="game-shell game-rewards__grid">
          <div className="game-rewards__copy">
            <p className="game-eyebrow"><span /> Beyond the journey</p>
            <h2>New trails.<br />New reasons to glow.</h2>
            <p>
              The Daily Puzzle brings one fresh maze tuned to your skill. The Quest Board
              adds three daily and three weekly challenges—complete them while you play and
              earn Rura Coins for the collection.
            </p>
            <div className="game-challenge-pills">
              <span><b>1</b> Daily puzzle</span><span><b>3</b> Daily goals</span><span><b>3</b> Weekly goals</span>
            </div>
          </div>
          <div className="game-daily-card">
            <div className="game-daily-card__glow" aria-hidden="true"><i /><i /><i /></div>
            <header className="game-quest-head">
              <div><span>QUEST BOARD</span><strong>Daily Puzzle &amp; Challenges</strong></div>
              <div className="game-quest-balance"><img src="/assets/ui/coin.webp" alt="" width="512" height="512" loading="lazy" decoding="async" /><span>240</span></div>
            </header>

            <section className="game-daily-feature" aria-label="Daily Puzzle preview">
              <div className="game-daily-feature__icon" aria-hidden="true"><i /></div>
              <div className="game-daily-feature__copy">
                <span>TODAY&apos;S DAILY PUZZLE</span>
                <h3>One maze. Yours until midnight.</h3>
                <p>A fresh seeded board, selected to match the way you solve.</p>
              </div>
              <div className="game-daily-feature__reward">
                <small>EARN BY STARS</small>
                <span><img src="/assets/ui/coin.webp" alt="" width="512" height="512" loading="lazy" decoding="async" /><b>10–25</b></span>
              </div>
            </section>

            <section className="game-quest-panel" aria-label="Challenge progress preview">
              <div className="game-quest-tabs">
                <span className="is-active">Daily <b>1/3</b></span>
                <span>Weekly <b>1/3</b></span>
                <small>Resets in <strong>8h 42m</strong></small>
              </div>
              <div className="game-quest-overview">
                <div className="game-quest-ring"><div><strong>1</strong><span>/3</span></div></div>
                <div><span>EXAMPLE DAILY SET</span><strong>Two quests to go</strong><small><img src="/assets/ui/coin.webp" alt="" width="512" height="512" loading="lazy" decoding="async" /> 35 coins available</small></div>
              </div>
              <ul className="game-quest-list">
                <li className="is-complete">
                  <span className="game-quest-list__mark">✓</span>
                  <div><strong>Rise and glow</strong><span><i style={{ '--progress': '100%' } as CSSProperties} /></span></div>
                  <small><img src="/assets/ui/coin.webp" alt="" width="512" height="512" loading="lazy" decoding="async" /> +5</small>
                </li>
                <li>
                  <span className="game-quest-list__mark">12</span>
                  <div><strong>Perfect trail</strong><span><i style={{ '--progress': '67%' } as CSSProperties} /></span></div>
                  <small><img src="/assets/ui/coin.webp" alt="" width="512" height="512" loading="lazy" decoding="async" /> +15</small>
                </li>
                <li>
                  <span className="game-quest-list__mark">0</span>
                  <div><strong>Finish without a hint</strong><span><i style={{ '--progress': '8%' } as CSSProperties} /></span></div>
                  <small><img src="/assets/ui/coin.webp" alt="" width="512" height="512" loading="lazy" decoding="async" /> +15</small>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section className="game-section game-cosmetics" id="cosmetics">
        <div className="game-shell">
          <div className="game-heading game-heading--center">
            <p className="game-eyebrow"><span /> Carry your own light</p>
            <h2>Make the journey yours.</h2>
            <p>Use Rura Coins—earned through play, optional rewarded ads, or purchased in coin packs—for character styles, magical trails, board themes, celebrations, hints, and puzzle packs. The look can change completely; the fair puzzle underneath never does.</p>
          </div>
          <div className="game-style-shelf">
            {ruraStyles.map(([name, src], index) => (
              <article className={index === 0 ? 'is-featured' : ''} key={name}>
                <span>{index === 0 ? 'RURA' : 'STYLE'}</span>
                <img src={src} alt={`Rura in the ${name} style`} width="512" height="512" loading="lazy" decoding="async" />
                <h3>{name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="game-section game-collection" id="collection">
        <div className="game-shell">
          <div className="game-heading game-heading--split">
            <div>
              <p className="game-eyebrow"><span /> Your game, transformed</p>
              <h2>New worlds<br />on the same board.</h2>
            </div>
            <p>
              Twelve complete board themes restyle the tiles, backdrop, destination, HUD,
              and even nectar—without changing a single rule. Earn or purchase Rura Coins, choose the
              atmosphere, and keep the puzzle fair.
            </p>
          </div>

          <div className="game-theme-grid" aria-label="All twelve board themes">
            {themes.map(([name, description, id]) => (
              <article className="game-theme-card" key={id}>
                <img className="game-theme-card__backdrop" src={`/assets/themes/backgrounds/${id}.webp`} alt="" width="720" height="1280" loading="lazy" decoding="async" />
                <div className="game-theme-card__shade" />
                <img className="game-theme-card__tile" src={`/assets/themes/tiles/${id}.webp`} alt={`${name} board tile`} width="384" height="384" loading="lazy" decoding="async" />
                <div><span>BOARD THEME</span><h3>{name}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>

          <div className="game-celebrations">
            <div className="game-celebrations__intro">
              <p className="game-eyebrow"><span /> Finish with personality</p>
              <h3>Six victory celebrations.<br />Never a mystery box.</h3>
              <p>
                Pick the exact celebration you want, unlock it with earned or purchased Rura Coins,
                and equip it for every completed puzzle. Each one pairs a choreographed move
                with its own light effect.
              </p>
            </div>
            <div className="game-celebration-list">
              {celebrations.map((celebration, index) => (
                <article className="game-celebration-card" key={celebration.name}>
                  <CelebrationPreview celebration={celebration} />
                  <div className="game-celebration-card__copy">
                    <span>VICTORY CELEBRATION · {String(index + 1).padStart(2, '0')}</span>
                    <h4>{celebration.name}</h4>
                    <p>{celebration.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="game-download" id="download">
        <div className="game-download__backdrop" aria-hidden="true" />
        <div className="game-shell game-download__content">
          <img className="game-download__rura" src="/assets/rura/rura-classic-hd.webp" alt="Rura ready to begin the journey" width="512" height="512" loading="lazy" decoding="async" />
          <p className="game-eyebrow"><span /> The lanterns are still glowing</p>
          <h2>Ready to help<br />Rura find the way home?</h2>
          <p>Four worlds. Two hundred checkpoints. Somewhere beyond the final flag, Rura&apos;s friends are still waiting beneath the lantern trees. The journey begins soon on Android, then comes to iPhone and iPad in 2027.</p>
          <p className="game-download__commerce-note">Includes optional in-app purchases and optional rewarded video ads. No forced ads or randomized loot boxes.</p>
          <div className="game-download__store-actions">
            <GooglePlayButton size="lg" />
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
      {isGameOpen && <PlayLevelModal open returnFocusTo={gameTrigger} onClose={() => setIsGameOpen(false)} />}
    </>
  )
}
