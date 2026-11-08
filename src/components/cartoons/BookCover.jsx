import { motion } from 'framer-motion'

export default function BookCover({ onOpen }) {
  return (
    <div className="book-scene flex items-center justify-center">
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Открыть книгу"
        className="book-cover relative h-[min(640px,78vh)] w-[min(460px,86vw)] cursor-pointer text-left"
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: -8, y: -6 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
      >
        <span className="book-cover-face">
          <span className="book-cover-gold" />
          <span className="book-cover-ornament" aria-hidden>
            ✦
          </span>
          <span className="font-display block text-center text-5xl text-[#fff6ea] md:text-6xl">
            Мультики
          </span>
          <span className="mt-4 block text-center text-xs tracking-[0.35em] text-[#f3d7a1] uppercase">
            Акт III
          </span>
          <span className="book-cover-ornament mt-8" aria-hidden>
            ✦
          </span>
        </span>
        <span className="book-cover-pages" aria-hidden />
      </motion.button>
    </div>
  )
}
