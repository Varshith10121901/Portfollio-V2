import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Native 3D WebGL Vanta DOTS Particle & Line Wave Animation for Mobile.
 * Configured with exact settings from Vanta.js DOTS:
 *   - backgroundColor: #ffffff (light) / #08090d (dark)
 *   - color: #ff8820 (Amber/Orange)
 *   - color2: #ff8820
 *   - size: 3.0
 *   - spacing: 35.0
 *   - showLines: true
 */
export default function MobileAnimativeBg() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let width = window.innerWidth
    let height = window.innerHeight

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000)
    camera.position.set(0, 150, 400)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 2. Create 3D Dots & Lines Grid Wave (Spacing: 35, Size: 3.0)
    const spacing = 35
    const cols = 28
    const rows = 28
    const numParticles = cols * rows

    const positions = new Float32Array(numParticles * 3)
    const initialY = new Float32Array(numParticles)

    let i = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * spacing
        const z = (r - rows / 2) * spacing
        const y = 0

        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z
        initialY[i] = y
        i++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Create Canvas Texture for crisp round dots (#ff8820)
    const canvasDot = document.createElement('canvas')
    canvasDot.width = 64
    canvasDot.height = 64
    const ctx = canvasDot.getContext('2d')
    ctx.beginPath()
    ctx.arc(32, 32, 28, 0, Math.PI * 2)
    ctx.fillStyle = '#ff8820'
    ctx.fill()

    const dotTexture = new THREE.CanvasTexture(canvasDot)

    const material = new THREE.PointsMaterial({
      color: 0xff8820,
      size: 6.5,
      map: dotTexture,
      transparent: true,
      opacity: 0.95,
      depthTest: true
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // 3. Add Connecting 3D Grid Lines (showLines: true)
    const lineIndices = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const current = r * cols + c
        if (c < cols - 1) {
          lineIndices.push(current, current + 1)
        }
        if (r < rows - 1) {
          lineIndices.push(current, current + cols)
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', geometry.getAttribute('position'))
    lineGeometry.setIndex(lineIndices)

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xff8820,
      transparent: true,
      opacity: 0.25
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // 4. Center Glowing Starburst Sphere (matching Vanta screenshot center element)
    const burstCount = 60
    const burstPositions = new Float32Array(burstCount * 6)
    for (let b = 0; b < burstCount; b++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 25 + Math.random() * 35

      const dx = r * Math.sin(phi) * Math.cos(theta)
      const dy = r * Math.sin(phi) * Math.sin(theta)
      const dz = r * Math.cos(phi)

      burstPositions[b * 6] = 0
      burstPositions[b * 6 + 1] = 40
      burstPositions[b * 6 + 2] = 0

      burstPositions[b * 6 + 3] = dx
      burstPositions[b * 6 + 4] = 40 + dy
      burstPositions[b * 6 + 5] = dz
    }

    const burstGeometry = new THREE.BufferGeometry()
    burstGeometry.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3))

    const burstMaterial = new THREE.LineBasicMaterial({
      color: 0xff8820,
      transparent: true,
      opacity: 0.6
    })

    const burstLines = new THREE.LineSegments(burstGeometry, burstMaterial)
    scene.add(burstLines)

    // 5. Animation Loop
    let animationFrameId
    let count = 0

    const animate = () => {
      count += 0.025
      const positionAttr = geometry.getAttribute('position')
      const posArr = positionAttr.array

      let idx = 0
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const y = Math.sin(count + c * 0.3 + r * 0.2) * 12 + Math.cos(count * 0.8 + c * 0.15) * 8
          posArr[idx * 3 + 1] = y
          idx++
        }
      }

      positionAttr.needsUpdate = true
      lineGeometry.getAttribute('position').needsUpdate = true

      burstLines.rotation.y += 0.005
      burstLines.rotation.z += 0.003

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
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      burstGeometry.dispose()
      burstMaterial.dispose()
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
