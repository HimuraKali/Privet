import { useEffect, useRef } from 'react'

const MAX_SPARKLES = 18
const SPAWN_GAP_MS = 36

/**
 * Курсор-сердечко + хвост блёсток (только мышь / точный указатель).
 */
export default function SparkleCursor() {
  const layerRef = useRef(null)
  const cursorRef = useRef(null)
  const indexRef = useRef(0)
  const lastSpawnRef = useRef(0)
  const rafRef = useRef(0)
  const hoveringRef = useRef(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer || !layerRef.current) return undefined

    const layer = layerRef.current
    const cursor = cursorRef.current
    const pool = []

    for (let i = 0; i < MAX_SPARKLES; i += 1) {
      const el = document.createElement('span')
      el.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: 7px;
        height: 7px;
        margin: -3px 0 0 -3px;
        pointer-events: none;
        opacity: 0;
        transform: translate3d(-100px, -100px, 0) scale(0);
        background: var(--theme-accent);
        clip-path: path('M3.5 6.2C3.5 6.2 0.4 4.1 0.4 2.2C0.4 1.1 1.2 0.4 2.1 0.4C2.7 0.4 3.2 0.7 3.5 1.2C3.8 0.7 4.3 0.4 4.9 0.4C5.8 0.4 6.6 1.1 6.6 2.2C6.6 4.1 3.5 6.2 3.5 6.2Z');
        filter: drop-shadow(0 0 3px rgba(255, 180, 205, 0.9));
        will-change: transform, opacity;
      `
      layer.appendChild(el)
      pool.push({ el, life: 0, x: 0, y: 0, size: 1 })
    }

    const isInteractive = (target) =>
      Boolean(
        target?.closest?.(
          'a, button, [role="button"], input, textarea, select, label, .cursor-hover',
        ),
      )

    const onMove = (e) => {
      hoveringRef.current = isInteractive(e.target)

      if (cursor) {
        const scale = hoveringRef.current ? 1.25 : 1
        cursor.style.opacity = '1'
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(${scale})`
      }

      const now = performance.now()
      if (now - lastSpawnRef.current < SPAWN_GAP_MS) return
      lastSpawnRef.current = now

      const sparkle = pool[indexRef.current % MAX_SPARKLES]
      indexRef.current += 1
      sparkle.x = e.clientX + (Math.random() - 0.5) * 14
      sparkle.y = e.clientY + (Math.random() - 0.5) * 14
      sparkle.life = 1
      sparkle.size = 0.5 + Math.random() * 0.9
    }

    const onLeave = () => {
      if (cursor) cursor.style.opacity = '0'
    }

    const onEnter = () => {
      if (cursor) cursor.style.opacity = '1'
    }

    const tick = () => {
      for (const sparkle of pool) {
        if (sparkle.life <= 0) {
          sparkle.el.style.opacity = '0'
          continue
        }
        sparkle.life -= 0.035
        sparkle.y += 0.35
        const opacity = Math.max(sparkle.life, 0)
        sparkle.el.style.opacity = String(opacity)
        sparkle.el.style.transform = `translate3d(${sparkle.x}px, ${sparkle.y}px, 0) scale(${sparkle.size * opacity})`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    document.documentElement.classList.add('custom-cursor')
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(rafRef.current)
      pool.forEach((s) => s.el.remove())
    }
  }, [])

  return (
    <div
      ref={layerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
    >
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 opacity-0"
        style={{
          width: 22,
          height: 22,
          marginLeft: -11,
          marginTop: -11,
          willChange: 'transform, opacity',
          filter: 'drop-shadow(0 2px 6px rgba(232, 122, 158, 0.55))',
          transition: 'opacity 0.15s ease',
        }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
          <defs>
            <linearGradient id="heartFill" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#fff0f5" />
              <stop offset="45%" stopColor="var(--theme-accent)" />
              <stop offset="100%" stopColor="var(--theme-accent-deep)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#heartFill)"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </div>
    </div>
  )
}
