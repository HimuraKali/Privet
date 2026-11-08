import { useState } from 'react'
import CityDecor from './CityDecor'

function CityPhoto({ src, tint }) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      data-parallax="0.2"
      className="relative mx-auto aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-[2rem] lg:max-w-4xl"
      style={{
        boxShadow: `0 30px 70px color-mix(in srgb, ${tint} 40%, transparent)`,
      }}
    >
      {!failed ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(145deg, ${tint}, color-mix(in srgb, ${tint} 50%, white))`,
          }}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${tint} 25%, transparent), color-mix(in srgb, ${tint} 45%, transparent) 100%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/50" />
    </div>
  )
}

export default function CityScene({ place, index, sectionRef }) {
  const { colors } = place

  return (
    <section
      ref={sectionRef}
      data-city-index={index}
      className="relative flex min-h-[160vh] w-full items-center justify-center overflow-hidden py-24"
      style={{
        background: `linear-gradient(165deg, ${colors.sky} 0%, ${colors.mid} 55%, color-mix(in srgb, ${colors.deep} 55%, ${colors.sky}) 100%)`,
      }}
    >
      <div data-parallax="0.05" className="absolute inset-0">
        <CityDecor type={place.decor} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-8">
        <div data-parallax="-0.12" className="mb-8 text-center">
          <p
            className="mb-2 text-sm tracking-[0.28em] uppercase"
            style={{ color: colors.text, opacity: 0.65 }}
          >
            Остановка {index + 1}
          </p>
          <h2
            className="font-display text-5xl md:text-7xl"
            style={{ color: colors.text }}
          >
            {place.name}
          </h2>
          <p
            className="mx-auto mt-4 max-w-md text-base md:text-lg"
            style={{ color: colors.text, opacity: 0.75 }}
          >
            {place.caption}
          </p>
        </div>

        <CityPhoto src={place.image} tint={colors.accent} />
      </div>
    </section>
  )
}
