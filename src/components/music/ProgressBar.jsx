import { useRef } from 'react'

export default function ProgressBar({ currentTime, duration, onSeek }) {
  const barRef = useRef(null)
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0

  const seekFromEvent = (clientX) => {
    const bar = barRef.current
    if (!bar || duration <= 0) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
    onSeek(ratio * duration)
  }

  return (
    <div
      ref={barRef}
      role="slider"
      tabIndex={0}
      aria-valuemin={0}
      aria-valuemax={duration || 0}
      aria-valuenow={currentTime}
      aria-label="Прогресс трека"
      className="group relative h-3 w-full cursor-pointer rounded-full bg-white/45"
      onClick={(e) => seekFromEvent(e.clientX)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') onSeek(Math.min(currentTime + 5, duration || currentTime))
        if (e.key === 'ArrowLeft') onSeek(Math.max(currentTime - 5, 0))
      }}
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--theme-accent)] to-[var(--theme-accent-deep)] transition-[width] duration-75"
        style={{ width: `${progress * 100}%` }}
      />
      <div
        className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--theme-accent-deep)] shadow-md transition-transform group-hover:scale-110"
        style={{ left: `calc(${progress * 100}% - 10px)` }}
      />
    </div>
  )
}
