'use client'

import { useState, useEffect } from 'react'

export function useReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isMobile = window.innerWidth < 768

    setShouldReduceMotion(mediaQuery.matches || isMobile)

    const handleChange = () => {
      const newIsMobile = window.innerWidth < 768
      setShouldReduceMotion(mediaQuery.matches || newIsMobile)
    }

    mediaQuery.addEventListener('change', handleChange)
    window.addEventListener('resize', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', handleChange)
    }
  }, [])

  return shouldReduceMotion
}
