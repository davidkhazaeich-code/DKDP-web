'use client'

import Link from 'next/link'
import { CalendarCheck } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function MobileRDV() {
  const pathname = usePathname()
  if (pathname === '/contact') return null

  return (
    <Link
      href="/contact"
      className="fixed z-30 flex md:hidden items-center gap-2 px-5 font-bold text-[14px] rounded-full bg-text text-bg active:scale-[0.97] transition-transform"
      style={{
        bottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
        right: '16px',
        height: '48px',
        boxShadow: 'var(--shadow-card-md), var(--shadow-card-sm)',
      }}
    >
      <CalendarCheck size={15} />
      Prendre RDV
    </Link>
  )
}
