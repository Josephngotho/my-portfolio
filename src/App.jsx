import { useTheme } from './hooks/useTheme'
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

  return (
    <div className="site-body">
      <Navbar theme={theme} onToggleTheme={toggle} />

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
    </div>
  )
}
