import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import WorldMap, { buildRoutePath, buildSegmentPath } from './WorldMap'
import { places, departurePoint } from '../../data/places'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

/**
 * Сцена карты. Высоту даёт сам pin (end: +=…), без пустого хвоста под картой.
 * pinType: transform — закрепление не зависит от position:fixed.
 */
export default function MapScene({
  from,
  to,
  pathProgressStart,
  pathProgressEnd,
  label,
}) {
  const pinRef = useRef(null)
  const pathRef = useRef(null)
  const segmentRef = useRef(null)
  const planeRef = useRef(null)

  const routeD = useMemo(() => buildRoutePath(departurePoint, places), [])
  const segmentD = useMemo(() => buildSegmentPath(from, to), [from, to])

  useEffect(() => {
    const pin = pinRef.current
    const path = pathRef.current
    const segment = segmentRef.current
    const plane = planeRef.current
    if (!pin || !path || !segment || !plane) return undefined

    const totalLen = path.getTotalLength()

    gsap.set(path, {
      strokeDasharray: totalLen,
      strokeDashoffset: totalLen * (1 - pathProgressStart),
    })

    const tween = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: '+=120%',
        scrub: 0.6,
        pin: true,
        pinType: 'transform',
        pinSpacing: true,
        anticipatePin: 0,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p =
            pathProgressStart +
            (pathProgressEnd - pathProgressStart) * self.progress
          gsap.set(path, { strokeDashoffset: totalLen * (1 - p) })
        },
      },
    })

    tween.fromTo(
      plane,
      {
        motionPath: {
          path: segment,
          align: segment,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
          start: 0,
          end: 0,
        },
      },
      {
        motionPath: {
          path: segment,
          align: segment,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
          start: 0,
          end: 1,
        },
        ease: 'none',
        duration: 1,
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [segmentD, pathProgressStart, pathProgressEnd])

  return (
    <section
      ref={pinRef}
      className="relative flex h-screen w-full flex-col items-center justify-center px-6 md:px-10"
      style={{
        background:
          'radial-gradient(ellipse 80% 55% at 50% 18%, #ffe4ef, transparent 62%), linear-gradient(180deg, #fff6f9 0%, #ffd9e8 100%)',
      }}
    >
      <p className="mb-4 text-sm tracking-[0.22em] text-[var(--theme-text-muted)] uppercase">
        {label}
      </p>

      <div className="w-full max-w-6xl">
        <WorldMap
          pathRef={pathRef}
          segmentRef={segmentRef}
          planeRef={planeRef}
          routeD={routeD}
          segmentD={segmentD}
        />
      </div>
    </section>
  )
}
