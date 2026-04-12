import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  Globe, Search, Megaphone, Share2, Film, Presentation, Shield,
  ChevronRight, Zap, Users, BarChart2, MapPin,
  EyeOff, AlertTriangle, TrendingDown, Target, Rocket,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildBreadcrumbList } from '@/lib/schema'
import { FAQ_AGENCE } from '@/data/faq-agence'
import { CITIES } from '@/lib/cities'
import { FunnelDiagram } from './_components/FunnelDiagram'
import { HeroVisual } from './_components/HeroVisual'
import { violet } from '@/lib/tokens'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const SiteAuditBlock = dynamic(() => import('@/components/sections/SiteAuditBlock').then(m => ({ default: m.SiteAuditBlock })))

export const metadata: Metadata = {
  title: 'Agence Digitale Genève · Site web, SEO, Google Ads · DKDP',
  description: 'Agence digitale à Genève et Suisse romande. Création de site web, référencement SEO, Google Ads, réseaux sociaux, vidéo. Résultats mesurables.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale' },
}

const SERVICES = [
  {
    Icon: Globe, title: 'Création de site web', href: '/agence-digitale/creation-site-web',
    description: 'Sites sur mesure, rapides et optimisés pour la conversion. De la landing page au site e-commerce complexe.',
    badge: 'Best seller',
    image: '/images/services/dkdp-agence-creation-web.webp',
  },
  {
    Icon: Search, title: 'Référencement SEO', href: '/agence-digitale/seo',
    description: 'Stratégie de contenu et optimisation technique pour dominer Google sur vos mots-clés cibles.',
    badge: 'Populaire',
    image: '/images/services/dkdp-agence-seo.webp',
  },
  {
    Icon: Megaphone, title: 'Publicité Google Ads', href: '/agence-digitale/publicite-sea',
    description: 'Campagnes search et display rentables, avec un suivi précis du ROI et des conversions.',
    badge: null,
    image: '/images/services/dkdp-agence-sea.webp',
  },
  {
    Icon: Share2, title: 'Réseaux sociaux', href: '/agence-digitale/reseaux-sociaux',
    description: 'Présence cohérente sur Instagram, LinkedIn, Facebook. Contenu, Community management, Ads.',
    badge: null,
    image: '/images/services/dkdp-agence-reseaux-sociaux.webp',
  },
  {
    Icon: Film, title: 'Création vidéo', href: '/agence-digitale/creation-video',
    description: 'Vidéos institutionnelles, témoignages clients, reels et contenus courts pour vos réseaux.',
    badge: null,
    image: '/images/services/dkdp-agence-creation-video.webp',
  },
  {
    Icon: Presentation, title: 'Consulting marketing', href: '/agence-digitale/consulting-marketing',
    description: 'Audit de votre présence digitale, définition de stratégie et accompagnement à long terme.',
    badge: null,
    image: '/images/services/dkdp-agence-consulting.webp',
  },
  {
    Icon: Shield, title: 'RGPD & Cookies', href: '/agence-digitale/rgpd-cookies',
    description: 'Mise en conformité légale, politique de confidentialité, bandeau cookies et registre des traitements.',
    badge: null,
    image: '/images/services/dkdp-agence-rgpd.webp',
  },
]

const STATS = [
  { value: '100+', label: 'Sites livrés' },
  { value: '10+ ans', label: "D'expérience" },
  { value: '4.9/5', label: 'Satisfaction client' },
]

const WHY = [
  {
    Icon: Zap, title: 'Un seul interlocuteur',
    desc: "Pas de chef de projet intermédiaire. Vous parlez directement à l'expert qui fait le travail, ce qui évite les malentendus et accélère les décisions.",
  },
  {
    Icon: BarChart2, title: 'Résultats mesurables',
    desc: 'Chaque action est trackée. On vous montre des chiffres concrets : trafic, leads, conversions. Pas des rapports creux.',
  },
  {
    Icon: Users, title: 'Approche sur mesure',
    desc: "Pas de template ou de solution packagée. Chaque projet est conçu selon vos objectifs, votre audience et votre marché.",
  },
]

const color = violet.color
const bg    = violet.bg
const border = violet.border

const badgeColors: Record<string, { background: string; color: string; border: string }> = {
  'Best seller': { background: 'rgba(10,10,10,0.84)', color: '#D8B4FE', border: '1px solid rgba(167,139,250,0.70)' },
  'Populaire':   { background: 'rgba(10,10,10,0.84)', color: '#C4B5FD', border: '1px solid rgba(124,58,237,0.65)' },
}

export default function AgenceDigitalePage() {
  return (
    <main>
      <SchemaOrg schema={buildService({ name: 'Agence Digitale Genève', url: '/agence-digitale', description: 'Création de sites web, SEO, Google Ads et réseaux sociaux pour entreprises à Genève et en Suisse romande.' })} />
      <SchemaOrg schema={buildBreadcrumbList([{ name: 'Accueil', url: '/' }, { name: 'Agence Digitale', url: '/agence-digitale' }])} />

      {/* ── Hero ── */}
      <HeroBg
        blob1="rgba(124,58,237,0.14)"
        blob2="rgba(124,58,237,0.07)"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Service Digital</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Votre présence digitale,{' '}
                  <GradText as="span">optimisée de A à Z.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  De la création de site au référencement, en passant par les campagnes payantes : on construit une stratégie cohérente qui génère de vrais résultats.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton href="/contact?service=service-digital" size="lg">Devis gratuit →</LiquidMetalButton>
                  <Link href="#services" className="text-sm text-text-muted hover:text-white transition-colors">
                    Voir nos services ↓
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
            {STATS.map((s) => (
              <SectionReveal key={s.label}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1 text-white">{s.value}</p>
                  <p className="text-text-muted text-sm">{s.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Douleurs ── */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Le problème</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-2xl mx-auto">
                Sans stratégie digitale, vous laissez vos clients à vos concurrents.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: EyeOff,
                stat: '72%',
                title: 'Invisible sur Google',
                desc: 'Des recherches locales aboutissent sur la première page. Si vous n\'y êtes pas, vos clients potentiels vont directement chez un concurrent.',
              },
              {
                Icon: AlertTriangle,
                stat: '3 sec',
                title: 'Site qui ne convertit pas',
                desc: 'C\'est le temps qu\'un visiteur prend pour quitter un site lent ou mal conçu. Une mauvaise expérience coûte des leads chaque jour.',
              },
              {
                Icon: TrendingDown,
                stat: '40%',
                title: 'Budget publicitaire gaspillé',
                desc: 'Des dépenses publicitaires partent sans ciblage précis ni suivi des conversions. La donnée change tout quand on sait l\'utiliser.',
              },
            ].map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.1}>
                <div
                  className="flex flex-col gap-4 p-7 rounded-[16px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <item.Icon size={22} style={{ color }} />
                  </div>
                  <p className="text-[2.2rem] font-bold leading-none" style={{ color }}>{item.stat}</p>
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <HeroBg className="bg-bg-card border-y border-border" blob1="rgba(124,58,237,0.10)" blob2="rgba(255,107,0,0.07)">
      <section id="services" className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-14">
              <GradTag className="mb-4">Nos services</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                Tout ce dont votre digital a besoin.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <SectionReveal key={s.href} delay={i * 0.07}>
                <Link
                  href={s.href}
                  className="group flex flex-col h-full bg-bg rounded-[14px] border overflow-hidden hover:-translate-y-0.5 transition-transform duration-200"
                  style={{
                    borderColor: s.badge ? 'rgba(167,139,250,0.38)' : border,
                    boxShadow: s.badge ? '0 0 28px rgba(124,58,237,0.08)' : undefined,
                  }}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg/80" />
                    {s.badge && (
                      <span
                        className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={badgeColors[s.badge]}
                      >
                        {s.badge}
                      </span>
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-[7px] mb-3 flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <s.Icon size={16} style={{ color }} />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed flex-1">{s.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold transition-opacity group-hover:opacity-70" style={{ color }}>
                      En savoir plus <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Audits gratuits ── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-5">Gratuit &amp; sans engagement</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] leading-[1.1]">
                Commencez par un audit gratuit.
              </h2>
              <p className="text-text-secondary mt-5 max-w-2xl mx-auto text-base leading-relaxed">
                Avant d&apos;investir, comprenez où vous en êtes. Nos experts analysent votre site et votre SEO, vous recevez un rapport détaillé sous 48h.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <SectionReveal delay={0.05}>
              <Link
                href="/agence-digitale/creation-site-web/audit-site"
                className="group flex flex-col h-full rounded-[22px] p-7 border transition-all hover:-translate-y-0.5 duration-200 relative overflow-hidden"
                style={{ background: bg, borderColor: border }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: color }} />
                <span
                  className="inline-flex items-center text-[13px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-7 w-fit"
                  style={{ background: 'rgba(124,58,237,0.12)', color, border: `1px solid ${border}` }}
                >
                  Audit site internet
                </span>
                <h3 className="text-white text-[1.75rem] font-bold mb-4 leading-[1.15]">Audit de site gratuit</h3>
                <p className="text-text-secondary text-base leading-relaxed flex-1">
                  Performance, SEO on-page, UX, compatibilité mobile, sécurité HTTPS. Rapport PDF avec recommandations prioritaires envoyé sous 48h.
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-base font-semibold transition-opacity group-hover:opacity-70" style={{ color }}>
                  Analyser mon site <ChevronRight size={16} />
                </span>
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <Link
                href="/agence-digitale/seo/audit-seo"
                className="group flex flex-col h-full rounded-[22px] p-7 border transition-all hover:-translate-y-0.5 duration-200 relative overflow-hidden"
                style={{ background: bg, borderColor: border }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: color }} />
                <span
                  className="inline-flex items-center text-[13px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-7 w-fit"
                  style={{ background: 'rgba(124,58,237,0.12)', color, border: `1px solid ${border}` }}
                >
                  Audit SEO
                </span>
                <h3 className="text-white text-[1.75rem] font-bold mb-4 leading-[1.15]">Audit SEO gratuit</h3>
                <p className="text-text-secondary text-base leading-relaxed flex-1">
                  Mots-clés, backlinks, SEO technique, contenu, visibilité locale Genève et Suisse romande. Identifiez vos opportunités SEO concrètes.
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-base font-semibold transition-opacity group-hover:opacity-70" style={{ color }}>
                  Analyser mon SEO <ChevronRight size={16} />
                </span>
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Estimation ── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/agence-digitale/creation-site-web/estimation"
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-[22px] p-8 md:p-10 border overflow-hidden transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0.04) 100%)',
                borderColor: 'rgba(167,139,250,0.35)',
                boxShadow: '0 0 40px rgba(124,58,237,0.10)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: color }} />
              <div className="flex items-start gap-5">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-[12px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Rocket size={24} style={{ color }} />
                </div>
                <div>
                  <span
                    className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                    style={{ background: 'rgba(124,58,237,0.12)', color, border: `1px solid ${border}` }}
                  >
                    Simulateur gratuit
                  </span>
                  <h3 className="text-white text-2xl md:text-[1.75rem] font-bold mb-2 leading-[1.15]">
                    Estimez le cout de votre site web en 2 minutes
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed max-w-xl">
                    Configurez votre projet, choisissez vos options et recevez une estimation personnalisee avec un devis detaille sous 48h. Prix transparents.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-opacity group-hover:opacity-80"
                style={{ background: color, color: '#000' }}
              >
                Estimer mon projet <ChevronRight size={16} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SectionReveal>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(124,58,237,0.12)' }}>
                <Image
                  src="/images/services/dkdp-agence-consulting.webp"
                  alt="Équipe DKDP, service digital à Genève"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
              </div>
            </SectionReveal>
            <div>
              <SectionReveal>
                <div className="mb-10">
                  <GradTag className="mb-4">Notre différence</GradTag>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                    Pourquoi choisir DKDP ?
                  </h2>
                </div>
              </SectionReveal>
              <div className="flex flex-col gap-8">
                {WHY.map((w, i) => (
                  <SectionReveal key={w.title} delay={i * 0.1}>
                    <div className="flex gap-5">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <w.Icon size={22} style={{ color }} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">{w.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{w.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Approche ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Notre méthode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                De zéro à une présence qui génère des résultats.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                On ne vend pas des sites web ou du SEO. On construit des systèmes digitaux cohérents qui attirent, convainquent et convertissent. Chaque décision est justifiée par des données réelles.
              </p>
              <div className="relative space-y-4">
                {/* Ligne directrice verticale - violet */}
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute w-px top-4 bottom-4 pointer-events-none"
                  style={{
                    left: 'calc(1rem - 0.5px)',
                    background: 'linear-gradient(to bottom, #A78BFA 0%, #A78BFA 70%, rgba(167,139,250,0) 100%)',
                  }}
                />
                {[
                  { n: '01', title: 'Audit complet', desc: 'Site, SEO, concurrents, mots-clés. On part de votre réalité actuelle, pas d\'une théorie.' },
                  { n: '02', title: 'Stratégie sur mesure', desc: 'Plan d\'action priorisé avec objectifs mesurables. Vous approuvez avant qu\'on démarre.' },
                  { n: '03', title: 'Réalisation agile', desc: 'Points hebdomadaires, accès en temps réel. Vous restez maître de votre projet.' },
                  { n: '04', title: 'Lancement et promotion', desc: 'Mise en ligne, campagnes activées, premiers leads trackés dès J+1.' },
                  { n: '05', title: 'Optimisation mensuelle', desc: 'Analyse des données, ajustements, rapports clairs. On reste là après la livraison.' },
                ].map((step, i) => (
                  <SectionReveal key={step.n} delay={i * 0.07}>
                    <div className="flex gap-4 items-start">
                      <span
                        className="relative z-[1] flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold"
                        style={{ background: bg, border: `1px solid ${border}`, color }}
                      >
                        {step.n}
                      </span>
                      <div>
                        <p className="text-white font-semibold text-sm">{step.title}</p>
                        <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div
                className="rounded-[20px] p-10 border"
                style={{ background: bg, borderColor: border, boxShadow: 'rgba(124,58,237,0.10) 0px 0px 60px' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                  Entonnoir de conversion
                </p>
                <FunnelDiagram />
                <div className="mt-8 pt-6 border-t" style={{ borderColor: border }}>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { v: '+240%', l: 'Trafic moyen' },
                      { v: 'x3.5', l: 'Leads entrants' },
                      { v: '< 4 mois', l: 'Premiers résultats' },
                    ].map((kpi) => (
                      <div key={kpi.l}>
                        <p className="text-xl font-bold" style={{ color }}>{kpi.v}</p>
                        <p className="text-text-muted text-[11px] mt-1">{kpi.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <LogoBanner label="Ils nous font confiance" />
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <Testimonials className="py-24 border-y border-border" />
      </HeroBg>

      {/* ── Résultats ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Preuves concrètes</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que nos clients obtiennent vraiment.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                client: 'PME B2B Genève',
                sector: 'Services financiers',
                results: ['+340% trafic organique', '15 leads qualifiés/mois', 'Délai : 5 mois'],
                before: 'Site vieillissant, aucun SEO, 0 lead entrant',
                after: 'Refonte complète, stratégie de contenu, position Top 3 sur 12 mots-clés cibles',
              },
              {
                client: 'Startup SaaS',
                sector: 'Technologie',
                results: ['ROI Google Ads x4.2', 'CPA réduit de 68%', 'Délai : 6 semaines'],
                before: 'Budget Google Ads brûlé sans résultats, 0 suivi conversion',
                after: 'Restructuration complète des campagnes, tracking précis, croissance continue',
              },
              {
                client: 'Commerce local',
                sector: 'Retail',
                results: ['+180% appels entrants', 'Note Google 4.8/5', 'Délai : 3 mois'],
                before: 'Invisible sur Google Maps, aucune présence locale',
                after: 'Google My Business optimisé, avis gérés, top 3 des recherches locales',
              },
            ].map((c, i) => (
              <SectionReveal key={c.client} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{ borderColor: border }}
                >
                  <div className="p-6 flex-1" style={{ background: bg }}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white font-bold">{c.client}</p>
                        <p className="text-text-muted text-xs">{c.sector}</p>
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                        style={{ background: 'rgba(124,58,237,0.15)', color, border: `1px solid ${border}` }}
                      >
                        Réalisé
                      </span>
                    </div>
                    <div className="space-y-2 mb-5">
                      {c.results.map((r) => (
                        <div key={r} className="flex items-center gap-2">
                          <Target size={12} style={{ color }} className="flex-shrink-0" />
                          <span className="text-white text-sm font-semibold">{r}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 pt-4" style={{ borderTop: `1px solid ${border}` }}>
                      <p className="text-text-muted text-xs"><span className="text-text-secondary font-medium">Avant :</span> {c.before}</p>
                      <p className="text-text-muted text-xs"><span className="text-white font-medium">Après :</span> {c.after}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">Ils nous font confiance</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
              {[
                { name: 'SwissLife', file: 'swisslife.webp', h: 36 },
                { name: 'Howden', file: 'howden.avif', h: 28 },
                { name: 'OCAS', file: 'ocas.avif', h: 28 },
                { name: 'WellWays', file: 'wellways.avif', h: 28 },
                { name: 'Intown', file: 'intown.avif', h: 24 },
                { name: 'Strike', file: 'strike.avif', h: 24 },
              ].map((logo) => (
                <Image
                  key={logo.name}
                  src={`/images/clients/${logo.file}`}
                  alt={logo.name}
                  width={120}
                  height={logo.h}
                  className="grayscale opacity-40 hover:opacity-70 hover:grayscale-0 transition-all duration-300 object-contain"
                  style={{ height: logo.h, width: 'auto' }}
                />
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Audit gratuit ── */}
      <SiteAuditBlock />

      {/* ── FAQ ── */}
      <FAQSection items={FAQ_AGENCE} title="Vos questions sur l'service digital" />

      {/* ── Villes ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Suisse romande</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Nous accompagnons les entreprises de toute la region.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CITIES.map((city, i) => (
              <SectionReveal key={city.slug} delay={i * 0.04}>
                <Link
                  href={`/agence-digitale/${city.slug}`}
                  className="group flex items-center gap-2.5 p-3.5 rounded-xl border border-border bg-white/[0.02] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <MapPin size={13} className="flex-shrink-0 text-text-muted group-hover:text-white transition-colors" />
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{city.name}</p>
                    <p className="text-text-muted text-[11px]">{city.canton} · {city.distance}</p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ponts ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Nos autres expertises
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SectionReveal delay={0.05}>
              <Link
                href="/intelligence-artificielle"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(212,212,216,0.05)', borderColor: 'rgba(212,212,216,0.18)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-[#D4D4D8]">Intelligence Artificielle</p>
                  <p className="text-white font-semibold">Automatisez vos processus avec l&apos;IA</p>
                  <p className="text-text-muted text-xs mt-1">Agents IA, automatisation et conseil. 10h économisées par semaine en moyenne.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 text-[#D4D4D8] transition-transform group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <Link
                href="/formation-entreprise"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(255,107,0,0.06)', borderColor: 'rgba(255,107,0,0.20)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#FF8C00' }}>Formation Entreprise</p>
                  <p className="text-white font-semibold">Formez vos équipes au digital et à l&apos;IA</p>
                  <p className="text-text-muted text-xs mt-1">Sessions sur mesure, en présentiel ou à distance. 200+ personnes formées.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: '#FF8C00' }} />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal />

    </main>
  )
}
