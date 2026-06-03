'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { detectLocaleFromPath, type Locale } from '@/i18n/config'
import { FR_TO_EN, stripLocale, hasTranslation } from '@/i18n/slugs'

/**
 * Switcher FR <-> EN.
 *
 * Logique :
 * - Lit le path courant via usePathname
 * - Detecte la locale (FR par defaut, EN si /en/* prefix)
 * - Construit le path equivalent dans l'autre langue via FR_TO_EN
 * - Si la page courante n'a pas de version traduite, fallback sur la home
 *   de la langue cible (l'utilisateur n'est jamais bloque sur un 404)
 */
export function LanguageSwitcher({
  compact = false,
  onNavigate,
}: {
  compact?: boolean
  onNavigate?: () => void
} = {}) {
  const pathname = usePathname() ?? '/'
  const router = useRouter()
  const currentLocale: Locale = detectLocaleFromPath(pathname)

  function swap(target: Locale) {
    if (target === currentLocale) return
    let nextPath: string
    if (currentLocale === 'fr') {
      // FR -> EN : utilise le mapping si dispo, sinon /en
      const enSlug = FR_TO_EN[pathname]
      if (enSlug !== undefined) {
        nextPath = enSlug === '/' ? '/en' : `/en${enSlug}`
      } else {
        nextPath = '/en'
      }
    } else {
      // EN -> FR : retire prefix + reverse map
      const frPath = stripLocale(pathname)
      nextPath = hasTranslation(frPath) ? frPath : '/'
    }
    onNavigate?.()
    router.push(nextPath)
  }

  const sizeClasses = compact
    ? 'h-9 px-1.5 text-[11.5px]'
    : 'h-9 px-2 text-[12px]'

  return (
    <div
      role="group"
      aria-label={currentLocale === 'en' ? 'Change language' : 'Changer de langue'}
      className={`inline-flex items-center gap-1 rounded-lg border border-border bg-[var(--surface-default)] shadow-[0_0_0_1px_var(--surface-border)] ${sizeClasses}`}
    >
      <button
        type="button"
        onClick={() => swap('fr')}
        aria-pressed={currentLocale === 'fr'}
        aria-label="Francais"
        className={`px-2.5 py-1 rounded-md font-bold uppercase tracking-wider transition-all ${
          currentLocale === 'fr'
            ? 'bg-[var(--bg-card)] text-text shadow-sm'
            : 'text-text-muted hover:text-text'
        }`}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => swap('en')}
        aria-pressed={currentLocale === 'en'}
        aria-label="English"
        className={`px-2.5 py-1 rounded-md font-bold uppercase tracking-wider transition-all ${
          currentLocale === 'en'
            ? 'bg-[var(--bg-card)] text-text shadow-sm'
            : 'text-text-muted hover:text-text'
        }`}
      >
        EN
      </button>
    </div>
  )
}
