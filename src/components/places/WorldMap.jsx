import { useId } from 'react'
import { places } from '../../data/places'
import AirplaneMark from './Airplane'

const LABELS = {
  barcelona: { dx: 14, dy: 22, anchor: 'start' },
  ireland: { dx: -14, dy: 4, anchor: 'end' },
  iceland: { dx: -14, dy: -12, anchor: 'end' },
  budapest: { dx: 14, dy: -8, anchor: 'start' },
  china: { dx: 14, dy: 4, anchor: 'start' },
}

/**
 * Стилизованная карта мира + маршрут + самолёт.
 */
export default function WorldMap({
  pathRef,
  segmentRef,
  planeRef,
  routeD,
  segmentD,
}) {
  const uid = useId().replace(/:/g, '')
  const ocean = `ocean-${uid}`
  const land = `land-${uid}`
  const frame = `frame-${uid}`

  return (
    <svg
      viewBox="0 0 1000 560"
      className="h-auto w-full max-h-[74vh] drop-shadow-[0_24px_50px_rgba(232,122,158,0.22)]"
      role="img"
      aria-label="Карта путешествия"
    >
      <defs>
        <linearGradient id={ocean} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff7fb" />
          <stop offset="45%" stopColor="#ffd6e7" />
          <stop offset="100%" stopColor="#f3b7cf" />
        </linearGradient>
        <linearGradient id={land} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff1f6" />
          <stop offset="100%" stopColor="#f0a3be" />
        </linearGradient>
        <linearGradient id={frame} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffe4ee" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="984" height="544" rx="36" fill={`url(#${frame})`} />
      <rect x="22" y="22" width="956" height="516" rx="28" fill={`url(#${ocean})`} />

      {/* Мягкая сетка */}
      <g stroke="#ffffff" strokeWidth="1" opacity="0.35">
        {[120, 220, 320, 420].map((y) => (
          <line key={y} x1="40" y1={y} x2="960" y2={y} />
        ))}
        {[180, 360, 540, 720, 900].map((x) => (
          <line key={x} x1={x} y1="40" x2={x} y2="520" />
        ))}
      </g>

      <g fill={`url(#${land})`} stroke="#ffffff" strokeWidth="3" strokeLinejoin="round">
        <path d="M92 118c28-38 92-58 148-38 48 16 72 58 62 104-8 38-18 52-8 78 12 30-8 62-46 78-52 22-118 4-150-34-28-34-36-78-22-118 8-22 8-48 16-70z" />
        <path d="M188 292c22-8 48 8 62 38 16 34 18 78 4 118-12 34-40 62-72 58-28-4-46-30-42-62 6-46 18-108 48-152z" />
        <path d="M430 108c36-22 78-18 104 8 18 18 22 42 12 64 22 8 40 28 38 56-2 22-16 36-10 54 8 24 2 48-16 64-28 24-62 46-98 36-34-10-48-42-40-74 6-24-4-42-16-58-16-22-18-52-4-74 12-18 18-28 30-76z" />
        <path d="M468 286c34 2 62 28 66 64 4 40-22 82-62 96-32 12-62-4-70-32-10-36 2-78 24-104 14-16 26-24 42-24z" />
        <path d="M575 96c48-28 130-30 196 2 62 30 108 86 112 146 4 48-24 92-74 114-58 26-124 22-176-8-46-26-78-70-74-120 2-28 22-36 16-58-8-28-16-48 0-76z" />
        <path d="M760 372c36-16 84-6 104 22 16 22 12 48-12 62-28 16-70 12-92-8-18-16-22-46-8-64 6-8 4-10 8-12z" />
      </g>

      <path
        ref={pathRef}
        d={routeD}
        fill="none"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path ref={segmentRef} d={segmentD} fill="none" stroke="none" />

      {places.map((p) => {
        const label = LABELS[p.id]
        return (
          <g key={p.id}>
            <circle cx={p.map.x} cy={p.map.y} r="13" fill="rgba(255,255,255,0.72)" />
            <circle cx={p.map.x} cy={p.map.y} r="6" fill="#e87a9e" />
            <circle cx={p.map.x} cy={p.map.y} r="2.4" fill="#fff" />
            <text
              x={p.map.x + label.dx}
              y={p.map.y + label.dy}
              textAnchor={label.anchor}
              fill="#6a3a4c"
              fontSize="16"
              fontFamily="Cormorant Garamond, Georgia, serif"
            >
              {p.name}
            </text>
          </g>
        )
      })}

      <g ref={planeRef}>
        <AirplaneMark />
      </g>
    </svg>
  )
}

export function buildRoutePath(start, cities) {
  const pts = [start, ...cities.map((c) => c.map)]
  if (pts.length < 2) return ''

  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i += 1) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const cx = (prev.x + curr.x) / 2
    const cy = Math.min(prev.y, curr.y) - 36
    d += ` Q ${cx} ${cy} ${curr.x} ${curr.y}`
  }
  return d
}

export function buildSegmentPath(a, b) {
  const cx = (a.x + b.x) / 2
  const cy = Math.min(a.y, b.y) - 36
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`
}
