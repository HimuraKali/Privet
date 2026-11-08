import ProgressBar from './ProgressBar'
import { formatTime } from '../../hooks/useAudioPlayer'

function IconPlay() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  )
}

function IconVolume() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 10v4h4l5 4V6L7 10H3zm13.5 2c0-1.77-1-3.29-2.5-4.03v8.05c1.5-.74 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  )
}

export default function PlayerControls({
  isPlaying,
  currentTime,
  duration,
  volume,
  onToggle,
  onSeek,
  onVolume,
}) {
  return (
    <div className="w-full space-y-5">
      <ProgressBar currentTime={currentTime} duration={duration} onSeek={onSeek} />

      <div className="flex items-center justify-between text-sm text-[var(--theme-text-muted)]">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={onToggle}
          className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[var(--theme-accent-deep)] text-white shadow-[0_16px_40px_var(--theme-shadow)] transition hover:scale-105"
          aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
        >
          {isPlaying ? <IconPause /> : <IconPlay />}
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-sm items-center gap-3 pt-2">
        <span className="text-[var(--theme-text-muted)]">
          <IconVolume />
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolume(Number(e.target.value))}
          className="volume-slider h-2.5 w-full"
          aria-label="Громкость"
        />
      </div>
    </div>
  )
}
