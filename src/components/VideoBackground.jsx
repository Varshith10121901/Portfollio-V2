import { useEffect, useRef, useState } from "react"

const FRAMES = [
  "/frames/frame-00-00.png",
  "/frames/frame-00-00 (1).png",
  "/frames/frame-00-00 (2).png",
  "/frames/frame-00-00 (3).png",
  "/frames/frame-00-00 (4).png",
  "/frames/frame-00-00 (5).png",
  "/frames/frame-00-00 (6).png",
  "/frames/frame-00-01.png",
  "/frames/frame-00-01 (1).png",
  "/frames/frame-00-01 (2).png",
  "/frames/frame-00-01 (3).png",
  "/frames/frame-00-01 (4).png",
  "/frames/frame-00-02.png",
  "/frames/frame-00-02 (1).png",
  "/frames/frame-00-02 (2).png",
  "/frames/frame-00-02 (3).png",
  "/frames/frame-00-02 (4).png",
  "/frames/frame-00-02 (5).png",
  "/frames/frame-00-03.png",
  "/frames/frame-00-03 (1).png",
  "/frames/frame-00-03 (2).png",
  "/frames/frame-00-03 (3).png",
  "/frames/frame-00-03 (4).png",
  "/frames/frame-00-04.png",
  "/frames/frame-00-04 (1).png",
  "/frames/frame-00-04 (2).png",
  "/frames/frame-00-04 (3).png",
  "/frames/frame-00-04 (4).png",
  "/frames/frame-00-05.png",
  "/frames/frame-00-05 (1).png",
  "/frames/frame-00-05 (2).png",
  "/frames/frame-00-05 (3).png",
  "/frames/frame-00-05 (4).png",
  "/frames/frame-00-05 (5).png",
  "/frames/frame-00-05 (6).png",
  "/frames/frame-00-06.png",
  "/frames/frame-00-06 (1).png",
  "/frames/frame-00-06 (2).png",
  "/frames/frame-00-07.png",
  "/frames/frame-00-07 (1).png",
  "/frames/frame-00-07 (2).png",
  "/frames/frame-00-08.png",
  "/frames/frame-00-08 (1).png",
  "/frames/frame-00-08 (2).png",
  "/frames/frame-00-09.png",
  "/frames/frame-00-09 (1).png",
  "/frames/frame-00-10.png",
  "/frames/frame-00-10 (1).png",
]

const TOTAL      = FRAMES.length
const OPACITY    = 0.46
const LERP       = 0.08
const FADE_STEPS = 12

// Replicates CSS 'object-fit: cover' exactly on the canvas
function drawImageCover(ctx, img, canvasW, canvasH) {
  if (!img || img.width === 0 || img.height === 0) return

  const imgRatio = img.width / img.height
  const canvasRatio = canvasW / canvasH
  let sx, sy, sw, sh

  if (imgRatio > canvasRatio) {
    // Image is wider than canvas
    sh = img.height
    sw = sh * canvasRatio
    sx = (img.width - sw) / 2
    sy = 0
  } else {
    // Image is taller than canvas
    sw = img.width
    sh = sw / canvasRatio
    sx = 0
    sy = (img.height - sh) / 2
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH)
}

export default function VideoBackground() {
  const canvasRef = useRef(null)
  const [isDark,  setIsDark]  = useState(false)
  const [visible, setVisible] = useState(false)

  const decoded    = useRef(new Array(TOTAL).fill(null))
  const stateRef   = useRef({
    smooth:    0,
    target:    0,
    curr:      0,
    prev:      0,
    fadeStep:  FADE_STEPS,
    rafId:     null,
    running:   false,
  })

  // ── Theme observer ───────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  // ── Progressive frame decode ─────────────────────────────────────────────
  useEffect(() => {
    let firstShown = false
    const decodeOne = (i) => {
      const img = new Image()
      img.src = FRAMES[i]
      const done = () => {
        decoded.current[i] = img
        if (i === 0 && !firstShown) {
          firstShown = true
          setVisible(true)
          // Draw first frame immediately using object-fit cover math
          const c = canvasRef.current
          if (c) {
            const ctx = c.getContext("2d")
            ctx.globalAlpha = OPACITY
            drawImageCover(ctx, img, c.width, c.height)
            ctx.globalAlpha = 1
          }
        }
      }
      img.decode().then(done).catch(done)
    }
    decodeOne(0)
    for (let i = 1; i < TOTAL; i++) {
      setTimeout(() => decodeOne(i), i < 8 ? i * 100 : i * 70 + 300)
    }
  }, [])

  // ── Canvas resize (exact viewport size for maximum sharpness) ───────────
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current
      if (!c) return
      c.width  = window.innerWidth
      c.height = window.innerHeight
      
      // If we are currently idle, repaint the current frame so resizing doesn't clear it
      const s = stateRef.current
      if (!s.running && decoded.current[s.curr]) {
        const ctx = c.getContext("2d")
        ctx.clearRect(0, 0, c.width, c.height)
        ctx.globalAlpha = OPACITY
        drawImageCover(ctx, decoded.current[s.curr], c.width, c.height)
        ctx.globalAlpha = 1
      }
    }
    resize()
    window.addEventListener("resize", resize, { passive: true })
    return () => window.removeEventListener("resize", resize)
  }, [])

  // ── On-demand rAF: only runs while scrolling, goes idle otherwise ────────
  useEffect(() => {
    const s = stateRef.current

    const paint = () => {
      const c = canvasRef.current
      if (!c) return
      const ctx = c.getContext("2d")

      s.smooth += (s.target - s.smooth) * LERP

      const next = Math.max(0, Math.min(TOTAL - 1, Math.round(s.smooth)))
      if (next !== s.curr && decoded.current[next]) {
        s.prev     = s.curr
        s.curr     = next
        s.fadeStep = 0
      }

      if (s.fadeStep < FADE_STEPS) s.fadeStep++
      const t = s.fadeStep / FADE_STEPS
      const eased = t * t * (3 - 2 * t)

      const prevImg = decoded.current[s.prev]
      const currImg = decoded.current[s.curr]

      ctx.clearRect(0, 0, c.width, c.height)

      // Draw outgoing frame (fading out)
      if (prevImg && eased < 1) {
        ctx.globalAlpha = OPACITY * (1 - eased)
        drawImageCover(ctx, prevImg, c.width, c.height)
      }
      // Draw incoming frame (fading in)
      if (currImg) {
        ctx.globalAlpha = OPACITY * eased
        drawImageCover(ctx, currImg, c.width, c.height)
      }
      ctx.globalAlpha = 1

      const stillMoving =
        Math.abs(s.target - s.smooth) > 0.01 || s.fadeStep < FADE_STEPS
      if (stillMoving) {
        s.rafId = requestAnimationFrame(paint)
      } else {
        s.running = false
        s.rafId   = null
      }
    }

    const wake = () => {
      if (s.running) return
      s.running = true
      s.rafId   = requestAnimationFrame(paint)
    }

    const onScroll = () => {
      const max   = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? window.scrollY / max : 0
      s.target    = Math.min(TOTAL - 1, Math.floor(ratio * TOTAL))
      wake()
    }

    stateRef.current._wake = wake

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (s.rafId) cancelAnimationFrame(s.rafId)
    }
  }, [])

  return (
    <div
      className="bg-video-container"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 1s ease" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position:        "absolute",
          top:             0,
          left:            0,
          width:           "100%",
          height:          "100%",
          display:         "block",
          imageRendering:  "auto",
          filter:          "brightness(1.25) contrast(1.05)",
          willChange:      "transform",
          transform:       "translateZ(0)",
        }}
      />
      <div className={`bg-video-overlay ${isDark ? "dark" : "light"}`} />
    </div>
  )
}
