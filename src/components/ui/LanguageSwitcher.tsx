'use client'

import { usePathname, useRouter } from 'next/navigation'
import { detectLocaleFromPath, type Locale } from '@/i18n/config'
import { FR_TO_EN, stripLocale, hasTranslation } from '@/i18n/slugs'

/**
 * Switcher FR <-> EN en segmented control (toggle).
 *
 * Les deux langues sont visibles cote a cote : la langue active est surlignee,
 * un seul tap sur l'autre bascule. Pas de menu deroulant : adapte au tactile
 * et au mobile (cible de tap large, aucune gestion de clic exterieur).
 *
 * Logique de navigation (inchangee) :
 * - Lit le path courant via usePathname, detecte la locale (FR defaut, EN si /en/*)
 * - Construit le path equivalent via FR_TO_EN / stripLocale
 * - Si la page n'a pas de version traduite, fallback sur la home de la langue cible
 */

const LOCALES: { code: Locale; label: string; full: string }[] = [
  { code: 'fr', label: 'FR', full: 'Francais' },
  { code: 'en', label: 'EN', full: 'English' },
]

export function LanguageSwitcher({
  compact = false,
  onNavigate,
}: {
  compact?: boolean
  onNavigate?: () => void
  /** Deprecated, conserve pour compat (le toggle n'ouvre plus de dropdown). */
  placement?: 'bottom' | 'top'
} = {}) {
  const pathname = usePathname() ?? '/'
  const router = useRouter()
  const current: Locale = detectLocaleFromPath(pathname)

  function swap(target: Locale) {
    if (target === current) return
    let nextPath: string
    if (current === 'fr') {
      const enSlug = FR_TO_EN[pathname]
      nextPath = enSlug !== undefined ? (enSlug === '/' ? '/en' : `/en${enSlug}`) : '/en'
    } else {
      const frPath = stripLocale(pathname)
      nextPath = hasTranslation(frPath) ? frPath : '/'
    }
    onNavigate?.()
    router.push(nextPath)
  }

  // Hauteur >= 36px pour une cible tactile confortable.
  const segH = compact ? 'h-8' : 'h-9'
  const segText = compact ? 'text-[11px]' : 'text-[12px]'

  return (
    <div
      role="group"
      aria-label={current === 'en' ? 'Change language' : 'Changer de langue'}
      className={`relative inline-flex items-center rounded-full border border-border bg-[var(--surface-default)] p-0.5 ${segH}`}
    >
      {LOCALES.map(({ code, label, full }) => {
        const active = code === current
        return (
          <button
            key={code}
            type="button"
            onClick={() => swap(code)}
            aria-pressed={active}
            aria-label={full}
            className={`relative z-10 inline-flex h-full min-w-[38px] items-center justify-center rounded-full px-3 font-bold uppercase tracking-wider transition-colors duration-200 ${segText} ${
              active
                ? 'text-white'
                : 'text-text-muted hover:text-text active:scale-[0.97]'
            }`}
            style={
              active
                ? { background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }
                : undefined
            }
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
