import { useState } from 'react'
import Navbar from './components/Navbar'
import VideoBackground from './components/VideoBackground'
import IntroScreen from './components/IntroScreen'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import AuraChatbot from './components/AuraChatbot'

function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {!introDone && <IntroScreen onComplete={() => setIntroDone(true)} />}

      {/* Lagging Pointer Custom Cursor */}
      <CustomCursor />

      {/* Floating Background Mesh Glows */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      {/* Scroll-Synced Video Background */}
      <VideoBackground />

      {/* Aura-Mini Interactive Conversational Agent */}
      <AuraChatbot />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Main Content Layout */}
      <main style={{ marginTop: '80px' }}>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer style={{
        padding: '3rem 0',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        marginTop: '5rem',
        fontSize: '0.9rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 1.5rem' }}>
          <p>© {new Date().getFullYear()} Varshith. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App
