'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

interface LiquidMetalButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  size?: 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  md: 'px-[22px] py-[11px] text-[13px]',
  lg: 'px-7 py-3.5 text-sm',
}

export function LiquidMetalButton({
  children,
  href,
  onClick,
  size = 'lg',
  className = '',
}: LiquidMetalButtonProps) {
  const shaderRef = useRef<HTMLDivElement>(null)
  const mountRef = useRef<{ setSpeed?: (s: number) => void } | null>(null)

  useEffect(() => {
    const el = shaderRef.current
    if (!el) return

    let cancelled = false

    async function initShader() {
      try {
        const { liquidMetalFragmentShader, ShaderMount } = await import('@paper-design/shaders')
        if (cancelled) return
        mountRef.current = new ShaderMount(el!, liquidMetalFragmentShader, {
          u_repetition: 4, u_softness: 0.5,
          u_shiftRed: 0.3, u_shiftBlue: 0.3,
          u_distortion: 0, u_contour: 0,
          u_angle: 45, u_scale: 8, u_shape: 1,
          u_offsetX: 0.1, u_offsetY: -0.1,
        }, undefined, 0.6)
      } catch (e) {
        console.warn('LiquidMetalButton: shader init failed', e)
      }
    }

    initShader()
    return () => { cancelled = true }
  }, [])

  const handleMouseEnter = () => mountRef.current?.setSpeed?.(1)
  const handleMouseLeave = () => mountRef.current?.setSpeed?.(0.6)
  const handleMouseDown = () => {
    mountRef.current?.setSpeed?.(2.4)
    setTimeout(() => mountRef.current?.setSpeed?.(0.6), 300)
  }

  const commonProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    className: [
      'relative inline-flex items-center justify-center gap-2 overflow-hidden',
      'rounded-[8px] font-semibold text-white',
      'transition-transform duration-[150ms] hover:-translate-y-px active:translate-y-0 active:scale-[0.98]',
      sizeClasses[size],
      className,
    ].join(' '),
  }

  const content = (
    <>
      <div
        ref={shaderRef}
        data-testid="shader-mount"
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />
      {/* Orange overlay fallback — shows if shader fails */}
      <div className="absolute inset-0 z-0 bg-orange/60" />
      <span className="relative z-10">{children}</span>
    </>
  )

  if (href) {
    return <Link href={href} {...commonProps}>{content}</Link>
  }

  return (
    <button type="button" onClick={onClick} {...commonProps}>
      {content}
    </button>
  )
}
