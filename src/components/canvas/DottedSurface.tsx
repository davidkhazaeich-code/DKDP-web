'use client'

import { useEffect, useRef } from 'react'

interface DottedSurfaceProps {
  className?: string
  violetRatio?: number
  orangeRatio?: number
}

export function DottedSurface({
  className = '',
  violetRatio = 0.04,
  orangeRatio = 0.015,
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
      const SHUFFLE_INTERVAL = 4000
      const TRANSITION_SPEED = 0.018
      const BREATH_SPEED = 1.0 // radians per second — controls breathing cadence
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
        gradient.addColorStop(0.7, 'rgba(255,255,255,0.4)')
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
        size: 52,
        vertexColors: true,
        transparent: true,
        opacity: 0.40,
        sizeAttenuation: true,
        depthWrite: false,
        map: dotTexture,
        alphaTest: 0.005,
      })
      const glowPoints = new THREE.Points(glowGeometry, glowMaterial)
      scene.add(glowPoints)

      // Per-point state
      const pointType = new Uint8Array(totalPoints)       // 0=neutral, 1=violet, 2=orange
      const pointTransition = new Float32Array(totalPoints) // 0→1 fade-in when activating
      const pointPhase = new Float32Array(totalPoints)     // random phase offset for breathing

      // Violet brand color — boosted to near-full saturation
      const VR = 0.55, VG = 0.22, VB = 1.0
      // Orange brand color — full saturation
      const OR = 1.0, OG = 0.48, OB = 0.0
      // Neutral gray — kept very dim so colored dots stand out sharply
      const GRAY = 0.32

      // Random breathing phases so each dot is out of sync
      for (let i = 0; i < totalPoints; i++) {
        pointPhase[i] = Math.random() * Math.PI * 2
      }

      function assignNewColors() {
        for (let idx = 0; idx < totalPoints; idx++) {
          const rand = Math.random()
          const prev = pointType[idx]
          const next = rand < violetRatio ? 1 : rand < violetRatio + orangeRatio ? 2 : 0
          pointType[idx] = next
          if (next !== prev && next !== 0) pointTransition[idx] = 0
        }
      }

      function updateColors(time: number) {
        const col = geometry.attributes.color.array as Float32Array
        const gcol = glowGeometry.attributes.color.array as Float32Array
        const gpos = glowGeometry.attributes.position.array as Float32Array
        const pos = geometry.attributes.position.array as Float32Array

        for (let idx = 0; idx < totalPoints; idx++) {
          const j = idx * 3
          const type = pointType[idx]

          if (type === 0) {
            // Neutral gray dot
            col[j] = col[j + 1] = col[j + 2] = GRAY
            gcol[j] = gcol[j + 1] = gcol[j + 2] = 0
            gpos[j] = 0; gpos[j + 1] = -99999; gpos[j + 2] = 0
          } else {
            // Entry fade-in
            if (pointTransition[idx] < 1) pointTransition[idx] = Math.min(pointTransition[idx] + TRANSITION_SPEED, 1)
            const t = pointTransition[idx]

            // Breathing: oscillate between target color and near-white
            // breath=0 → full target color, breath=1 → near-white
            const breath = 0.5 + 0.5 * Math.sin(time * BREATH_SPEED + pointPhase[idx])

            const cr = type === 1 ? VR : OR
            const cg = type === 1 ? VG : OG
            const cb = type === 1 ? VB : OB

            // Breathing: pulse between full color and a slightly brightened version
            // Max 45% toward white so the color stays vivid throughout
            const finalR = cr + (1.0 - cr) * breath * 0.45
            const finalG = cg + (1.0 - cg) * breath * 0.45
            const finalB = cb + (1.0 - cb) * breath * 0.45

            // Apply entry fade from gray to animated color
            col[j] = GRAY + (finalR - GRAY) * t
            col[j + 1] = GRAY + (finalG - GRAY) * t
            col[j + 2] = GRAY + (finalB - GRAY) * t

            // Glow is very strong — full intensity at color peak, still 55% at white peak
            const glowStrength = (1.0 - breath * 0.35) * t
            gcol[j] = cr * glowStrength
            gcol[j + 1] = cg * glowStrength
            gcol[j + 2] = cb * glowStrength
            gpos[j] = pos[j]; gpos[j + 1] = pos[j + 1]; gpos[j + 2] = pos[j + 2]
          }
        }
        geometry.attributes.color.needsUpdate = true
        glowGeometry.attributes.color.needsUpdate = true
        glowGeometry.attributes.position.needsUpdate = true
      }

      assignNewColors()
      for (let i = 0; i < totalPoints; i++) {
        if (pointType[i] !== 0) pointTransition[i] = 1
      }
      updateColors(0)

      let count = 0
      let lastShuffle = 0

      function animate() {
        animationId = requestAnimationFrame(animate)
        const now = performance.now()
        if (now - lastShuffle > SHUFFLE_INTERVAL) { assignNewColors(); lastShuffle = now }
        updateColors(now / 1000)

        const posArr = geometry.attributes.position.array as Float32Array
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
