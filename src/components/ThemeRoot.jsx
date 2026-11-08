import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Маршрут → акцентная палитра (CSS data-theme) */
const THEME_BY_PATH = {
  '/': 'pink',
  '/home': 'pink',
  '/acts/music': 'lavender',
  '/acts/places': 'sky',
  '/acts/cartoons': 'peach',
}

export default function ThemeRoot({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const theme = THEME_BY_PATH[pathname] ?? 'pink'
    document.documentElement.setAttribute('data-theme', theme)
  }, [pathname])

  return children
}
