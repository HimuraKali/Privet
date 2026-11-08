import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { messengerConfig } from '../../data/messenger'
import { MessageBubble, TypingIndicator } from './MessageBubble'

export default function ChatScreen({ chat, onBack }) {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [isDissolving, setIsDissolving] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const startChat = async () => {
    setChatStarted(true)
    setShowInput(true)
    
    // Первый этап: "печатает..."
    setIsTyping(true)
    await new Promise(r => setTimeout(r, messengerConfig.typingDelay))
    setIsTyping(false)
    
    // Первое сообщение
    setMessages(prev => [...prev, messengerConfig.messages[0]])
    
    // Пауза перед вторым сообщением
    await new Promise(r => setTimeout(r, messengerConfig.messageDelay))
    
    // Второй этап: "печатает..."
    setIsTyping(true)
    await new Promise(r => setTimeout(r, messengerConfig.typingDelay))
    setIsTyping(false)
    
    // Второе сообщение
    setMessages(prev => [...prev, messengerConfig.messages[1]])
    
    // Таймер на растворение
    setTimeout(() => {
      setIsDissolving(true)
      setTimeout(() => {
        onBack(true) // true означает, что чат завершен успешно
      }, 2000)
    }, messengerConfig.dissolveDelay)
  }

  return (
    <div className="flex h-full flex-col bg-[#fff0f3]">
      {/* Header */}
      <div className="flex items-center gap-[0.75rem] border-b border-[#ffe4e9] bg-white/80 px-[1rem] py-[0.75rem] backdrop-blur-sm">
        <button onClick={() => !chatStarted && onBack(false)} className={`text-[#6a3a3a] ${chatStarted ? 'opacity-30 cursor-default' : ''}`}>
          <svg className="h-[1.5rem] w-[1.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="h-[2.25rem] w-[2.25rem] overflow-hidden rounded-full bg-pink-100">
          <img src="/images/messenger/avatar-special.png" alt={chat.name} className="h-full w-full object-cover" onError={(e) => { e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=special' }} />
        </div>
        <div className="flex flex-col">
          <span className="text-[0.875rem] font-bold text-[#6a3a3a]">{chat.name}</span>
          <span className="text-[0.6rem] text-pink-400">в сети</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="relative flex-1 overflow-y-auto p-[1rem] scrollbar-hide">
        <AnimatePresence>
          {!isDissolving && (
            <motion.div exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }} transition={{ duration: 1.5 }}>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Dissolve Particles Effect */}
        <AnimatePresence>
          {isDissolving && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 200, 
                    y: (Math.random() - 0.5) * 200 - 100,
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute h-[0.75rem] w-[0.75rem] rounded-full bg-pink-300"
                  style={{
                    left: `${40 + Math.random() * 20}%`,
                    top: `${40 + Math.random() * 20}%`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Area */}
      <div className="p-[1rem]">
        {!chatStarted ? (
          <button
            onClick={startChat}
            className="w-full rounded-[1rem] bg-gradient-to-r from-[#ffb7c5] to-[#ff8fa3] py-[1rem] font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {messengerConfig.openChatButtonText}
          </button>
        ) : (
          <div className="flex items-center gap-[0.5rem] rounded-[1rem] bg-white px-[1rem] py-[0.75rem] shadow-inner">
            <div className="flex-1 text-[0.875rem] text-gray-300">Сообщение...</div>
            <svg className="h-[1.25rem] w-[1.25rem] text-pink-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
