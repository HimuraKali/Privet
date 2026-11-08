import { motion } from 'framer-motion'
import { AirplaneHtml } from './Airplane'

export default function BoardingScreen() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #ffe6f0 0%, #ffd0e4 40%, #ffc2d9 70%, #f5b8d0 100%)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { t: '12%', l: '8%', s: 180, o: 0.55 },
          { t: '22%', l: '70%', s: 220, o: 0.45 },
          { t: '58%', l: '15%', s: 160, o: 0.4 },
          { t: '68%', l: '60%', s: 200, o: 0.5 },
          { t: '35%', l: '40%', s: 140, o: 0.35 },
        ].map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/70 blur-md"
            style={{
              top: c.t,
              left: c.l,
              width: c.s,
              height: c.s * 0.45,
              opacity: c.o,
            }}
            animate={{ x: [0, 18, 0] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10"
        animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="scale-[2.4] md:scale-[3]">
          <AirplaneHtml />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--theme-text-muted)]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-sm tracking-[0.2em] uppercase">Листай вниз</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 10l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
