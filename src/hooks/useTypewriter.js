import { useEffect, useRef, useState } from 'react'

/**
 * Typewriter animation hook — cycles through an array of strings.
 * Respects prefers-reduced-motion.
 */
export function useTypewriter(words, { typingSpeed = 80, deletingSpeed = 45, pauseMs = 1800 } = {}) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState('typing') // 'typing' | 'pausing' | 'deleting'
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (!words || words.length === 0) return

    // Reduced-motion: just show each word statically, cycle slowly
    if (reducedMotion.current) {
      const id = setInterval(() => {
        setWordIndex(i => (i + 1) % words.length)
      }, 3000)
      return () => clearInterval(id)
    }

    const current = words[wordIndex]

    let timeout

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1))
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 100)
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(d => d.slice(0, -1))
        }, deletingSpeed)
      } else {
        setWordIndex(i => (i + 1) % words.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseMs])

  // For reduced-motion, show word directly
  const value = reducedMotion.current ? words[wordIndex] : displayed

  return { value, isDeleting: phase === 'deleting' }
}
