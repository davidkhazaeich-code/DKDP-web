import { clsx } from 'clsx'
import { ArrowUpRight } from 'lucide-react'
import type { Locale } from '@/i18n/config'

/**
 * Lien vers un site livre (2026-10-01) : nouvel onglet, fleche sortante, et la
 * mention « nouvel onglet » pour les lecteurs d'ecran. `rel="noopener"` sans
 * `noreferrer` : le client voit dans ses statistiques les visites venues de
 * dkdp.ch. Couleur des liens du site : gris au repos, plein au survol.
 */
export function SiteLink({
  href,
  children,
  className,
  lang = 'fr',
}: {
  href: string
  children: React.ReactNode
  className?: string
  lang?: Locale
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={clsx(
        'group/site inline-flex max-w-full items-center gap-1.5 text-text-secondary transition-colors hover:text-text',
        className,
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/site:-translate-y-0.5 group-hover/site:translate-x-0.5"
      />
      <span className="sr-only">{lang === 'en' ? ' (opens in a new tab)' : ' (nouvel onglet)'}</span>
    </a>
  )
}
