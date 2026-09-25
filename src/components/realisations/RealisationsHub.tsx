import { Suspense } from 'react'
import { RealisationsGrid } from './RealisationsGrid'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { LogoBanner } from '@/components/sections/LogoBanner'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList } from '@/lib/schema'
import { buildRealisationsCollection } from '@/lib/realisations/jsonld'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Hub des etudes de cas, commun au francais et a l'anglais (v2).
 *
 * La page porte un vrai texte (a quoi sert la page, quels domaines, comment
 * lire une etude) et des compteurs calcules, jamais saisis. L'encadre « regle
 * de preuve » dit ce que chaque etude garantit, et seulement ce qui est vrai
 * aujourd'hui pour toutes.
 */
export function RealisationsHub({ items, lang = 'fr' }: { items: Realisation[]; lang?: Locale }) {
  const en = lang === 'en'
  const domains = new Set(items.flatMap((r) => r.domains)).size
  const sectors = new Set(items.map((r) => r.sector)).size
  const home = en ? 'https://dkdp.ch/en' : 'https://dkdp.ch/'
  const hub = en ? 'https://dkdp.ch/en/portfolio' : 'https://dkdp.ch/realisations'

  const rules = en
    ? [
        { title: 'Every figure is sourced and dated', body: 'Search Console, git history, a manual check of the results page: each case study says where a number comes from and when it was measured.' },
        { title: 'Client data only with written consent', body: 'A client’s private figures (Search Console, analytics, advertising) are published only once the client has agreed in writing.' },
        { title: 'Lessons, not only successes', body: 'Each case study ends with what we would do differently: the experience a generic guide cannot give.' },
      ]
    : [
        { title: 'Chaque chiffre cite sa source et sa date', body: "Search Console, historique git, relevé de la page de résultats : chaque étude dit d'où vient un chiffre et quand il a été mesuré." },
        { title: "Les données d'un client, avec son accord écrit", body: "Les chiffres privés d'un client (Search Console, statistiques, publicité) ne sont publiés qu'une fois son accord écrit obtenu." },
        { title: 'Des leçons, pas seulement des réussites', body: 'Chaque étude se termine par ce que nous referions autrement : l’expérience vécue, celle qu’aucun guide générique ne donne.' },
      ]

  return (
    <>
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: en ? 'Home' : 'Accueil', url: home },
          { name: en ? 'Portfolio' : 'Réalisations', url: hub },
        ])}
      />
      <SchemaOrg schema={buildRealisationsCollection({ items, lang })} />

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <GradTag>{en ? 'Portfolio' : 'Réalisations'}</GradTag>
          <h1 className="mt-6 max-w-[20ch] text-4xl leading-[1.08] tracking-[-0.02em] text-text md:text-5xl lg:text-6xl">
            <GradText as="span">
              {en ? 'Case studies: websites, AI and automation' : 'Études de cas : sites web, IA et automatisation'}
            </GradText>
          </h1>
          <div className="mt-6 grid gap-6 md:grid-cols-12">
            <div className="space-y-4 text-lg leading-[1.7] text-text-secondary md:col-span-8">
              {en ? (
                <>
                  <p>
                    What DKDP has delivered for companies in French-speaking Switzerland, and for itself: websites and
                    business applications, search and generative-engine visibility, AI automation. Each case study sets out the
                    starting point, the approach, what was delivered and the measured results.
                  </p>
                  <p>
                    Filter by service or by sector to find a project close to yours. DKDP's in-house projects are labelled as such,
                    and a client who asks to stay anonymous is presented without name, logo or link.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Ce que DKDP a livré pour des entreprises de Suisse romande, et pour elle-même : sites web et applications
                    métier, visibilité dans Google et dans les moteurs de réponse, automatisation par l'IA. Chaque étude expose le
                    point de départ, l'approche retenue, ce qui a été livré et les résultats mesurés.
                  </p>
                  <p>
                    Filtrez par prestation ou par secteur pour retrouver un projet proche du vôtre. Les projets internes de DKDP
                    sont signalés comme tels, et un client qui souhaite rester discret est présenté sans nom, sans logo et sans
                    lien.
                  </p>
                </>
              )}
            </div>
            <dl className="flex gap-8 self-end text-sm text-text-muted md:col-span-4 md:justify-end">
              <div>
                <dt>{en ? 'Case studies' : 'Études'}</dt>
                <dd className="text-2xl font-semibold text-[var(--violet-text)]">{items.length}</dd>
              </div>
              <div>
                <dt>{en ? 'Services' : 'Prestations'}</dt>
                <dd className="text-2xl font-semibold text-[var(--violet-text)]">{domains}</dd>
              </div>
              <div>
                <dt>{en ? 'Sectors' : 'Secteurs'}</dt>
                <dd className="text-2xl font-semibold text-[var(--violet-text)]">{sectors}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-12 text-center text-text-muted">{en ? 'Loading…' : 'Chargement…'}</div>}>
        <RealisationsGrid items={items} lang={lang} />
      </Suspense>

      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
            {en ? 'Our rule of proof' : 'Notre règle de preuve'}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {rules.map((rule) => (
              <li key={rule.title} className="rounded-2xl border border-border bg-bg-card p-6">
                <p className="text-[17px] font-semibold leading-snug text-text">{rule.title}</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-text-secondary">{rule.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LogoBanner lang={lang} />
      <CTAFinal lang={lang} />
    </>
  )
}
