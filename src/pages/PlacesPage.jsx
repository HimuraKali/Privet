import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BackButton from '../components/BackButton'
import BoardingScreen from '../components/places/BoardingScreen'
import LandingScreen from '../components/places/LandingScreen'
import MapScene from '../components/places/MapScene'
import CityScene from '../components/places/CityScene'
import FlightCounter from '../components/places/FlightCounter'
import { places, departurePoint } from '../data/places'
import useLenisScroll from '../hooks/useLenisScroll'
import usePetalsOnPage from '../hooks/usePetalsOnPage'
import { useEffects } from '../context/EffectsContext'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

export default function PlacesPage() {
  usePetalsOnPage(true)
  useLenisScroll(true)
  const { setPetalsSpeed } = useEffects()
  const [flight, setFlight] = useState(1)
  const rootRef = useRef(null)
  const cityRefs = useRef([])

  const legs = useMemo(() => {
    const points = [departurePoint, ...places.map((p) => p.map)]
    const totalSegments = points.length - 1
    return places.map((place, i) => {
      const from = points[i]
      const to = points[i + 1]
      return {
        place,
        from,
        to,
        pathProgressStart: i / totalSegments,
        pathProgressEnd: (i + 1) / totalSegments,
        label: i === 0 ? `Вылет → ${place.name}` : `${places[i - 1].name} → ${place.name}`,
      }
    })
  }, [])

  useEffect(() => {
    setPetalsSpeed(0.35)
    return () => setPetalsSpeed(1)
  }, [setPetalsSpeed])

  // Счётчик рейса + лёгкий параллакс в сценах городов
  useEffect(() => {
    const triggers = []

    cityRefs.current.forEach((el, i) => {
      if (!el) return

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setFlight(i + 1),
          onEnterBack: () => setFlight(i + 1),
        }),
      )

      el.querySelectorAll('[data-parallax]').forEach((node) => {
        const speed = Number(node.getAttribute('data-parallax')) || 0.1
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              const y = (self.progress - 0.5) * 120 * speed
              gsap.set(node, { y })
            },
          }),
        )
      })
    })

    ScrollTrigger.refresh()

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="places-page-in relative z-[2] min-h-screen">
      <div ref={rootRef} className="places-journey relative bg-[#fff5f8]">
        <div className="fixed top-6 left-6 z-50 md:top-8 md:left-8">
          <BackButton />
        </div>

        <FlightCounter current={flight} total={places.length} />

        <BoardingScreen />

        {legs.map((leg, i) => (
          <div key={leg.place.id}>
            <MapScene
              from={leg.from}
              to={leg.to}
              pathProgressStart={leg.pathProgressStart}
              pathProgressEnd={leg.pathProgressEnd}
              label={leg.label}
            />
            <CityScene
              place={leg.place}
              index={i}
              sectionRef={(node) => {
                cityRefs.current[i] = node
              }}
            />
          </div>
        ))}

        <LandingScreen />
      </div>
    </div>
  )
}
