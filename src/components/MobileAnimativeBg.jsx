import { useEffect, useRef } from 'react'

/**
 * Lightweight, high-performance mobile animated dots/wave background.
 * Replaces the heavy frame-canvas video background on mobile screens (<= 768px).
 * Color Palette: Warm Amber/Orange (#ff8820) & Cyan (#22d3ee) animated dots.
 */
export default function MobileAnimativeBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let step = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const render = () => {
      step += 0.015
      const width = canvas.width
      const height = canvas.height
      const isDark = document.documentElement.classList.contains('dark')

      // Clear canvas with crisp backdrop
      ctx.fillStyle = isDark ? '#08090d' : '#f8fafc'
      ctx.fillRect(0, 0, width, height)

      // Draw subtle animated glowing dots grid wave
      const gap = 32
      const rows = Math.ceil(height / gap) + 1
      const cols = Math.ceil(width / gap) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * gap
          const y = r * gap
          
          // Sine wave displacement logic
          const wave = Math.sin(step + c * 0.2 + r * 0.15) * 4
          const radius = Math.max(1, 1.8 + Math.cos(step * 0.8 + c * 0.1) * 0.8)

          ctx.beginPath()
          ctx.arc(x, y + wave, radius, 0, Math.PI * 2)

          // Alternate between amber (#ff8820) and cyan (#22d3ee)
          if ((c + r) % 2 === 0) {
            ctx.fillStyle = isDark ? 'rgba(255, 136, 32, 0.4)' : 'rgba(255, 136, 32, 0.55)'
          } else {
            ctx.fillStyle = isDark ? 'rgba(34, 211, 238, 0.35)' : 'rgba(34, 211, 238, 0.45)'
          }
          ctx.fill()
        }
      }

      // Draw subtle connecting wave lines
      ctx.beginPath()
      ctx.strokeStyle = isDark ? 'rgba(255, 136, 32, 0.08)' : 'rgba(255, 136, 32, 0.12)'
      ctx.lineWidth = 1
      for (let c = 0; c < cols; c++) {
        const x = c * gap
        const wave = Math.sin(step + c * 0.2) * 8 + height * 0.7
        if (c === 0) ctx.moveTo(x, wave)
        else ctx.lineTo(x, wave)
      }
      ctx.stroke()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      className="mobile-animative-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -2,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
