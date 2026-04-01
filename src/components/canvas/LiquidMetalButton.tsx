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
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const wrapperRef = useRef<HTMLDivElement>(null)
  const LiquidMetalRef = useRef<React.ComponentType<Record<string, unknown>> | null>(null)
  const [shaderLoaded, setShaderLoaded] = useState(false)
  const rippleId = useRef(0)
  const s = sizeMap[size]
  const radius = '100px'

  // Measure actual button dimensions
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      setDims({ w: el.offsetWidth, h: el.offsetHeight })
    })
    ro.observe(el)
    setDims({ w: el.offsetWidth, h: el.offsetHeight })
    return () => ro.disconnect()
  }, [])

  // Lazy-load the React shader component
  useEffect(() => {
    import('@paper-design/shaders-react').then((mod) => {
      LiquidMetalRef.current = mod.LiquidMetal as React.ComponentType<Record<string, unknown>>
      setShaderLoaded(true)
    }).catch(() => {})
  }, [])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => { setIsHovered(false); setIsPressed(false) }
  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)

  function handleClick(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect()
    const id = rippleId.current++
    setRipples(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600)
    onClick?.()
  }

  const shadow = isPressed
    ? '0 0 0 1px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)'
    : isHovered
      ? '0 0 0 1px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.15)'
      : '0 0 0 1px rgba(0,0,0,0.35), 0 20px 12px rgba(0,0,0,0.08), 0 9px 9px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.15)'

  const transform = isPressed
    ? 'translateY(1px) scale(0.98)'
    : isHovered ? 'translateY(-1px)' : 'none'

  const interactionHandlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onClick: handleClick,
  }

  const LM = LiquidMetalRef.current

  const visualContent = (
    <>
      {/* Shader chrome — fixed pixel dimensions so canvas fills completely */}
      <div
        data-testid="shader-mount"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {shaderLoaded && LM && dims.w > 0 && (
          <LM
            style={{ width: `${dims.w}px`, height: `${dims.h}px`, display: 'block' }}
            speed={isPressed ? 2.4 : isHovered ? 1 : 0.6}
            shape="circle"
            repetition={4}
            softness={0.5}
            shiftRed={0.45}
            shiftBlue={0.12}
            distortion={0}
            contour={0}
            angle={45}
            scale={8}
            offsetX={0.1}
            offsetY={-0.1}
          />
        )}
      </div>

      {/* Dark pill — 2px inset creates visible metal ring */}
      <div
        aria-hidden="true"
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
      />

      {/* Label */}
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

      {/* Ripples */}
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
      <div ref={wrapperRef} style={{ display: 'inline-flex' }}>
        <Link
          href={href}
          className={className}
          style={{ ...wrapperStyle, textDecoration: 'none' }}
          {...interactionHandlers}
        >
          {visualContent}
        </Link>
      </div>
    )
  }

  return (
    <div ref={wrapperRef} style={{ display: 'inline-flex' }}>
      <button
        type="button"
        className={className}
        style={{ ...wrapperStyle, border: 'none', padding: 0, background: 'transparent' }}
        {...interactionHandlers}
      >
        {visualContent}
      </button>
    </div>
  )
}
