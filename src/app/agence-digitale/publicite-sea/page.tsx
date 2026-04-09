import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
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
  Star,
  Search,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { AdComparison } from './_components/AdComparison'
import { violet } from '@/lib/tokens'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))

export const metadata: Metadata = {
  title: 'Publicité Google Ads Genève · Campagnes SEA · DKDP',
  description:
    'Agence Google Ads à Genève. Campagnes Search et Display rentables, avec suivi précis du ROI. Résultats dès la première semaine.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/publicite-sea' },
}


const FAQ = [
  {
    question: 'Quel budget Google Ads prévoir pour une PME à Genève ?',
    answer:
      'Le budget minimum recommandé est CHF 500/mois en dépenses publicitaires. Pour un marché concurrentiel (avocat, immobilier, dentiste), CHF 1\'000 à CHF 3\'000/mois est plus réaliste. DKDP ne prend pas de commission sur votre budget : vous payez uniquement la gestion stratégique.',
  },
  {
    question: 'Combien coûte la gestion de campagnes Google Ads chez DKDP ?',
    answer:
      'Les frais de gestion démarrent à CHF 350/mois pour une campagne simple. Un compte multi-campagnes (Search + Display + Remarketing) est facturé entre CHF 600 et CHF 1\'200/mois selon la complexité. Premier mois avec audit et mise en place inclus.',
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
    value: '-32%',
    title: 'CPA en baisse continue',
    desc: 'En moyenne, nos clients réduisent leur coût par acquisition de 32% dans les 3 premiers mois grâce à l\'optimisation systématique.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Audit & benchmark',
    desc: 'Analyse du compte existant ou audit du marché. Mots-clés concurrents, budget optimal, structure recommandée.',
  },
  {
    step: '02',
    title: 'Structure & annonces',
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

const REALISATIONS = [
  {
    client: 'Cabinet comptable B2B',
    type: 'Campagne Search',
    image: '/images/services/dkdp-agence-sea.webp',
    results: ['+340% de leads qualifiés', 'CPA de CHF 185 → CHF 58', 'ROAS 6.2× en 90 jours'],
    tech: 'Google Ads · Search · Extensions',
  },
  {
    client: 'Clinique spécialisée',
    type: 'Search + Display',
    image: '/images/services/dkdp-agence-creation-web.webp',
    results: ['0 à 40 patients/mois via Ads', 'CTR 5.8% (moyenne secteur: 1.4%)', 'Budget CHF 1\'200/mois, CA +220k'],
    tech: 'Google Ads · Display · Call Tracking',
  },
  {
    client: 'E-commerce lifestyle',
    type: 'Shopping + Performance Max',
    image: '/images/services/dkdp-agence-reseaux-sociaux.webp',
    results: ['ROAS 8.1× sur Shopping', '+180% chiffre d\'affaires Q4', 'Taux conversion 4.2% vs 1.1%'],
    tech: 'Google Shopping · Performance Max · GA4',
  },
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
    title: 'Résultats sous 48h',
    desc: 'Les campagnes sont actives sous 48h après validation. Vous voyez les premières données dès la première semaine.',
  },
  {
    Icon: Globe2,
    title: 'Contrat mensuel',
    desc: 'Pas d\'engagement 12 mois. Contrat mensuel résiliable avec 30 jours de préavis. La performance justifie la relation.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'Avant DKDP, on dépensait CHF 2\'500/mois en Ads avec 3 leads par mois. Maintenant on a 18 leads pour CHF 1\'800. La différence c\'est la gestion.',
    author: 'Directeur commercial, PME B2B, Genève',
  },
  {
    quote: 'Le suivi des conversions qu\'ils ont mis en place nous a permis de voir exactement d\'où venaient nos clients. On a pu couper 30% du budget inutile.',
    author: 'Fondatrice, boutique en ligne, Lausanne',
  },
  {
    quote: 'On avait essayé de gérer nos Ads en interne. On perdait de l\'argent sans le savoir. DKDP a multiplié notre ROAS par 3 en moins de 2 mois.',
    author: 'Gérant, clinique dentaire, Genève',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

export default function PubliciteSEAPage() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildService({ name: 'Publicité Google Ads Genève', url: '/agence-digitale/publicite-sea', description: 'Gestion de campagnes Google Ads pour PME à Genève. Search, Display et remarketing avec suivi ROI précis.' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: 'Publicité Google Ads', url: 'https://dkdp.ch/agence-digitale/publicite-sea' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] px-5">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/agence-digitale" className="text-text-muted text-sm hover:text-white transition-colors">
                Service Digital
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Publicité Google Ads</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Google Ads · SEA · Genève</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Des campagnes Google Ads{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>qui rentabilisent chaque franc.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP gère vos campagnes Google Ads avec une obsession du ROI. Budget 100% dédié au media, gestion transparente sans commission, suivi de chaque conversion. Trafic qualifié dès les premières 48h.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=service-digital" size="lg">Audit Ads gratuit →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-white transition-colors">
                    Notre méthode ↓
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}>
                  <Image
                    src="/images/services/dkdp-agence-sea.webp"
                    alt="Gestion campagnes Google Ads à Genève par DKDP"
                    fill
                    className="object-cover"
                    priority
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '4.2×', l: 'ROAS moyen', sub: 'Retour sur dépense pub' },
              { v: '-32%', l: 'Coût par lead', sub: 'Gain en 90 jours' },
              { v: '48h', l: 'Trafic qualifié', sub: 'Dès le lancement' },
              { v: '0 CHF', l: 'Commission media', sub: 'Budget 100% à Google' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color }}>{s.v}</p>
                  <p className="text-white text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subnav ── */}
      <div className="sticky top-[66px] z-30 px-6 pt-1.5">
        <div className="max-w-[1200px] mx-auto rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] px-5">
          <div className="flex items-center justify-between gap-2">
            <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-none" aria-label="Navigation sections">
              {[
                { label: 'Notre approche', href: '#approche' },
                { label: 'Résultats', href: '#resultats' },
                { label: 'Tarifs', href: '#tarifs' },
                { label: 'Processus', href: '#process' },
                { label: 'Réalisations', href: '#realisations' },
                { label: 'FAQ', href: '#faq' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold text-text-muted hover:text-white transition-colors duration-150 whitespace-nowrap"
                >
                  {label}
                </a>
              ))}
            </nav>
            <Link
              href="/contact"
              className="flex-shrink-0 hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-bold transition-opacity hover:opacity-80"
              style={{ background: 'rgba(124,58,237,0.18)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.30)' }}
            >
              Prendre contact
            </Link>
          </div>
        </div>
      </div>

      {/* ── Notre approche ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Notre approche</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Pas de dépenses inutiles. Que du résultat.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La plupart des comptes Google Ads des PME saignent du budget sur des mots-clés hors cible, des annonces non testées et un suivi des conversions mal configuré. DKDP commence toujours par corriger ces fuites avant d&apos;augmenter le budget.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Votre compte Ads vous appartient. Vous avez accès à tout à tout moment. DKDP ne prend pas de commission sur votre budget media : chaque franc publicitaire va directement à Google.
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
        <div className="max-w-[1200px] mx-auto rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Le vrai problème</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Votre budget part à la poubelle sans que vous le sachiez.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Un compte Google Ads mal configuré perd entre 40% et 60% de son budget sur des clics non qualifiés, des mots-clés trop larges et des pages de destination qui ne convertissent pas. Ce n&apos;est pas visible dans votre tableau de bord par défaut.
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
                        <p className="text-white text-sm font-semibold leading-snug">{item.title}</p>
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
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Métriques réelles sur compte client géré par DKDP. Résultats obtenus en 90 jours.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Bénéfices ── */}
      <section id="resultats" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] px-5">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Résultats</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que vous gagnez concrètement.
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
                  <h3 className="text-white font-bold text-lg">{b.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">{b.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="py-16 border-y border-border">
        <div className="max-w-[1200px] mx-auto rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] px-5">
          <SectionReveal>
            <p className="text-[11px] font-bold uppercase tracking-widest text-center mb-10" style={{ color }}>
              Ce que disent nos clients
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.08}>
                <div
                  className="flex flex-col gap-4 p-6 rounded-[16px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-[11px] font-semibold" style={{ color }}>{t.author}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offres ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] px-5">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des tarifs clairs, sans commission cachée.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Votre budget publicitaire va 100% à Google. DKDP facture uniquement la gestion stratégique, sans surprise.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Campagne Starter',
                price: 'CHF 350/mois',
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
                  'SLA 24h garanti',
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
                    <p className="text-white font-bold text-xl mb-1">{offer.label}</p>
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
        <div className="max-w-[1200px] mx-auto rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] px-5">
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
                  <h3 className="text-white font-semibold text-sm">{p.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Réalisations ── */}
      <section id="realisations" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] px-5">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Réalisations</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des résultats, pas des promesses.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {REALISATIONS.map((r, i) => (
              <SectionReveal key={r.client} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{ borderColor: border }}
                >
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={r.image}
                      alt={r.client}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg/80" />
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', color, border: `1px solid ${border}` }}
                    >
                      {r.type}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1" style={{ background: bg }}>
                    <p className="text-white font-bold mb-4">{r.client}</p>
                    <div className="space-y-2 flex-1">
                      {r.results.map((res) => (
                        <div key={res} className="flex items-center gap-2">
                          <Star size={11} style={{ color }} className="flex-shrink-0" />
                          <span className="text-white text-sm font-semibold">{res}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-text-muted text-[11px] mt-4 font-mono">{r.tech}</p>
                  </div>
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
                    <p className="text-white font-bold text-sm mb-2">{g.title}</p>
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

      {/* ── Bridge SEO ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] px-5">
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
                  <p className="text-white font-bold text-lg leading-tight">Référencement SEO</p>
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
