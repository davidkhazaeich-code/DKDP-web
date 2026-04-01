'use client'

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs))
}

interface GhostButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

export function GhostButton({ children, href, onClick, className }: GhostButtonProps) {
  const inner = (
    <>
      {/* Radial violet glow — idle: faint, hover: bright */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,rgba(124,58,237,0.85)_0%,rgba(167,139,250,0.25)_75%)] opacity-20 transition-opacity duration-500 group-hover:opacity-100" />
      </span>

      {/* Inner pill — dark bg creates the visible gradient border ring */}
      <div className="relative z-10 flex h-[44px] items-center rounded-full bg-[#0A0A0A] px-7 text-sm font-semibold text-white/75 ring-1 ring-white/[0.06] transition-colors duration-200 group-hover:text-white">
        {children}
      </div>

      {/* Bottom shimmer line */}
      <span className="absolute bottom-0 left-[18px] h-px w-[calc(100%-36px)] bg-gradient-to-r from-violet/0 via-[#A78BFA]/80 to-violet/0 opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
    </>
  )

  const base = cn(
    // Outer wrapper bg = the visible border ring (violet gradient top → bottom)
    'group relative inline-block cursor-pointer rounded-full border-none p-0.5 no-underline outline-none',
    'bg-gradient-to-b from-[rgba(124,58,237,0.65)] to-[rgba(124,58,237,0.20)]',
    'focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]',
    className
  )

  if (href) {
    return (
      <Link href={href} className={base}>
        {inner}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {inner}
    </button>
  )
}
