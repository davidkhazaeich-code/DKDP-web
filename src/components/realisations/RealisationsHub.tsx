import { Suspense } from 'react'
import { RealisationsGrid } from './RealisationsGrid'
import { HubHeroVisual, type HubSlide } from './HubHeroVisual'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { LogoBanner } from '@/components/sections/LogoBanner'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList } from '@/lib/schema'
import { buildRealisationsCollection } from '@/lib/realisations/jsonld'
import { hubOrder } from '@/lib/realisations'
import { domainLabel, sectorLabel } from '@/lib/realisations/taxonomy'
import { studyVisual } from '@/lib/realisations/visual'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Hub des etudes de cas, commun au francais et a l'anglais (v3, 2026-09-25).
 *
 * En tete, le texte de la page (a quoi elle sert, quels domaines, comment
 * lire une etude) et des compteurs calcules, jamais saisis ; a cote, les
 * mises en scene des etudes, l'une apres l'autre. Puis la grille filtrable,
 * les etudes a la une d'abord, et la regle de preuve : ce que chaque etude
 * garantit, et seulement ce qui est vrai aujourd'hui pour toutes.
 *
 * Bandeau de logos clients en bas de page : a ne jamais afficher a cote d'une
 * etude anonyme de l'un de ces clients (l'anonymat ne tiendrait plus). Depuis
 * le 26.09.2026, les etudes de formation sont nommees et le bandeau est revenu.
 */
const MAX_SLIDES = 6

export function RealisationsHub({ items, lang = 'fr' }: { items: Realisation[]; lang?: Locale }) {
  const en = lang === 'en'
  const ordered = hubOrder(items)
  const domains = new Set(items.flatMap((r) => r.domains)).size
  const sectors = new Set(items.map((r) => r.sector)).size
  const home = en ? 'https://dkdp.ch/en' : 'https://dkdp.ch/'
  const hub = en ? 'https://dkdp.ch/en/portfolio' : 'https://dkdp.ch/realisations'
  const base = en ? '/en/portfolio' : '/realisations'

  const slides: HubSlide[] = ordered
    .map((r) => {
      const visual = studyVisual(r)
      if (!visual) return null
      return {
        src: visual.src,
        alt: visual.alt,
        href: `${base}/${r.slug}`,
        client: r.client.name,
        label: `${domainLabel(r.domains[0], lang)} · ${sectorLabel(r.sector, lang)}`,
      }
    })
    .filter((s): s is HubSlide => s !== null)
    .slice(0, MAX_SLIDES)

  const stats = [
    { label: en ? 'Case studies' : 'Études', value: items.length },
    { label: en ? 'Services' : 'Prestations', value: domains },
    { label: en ? 'Sectors' : 'Secteurs', value: sectors },
  ]

  const rules = en
    ? [
        { title: 'Every figure is sourced and dated', body: 'Search Console, git history, a manual check of the results page: each case study says where a number comes from and when it was measured.' },
        { title: 'Client data only with written consent', body: 'A client’s private figures (Search Console, analytics, advertising) are published only once the client has agreed in writing.' },
        { title: 'A client who asks for discretion stays anonymous', body: 'No name, no logo, no link: the sector, the format and the lessons are enough to judge the work.' },
        { title: 'Lessons, not only successes', body: 'Each case study ends with what we would do differently: the experience a generic guide cannot give.' },
      ]
    : [
        { title: 'Chaque chiffre cite sa source et sa date', body: "Search Console, historique git, relevé de la page de résultats : chaque étude dit d'où vient un chiffre et quand il a été mesuré." },
        { title: "Les données d'un client, avec son accord écrit", body: "Les chiffres privés d'un client (Search Console, statistiques, publicité) ne sont publiés qu'une fois son accord écrit obtenu." },
        { title: 'Un client discret reste anonyme', body: 'Ni nom, ni logo, ni lien : le secteur, le format et les leçons suffisent pour juger du travail.' },
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
      <SchemaOrg schema={buildRealisationsCollection({ items: ordered, lang })} />

      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.18),transparent)]"
        />
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <GradTag>{en ? 'Portfolio' : 'Réalisations'}</GradTag>
            <h1 className="mt-6 max-w-[18ch] text-4xl leading-[1.08] tracking-[-0.02em] text-text md:text-5xl lg:text-[56px]">
              <GradText as="span">
                {en ? 'Case studies: websites, AI and automation' : 'Études de cas : sites web, IA et automatisation'}
              </GradText>
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-[1.7] text-text-secondary">
              {en ? (
                <>
                  <p>
                    What DKDP has delivered for companies in French-speaking Switzerland, and for itself: websites and business
                    applications, search and generative-engine visibility, AI automation and training. Each case study sets out
                    the starting point, the approach, what was delivered and the measured results.
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
                    métier, visibilité dans Google et dans les moteurs de réponse, automatisation et formation à l'IA. Chaque étude
                    expose le point de départ, l'approche retenue, ce qui a été livré et les résultats mesurés.
                  </p>
                  <p>
                    Filtrez par prestation ou par secteur pour retrouver un projet proche du vôtre. Les projets internes de DKDP
                    sont signalés comme tels, et un client qui souhaite rester discret est présenté sans nom, sans logo et sans
                    lien.
                  </p>
                </>
              )}
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 divide-x divide-border border-y border-border">
              {stats.map((s) => (
                <div key={s.label} className="px-4 py-4 first:pl-0">
                  <dt className="text-xs uppercase tracking-[0.12em] text-text-muted">{s.label}</dt>
                  <dd className="mt-1 text-3xl font-semibold tabular-nums text-text">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6">
            <HubHeroVisual slides={slides} lang={lang} />
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-12 text-center text-text-muted">{en ? 'Loading…' : 'Chargement…'}</div>}>
        <RealisationsGrid items={ordered} lang={lang} />
      </Suspense>

      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[150px]">
              <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
                {en ? 'Our rule of proof' : 'Notre règle de preuve'}
              </h2>
              <p className="mt-4 text-[17px] leading-[1.7] text-text-secondary">
                {en
                  ? 'What every case study on this page guarantees. An automated test of the site checks these rules on every study: a single breach makes it fail.'
                  : "Ce que garantit chaque étude de cette page. Un test automatique du site vérifie ces règles sur chaque étude : un seul écart le fait échouer."}
              </p>
            </div>
          </div>
          <ol className="divide-y divide-border border-y border-border lg:col-span-8">
            {rules.map((rule, i) => (
              <li key={rule.title}>
                <SectionReveal delay={i * 0.08} className="grid gap-2 py-7 sm:grid-cols-[72px_1fr]">
                  <span className="font-mono text-sm font-semibold text-[var(--violet-text)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-[19px] font-semibold leading-snug text-text">{rule.title}</p>
                    <p className="mt-2 max-w-[62ch] text-[15.5px] leading-[1.65] text-text-secondary">{rule.body}</p>
                  </div>
                </SectionReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <LogoBanner lang={lang} />
      <CTAFinal lang={lang} />
    </>
  )
}
