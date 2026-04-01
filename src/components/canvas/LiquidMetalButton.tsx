'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface LiquidMetalButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  size?: 'md' | 'lg'
  className?: string
}

const sizeMap = {
  md: { px: 22, py: 11, fontSize: '13px' },
  lg: { px: 28, py: 14, fontSize: '14px' },
}

export function LiquidMetalButton({
  children,
  href,
  onClick,
  size = 'lg',
  className = '',
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  const shaderRef = useRef<HTMLDivElement>(null)
  const shaderMount = useRef<{ setSpeed?: (s: number) => void; destroy?: () => void } | null>(null)
  const isHoveredRef = useRef(false)
  const rippleId = useRef(0)

  useEffect(() => {
    async function initShader() {
      try {
        const { liquidMetalFragmentShader, ShaderMount } = await import('@paper-design/shaders')
        if (!shaderRef.current) return
        shaderMount.current?.destroy?.()
        shaderMount.current = new ShaderMount(
          shaderRef.current,
          liquidMetalFragmentShader,
          {
            u_repetition: 4,
            u_softness: 0.5,
            u_shiftRed: 0.45,   // warm orange tint in the metal reflections
            u_shiftBlue: 0.12,  // reduce blue for warmer chrome
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_scale: 8,
            u_shape: 1,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
          },
          undefined,
          0.6
        ) as { setSpeed?: (s: number) => void; destroy?: () => void }
      } catch (e) {
        console.warn('LiquidMetalButton shader init failed', e)
      }
    }
    initShader()
    return () => { shaderMount.current?.destroy?.(); shaderMount.current = null }
  }, [])

  const handleMouseEnter = () => {
    isHoveredRef.current = true
    setIsHovered(true)
    shaderMount.current?.setSpeed?.(1)
  }
  const handleMouseLeave = () => {
    isHoveredRef.current = false
    setIsHovered(false)
    setIsPressed(false)
    shaderMount.current?.setSpeed?.(0.6)
  }
  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)

  function handleClick(e: React.MouseEvent) {
    shaderMount.current?.setSpeed?.(2.4)
    setTimeout(() => shaderMount.current?.setSpeed?.(isHoveredRef.current ? 1 : 0.6), 300)

    const rect = e.currentTarget.getBoundingClientRect()
    const id = rippleId.current++
    setRipples(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600)
    onClick?.()
  }

  const s = sizeMap[size]
  const radius = '100px'

  const shadow = isPressed
    ? '0 0 0 1px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)'
    : isHovered
      ? '0 0 0 1px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.15)'
      : '0 0 0 1px rgba(0,0,0,0.35), 0 20px 12px rgba(0,0,0,0.08), 0 9px 9px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.15)'

  const transform = isPressed
    ? 'translateY(1px) scale(0.98)'
    : isHovered
      ? 'translateY(-1px)'
      : 'none'

  const interactionHandlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onClick: handleClick,
  }

  // Inner visual layers rendered inside the interactive element
  const visualContent = (
    <>
      {/* Shader chrome background */}
      <div
        ref={shaderRef}
        data-testid="shader-mount"
        className="lmb-shader"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Dark pill surface — sits 2px inset from chrome edge, creating a visible metal ring */}
      <div
        style={{
          position: 'absolute',
          inset: 2,
          borderRadius: radius,
          background: isPressed
            ? 'linear-gradient(180deg, #0e0e0e 0%, #080808 100%)'
            : 'linear-gradient(180deg, #1c1c1e 0%, #0A0A0A 100%)',
          boxShadow: isPressed ? 'inset 0 2px 4px rgba(0,0,0,0.5)' : 'none',
          transition: 'background 0.15s, box-shadow 0.15s',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Label — sits above the dark pill */}
      <span
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: `${s.py}px ${s.px}px`,
          fontSize: s.fontSize,
          fontWeight: 600,
          color: 'rgba(210, 210, 210, 0.92)',
          textShadow: '0 1px 2px rgba(0,0,0,0.7)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          transition: 'color 0.15s',
        }}
      >
        {children}
      </span>

      {/* Click ripples */}
      {ripples.map(r => (
        <span
          key={r.id}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)',
            pointerEvents: 'none',
            animation: 'lmb-ripple 0.6s ease-out',
          }}
        />
      ))}
    </>
  )

  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: radius,
    overflow: 'hidden',
    boxShadow: shadow,
    transform,
    transition: 'box-shadow 0.15s cubic-bezier(0.4,0,0.2,1), transform 0.15s cubic-bezier(0.4,0,0.2,1)',
    cursor: 'pointer',
    userSelect: 'none',
  }

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={{ ...wrapperStyle, textDecoration: 'none' }}
        {...interactionHandlers}
      >
        {visualContent}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={className}
      style={{ ...wrapperStyle, border: 'none', padding: 0, background: 'transparent' }}
      {...interactionHandlers}
    >
      {visualContent}
    </button>
  )
}
