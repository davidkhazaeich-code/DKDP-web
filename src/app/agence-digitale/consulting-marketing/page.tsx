import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, ShieldCheck, BarChart2, Clock, Globe2, TrendingUp, Users, Star } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { MarketingAuditScore } from './_components/MarketingAuditScore'
import { violet } from '@/lib/tokens'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))

export const metadata: Metadata = {
  title: 'Consulting Marketing Digital Genève · DKDP',
  description:
    'Consulting marketing digital pour PME à Genève. Audit de présence digitale, stratégie sur mesure et accompagnement. Clarifiez votre cap digital.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/consulting-marketing' },
}


const FAQ = [
  {
    question: 'Qu\'est-ce qu\'un audit de présence digitale ?',
    answer:
      'Un audit de présence digitale analyse l\'ensemble de vos canaux en ligne : site web, SEO, réseaux sociaux, Google Ads, email, et réputation en ligne. DKDP remet un rapport avec une notation par canal, les points de friction prioritaires et un plan d\'actions classé par impact.',
  },
  {
    question: 'Combien coûte un audit ou une mission de consulting chez DKDP ?',
    answer:
      'Un audit marketing complet est facturé CHF 1\'500. L\'accompagnement mensuel démarre à CHF 900 / mois. La Stratégie 360° complète est disponible à CHF 3\'500 / mois. Un premier appel de découverte est gratuit.',
  },
  {
    question: 'À qui s\'adresse le consulting marketing digital ?',
    answer:
      'Aux PME qui veulent se lancer en ligne sans savoir par où commencer. Aux entreprises qui investissent en digital sans voir de résultats. Aux dirigeants qui veulent comprendre leur situation avant de déléguer. Et aux équipes internes qui ont besoin d\'un regard extérieur expert.',
  },
  {
    question: 'Quelle est la différence entre consulting et gestion complète ?',
    answer:
      'Le consulting vous donne la stratégie, les analyses et les recommandations. Vous implémentez vous-même ou avec votre équipe. La gestion complète, c\'est DKDP qui exécute à votre place. Les deux approches peuvent se combiner : audit et stratégie DKDP, exécution en interne.',
  },
  {
    question: 'Travaillez-vous avec des équipes marketing internes ?',
    answer:
      'Oui. DKDP intervient souvent en complément d\'une équipe interne : audit de la situation, formation aux bonnes pratiques, cadrage stratégique ou soutien ponctuel sur des projets spécifiques. On s\'adapte à votre organisation.',
  },
  {
    question: 'Quels livrables reçoit-on d\'une mission de consulting ?',
    answer:
      'Selon la mission : rapport d\'audit avec scores et recommandations, plan stratégique sur 6 ou 12 mois, mapping des canaux et des personas, brief d\'exécution pour chaque initiative, ou présentation pour le comité de direction. Chaque mission se conclut avec un livrable actionnable.',
  },
]

const BENEFITS = [
  {
    Icon: TrendingUp,
    value: '+65%',
    title: 'Plus de leads',
    desc: 'Nos clients génèrent en moyenne 65% de leads supplémentaires dans les 6 premiers mois d\'accompagnement grâce à une stratégie d\'acquisition structurée.',
  },
  {
    Icon: BarChart2,
    value: '6 mois',
    title: 'ROI prouvé',
    desc: 'En 6 mois, vous disposez d\'un tableau de bord complet, de KPIs mesurables et d\'une vision claire sur le retour de votre investissement marketing.',
  },
  {
    Icon: Users,
    value: '95%',
    title: 'Clients fidélisés',
    desc: '95% de nos clients renouvellent leur accompagnement après la première année. La preuve que la méthode fonctionne.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Audit 360°',
    desc: 'Analyse complète de vos canaux actuels, de votre funnel, de vos KPIs et de votre positionnement concurrentiel.',
  },
  {
    step: '02',
    title: 'Stratégie',
    desc: 'Définition des priorités, des canaux à activer et du plan d\'action sur 3 et 12 mois.',
  },
  {
    step: '03',
    title: 'Mise en oeuvre',
    desc: 'Activation des leviers identifiés : SEO, Ads, social, email, contenu. Chaque action est priorisée.',
  },
  {
    step: '04',
    title: 'Mesure & optimisation',
    desc: 'Tableaux de bord en temps réel. Chaque semaine, on analyse, on ajuste, on améliore.',
  },
  {
    step: '05',
    title: 'Coaching & reporting',
    desc: 'Réunion mensuelle avec le décideur. Rapport complet, décisions éclairées, équipe autonome.',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

export default function ConsultingMarketingPage() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildService({ name: 'Consulting Marketing Digital Genève', url: '/agence-digitale/consulting-marketing', description: 'Audit de présence digitale et consulting stratégique pour PME à Genève. Plan d\'actions priorisé et accompagnement.' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: 'Consulting marketing', url: 'https://dkdp.ch/agence-digitale/consulting-marketing' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/agence-digitale" className="text-text-muted text-sm hover:text-white transition-colors">
                Service Digital
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Consulting marketing</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Stratégie digitale · Audit · Genève</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Une stratégie marketing qui génère des{' '}
                  <span className="grad-text--ia">résultats mesurables.</span>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP audite votre présence digitale, définit votre stratégie de croissance et pilote l&apos;exécution mois après mois. Pas de rapport de 50 pages : des KPIs, des actions et des résultats prouvés en 6 mois.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=service-digital" size="lg">Appel découverte gratuit →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-white transition-colors">
                    Notre méthode ↓
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}>
                  <Image
                    src="/images/services/dkdp-agence-consulting.webp"
                    alt="Consulting marketing digital à Genève par DKDP"
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
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '+65%', l: 'Leads générés', sub: 'Gain moyen à 6 mois' },
              { v: '10 ans', l: "D'expertise", sub: 'B2B & B2C Suisse' },
              { v: '95%', l: 'Clients renouvellent', sub: 'Après première année' },
              { v: '6 mois', l: 'ROI mesurable', sub: 'Délai moyen constaté' },
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
      <div className="sticky top-14 z-30 border-b border-zinc-800 bg-[rgba(9,9,11,0.92)] backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between gap-2">
            <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-none" aria-label="Navigation sections">
              {[
                { label: 'Notre approche', href: '#approche' },
                { label: 'Résultats', href: '#resultats' },
                { label: 'Tarifs', href: '#tarifs' },
                { label: 'Processus', href: '#process' },
                { label: 'Témoignages', href: '#temoignages' },
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
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Notre approche</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Un regard extérieur qui fait la différence.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Quand on gère son propre marketing au quotidien, on a du mal à voir ce qui bloque. DKDP apporte un regard neuf, des données concrètes et une expérience sur plus de 150 projets pour pointer exactement où se perdent vos opportunités.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Le consulting DKDP est pragmatique : on finit toujours par un plan d&apos;actions classé par priorité, avec des estimations de ressources et de délais. Vous savez exactement quoi faire, dans quel ordre, et pourquoi.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Audit marketing complet (acquisition, conversion, rétention)',
                  'Définition de la stratégie de croissance sur 12 mois',
                  'Mise en place des KPIs et tableaux de bord',
                  'Optimisation du funnel de vente',
                  'Stratégie d\'acquisition multi-canal (SEO, Ads, Social, Email)',
                  'Plan de contenu et stratégie éditoriale',
                  'Formation des équipes marketing internes',
                  'Accompagnement mensuel et ajustements en temps réel',
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

      {/* ── Insight / problème ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Le vrai problème</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                La plupart des PME investissent sans stratégie définie.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Sans audit ni cap clair, chaque euro dépensé en marketing est un pari. DKDP mesure l&apos;écart entre votre situation actuelle et votre potentiel réel sur chaque levier de croissance.
              </p>
              <div className="space-y-4">
                {[
                  { title: '74% des PME suisses n\'ont pas de stratégie digitale documentée', sub: 'Source : étude EY / Fédération des PME' },
                  { title: '60% des budgets marketing sont gaspillés sur des canaux non mesurés', sub: 'Source : McKinsey Marketing Analytics Report' },
                  { title: 'Un funnel non optimisé perd en moyenne 70% des prospects avant le premier contact', sub: 'Source : HubSpot State of Marketing' },
                ].map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-3 items-start">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-[8px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <TrendingUp size={16} style={{ color }} />
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
                  Scores par pilier marketing
                </p>
                <MarketingAuditScore />
                <p className="text-text-muted text-[11px] text-center mt-6">
                  Scores moyens mesurés sur nos clients avant et après 6 mois d&apos;accompagnement DKDP.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Bénéfices ── */}
      <section id="resultats" className="py-24 scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
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

      {/* ── Offres ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des tarifs clairs, un engagement flexible.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Chaque prestation est documentée et validée avant démarrage. Sans engagement annuel sur les formules mensuelles.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Audit Marketing',
                price: 'CHF 1\'500',
                duration: 'prestation unique',
                features: [
                  'Audit acquisition + conversion + rétention',
                  'Analyse de la concurrence',
                  'Rapport de priorités',
                  'Roadmap 12 mois',
                  'Présentation des recommandations',
                ],
                cta: 'Demander un audit',
                highlight: false,
              },
              {
                label: 'Accompagnement Mensuel',
                price: 'CHF 900 / mois',
                duration: 'Le plus demandé',
                features: [
                  'Audit initial inclus',
                  'Stratégie marketing mensuelle',
                  'Suivi des KPIs hebdomadaire',
                  '1 action prioritaire / mois implémentée',
                  'Coaching équipe marketing',
                  'Rapport mensuel + recommandations',
                ],
                cta: 'Démarrer l\'accompagnement',
                highlight: true,
              },
              {
                label: 'Stratégie 360°',
                price: 'CHF 3\'500 / mois',
                duration: 'Pilotage complet',
                features: [
                  'Pilotage complet du marketing',
                  'Tous canaux (SEO + Ads + Social + Email)',
                  'Production de contenu incluse',
                  'Équipe marketing externalisée',
                  'Reporting exécutif hebdomadaire',
                  'Accès prioritaire directeur associé',
                ],
                cta: 'Discutons de votre projet',
                highlight: false,
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
                      {offer.cta} <ChevronRight size={14} />
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
      <section id="process" className="py-24 bg-bg-card border-y border-border scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Méthode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Comment se déroule une mission de consulting.
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

      {/* ── Témoignages ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="temoignages" className="py-24 scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Témoignages</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des résultats, pas des promesses.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'DKDP a cartographié tout notre funnel en 2 semaines. On a découvert qu\'on perdait 60% de nos leads entre le premier contact et le devis. C\'est maintenant corrigé.',
                author: 'Directeur général, cabinet de conseil B2B',
                location: 'Genève',
              },
              {
                quote: 'Avant l\'accompagnement, on faisait du marketing en aveugle. Maintenant on a des dashboards, des KPIs et une vraie stratégie. Notre CA a augmenté de 40% en 8 mois.',
                author: 'Fondatrice, agence communication',
                location: 'Lausanne',
              },
              {
                quote: 'DKDP nous a évité 3 erreurs stratégiques coûteuses en nous apportant un regard externe. L\'investissement dans le consulting a été rentabilisé en 2 mois.',
                author: 'DG, PME industrielle',
                location: 'Vaud',
              },
            ].map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.1}>
                <div
                  className="flex flex-col gap-5 p-7 rounded-[16px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={13} fill={color} style={{ color }} />
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.author}</p>
                    <p className="text-text-muted text-xs mt-0.5">{t.location}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Engagements ── */}
      <section className="py-24 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Nos engagements
              </p>
              <div className="relative">
                <div aria-hidden="true" className="hidden lg:block absolute left-0 right-0 h-px top-[52px] pointer-events-none"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.20) 5%, #A78BFA 50%, rgba(124,58,237,0.20) 95%, transparent)' }} />
                <div className="relative z-[1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { Icon: ShieldCheck, title: 'Stratégie documentée', desc: 'Vous recevez un document de stratégie complet après chaque phase. Tout est écrit, pas verbal : vous gardez la connaissance.' },
                    { Icon: BarChart2, title: 'KPIs définis ensemble', desc: 'Les indicateurs de succès sont définis avec vous avant de démarrer. Vous savez exactement comment mesurer la réussite.' },
                    { Icon: Clock, title: 'Résultats en 30 jours', desc: 'Les premières actions sont en place dans les 30 premiers jours. Pas de mois 1 de "réflexion" : on démarre le travail immédiatement.' },
                    { Icon: Globe2, title: 'Flexibilité totale', desc: 'Accompagnement mensuel sans engagement annuel. Si les résultats ne sont pas au rendez-vous, vous pouvez partir. On préfère l\'excellence à la rétention contractuelle.' },
                  ].map((g) => (
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
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[112px]">
        <FAQSection items={FAQ} title="Vos questions sur le consulting marketing" />
      </div>

      {/* ── Bridge SEO ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/agence-digitale/publicite-sea"
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
                  <TrendingUp size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Étape suivante</p>
                  <p className="text-white font-bold text-lg leading-tight">Publicité Google Ads</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Votre stratégie est définie. Pour activer rapidement l&apos;acquisition payante, découvrez notre gestion de campagnes Google Ads.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir les Ads <ChevronRight size={12} />
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
