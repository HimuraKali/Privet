import { motion } from 'framer-motion'

export function MessageBubble({ message }) {
  const isIncoming = message.type === 'incoming'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`mb-3 flex ${isIncoming ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
          isIncoming
            ? 'rounded-tl-none bg-white text-[#6a3a3a]'
            : 'rounded-tr-none bg-[#ffb7c5] text-white'
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  )
}

export function TypingIndicator() {
  return (
    <div className="mb-3 flex justify-start">
      <div className="flex gap-1 rounded-2xl rounded-tl-none bg-white/80 px-4 py-3 shadow-sm">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="h-1.5 w-1.5 rounded-full bg-[#6a3a3a]/40"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
          className="h-1.5 w-1.5 rounded-full bg-[#6a3a3a]/40"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
          className="h-1.5 w-1.5 rounded-full bg-[#6a3a3a]/40"
        />
      </div>
    </div>
  )
}
