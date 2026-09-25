import Link from 'next/link'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { domainLabel, sectorLabel } from '@/lib/realisations/taxonomy'
import { AUTHORS, aboutPath } from '@/lib/realisations/authors'
import { formatDateLong } from '@/lib/format'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * En-tete d'une etude de cas (v2, 2026-09-25).
 *
 * Le H1 porte l'intention de recherche (« Site et CRM pour une PME du
 * batiment a Geneve »), le nom du client passe dans la ligne du dessus. Sous
 * le titre : la reponse directe (le passage qu'un moteur generatif peut citer
 * tel quel), la fiche projet et la signature de l'auteur avec les dates de
 * publication et de mise a jour. Aucune date ne passe par Intl : le rendu
 * serveur et le client doivent produire le meme texte (docs/claude/12).
 */
/** Une seule rangee en desktop jusqu'a 5 faits ; classes statiques pour Tailwind. */
const FACT_COLUMNS: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
}

export function RealisationHeader({ r, lang = 'fr' }: { r: Realisation; lang?: Locale }) {
  const en = lang === 'en'
  const home = en ? '/en' : '/'
  const hub = en ? '/en/portfolio' : '/realisations'
  const contact = en ? '/en/contact' : '/contact'
  const author = AUTHORS[r.author ?? 'david']
  const published = r.meta.publishedISO ?? r.meta.dateISO
  const modified = r.meta.dateModifiedISO && r.meta.dateModifiedISO !== published ? r.meta.dateModifiedISO : null
  const showLiveUrl = r.liveUrl && !r.client.anonymized
  const t = {
    home: en ? 'Home' : 'Accueil',
    portfolio: en ? 'Portfolio' : 'Réalisations',
    answer: en ? 'In short' : "L'essentiel",
    facts: en ? 'Project sheet' : 'Fiche projet',
    by: en ? 'Case study by' : 'Étude rédigée par',
    published: en ? 'Published on' : 'Publiée le',
    updated: en ? 'updated on' : 'mise à jour le',
    visit: en ? 'Visit the site' : 'Visiter le site',
    start: en ? 'Start my project' : 'Lancer mon projet',
  }

  return (
    <HeroBg accentRgb="167,139,250">
      <header className="relative">
        <div className="mx-auto max-w-[1200px] px-6 pt-12 md:pt-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-text-muted">
            <Link href={home} className="text-text-muted transition-colors hover:text-text">{t.home}</Link>
            <span className="mx-2">/</span>
            <Link href={hub} className="text-text-muted transition-colors hover:text-text">{t.portfolio}</Link>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">{r.client.name}</span>
          </nav>
        </div>

        <div className="mx-auto max-w-[1200px] px-6 pb-16 md:pb-20">
          <SectionReveal className="flex flex-col items-start">
            <div className="flex flex-wrap items-center gap-3">
              <GradTag className="self-start">{domainLabel(r.domains[0], lang)}</GradTag>
              <span className="text-xs uppercase tracking-[0.12em] text-text-muted">
                {r.client.name}
                {r.client.location ? ` · ${r.client.location}` : ''}
                {` · ${sectorLabel(r.sector, lang)}`}
              </span>
            </div>

            <h1 className="mt-6 max-w-[22ch] text-4xl leading-[1.08] tracking-[-0.02em] text-text md:max-w-[24ch] md:text-5xl lg:text-[56px]">
              <GradText as="span">{r.meta.title}</GradText>
            </h1>

            {r.answer ? (
              <div className="mt-8 max-w-[72ch] border-l-2 border-[var(--violet-border)] pl-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--violet-text)]">
                  {t.answer}
                </p>
                <p className="mt-2 text-lg leading-[1.65] text-text md:text-[19px]">{r.answer}</p>
              </div>
            ) : (
              <p className="mt-6 max-w-[68ch] text-lg leading-[1.7] text-text-secondary">{r.meta.excerpt}</p>
            )}

            {r.facts && r.facts.length > 0 && (
              <div className="mt-10 w-full">
                <h2 className="sr-only">{t.facts}</h2>
                <dl
                  className={`grid w-full grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2 ${FACT_COLUMNS[r.facts.length] ?? 'lg:grid-cols-3'} lg:[&>*:last-child:nth-child(odd)]:col-span-1`}
                >
                  {r.facts.map((f) => (
                    <div key={f.label} className="bg-bg-card px-5 py-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">{f.label}</dt>
                      <dd className="mt-1.5 text-[15px] leading-[1.45] text-text">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-text-muted">
              <img
                src={author.photo}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-full border border-border object-cover"
              />
              <p>
                {t.by}{' '}
                <Link href={aboutPath(lang)} className="text-text-secondary underline transition-colors hover:text-text">
                  {author.name}
                </Link>
                , {author.role[lang]}
                <span className="mx-2">·</span>
                {t.published} <time dateTime={published}>{formatDateLong(published, lang)}</time>
                {modified ? (
                  <>
                    , {t.updated} <time dateTime={modified}>{formatDateLong(modified, lang)}</time>
                  </>
                ) : null}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {showLiveUrl ? (
                <LiquidMetalButton href={r.liveUrl} size="lg" target="_blank" rel="noopener noreferrer">
                  {t.visit}<span aria-hidden="true"> →</span>
                </LiquidMetalButton>
              ) : null}
              <Link
                href={contact}
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-[var(--surface-default)]"
              >
                {t.start}
              </Link>
            </div>
          </SectionReveal>
        </div>
      </header>
    </HeroBg>
  )
}
