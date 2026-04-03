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
      // Bail out silently if WebGL is unavailable (headless, privacy browsers, some iOS)
      const probe = document.createElement('canvas')
      if (!probe.getContext('webgl2') && !probe.getContext('webgl')) return

      const THREE = await import('three')
      if (cancelled) return

      const SEPARATION = 150
      const AMOUNTX = 40
      const AMOUNTY = 60
      const SHUFFLE_INTERVAL = 4500
      const FADE_SPEED = 0.028
      const BREATH_SPEED = 2.2
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Circular dot - solid center, smooth falloff
      function createDotTexture() {
        const size = 64
        const c = size / 2
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')!
        const g = ctx.createRadialGradient(c, c, 0, c, c, c)
        g.addColorStop(0,   'rgba(255,255,255,1)')
        g.addColorStop(0.4, 'rgba(255,255,255,0.95)')
        g.addColorStop(0.7, 'rgba(255,255,255,0.35)')
        g.addColorStop(1,   'rgba(255,255,255,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, size, size)
        return new THREE.CanvasTexture(canvas)
      }

      // 4-pointed diffraction cross - gradient in LOCAL space after rotate (fix for all 4 directions)
      function createSpikesTexture() {
        const size = 128
        const c = size / 2
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')!

        // Center soft glow
        const cg = ctx.createRadialGradient(c, c, 0, c, c, c * 0.2)
        cg.addColorStop(0, 'rgba(255,255,255,0.85)')
        cg.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = cg
        ctx.fillRect(0, 0, size, size)

        const len       = c * 0.92
        const halfWidth = c * 0.065
        const angles    = [0, Math.PI, Math.PI / 2, -Math.PI / 2]

        for (const angle of angles) {
          ctx.save()
          ctx.translate(c, c)
          ctx.rotate(angle)

          // Gradient in LOCAL space: from origin toward tip (+x direction)
          const sg = ctx.createLinearGradient(0, 0, len, 0)
          sg.addColorStop(0,    'rgba(255,255,255,0.88)')
          sg.addColorStop(0.25, 'rgba(255,255,255,0.55)')
          sg.addColorStop(0.6,  'rgba(255,255,255,0.18)')
          sg.addColorStop(1,    'rgba(255,255,255,0)')

          ctx.beginPath()
          ctx.moveTo(0, -halfWidth)
          ctx.quadraticCurveTo(len * 0.45, -halfWidth * 0.1, len, 0)
          ctx.quadraticCurveTo(len * 0.45,  halfWidth * 0.1, 0, halfWidth)
          ctx.closePath()
          ctx.fillStyle = sg
          ctx.fill()
          ctx.restore()
        }

        return new THREE.CanvasTexture(canvas)
      }

      const dotTexture    = createDotTexture()
      const spikesTexture = createSpikesTexture()

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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
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

      // Base dot layer
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

      // Small spikes layer - always on for colored dots (base cross, size 75)
      const spikeGeometry = new THREE.BufferGeometry()
      spikeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(positions.length), 3))
      spikeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(colors.length), 3))

      const spikeMaterial = new THREE.PointsMaterial({
        size: 75,
        vertexColors: true,
        transparent: true,
        opacity: 0.50,
        sizeAttenuation: true,
        depthWrite: false,
        map: spikesTexture,
        alphaTest: 0.003,
      })
      const spikePoints = new THREE.Points(spikeGeometry, spikeMaterial)
      scene.add(spikePoints)

      // Pulse spikes layer - only fires at peak breath, larger size (size 160)
      const pulseGeometry = new THREE.BufferGeometry()
      pulseGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(positions.length), 3))
      pulseGeometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(colors.length), 3))

      const pulseMaterial = new THREE.PointsMaterial({
        size: 160,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        sizeAttenuation: true,
        depthWrite: false,
        map: spikesTexture,
        alphaTest: 0.003,
      })
      const pulsePoints = new THREE.Points(pulseGeometry, pulseMaterial)
      scene.add(pulsePoints)

      // Per-point state
      const pointType    = new Uint8Array(totalPoints)
      const pointT       = new Float32Array(totalPoints)
      const pointPhase   = new Float32Array(totalPoints)
      const pointExiting = new Uint8Array(totalPoints)

      // Brand colors
      const VR = 0.55, VG = 0.22, VB = 1.0   // violet
      const OR = 1.0,  OG = 0.48, OB = 0.0   // orange
      const GRAY = 0.48

      for (let i = 0; i < totalPoints; i++) {
        pointPhase[i] = Math.random() * Math.PI * 2
      }

      function assignNewColors() {
        for (let idx = 0; idx < totalPoints; idx++) {
          const rand = Math.random()
          const next: number = rand < violetRatio ? 1 : rand < violetRatio + orangeRatio ? 2 : 0
          const curr = pointType[idx]
          if (next === 0) {
            if (curr !== 0 && !pointExiting[idx]) pointExiting[idx] = 1
          } else {
            if (pointExiting[idx]) { pointType[idx] = next; pointExiting[idx] = 0 }
            else if (curr === 0)   { pointType[idx] = next; pointT[idx] = 0 }
            else                   { pointType[idx] = next }
          }
        }
      }

      function updateColors(time: number) {
        const col   = geometry.attributes.color.array as Float32Array
        const scol  = spikeGeometry.attributes.color.array as Float32Array
        const spos  = spikeGeometry.attributes.position.array as Float32Array
        const pcol  = pulseGeometry.attributes.color.array as Float32Array
        const ppos  = pulseGeometry.attributes.position.array as Float32Array
        const pos   = geometry.attributes.position.array as Float32Array

        for (let idx = 0; idx < totalPoints; idx++) {
          const j    = idx * 3
          const type = pointType[idx]

          if (type === 0 && !pointExiting[idx]) {
            if (pointT[idx] > 0) pointT[idx] = Math.max(pointT[idx] - FADE_SPEED, 0)
            if (pointT[idx] === 0) {
              col[j] = col[j + 1] = col[j + 2] = GRAY
              scol[j] = scol[j + 1] = scol[j + 2] = 0
              spos[j] = 0; spos[j + 1] = -99999; spos[j + 2] = 0
              pcol[j] = pcol[j + 1] = pcol[j + 2] = 0
              ppos[j] = 0; ppos[j + 1] = -99999; ppos[j + 2] = 0
              continue
            }
          }

          if (pointExiting[idx]) {
            pointT[idx] = Math.max(pointT[idx] - FADE_SPEED, 0)
            if (pointT[idx] <= 0) {
              pointExiting[idx] = 0; pointType[idx] = 0
              col[j] = col[j + 1] = col[j + 2] = GRAY
              scol[j] = scol[j + 1] = scol[j + 2] = 0
              spos[j] = 0; spos[j + 1] = -99999; spos[j + 2] = 0
              pcol[j] = pcol[j + 1] = pcol[j + 2] = 0
              ppos[j] = 0; ppos[j + 1] = -99999; ppos[j + 2] = 0
              continue
            }
          } else {
            if (pointT[idx] < 1) pointT[idx] = Math.min(pointT[idx] + FADE_SPEED, 1)
          }

          const t = pointT[idx]
          const breath = 0.5 + 0.5 * Math.sin(time * BREATH_SPEED + pointPhase[idx])

          const cr = type === 1 ? VR : OR
          const cg = type === 1 ? VG : OG
          const cb = type === 1 ? VB : OB

          // Main dot color
          const finalR = cr + (1.0 - cr) * breath * 0.65
          const finalG = cg + (1.0 - cg) * breath * 0.65
          const finalB = cb + (1.0 - cb) * breath * 0.65
          col[j]     = GRAY + (finalR - GRAY) * t
          col[j + 1] = GRAY + (finalG - GRAY) * t
          col[j + 2] = GRAY + (finalB - GRAY) * t

          // Small spikes - always present, slightly dimmer at low breath
          const spikeStr = (0.5 + breath * 0.5) * t
          scol[j]     = cr * spikeStr
          scol[j + 1] = cg * spikeStr
          scol[j + 2] = cb * spikeStr
          spos[j]     = pos[j]
          spos[j + 1] = pos[j + 1]
          spos[j + 2] = pos[j + 2]

          // Pulse spikes - only appear in the top 40% of breath cycle (grow → peak → shrink)
          const pulse = Math.max(0, (breath - 0.6) / 0.4) * t
          if (pulse > 0.02) {
            pcol[j]     = cr * pulse * 0.9
            pcol[j + 1] = cg * pulse * 0.9
            pcol[j + 2] = cb * pulse * 0.9
            ppos[j]     = pos[j]
            ppos[j + 1] = pos[j + 1]
            ppos[j + 2] = pos[j + 2]
          } else {
            pcol[j] = pcol[j + 1] = pcol[j + 2] = 0
            ppos[j] = 0; ppos[j + 1] = -99999; ppos[j + 2] = 0
          }
        }
        geometry.attributes.color.needsUpdate = true
        spikeGeometry.attributes.color.needsUpdate = true
        spikeGeometry.attributes.position.needsUpdate = true
        pulseGeometry.attributes.color.needsUpdate = true
        pulseGeometry.attributes.position.needsUpdate = true
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
        const sposArr = spikeGeometry.attributes.position.array as Float32Array
        const pposArr = pulseGeometry.attributes.position.array as Float32Array
        let i = 0
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            const y = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50
            posArr[i * 3 + 1] = y
            if (sposArr[i * 3 + 1] > -9999) sposArr[i * 3 + 1] = y
            if (pposArr[i * 3 + 1] > -9999) pposArr[i * 3 + 1] = y
            i++
          }
        }
        geometry.attributes.position.needsUpdate = true
        spikeGeometry.attributes.position.needsUpdate = true
        pulseGeometry.attributes.position.needsUpdate = true
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
        spikesTexture.dispose()
      }
    }

    // Wait 1.5 s before starting Three.js — keeps main thread free during LCP/FID
    // but still loads dots at a perceptually fast moment (FCP ~1.5 s).
    // Three.js import + init takes ~400 ms on desktop, so dots appear ~2-2.5 s after load.
    const ric = (window as any).requestIdleCallback
      ?? ((cb: () => void) => setTimeout(cb, 200))

    let ricId: ReturnType<typeof setTimeout>
    const delayId = setTimeout(() => {
      ricId = ric(() => { if (!cancelled) init(container) }, { timeout: 2000 })
    }, 1500)

    return () => {
      cancelled = true
      clearTimeout(delayId)
      clearTimeout(ricId)
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
