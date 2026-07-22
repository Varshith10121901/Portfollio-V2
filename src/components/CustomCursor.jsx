import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Inner dot (zero spring lag)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      dotX.set(e.clientX - 3)
      dotY.set(e.clientY - 3)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY, dotX, dotY, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="custom-cursor-ring"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          translateX: dotX,
          translateY: dotY,
        }}
      />
    </>
  )
}
