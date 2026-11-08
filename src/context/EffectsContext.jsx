import { createContext, useContext, useMemo, useState } from 'react'

const EffectsContext = createContext(null)

export function EffectsProvider({ children }) {
  const [petalsEnabled, setPetalsEnabled] = useState(true)
  /** 0 — скрыты/заморожены, 0.2 — медленно, 1 — обычная скорость */
  const [petalsSpeed, setPetalsSpeed] = useState(1)

  const value = useMemo(
    () => ({
      petalsEnabled,
      setPetalsEnabled,
      enablePetals: () => setPetalsEnabled(true),
      disablePetals: () => setPetalsEnabled(false),
      petalsSpeed,
      setPetalsSpeed,
    }),
    [petalsEnabled, petalsSpeed],
  )

  return <EffectsContext.Provider value={value}>{children}</EffectsContext.Provider>
}

export function useEffects() {
  const ctx = useContext(EffectsContext)
  if (!ctx) throw new Error('useEffects must be used within EffectsProvider')
  return ctx
}
