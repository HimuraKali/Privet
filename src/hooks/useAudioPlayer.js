import { useCallback, useEffect, useRef, useState } from 'react'

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/**
 * HTML Audio: плейлист, seek, громкость, авто-next по кругу.
 * Без автозапуска — play только по действию пользователя.
 */
export default function useAudioPlayer(playlist) {
  const audioRef = useRef(null)
  const wantPlayRef = useRef(false)
  const indexRef = useRef(0)

  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.7)

  const track = playlist[index] ?? playlist[0]

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audio.volume = 0.7
    audioRef.current = audio

    const onTime = () => setCurrentTime(audio.currentTime || 0)
    const onMeta = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      wantPlayRef.current = true
      setIndex((i) => (i + 1) % playlist.length)
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('durationchange', onMeta)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.pause()
      audio.src = ''
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('durationchange', onMeta)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audioRef.current = null
    }
  }, [playlist.length])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track) return undefined

    setCurrentTime(0)
    setDuration(0)
    audio.src = track.src
    audio.load()

    let cancelled = false
    if (wantPlayRef.current) {
      audio.play().catch(() => {
        if (!cancelled) {
          wantPlayRef.current = false
          setIsPlaying(false)
        }
      })
    }

    return () => {
      cancelled = true
    }
  }, [index, track])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !track) return
    wantPlayRef.current = true
    if (!audio.src) {
      audio.src = track.src
      audio.load()
    }
    audio.play().catch(() => {
      wantPlayRef.current = false
      setIsPlaying(false)
    })
  }, [track])

  const pause = useCallback(() => {
    wantPlayRef.current = false
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, pause, play])

  const selectTrack = useCallback(
    (i) => {
      if (i === indexRef.current) {
        play()
        return
      }
      wantPlayRef.current = true
      setIndex(i)
    },
    [play],
  )

  const next = useCallback(() => {
    wantPlayRef.current = true
    setIndex((i) => (i + 1) % playlist.length)
  }, [playlist.length])

  const prev = useCallback(() => {
    const audio = audioRef.current
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      setCurrentTime(0)
      return
    }
    wantPlayRef.current = true
    setIndex((i) => (i - 1 + playlist.length) % playlist.length)
  }, [playlist.length])

  const seek = useCallback((time) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(time)) return
    const max = Number.isFinite(audio.duration) ? audio.duration : time
    audio.currentTime = Math.min(Math.max(time, 0), max)
    setCurrentTime(audio.currentTime)
  }, [])

  const setVolume = useCallback((v) => {
    const next = Math.min(Math.max(v, 0), 1)
    setVolumeState(next)
    if (audioRef.current) audioRef.current.volume = next
  }, [])

  return {
    track,
    index,
    isPlaying,
    currentTime,
    duration,
    volume,
    play,
    pause,
    toggle,
    next,
    prev,
    seek,
    setVolume,
    selectTrack,
  }
}
