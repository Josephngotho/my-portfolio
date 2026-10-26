import { useState, useEffect } from 'react'

/**
 * Manages light/dark theme — reads from localStorage, respects OS preference,
 * persists the user's choice, and writes the `dark` class to <html>.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('kibara-theme')
      if (stored === 'light' || stored === 'dark') return stored
    } catch (_) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('kibara-theme', theme)
    } catch (_) {}
  }, [theme])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggle }
}
