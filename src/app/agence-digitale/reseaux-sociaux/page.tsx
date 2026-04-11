import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Clock,
  Users,
  ShieldCheck,
  BarChart2,
  Video,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { PlatformGrid } from './_components/PlatformGrid'
import { HeroVisual } from './_components/HeroVisual'
import { violet } from '@/lib/tokens'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))

export const metadata: Metadata = {
  title: 'Gestion Réseaux Sociaux Genève · Instagram, LinkedIn · DKDP',
  description:
    'Gestion des réseaux sociaux pour PME à Genève. Stratégie, création de contenu, community management et Social Ads sur Instagram, LinkedIn, Facebook, TikTok et YouTube.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/reseaux-sociaux' },
}


const FAQ = [
  {
    question: 'Combien coûte la gestion des réseaux sociaux par une agence à Genève ?',
    answer:
      'Un forfait de gestion de réseaux sociaux chez DKDP démarre à CHF 450/mois pour une plateforme. Une présence sur 3 réseaux avec contenu vidéo et Meta Ads se situe autour de CHF 900/mois. Le forfait Full Social à CHF 1\'600/mois couvre 5 plateformes avec community management 7j/7.',
  },
  {
    question: 'Sur quels réseaux sociaux DKDP travaille-t-il ?',
    answer:
      'DKDP gère Instagram, LinkedIn, Facebook, TikTok et YouTube. Le choix des réseaux dépend de votre cible. B2B à Genève : LinkedIn est incontournable. B2C mode ou food : Instagram et TikTok. On ne gère que les réseaux pertinents pour votre secteur.',
  },
  {
    question: 'À quelle fréquence publiez-vous du contenu ?',
    answer:
      'En fonction du forfait choisi : de 12 publications par mois (forfait Starter) à du contenu illimité pour les forfaits Pro et Full Social. La régularité est plus importante que la fréquence : DKDP privilégie la cohérence et la qualité sur le volume.',
  },
  {
    question: 'Qui crée les visuels et les textes ?',
    answer:
      'DKDP crée les visuels (design, Reels, Stories) et rédige les textes (captions, hashtags). On peut également travailler à partir de vos photos ou vidéos. Un calendrier éditorial est partagé chaque mois pour validation avant publication.',
  },
  {
    question: 'Peut-on gérer les commentaires et les messages privés ?',
    answer:
      'Oui. Le community management inclus dans nos forfaits couvre les réponses aux commentaires et messages privés sous 2h en semaine. Pour les demandes commerciales complexes, on vous les transfère avec le contexte.',
  },
  {
    question: 'Les Social Ads (publicités) sont-elles incluses dans le forfait ?',
    answer:
      'Le forfait Pro inclut CHF 300 de budget Meta Ads géré. Le forfait Full Social inclut la gestion Ads sur toutes les plateformes. Le budget média est toujours séparé des frais de gestion et vous appartient.',
  },
  {
    question: 'Comment sait-on si les réseaux sociaux apportent vraiment des clients ?',
    answer:
      'DKDP configure des liens UTM et des pixels de tracking pour mesurer les visites et conversions issues des réseaux. Le reporting mensuel inclut la portée, l\'engagement, les clics vers le site et, si applicable, les leads ou ventes générés.',
  },
]

const BENEFITS = [
  {
    Icon: TrendingUp,
    value: '+180%',
    title: 'Engagement en hausse',
    desc: 'Nos clients voient leur engagement augmenter de 180% en moyenne dans les 3 premiers mois grâce à une stratégie de contenu adaptée à chaque plateforme.',
  },
  {
    Icon: Clock,
    value: '12h/sem',
    title: 'Votre temps libéré',
    desc: 'Créer du contenu de qualité prend 12 à 15 heures par semaine. DKDP prend tout en charge pour que vous vous concentriez sur votre coeur de métier.',
  },
  {
    Icon: Users,
    value: 'x3.2',
    title: 'Portée amplifiée',
    desc: 'Avec une stratégie multi-plateforme cohérente, la portée de vos messages est multipliée par 3 à 4 par rapport à une gestion ad hoc.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Audit & stratégie',
    desc: 'Analyse de vos comptes existants, de votre audience et de votre concurrence. Stratégie par plateforme définie.',
  },
  {
    step: '02',
    title: 'Identité de contenu',
    desc: 'Charte éditoriale, ton de voix, templates visuels. Tout ce qui rend vos contenus reconnaissables.',
  },
  {
    step: '03',
    title: 'Production mensuelle',
    desc: 'Création des visuels, textes, hashtags et planification dans un calendrier éditorial validé.',
  },
  {
    step: '04',
    title: 'Publication & community',
    desc: 'Publication aux heures optimales, réponses aux commentaires, gestion des DMs, veille concurrentielle.',
  },
  {
    step: '05',
    title: 'Analyse & optimisation',
    desc: 'Rapport mensuel des performances, A/B test des formats, ajustement de la stratégie en continu.',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

export default function ReseauxSociauxPage() {
  return (
    <main>
      <SchemaOrg schema={buildService({ name: 'Gestion réseaux sociaux Genève', url: '/agence-digitale/reseaux-sociaux', description: 'Gestion des réseaux sociaux pour PME à Genève. Stratégie, contenu, community management et Social Ads.' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: 'Réseaux sociaux', url: 'https://dkdp.ch/agence-digitale/reseaux-sociaux' },
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
              <span className="text-sm" style={{ color }}>Réseaux sociaux</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Instagram · LinkedIn · TikTok · YouTube</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Des réseaux sociaux qui génèrent de{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>vraie croissance.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP gère votre présence sur les réseaux sociaux de A à Z : stratégie, création de contenu, publication et community management. +180% d&apos;engagement moyen en 3 mois. Vous vous concentrez sur votre métier, on s&apos;occupe du reste.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=service-digital" size="lg">Demander un devis →</LiquidMetalButton>
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
              { v: '+180%', l: 'Engagement moyen', sub: 'Sur 3 premiers mois' },
              { v: '5', l: 'Plateformes gérées', sub: 'Meta, LinkedIn, TikTok, YT...' },
              { v: '12h/sem', l: 'Libérées', sub: 'À votre équipe' },
              { v: '2.7M', l: 'Impressions cumulées', sub: 'Clients actifs 2025/2026' },
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
        <div className="max-w-[1200px] mx-auto rounded-2xl bg-[#0A0A0A]/90 backdrop-blur-2xl px-5">
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
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Notre approche</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Du contenu qui résonne avec votre audience.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Publier pour publier ne sert à rien. DKDP construit une stratégie éditoriale basée sur votre audience cible, votre secteur et vos objectifs business. Chaque contenu a un but : visibilité, engagement, trafic ou conversion.
              </p>
              <p className="text-text-secondary leading-relaxed">
                On travaille avec votre équipe pour comprendre votre culture d&apos;entreprise et votre ton. Le résultat est une présence authentique et cohérente, qui reflète vraiment qui vous êtes.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Stratégie de contenu sur mesure',
                  'Création de visuels et vidéos Reels/Stories',
                  'Calendrier éditorial mensuel',
                  'Community management (modération + réponses)',
                  'Publicité Meta Ads et LinkedIn Ads',
                  'Collaboration avec influenceurs locaux',
                  'Analyse de performance mensuelle',
                  'Gestion de crise et e-réputation',
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
                Vos réseaux sociaux travaillent-ils vraiment pour vous ?
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Une présence sur les réseaux sans stratégie, c&apos;est du temps et de l&apos;argent gaspillés. Les algorithmes récompensent la régularité, la qualité et l&apos;engagement. Sans ces trois piliers, votre contenu disparaît.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: TrendingUp, title: '90% des marques publient sans stratégie définie. Résultat : moins de 2% d\'engagement moyen', sub: 'Source : Sprout Social Index 2024' },
                  { Icon: Clock, title: '12 à 15 heures par semaine : c\'est le temps nécessaire pour gérer correctement 3 réseaux sociaux', sub: 'Source : HubSpot Social Media Report' },
                  { Icon: Users, title: '78% des consommateurs achètent après avoir suivi une marque sur les réseaux pendant au moins 3 mois', sub: 'Source : GlobalWebIndex 2024' },
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
                  Plateformes gérées par DKDP
                </p>
                <PlatformGrid />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Chaque plateforme est choisie selon votre cible. On ne gère que ce qui rapporte vraiment.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Bénéfices ── */}
      <section id="resultats" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Résultats</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que vous gagnez concrètement.
              </h2>
            </div>
          </SectionReveal>
          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.20) 5%, #A78BFA 50%, rgba(124,58,237,0.20) 95%, transparent)' }}
            />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-3 gap-6">
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
                Des forfaits clairs, sans surprise.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Budget média non inclus dans les forfaits. Chaque forfait est mensuel et résiliable à tout moment.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Starter',
                price: 'CHF 450/mois',
                duration: '1 plateforme',
                features: [
                  '12 posts/mois',
                  'Stories hebdomadaires',
                  'Rédaction captions + hashtags',
                  'Calendrier éditorial',
                  'Rapport mensuel',
                ],
                cta: 'Démarrer',
                highlight: false,
              },
              {
                label: 'Pro',
                price: 'CHF 900/mois',
                duration: '3 plateformes',
                features: [
                  'Contenu illimité',
                  'Reels et Stories inclus',
                  'Meta Ads inclus (budget CHF 300)',
                  'Community management',
                  'Rapport bimensuel',
                ],
                cta: 'Démarrer',
                highlight: true,
              },
              {
                label: 'Full Social',
                price: 'CHF 1\'600/mois',
                duration: '5 plateformes',
                features: [
                  'Contenu illimité tous formats',
                  'Ads multi-plateformes',
                  'Community management 7j/7',
                  'Influencer seeding',
                  'Stratégie trimestrielle',
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
      <section id="process" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Méthode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Comment on prend en main vos réseaux.
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
        <section id="realisations" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Témoignages</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que disent nos clients.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'En 3 mois, notre compte Instagram est passé de 800 à 4\'200 abonnés engagés. Mais surtout, on génère 8 à 10 leads par semaine via DM. Le ROI est réel.',
                name: 'Fondatrice',
                company: 'Marque lifestyle, Genève',
              },
              {
                quote: 'DKDP gère nos réseaux depuis 8 mois. Notre engagement LinkedIn a été multiplié par 5. Nos prospects connaissent notre nom avant même qu\'on les appelle.',
                name: 'Directeur commercial',
                company: 'PME B2B, Vaud',
              },
              {
                quote: 'On avait essayé de le faire en interne. C\'était chronophage et les résultats n\'étaient pas là. DKDP a tout changé en 60 jours.',
                name: 'Responsable communication',
                company: 'Entreprise de 50 personnes',
              },
            ].map((t, i) => (
              <SectionReveal key={t.company} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] p-7 border"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-3.5 h-3.5 fill-current" style={{ color }} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-6">&quot;{t.quote}&quot;</p>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs mt-0.5">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Engagements ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Nos engagements
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { Icon: ShieldCheck, title: 'Contenu 100% original', desc: 'Aucun contenu générique ou stock photo. Chaque post est créé spécifiquement pour votre marque et votre audience.' },
                  { Icon: BarChart2, title: 'Rapport mensuel détaillé', desc: 'Reach, impressions, engagement, followers, clics : toutes les métriques qui comptent, expliquées clairement.' },
                  { Icon: Clock, title: 'Calendrier validé en avance', desc: 'Vous recevez le calendrier éditorial du mois suivant pour validation. Vous gardez le contrôle éditorial total.' },
                  { Icon: Users, title: 'Réactivité community', desc: 'DKDP répond à vos commentaires et messages sous 2h en semaine. Votre communauté est toujours prise en charge.' },
                ].map((g, i) => (
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
        <FAQSection items={FAQ} title="Vos questions sur la gestion des réseaux sociaux" />
      </div>

      {/* ── Bridge SEO ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/agence-digitale/creation-video"
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
                  <Video size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Service complémentaire</p>
                  <p className="text-white font-bold text-lg leading-tight">Création vidéo professionnelle</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Les réseaux sociaux performent 2.7x mieux avec de la vidéo. Découvrez notre service de création vidéo professionnelle pour amplifier votre présence.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir la vidéo <ChevronRight size={12} />
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
