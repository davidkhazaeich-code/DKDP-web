'use client'

import { useEffect, useRef } from 'react'

interface ParticleWavesProps {
  className?: string
  violetRatio?: number
  orangeRatio?: number
}

// Wave grid
const DENSITY = 50
const SEPARATION = 100
const SPEED = 0.06
const AMPLITUDE = 50

// Color breathing (same system as DottedSurface)
const SHUFFLE_INTERVAL = 4500
const FADE_SPEED = 0.028
const BREATH_SPEED = 2.2

// Brand colors (same as DottedSurface)
const VR = 0.55, VG = 0.22, VB = 1.0   // violet #a78bfa approx
const OR = 1.0,  OG = 0.48, OB = 0.0   // orange #FF8C00
const GRAY = 0.75

export function ParticleWaves({
  className = '',
  violetRatio = 0.025,
  orangeRatio = 0.004,
}: ParticleWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId: number
    let cleanupFn: (() => void) | undefined
    let cancelled = false

    async function init(container: HTMLDivElement) {
      // Bail out silently if WebGL is unavailable
      const probe = document.createElement('canvas')
      if (!probe.getContext('webgl2') && !probe.getContext('webgl')) return

      const THREE = await import('three')
      if (cancelled) return

      let waveCount = 0
      const mouse = { x: 0, y: 0 }
      const totalPoints = DENSITY * DENSITY

      // Dot texture (white circle, tinted via vertex color)
      function createDotTexture() {
        const size = 64
        const c = size / 2
        const cv = document.createElement('canvas')
        cv.width = size
        cv.height = size
        const ctx = cv.getContext('2d')!
        const g = ctx.createRadialGradient(c, c, 0, c, c, c)
        g.addColorStop(0, 'rgba(255,255,255,1)')
        g.addColorStop(0.4, 'rgba(255,255,255,0.95)')
        g.addColorStop(0.7, 'rgba(255,255,255,0.35)')
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, size, size)
        return new THREE.CanvasTexture(cv)
      }

      // Spikes texture (4-pointed cross for colored dots)
      function createSpikesTexture() {
        const size = 128
        const c = size / 2
        const cv = document.createElement('canvas')
        cv.width = size
        cv.height = size
        const ctx = cv.getContext('2d')!

        const cg = ctx.createRadialGradient(c, c, 0, c, c, c * 0.2)
        cg.addColorStop(0, 'rgba(255,255,255,0.85)')
        cg.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = cg
        ctx.fillRect(0, 0, size, size)

        const len = c * 0.92
        const halfWidth = c * 0.065
        for (const angle of [0, Math.PI, Math.PI / 2, -Math.PI / 2]) {
          ctx.save()
          ctx.translate(c, c)
          ctx.rotate(angle)
          const sg = ctx.createLinearGradient(0, 0, len, 0)
          sg.addColorStop(0, 'rgba(255,255,255,0.88)')
          sg.addColorStop(0.25, 'rgba(255,255,255,0.55)')
          sg.addColorStop(0.6, 'rgba(255,255,255,0.18)')
          sg.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.beginPath()
          ctx.moveTo(0, -halfWidth)
          ctx.quadraticCurveTo(len * 0.45, -halfWidth * 0.1, len, 0)
          ctx.quadraticCurveTo(len * 0.45, halfWidth * 0.1, 0, halfWidth)
          ctx.closePath()
          ctx.fillStyle = sg
          ctx.fill()
          ctx.restore()
        }
        return new THREE.CanvasTexture(cv)
      }

      const dotTexture = createDotTexture()
      const spikesTexture = createSpikesTexture()

      // Scene
      const scene = new THREE.Scene()

      const camera = new THREE.PerspectiveCamera(
        50,
        container.offsetWidth / container.offsetHeight,
        1,
        10000,
      )
      camera.position.z = 1000
      camera.position.y = 800

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(container.offsetWidth, container.offsetHeight)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      // Build position + color arrays
      const positions: number[] = []
      const colors: number[] = []
      for (let ix = 0; ix < DENSITY; ix++) {
        for (let iy = 0; iy < DENSITY; iy++) {
          positions.push(
            ix * SEPARATION - (DENSITY * SEPARATION) / 2,
            -400,
            iy * SEPARATION - (DENSITY * SEPARATION) / 2,
          )
          colors.push(GRAY, GRAY, GRAY)
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
      scene.add(new THREE.Points(geometry, material))

      // Spikes layer (small, always-on for colored dots)
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
      scene.add(new THREE.Points(spikeGeometry, spikeMaterial))

      // Pulse spikes layer (larger, only at breath peak)
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
      scene.add(new THREE.Points(pulseGeometry, pulseMaterial))

      // Per-point color state
      const pointType = new Uint8Array(totalPoints)
      const pointT = new Float32Array(totalPoints)
      const pointPhase = new Float32Array(totalPoints)
      const pointExiting = new Uint8Array(totalPoints)

      for (let i = 0; i < totalPoints; i++) {
        pointPhase[i] = Math.random() * Math.PI * 2
      }

      function assignNewColors() {
        for (let idx = 0; idx < totalPoints; idx++) {
          const rand = Math.random()
          const next = rand < violetRatio ? 1 : rand < violetRatio + orangeRatio ? 2 : 0
          const curr = pointType[idx]
          if (next === 0) {
            if (curr !== 0 && !pointExiting[idx]) pointExiting[idx] = 1
          } else {
            if (pointExiting[idx]) { pointType[idx] = next; pointExiting[idx] = 0 }
            else if (curr === 0) { pointType[idx] = next; pointT[idx] = 0 }
            else { pointType[idx] = next }
          }
        }
      }

      function updateColors(time: number) {
        const col = geometry.attributes.color.array as Float32Array
        const scol = spikeGeometry.attributes.color.array as Float32Array
        const spos = spikeGeometry.attributes.position.array as Float32Array
        const pcol = pulseGeometry.attributes.color.array as Float32Array
        const ppos = pulseGeometry.attributes.position.array as Float32Array
        const pos = geometry.attributes.position.array as Float32Array

        for (let idx = 0; idx < totalPoints; idx++) {
          const j = idx * 3
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

          const finalR = cr + (1.0 - cr) * breath * 0.65
          const finalG = cg + (1.0 - cg) * breath * 0.65
          const finalB = cb + (1.0 - cb) * breath * 0.65
          col[j] = GRAY + (finalR - GRAY) * t
          col[j + 1] = GRAY + (finalG - GRAY) * t
          col[j + 2] = GRAY + (finalB - GRAY) * t

          const spikeStr = (0.5 + breath * 0.5) * t
          scol[j] = cr * spikeStr
          scol[j + 1] = cg * spikeStr
          scol[j + 2] = cb * spikeStr
          spos[j] = pos[j]
          spos[j + 1] = pos[j + 1]
          spos[j + 2] = pos[j + 2]

          const pulse = Math.max(0, (breath - 0.6) / 0.4) * t
          if (pulse > 0.02) {
            pcol[j] = cr * pulse * 0.9
            pcol[j + 1] = cg * pulse * 0.9
            pcol[j + 2] = cb * pulse * 0.9
            ppos[j] = pos[j]
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

      let lastShuffle = 0

      function onMouseMove(e: MouseEvent) {
        mouse.x = e.clientX - window.innerWidth / 2
        mouse.y = e.clientY - window.innerHeight / 2
      }

      function onResize() {
        if (!container) return
        const w = container.offsetWidth
        const h = container.offsetHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }

      function animate() {
        animationId = requestAnimationFrame(animate)
        const now = performance.now()

        if (now - lastShuffle > SHUFFLE_INTERVAL) {
          assignNewColors()
          lastShuffle = now
        }
        updateColors(now / 1000)

        camera.position.x += (mouse.x - camera.position.x) * 0.05
        camera.position.y += (-mouse.y - camera.position.y) * 0.05
        camera.lookAt(scene.position)

        const posArr = geometry.attributes.position.array as Float32Array
        const sposArr = spikeGeometry.attributes.position.array as Float32Array
        const pposArr = pulseGeometry.attributes.position.array as Float32Array

        let i = 0
        for (let ix = 0; ix < DENSITY; ix++) {
          for (let iy = 0; iy < DENSITY; iy++) {
            const y = -400 +
              Math.sin((ix + waveCount) * 0.3) * AMPLITUDE +
              Math.sin((iy + waveCount) * 0.5) * AMPLITUDE
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
        waveCount += SPEED
      }

      document.addEventListener('mousemove', onMouseMove)
      window.addEventListener('resize', onResize, { passive: true })
      animate()

      cleanupFn = () => {
        cancelAnimationFrame(animationId)
        document.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        renderer.domElement.remove()
        dotTexture.dispose()
        spikesTexture.dispose()
        material.dispose()
        spikeMaterial.dispose()
        pulseMaterial.dispose()
        renderer.dispose()
      }
    }

    // Defer Three.js init to idle time
    const idleId = 'requestIdleCallback' in window
      ? (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(() => init(container), { timeout: 2000 })
      : (setTimeout(() => init(container), 200) as unknown as number)

    return () => {
      cancelled = true
      if ('cancelIdleCallback' in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId)
      } else {
        clearTimeout(idleId as unknown as ReturnType<typeof setTimeout>)
      }
      cleanupFn?.()
    }
  }, [violetRatio, orangeRatio])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`overflow-hidden ${className}`}
    />
  )
}
