import { motion } from 'framer-motion'

export default function FinalLine({ text, fading }) {
  return (
    <motion.div
      className="pointer-events-none absolute top-[14%] left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: fading ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: fading ? 1.4 : 1.2, ease: 'easeInOut' }}
    >
      <p className="lyric-font lyric-final text-center text-5xl text-[#e8789a] md:text-7xl">{text}</p>
    </motion.div>
  )
}
