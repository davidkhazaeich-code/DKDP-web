import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  BrainCircuit, BookOpen, Shield, Share2, Palette, Cpu, Film, Sparkles,
  ChevronRight, Award, CalendarCheck, Users, ExternalLink, User, GraduationCap, Monitor,
  Clock, BarChart2, Lightbulb, CheckCircle2, Target, BookCheck,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import dynamic from 'next/dynamic'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { ParallaxOrangeBlobs } from '@/components/ui/ParallaxOrangeBlobs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const FormationROICalculator = dynamic(() => import('@/components/sections/FormationROICalculator').then(m => ({ default: m.FormationROICalculator })))
const ProgressionDiagram = dynamic(() => import('./_components/ProgressionDiagram').then(m => ({ default: m.ProgressionDiagram })))
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildCourse, buildBreadcrumbList } from '@/lib/schema'
import { FAQ_FORMATION } from '@/data/faq-formation'
import { orange } from '@/lib/tokens'

export const metadata: Metadata = {
  title: 'Formation Entreprise Genève · IA, Bureautique, Cybersécurité · DKDP',
  description: 'Formations professionnelles en entreprise à Genève et Suisse romande. IA, Excel, Cybersécurité, Réseaux sociaux. Sessions sur mesure, en présentiel ou en ligne.',
  alternates: { canonical: 'https://dkdp.ch/formation-entreprise' },
}

const PROGRAMS = [
  {
    Icon: BrainCircuit, title: 'Formation IA en entreprise', href: '/formation-entreprise/ia',
    description: 'ChatGPT, Claude, Copilot : apprenez à intégrer les outils IA dans votre quotidien professionnel et gagnez 2h par jour.',
    badge: 'Tendance',
    image: '/images/services/dkdp-formation-ia.webp',
  },
  {
    Icon: Sparkles, title: 'Formation Claude IA', href: '/formation-entreprise/claude-ai',
    description: 'Maîtrisez Claude.ai, les Projects collaboratifs et Claude Code. La formation spécialisée sur l\'IA la plus puissante du marché.',
    badge: 'Nouveau',
    image: '/images/services/dkdp-formation-ia.webp',
  },
  {
    Icon: BookOpen, title: 'Bureautique & Excel', href: '/formation-entreprise/bureautique',
    description: 'Maîtrisez Excel, Word, PowerPoint et les outils Microsoft 365. Des formules aux tableaux croisés dynamiques.',
    badge: null,
    image: '/images/services/dkdp-formation-bureautique.webp',
  },
  {
    Icon: Shield, title: 'Cybersécurité', href: '/formation-entreprise/cybersecurite',
    description: 'Sensibilisez vos équipes aux risques : phishing, mots de passe, RGPD. Une équipe formée = une entreprise protégée.',
    badge: null,
    image: '/images/services/dkdp-formation-cybersecurite.webp',
  },
  {
    Icon: Share2, title: 'Réseaux sociaux', href: '/formation-entreprise/reseaux-sociaux',
    description: 'Stratégie, création de contenu, planification et analyse des performances sur LinkedIn, Instagram et Facebook.',
    badge: null,
    image: '/images/services/dkdp-formation-reseaux-sociaux.webp',
  },
  {
    Icon: Palette, title: 'Web design & Canva', href: '/formation-entreprise/web-design',
    description: 'Créez des visuels professionnels sans être graphiste. Maîtrisez Canva, les bases du design et de la charte graphique.',
    badge: null,
    image: '/images/services/dkdp-formation-web-design.webp',
  },
  {
    Icon: Cpu, title: 'Informatique', href: '/formation-entreprise/informatique',
    description: "Compétences informatiques essentielles pour être efficace au quotidien. Raccourcis, organisation, cloud, collaboration.",
    badge: null,
    image: '/images/services/dkdp-formation-informatique.webp',
  },
  {
    Icon: Film, title: 'Montage vidéo', href: '/formation-entreprise/montage-video',
    description: 'Créez des vidéos professionnelles pour vos réseaux sociaux et vos présentations. CapCut, Premiere, Reels.',
    badge: null,
    image: '/images/services/dkdp-formation-montage-video.webp',
  },
]

const STATS = [
  { value: '500+', label: 'Personnes formées' },
  { value: '4.9/5', label: 'Satisfaction moyenne' },
  { value: '100%', label: 'Sur mesure' },
]

const FORMATS = [
  {
    Icon: Users, title: 'En présentiel chez vous',
    desc: "On se déplace dans vos locaux. Format idéal pour les équipes de 1 à 10 personnes, avec exercices pratiques sur vos propres outils.",
  },
  {
    Icon: CalendarCheck, title: 'En ligne & hybride',
    desc: 'Sessions visio interactives pour les équipes dispersées ou les formations à distance. Aussi efficace qu\'en présentiel.',
  },
  {
    Icon: Award, title: 'Entièrement sur mesure',
    desc: 'Le programme est adapté à votre secteur, vos outils et votre niveau. Pas de formation générique : que du pertinent.',
  },
]

const color = orange.color, bg = orange.bg, border = orange.border

const badgeColors: Record<string, { background: string; color: string; border: string }> = {
  'Tendance':    { background: 'rgba(10,10,10,0.84)', color: '#FCD34D', border: '1px solid rgba(255,140,0,0.68)' },
  'Populaire':   { background: 'rgba(10,10,10,0.84)', color: '#FDBA74', border: '1px solid rgba(255,107,0,0.62)' },
}

export default function FormationEntreprisePage() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildCourse({ name: 'Formation IA et Digital en Entreprise', url: '/formation-entreprise', description: 'Formations professionnelles en IA, bureautique, cybersécurité et réseaux sociaux pour entreprises à Genève et en Suisse romande.' })} />
      <SchemaOrg schema={buildBreadcrumbList([{ name: 'Accueil', url: '/' }, { name: 'Formation Entreprise', url: '/formation-entreprise' }])} />

      {/* ── Hero ── */}
      <HeroBg
        blob1="rgba(255,107,0,0.13)"
        blob2="rgba(255,107,0,0.06)"
        accentRgb="255,140,0"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Formation Entreprise</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Formez vos équipes,{' '}
                  <GradText as="span">accélérez votre croissance.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  Des formations pratiques, adaptées à votre secteur et vos outils. En présentiel ou en ligne, pour des équipes qui progressent vraiment.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton href="/contact?service=formation" size="lg">Demander un devis →</LiquidMetalButton>
                  <Link href="#programmes" className="text-sm text-text-muted hover:text-white transition-colors">
                    Voir les programmes ↓
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/pillars/formation-entreprise.webp"
                    alt="Formation IA et digitale en entreprise à Genève"
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

      {/* ── Défi ── */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Le contexte</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-2xl mx-auto">
                Le numérique évolue vite. Vos équipes doivent suivre.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                Icon: Clock,
                stat: '2h',
                title: 'Perdues chaque jour',
                desc: 'C\'est le temps moyen qu\'un collaborateur perd sur des tâches digitales maîtrisées à 60%. Raccourcis, cloud, email : une demi-journée suffit à tout changer.',
              },
              {
                Icon: BarChart2,
                stat: '63%',
                title: 'Des PME sous-équipées',
                desc: 'Des PME européennes déclarent que leurs équipes ne maîtrisent pas les outils numériques à leur disposition. La formation comble ce fossé rapidement.',
              },
              {
                Icon: Lightbulb,
                stat: '3x',
                title: 'Plus productifs après',
                desc: 'C\'est le gain de productivité moyen observé après une formation digitale ciblée. Non pas parce que les gens travaillent plus, mais mieux.',
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
          <SectionReveal delay={0.25}>
            <div
              className="rounded-[16px] p-7 border text-center"
              style={{ background: 'rgba(255,107,0,0.05)', borderColor: 'rgba(255,107,0,0.20)' }}
            >
              <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Les formations DKDP sont conçues pour un impact immédiat : chaque participant repart avec des compétences utilisables le lendemain, sur ses vrais outils, dans son vrai contexte professionnel.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Programmes ── */}
      <HeroBg className="bg-bg-card border-y border-border" accentRgb="255,140,0" blob1="rgba(255,107,0,0.10)" blob2="rgba(124,58,237,0.07)">
      <section id="programmes" className="relative py-24 overflow-hidden">
        <ParallaxOrangeBlobs />
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-14">
              <GradTag className="mb-4">Nos programmes</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                7 formations, toutes sur mesure.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((p, i) => (
              <SectionReveal key={p.href} delay={i * 0.06}>
                <Link
                  href={p.href}
                  className="group flex flex-col h-full bg-bg rounded-[14px] border overflow-hidden hover:-translate-y-0.5 transition-transform duration-200 relative"
                  style={{
                    borderColor: p.badge ? 'rgba(255,140,0,0.40)' : border,
                    boxShadow: p.badge ? '0 0 28px rgba(255,107,0,0.08)' : undefined,
                  }}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg/80" />
                    {p.badge && (
                      <span
                        className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={badgeColors[p.badge] ?? { background: 'rgba(10,10,10,0.84)', color: '#FDBA74', border: '1px solid rgba(255,107,0,0.62)' }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-[7px] mb-3"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <p.Icon size={16} style={{ color }} />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed flex-1">{p.description}</p>
                    <span
                      className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold transition-opacity group-hover:opacity-70"
                      style={{ color }}
                    >
                      Voir le programme <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Impact ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Impact réel</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce qu&apos;une formation DKDP change concrètement.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-16">
            {/* Progression — gauche */}
            <SectionReveal>
              <div
                className="h-full rounded-[20px] p-8 border"
                style={{ background: bg, borderColor: border }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6" style={{ color }}>
                  Progression observée sur 500+ participants
                </p>
                <ProgressionDiagram />
              </div>
            </SectionReveal>

            {/* KPIs — droite */}
            <div className="grid grid-cols-2 gap-4 items-stretch">
              {[
                { v: '500+',     l: 'Participants formés',     sub: 'En Suisse romande depuis 2015' },
                { v: '4.9/5',    l: 'Satisfaction',            sub: 'Note moyenne post-formation' },
                { v: '91%',      l: 'Appliquent dès J+1',      sub: 'Compétences utilisées immédiatement' },
                { v: '< 3 sem.', l: 'Pour constater l\'effet', sub: 'Gain de productivité mesurable' },
              ].map((kpi, i) => (
                <SectionReveal key={kpi.l} delay={i * 0.08} className="h-full">
                  <div
                    className="flex flex-col justify-center h-full p-6 rounded-[14px] border text-center"
                    style={{ background: bg, borderColor: border }}
                  >
                    <p className="text-3xl font-bold mb-2 leading-none" style={{ color }}>{kpi.v}</p>
                    <p className="text-white text-sm font-semibold leading-snug">{kpi.l}</p>
                    <p className="text-text-muted text-xs mt-1 leading-snug">{kpi.sub}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Formation IA',
                before: 'L\'équipe évite ChatGPT par crainte de faire des erreurs ou de divulguer des données',
                after: 'Chaque collaborateur a ses propres prompts, gagne 1h30 par jour et comprend les limites',
                tag: 'ChatGPT, Claude, Copilot',
              },
              {
                title: 'Bureautique Excel',
                before: 'Les rapports prennent 4h chaque lundi matin, manuellement, avec des erreurs récurrentes',
                after: 'Tableaux croisés dynamiques automatisés en 15 min. Zéro erreur de saisie',
                tag: 'Excel, Microsoft 365',
              },
              {
                title: 'Cybersécurité',
                before: '3 collaborateurs sur 5 cliquent sur un lien de phishing simulé lors du test initial',
                after: 'Après la formation : 0 clic sur les tests suivants. Réflexes acquis définitivement',
                tag: 'Phishing, RGPD, Mots de passe',
              },
            ].map((c, i) => (
              <SectionReveal key={c.title} delay={i * 0.1}>
                <div className="flex flex-col h-full rounded-[16px] border border-border overflow-hidden">
                  <div className="p-5 min-h-[96px] flex flex-col justify-between" style={{ background: bg }}>
                    <span
                      className="self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(10,10,10,0.84)', color, border: '1px solid rgba(255,107,0,0.52)' }}
                    >
                      {c.tag}
                    </span>
                    <p className="text-white font-bold mt-3">{c.title}</p>
                  </div>
                  <div className="p-5 flex flex-col gap-4 flex-1 bg-bg-card">
                    <div>
                      <p className="text-text-muted text-xs font-semibold mb-1">Avant</p>
                      <p className="text-text-secondary text-sm">{c.before}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-1" style={{ color }}>Après DKDP</p>
                      <p className="text-white text-sm">{c.after}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI Calculator ── */}
      <FormationROICalculator />

      {/* ── Formats ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionReveal>
                <div className="mb-10">
                  <GradTag className="mb-4">Comment ça se passe</GradTag>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                    Une formation qui s&apos;adapte à vous.
                  </h2>
                </div>
              </SectionReveal>
              <div className="flex flex-col gap-6">
                {FORMATS.map((f, i) => (
                  <SectionReveal key={f.title} delay={i * 0.1}>
                    <div className="flex gap-5 p-6 bg-bg-card border border-border rounded-[14px]">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <f.Icon size={22} style={{ color }} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
            <SectionReveal delay={0.2}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.12)' }}>
                <Image
                  src="/images/services/dkdp-formation-ia.webp"
                  alt="Formation IA en présentiel pour équipes professionnelles"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Déroulement ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section className="py-24 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Déroulement</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                De la demande au résultat en 4 étapes.
              </h2>
            </div>
          </SectionReveal>
          <div className="relative">
            {/* Ligne directrice horizontale - orange */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(255,140,0,0.20) 5%, rgba(255,140,0,0.70) 25%, #FF8C00 50%, rgba(255,140,0,0.70) 75%, rgba(255,140,0,0.20) 95%, transparent)',
              }}
            />
          <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                Icon: Users,
                n: '01',
                title: 'Analyse de vos besoins',
                desc: 'Appel de 30 minutes pour comprendre votre équipe, vos outils, votre niveau actuel et vos objectifs. On construit le programme ensemble.',
              },
              {
                Icon: BookCheck,
                n: '02',
                title: 'Programme sur mesure',
                desc: 'On livre un programme personnalisé sous 48h. Modules, durée, exemples tirés de votre secteur. Vous validez avant la formation.',
              },
              {
                Icon: GraduationCap,
                n: '03',
                title: 'Formation pratique',
                desc: 'Session interactive chez vous ou à distance. On travaille sur vos vrais outils, vos vrais fichiers, vos vrais cas. Pas de théorie sans pratique.',
              },
              {
                Icon: Target,
                n: '04',
                title: 'Suivi post-formation',
                desc: 'Guide PDF récapitulatif livré. Session de questions-réponses disponible 30 jours après. On s\'assure que les compétences restent.',
              },
            ].map((step, i) => (
              <SectionReveal key={step.n} delay={i * 0.1}>
                <div className="relative flex flex-col gap-4 p-7 bg-bg rounded-[16px] border border-border h-full">
                  <span
                    className="absolute top-4 right-4 text-[11px] font-bold"
                    style={{ color: `${color}55` }}
                  >
                    {step.n}
                  </span>
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <step.Icon size={22} style={{ color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm flex-1">{step.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Témoignages ── */}
      <LogoBanner label="Équipes déjà formées" />
      <Testimonials accentRgb="255,140,0" />

      {/* ── FAQ ── */}
      <FAQSection items={FAQ_FORMATION} title="Vos questions sur nos formations" />

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
                  <p className="text-white font-semibold">Automatiser vos processus avec l&apos;IA</p>
                  <p className="text-text-muted text-xs mt-1">Agents IA, automatisation, audit offert. ROI en moins de 3 mois.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 text-[#D4D4D8] transition-transform group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <Link
                href="/agence-digitale"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(124,58,237,0.07)', borderColor: 'rgba(124,58,237,0.22)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#A78BFA' }}>Service Digital</p>
                  <p className="text-white font-semibold">Un site et un SEO qui ramènent des clients</p>
                  <p className="text-text-muted text-xs mt-1">Création de sites, SEO, Google Ads. Un seul interlocuteur.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 text-[#A78BFA] transition-transform group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Partenaire : cours-informatique.ch ── */}
      <section className="py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="relative overflow-hidden rounded-[24px] border"
              style={{
                background: 'linear-gradient(135deg, rgba(255,105,0,0.10) 0%, rgba(255,105,0,0.04) 60%, rgba(255,140,0,0.07) 100%)',
                borderColor: 'rgba(255,105,0,0.28)',
              }}
            >
              {/* Blob déco */}
              <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,105,0,0.10) 0%, transparent 70%)' }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0 items-stretch">

                {/* Contenu gauche */}
                <div className="p-10 md:p-12">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest"
                    style={{ background: 'rgba(255,105,0,0.15)', color: '#FF8C00', border: '1px solid rgba(255,105,0,0.30)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF6900' }} />
                    Notre marque partenaire
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4 text-white">
                    Vous êtes un particulier ou un indépendant ?
                  </h2>
                  <p className="text-text-secondary text-base leading-relaxed mb-8 max-w-xl">
                    Les formations DKDP sont pensées pour les équipes d&apos;entreprise. Pour les particuliers, seniors ou débutants qui souhaitent apprendre à leur propre rythme, nous avons fondé{' '}
                    <span className="text-white font-semibold">cours-informatique.ch</span>{' '}
                    : cours individuels en présentiel à Genève ou à domicile, animés par les mêmes formateurs. L&apos;informatique en toute simplicité.
                  </p>

                  {/* 3 points clés */}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
                    {[
                      { Icon: User, label: 'Cours individuels, un formateur pour vous' },
                      { Icon: Monitor, label: 'Débutants et seniors bienvenus' },
                      { Icon: GraduationCap, label: 'À domicile ou à Genève centre' },
                    ].map(({ Icon, label }) => (
                      <div key={label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-[10px]"
                        style={{ background: 'rgba(255,105,0,0.10)', border: '1px solid rgba(255,105,0,0.18)' }}
                      >
                        <Icon size={14} style={{ color: '#FF8C00' }} />
                        <span className="text-text-secondary text-sm">{label}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://cours-informatique.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[10px] text-sm font-semibold transition-all hover:opacity-80"
                    style={{
                      background: '#FF6900',
                      color: '#fff',
                    }}
                  >
                    Découvrir cours-informatique.ch
                    <ExternalLink size={14} />
                  </a>
                </div>

                {/* Colonne droite : mascotte thumbs up */}
                <div className="hidden lg:flex items-center justify-center relative overflow-hidden rounded-r-[24px] p-8"
                  style={{ background: 'rgba(255,105,0,0.08)', borderLeft: '1px solid rgba(255,105,0,0.18)' }}
                >
                  <Image
                    src="/images/partners/ci-mascot-thumbs.svg"
                    alt="Mascotte cours-informatique.ch"
                    width={260}
                    height={160}
                    className="w-full h-auto object-contain"
                  />
                </div>

              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal accentRgb="255,140,0" />

    </main>
  )
}
