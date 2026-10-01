import './realisations-hero.css'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Clapperboard,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  MonitorSmartphone,
  Palette,
  Search,
  ShoppingBag,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { HeroBg } from '@/components/ui/HeroBg'
import { HeroPills } from '@/components/ui/HeroPills'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { CaseStudyHeroVisual } from './CaseStudyHeroVisual'
import { studyLiveUrl } from '@/lib/realisations/links'
import { domainLabel, domainServicePath } from '@/lib/realisations/taxonomy'
import { heroProof, heroVisual, splitTitle } from '@/lib/realisations/hero'
import type { Realisation, RealisationDomain } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Hero d'une etude de cas (2026-09-29), a la place de l'en-tete v2 tout en texte.
 *
 * Retour de David : trop de texte, pas d'image, un titre entierement en degrade.
 * Desormais : a gauche le client, le H1 en couleur de texte avec quelques mots en
 * degrade (`meta.titleAccent`), une accroche de deux lignes (`lead`), trois
 * prestations au plus et deux actions ; a droite le travail livre
 * (`CaseStudyHeroVisual`), avec le premier resultat source en pastille.
 * Texte vers 57 %, visuel vers 43 %, jamais 50/50
 * (regle de David). Sur mobile, une image passe avant le texte ; un schema
 * (flux, programme) passe apres. La reponse directe et la fiche projet vivent
 * juste en dessous, dans `CaseStudySummary`.
 */
const DOMAIN_ICON: Record<RealisationDomain, LucideIcon> = {
  'site-web': MonitorSmartphone,
  application: LayoutDashboard,
  'e-commerce': ShoppingBag,
  'seo-geo': Search,
  publicite: Megaphone,
  'chatbot-ia': MessageSquare,
  automatisation: Workflow,
  'formation-ia': GraduationCap,
  'identite-visuelle': Palette,
  video: Clapperboard,
}

export function CaseStudyHero({ r, lang = 'fr' }: { r: Realisation; lang?: Locale }) {
  const en = lang === 'en'
  const home = en ? '/en' : '/'
  const hub = en ? '/en/portfolio' : '/realisations'
  const contact = en ? '/en/contact' : '/contact'
  const visual = heroVisual(r)
  const imageFirst = visual !== null && visual.kind !== 'flow' && visual.kind !== 'training'
  const title = splitTitle(r.meta.title, r.meta.titleAccent)
  const liveUrl = studyLiveUrl(r)
  const service = domainServicePath(r.domains[0], lang)
  const t = {
    home: en ? 'Home' : 'Accueil',
    portfolio: en ? 'Portfolio' : 'Réalisations',
    visit: en ? 'Visit the site' : 'Visiter le site',
    start: en ? 'Start my project' : 'Lancer mon projet',
    offer: en
      ? `See the ${domainLabel(r.domains[0], lang)} service`
      : `Voir l'offre ${domainLabel(r.domains[0], lang)}`,
  }

  return (
    <HeroBg accentRgb="167,139,250">
      <header className="relative">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-24 md:pb-16 md:pt-28">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-text-muted">
            <Link href={home} className="text-text-muted transition-colors hover:text-text">{t.home}</Link>
            <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
            <Link href={hub} className="text-text-muted transition-colors hover:text-text">{t.portfolio}</Link>
            <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="text-text-secondary">{r.client.name}</span>
          </nav>

          <div
            className={
              visual
                ? 'mt-8 grid grid-cols-1 items-center gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14'
                : 'mt-8 lg:mt-10'
            }
          >
            <div className={imageFirst ? 'order-2 lg:order-1' : undefined}>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-text-secondary">
                {r.client.logo && !r.client.anonymized ? (
                  // Logos blancs du bandeau : le filtre du theme les passe en noir en mode clair.
                  <img
                    src={r.client.logo}
                    alt={r.client.name}
                    className="client-logo-tile h-7 w-auto max-w-[128px] object-contain object-left"
                  />
                ) : (
                  <span className="font-semibold text-text">{r.client.name}</span>
                )}
                {r.client.location && (
                  <>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--border-strong)]" />
                    <span>{r.client.location}</span>
                  </>
                )}
              </p>

              <h1 className="mt-5 text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-text [text-wrap:balance] md:text-[2.5rem] lg:text-[2.75rem]">
                {title ? (
                  <>
                    {title.before}
                    <span className="rz-accent">{title.accent}</span>
                    {title.after}
                  </>
                ) : (
                  r.meta.title
                )}
              </h1>

              {r.lead && (
                <p className="mt-5 max-w-[58ch] text-lg leading-[1.65] text-text-secondary md:text-[19px]">{r.lead}</p>
              )}

              <HeroPills
                className="mt-7"
                items={r.domains.slice(0, 3).map((d) => ({ label: domainLabel(d, lang), Icon: DOMAIN_ICON[d] }))}
              />

              <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                {liveUrl ? (
                  <LiquidMetalButton href={liveUrl} size="lg" target="_blank" rel="noopener">
                    {t.visit}
                    <ArrowUpRight aria-hidden="true" className="ml-1.5 inline h-4 w-4 align-[-2px]" />
                    <span className="sr-only">{en ? ' (opens in a new tab)' : ' (nouvel onglet)'}</span>
                  </LiquidMetalButton>
                ) : (
                  <LiquidMetalButton href={contact} size="lg">
                    {t.start}<span aria-hidden="true"> →</span>
                  </LiquidMetalButton>
                )}
                {liveUrl ? (
                  <Link
                    href={contact}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition-colors hover:text-text"
                  >
                    {t.start}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ) : service ? (
                  <Link
                    href={service}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition-colors hover:text-text"
                  >
                    {t.offer}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ) : null}
              </div>
            </div>

            {visual && (
              <div className={imageFirst ? 'order-1 lg:order-2' : undefined}>
                <CaseStudyHeroVisual visual={visual} clientName={r.client.name} proof={heroProof(r)} liveUrl={liveUrl} lang={lang} />
              </div>
            )}
          </div>
        </div>
      </header>
    </HeroBg>
  )
}
