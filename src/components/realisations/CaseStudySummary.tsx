import Link from 'next/link'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { AUTHORS, aboutPath } from '@/lib/realisations/authors'
import { formatDateLong } from '@/lib/format'
import { siteHost, studyLiveUrl } from '@/lib/realisations/links'
import { SiteLink } from './SiteLink'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * « L'essentiel » d'une etude de cas, juste sous le hero (2026-09-29) : la
 * reponse directe (le passage qu'un moteur generatif peut citer tel quel), la
 * signature de l'auteur avec ses dates, et la fiche projet en liste, sans
 * cartes. Sorti du hero pour lui laisser le titre et l'image. Aucune date ne
 * passe par Intl : serveur et client rendent le meme texte (docs/claude/12).
 */
export function CaseStudySummary({ r, lang = 'fr' }: { r: Realisation; lang?: Locale }) {
  const en = lang === 'en'
  const author = AUTHORS[r.author ?? 'david']
  const published = r.meta.publishedISO ?? r.meta.dateISO
  const modified = r.meta.dateModifiedISO && r.meta.dateModifiedISO !== published ? r.meta.dateModifiedISO : null
  const facts = r.facts ?? []
  const liveUrl = studyLiveUrl(r)
  const t = {
    answer: en ? 'In short' : "L'essentiel",
    facts: en ? 'Project sheet' : 'Fiche projet',
    by: en ? 'Case study by' : 'Étude rédigée par',
    published: en ? 'Published on' : 'Publiée le',
    updated: en ? 'updated on' : 'mise à jour le',
    site: en ? 'Live site' : 'Site en ligne',
  }

  return (
    <section aria-label={t.answer} className="border-b border-border">
      <div
        className={`mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-16 md:py-20 ${facts.length ? 'lg:grid-cols-12 lg:gap-14' : ''}`}
      >
        <SectionReveal className={facts.length ? 'lg:col-span-7' : 'max-w-[72ch]'}>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--violet-text)]">{t.answer}</h2>
          <p className="mt-4 text-xl leading-[1.6] text-text md:text-[22px] md:leading-[1.55]">{r.answer ?? r.meta.excerpt}</p>
          <div className="mt-8 flex items-center gap-3 text-sm text-text-muted">
            <img
              src={author.photo}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-full border border-border object-cover"
            />
            <p className="leading-[1.5]">
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
        </SectionReveal>

        {facts.length > 0 && (
          <SectionReveal delay={0.08} className="lg:col-span-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">{t.facts}</h2>
            <dl className="mt-4 border-t border-border">
              {facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] gap-4 border-b border-border py-3.5">
                  <dt className="text-[13px] leading-[1.5] text-text-muted">{f.label}</dt>
                  <dd className="text-[15px] leading-[1.45] text-text">{f.value}</dd>
                </div>
              ))}
              {liveUrl && (
                <div className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] gap-4 border-b border-border py-3.5">
                  <dt className="text-[13px] leading-[1.5] text-text-muted">{t.site}</dt>
                  <dd className="text-[15px] leading-[1.45]">
                    <SiteLink href={liveUrl} lang={lang} className="underline decoration-[var(--border-strong)] underline-offset-4">
                      {siteHost(liveUrl)}
                    </SiteLink>
                  </dd>
                </div>
              )}
            </dl>
          </SectionReveal>
        )}
      </div>
    </section>
  )
}
