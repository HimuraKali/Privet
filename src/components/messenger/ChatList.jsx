import { chats } from '../../data/messenger'
import ChatItem from './ChatItem'

export default function ChatList({ onChatClick, hideSpecial }) {
  const filteredChats = hideSpecial ? chats.filter(c => !c.special) : chats

  return (
    <div className="flex h-full flex-col bg-white/30">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#ffe4e9] bg-[#fff0f3]/80 px-[1.5rem] py-[1rem] backdrop-blur-sm">
        <div className="flex items-center gap-[0.75rem]">
          <div className="h-[2.5rem] w-[2.5rem] overflow-hidden rounded-full bg-pink-100 ring-2 ring-pink-200">
            <img 
              src="/images/messenger/me.jpg" 
              alt="Me" 
              className="h-full w-full object-cover"
              onError={(e) => { e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=me' }}
            />
          </div>
          <span className="font-display text-[2rem] font-bold text-[#6a3a3a]">Я</span>
        </div>
        <div className="flex gap-[1rem] text-[#6a3a3a]/50">
          <svg className="h-[1.25rem] w-[1.25rem] cursor-default" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <svg className="h-[1.25rem] w-[1.25rem] cursor-default" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pb-[5rem] scrollbar-hide">
        {filteredChats.map((chat) => (
          <ChatItem 
            key={chat.id} 
            chat={chat} 
            onClick={() => chat.special && onChatClick(chat)} 
          />
        ))}
      </div>

      {/* Bottom Nav (Fake) */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-[#ffe4e9] bg-[#fff0f3]/90 px-[1rem] py-[0.75rem] backdrop-blur-md">
        <div className="flex flex-col items-center gap-[0.25rem] text-[#6a3a3a]">
          <svg className="h-[1.5rem] w-[1.5rem]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          <span className="text-[0.6rem] font-bold uppercase tracking-wider">Чаты</span>
        </div>
        <div className="flex flex-col items-center gap-[0.25rem] text-[#6a3a3a]/30">
          <svg className="h-[1.5rem] w-[1.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="text-[0.6rem] font-bold uppercase tracking-wider">Люди</span>
        </div>
        <div className="flex flex-col items-center gap-[0.25rem] text-[#6a3a3a]/30">
          <svg className="h-[1.5rem] w-[1.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[0.6rem] font-bold uppercase tracking-wider">Настройки</span>
        </div>
      </div>
    </div>
  )
}
