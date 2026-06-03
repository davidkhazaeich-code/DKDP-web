'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, Check } from 'lucide-react'
import { detectLocaleFromPath, type Locale } from '@/i18n/config'
import { FR_TO_EN, stripLocale, hasTranslation } from '@/i18n/slugs'

/**
 * Switcher FR <-> EN en mode dropdown compact.
 *
 * Affiche uniquement la locale courante + un chevron (~50px de large).
 * Au clic, un menu deroulant montre les deux options.
 *
 * Logique de navigation :
 * - Lit le path courant via usePathname
 * - Detecte la locale (FR par defaut, EN si /en/* prefix)
 * - Construit le path equivalent via FR_TO_EN
 * - Si la page courante n'a pas de version traduite, fallback sur la home
 *   de la langue cible
 */
export function LanguageSwitcher({
  compact = false,
  onNavigate,
  placement = 'bottom',
}: {
  compact?: boolean
  onNavigate?: () => void
  /** Direction d'ouverture du dropdown. 'top' utile en pied de page. */
  placement?: 'bottom' | 'top'
} = {}) {
  const pathname = usePathname() ?? '/'
  const router = useRouter()
  const currentLocale: Locale = detectLocaleFromPath(pathname)
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const firstOptionRef = React.useRef<HTMLButtonElement>(null)

  // Fermer au clic exterieur
  React.useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Focus la premiere option a l'ouverture
  React.useEffect(() => {
    if (open) {
      firstOptionRef.current?.focus()
    }
  }, [open])

  function swap(target: Locale) {
    setOpen(false)
    if (target === currentLocale) return
    let nextPath: string
    if (currentLocale === 'fr') {
      const enSlug = FR_TO_EN[pathname]
      if (enSlug !== undefined) {
        nextPath = enSlug === '/' ? '/en' : `/en${enSlug}`
      } else {
        nextPath = '/en'
      }
    } else {
      const frPath = stripLocale(pathname)
      nextPath = hasTranslation(frPath) ? frPath : '/'
    }
    onNavigate?.()
    router.push(nextPath)
  }

  const sizeClasses = compact
    ? 'h-9 px-2 text-[11.5px] gap-1'
    : 'h-9 px-2.5 text-[12px] gap-1.5'

  const ariaLabel = currentLocale === 'en' ? 'Change language' : 'Changer de langue'

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className={`inline-flex items-center rounded-lg border border-border bg-[var(--surface-default)] font-bold uppercase tracking-wider text-text transition-colors hover:bg-[var(--bg-card)] ${sizeClasses}`}
      >
        <span>{currentLocale === 'fr' ? 'FR' : 'EN'}</span>
        <ChevronDown
          size={12}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className={`absolute right-0 z-50 min-w-[140px] rounded-lg border border-border shadow-lg overflow-hidden ${
            placement === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          }`}
          style={{ background: 'var(--bg-card)' }}
        >
          <button
            ref={firstOptionRef}
            type="button"
            role="option"
            aria-selected={currentLocale === 'fr'}
            onClick={() => swap('fr')}
            className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-[13px] font-semibold transition-colors ${
              currentLocale === 'fr'
                ? 'text-text bg-[var(--surface-default)]'
                : 'text-text-secondary hover:bg-[var(--surface-default)] hover:text-text'
            }`}
          >
            <span>Francais</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold opacity-60">FR</span>
              {currentLocale === 'fr' && <Check size={13} className="text-violet-light" />}
            </span>
          </button>
          <button
            type="button"
            role="option"
            aria-selected={currentLocale === 'en'}
            onClick={() => swap('en')}
            className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-[13px] font-semibold transition-colors border-t border-border ${
              currentLocale === 'en'
                ? 'text-text bg-[var(--surface-default)]'
                : 'text-text-secondary hover:bg-[var(--surface-default)] hover:text-text'
            }`}
          >
            <span>English</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold opacity-60">EN</span>
              {currentLocale === 'en' && <Check size={13} className="text-violet-light" />}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
