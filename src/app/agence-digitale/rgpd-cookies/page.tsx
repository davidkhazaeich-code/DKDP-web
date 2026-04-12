import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, ShieldCheck, BarChart2, Clock, Globe2, Zap, AlertTriangle, Lock, Star } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { ComplianceGap } from './_components/ComplianceGap'
import { HeroVisual } from './_components/HeroVisual'
import { violet } from '@/lib/tokens'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))

export const metadata: Metadata = {
  title: 'Mise en conformité RGPD & Cookies à Genève · LPD Suisse · DKDP',
  description:
    'Mise en conformité RGPD et LPD suisse pour PME à Genève. Politique de confidentialité, bandeau cookies, registre des traitements. Protection juridique complète.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/rgpd-cookies' },
}

const FAQ = [
  {
    question: 'Mon site web est-il obligatoirement soumis au RGPD en Suisse ?',
    answer:
      'Si votre site est visité par des personnes résidant en UE ou si vous traitez des données personnelles de citoyens européens, le RGPD s\'applique même si vous êtes basé en Suisse. La LPD suisse (Loi sur la protection des données) s\'applique, elle, à toutes les entreprises suisses. DKDP vous aide à respecter les deux.',
  },
  {
    question: 'Qu\'est-ce que la LPD et en quoi diffère-t-elle du RGPD ?',
    answer:
      'La LPD (nLPD révisée en vigueur depuis septembre 2023) est la loi suisse de protection des données. Elle est proche du RGPD mais comporte des différences : pas d\'obligation de désigner un DPO dans tous les cas, registre des activités de traitement requis, sanctions différentes. Une conformité RGPD assure en grande partie la conformité LPD.',
  },
  {
    question: 'Que doit contenir un bandeau de cookies conforme ?',
    answer:
      'Un bandeau conforme doit informer clairement de l\'utilisation des cookies, demander un consentement explicite et granulaire (par catégorie), permettre de refuser aussi facilement qu\'accepter, et permettre de modifier ses préférences à tout moment. DKDP implémente des solutions conformes à ces exigences.',
  },
  {
    question: 'Combien coûte une mise en conformité RGPD chez DKDP ?',
    answer:
      'Un audit de conformité est facturé CHF 800. Le Pack Conformité complet (audit + implémentation + documents) est à CHF 2\'500. Un suivi mensuel est disponible à CHF 350/mois pour les entreprises souhaitant déléguer la veille réglementaire.',
  },
  {
    question: 'Qu\'est-ce qu\'un registre des activités de traitement ?',
    answer:
      'C\'est un document interne qui recense tous les traitements de données personnelles effectués par votre entreprise : formulaires de contact, newsletter, analytics, CRM, etc. Il est obligatoire pour toute entreprise de plus de 250 employés et recommandé pour toutes les autres. DKDP le crée et le documente pour vous.',
  },
  {
    question: 'Mon site utilise Google Analytics. Est-ce conforme au RGPD ?',
    answer:
      'Google Analytics 4 (GA4) avec anonymisation IP et un bandeau de consentement correctement configuré est généralement accepté. DKDP peut configurer GA4 en mode conforme ou vous proposer une alternative respectueuse des données comme Plausible.',
  },
  {
    question: 'Quelles sanctions risque-t-on en cas de non-conformité ?',
    answer:
      'Sous RGPD : jusqu\'à 4% du chiffre d\'affaires mondial annuel ou 20 millions d\'euros. Sous revLPD suisse : jusqu\'à CHF 50\'000 en cas d\'infraction. Au-delà des amendes, la réputation est en jeu. DKDP vous protège avant que ça n\'arrive.',
  },
]

const BENEFITS = [
  {
    Icon: ShieldCheck,
    value: '0 CHF',
    title: 'Zéro amende',
    desc: 'Une fois conforme, vous éliminez le risque d\'amende allant jusqu\'à CHF 50\'000 (LPD suisse) ou 4% du CA mondial (RGPD européen) en cas de contrôle.',
  },
  {
    Icon: Zap,
    value: '48h',
    title: 'Audit express',
    desc: 'L\'audit complet de votre situation est livré sous 48h. Vous savez exactement où vous en êtes et ce qui doit être corrigé en priorité.',
  },
  {
    Icon: Lock,
    value: '100%',
    title: 'Conformité garantie',
    desc: 'Après implémentation, vous disposez d\'un certificat de conformité DKDP. Vous pouvez répondre à toute demande client ou d\'autorité.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Audit initial',
    desc: 'Analyse de votre site, pratiques de collecte, sous-traitants et documents existants. Rapport livré sous 48h.',
  },
  {
    step: '02',
    title: 'Rapport',
    desc: 'Identification de chaque non-conformité avec niveau de risque (critique / important / mineur) et plan d\'action.',
  },
  {
    step: '03',
    title: 'Implémentation',
    desc: 'Mise en place du banner cookies, rédaction des documents légaux, conformité des formulaires.',
  },
  {
    step: '04',
    title: 'Contrats & registres',
    desc: 'Rédaction ou adaptation des contrats de sous-traitance (DPA) et création du registre des traitements.',
  },
  {
    step: '05',
    title: 'Certification & formation',
    desc: 'Remise du certificat de conformité DKDP, formation de l\'équipe et mise en place du suivi annuel.',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

export default function RGPDCookiesPage() {
  return (
    <main>
      <SchemaOrg schema={buildService({ name: 'Mise en conformité RGPD et LPD Genève', url: '/agence-digitale/rgpd-cookies', description: 'Conformité RGPD et revLPD pour PME à Genève. Audit 48h, banner cookies, politique de confidentialité, registre des traitements, certificat de conformité.' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: 'RGPD & Cookies', url: 'https://dkdp.ch/agence-digitale/rgpd-cookies' },
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
              <span className="text-sm" style={{ color }}>RGPD &amp; Cookies</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">RGPD · revLPD suisse · Cookies</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Mise en conformité RGPD et LPD. Rapide, complète,{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>sans risque.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP met votre site et vos pratiques en conformité avec le RGPD européen et la loi suisse revLPD. Audit livré sous 48h, implémentation complète en 5 jours.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=service-digital" size="lg">Demander un audit →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-white transition-colors">
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
              { v: 'CHF 50k', l: 'Amende max LPD', sub: 'Loi suisse revLPD 2023' },
              { v: '72h', l: 'Délai de notification', sub: 'En cas de violation de données' },
              { v: '100%', l: 'Conformité garantie', sub: 'Après notre intervention' },
              { v: '5 jours', l: "Délai d'intervention", sub: 'Du rapport à la mise en place' },
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

      {/* ── Notre approche ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Notre approche</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Une conformité complète, expliquée simplement.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La conformité RGPD n&apos;est pas optionnelle. Mais elle ne doit pas non plus vous bloquer. DKDP prend en charge l&apos;intégralité de la mise en conformité de votre site : audit des traitements, rédaction des documents légaux, et implémentation technique du banner cookies.
              </p>
              <p className="text-text-secondary leading-relaxed">
                On vous explique clairement ce que vous devez faire, pourquoi, et on le met en place pour vous. Pas de jargon juridique inutile : de la conformité concrète et opérationnelle.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Audit de conformité LPD / RGPD complet',
                  'Implémentation du banner de cookies (Axeptio ou Cookiebot)',
                  'Rédaction de la politique de confidentialité',
                  'Registre des activités de traitement',
                  'Mise en conformité des formulaires de contact',
                  'Contrats de sous-traitance (DPA)',
                  'Formation de l\'équipe aux bonnes pratiques',
                  'Suivi et mise à jour annuelle',
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

      {/* ── Insight ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Le vrai problème</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Votre site expose votre entreprise chaque jour sans conformité.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La plupart des PME suisses ne savent pas qu&apos;elles sont en infraction. Un formulaire sans mention légale, un cookie analytics sans consentement, un sous-traitant sans contrat DPA : chacun de ces points peut déclencher une sanction ou une plainte de concurrent.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: AlertTriangle, title: 'CHF 50\'000 d\'amende maximum sous revLPD 2023 en cas d\'infraction intentionnelle', sub: 'Loi fédérale sur la protection des données, entrée en vigueur sept. 2023' },
                  { Icon: AlertTriangle, title: '4% du chiffre d\'affaires mondial ou 20 M€ sous RGPD européen en cas de violation', sub: 'Règlement (UE) 2016/679, applicable si vous avez des clients en UE' },
                  { Icon: AlertTriangle, title: '72h pour notifier les autorités en cas de fuite de données personnelles', sub: 'Délai légal RGPD et revLPD, le non-respect aggrave les sanctions' },
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
                  Sans conformité vs après audit DKDP
                </p>
                <ComplianceGap />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Chaque point non conforme est un risque juridique actif. DKDP les traite tous.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Bénéfices ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Protection</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que la conformité vous apporte concrètement.
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

      {/* ── Offres / Pricing ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="py-24 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des tarifs clairs, une conformité sans surprise.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Chaque prestation est définie avant démarrage. Pas de facturation à l&apos;heure, pas de surprise en cours de mission.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Audit LPD',
                price: 'CHF 800',
                duration: 'Prestation unique',
                highlight: false,
                features: [
                  'Audit de conformité complet',
                  'Identification de toutes les non-conformités',
                  'Rapport documenté avec priorisation',
                  'Roadmap corrective en 5 étapes',
                  'Présentation des risques',
                ],
                cta: 'Commander l\'audit',
              },
              {
                label: 'Pack Conformité',
                price: "CHF 2'500",
                duration: 'Recommandé',
                highlight: true,
                features: [
                  'Audit initial inclus',
                  'Banner cookies conforme (Axeptio/Cookiebot)',
                  'Politique de confidentialité rédigée',
                  'Registre des traitements',
                  'Formulaires mis en conformité',
                  'Contrats DPA modèles fournis',
                ],
                cta: 'Démarrer la conformité',
              },
              {
                label: 'Conformité + Suivi',
                price: 'CHF 350/mois',
                duration: 'Après Pack Conformité',
                highlight: false,
                features: [
                  'Mise à jour annuelle garantie',
                  'Veille réglementaire incluse',
                  'Gestion des demandes RGPD (accès, effacement)',
                  'Support en cas de contrôle',
                  'Révision annuelle des documents',
                ],
                cta: 'Assurer ma conformité',
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
      <section id="process" className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Méthode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Conforme en 5 étapes.
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
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Témoignages</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ils sont conformes. Ils dorment mieux.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'On avait ignoré le RGPD pendant 3 ans. Un concurrent a porté plainte. DKDP nous a mis en conformité en une semaine. Travail impeccable et réactif.',
                author: 'Directeur',
                company: 'PME e-commerce, Genève',
                stars: 5,
              },
              {
                quote: 'Notre site collectait des données sans les bons formulaires. DKDP a tout mis en ordre en 48h. Notre avocat a validé le travail sans une seule correction.',
                author: 'Fondatrice',
                company: 'Cabinet RH, Lausanne',
                stars: 5,
              },
              {
                quote: 'En tant que praticienne de santé, la conformité est non-négociable. DKDP connaît les spécificités des données sensibles. Résultat irréprochable.',
                author: 'Médecin indépendante',
                company: 'Cabinet médical, Genève',
                stars: 5,
              },
            ].map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full p-7 rounded-[16px] border"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={12} style={{ color }} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.author}</p>
                    <p className="text-text-muted text-xs mt-0.5">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Réalisations + Garanties ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Réalisations</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des mises en conformité concrètes.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                client: 'PME e-commerce B2C',
                type: 'Conformité complète',
                image: '/images/services/dkdp-agence-rgpd.webp',
                results: ['Audit + implémentation en 5 jours', 'Banner Axeptio conforme RGPD', 'Politique vie privée + DPA livrés'],
                tech: 'Axeptio · RGPD · DPA · LPD',
              },
              {
                client: 'Cabinet médical',
                type: 'Données de santé (sensibles)',
                image: '/images/services/dkdp-agence-consulting.webp',
                results: ['Registre des traitements complet', 'Formulaires patients conformes', 'Formation équipe 5 personnes'],
                tech: 'LPD · Santé · Registre · DPA',
              },
              {
                client: 'Startup SaaS B2B',
                type: 'RGPD + Sous-traitants',
                image: '/images/services/dkdp-agence-création-web.webp',
                results: ['12 contrats DPA sous-traitants', 'Politique vie privée EN + FR', 'Mention cookies conforme CNIL'],
                tech: 'RGPD · DPA · Cookiebot · Multi-langue',
              },
            ].map((r, i) => (
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

          {/* Garanties */}
          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Nos engagements
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { Icon: ShieldCheck, title: 'LPD + RGPD couverts', desc: 'DKDP maîtrise les deux réglementations. Si vous avez des clients en UE, vous êtes couverts sur les deux fronts.' },
                  { Icon: BarChart2, title: 'Documents propriétaires', desc: 'Tous les documents produits vous appartiennent intégralement. Pas de dépendance à notre plateforme ou abonnement.' },
                  { Icon: Clock, title: 'Délai garanti', desc: 'Audit livré sous 48h, implémentation Pack Conformité standard sous 5 jours ouvrés. Pas de surcharge de travail chez vous.' },
                  { Icon: Globe2, title: 'Veille réglementaire', desc: 'La loi évolue. DKDP met à jour vos documents chaque année pour que votre conformité reste à jour sans effort de votre part.' },
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
          </SectionReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection items={FAQ} title="Vos questions sur le RGPD et les cookies" />

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/agence-digitale/creation-site-web"
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
                  <Globe2 size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Étape suivante</p>
                  <p className="text-white font-bold text-lg leading-tight">Création de site web</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Votre conformité est en ordre. Pour un site web moderne, performant et SEO-optimisé qui intègre ces standards dès la conception, découvrez notre service de création web.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir la création web <ChevronRight size={12} />
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
