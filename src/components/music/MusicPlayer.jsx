import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import PlayerControls from './PlayerControls'

function CoverImage({ src, tint }) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-[2rem] lg:max-w-[320px]"
      style={{
        boxShadow: `
          0 28px 70px color-mix(in srgb, ${tint} 48%, transparent),
          0 0 80px color-mix(in srgb, ${tint} 40%, transparent),
          0 0 0 1px color-mix(in srgb, white 35%, transparent)
        `,
      }}
    >
      {!failed ? (
        <img
          key={src}
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
          onLoad={() => setFailed(false)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background: `linear-gradient(145deg, ${tint}, color-mix(in srgb, ${tint} 40%, #1a0608))`,
          }}
        >
          <span className="font-display text-7xl text-white/80">♪</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
    </div>
  )
}

function SideArrow({ direction, onClick, blood }) {
  const isPrev = direction === 'prev'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Предыдущий трек' : 'Следующий трек'}
      className={`fixed top-1/2 z-40 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border shadow-[0_10px_24px_var(--theme-shadow)] backdrop-blur-md transition duration-700 hover:scale-105 md:h-20 md:w-20 ${
        blood
          ? 'border-[#7a1c2a]/70 bg-[#2a0a10]/70 text-[#f3d5d8] hover:bg-[#3a1018]/80'
          : 'border-white/40 bg-white/25 text-[var(--theme-text)] hover:bg-white/40'
      } ${isPrev ? 'left-4 md:left-8' : 'right-4 md:right-8'}`}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        {isPrev ? (
          <path d="M15 5 L8 12 L15 19" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 5 L16 12 L9 19" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  )
}

export default function MusicPlayer({
  track,
  blood,
  isPlaying,
  currentTime,
  duration,
  volume,
  onToggle,
  onPrev,
  onNext,
  onSeek,
  onVolume,
}) {
  return (
    <>
      <SideArrow direction="prev" onClick={onPrev} blood={blood} />
      <SideArrow direction="next" onClick={onNext} blood={blood} />

      <div
        className={`glass mx-auto flex w-full max-w-xl flex-col items-center justify-center rounded-[2rem] px-6 py-7 md:px-10 ${
          blood ? 'music-glass-blood' : ''
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={track.id}
            className="flex w-full flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <CoverImage key={track.id} src={track.cover} tint={track.tint} />

            <div className="mt-5 text-center">
              <h2 className="font-display text-3xl lg:text-4xl">{track.title}</h2>
              <p className="mt-2 text-lg text-[var(--theme-text-muted)]">{track.artist}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 w-full max-w-md">
          <PlayerControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            onToggle={onToggle}
            onSeek={onSeek}
            onVolume={onVolume}
          />
        </div>
      </div>
    </>
  )
}
