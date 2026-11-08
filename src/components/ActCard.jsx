import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ActCard({ to, roman, title, accent, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <Link
        to={to}
        className="glass group relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-3xl p-8 text-center transition-shadow duration-300 hover:shadow-[0_20px_50px_var(--theme-shadow)] md:min-h-[280px]"
        style={{
          background: `linear-gradient(145deg, color-mix(in srgb, ${accent} 22%, white), var(--theme-surface))`,
        }}
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
          style={{ background: accent }}
        />
        <div>
          <p className="font-display mb-3 text-2xl tracking-[0.14em] text-[var(--theme-text-muted)]">
            {roman}
          </p>
          <h2 className="font-display text-4xl text-[var(--theme-text)] md:text-5xl">{title}</h2>
        </div>
      </Link>
    </motion.div>
  )
}
