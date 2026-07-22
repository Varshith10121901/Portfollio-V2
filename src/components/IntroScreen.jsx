import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = ['Welcome', 'to', 'My', 'Portfolio']

// Letter-by-letter stagger for each word, grey -> gradient text, then whole
// screen wipes up and out to reveal the Hero underneath.
export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState('type') // 'type' -> 'hold' -> 'exit' -> unmounted
  const hasFired = useRef(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 1800)
    const t2 = setTimeout(() => setPhase('exit'), 2500)
    const t3 = setTimeout(() => {
      if (!hasFired.current) {
        hasFired.current = true
        onComplete?.()
      }
    }, 3300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  const wordVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  }

  const letterVariants = {
    hidden: { y: 24, opacity: 0, filter: 'blur(6px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 140, damping: 16 },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        className="intro-screen"
        initial={{ y: 0 }}
        animate={
          phase === 'exit'
            ? { y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
            : { y: 0 }
        }
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg, #050507)',
          overflow: 'hidden',
        }}
      >
        {/* faint scanline / grid texture to match the wireframe hero identity */}
        <div className="intro-grid-overlay" />

        <div style={{ position: 'relative', textAlign: 'center', padding: '0 1.5rem' }}>
          <motion.div
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5em',
              fontFamily: 'var(--font-heading, var(--font-sans))',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 6vw, 3.6rem)',
              letterSpacing: '0.01em',
            }}
          >
            {WORDS.map((word, wIdx) => (
              <span key={wIdx} style={{ display: 'inline-flex' }}>
                {word.split('').map((char, cIdx) => (
                  <motion.span
                    key={cIdx}
                    variants={letterVariants}
                    className={wIdx >= 2 ? 'intro-word-accent' : 'intro-word-grey'}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.div>

          {/* underline sweep that ties the words together once typed in */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: phase !== 'type' ? 1 : 0,
              opacity: phase !== 'type' ? 1 : 0,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              marginTop: '1.25rem',
              height: '2px',
              width: '100%',
              transformOrigin: 'center',
              background:
                'linear-gradient(90deg, transparent, var(--primary, #8b5cf6), var(--secondary, #22d3ee), transparent)',
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
