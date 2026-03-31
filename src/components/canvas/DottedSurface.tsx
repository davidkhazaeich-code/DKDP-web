'use client'

import { useEffect, useRef } from 'react'

interface DottedSurfaceProps {
  className?: string
  violetRatio?: number
  orangeRatio?: number
}

export function DottedSurface({
  className = '',
  violetRatio = 0.08,
  orangeRatio = 0.03,
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
      const TRANSITION_SPEED = 0.015
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

      const material = new THREE.PointsMaterial({ size: 10, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true })
      const points = new THREE.Points(geometry, material)
      scene.add(points)

      const glowGeometry = new THREE.BufferGeometry()
      glowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(positions.length), 3))
      glowGeometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(colors.length), 3))

      const glowMaterial = new THREE.PointsMaterial({ size: 28, vertexColors: true, transparent: true, opacity: 0.5, sizeAttenuation: true, depthWrite: false })
      const glowPoints = new THREE.Points(glowGeometry, glowMaterial)
      scene.add(glowPoints)

      const totalPoints = AMOUNTX * AMOUNTY
      const pointType = new Uint8Array(totalPoints)
      const pointTransition = new Float32Array(totalPoints)
      const TRANSITION_SPD = TRANSITION_SPEED

      // violet vivid
      const VR = 0.55, VG = 0.28, VB = 1.0, VGR = 0.6, VGG = 0.25, VGB = 1.0
      // orange vivid
      const OR = 1.0, OG = 0.42, OB = 0.0, OGR = 1.0, OGG = 0.38, OGB = 0.0
      // white (start of transition)
      const WR = 1.0, WG = 1.0, WB = 1.0
      // grey neutral
      const GR = 0.78

      function assignNewColors() {
        for (let idx = 0; idx < totalPoints; idx++) {
          const rand = Math.random()
          const prev = pointType[idx]
          pointType[idx] = rand < violetRatio ? 1 : rand < violetRatio + orangeRatio ? 2 : 0
          if (pointType[idx] !== prev && pointType[idx] !== 0) pointTransition[idx] = 0
        }
      }

      function updateColors() {
        const col = geometry.attributes.color.array as Float32Array
        const gcol = glowGeometry.attributes.color.array as Float32Array
        const gpos = glowGeometry.attributes.position.array as Float32Array
        const pos = geometry.attributes.position.array as Float32Array

        for (let idx = 0; idx < totalPoints; idx++) {
          const j = idx * 3
          const t = pointTransition[idx]
          const type = pointType[idx]

          if (type === 1) {
            if (t < 1) pointTransition[idx] = Math.min(t + TRANSITION_SPD, 1)
            const p = pointTransition[idx]
            col[j] = WR + (VR - WR) * p; col[j+1] = WG + (VG - WG) * p; col[j+2] = WB + (VB - WB) * p
            gcol[j] = VGR * p; gcol[j+1] = VGG * p; gcol[j+2] = VGB * p
            gpos[j] = pos[j]; gpos[j+1] = pos[j+1]; gpos[j+2] = pos[j+2]
          } else if (type === 2) {
            if (t < 1) pointTransition[idx] = Math.min(t + TRANSITION_SPD, 1)
            const p = pointTransition[idx]
            col[j] = WR + (OR - WR) * p; col[j+1] = WG + (OG - WG) * p; col[j+2] = WB + (OB - WB) * p
            gcol[j] = OGR * p; gcol[j+1] = OGG * p; gcol[j+2] = OGB * p
            gpos[j] = pos[j]; gpos[j+1] = pos[j+1]; gpos[j+2] = pos[j+2]
          } else {
            col[j] = col[j+1] = col[j+2] = GR
            gcol[j] = gcol[j+1] = gcol[j+2] = 0
            gpos[j] = 0; gpos[j+1] = -99999; gpos[j+2] = 0
            pointTransition[idx] = 1
          }
        }
        geometry.attributes.color.needsUpdate = true
        glowGeometry.attributes.color.needsUpdate = true
        glowGeometry.attributes.position.needsUpdate = true
      }

      assignNewColors()
      pointTransition.fill(1)
      updateColors()

      let count = 0
      let lastShuffle = 0

      function animate() {
        animationId = requestAnimationFrame(animate)
        const now = performance.now()
        if (now - lastShuffle > SHUFFLE_INTERVAL) { assignNewColors(); lastShuffle = now }
        updateColors()

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
