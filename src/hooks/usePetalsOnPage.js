import { useEffect } from 'react'
import { useEffects } from '../context/EffectsContext'

/**
 * Включает или отключает лепестки для конкретной страницы.
 * При размонтировании возвращает значения по умолчанию.
 */
export default function usePetalsOnPage(enabled = true) {
  const { setPetalsEnabled, setPetalsSpeed } = useEffects()

  useEffect(() => {
    setPetalsEnabled(enabled)
    return () => {
      setPetalsEnabled(true)
      setPetalsSpeed(1)
    }
  }, [enabled, setPetalsEnabled, setPetalsSpeed])
}
