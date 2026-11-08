/** Края и углы экрана, центр с плеером свободен. */
const ZONES = [
  { x: 7, y: 18 },
  { x: 76, y: 16 },
  { x: 6, y: 74 },
  { x: 74, y: 72 },
  { x: 18, y: 12 },
  { x: 62, y: 80 },
  { x: 8, y: 58 },
  { x: 80, y: 56 },
]

function rand(seed) {
  let t = Math.imul(seed ^ (seed >>> 16), 2246822507)
  t = Math.imul(t ^ (t >>> 13), 3266489909)
  t ^= t >>> 16
  return (t >>> 0) / 4294967296
}

export function layoutFor(index, type) {
  const zone = ZONES[index % ZONES.length]
  const r1 = rand(index * 997 + 11)
  const r2 = rand(index * 997 + 29)
  const r3 = rand(index * 997 + 47)
  const r4 = rand(index * 997 + 71)
  const r5 = rand(index * 997 + 97)

  const chorus = type === 'chorus'
  const sticker = type === 'sticker'

  return {
    x: zone.x + (r1 - 0.5) * 5,
    y: zone.y + (r2 - 0.5) * 4,
    rotate: chorus ? (r3 - 0.5) * 40 : (r3 - 0.5) * 10,
    life: sticker ? 5.2 : 4 + r4 * 2,
    driftX: (r5 - 0.5) * 28,
    driftY: -12 - r1 * 22,
    size: sticker ? 140 + Math.floor(r2 * 60) : null,
  }
}
