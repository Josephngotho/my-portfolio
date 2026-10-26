import { useTheme } from './hooks/useTheme'
import { usePWAInstall } from './hooks/usePWAInstall'
import { IOSInstallModal, OfflineBanner } from './components/InstallPrompt'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import DesignShowcase from './components/DesignShowcase'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { theme, toggle } = useTheme()
  const pwa = usePWAInstall()

  return (
    <div className="site-body">
      <OfflineBanner />
      <Navbar
        theme={theme}
        onToggleTheme={toggle}
        canInstall={pwa.canInstall}
        onInstall={pwa.promptInstall}
      />

      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <DesignShowcase />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <Footer />

      <IOSInstallModal
        isOpen={pwa.showIOSGuide}
        onClose={pwa.closeIOSGuide}
      />
    </div>
  )
}
