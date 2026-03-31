'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MAIN_LINKS = [
  { label: 'Agence Digitale', href: '/agence-digitale' },
  { label: 'Intelligence Artificielle', href: '/intelligence-artificielle' },
  { label: 'Formation', href: '/formation-entreprise' },
]

const SECONDARY_LINKS = [
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Blog', href: '/blog' },
]

export function Navigation() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav className="flex items-center gap-1" aria-label="Navigation principale">
      {MAIN_LINKS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          aria-current={isActive(href) ? 'page' : undefined}
          className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-colors duration-[150ms] hover-grad-text ${
            isActive(href) ? 'grad-text' : 'text-text-secondary hover:text-white'
          }`}
        >
          {label}
        </Link>
      ))}

      <div className="w-px h-4 bg-border mx-1" aria-hidden="true" />

      {SECONDARY_LINKS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          aria-current={isActive(href) ? 'page' : undefined}
          className={`px-3 py-2 text-[13px] rounded-lg transition-colors duration-[150ms] ${
            isActive(href) ? 'text-violet-light' : 'text-text-muted hover:text-white'
          }`}
        >
          {label}
        </Link>
      ))}

      <Link
        href="/contact"
        className="ml-3 px-[22px] py-[11px] text-[13px] font-semibold bg-white text-black rounded-[8px] hover:bg-gray-100 transition-all duration-[150ms] hover:-translate-y-px active:translate-y-0"
      >
        Contact
      </Link>
    </nav>
  )
}
