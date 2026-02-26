'use client'

import { useEffect, useRef, useState } from 'react'
import { REVEAL_OBSERVER_OPTIONS } from '@/lib/animation.config'

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(entry.target)
        }
      })
    }, REVEAL_OBSERVER_OPTIONS)

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, revealed }
}

export function useStaggeredReveal<T extends HTMLElement = HTMLDivElement>(count: number) {
  const ref = useRef<T>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(entry.target)
        }
      })
    }, REVEAL_OBSERVER_OPTIONS)

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, revealed, count }
}
