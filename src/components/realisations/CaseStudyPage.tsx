import { DeviceStage } from './DeviceStage'
import { CoverStage } from './CoverStage'
import { RealisationHeader } from './RealisationHeader'
import { ProblemBlock } from './ProblemBlock'
import { ApproachBlock } from './ApproachBlock'
import { FlowDiagram } from './FlowDiagram'
import { TrainingBlock } from './TrainingBlock'
import { HighlightsShowcase } from './HighlightsShowcase'
import { CaseStudyMedia } from './CaseStudyMedia'
import { ChatReplay } from './ChatReplay'
import { VisualDirection } from './VisualDirection'
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
 * Page d'une etude de cas, commune au francais et a l'anglais (v2).
 *
 * L'ordre suit la lecture d'un prospect : ce qui a ete fait et pour qui
 * (en-tete, reponse directe, fiche), le visuel principal, le contexte,
 * l'approche, puis les preuves (sections, medias, chiffres dates), les
 * lecons, les questions et les liens vers la prestation. Chaque bloc est
 * optionnel et ne s'affiche que si l'etude le renseigne.
 *
 * Visuel principal : la scene d'appareils (page entiere qui defile, telephone
 * devant) pour un projet web ; pour un projet sans site, la couverture quand
 * c'est un livrable mis en scene (`cover.lead`), sinon le schema de flux, sinon
 * la frise des seances d'une formation.
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
  const leadCover = !r.hero && r.cover?.lead ? r.cover : null
  const flowAsHero = !r.hero && !leadCover && Boolean(r.flow)
  // Formation sans visuel de tete : la frise des seances monte sous l'en-tete.
  const trainingAsHero = !r.hero && !leadCover && !r.flow && Boolean(r.training)
  const images = [
    `${ENTITY.url}/images/realisations/${r.slug}/og.png`,
    ...(r.mockup ? [`${ENTITY.url}${r.mockup.src}`] : []),
    ...(r.cover ? [`${ENTITY.url}${r.cover.src}`] : []),
    ...(r.highlights ?? []).map((h) => `${ENTITY.url}${h.image.src}`),
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

      <RealisationHeader r={r} lang={lang} />

      {r.hero && (
        <DeviceStage
          desktop={r.hero.desktopFull}
          browserUrl={r.hero.browserUrl}
          alt={`${r.client.name} : ${r.meta.title}`}
          phone={
            r.hero.mobileView
              ? {
                  src: r.hero.mobileView,
                  alt: en ? `${r.client.name} on a phone: first screen` : `${r.client.name} sur téléphone : premier écran`,
                }
              : undefined
          }
        />
      )}
      {leadCover && <CoverStage cover={leadCover} />}
      {flowAsHero && r.flow && <FlowDiagram flow={r.flow} lang={lang} />}
      {trainingAsHero && r.training && <TrainingBlock training={r.training} lang={lang} />}

      <CaseStudyNav r={r} lang={lang} />

      <ProblemBlock problem={r.problem} lang={lang} />
      <ApproachBlock approach={r.approach} lang={lang} />
      {!flowAsHero && r.flow && <FlowDiagram flow={r.flow} lang={lang} />}
      {!trainingAsHero && r.training && <TrainingBlock training={r.training} lang={lang} />}
      {r.highlights && r.highlights.length > 0 && (
        <HighlightsShowcase items={r.highlights} host={r.hero?.browserUrl ?? ''} showcase={r.showcase} lang={lang} />
      )}
      <CaseStudyMedia videos={r.videos} beforeAfter={r.beforeAfter} host={r.hero?.browserUrl} lang={lang} />
      {r.conversation && <ChatReplay conversation={r.conversation} lang={lang} />}
      {r.direction && <VisualDirection d={r.direction} clientName={r.client.name} lang={lang} />}
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
