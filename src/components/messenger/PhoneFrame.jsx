import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function PhoneFrame({ children }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <motion.div
      initial={{ y: '3.125rem', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mx-auto flex h-[50rem] w-[23.75rem] flex-col overflow-hidden rounded-[3rem] border-[0.5rem] border-[#6a3a3a] bg-[#fff0f3] shadow-2xl"
    >
      {/* Status Bar */}
      <div className="flex items-center justify-between px-[2rem] py-[1rem] text-[0.7rem] font-bold text-[#6a3a3a]">
        <span>{formattedTime}</span>
        <div className="flex items-center gap-[0.5rem]">
          <svg className="h-[0.75rem] w-[0.75rem] fill-current" viewBox="0 0 24 24">
            <path d="M12 21L1 10h22L12 21z" />
          </svg>
          <svg className="h-[0.75rem] w-[0.75rem] fill-current" viewBox="0 0 24 24">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
          </svg>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative flex-1 overflow-hidden bg-white/50 backdrop-blur-sm">
        {children}
      </div>

      {/* Bottom Bar (Indicator) */}
      <div className="flex h-[1.5rem] items-center justify-center">
        <div className="h-[0.25rem] w-[8rem] rounded-full bg-[#6a3a3a]/20" />
      </div>
    </motion.div>
  )
}
