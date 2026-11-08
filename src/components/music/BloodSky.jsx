import { motion } from 'framer-motion'

const BOLTS = [
  { d: 'M180 0 L150 90 L190 90 L140 180', left: '12%', delay: 0.4, duration: 4.8 },
  { d: 'M80 0 L60 70 L95 72 L40 160', left: '68%', delay: 1.8, duration: 5.6 },
  { d: 'M120 0 L100 80 L140 78 L90 170', left: '40%', delay: 3.1, duration: 6.4 },
]

/** Редкие вспышки молний для пятого трека. */
export default function BloodSky() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {BOLTS.map((bolt) => (
        <motion.svg
          key={bolt.left}
          viewBox="0 0 220 190"
          className="absolute top-0 h-[55vh] w-40"
          style={{ left: bolt.left }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.95, 0, 0, 0.55, 0] }}
          transition={{
            duration: bolt.duration,
            delay: bolt.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.72, 0.75, 0.78, 0.86, 0.88, 1],
          }}
        >
          <path
            d={bolt.d}
            fill="none"
            stroke="#ffd0d4"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 10px #ff4d5a)' }}
          />
        </motion.svg>
      ))}

      <motion.div
        className="absolute inset-0 bg-[#ff2a3a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.18, 0, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'linear', times: [0, 0.7, 0.74, 0.8, 1] }}
      />
    </div>
  )
}
