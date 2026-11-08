import { cloneElement } from 'react'
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { EffectsProvider } from './context/EffectsContext'
import ThemeRoot from './components/ThemeRoot'
import SparkleCursor from './components/SparkleCursor'
import FallingPetals from './components/FallingPetals'
import OpeningPage from './pages/OpeningPage'
import HomePage from './pages/HomePage'
import MessengerPage from './pages/MessengerPage'
import {
  MusicPage,
  PlacesPage,
  CartoonsPage,
} from './pages/acts'

const routes = [
  { path: '/', element: <OpeningPage /> },
  { path: '/home', element: <HomePage /> },
  { path: '/acts/music', element: <MusicPage /> },
  { path: '/acts/places', element: <PlacesPage /> },
  { path: '/acts/cartoons', element: <CartoonsPage /> },
  { path: '/messenger', element: <MessengerPage /> },
]

function AnimatedRoutes() {
  const location = useLocation()
  const element = useRoutes(routes, location)

  return (
    <AnimatePresence mode="wait">
      {element && cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <EffectsProvider>
        <ThemeRoot>
          <SparkleCursor />
          <FallingPetals />
          <AnimatedRoutes />
        </ThemeRoot>
      </EffectsProvider>
    </BrowserRouter>
  )
}
