import { CaseStudyHero } from './CaseStudyHero'
import { CaseStudySummary } from './CaseStudySummary'
import { SiteStage } from './SiteStage'
import { ProblemBlock } from './ProblemBlock'
import { ApproachBlock } from './ApproachBlock'
import { FlowDiagram } from './FlowDiagram'
import { TrainingBlock } from './TrainingBlock'
import { HighlightsShowcase } from './HighlightsShowcase'
import { CaseStudyMedia } from './CaseStudyMedia'
import { ChatReplay } from './ChatReplay'
import { VisualDirection } from './VisualDirection'
import { BrandTouchpoints } from './BrandTouchpoints'
import { SeoDirection } from './SeoDirection'
import { StackChips } from './StackChips'
import { DataStories } from './DataStory'
import { ResultsGrid } from './ResultsGrid'
import { GalleryGrid } from './GalleryGrid'
import { LessonsBlock } from './LessonsBlock'
import { TestimonialQuote } from './TestimonialQuote'
import { CaseStudyFAQ } from './CaseStudyFAQ'
import { CaseStudyLinks } from './CaseStudyLinks'
import { RelatedRealisations } from './RelatedRealisations'
import { CinematicCTA } from './CinematicCTA'
import { CaseStudyNav } from './CaseStudyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildFAQPage } from '@/lib/schema'
import { buildRealisationArticle, realisationUrl } from '@/lib/realisations/jsonld'
import { ENTITY } from '@/lib/entity'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Page d'une etude de cas, commune au francais et a l'anglais (v2, hero du
 * 2026-09-29).
 *
 * L'ordre suit la lecture d'un prospect : le hero (le client, ce qui a ete
 * fait, le travail livre en image), la reponse directe et la fiche projet, le
 * contexte, l'approche, la page entiere du site, puis les preuves (sections,
 * medias, chiffres dates), les lecons, les questions et les liens vers la
 * prestation. Chaque bloc est optionnel et ne s'affiche que si l'etude le
 * renseigne. Le choix du visuel du hero vit dans `lib/realisations/hero.ts`.
 */
export function CaseStudyPage({
  r,
  related,
  lang = 'fr',
}: {
  r: Realisation
  related: Realisation[]
  lang?: Locale
}) {
  const en = lang === 'en'
  const url = realisationUrl(r.slug, lang)
  const images = [
    `${ENTITY.url}/images/realisations/${r.slug}/og.png`,
    ...(r.mockup ? [`${ENTITY.url}${r.mockup.src}`] : []),
    ...(r.cover ? [`${ENTITY.url}${r.cover.src}`] : []),
    ...(r.highlights ?? []).map((h) => `${ENTITY.url}${h.image.src}`),
    ...(r.touchpoints?.items ?? []).map((it) => `${ENTITY.url}${it.src}`),
  ]

  return (
    <>
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: en ? 'Home' : 'Accueil', url: en ? `${ENTITY.url}/en` : `${ENTITY.url}/` },
          { name: en ? 'Portfolio' : 'Réalisations', url: en ? `${ENTITY.url}/en/portfolio` : `${ENTITY.url}/realisations` },
          { name: r.client.name, url },
        ])}
      />
      <SchemaOrg schema={buildRealisationArticle({ realisation: r, lang, images })} />
      {r.faq && r.faq.length > 0 && <SchemaOrg schema={buildFAQPage(r.faq)} />}

      <CaseStudyHero r={r} lang={lang} />
      <CaseStudyNav r={r} lang={lang} />
      <CaseStudySummary r={r} lang={lang} />

      <ProblemBlock problem={r.problem} lang={lang} />
      <ApproachBlock approach={r.approach} lang={lang} />
      {r.hero && <SiteStage hero={r.hero} clientName={r.client.name} lang={lang} />}
      {r.flow && <FlowDiagram flow={r.flow} lang={lang} />}
      {r.training && <TrainingBlock training={r.training} lang={lang} />}
      {r.highlights && r.highlights.length > 0 && (
        <HighlightsShowcase items={r.highlights} host={r.hero?.browserUrl ?? ''} showcase={r.showcase} lang={lang} />
      )}
      <CaseStudyMedia videos={r.videos} beforeAfter={r.beforeAfter} host={r.hero?.browserUrl} lang={lang} />
      {r.conversation && <ChatReplay conversation={r.conversation} lang={lang} />}
      {r.direction && <VisualDirection d={r.direction} clientName={r.client.name} lang={lang} />}
      {r.touchpoints && r.touchpoints.items.length > 0 && <BrandTouchpoints t={r.touchpoints} lang={lang} />}
      {r.seo && <SeoDirection seo={r.seo} lang={lang} />}
      {r.stack && <StackChips chips={r.stack} />}
      {r.dataStories && r.dataStories.length > 0 && <DataStories stories={r.dataStories} lang={lang} />}
      {r.results && r.results.length > 0 && <ResultsGrid results={r.results} lang={lang} />}
      {r.gallery && <GalleryGrid items={r.gallery} lang={lang} />}
      {r.lessons && r.lessons.length > 0 && <LessonsBlock lessons={r.lessons} lang={lang} />}
      {r.testimonial && <TestimonialQuote t={r.testimonial} lang={lang} />}
      {r.faq && r.faq.length > 0 && <CaseStudyFAQ items={r.faq} lang={lang} />}
      <CaseStudyLinks r={r} lang={lang} />
      <RelatedRealisations items={related} lang={lang} />
      <CinematicCTA lang={lang} />
    </>
  )
}
