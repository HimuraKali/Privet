import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Curtain from '../components/Curtain'
import usePetalsOnPage from '../hooks/usePetalsOnPage'

/**
 * Стартовый экран: только занавес. По клику раздвигается и ведёт на главную.
 */
export default function OpeningPage() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  usePetalsOnPage(false)

  const handleOpen = () => {
    if (open) return
    setOpen(true)
    window.setTimeout(() => navigate('/home'), 1650)
  }

  return (
    <motion.div
      className="dreamy-bg fixed inset-0"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Curtain open={open} onOpen={handleOpen} />
    </motion.div>
  )
}
