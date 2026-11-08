import { motion } from 'framer-motion'

export default function SplitEffect({ text }) {
  const words = text.split(' ')
  const mid = Math.ceil(words.length / 2)
  const left = words.slice(0, mid).join(' ')
  const right = words.slice(mid).join(' ')

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[4]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="absolute top-[16%] bottom-[16%] left-1/2 w-[14vw] -translate-x-1/2"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(48, 12, 42, 0.55) 15%, rgba(90, 20, 70, 0.72) 50%, rgba(48, 12, 42, 0.55) 85%, transparent)',
          boxShadow: '0 0 40px rgba(180, 80, 140, 0.45)',
        }}
      />

      <motion.div
        className="absolute inset-y-0 left-0 w-1/2"
        initial={{ x: 0 }}
        animate={{ x: '-5vw' }}
        exit={{ x: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            'linear-gradient(160deg, rgba(255, 236, 244, 0.94), rgba(255, 196, 216, 0.9))',
          clipPath: 'inset(0 0 0 0)',
        }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2"
        initial={{ x: 0 }}
        animate={{ x: '5vw' }}
        exit={{ x: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            'linear-gradient(200deg, rgba(255, 236, 244, 0.94), rgba(255, 196, 216, 0.9))',
        }}
      />

      <div className="absolute top-[6%] right-[52%] max-w-[34vw] text-right">
        <p className="lyric-font text-4xl leading-tight text-[#6a2848] md:text-6xl" style={{ textShadow: '0 0 18px rgba(255, 210, 226, 0.9)' }}>
          {left}
        </p>
      </div>
      <div className="absolute top-[6%] left-[52%] max-w-[34vw]">
        <p className="lyric-font text-4xl leading-tight text-[#6a2848] md:text-6xl" style={{ textShadow: '0 0 18px rgba(255, 210, 226, 0.9)' }}>
          {right}
        </p>
      </div>
    </motion.div>
  )
}
