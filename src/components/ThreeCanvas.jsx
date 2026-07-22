import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COLS = 50
const ROWS = 50
const PARTICLE_COUNT = COLS * ROWS
const SPACING = 0.35

// Initialize grid layout positions once at module load
const particlePositions = new Float32Array(PARTICLE_COUNT * 3)
for (let i = 0; i < COLS; i++) {
  for (let j = 0; j < ROWS; j++) {
    const idx = (i * ROWS + j) * 3
    particlePositions[idx] = (i - COLS / 2) * SPACING // x
    particlePositions[idx + 1] = 0 // y (animated in useFrame)
    particlePositions[idx + 2] = (j - ROWS / 2) * SPACING // z
  }
}

// Generate circular pure white radial texture so we can shade it dynamically
let particleTexture = null
if (typeof document !== 'undefined') {
  const canvas = document.createElement('canvas')
  canvas.width = 16
  canvas.height = 16
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 16, 16)
    particleTexture = new THREE.CanvasTexture(canvas)
  }
}

// Custom particle field component
function ParticleField() {
  const ref = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const scrollY = useRef(0)
  const [isDark, setIsDark] = useState(false)

  // Track HTML dark class mutations dynamically
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handleScroll = () => {
      scrollY.current = window.scrollY
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useFrame((state) => {
    if (!ref.current) return

    const time = state.clock.getElapsedTime()
    const geom = ref.current.geometry
    const pos = geom.attributes.position
    const arr = pos.array

    // Calculate normalized scroll ratio (0 to 1)
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1
    const scrollRatio = Math.min(scrollY.current / maxScroll, 1)

    // Animate positions to create a wave that changes intensity with scroll
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        const idx = (i * ROWS + j) * 3
        const x = arr[idx]
        const z = arr[idx + 2]
        
        const d = Math.sqrt(x * x + z * z)
        
        // Increase wave height and wave speed slightly as the user scrolls
        const waveAmplitude = 0.3 + scrollRatio * 0.45
        const waveSpeed = 1.0 + scrollRatio * 1.5
        
        arr[idx + 1] = Math.sin(d * 0.4 - time * waveSpeed) * waveAmplitude + Math.cos(x * 0.35 + time) * 0.15
      }
    }
    pos.needsUpdate = true

    // Dynamic rotation & positioning relative to scroll + mouse movement
    const targetRotX = -Math.PI / 4.5 - scrollRatio * (Math.PI / 5)
    const targetRotY = scrollRatio * (Math.PI / 3.5)
    const targetPosY = -0.8 + scrollRatio * 1.2
    const targetPosZ = scrollRatio * 1.5

    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotX + mouse.current.y * 0.1, 0.05)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY + mouse.current.x * 0.18, 0.05)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetPosY, 0.05)
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetPosZ, 0.05)
  })

  return (
    <points ref={ref} position={[0, -0.8, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      {particleTexture && (
        <pointsMaterial
          size={0.065}
          map={particleTexture}
          color={isDark ? '#a855f7' : '#1a73e8'} /* Purple in dark, GCP Blue in light */
          transparent
          opacity={isDark ? 0.45 : 0.3}
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending} /* additive blending in dark, alpha normal in light */
        />
      )}
    </points>
  )
}

export default function ThreeCanvas() {
  return (
    <div id="bg-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} />
        <ParticleField />
      </Canvas>
    </div>
  )
}
