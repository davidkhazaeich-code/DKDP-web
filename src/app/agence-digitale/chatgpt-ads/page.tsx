import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, ShieldCheck, Clock, Search, Megaphone } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { getArticlesByTopic, CHATGPT_TOPIC } from '@/lib/blog/topics'
import { violet } from '@/lib/tokens'
import { FAQ, CONTACT_HREF } from './_components/copy'
import { ChatMockHero } from './_components/ChatMockHero'
import { HowItWorks } from './_components/HowItWorks'
import { RolloutTimeline } from './_components/RolloutTimeline'
import { PlanVisibilityGrid } from './_components/PlanVisibilityGrid'
import { ChannelComparison } from './_components/ChannelComparison'
import { BudgetSimulator } from './_components/BudgetSimulator'
import { SectorsGrid } from './_components/SectorsGrid'
import { MethodSteps } from './_components/MethodSteps'
import { PricingGrid } from './_components/PricingGrid'
import { ExpertBlock } from './_components/ExpertBlock'
import { ComplianceTiles } from './_components/ComplianceTiles'
import { RomandieCoverage } from './_components/RomandieCoverage'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then((m) => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then((m) => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then((m) => m.FAQSection))
const ArticleCarousel = dynamic(() => import('@/components/sections/ArticleCarousel').then((m) => ({ default: m.ArticleCarousel })))

/**
 * Page service ChatGPT Ads, créée le 10 septembre 2026.
 * Faits, dates et chiffres : `docs/chatgpt-ads-facts-2026-09-10.md`, seule
 * source autorisée. Prix : décision de David du 10.09.2026. Composants
 * bilingues dans `_components/` (prop `lang`), réutilisés par le miroir EN.
 */

export const metadata: Metadata = {
  title: 'Agence ChatGPT Ads Genève & Suisse romande | DKDP',
  description:
    'ChatGPT Ads pour les PME romandes : Ads Manager, cartes sponsorisées, pilote de 30 jours. Agence à Genève, zéro commission média.',
  alternates: {
    canonical: 'https://dkdp.ch/agence-digitale/chatgpt-ads',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/chatgpt-ads',
      en: 'https://dkdp.ch/en/digital-agency/chatgpt-ads',
      'x-default': 'https://dkdp.ch/agence-digitale/chatgpt-ads',
    },
  },
  openGraph: {
    images: [{ url: '/images/og/chatgpt-ads.png', width: 1376, height: 768, alt: 'ChatGPT Ads : publicité dans ChatGPT pour les PME de Genève et Suisse romande, par DKDP' }],
  },
}

const color = violet.color
const bg = violet.bg
const border = violet.border

const STATS = [
  { v: '24 août 2026', l: 'Annonces actives en Suisse', sub: '31 marchés européens' },
  { v: '31 août 2026', l: 'Ads Manager en libre-service', sub: 'Entreprises suisses acceptées' },
  { v: 'CHF 20', l: 'Budget quotidien minimum', sub: 'Compte facturé en francs, selon OpenAI' },
  { v: '0 CHF', l: 'Commission média', sub: 'Budget 100 % à OpenAI' },
]

const VEILLE_MAX = 8

export default function ChatGptAdsPage() {
  const articles = getArticlesByTopic(CHATGPT_TOPIC, VEILLE_MAX)

  return (
    <main>
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'Publicité ChatGPT Ads Suisse romande',
          url: '/agence-digitale/chatgpt-ads',
          description:
            'Création et gestion de campagnes ChatGPT Ads pour les PME de Genève et de Suisse romande : ouverture du compte Ads Manager, cartes sponsorisées, mesure des conversions, pilote de 30 jours puis gestion mensuelle, sans commission sur le budget média.',
          serviceType: 'Publicité ChatGPT Ads',
          priceFrom: 1200,
          priceSpecDescription: 'Pilote de 30 jours dès CHF 1\'200, gestion mensuelle dès CHF 450',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ.fr)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Accueil', url: 'https://dkdp.ch' },
          { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
          { name: 'ChatGPT Ads', url: 'https://dkdp.ch/agence-digitale/chatgpt-ads' },
        ])}
      />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/agence-digitale" className="text-text-muted text-sm hover:text-text transition-colors">
                Service Digital
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>ChatGPT Ads</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">ChatGPT Ads Genève & Suisse romande</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Votre PME dans la réponse de ChatGPT, au moment où le client{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>décide</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  Depuis le 24 août 2026, ChatGPT affiche des annonces en Suisse, et l&apos;Ads Manager d&apos;OpenAI est ouvert aux entreprises suisses depuis le 31 août. DKDP, agence à Genève, ouvre ce canal pour les PME de Suisse romande : compte Ads Manager, cartes sponsorisées, mesure des conversions, et un pilote de 30 jours avant d&apos;engager un franc de plus. Sans commission média, compte à votre nom.
                </p>
                <HeroPills
                  items={[
                    { label: 'Suisse : ouvert depuis le 31.08.2026', Icon: CheckCircle2 },
                    { label: 'Zéro commission média', Icon: ShieldCheck },
                    { label: 'Pilote de 30 jours', Icon: Clock },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href={CONTACT_HREF} size="lg">Lancer une campagne ChatGPT Ads →</LiquidMetalButton>
                  <Link href="#simulateur" className="text-sm text-text-muted hover:text-text transition-colors">
                    Estimer mon budget ↓
                  </Link>
                </div>
              </div>
              <ChatMockHero lang="fr" />
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Chiffres sourcés ── */}
      <section className="py-12 border-b border-border" aria-label="Repères ChatGPT Ads en Suisse">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color }}>{s.v}</p>
                  <p className="text-text text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <LogoBanner />

      {/* ── Sous-navigation ── */}
      <ScrollSpyNav
        items={[
          { label: 'Fonctionnement', href: '#fonctionnement' },
          { label: 'Audience', href: '#audience' },
          { label: 'Comparatif', href: '#comparatif' },
          { label: 'Simulateur', href: '#simulateur' },
          { label: 'Pour qui', href: '#pour-qui' },
          { label: 'Méthode', href: '#methode' },
          { label: 'Tarifs', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Lancer une campagne', href: CONTACT_HREF }}
        accentColor="#A78BFA"
        accentBg="rgba(124,58,237,0.18)"
        accentBorder="rgba(124,58,237,0.30)"
      />

      {/* ── Fonctionnement ── */}
      <section id="fonctionnement" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="max-w-3xl mb-12">
              <GradTag className="mb-4">Fonctionnement</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-5">
                Comment fonctionne la publicité dans ChatGPT
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Une annonce ChatGPT ne se déclenche pas sur un mot-clé mais sur une conversation. La personne explique ce qu&apos;elle veut, ChatGPT répond, et sous la réponse une carte sponsorisée propose votre offre si elle correspond au contexte. Vous fournissez des indications de contexte, un titre, un texte, une image et une page de destination ; OpenAI choisit l&apos;annonce par une enchère au second prix pondérée par la pertinence. Les annonces tournent sur un système séparé du modèle : elles ne changent jamais ce que ChatGPT répond.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <HowItWorks lang="fr" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Chronologie ── */}
      <section id="deploiement" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-16 items-end mb-12">
              <div>
                <GradTag className="mb-4">Chronologie</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  Sept mois entre le premier test et l&apos;ouverture aux PME suisses
                </h2>
              </div>
              <p className="text-text-secondary leading-relaxed">
                OpenAI a testé les annonces aux États-Unis en février 2026, ouvert un Ads Manager en libre-service en mai, puis annoncé 31 marchés européens le 18 août. Les entreprises suisses peuvent créer leur compte depuis le 31 août. C&apos;est le moment où un canal se prend à bon prix : peu d&apos;annonceurs romands, une enchère au second prix, et le temps d&apos;apprendre avant que la concurrence n&apos;arrive.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <RolloutTimeline lang="fr" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Audience ── */}
      <section id="audience" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Audience</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Qui voit vos annonces dans ChatGPT, forfait par forfait
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                Les annonces s&apos;affichent uniquement pour les utilisateurs des forfaits Free et Go. Les abonnés Plus, Pro, Business, Enterprise et Edu ne voient jamais de carte sponsorisée, les moins de 18 ans non plus. Ce détail décide de tout : une offre grand public parle à une audience très large, une offre B2B vise souvent des décideurs qui paient un forfait sans publicité.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Un pilote de 30 jours mesure précisément ce qu&apos;il reste d&apos;audience pour votre activité, avant toute décision de budget.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <PlanVisibilityGrid lang="fr" />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Comparatif ── */}
      <section id="comparatif" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <GradTag className="mb-4">Comparatif</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4">
                Google Ads ou ChatGPT Ads : lequel pour votre PME romande ?
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Les deux canaux ne se remplacent pas. Google capte une demande déjà formulée en mots-clés, ChatGPT capte une demande qui se construit dans une conversation. Voici ce qui change, critère par critère, avec ce que DKDP recommande.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <ChannelComparison lang="fr" />
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="text-center text-sm text-text-muted mt-6">
              Vous gérez déjà des campagnes Google ? Voir{' '}
              <Link href="/agence-digitale/publicite-sea" className="underline hover:text-text transition-colors">notre service Google Ads à Genève</Link>.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Simulateur ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="simulateur" className="py-24 border-y border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <GradTag className="mb-4">Simulateur</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4">
                  Estimez votre budget ChatGPT Ads
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Réglez votre budget média mensuel, la fourchette de coût par clic que vous supposez et la part de clics qui deviennent un contact. Le simulateur rend une fourchette, jamais une promesse : OpenAI ne publie aucun benchmark, et le canal a moins d&apos;un an en Suisse.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <BudgetSimulator lang="fr" />
            </SectionReveal>
          </div>
        </section>
      </HeroBg>

      {/* ── Pour qui ── */}
      <section id="pour-qui" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-10 lg:gap-16 items-center mb-14">
            <SectionReveal>
              <GradTag className="mb-4">Pour qui</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Pour quelles entreprises ChatGPT Ads fonctionne à Genève et en Suisse romande
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Pendant sa période de test, OpenAI accepte surtout les secteurs de consommation : biens ménagers, services locaux, voyages et expériences, produits numériques et éducation. Les secteurs réglementés sont soit interdits, soit soumis à une validation manuelle. DKDP vérifie votre éligibilité avant de vous faire ouvrir un compte.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Le bon candidat a une offre claire, une page de destination précise et un moyen simple de convertir : réserver, appeler, commander, s&apos;inscrire.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="relative aspect-[16/9] rounded-[16px] overflow-hidden border border-border">
                <Image
                  src="/images/services/dkdp-chatgpt-ads-secteurs-pme-romandes.webp"
                  alt="ChatGPT Ads pour les PME romandes : commerces, restaurants, services locaux, tourisme et formation, les secteurs qui fonctionnent à Genève et en Suisse romande en 2026"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </SectionReveal>
          </div>
          <SectionReveal delay={0.1}>
            <SectorsGrid lang="fr" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Méthode ── */}
      <section id="methode" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Méthode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Notre méthode ChatGPT Ads en 5 étapes
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                La même rigueur que sur Google Ads, adaptée aux règles d&apos;OpenAI : le compte vous appartient, la mesure se pose avant la première carte, et rien ne s&apos;engage au-delà du pilote sans un rapport.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <MethodSteps lang="fr" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Tarifs ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-b border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-14">
                <GradTag className="mb-4">Tarifs</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  Tarifs de gestion ChatGPT Ads : clairs, sans commission
                </h2>
                <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                  Votre budget média va 100 % à OpenAI, sur votre compte. DKDP facture uniquement la gestion, et commence toujours par un pilote.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <PricingGrid lang="fr" />
            </SectionReveal>
          </div>
        </section>
      </HeroBg>

      {/* ── Qui pilote ── */}
      <section id="expert" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <ExpertBlock lang="fr" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Données ── */}
      <section id="conformite" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="max-w-3xl mb-12">
              <GradTag className="mb-4">Données</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-5">
                Données, confidentialité et nLPD : ce qui se passe vraiment
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Une question revient à chaque cadrage : « et les conversations de mes clients ? ». Voici les règles d&apos;OpenAI telles qu&apos;elles s&apos;appliquent en Suisse, et ce que DKDP met en place de votre côté.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <ComplianceTiles lang="fr" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Suisse romande ── */}
      <section id="zone" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="relative aspect-[21/9] rounded-[20px] overflow-hidden border border-border mb-12">
              <Image
                src="/images/services/dkdp-chatgpt-ads-suisse-romande-villes.webp"
                alt="ChatGPT Ads Suisse romande : l'arc lémanique de Genève à Montreux, les villes couvertes par l'agence DKDP pour la publicité dans ChatGPT"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <RomandieCoverage lang="fr" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Veille ── */}
      {articles.length > 0 && (
        <section className="py-20 bg-bg-card border-y border-border" aria-labelledby="veille-chatgpt-ads">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <GradTag className="mb-4">Veille</GradTag>
                  <h2 id="veille-chatgpt-ads" className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                    ChatGPT et OpenAI : ce que nous suivons
                  </h2>
                </div>
                <Link href="/blog" className="text-sm text-text-secondary hover:text-text transition-colors">
                  Tous les articles →
                </Link>
              </div>
            </SectionReveal>
            <ArticleCarousel articles={articles} accentColor={color} accentBorder={border} lang="fr" label="Articles sur ChatGPT et OpenAI" />
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ.fr} title="Vos questions sur ChatGPT Ads" />
      </div>

      {/* ── Passerelles ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              Icon: Megaphone,
              kicker: 'Canal complémentaire',
              title: 'Publicité Google Ads',
              text: 'La demande déjà formulée : Search, Display, Performance Max, gérés depuis Genève avec la même règle de zéro commission.',
              href: '/agence-digitale/publicite-sea',
              cta: 'Voir Google Ads',
            },
            {
              Icon: Search,
              kicker: 'Sans coût par clic',
              title: 'Référencement SEO et visibilité dans les IA',
              text: 'Être cité dans les réponses de Google et des assistants IA sans payer chaque clic : la présence durable, à côté de la présence achetée.',
              href: '/agence-digitale/seo',
              cta: 'Voir le SEO',
            },
          ].map((b) => (
            <SectionReveal key={b.href}>
              <Link
                href={b.href}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-7 border transition-all hover:-translate-y-0.5 duration-200 h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.03) 100%)',
                  borderColor: 'rgba(124,58,237,0.28)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0" style={{ background: bg, border: `1px solid ${border}` }}>
                    <b.Icon size={20} style={{ color }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>{b.kicker}</p>
                    <p className="text-text font-bold text-lg leading-tight">{b.title}</p>
                    <p className="text-text-muted text-[12.5px] mt-1 max-w-md">{b.text}</p>
                  </div>
                </div>
                <span
                  className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                  style={{ background: bg, color, border: `1px solid ${border}` }}
                >
                  {b.cta} <ChevronRight size={12} aria-hidden="true" />
                </span>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </section>

      <CTAFinal />
    </main>
  )
}
