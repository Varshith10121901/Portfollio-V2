import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Mobile Background: Upward Floating Parallax Splitting Dots.
 *   - As the user scrolls down, dots float upward smoothly into 3D space ("feel in the back").
 *   - Seamless infinite vertical wrapping so particle stream never stops.
 *   - Light Blue (#38bdf8 / #0284c7) theme with touch splitting repulsion.
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
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1500)
    camera.position.set(0, 80, 360)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 2. Minimal & Spacious Particle Grid (Spacing: 56, ~12x14 = 168 Dots)
    const spacing = 56
    const cols = 12
    const rows = 14
    const numParticles = cols * rows
    const boundsY = (rows * spacing) / 2

    const origPos = new Float32Array(numParticles * 3)
    const currPos = new Float32Array(numParticles * 3)
    const targetPos = new Float32Array(numParticles * 3)
    const floatOffsets = new Float32Array(numParticles) // Unique floating Y position per dot

    let i = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2 + 0.5) * spacing
        const z = (r - rows / 2 + 0.5) * spacing
        const y = (r - rows / 2 + 0.5) * spacing

        origPos[i * 3] = x
        origPos[i * 3 + 1] = y
        origPos[i * 3 + 2] = z

        currPos[i * 3] = x
        currPos[i * 3 + 1] = y
        currPos[i * 3 + 2] = z

        targetPos[i * 3] = x
        targetPos[i * 3 + 1] = y
        targetPos[i * 3 + 2] = z

        floatOffsets[i] = y
        i++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(currPos, 3))

    // Canvas Texture for Crisp Light Blue Round Dots (#38bdf8)
    const canvasDot = document.createElement('canvas')
    canvasDot.width = 32
    canvasDot.height = 32
    const ctx = canvasDot.getContext('2d')
    ctx.beginPath()
    ctx.arc(16, 16, 10, 0, Math.PI * 2)
    ctx.fillStyle = '#38bdf8'
    ctx.fill()

    const dotTexture = new THREE.CanvasTexture(canvasDot)

    const material = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 4.5,
      map: dotTexture,
      transparent: true,
      opacity: 0.5,
      depthTest: false
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // 3. Touch & Mouse Interaction Tracking for Touch Splitting
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

    // 4. Scroll Physics: Upward Floating Dynamics
    let scrollVel = 0
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY
      scrollVel += delta * 0.08 // Directly accelerate upward float speed on scroll
      lastScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // 5. Upward Floating & Splitting Animation Loop
    let animationFrameId
    let count = 0

    const animate = () => {
      count += 0.015

      // Base background drift speed + scroll speed boost
      const baseUpwardSpeed = 0.4
      const currentSpeed = baseUpwardSpeed + scrollVel
      scrollVel *= 0.92 // Smooth friction decay

      const isDark = document.documentElement.classList.contains('dark')
      material.color.setHex(isDark ? 0x06b6d4 : 0x0284c7)

      const posAttr = geometry.getAttribute('position')
      const posArr = posAttr.array

      for (let p = 0; p < numParticles; p++) {
        const px = origPos[p * 3]
        const pz = origPos[p * 3 + 2]

        // Advance Y floating position upward
        floatOffsets[p] += currentSpeed

        // Wrap particles back to bottom when floating past top boundary (infinite loop)
        if (floatOffsets[p] > boundsY) {
          floatOffsets[p] -= boundsY * 2
          currPos[p * 3 + 1] = floatOffsets[p]
        } else if (floatOffsets[p] < -boundsY) {
          floatOffsets[p] += boundsY * 2
          currPos[p * 3 + 1] = floatOffsets[p]
        }

        const py = floatOffsets[p]
        const waveX = Math.sin(count + py * 0.02) * 3

        // Touch splitting repulsion
        const dx = posArr[p * 3] - touchWorldPos.x
        const dz = posArr[p * 3 + 2] - touchWorldPos.z
        const distSq = dx * dx + dz * dz
        const repelRadius = 120

        let pushX = 0
        let pushZ = 0
        let pushY = 0

        if (distSq < repelRadius * repelRadius && distSq > 0.001) {
          const dist = Math.sqrt(distSq)
          const factor = (1 - dist / repelRadius)
          const force = factor * factor * 35
          pushX = (dx / dist) * force
          pushZ = (dz / dist) * force
          pushY = force * 0.4
        }

        // Set target position with upward floating Y
        targetPos[p * 3] = px + waveX + pushX
        targetPos[p * 3 + 1] = py + pushY
        targetPos[p * 3 + 2] = pz + pushZ

        // Smooth lerp (0.12) for silky-smooth motion
        posArr[p * 3] += (targetPos[p * 3] - posArr[p * 3]) * 0.12
        posArr[p * 3 + 1] += (targetPos[p * 3 + 1] - posArr[p * 3 + 1]) * 0.12
        posArr[p * 3 + 2] += (targetPos[p * 3 + 2] - posArr[p * 3 + 2]) * 0.12
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
