import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const LINE1 = "Specializing in Generative AI, Agentic AI architectures, RAG systems, and cloud-native deployments as an active Open Source Contributor."
const LINE2 = "Building production-ready intelligent services backed by FastAPI, PostgreSQL, and Google Cloud Platform."
const CHAR_MS = 32
const DOT_MS  = 320
const DOT_SEQ = ['.', '..', '...', '...', '...', '...', '...', '..', '.', '']

// All DOM updates go through refs — zero React re-renders while typing
function HeroTypewriter() {
  const span1Ref   = useRef(null)  // line1 text
  const span2Ref   = useRef(null)  // line2 text
  const dotsRef    = useRef(null)  // pause dots span
  const cursor1Ref = useRef(null)  // cursor after line1
  const cursor2Ref = useRef(null)  // cursor after line2
  const wrapRef    = useRef(null)  // line2 wrapper

  useEffect(() => {
    let rafId
    const delay = setTimeout(() => {
      let lastTime  = null
      let accumChar = 0
      let accumDot  = 0
      let _phase    = 'line1'
      let _charIdx  = 0
      let _dotStep  = 0

      // Show cursor1, hide everything else
      if (cursor1Ref.current) cursor1Ref.current.style.display = 'inline-block'
      if (cursor2Ref.current) cursor2Ref.current.style.display = 'none'
      if (dotsRef.current)    dotsRef.current.style.display    = 'none'
      if (wrapRef.current)    wrapRef.current.style.display    = 'none'

      const tick = (now) => {
        if (lastTime === null) lastTime = now
        const delta = Math.min(now - lastTime, 50)
        lastTime = now

        if (_phase === 'line1') {
          accumChar += delta
          while (accumChar >= CHAR_MS) {
            accumChar -= CHAR_MS
            _charIdx++
            // Direct DOM write — no React involved
            if (span1Ref.current) span1Ref.current.textContent = LINE1.slice(0, _charIdx)
            if (_charIdx >= LINE1.length) {
              _phase = 'pause'; _charIdx = 0; accumChar = 0; accumDot = 0
              // Swap: hide cursor1, show dots
              if (cursor1Ref.current) cursor1Ref.current.style.display = 'none'
              if (dotsRef.current)    dotsRef.current.style.display    = 'inline'
              break
            }
          }

        } else if (_phase === 'pause') {
          accumDot += delta
          while (accumDot >= DOT_MS) {
            accumDot -= DOT_MS
            if (_dotStep < DOT_SEQ.length) {
              if (dotsRef.current) dotsRef.current.textContent = DOT_SEQ[_dotStep]
              _dotStep++
            }
            if (_dotStep >= DOT_SEQ.length) {
              _phase = 'line2'
              // Swap: hide dots, show line2 wrapper + cursor2
              if (dotsRef.current)    dotsRef.current.style.display = 'none'
              if (wrapRef.current)    wrapRef.current.style.display = 'inline'
              if (cursor2Ref.current) cursor2Ref.current.style.display = 'inline-block'
              break
            }
          }

        } else if (_phase === 'line2') {
          accumChar += delta
          while (accumChar >= CHAR_MS) {
            accumChar -= CHAR_MS
            _charIdx++
            if (span2Ref.current) span2Ref.current.textContent = LINE2.slice(0, _charIdx)
            if (_charIdx >= LINE2.length) {
              _phase = 'done'
              if (cursor2Ref.current) cursor2Ref.current.style.display = 'none'
              break
            }
          }
        }

        if (_phase !== 'done') rafId = requestAnimationFrame(tick)
      }

      rafId = requestAnimationFrame(tick)
    }, 900)

    return () => {
      clearTimeout(delay)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <p className="hero-description">
      {/* Line 1 — textContent written directly via ref */}
      <span ref={span1Ref} />
      <span ref={cursor1Ref} className="typewriter-cursor-bar" style={{ display: 'none' }} />

      {/* Pause dots */}
      <span
        ref={dotsRef}
        style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.15em', display: 'none' }}
      />

      {/* Line 2 wrapper — hidden until phase === line2 */}
      <span ref={wrapRef} style={{ display: 'none' }}>
        {' '}
        <span ref={span2Ref} />
        <span ref={cursor2Ref} className="typewriter-cursor-bar" style={{ display: 'none' }} />
      </span>
    </p>
  )
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 18 },
    },
  }

  const name = 'VARSHITH KUMAR A'

  const nameContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
    },
  }

  const letterVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 14, stiffness: 160 },
    },
  }

  return (
    <section id="home" className="hero-section">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="hero-greeting" variants={itemVariants}>
          Welcome to the Agentic Era
        </motion.span>
        
        {/* Responsive, Word-grouped letter reveal animation */}
        <motion.h1
          className="hero-title"
          variants={nameContainerVariants}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.15em', overflow: 'hidden', paddingBottom: '0.1em' }}
        >
          {name.split(' ').map((word, wordIdx) => (
            <span key={wordIdx} style={{ display: 'inline-flex', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
              {word.split('').map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  variants={letterVariants}
                  className="text-gradient"
                  style={{ display: 'inline-block', willChange: 'transform' }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
        
        <motion.h2 className="hero-subtitle text-gradient-purple-cyan" variants={itemVariants}>
          AI Engineer & Full Stack Developer
        </motion.h2>

        {/* Contact details row */}
        <motion.div 
          className="hero-metadata-row" 
          variants={itemVariants}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            fontSize: '0.95rem',
            color: 'var(--text)',
            marginBottom: '2rem',
            fontFamily: 'var(--font-sans)'
          }}
        >
          <span>📍 Hubballi, Karnataka</span>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <span>📞 +91 7022756962</span>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <a href="mailto:varshithkumar815@gmail.com" style={{ color: 'var(--primary)', transition: 'var(--transition-smooth)' }} className="hover-underline">
            ✉️ varshithkumar815@gmail.com
          </a>
        </motion.div>
        
        <HeroTypewriter />
        
        <motion.div className="hero-actions" variants={itemVariants}>
          <a href="https://aiasapp.me/" target="_blank" rel="noreferrer" className="google-sweep-btn">
            <span className="google-sweep-btn-inner">
              Launch AIAS
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>
          <a href="/Final_Resume.pdf" target="_blank" rel="noreferrer" className="btn-secondary">
            View Resume
          </a>
          <a href="#contact" className="btn-secondary">
            Get In Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <a href="#about" aria-label="Scroll to About section">
          <div className="mouse">
            <motion.div
              className="wheel"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </a>
      </motion.div>
    </section>
  )
}
