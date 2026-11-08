import { useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { lyricsEffect, TRACK_LENGTH } from '../../data/lyricsEffect'
import { layoutFor } from './lyricLayout'
import LyricWord from './LyricWord'
import StickerItem from './StickerItem'
import SplitEffect from './SplitEffect'
import FinalLine from './FinalLine'

const FLOATING = new Set(['verse', 'prechorus', 'chorus', 'sticker'])
const SPECIAL_LIFE = 7.5

function formatClock(seconds) {
  const safe = Math.max(0, seconds || 0)
  const m = Math.floor(safe / 60)
  const s = (safe % 60).toFixed(1).padStart(4, '0')
  return `${m}:${s}`
}

export default function LyricsBackground({ currentTime, isPlaying, duration }) {
  const [params] = useSearchParams()
  const debug = params.get('debug') === '1'
  const end = duration > 1 ? duration : TRACK_LENGTH

  const layouts = useMemo(
    () => lyricsEffect.map((item, index) => layoutFor(index, item.type)),
    [],
  )

  const visible = useMemo(() => {
    if (!isPlaying) return []
    const active = []
    lyricsEffect.forEach((item, index) => {
      if (!FLOATING.has(item.type)) return
      const life = layouts[index].life
      if (currentTime >= item.time && currentTime < item.time + life) {
        active.push({ item, index })
      }
    })
    return active.slice(-4)
  }, [currentTime, isPlaying, layouts])

  const chorusOn = visible.some(({ item }) => item.type === 'chorus')

  const specialIndex = lyricsEffect.findIndex((item) => item.type === 'special')
  const special = lyricsEffect[specialIndex]
  const showSpecial =
    isPlaying &&
    special &&
    currentTime >= special.time &&
    currentTime < special.time + SPECIAL_LIFE

  const finalIndex = lyricsEffect.findIndex((item) => item.type === 'final')
  const finalLine = lyricsEffect[finalIndex]
  const showFinal = isPlaying && finalLine && currentTime >= finalLine.time && currentTime < end
  const finalFading = showFinal && currentTime > end - 6

  const lastShown = lyricsEffect.reduce(
    (acc, item, index) => (currentTime >= item.time ? index : acc),
    -1,
  )

  useEffect(() => {
    const onKey = (event) => {
      if (event.code !== 'KeyT' || event.repeat) return
      const tag = event.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const shown = lyricsEffect[lastShown]
      console.log(
        `[lyrics] ${formatClock(currentTime)} (${currentTime.toFixed(2)} с)` +
          (shown ? ` · последняя: #${lastShown} ${shown.type} «${shown.text || 'sticker'}»` : ''),
      )
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [currentTime, lastShown])

  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: chorusOn ? 1 : 0 }}
        transition={{ duration: 1.1 }}
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255, 150, 180, 0.28), transparent 70%)',
        }}
      />

      <AnimatePresence>
        {visible.map(({ item, index }) =>
          item.type === 'sticker' ? (
            <StickerItem key={`sticker-${index}`} image={item.image} layout={layouts[index]} />
          ) : (
            <LyricWord
              key={`${item.type}-${index}`}
              text={item.text}
              type={item.type}
              layout={layouts[index]}
              index={index}
            />
          ),
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSpecial && <SplitEffect key="split" text={special.text} />}
      </AnimatePresence>

      <AnimatePresence>
        {showFinal && <FinalLine key="final" text={finalLine.text} fading={finalFading} />}
      </AnimatePresence>

      {debug && (
        <div className="absolute right-4 bottom-4 rounded-xl bg-black/45 px-3 py-2 font-mono text-xs text-white">
          <div>{formatClock(currentTime)}</div>
          <div>фраза: {lastShown < 0 ? '—' : `#${lastShown}`}</div>
        </div>
      )}
    </div>
  )
}
