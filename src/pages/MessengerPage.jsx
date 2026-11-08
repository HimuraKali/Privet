import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PhoneFrame from '../components/messenger/PhoneFrame'
import ChatList from '../components/messenger/ChatList'
import ChatScreen from '../components/messenger/ChatScreen'
import PageTransition from '../components/PageTransition'
import usePetalsOnPage from '../hooks/usePetalsOnPage'
import SparkleCursor from '../components/SparkleCursor'

export default function MessengerPage() {
  usePetalsOnPage(true)
  const navigate = useNavigate()
  const [activeChat, setActiveChat] = useState(null)
  const [specialChatFinished, setSpecialChatFinished] = useState(false)
  const [hideSpecial, setHideSpecial] = useState(false)

  // Сброс состояния при входе
  useEffect(() => {
    setActiveChat(null)
    setSpecialChatFinished(false)
    setHideSpecial(false)
  }, [])

  const handleChatClick = (chat) => {
    setActiveChat(chat)
  }

  const handleBack = (finished = false) => {
    if (finished) {
      // Сначала скрываем чат из списка (внутри состояния)
      setHideSpecial(true)
      // Затем запускаем процесс выхода
      setTimeout(() => {
        setSpecialChatFinished(true)
        setTimeout(() => {
          const savedPage = sessionStorage.getItem('book-page-index') || '6'
          navigate(`/acts/cartoons?page=${savedPage}`)
        }, 500)
      }, 1000)
    } else {
      setActiveChat(null)
    }
  }

  return (
    <PageTransition>
      <div className="relative flex min-h-screen items-center justify-center bg-[#fff5f7] p-4 overflow-hidden">
        <SparkleCursor />
        
        <PhoneFrame>
          <AnimatePresence mode="wait">
            {!activeChat ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <ChatList onChatClick={handleChatClick} hideSpecial={hideSpecial} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full"
              >
                <ChatScreen 
                  chat={activeChat} 
                  onBack={handleBack} 
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlay for finishing animation */}
          <AnimatePresence>
            {specialChatFinished && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-[#fff5f7]"
              />
            )}
          </AnimatePresence>
        </PhoneFrame>
      </div>
    </PageTransition>
  )
}
