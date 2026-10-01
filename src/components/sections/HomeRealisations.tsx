import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { HubHeroVisual } from '@/components/realisations/HubHeroVisual'
import { REALISATIONS, hubOrder } from '@/lib/realisations'
import { hasEnglish, localizeRealisation } from '@/lib/realisations/en'
import { realisationSlides } from '@/lib/realisations/slides'
import { domainLabel } from '@/lib/realisations/taxonomy'
import type { Locale } from '@/i18n/config'

/**
 * Réalisations sur l'accueil (2026-10-01, demande de David) : le visuel
 * tournant du hub, avec son survol (ce qui a été mis en place, premier
 * résultat daté), et la liste des études à la une. Placée juste après les
 * logos clients : « ils nous ont fait confiance », puis ce que nous avons livré.
 *
 * Aucune étude anonyme ne s'affiche ici (`FEATURED_SLUGS` n'en contient pas) :
 * les logos clients de la section précédente lui retireraient son anonymat.
 * En anglais, seules les études traduites. La première image se charge en
 * différé : la section est sous la ligne de flottaison.
 */
const LIST_MAX = 4
const SLIDES_MAX = 6

const CONTENT = {
  fr: {
    tag: 'Réalisations',
    before: 'Des projets livrés, ',
    accent: 'montrés en vrai.',
    intro:
      "Sites, applications, automatisations, formations : chaque étude de cas montre le vrai travail, cite ses sources et date ses chiffres. Elle se termine par ce que nous referions autrement.",
    listLabel: 'Études à la une',
    all: (n: number) => `Voir les ${n} réalisations`,
  },
  en: {
    tag: 'Our work',
    before: 'Delivered projects, ',
    accent: 'shown for real.',
    intro:
      'Websites, apps, automation, training: every case study shows the real work, cites its sources and dates its figures. It ends with what we would do differently.',
    listLabel: 'Featured case studies',
    all: (n: number) => `See all ${n} case studies`,
  },
} as const

export function HomeRealisations({ lang = 'fr' }: { lang?: Locale } = {}) {
  const en = lang === 'en'
  const t = CONTENT[lang]
  const base = en ? '/en/portfolio' : '/realisations'
  const live = hubOrder(
    REALISATIONS.filter((r) => r.meta.status === 'live' && (!en || hasEnglish(r.slug))).map((r) =>
      localizeRealisation(r, lang),
    ),
  )
  if (live.length === 0) return null
  const slides = realisationSlides(live, lang, SLIDES_MAX)
  const list = live.slice(0, LIST_MAX)

  return (
    <section aria-labelledby="home-realisations-heading" className="border-t border-border py-14 sm:py-20 md:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-x-14 gap-y-10 px-5 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <GradTag className="mb-4">{t.tag}</GradTag>
          <h2 id="home-realisations-heading" className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl md:text-4xl">
            {t.before}
            <GradText>{t.accent}</GradText>
          </h2>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.7] text-text-secondary md:text-[17px]">{t.intro}</p>
        </div>

        <div className="lg:sticky lg:top-[110px] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:self-start">
          <HubHeroVisual slides={slides} lang={lang} eager={false} />
        </div>

        <div className="lg:col-span-5 lg:row-start-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">{t.listLabel}</p>
          <ol className="mt-3 divide-y divide-border border-y border-border">
            {list.map((r, i) => {
              const result = r.results?.[0]
              return (
                <li key={r.slug}>
                  <Link
                    href={`${base}/${r.slug}`}
                    className="group grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-start gap-3 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  >
                    <span className="pt-[3px] font-mono text-xs font-semibold text-[var(--violet-text)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[11px] uppercase tracking-[0.1em] text-text-muted">
                        {r.client.name} · {domainLabel(r.domains[0], lang)}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-[15px] font-medium leading-snug text-text-secondary transition-colors group-hover:text-text">
                        {r.meta.title}
                      </span>
                      {result && (
                        <span className="mt-1.5 block truncate text-xs text-text-muted">
                          <span className="mr-1 font-semibold text-text">{result.value}</span>
                          {result.metric}
                        </span>
                      )}
                    </span>
                    <ArrowUpRight
                      className="mt-1 h-4 w-4 text-text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              )
            })}
          </ol>
          <Link
            href={base}
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-[var(--violet-border)] hover:text-text"
          >
            {t.all(live.length)}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
