import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cartoons } from '../../data/cartoons'
import BookCover from './BookCover'
import BookSpread from './BookSpread'
import BookEnd from './BookEnd'

const END = cartoons.length

function PageFace({ index, side, extra }) {
  if (index >= END) return <BookEnd side={side} extra={extra} />
  const cartoon = cartoons[index]
  if (!cartoon) return <BookEnd side={side} extra={extra} />
  return <BookSpread cartoon={cartoon} pageNumber={index + 1} side={side} />
}

export default function Book({ extraEnd = null }) {
  const [opened, setOpened] = useState(() => {
    const saved = sessionStorage.getItem('book-page-index')
    return saved !== null
  })
  const [index, setIndex] = useState(() => {
    const saved = sessionStorage.getItem('book-page-index')
    return saved !== null ? parseInt(saved, 10) : 0
  })
  const [turn, setTurn] = useState(null)
  const turnDone = useRef(false)

  const busy = Boolean(turn)

  const goNext = useCallback(() => {
    if (!opened || turn || index >= END) return
    setTurn({ dir: 'next', from: index })
  }, [opened, turn, index])

  const goPrev = useCallback(() => {
    if (!opened || turn || index <= 0) return
    setTurn({ dir: 'prev', from: index })
  }, [opened, turn, index])

  const finishTurn = () => {
    if (turnDone.current) return
    turnDone.current = true
    setTurn((current) => {
      if (!current) return null
      setIndex(current.dir === 'next' ? current.from + 1 : current.from - 1)
      return null
    })
  }

  useEffect(() => {
    turnDone.current = false
  }, [turn])

  useEffect(() => {
    if (opened) {
      sessionStorage.setItem('book-page-index', index.toString())
    }
  }, [index, opened])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  useEffect(() => {
    const onWheel = (e) => {
      if (!opened || turn) return
      if (Math.abs(e.deltaY) < 30) return
      e.preventDefault()
      if (e.deltaY > 0) goNext()
      else goPrev()
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [opened, turn, goNext, goPrev])

  if (!opened) {
    return <BookCover onOpen={() => setOpened(true)} />
  }

  const from = turn?.from ?? index
  const dir = turn?.dir

  const staticLeft = dir === 'prev' ? from - 1 : from
  const staticRight = dir === 'next' ? from + 1 : from

  const sheetFront = dir === 'next' ? from : from - 1
  const sheetBack = dir === 'next' ? from + 1 : from

  return (
    <div className="flex flex-col items-center">
      <div className="book-scene">
        <div className="book-open">
          <div className="relative z-[1]">
            <PageFace index={staticLeft} side="left" extra={extraEnd} />
          </div>
          <div className="relative z-[1]">
            <PageFace index={staticRight} side="right" extra={extraEnd} />
          </div>

          <button
            type="button"
            aria-label="Предыдущая страница"
            className="book-edge book-edge-left"
            onClick={goPrev}
            disabled={busy || index <= 0}
          />
          <button
            type="button"
            aria-label="Следующая страница"
            className="book-edge book-edge-right"
            onClick={goNext}
            disabled={busy || index >= END}
          />

          {turn && (
            <motion.div
              className="book-sheet"
              initial={{ rotateY: dir === 'next' ? 0 : -180 }}
              animate={{ rotateY: dir === 'next' ? -180 : 0 }}
              transition={{ duration: 0.9, ease: [0.45, 0.02, 0.2, 1] }}
              onAnimationComplete={finishTurn}
            >
              <div className="book-face">
                <PageFace index={sheetFront} side="right" extra={extraEnd} />
              </div>
              <div className="book-face book-face-back">
                <PageFace index={sheetBack} side="left" extra={extraEnd} />
              </div>
            </motion.div>
          )}

          <div className="book-gutter" aria-hidden />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={busy || index <= 0}
          className="book-nav"
        >
          Назад
        </button>
        <span className="text-sm tracking-[0.18em] text-[var(--theme-text-muted)]">
          {index >= END ? 'Конец' : `${index + 1} / ${cartoons.length}`}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={busy || index >= END}
          className="book-nav"
        >
          Вперёд
        </button>
      </div>
    </div>
  )
}
