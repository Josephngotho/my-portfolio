import { useState, useEffect, useCallback } from 'react'

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showIOSGuide, setShowIOSGuide] = useState(false)

  useEffect(() => {
    // Check if already in standalone mode
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://')

    setIsStandalone(isStandaloneMode)

    // Detect iOS devices (Safari on iOS doesn't support beforeinstallprompt)
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIosDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)
    setIsIOS(isIosDevice && !isStandaloneMode)

    // Listen for beforeinstallprompt on supported browsers (Chrome, Edge, Android)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
      setShowIOSGuide(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Listen for display-mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleMediaChange = (e) => {
      setIsStandalone(e.matches)
    }
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setIsInstalled(true)
      }
      setDeferredPrompt(null)
      return outcome
    } else if (isIOS) {
      setShowIOSGuide(true)
      return 'ios-guide'
    }
    return null
  }, [deferredPrompt, isIOS])

  const closeIOSGuide = useCallback(() => {
    setShowIOSGuide(false)
  }, [])

  const canInstall = !isStandalone && !isInstalled && (!!deferredPrompt || isIOS)

  return {
    canInstall,
    isStandalone,
    isInstalled,
    isIOS,
    showIOSGuide,
    promptInstall,
    closeIOSGuide,
  }
}
