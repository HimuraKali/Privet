import { motion } from 'framer-motion'

export default function ChatItem({ chat, onClick }) {
  const isSpecial = chat.special
  const avatarUrl = isSpecial 
    ? '/images/messenger/avatar-special.png' 
    : '/images/messenger/avatar-default.png'

  const fallbackAvatar = (
    <div className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${isSpecial ? 'bg-pink-400' : 'bg-gray-300'}`}>
      {chat.name[0]}
    </div>
  )

  return (
    <motion.div
      whileTap={isSpecial ? { scale: 0.98 } : {}}
      onClick={isSpecial ? onClick : undefined}
      className={`flex items-center gap-[1rem] border-b border-[#ffe4e9] p-[1rem] transition-colors ${
        isSpecial ? 'cursor-pointer hover:bg-pink-50' : 'cursor-default'
      }`}
    >
      <div className="relative h-[3rem] w-[3rem] shrink-0">
        <img
          src={avatarUrl}
          alt={chat.name}
          className="h-full w-full rounded-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div style={{ display: 'none' }} className="h-full w-full">{fallbackAvatar}</div>
        
        {isSpecial && (
          <span className="absolute right-0 top-0 flex h-[0.75rem] w-[0.75rem]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-[0.75rem] w-[0.75rem] rounded-full bg-red-500"></span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className={`truncate text-[0.875rem] font-semibold ${isSpecial ? 'text-[#6a3a3a]' : 'text-[#8c8c8c]'}`}>
            {chat.name}
          </h3>
          <span className="text-[0.65rem] text-[#b0b0b0]">{chat.time}</span>
        </div>
        <p className="truncate text-[0.75rem] text-[#b0b0b0]">{chat.preview}</p>
      </div>
    </motion.div>
  )
}
