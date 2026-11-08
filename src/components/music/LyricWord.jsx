import { motion } from 'framer-motion'

function Sparks({ index }) {
  const dots = [0, 1, 2, 3, 4, 5]
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden>
      {dots.map((n) => {
        const angle = ((index * 47 + n * 60) % 360) * (Math.PI / 180)
        const dist = 28 + ((index * 13 + n * 17) % 36)
        return (
          <span
            key={n}
            className="lyric-spark"
            style={{
              left: `calc(50% + ${Math.cos(angle) * dist}px)`,
              top: `calc(50% + ${Math.sin(angle) * dist}px)`,
              animationDelay: `${n * 0.08}s`,
            }}
          />
        )
      })}
    </span>
  )
}

export default function LyricWord({ text, type, layout, index }) {
  const chorus = type === 'chorus'
  const pre = type === 'prechorus'

  return (
    <motion.div
      className="pointer-events-none absolute max-w-[280px]"
      style={{ left: `${layout.x}%`, top: `${layout.y}%`, rotate: layout.rotate }}
      initial={{ opacity: 0, filter: 'blur(8px)', x: 0, y: 8 }}
      animate={{ opacity: 1, filter: 'blur(0px)', x: layout.driftX, y: layout.driftY }}
      exit={{ opacity: 0, filter: 'blur(6px)' }}
      transition={{
        opacity: { duration: pre ? 1.1 : 0.9, ease: 'easeOut' },
        filter: { duration: 1 },
        x: { duration: layout.life, ease: 'linear' },
        y: { duration: layout.life, ease: 'linear' },
      }}
    >
      <p
        className={`lyric-font relative ${chorus ? 'lyric-chorus' : ''} ${pre ? 'lyric-pre' : 'lyric-verse'}`}
      >
        {pre
          ? text.split('').map((ch, i) => (
              <span key={`${ch}-${i}`} className="lyric-letter" style={{ animationDelay: `${i * 0.045}s` }}>
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))
          : text}
        {chorus && <Sparks index={index} />}
      </p>
    </motion.div>
  )
}
