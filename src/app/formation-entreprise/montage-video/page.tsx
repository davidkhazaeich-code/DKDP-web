import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, Clock, Users, Award, Star, Smartphone, BarChart2, Layers, Zap } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { FAQSection } from '@/components/sections/FAQSection'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Formation Montage Vidéo Entreprise Genève · DKDP',
  description:
    'Formation montage vidéo pour entreprises à Genève. CapCut, DaVinci Resolve et Premiere Pro. Produisez vos Reels, vidéos YouTube et contenus d\'entreprise en interne. Sur mesure.',
  alternates: { canonical: 'https://dkdp.ch/formation-entreprise/montage-video' },
}

const FAQ = [
  {
    question: 'Faut-il du matériel professionnel pour suivre la formation montage vidéo ?',
    answer:
      'Non. La formation DKDP est orientée smartphone et outils accessibles. CapCut et DaVinci Resolve permettent de créer des vidéos de très bonne qualité avec un iPhone ou un Android et un ordinateur standard. On travaille sur ce que vous avez déjà.',
  },
  {
    question: 'Quels logiciels de montage vidéo sont couverts dans la formation ?',
    answer:
      'La formation couvre CapCut (mobile et desktop, gratuit), idéal pour les Reels et contenus courts, DaVinci Resolve pour le montage professionnel et l\'étalonnage colorimétrique, et Adobe Premiere Pro pour les projets complexes. Le programme est adapté selon votre niveau et vos besoins.',
  },
  {
    question: 'La formation aborde-t-elle le tournage ou uniquement le montage ?',
    answer:
      'Les deux. DKDP couvre les bases du tournage (cadrage, lumière naturelle, stabilisation, son) avant le montage. Une bonne vidéo commence avant la prise en main du logiciel.',
  },
  {
    question: 'Peut-on créer des Reels et TikToks professionnels avec cette formation ?',
    answer:
      'Oui. Un module complet est dédié aux formats courts verticaux (9:16) : Reels Instagram, TikTok et YouTube Shorts. On couvre le storytelling court, les transitions, les sous-titres automatiques et la musique libre de droits.',
  },
  {
    question: 'La musique utilisée dans les vidéos est-elle libre de droits ?',
    answer:
      'La formation couvre les sources de musique libre de droits : CapCut Sound Library, Epidemic Sound, YouTube Audio Library et Pixabay. Vous apprenez à éviter les blocages de copyright lors de la publication.',
  },
  {
    question: 'La formation inclut-elle les sous-titres automatiques ?',
    answer:
      'Oui. Les sous-titres automatiques sont un module à part entière. Plus de 80% des vidéos sur les réseaux sont regardées sans son. CapCut et d\'autres outils génèrent des sous-titres automatiquement que vous corrigez en quelques minutes.',
  },
]

const MODULES = [
  'Prise de vue : cadrage, lumière, son sur smartphone et caméra',
  'CapCut : montage Reels et vidéos courtes (mobile et desktop)',
  'DaVinci Resolve : montage professionnel et étalonnage colorimétrique',
  'Sous-titres automatiques et manuels',
  'Motion graphics et transitions dynamiques',
  'Export multi-formats (Instagram, YouTube, LinkedIn, site web)',
  'Musique libre de droits : où trouver et comment intégrer',
  'Workflow de production rapide pour contenus réguliers',
]

const ROLES = [
  'Équipes marketing et communication',
  'Community managers',
  'Chargés de communication',
  'Entrepreneurs et indépendants',
  'Équipes RH (vidéos de recrutement)',
  'Toute personne créant du contenu régulier',
]

const steps = [
  { Icon: Smartphone, title: 'Fondamentaux capture', desc: 'Prise de vue avec smartphone : cadrage, lumière naturelle, son. Les bases pour filmer professionnel sans matériel coûteux.' },
  { Icon: Layers, title: 'Montage CapCut', desc: 'Montage Reels et vidéos courtes avec CapCut. Sous-titres, transitions, musique. Première vidéo créée pendant la formation.' },
  { Icon: BarChart2, title: 'Montage avancé', desc: 'Introduction à DaVinci Resolve. Étalonnage colorimétrique, motion graphics et export multi-formats.' },
  { Icon: Award, title: 'Workflow & autonomie', desc: 'Mise en place d\'un workflow de production hebdomadaire. Chaque participant repart avec ses templates et son process.' },
]

const color = '#FF8C00'
const bg = 'rgba(255,107,0,0.08)'
const border = 'rgba(255,107,0,0.18)'

function VideoToolCards() {
  const tools = [
    {
      name: 'CapCut',
      level: 'Débutant – Intermédiaire',
      price: 'Gratuit',
      bestFor: 'Reels, TikTok, Stories',
      platforms: 'Mobile + Desktop',
      c: '#FF0050',
      cbg: 'rgba(255,0,80,0.08)',
      cborder: 'rgba(255,0,80,0.22)',
    },
    {
      name: 'DaVinci Resolve',
      level: 'Intermédiaire – Avancé',
      price: 'Gratuit',
      bestFor: 'Montage pro, étalonnage',
      platforms: 'Desktop',
      c: '#4ade80',
      cbg: 'rgba(74,222,128,0.08)',
      cborder: 'rgba(74,222,128,0.22)',
    },
    {
      name: 'Adobe Premiere',
      level: 'Professionnel',
      price: 'Abonnement Adobe',
      bestFor: 'Projets complexes',
      platforms: 'Desktop',
      c: '#9999FF',
      cbg: 'rgba(153,153,255,0.08)',
      cborder: 'rgba(153,153,255,0.22)',
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
      {tools.map((t) => (
        <div key={t.name} className="p-4 rounded-[12px] flex flex-col gap-3" style={{ background: t.cbg, border: `1px solid ${t.cborder}` }}>
          <div>
            <p className="text-white font-bold text-sm mb-1.5">{t.name}</p>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block" style={{ background: 'rgba(255,255,255,0.06)', color: t.c, border: `1px solid ${t.cborder}` }}>
              {t.level}
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Prix</p>
              <p className="text-white text-[12px] font-semibold">{t.price}</p>
            </div>
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Idéal pour</p>
              <p className="text-[12px] font-semibold leading-snug" style={{ color: t.c }}>{t.bestFor}</p>
            </div>
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Plateforme</p>
              <p className="text-white text-[12px]">{t.platforms}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function FormationMontageVideoPage() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildCourse({ name: 'Formation Montage Vidéo Entreprise Genève', url: '/formation-entreprise/montage-video', description: 'Formation montage vidéo pour équipes d\'entreprise à Genève. CapCut, DaVinci Resolve et Premiere Pro. Produisez vos vidéos professionnelles en interne.' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Montage vidéo', url: 'https://dkdp.ch/formation-entreprise/montage-video' },
      ])} />

      {/* ── Hero ── */}
      <InfiniteGrid accentRgb="255,140,0" blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/formation-entreprise" className="text-text-muted text-sm hover:text-white transition-colors">
                Formation Entreprise
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Montage vidéo</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">CapCut · DaVinci · Premiere Pro</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Produisez vos propres vidéos professionnelles,{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>en interne.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP forme vos équipes à CapCut, DaVinci Resolve et Premiere Pro. Après une journée, vous produisez vos Reels, vidéos YouTube et contenus d&apos;entreprise vous-mêmes.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=formation" size="lg">Demander un devis →</LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-white transition-colors">
                    Voir le programme ↓
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-montage-video.webp"
                    alt="Formation montage vidéo avec CapCut et DaVinci Resolve en entreprise à Genève"
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
      </InfiniteGrid>

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '10+', l: 'Outils maîtrisés', sub: 'CapCut, DaVinci, Premiere...' },
              { v: '2.7×', l: 'Engagement vidéo', sub: 'vs contenu statique' },
              { v: '4h/sem', l: 'Économisées', sub: 'En post-production' },
              { v: '1 journée', l: 'Pour produire seul', sub: 'Votre première vidéo pro' },
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

      {/* ── Pourquoi maintenant ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi maintenant</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                La vidéo n&apos;est plus une option. C&apos;est le format qui convertit.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Les entreprises qui externalisent leur production vidéo dépensent en moyenne CHF 300 à 800 par contenu, pour des délais de 5 à 10 jours. Avec les bons outils et une formation d&apos;une journée, vos équipes produisent le même résultat en 45 minutes, en interne.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP ne forme pas à la théorie. On ouvre CapCut, DaVinci ou Premiere et on produit de vraies vidéos pendant la session. Vous repartez avec vos templates, votre workflow et votre première vidéo publiée.
              </p>
              <div className="space-y-3">
                {[
                  'Les Reels génèrent 2.7× plus d\'engagement que les images sur Instagram',
                  'La vidéo courte est le format numéro 1 de découverte de marque en 2026',
                  'Produire en interne réduit les coûts de production de 70 à 85%',
                ].map((fact, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{fact}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-5 md:p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(255,107,0,0.07)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Les 3 outils couverts
                </p>
                <VideoToolCards />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Le programme est adapté selon votre niveau. Pas besoin de maîtriser les trois.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Programme ── */}
      <section id="programme" className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Du tournage à la publication en une journée.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La formation commence par les bases du tournage avec smartphone (cadrage, lumière, son), puis enchaîne sur CapCut pour les formats courts, DaVinci Resolve pour le montage professionnel et l&apos;étalonnage, et enfin Premiere Pro pour ceux qui veulent aller plus loin. Chaque module débouche sur une production réelle.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Chaque participant repart avec ses propres templates, son workflow de production hebdomadaire et au moins une vidéo exportée et prête à publier.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {MODULES.map((item) => (
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

      {/* ── Pour qui ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profils</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Pour qui est cette formation ?
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ROLES.map((role, i) => (
              <SectionReveal key={role} delay={i * 0.07}>
                <div
                  className="flex items-center justify-center text-center p-4 rounded-[12px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <p className="text-white font-medium text-sm">{role}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Déroulement ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Déroulement</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce qui se passe pendant la journée.
              </h2>
            </div>
          </SectionReveal>
          <div className="relative">
            <div aria-hidden="true" className="hidden lg:block absolute left-0 right-0 h-px top-[52px] pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,140,0,0.20) 5%, rgba(255,140,0,0.70) 25%, #FF8C00 50%, rgba(255,140,0,0.70) 75%, rgba(255,140,0,0.20) 95%, transparent)' }} />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <SectionReveal key={s.title} delay={i * 0.08}>
                  <div className="flex flex-col gap-3 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                    <div className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}>
                      <s.Icon size={20} style={{ color }} />
                    </div>
                    <h3 className="text-white font-semibold text-sm">{s.title}</h3>
                    <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Ce qu&apos;ils en disent</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                La parole à nos participants.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'Avant la formation, on externalisait nos vidéos Instagram à CHF 300 la pièce. Maintenant on les fait en interne en 45 minutes. ROI immédiat.',
                name: 'Responsable marketing',
                company: 'Marque lifestyle, Genève',
                stars: 5,
              },
              {
                quote: 'En une journée, j\'ai appris à monter, étalonner et exporter mes vidéos YouTube. DKDP m\'a donné les bases et la méthode pour être autonome.',
                name: 'Fondateur',
                company: 'Coach sportif, Lausanne',
                stars: 5,
              },
              {
                quote: 'Notre équipe RH crée maintenant ses propres vidéos pour les offres d\'emploi. L\'engagement de nos posts est 4× supérieur depuis qu\'on utilise la vidéo.',
                name: 'DRH',
                company: 'PME tech, Genève',
                stars: 5,
              },
            ].map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={12} style={{ color }} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${border}` }}>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarifs ── */}
      <InfiniteGrid accentRgb="255,140,0" blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)">
        <section className="py-24 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Un tarif forfaitaire par groupe, transparent.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                Pas de tarif par personne. Un prix fixe par groupe, quel que soit le nombre de participants (dans la limite indiquée).
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Initiation (½ j.)',
                price: 'CHF 700',
                duration: '3h · jusqu\'à 10 personnes',
                highlight: false,
                badge: '',
                features: [
                  'Prise de vue smartphone',
                  'CapCut : montage de base',
                  '1 vidéo créée en séance',
                  'Templates fournis',
                  'Attestation individuelle',
                ],
                cta: 'Demander un devis',
              },
              {
                label: 'Journée Complète',
                price: "CHF 1'200",
                duration: '6h · jusqu\'à 10 personnes',
                highlight: true,
                badge: 'Le plus demandé',
                features: [
                  'Capture + CapCut + DaVinci',
                  'Sous-titres et motion graphics',
                  'Export multi-formats',
                  'Workflow production hebdo',
                  'Attestation individuelle',
                  'Q&R 30 jours après',
                ],
                cta: 'Demander un devis',
              },
              {
                label: 'Programme Créateur',
                price: "CHF 2'200",
                duration: '12h · jusqu\'à 10 personnes',
                highlight: false,
                badge: '',
                features: [
                  'CapCut + DaVinci + Premiere',
                  'Étalonnage avancé',
                  'Série de vidéos produite',
                  'Stratégie contenu vidéo',
                  'Suivi 60 jours',
                  'Attestation + rapport individuel',
                ],
                cta: 'Demander un devis',
              },
            ].map((offer, i) => (
              <SectionReveal key={offer.label} delay={i * 0.1}>
                <div
                  className="relative flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{
                    borderColor: offer.highlight ? color : border,
                    boxShadow: offer.highlight ? '0 0 40px rgba(255,107,0,0.14)' : 'none',
                  }}
                >
                  {offer.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: color }} />
                  )}
                  <div className="p-7 flex flex-col flex-1" style={{ background: offer.highlight ? bg : 'transparent' }}>
                    {offer.badge && (
                      <span
                        className="inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                        style={{ background: bg, color, border: `1px solid ${border}` }}
                      >
                        {offer.badge}
                      </span>
                    )}
                    <p className="text-white font-bold text-xl mb-1">{offer.label}</p>
                    <p className="text-2xl font-bold mb-0.5" style={{ color }}>{offer.price}</p>
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
                      href="/contact?service=formation"
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
      </InfiniteGrid>

      {/* ── FAQ ── */}
      <FAQSection items={FAQ} title="Vos questions sur la formation montage vidéo" />

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/formation-entreprise/reseaux-sociaux"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,0,0.06) 0%, rgba(255,107,0,0.02) 100%)',
                borderColor: border,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Zap size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Aller plus loin</p>
                  <p className="text-white font-bold text-lg leading-tight">Diffuser vos vidéos avec impact</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Vous produisez vos vidéos. Pour les diffuser efficacement sur les bonnes plateformes et maximiser l&apos;engagement, découvrez notre formation réseaux sociaux.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Formation réseaux sociaux <ChevronRight size={12} />
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
