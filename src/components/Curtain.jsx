import { motion } from 'framer-motion'

/**
 * Театральный занавес из двух половин. Без надписей.
 * Клик по любой половине — раздвигается.
 */
export default function Curtain({ open, onOpen }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex overflow-hidden ${open ? 'pointer-events-none' : ''}`}
      onClick={open ? undefined : onOpen}
      role={open ? undefined : 'button'}
      tabIndex={open ? undefined : 0}
      onKeyDown={(e) => {
        if (!open && (e.key === 'Enter' || e.key === ' ')) onOpen()
      }}
      aria-label={open ? undefined : 'Открыть'}
    >
      <motion.div
        className="velvet-left relative h-full w-1/2 origin-left"
        initial={false}
        animate={{ x: open ? '-105%' : '0%' }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/25 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/30 to-transparent" />
      </motion.div>

      <motion.div
        className="velvet-right relative h-full w-1/2 origin-right"
        initial={false}
        animate={{ x: open ? '105%' : '0%' }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/25 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/30 to-transparent" />
      </motion.div>
    </div>
  )
}
