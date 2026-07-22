import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Mobile Interactive Splitting Dots Background:
 *   - Light Mode Color: Light Blue (#38bdf8 / #0284c7) on clean #ffffff backdrop.
 *   - No Net Structure: Pure splitting particle dots.
 *   - Touch & Mouse Interactive: Dots split & repel on user touch/drag with spring return.
 *   - Scroll Reactive: Scrolling accelerates dot wave dynamics.
 */
export default function MobileAnimativeBg() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let width = window.innerWidth
    let height = window.innerHeight

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 2000)
    camera.position.set(0, 120, 380)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 2. Pure Splitting Particle Dots Grid (No Net Lines!)
    const cols = 28
    const rows = 28
    const numParticles = cols * rows
    const spacing = 32

    const origPos = new Float32Array(numParticles * 3)
    const currPos = new Float32Array(numParticles * 3)
    const velPos = new Float32Array(numParticles * 3)

    let i = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * spacing
        const z = (r - rows / 2) * spacing
        const y = 0

        origPos[i * 3] = x
        origPos[i * 3 + 1] = y
        origPos[i * 3 + 2] = z

        currPos[i * 3] = x
        currPos[i * 3 + 1] = y
        currPos[i * 3 + 2] = z

        velPos[i * 3] = 0
        velPos[i * 3 + 1] = 0
        velPos[i * 3 + 2] = 0
        i++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(currPos, 3))

    // Canvas Texture for Light Blue (#38bdf8) Crisp Round Dots
    const canvasDot = document.createElement('canvas')
    canvasDot.width = 64
    canvasDot.height = 64
    const ctx = canvasDot.getContext('2d')
    ctx.beginPath()
    ctx.arc(32, 32, 26, 0, Math.PI * 2)
    ctx.fillStyle = '#38bdf8' // Light Blue
    ctx.fill()

    const dotTexture = new THREE.CanvasTexture(canvasDot)

    const material = new THREE.PointsMaterial({
      color: 0x38bdf8, // Light Blue
      size: 7.0,
      map: dotTexture,
      transparent: true,
      opacity: 0.85,
      depthTest: true
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // 3. Touch & Mouse Interaction Tracking for Splitting Effect
    const mouse2D = new THREE.Vector2(-9999, -9999)
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const touchWorldPos = new THREE.Vector3(-9999, -9999, -9999)

    const updatePointer = (clientX, clientY) => {
      mouse2D.x = (clientX / window.innerWidth) * 2 - 1
      mouse2D.y = -(clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse2D, camera)
      raycaster.ray.intersectPlane(plane, touchWorldPos)
    }

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleMouseMove = (e) => {
      updatePointer(e.clientX, e.clientY)
    }

    const handleTouchEnd = () => {
      touchWorldPos.set(-9999, -9999, -9999)
    }

    window.addEventListener('touchstart', handleTouchMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // 4. Scroll Acceleration Tracking
    let scrollVel = 0
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY)
      scrollVel += delta * 0.008
      lastScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // 5. Animation & Particle Splitting Physics Loop
    let animationFrameId
    let count = 0

    const animate = () => {
      count += 0.018 + Math.min(scrollVel, 0.05)
      scrollVel *= 0.92 // Decay scroll velocity

      const isDark = document.documentElement.classList.contains('dark')
      material.color.setHex(isDark ? 0x06b6d4 : 0x0284c7) // Cyan in dark, Light Blue in light

      const posAttr = geometry.getAttribute('position')
      const posArr = posAttr.array

      for (let p = 0; p < numParticles; p++) {
        const px = origPos[p * 3]
        const py = origPos[p * 3 + 1]
        const pz = origPos[p * 3 + 2]

        // Ambient sine wave motion
        const waveY = Math.sin(count + px * 0.02 + pz * 0.02) * 10

        // Calculate distance to touch/mouse cursor for splitting repulsion
        const dx = posArr[p * 3] - touchWorldPos.x
        const dz = posArr[p * 3 + 2] - touchWorldPos.z
        const distSq = dx * dx + dz * dz
        const repelRadius = 140

        if (distSq < repelRadius * repelRadius && distSq > 0.001) {
          const dist = Math.sqrt(distSq)
          const force = (1 - dist / repelRadius) * 22
          velPos[p * 3] += (dx / dist) * force
          velPos[p * 3 + 2] += (dz / dist) * force
          velPos[p * 3 + 1] += force * 0.5 // Lift splitting dots on touch
        }

        // Apply velocities & spring return to origin
        velPos[p * 3] += (px - posArr[p * 3]) * 0.08
        velPos[p * 3 + 1] += (waveY - posArr[p * 3 + 1]) * 0.08
        velPos[p * 3 + 2] += (pz - posArr[p * 3 + 2]) * 0.08

        velPos[p * 3] *= 0.85
        velPos[p * 3 + 1] *= 0.85
        velPos[p * 3 + 2] *= 0.85

        posArr[p * 3] += velPos[p * 3]
        posArr[p * 3 + 1] += velPos[p * 3 + 1]
        posArr[p * 3 + 2] += velPos[p * 3 + 2]
      }

      posAttr.needsUpdate = true
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // 6. Window Resize Listener
    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      dotTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="mobile-vanta-dots-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -2,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'var(--bg, #ffffff)',
        transition: 'background 0.5s ease',
      }}
    />
  )
}
