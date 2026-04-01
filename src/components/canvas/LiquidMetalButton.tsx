'use client'

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
  const commonProps = {
    className: [
      'inline-flex items-center justify-center gap-2 overflow-hidden',
      'rounded-[8px] font-semibold',
      'transition-transform duration-[150ms] hover:-translate-y-px active:translate-y-0 active:scale-[0.98]',
      'liquid-metal-btn',
      sizeClasses[size],
      className,
    ].join(' '),
  }

  if (href) {
    return <Link href={href} {...commonProps}>{children}</Link>
  }

  return (
    <button type="button" onClick={onClick} {...commonProps}>
      {children}
    </button>
  )
}
