import { useState } from 'react'
import { motion } from 'framer-motion'

export default function StickerItem({ image, layout }) {
  const [failed, setFailed] = useState(false)

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: `${layout.x}%`, top: `${layout.y}%`, width: layout.size, height: layout.size }}
      initial={{ opacity: 0, scale: 0.82, rotate: layout.rotate - 6 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: [layout.rotate - 4, layout.rotate + 4, layout.rotate - 4],
        x: layout.driftX,
        y: layout.driftY,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        opacity: { duration: 0.8 },
        rotate: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
        x: { duration: layout.life, ease: 'linear' },
        y: { duration: layout.life, ease: 'linear' },
      }}
    >
      {failed ? (
        <span className="flex h-full w-full items-center justify-center text-7xl">🐱</span>
      ) : (
        <img
          src={image}
          alt=""
          className="h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(232,122,158,0.35)]"
          onError={() => setFailed(true)}
        />
      )}
    </motion.div>
  )
}
