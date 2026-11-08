import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LandingScreen() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #f7b0c8 0%, #e8789a 35%, #c45a7a 70%, #8a3a58 100%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#5c2a40]/40 to-transparent" />

      {/* Солнце заката */}
      <div
        className="absolute bottom-[28%] left-1/2 h-36 w-36 -translate-x-1/2 rounded-full opacity-80 blur-sm"
        style={{
          background: 'radial-gradient(circle, #ffe0c8 0%, #ffb090 45%, transparent 70%)',
        }}
      />

      <motion.div
        className="relative z-10 max-w-xl text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-3 text-sm tracking-[0.28em] text-white/70 uppercase">Посадка</p>
        <h2 className="font-display text-4xl text-white md:text-6xl">
          Спасибо, что полетела
        </h2>
        <Link
          to="/home"
          className="glass mt-10 inline-flex rounded-full px-8 py-3.5 text-sm text-[var(--theme-text)] transition hover:bg-white/70"
        >
          Вернуться на главную
        </Link>
      </motion.div>
    </section>
  )
}
