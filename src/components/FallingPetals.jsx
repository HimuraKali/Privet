import { useEffect, useRef } from 'react'
import { useEffects } from '../context/EffectsContext'

const PETAL_COUNT = 28

function createPetal(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height - height,
    size: 8 + Math.random() * 12,
    speed: 0.4 + Math.random() * 0.9,
    drift: -0.4 + Math.random() * 0.8,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.04,
    alpha: 0.35 + Math.random() * 0.45,
    hue: 330 + Math.random() * 25,
  }
}

/**
 * Падающие лепестки. petalsEnabled + petalsSpeed (0…1) из EffectsContext.
 */
export default function FallingPetals() {
  const { petalsEnabled, petalsSpeed } = useEffects()
  const canvasRef = useRef(null)
  const petalsRef = useRef([])
  const rafRef = useRef(0)
  const speedRef = useRef(petalsSpeed)
  const fadeRef = useRef(petalsSpeed > 0.05 ? 1 : 0)

  useEffect(() => {
    speedRef.current = petalsSpeed
  }, [petalsSpeed])

  useEffect(() => {
    if (!petalsEnabled) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (petalsRef.current.length === 0) {
        petalsRef.current = Array.from({ length: PETAL_COUNT }, () =>
          createPetal(canvas.width, canvas.height),
        )
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const drawPetal = (p, globalFade) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.scale(1, 0.65)
      ctx.globalAlpha = p.alpha * globalFade
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
      gradient.addColorStop(0, `hsla(${p.hue}, 85%, 88%, 0.95)`)
      gradient.addColorStop(0.6, `hsla(${p.hue}, 70%, 72%, 0.7)`)
      gradient.addColorStop(1, `hsla(${p.hue}, 60%, 65%, 0)`)
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.ellipse(0, 0, p.size, p.size * 0.7, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const tick = () => {
      const targetFade = speedRef.current > 0.05 ? 1 : 0
      fadeRef.current += (targetFade - fadeRef.current) * 0.04

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (fadeRef.current > 0.01) {
        const motion = Math.max(speedRef.current, 0)
        for (const p of petalsRef.current) {
          p.y += p.speed * motion
          p.x += (p.drift + Math.sin(p.y * 0.01) * 0.3) * motion
          p.angle += p.spin * Math.max(motion, 0.05)
          if (p.y > canvas.height + 20) {
            Object.assign(p, createPetal(canvas.width, 40), { y: -20 })
          }
          drawPetal(p, fadeRef.current)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [petalsEnabled])

  if (!petalsEnabled) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  )
}
