'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Navigation } from './Navigation'

const ALL_LINKS = [
  { label: 'Agence Digitale', href: '/agence-digitale' },
  { label: 'Intelligence Artificielle', href: '/intelligence-artificielle' },
  { label: 'Formation', href: '/formation-entreprise' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Blog', href: '/blog' },
  { label: 'À propos', href: '/a-propos' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-bg/90 backdrop-blur-[20px] border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="DKDP - Accueil">
            <Image
              src="/images/logo/dkdp_blanc-croped.png"
              alt="DKDP"
              width={90}
              height={30}
              priority
            />
          </Link>

          {/* Desktop nav - hidden on mobile */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            aria-controls="mobile-menu"
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
          >
            <span
              className={`block w-6 h-[2px] bg-white transition-transform duration-200 origin-center ${
                mobileOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-white transition-opacity duration-200 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-white transition-transform duration-200 origin-center ${
                mobileOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-[20px] pt-14 md:hidden">
          <nav className="flex flex-col px-6 py-8 gap-2" aria-label="Navigation mobile">
            {ALL_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-lg font-medium text-white py-3 border-b border-border last:border-0 hover:text-violet-light transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-6 flex items-center justify-center px-[22px] py-3 bg-white text-black font-semibold rounded-full text-[15px] hover:bg-gray-100 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Réservez un appel →
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
