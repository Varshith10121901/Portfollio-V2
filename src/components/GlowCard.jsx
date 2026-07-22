import { useRef, forwardRef, useImperativeHandle } from 'react'

const GlowCard = forwardRef(({ children, className = '', ...props }, ref) => {
  const cardRef = useRef(null)
  useImperativeHandle(ref, () => cardRef.current)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glow-card-wrapper ${className}`}
      {...props}
    >
      <div className="glow-card-inner">
        {children}
      </div>
    </div>
  )
})

GlowCard.displayName = 'GlowCard'

export default GlowCard
