import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import BackButton from '../components/BackButton'
import MusicPlayer from '../components/music/MusicPlayer'
import BloodSky from '../components/music/BloodSky'
import LyricsBackground from '../components/music/LyricsBackground'
import { tracks } from '../data/tracks'
import useAudioPlayer from '../hooks/useAudioPlayer'
import usePetalsOnPage from '../hooks/usePetalsOnPage'
import { useEffects } from '../context/EffectsContext'

const SOFT_BG = (tint) => `
  radial-gradient(ellipse 75% 60% at 18% 12%, ${tint} 0%, transparent 58%),
  radial-gradient(ellipse 65% 55% at 88% 78%, color-mix(in srgb, ${tint} 70%, white) 0%, transparent 52%),
  radial-gradient(ellipse 50% 40% at 50% 50%, color-mix(in srgb, ${tint} 22%, white) 0%, transparent 70%),
  linear-gradient(165deg, #fff8fb 0%, color-mix(in srgb, ${tint} 40%, #fff5f8) 100%)
`

const BLOOD_BG = `
  radial-gradient(ellipse 55% 45% at 50% 0%, #6e1424 0%, transparent 58%),
  radial-gradient(ellipse 40% 35% at 15% 80%, #4a0c16 0%, transparent 55%),
  radial-gradient(ellipse 35% 30% at 85% 70%, #2a060c 0%, transparent 50%),
  linear-gradient(180deg, #1a070b 0%, #070203 100%)
`

export default function MusicPage() {
  usePetalsOnPage(true)
  const { setPetalsSpeed } = useEffects()
  const player = useAudioPlayer(tracks)
  const blood = player.track?.id === 5
  const [firstFinished, setFirstFinished] = useState(false)
  const [noticeKey, setNoticeKey] = useState(0)
  const noticeTimer = useRef(0)

  useEffect(() => {
    setPetalsSpeed(player.isPlaying ? 1 : 0)
  }, [player.isPlaying, setPetalsSpeed])

  useEffect(() => {
    if (player.index !== 0) return
    if (player.duration > 1 && player.currentTime >= player.duration - 0.35) {
      setFirstFinished(true)
    }
  }, [player.index, player.currentTime, player.duration])

  useEffect(() => () => window.clearTimeout(noticeTimer.current), [])

  const showListenFirst = () => {
    setNoticeKey((key) => key + 1)
    window.clearTimeout(noticeTimer.current)
    noticeTimer.current = window.setTimeout(() => setNoticeKey(0), 2400)
  }

  const onNext = () => {
    if (!firstFinished && player.index === 0) {
      showListenFirst()
      return
    }
    player.next()
  }

  const onPrev = () => {
    if (!firstFinished && player.index === 0 && player.currentTime <= 3) {
      showListenFirst()
      return
    }
    player.prev()
  }

  const tint = player.track?.tint ?? '#f7c1d4'

  return (
    <PageTransition>
      <main
        className={`music-stage relative flex min-h-screen flex-col px-8 py-6 lg:px-12 lg:py-8 ${
          blood ? 'is-blood' : ''
        }`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ background: blood ? BLOOD_BG : SOFT_BG(tint) }}
          transition={{ duration: 1.15, ease: 'easeInOut' }}
        />

        <AnimatePresence>
          {blood && (
            <motion.div
              key="blood-sky"
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1 }}
            >
              <BloodSky />
            </motion.div>
          )}
        </AnimatePresence>

        {player.track?.id === 1 && (
          <LyricsBackground
            currentTime={player.currentTime}
            isPlaying={player.isPlaying}
            duration={player.duration}
          />
        )}

        <AnimatePresence>
          {noticeKey > 0 && (
            <motion.p
              key={noticeKey}
              className="pointer-events-none fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white/75 px-6 py-3 text-center text-lg text-[var(--theme-text)] shadow-lg backdrop-blur-md"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              надо послушать сначала
            </motion.p>
          )}
        </AnimatePresence>

        <header className="relative z-[2] mb-4 flex shrink-0 items-center justify-between lg:mb-6">
          <BackButton />
          <div className="text-right">
            <p className="text-sm tracking-[0.28em] text-[var(--theme-text-muted)] uppercase">
              Акт I
            </p>
            <h1 className="font-display text-4xl lg:text-5xl">Музыка</h1>
          </div>
        </header>

        <div className="relative z-[2] flex min-h-0 flex-1 items-center justify-center pb-4">
          <MusicPlayer
            track={player.track}
            blood={blood}
            isPlaying={player.isPlaying}
            currentTime={player.currentTime}
            duration={player.duration}
            volume={player.volume}
            onToggle={player.toggle}
            onPrev={onPrev}
            onNext={onNext}
            onSeek={player.seek}
            onVolume={player.setVolume}
          />
        </div>
      </main>
    </PageTransition>
  )
}
