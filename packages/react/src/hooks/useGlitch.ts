import { useState, useEffect } from 'react'
import { glitch } from '@matrixui/tokens'

export interface UseGlitchResult {
  isGlitching: boolean
}

export function useGlitch(): UseGlitchResult {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Math.random() < glitch.probability) {
        setIsGlitching(true)
        const duration = glitch.durationMin + Math.random() * (glitch.durationMax - glitch.durationMin)
        const timeoutId = setTimeout(() => setIsGlitching(false), duration)
        return () => clearTimeout(timeoutId)
      }
    }, glitch.checkInterval)

    return () => clearInterval(intervalId)
  }, [])

  return { isGlitching }
}
