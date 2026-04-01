'use client'

import { useId } from 'react'
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
  // Unique IDs per instance — prevents filter collision when multiple buttons are on the page
  const uid = useId().replace(/:/g, '')
  const f1 = `gb1-${uid}` // strong alpha boost × 9 → hard outer glow
  const f2 = `gb2-${uid}` // medium alpha boost × 3 → mid glow ring
  const f3 = `gb3-${uid}` // soft boost × 2 + RGB tint → inner rim

  const glowContent = (
    <>
      {/* SVG filter definitions */}
      <svg aria-hidden="true" className="absolute w-0 h-0 overflow-hidden">
        <defs>
          <filter id={f1} width="300%" x="-100%" height="300%" y="-100%">
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 9 0" />
          </filter>
          <filter id={f2} width="300%" x="-100%" height="300%" y="-100%">
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 0" />
          </filter>
          <filter id={f3} width="300%" x="-100%" height="300%" y="-100%">
            <feColorMatrix values="1 0 0 0.2 0  0 1 0 0.2 0  0 0 1 0.2 0  0 0 0 2 0" />
          </filter>
        </defs>
      </svg>

      {/* Outer diffuse glow — large blur + alpha filter */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-50 overflow-hidden rounded-[12px] transition-opacity duration-300 group-hover:opacity-80 group-active:opacity-100"
        style={{ filter: `blur(2em) url(#${f1})` }}
      >
        <div
          className="glow-spin"
          style={{ background: 'linear-gradient(90deg, #FF6B00 30%, transparent 50%, #7C3AED 70%)' }}
        />
      </div>

      {/* Mid focused ring — tight blur just outside the border */}
      <div
        aria-hidden="true"
        className="absolute inset-[-2px] -z-20 opacity-55 overflow-hidden rounded-[14px] transition-opacity duration-300 group-hover:opacity-85 group-active:opacity-100"
        style={{ filter: `blur(4px) url(#${f2})` }}
      >
        <div
          className="glow-spin"
          style={{ background: 'linear-gradient(90deg, #FF8C40 20%, transparent 45% 55%, #9F7AEA 80%)' }}
        />
      </div>

      {/* Dark button surface */}
      <div className="relative overflow-hidden rounded-[12px] bg-[#111215] border border-white/5">
        {/* Inner rim glow — very tight blur on the border edge */}
        <div
          aria-hidden="true"
          className="absolute inset-[-2px] -z-10 opacity-40 overflow-hidden rounded-[inherit] transition-opacity duration-300 group-hover:opacity-70 group-active:opacity-100"
          style={{ filter: `blur(2px) url(#${f3})` }}
        >
          <div
            className="glow-spin"
            style={{ background: 'linear-gradient(90deg, #FFD4A0 30%, transparent 45% 55%, #C4B5FD 70%)' }}
          />
        </div>

        <span className={`relative z-10 flex items-center justify-center gap-2 font-semibold text-white ${sizeClasses[size]}`}>
          {children}
        </span>
      </div>
    </>
  )

  const wrapperClass = [
    'relative inline-block isolate group',
    'transition-transform duration-150 hover:-translate-y-px active:scale-[0.98]',
    className,
  ].join(' ')

  if (href) {
    return (
      <Link href={href} className={wrapperClass}>
        {glowContent}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={wrapperClass}>
      {glowContent}
    </button>
  )
}
