import { useState, useEffect } from 'react'
import { Download, Share2, PlusSquare, X, WifiOff } from 'lucide-react'

export function IOSInstallModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="How to install KibaraTechs on iOS"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="install-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close installation guide"
        >
          <X size={18} />
        </button>

        <div className="install-modal-header">
          <div className="install-modal-icon">
            <img
              src="/icons/icon-192.png"
              alt="KibaraTechs App Icon"
              style={{ width: 48, height: 48, borderRadius: 12 }}
            />
          </div>
          <div>
            <h3 className="install-modal-title">Install KibaraTechs</h3>
            <p className="install-modal-subtitle">Add to your iPhone or iPad Home Screen</p>
          </div>
        </div>

        <ol className="install-steps">
          <li>
            <div className="install-step-num">1</div>
            <div>
              <p className="install-step-title">
                Tap the <strong>Share</strong> button <Share2 size={16} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> in Safari's toolbar
              </p>
              <p className="install-step-desc">Found at the bottom of iPhone or top of iPad.</p>
            </div>
          </li>
          <li>
            <div className="install-step-num">2</div>
            <div>
              <p className="install-step-title">
                Scroll down and select <strong>Add to Home Screen</strong> <PlusSquare size={16} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} />
              </p>
              <p className="install-step-desc">This creates a fast, standalone app icon.</p>
            </div>
          </li>
          <li>
            <div className="install-step-num">3</div>
            <div>
              <p className="install-step-title">
                Tap <strong>Add</strong> in the top right corner
              </p>
              <p className="install-step-desc">Launch KibaraTechs anytime from your Home Screen.</p>
            </div>
          </li>
        </ol>

        <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  )
}

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <aside className="offline-notification-bar" role="status" aria-live="polite">
      <div className="offline-notification-inner">
        <WifiOff size={15} aria-hidden="true" />
        <span>You are currently offline. Cached portfolio sections and graphics remain accessible.</span>
      </div>
    </aside>
  )
}

export function InstallButton({ canInstall, promptInstall, className = '' }) {
  if (!canInstall) return null

  return (
    <button
      className={`btn btn-install ${className}`}
      onClick={promptInstall}
      aria-label="Install KibaraTechs App"
      title="Install KibaraTechs on your device"
    >
      <Download size={14} aria-hidden="true" />
      <span>Install App</span>
    </button>
  )
}
