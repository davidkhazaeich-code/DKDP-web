'use client'

import { useEffect, useRef } from 'react'

interface DottedSurfaceProps {
  className?: string
  violetRatio?: number
  orangeRatio?: number
}

export function DottedSurface({
  className = '',
  violetRatio = 0.025,
  orangeRatio = 0.004,
}: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId: number
    let cleanupFn: (() => void) | undefined
    let cancelled = false

    async function init(container: HTMLDivElement) {
      const THREE = await import('three')
      if (cancelled) return

      const SEPARATION = 150
      const AMOUNTX = 60
      const AMOUNTY = 90
      const SHUFFLE_INTERVAL = 4500
      const FADE_SPEED = 0.016      // frames to cross 0→1 ≈ 1.0s at 60fps
      const BREATH_SPEED = 1.0
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Circular dot texture via canvas radial gradient
      function createDotTexture() {
        const size = 64
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')!
        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
        gradient.addColorStop(0, 'rgba(255,255,255,1)')
        gradient.addColorStop(0.4, 'rgba(255,255,255,0.95)')
        gradient.addColorStop(0.7, 'rgba(255,255,255,0.35)')
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, size, size)
        return new THREE.CanvasTexture(canvas)
      }

      const dotTexture = createDotTexture()

      const scene = new THREE.Scene()
      scene.fog = new THREE.Fog(0xffffff, 2000, 10000)

      const camera = new THREE.PerspectiveCamera(
        60,
        (container.offsetWidth || window.innerWidth) / (container.offsetHeight || window.innerHeight),
        1,
        10000
      )
      camera.position.set(0, 500, 900)

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(container.offsetWidth || window.innerWidth, container.offsetHeight || window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      const totalPoints = AMOUNTX * AMOUNTY
      const positions: number[] = []
      const colors: number[] = []
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions.push(ix * SEPARATION - (AMOUNTX * SEPARATION) / 2, 0, iy * SEPARATION - (AMOUNTY * SEPARATION) / 2)
          colors.push(0, 0, 0)
        }
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: 14,
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        sizeAttenuation: true,
        map: dotTexture,
        alphaTest: 0.02,
        depthWrite: false,
      })
      const points = new THREE.Points(geometry, material)
      scene.add(points)

      const glowGeometry = new THREE.BufferGeometry()
      glowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(positions.length), 3))
      glowGeometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(colors.length), 3))

      const glowMaterial = new THREE.PointsMaterial({
        size: 80,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        sizeAttenuation: true,
        depthWrite: false,
        map: dotTexture,
        alphaTest: 0.005,
      })
      const glowPoints = new THREE.Points(glowGeometry, glowMaterial)
      scene.add(glowPoints)

      // Per-point state
      const pointType     = new Uint8Array(totalPoints)   // 0=gray, 1=violet, 2=orange
      const pointT        = new Float32Array(totalPoints) // 0→1: opacity/intensity multiplier
      const pointPhase    = new Float32Array(totalPoints) // random breathing phase offset
      const pointExiting  = new Uint8Array(totalPoints)   // 1 = currently fading out toward gray

      // Vivid brand colors
      const VR = 0.55, VG = 0.22, VB = 1.0   // violet
      const OR = 1.0,  OG = 0.48, OB = 0.0   // orange
      const GRAY = 0.48                        // neutral dot (light white-ish)

      for (let i = 0; i < totalPoints; i++) {
        pointPhase[i] = Math.random() * Math.PI * 2
      }

      function assignNewColors() {
        for (let idx = 0; idx < totalPoints; idx++) {
          const rand = Math.random()
          const next: number = rand < violetRatio ? 1 : rand < violetRatio + orangeRatio ? 2 : 0
          const curr = pointType[idx]

          if (next === 0) {
            // Should deactivate — trigger smooth fade-out instead of instant change
            if (curr !== 0 && !pointExiting[idx]) {
              pointExiting[idx] = 1
            }
          } else {
            if (pointExiting[idx]) {
              // Was fading out — redirect to new color, fade continues from current t
              pointType[idx] = next
              pointExiting[idx] = 0
            } else if (curr === 0) {
              // Was gray — start fresh fade-in
              pointType[idx] = next
              pointT[idx] = 0
            } else {
              // Was a different color — swap color, keep current intensity
              pointType[idx] = next
            }
          }
        }
      }

      function updateColors(time: number) {
        const col  = geometry.attributes.color.array as Float32Array
        const gcol = glowGeometry.attributes.color.array as Float32Array
        const gpos = glowGeometry.attributes.position.array as Float32Array
        const pos  = geometry.attributes.position.array as Float32Array

        for (let idx = 0; idx < totalPoints; idx++) {
          const j    = idx * 3
          const type = pointType[idx]

          if (type === 0 && !pointExiting[idx]) {
            // Pure gray dot — target intensity 0, fade toward it if needed
            if (pointT[idx] > 0) {
              pointT[idx] = Math.max(pointT[idx] - FADE_SPEED, 0)
            }
            if (pointT[idx] === 0) {
              col[j] = col[j + 1] = col[j + 2] = GRAY
              gcol[j] = gcol[j + 1] = gcol[j + 2] = 0
              gpos[j] = 0; gpos[j + 1] = -99999; gpos[j + 2] = 0
              continue
            }
            // Still finishing fade-out from a previous color (t > 0)
          }

          if (pointExiting[idx]) {
            // Smooth fade-out
            pointT[idx] = Math.max(pointT[idx] - FADE_SPEED, 0)
            if (pointT[idx] <= 0) {
              pointExiting[idx] = 0
              pointType[idx] = 0
              col[j] = col[j + 1] = col[j + 2] = GRAY
              gcol[j] = gcol[j + 1] = gcol[j + 2] = 0
              gpos[j] = 0; gpos[j + 1] = -99999; gpos[j + 2] = 0
              continue
            }
          } else {
            // Smooth fade-in
            if (pointT[idx] < 1) pointT[idx] = Math.min(pointT[idx] + FADE_SPEED, 1)
          }

          const t = pointT[idx]

          // Breathing: dot pulses toward white (max 65%) for a luminescent effect
          const breath = 0.5 + 0.5 * Math.sin(time * BREATH_SPEED + pointPhase[idx])

          const cr = type === 1 ? VR : OR
          const cg = type === 1 ? VG : OG
          const cb = type === 1 ? VB : OB

          const finalR = cr + (1.0 - cr) * breath * 0.65
          const finalG = cg + (1.0 - cg) * breath * 0.65
          const finalB = cb + (1.0 - cb) * breath * 0.65

          col[j]     = GRAY + (finalR - GRAY) * t
          col[j + 1] = GRAY + (finalG - GRAY) * t
          col[j + 2] = GRAY + (finalB - GRAY) * t

          const glowStrength = (0.7 + breath * 0.3) * t
          gcol[j]     = cr * glowStrength
          gcol[j + 1] = cg * glowStrength
          gcol[j + 2] = cb * glowStrength
          gpos[j]     = pos[j]
          gpos[j + 1] = pos[j + 1]
          gpos[j + 2] = pos[j + 2]
        }
        geometry.attributes.color.needsUpdate = true
        glowGeometry.attributes.color.needsUpdate = true
        glowGeometry.attributes.position.needsUpdate = true
      }

      assignNewColors()
      for (let i = 0; i < totalPoints; i++) {
        if (pointType[i] !== 0) pointT[i] = 1
      }
      updateColors(0)

      let count = 0
      let lastShuffle = 0

      function animate() {
        animationId = requestAnimationFrame(animate)
        const now = performance.now()
        if (now - lastShuffle > SHUFFLE_INTERVAL) { assignNewColors(); lastShuffle = now }
        updateColors(now / 1000)

        const posArr  = geometry.attributes.position.array as Float32Array
        const gposArr = glowGeometry.attributes.position.array as Float32Array
        let i = 0
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            const y = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50
            posArr[i * 3 + 1] = y
            if (gposArr[i * 3 + 1] > -9999) gposArr[i * 3 + 1] = y
            i++
          }
        }
        geometry.attributes.position.needsUpdate = true
        glowGeometry.attributes.position.needsUpdate = true
        renderer.render(scene, camera)
        count += 0.024
      }

      function handleResize() {
        const w = container.offsetWidth || window.innerWidth
        const h = container.offsetHeight || window.innerHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }

      window.addEventListener('resize', handleResize, { passive: true })

      if (prefersReducedMotion) {
        const posArr = geometry.attributes.position.array as Float32Array
        let i = 0
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            posArr[i * 3 + 1] = Math.sin(ix * 0.3) * 50 + Math.sin(iy * 0.5) * 50
            i++
          }
        }
        geometry.attributes.position.needsUpdate = true
        renderer.render(scene, camera)
      } else {
        animate()
      }

      cleanupFn = () => {
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(animationId)
        renderer.domElement.remove()
        dotTexture.dispose()
      }
    }

    init(container)

    return () => {
      cancelled = true
      cleanupFn?.()
    }
  }, [violetRatio, orangeRatio])

  return (
    <div
      ref={containerRef}
      data-testid="dotted-surface"
      aria-hidden="true"
      className={`overflow-hidden ${className}`}
    />
  )
}
