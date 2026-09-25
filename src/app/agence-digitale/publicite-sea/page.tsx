import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { PRIX, chf, chfMois } from '@/data/pricing'
import {
  CheckCircle2,
  Zap,
  PieChart,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  BarChart2,
  Clock,
  Globe2,

  Search,
  Target,
  Sparkles,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { TrustLine } from '@/components/ui/TrustLine'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { AdComparison } from './_components/AdComparison'
import { HeroVisual } from './_components/HeroVisual'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { violet } from '@/lib/tokens'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))

export const metadata: Metadata = {
  // 21/09/2026 (plan SEO, D08) : title 558 px, description 797 px sans prix ;
  // dashboard fictif, ROAS 4,2x, -32 %, temoignages anonymes et « SLA 24h » retires.
  title: 'Agence Google Ads & SEA Genève & Suisse romande · DKDP',
  description:
    'Agence SEA à Genève : audit et gestion de vos campagnes Google Ads pour PME romandes, budget maîtrisé, rapport mensuel.',
  alternates: {
    canonical: 'https://dkdp.ch/agence-digitale/publicite-sea',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/publicite-sea',
      en: 'https://dkdp.ch/en/digital-agency/google-ads',
      'x-default': 'https://dkdp.ch/agence-digitale/publicite-sea',
    },
  },
  openGraph: {
    images: [{ url: '/images/og/publicite-sea.png', width: 1376, height: 768, alt: 'Google Ads publicité SEA Genève DKDP' }],
  },
}


// 25/09/2026 : budget minimum et frais de gestion lus dans src/data/pricing
// (PRIX.adsBudgetMin, PRIX.adsManagementFrom). La gestion « dès CHF 350/mois »
// contredisait PRIX.adsManagementFrom et la barre de stats de la page.
const FAQ = [
  {
    question: 'Quel budget Google Ads prévoir pour une PME à Genève ?',
    answer:
      `Le budget minimum recommandé est ${chfMois(PRIX.adsBudgetMin)} en dépenses publicitaires. Pour un marché concurrentiel (avocat, immobilier, dentiste), CHF 1'000 à CHF 3'000/mois est plus réaliste. DKDP ne prend pas de commission sur votre budget : vous payez uniquement la gestion stratégique.`,
  },
  {
    question: 'Combien coûte la gestion de campagnes Google Ads chez DKDP ?',
    answer:
      `Les frais de gestion démarrent à ${chfMois(PRIX.adsManagementFrom)} pour une campagne simple. Un compte multi-campagnes (Search + Display + Remarketing) est facturé entre CHF 600 et CHF 1'200/mois selon la complexité. Premier mois avec audit et mise en place inclus.`,
  },
  {
    question: 'Quand verrai-je des résultats avec Google Ads ?',
    answer:
      'Google Ads génère du trafic dès l\'activation des campagnes, généralement sous 24 à 48h. Les premières conversions apparaissent dans la première semaine. L\'optimisation des coûts et du ROI se fait sur les 4 à 8 premières semaines.',
  },
  {
    question: 'Quelle est la différence entre Search Ads et Display Ads ?',
    answer:
      'Les Search Ads apparaissent dans les résultats Google quand quelqu\'un cherche votre service. Les Display Ads sont des bannières sur des sites partenaires Google. Search cible une demande existante ; Display crée de la notoriété. DKDP recommande souvent une combinaison des deux.',
  },
  {
    question: 'DKDP prend-il une commission sur mon budget publicitaire ?',
    answer:
      'Non. DKDP facture uniquement ses prestations de gestion. Votre budget publicitaire va directement sur votre compte Google Ads, que vous possédez. Vous avez accès complet à votre compte à tout moment.',
  },
  {
    question: 'Peut-on cibler uniquement Genève et la Suisse romande ?',
    answer:
      'Oui. Google Ads permet un ciblage géographique très précis : ville, rayon autour d\'une adresse, canton, ou zone personnalisée. DKDP configure le ciblage pour maximiser la pertinence de vos annonces sur votre zone de chalandise.',
  },
  {
    question: 'Comment mesure-t-on le ROI d\'une campagne Google Ads ?',
    answer:
      'DKDP configure le suivi des conversions (appels, formulaires, achats) dès le départ. Vous voyez exactement combien chaque lead ou vente vous coûte. Le rapport mensuel inclut le coût par acquisition, le ROAS (retour sur dépense publicitaire) et les recommandations d\'optimisation.',
  },
]

const BENEFITS = [
  {
    Icon: Zap,
    value: '48h',
    title: 'Trafic immédiat',
    desc: 'Vos annonces sont actives sous 48h après le lancement. Pas d\'attente, pas d\'algorithme à nourrir : vous êtes visibles dès la mise en ligne.',
  },
  {
    Icon: PieChart,
    value: 'CHF/lead',
    title: 'ROI parfaitement mesuré',
    desc: 'Chaque franc publicitaire est tracké. Vous connaissez précisément votre coût par lead, appel et vente. Aucune dépense fantôme.',
  },
  {
    Icon: TrendingUp,
    value: 'Hebdo',
    title: 'CPA suivi chaque semaine',
    desc: 'Termes de recherche, exclusions, enchères et annonces sont relus chaque semaine : le coût par lead se pilote, il ne se constate pas en fin de mois.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Audit & benchmark',
    desc: 'Analyse du compte existant ou audit du marché. Mots-clés concurrents, budget optimal, structuré recommandée.',
  },
  {
    step: '02',
    title: 'structuré & annonces',
    desc: 'Création des groupes d\'annonces, textes optimisés A/B, extensions. Suivi conversions configuré.',
  },
  {
    step: '03',
    title: 'Lancement contrôlé',
    desc: 'Mise en ligne des campagnes, surveillance des 48 premières heures, ajustements immédiats.',
  },
  {
    step: '04',
    title: 'Optimisation continue',
    desc: 'Analyse hebdomadaire, ajustement des enchères et mots-clés négatifs, amélioration du Quality Score.',
  },
  {
    step: '05',
    title: 'Reporting & insights',
    desc: 'Rapport mensuel complet : ROAS, CPA, impressions, clics, recommandations stratégiques.',
  },
]

/**
 * Ce qu'on regarde vraiment dans un compte (remplace les trois cas fictifs
 * retires le 21/09/2026). C'est la grille du workflow google-ads-audit-compte.
 */
const METHODE_AUDIT = [
  { title: 'Conversions', desc: 'Quelles actions comptent, lesquelles sont mortes ou doublonnent, et si l\'enchère automatique optimise sur un signal réel.' },
  { title: 'Termes de recherche', desc: 'Les requêtes qui ont réellement déclenché vos annonces sur 90 jours, celles qui coûtent sans convertir, les exclusions à poser.' },
  { title: 'Structure', desc: 'Campagnes, groupes et correspondances : un mot-clé gagnant ne se déplace pas, un groupe fourre-tout se scinde.' },
  { title: 'Annonces et extensions', desc: 'Titres alignés sur la requête, pages de destination qui tiennent la promesse, extensions à jour.' },
  { title: 'Enchères et budget', desc: 'Stratégie adaptée au volume de conversions disponible, plafonds de CPC, répartition par appareil et par zone.' },
  { title: 'Mesure', desc: 'GA4, balises et import des conversions vérifiés en réel, dans un navigateur propre, avant toute conclusion.' },
]

const ENGAGEMENTS = [
  {
    Icon: ShieldCheck,
    title: 'Zéro commission media',
    desc: 'Votre budget publicitaire va 100% à Google. DKDP ne perçoit aucune commission sur les dépenses media.',
  },
  {
    Icon: BarChart2,
    title: 'Reporting transparent',
    desc: 'Accès complet à votre compte à tout moment. Rapport mensuel avec toutes les métriques, sans filtre.',
  },
  {
    Icon: Clock,
    title: 'Campagnes actives sous 48h',
    desc: 'Une fois les annonces validées par Google, les campagnes tournent sous 48h. Les premières données arrivent dès la première semaine, les premières décisions aussi.',
  },
  {
    Icon: Globe2,
    title: 'Contrat mensuel',
    desc: 'Pas d\'engagement 12 mois. Contrat mensuel résiliable avec 30 jours de préavis. La performance justifie la relation.',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

export default function PubliciteSEAPage() {
  return (
    <main>
      <SchemaOrg schema={buildServiceWithLocalBusiness({ name: 'Agence SEA et Google Ads Genève et Suisse romande', url: '/agence-digitale/publicite-sea', description: 'Audit et gestion de campagnes Google Ads pour PME à Genève et en Suisse romande : Search, Performance Max, remarketing, budget maîtrisé, rapport mensuel.', serviceType: 'Gestion de campagnes Google Ads (SEA)', priceFrom: PRIX.adsManagementFrom, priceSpecDescription: `Gestion à partir de ${chfMois(PRIX.adsManagementFrom)}, budget média en sus` })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: 'Publicité Google Ads', url: 'https://dkdp.ch/agence-digitale/publicite-sea' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/agence-digitale" className="text-text-muted text-sm hover:text-text transition-colors">
                Service Digital
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Publicité Google Ads</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Agence SEA & Google Ads Genève & Suisse romande</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Chaque franc investi, <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>mesuré</GradText>. Chaque lead, <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>compté</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  Agence SEA spécialisée pour les PME en Suisse romande. DKDP gère vos campagnes Google Ads avec une obsession du ROI. Budget 100% dédié au media, gestion transparente sans commission, suivi de chaque conversion. Trafic qualifié dès les premières 48h.
                </p>
                <HeroPills
                  items={[
                    { label: 'Sans engagement', Icon: CheckCircle2 },
                    { label: 'Suivi hebdomadaire', Icon: BarChart2 },
                    { label: 'Optimisation budget garantie', Icon: Target },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=service-digital" size="lg">Audit Ads gratuit →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-text transition-colors">
                    Notre méthode ↓
                  </Link>
                </div>
              </div>
              <HeroVisual />
            </div>
          </div>
        </section>
      </HeroBg>


      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: `dès ${chf(PRIX.adsManagementFrom)}`, l: 'Gestion par mois', sub: 'Budget média en sus' },
              { v: 'Mensuel', l: 'Rapport', sub: 'Coût par lead, termes, décisions' },
              { v: '48h', l: 'Trafic qualifié', sub: 'Dès le lancement' },
              { v: '0 CHF', l: 'Commission media', sub: 'Budget 100% à Google' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color }}>{s.v}</p>
                  <p className="text-text text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>


      <LogoBanner />
      {/* ── Subnav ── */}
      <ScrollSpyNav
        items={[
          { label: 'Notre approche', href: '#approche' },
          { label: 'Résultats', href: '#résultats' },
          { label: 'Tarifs', href: '#tarifs' },
          { label: 'Processus', href: '#process' },
          { label: 'Méthode', href: '#realisations' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Prendre contact', href: '/contact' }}
        accentColor="#A78BFA"
        accentBg="rgba(124,58,237,0.18)"
        accentBorder="rgba(124,58,237,0.30)"
      />

      {/* ── Notre approche ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Notre approche</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Notre approche SEA : zéro dépense inutile, que du résultat
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La plupart des comptes Google Ads des PME saignent du budget sur des mots-clés hors cible, des annonces non testées et un suivi des conversions mal configuré. DKDP commence toujours par corriger ces fuites avant d&apos;augmenter le budget.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Votre compte Ads vous appartient. Vous avez accès à tout à tout moment. DKDP ne prend pas de commission sur votre budget media : chaque franc publicitaire va directement à Google. Découvrez notre comparatif <Link href="/blog/seo-vs-google-ads-geneve" className="underline hover:text-text transition-colors">SEO vs Google Ads : que choisir à Genève ?</Link>
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Campagnes Google Search (mots-clés acheteurs)',
                  'Google Display et remarketing',
                  'Performance Max / Shopping',
                  'Suivi précis des conversions (appels, formulaires)',
                  'Tests A/B en continu sur les annonces',
                  'Ciblage géographique Genève / Suisse romande',
                  'Reporting mensuel détaillé',
                  'Accès complet à votre compte Ads',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Le vrai problème ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Le vrai problème</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Publicité Google mal gérée : votre budget part à la poubelle
              </h2>
              {/* 25/09/2026 : « entre 40% et 60% de son budget » retiré, statistique sans source. */}
              <p className="text-text-secondary leading-relaxed mb-6">
                Un compte Google Ads mal configuré perd une part importante de son budget sur des clics non qualifiés, des mots-clés trop larges et des pages de destination qui ne convertissent pas. Ce n&apos;est pas visible dans votre tableau de bord par défaut.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: Clock, title: '76% des PME n\'ont pas de suivi des conversions correctement configuré', sub: 'Source : Google Partner insights 2024' },
                  { Icon: TrendingUp, title: 'Le Quality Score peut diviser ou multiplier votre CPC par 3 selon la pertinence', sub: 'Source : Google Ads documentation' },
                  { Icon: Search, title: 'Les 3 premiers résultats payants captent 46% des clics sur les requêtes commerciales', sub: 'Source : WordStream, 2024' },
                ].map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-3 items-start">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-[8px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <item.Icon size={16} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-text text-sm font-semibold leading-snug">{item.title}</p>
                        <p className="text-text-muted text-[11px] mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-5 md:p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(124,58,237,0.08)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Avant / Après optimisation DKDP
                </p>
                <AdComparison />
                {/* 25/09/2026 : « Métriques réelles sur compte client, résultats obtenus en 90 jours » retiré, aucune source. */}
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Les trois leviers que DKDP corrige en priorité sur un compte existant.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Bénéfices ── */}
      <section id="résultats" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Résultats</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Résultats concrets de vos campagnes Google Ads
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <SectionReveal key={b.title} delay={i * 0.1}>
                <div className="flex flex-col gap-4 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <b.Icon size={22} style={{ color }} />
                  </div>
                  <div className="text-3xl font-bold" style={{ color }}>{b.value}</div>
                  <h3 className="text-text font-bold text-lg">{b.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">{b.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offres ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Tarifs agence SEA : clairs, sans commission cachée
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Votre budget publicitaire va 100% à Google. DKDP facture uniquement la gestion stratégique, sans surprise.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Campagne Starter',
                // 25/09/2026 : « CHF 350/mois » contredisait PRIX.adsManagementFrom.
                price: chfMois(PRIX.adsManagementFrom),
                duration: 'Gestion mensuelle',
                highlight: false,
                features: [
                  '1 campagne Search',
                  'Jusqu\'à CHF 2\'000 budget/mois',
                  'Suivi des conversions',
                  'Rapport mensuel',
                  'Accès compte complet',
                ],
              },
              {
                label: 'Multi-Campagnes',
                price: 'CHF 700/mois',
                duration: 'Le plus demandé',
                highlight: true,
                features: [
                  'Search + Display + Remarketing',
                  'Budget illimité',
                  'Tests A/B annonces',
                  'Rapport hebdo + mensuel',
                  'Optimisation des enchères IA',
                  'Support prioritaire',
                ],
              },
              {
                label: 'Full Ads Management',
                price: 'CHF 1\'200/mois',
                duration: 'Comptes complexes',
                highlight: false,
                features: [
                  'Tous types de campagnes',
                  'Performance Max + Shopping',
                  'Audience custom + lookalike',
                  'Stratégie multi-canal',
                  'Réunion mensuelle + deck',
                  'Réponse sous 1 jour ouvré',
                ],
              },
            ].map((offer, i) => (
              <SectionReveal key={offer.label} delay={i * 0.1}>
                <div
                  className="relative flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{
                    borderColor: offer.highlight ? color : border,
                    boxShadow: offer.highlight ? `0 0 40px rgba(124,58,237,0.15)` : 'none',
                  }}
                >
                  {offer.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: color }} />
                  )}
                  <div className="p-7 flex flex-col flex-1" style={{ background: offer.highlight ? bg : 'transparent' }}>
                    {offer.highlight && (
                      <span
                        className="inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                        style={{ background: bg, color, border: `1px solid ${border}` }}
                      >
                        Le plus demandé
                      </span>
                    )}
                    <p className="text-text font-bold text-xl mb-1">{offer.label}</p>
                    <p className="text-2xl font-bold mb-1" style={{ color }}>{offer.price}</p>
                    <p className="text-text-muted text-xs mb-6">{offer.duration}</p>
                    <div className="space-y-2.5 flex-1">
                      {offer.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                          <span className="text-text-secondary text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact?service=service-digital"
                      className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all hover:opacity-80"
                      style={{
                        background: offer.highlight ? color : bg,
                        color: offer.highlight ? '#000' : color,
                        border: `1px solid ${border}`,
                      }}
                    >
                      Demander un devis <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Process ── */}
      <section id="process" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Méthode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                De l&apos;audit au trafic en 5 étapes.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS.map((p, i) => (
              <SectionReveal key={p.step} delay={i * 0.08}>
                <div className="flex flex-col gap-3 p-5 bg-bg rounded-[14px] border border-border h-full">
                  <div className="text-[11px] font-bold tracking-widest" style={{ color }}>{p.step}</div>
                  <h3 className="text-text font-semibold text-sm">{p.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Méthode d'audit ── */}
      <section id="realisations" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Méthode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce qu&apos;on audite avant de toucher à une enchère.
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                Un compte Google Ads se lit dans ses données, pas dans son interface. Six contrôles, dans cet ordre, avant la première modification.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {METHODE_AUDIT.map((m, i) => (
              <SectionReveal key={m.title} delay={i * 0.08}>
                <div className="flex flex-col h-full rounded-[16px] border p-6" style={{ background: bg, borderColor: border }}>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color }}>0{i + 1}</p>
                  <p className="text-text font-bold mb-2">{m.title}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{m.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Engagements */}
          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Nos engagements
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ENGAGEMENTS.map((g) => (
                  <div key={g.title} className="text-center">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[10px] mx-auto mb-4"
                      style={{ background: 'rgba(124,58,237,0.12)', border: `1px solid ${border}` }}
                    >
                      <g.Icon size={22} style={{ color }} />
                    </div>
                    <p className="text-text font-bold text-sm mb-2">{g.title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{g.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Vos questions sur Google Ads" />
      </div>

      {/* ── Bridge ChatGPT Ads (canal ouvert aux entreprises suisses le 31.08.2026) ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/agence-digitale/chatgpt-ads"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.03) 100%)',
                borderColor: 'rgba(124,58,237,0.28)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Sparkles size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Nouveau canal</p>
                  <p className="text-text font-bold text-lg leading-tight">Publicité ChatGPT Ads</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    ChatGPT affiche des annonces en Suisse depuis le 24 août 2026. Cartes sponsorisées sous les réponses, pilote de 30 jours, même règle de zéro commission.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir ChatGPT Ads <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── Bridge SEO ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/agence-digitale/seo"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.03) 100%)',
                borderColor: 'rgba(124,58,237,0.28)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Search size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Étape suivante</p>
                  <p className="text-text font-bold text-lg leading-tight">Référencement SEO</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Vos annonces apportent du trafic immédiat. Pour une présence durable sur Google sans frais par clic, découvrez notre stratégie SEO.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir le SEO <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal />
    </main>
  )
}
