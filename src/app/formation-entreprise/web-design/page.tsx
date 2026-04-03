import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, Clock, Users, Award, Star, Layers, PenTool, Layout, Globe2, TrendingUp, BarChart2, Zap } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { SchemaOrg } from '@/components/seo/SchemaOrg'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { orange } from '@/lib/tokens'
import { DesignToolCards } from './_components/DesignToolCards'

export const metadata: Metadata = {
  title: 'Formation Web Design & Canva Genève · DKDP',
  description:
    'Formation web design et Canva pour entreprises à Genève. Créez des visuels professionnels sans être graphiste. Charte graphique, templates et exports. Sur mesure.',
  alternates: { canonical: 'https://dkdp.ch/formation-entreprise/web-design' },
}

const FAQ = [
  {
    question: 'Faut-il être graphiste pour suivre la formation web design ?',
    answer:
      'Non. La formation DKDP est conçue pour des non-graphistes. On vous apprend à utiliser Canva et les principes de base du design (typographie, couleurs, mise en page) pour créer des visuels professionnels sans logiciel complexe.',
  },
  {
    question: "Qu'est-ce que Canva et pourquoi l'utiliser ?",
    answer:
      "Canva est un outil de création graphique en ligne, accessible sans compétences techniques. Il permet de créer des présentations, des posts réseaux sociaux, des flyers, des bannières et bien d'autres visuels en quelques minutes. C'est l'outil idéal pour les équipes qui veulent être autonomes visuellement.",
  },
  {
    question: "La formation couvre-t-elle uniquement Canva ?",
    answer:
      "Canva est l'outil central de la formation. On couvre également les bases du design (typographie, hiérarchie visuelle, palette de couleurs) et les principes de la charte graphique. Pour ceux qui souhaitent aller plus loin, un module sur Figma et Adobe Express est inclus dans les formules avancées.",
  },
  {
    question: 'Peut-on intégrer notre charte graphique dans Canva ?',
    answer:
      "Oui. Un module entier est dédié à la configuration du Canva Brand Kit : import de votre logo, définition de votre palette de couleurs, choix de vos polices. À la fin de la formation, vos templates sont aux couleurs de votre entreprise.",
  },
  {
    question: 'Quels formats peut-on créer avec Canva ?',
    answer:
      "Posts réseaux sociaux (Instagram, LinkedIn, Facebook), Stories et Reels, présentations PowerPoint-like, flyers et affiches, newsletters, bannières web, cartes de visite et documents internes. La formation couvre les formats les plus utiles pour votre activité.",
  },
  {
    question: 'La version gratuite de Canva suffit-elle ?',
    answer:
      "La version gratuite couvre déjà 80% des besoins. Canva Pro (CHF 15/mois) débloque les fonctionnalités avancées comme le Brand Kit complet, la suppression de fond, et les templates premium. DKDP vous aide à choisir la formule adaptée à vos besoins.",
  },
]

const MODULES = [
  'Principes de design graphique (couleurs, typographie, espacement)',
  'Canva Pro : templates, identité de marque et kit graphique',
  'Création de visuels pour réseaux sociaux (tous formats)',
  'Présentations PowerPoint et Google Slides niveau pro',
  "Figma : wireframes et maquettes d'écrans simples",
  'Bannières web, flyers et supports imprimés',
  'Export et formats : print vs web vs mobile',
  'Cohérence visuelle et charte graphique personnelle',
]

const color = orange.color, bg = orange.bg, border = orange.border

const steps = [
  {
    Icon: Layers,
    title: 'Bases du design',
    desc: "Théorie essentielle : couleurs, typographie, mise en page. Ce qui distingue un visuel professionnel d'un visuel amateur.",
  },
  {
    Icon: Layout,
    title: 'Canva en pratique',
    desc: 'Création de vos templates personnels : posts, stories, bannières, présentations. Kit de marque configuré.',
  },
  {
    Icon: PenTool,
    title: 'Introduction Figma',
    desc: 'Création de maquettes simples et wireframes. Les bases pour collaborer avec un développeur ou une agence web.',
  },
  {
    Icon: Award,
    title: 'Portfolio & process',
    desc: 'Chaque participant repart avec 5 visuels créés et un process de production efficace pour son quotidien.',
  },
]

export default function FormationWebDesignPage() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildCourse({ name: 'Formation Web Design Canva Entreprise Genève', url: '/formation-entreprise/web-design', description: "Formation Canva et web design pour équipes d'entreprise à Genève. Créez des visuels professionnels sans être graphiste." })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Web design & Canva', url: 'https://dkdp.ch/formation-entreprise/web-design' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/formation-entreprise" className="text-text-muted text-sm hover:text-white transition-colors">
                Formation Entreprise
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Web design &amp; Canva</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Canva · Figma · Design graphique</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Créez vos visuels et supports de communication{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>vous-même.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP forme vos équipes à Canva, Figma et les principes de design graphique. Après une journée, vous créez des visuels professionnels sans faire appel à une agence.
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
                    src="/images/services/dkdp-formation-web-design.webp"
                    alt="Formation web design et Canva en entreprise à Genève"
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
              { v: '3', l: 'Outils maîtrisés', sub: 'Canva, Figma, Adobe Express' },
              { v: '3h/sem', l: 'Économisées', sub: 'Sur création de visuels' },
              { v: '85%', l: 'Autonomie', sub: 'Sur supports de communication' },
              { v: '1 journée', l: 'Pour créer seul', sub: 'Vos supports professionnels' },
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
                Chaque visuel externalisé vous coûte du temps et de l&apos;argent.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Attendre une agence pour un post Instagram, payer un graphiste pour un flyer, relancer plusieurs fois pour un document de présentation : ces frictions ralentissent vos équipes et grignotent votre budget communication.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Avec les bons outils et les bonnes bases, vos collaborateurs créent eux-mêmes des visuels cohérents et professionnels. En une journée, l&apos;autonomie devient une réalité.
              </p>
              <div className="space-y-3">
                {[
                  "Les PME dépensent en moyenne CHF 4 000/an en création graphique externalisée",
                  "Canva est utilisé par plus de 170 millions de personnes dans le monde pour sa simplicité",
                  "Un kit de templates bien construit réduit le temps de production visuelle de 70%",
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
                <DesignToolCards />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  On adapte la profondeur selon votre niveau et vos besoins. Canva est toujours le point de départ.
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
                Du zéro au visuel professionnel en une session.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La formation commence par les principes fondamentaux du design (en 45 min, pas plus) puis on passe directement à Canva. Chaque participant crée ses premiers visuels pendant la formation, aux couleurs de son entreprise, sur les formats qu&apos;il utilisera vraiment.
              </p>
              <p className="text-text-secondary leading-relaxed">
                À la fin de la session, vous disposez d&apos;un kit de templates prêts à l&apos;emploi. Plus besoin de repartir de zéro à chaque publication : vos templates font le travail.
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Équipes communication et marketing',
              'Assistantes administratives',
              'Gérants de petites entreprises',
              'Indépendants et auto-entrepreneurs',
              'Community managers',
              'Toute personne créant des supports visuels',
              'Responsables marketing sans budget agence',
              'Entrepreneurs solos',
            ].map((role, i) => (
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
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(255,140,0,0.20) 5%, rgba(255,140,0,0.70) 25%, #FF8C00 50%, rgba(255,140,0,0.70) 75%, rgba(255,140,0,0.20) 95%, transparent)',
              }}
            />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <SectionReveal key={s.title} delay={i * 0.08}>
                  <div className="flex flex-col gap-3 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                    <div
                      className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
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
                quote: "Avant la formation, je payais une graphiste pour chaque post Instagram. Maintenant je crée mes visuels en 15 minutes avec Canva. Rentabilisé en 2 semaines.",
                name: 'Fondatrice',
                company: 'Boutique artisanale, Genève',
                stars: 5,
              },
              {
                quote: "On a formé toute notre équipe communication à Canva. La cohérence visuelle de notre marque s'est améliorée du jour au lendemain. Fini les visuels disparates.",
                name: 'Responsable marketing',
                company: 'PME 40 personnes, Vaud',
                stars: 5,
              },
              {
                quote: "La partie Figma était une révélation. Je peux maintenant concevoir les interfaces de mes apps moi-même et les expliquer à mes développeurs.",
                name: 'Fondateur',
                company: 'Startup tech, Genève',
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
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
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
                label: 'Canva Essentiel (½ j.)',
                price: 'CHF 700',
                duration: "3h · jusqu'à 10 personnes",
                highlight: false,
                badge: null,
                features: [
                  'Principes design de base',
                  'Canva : templates et kit marque',
                  '5 visuels créés en séance',
                  'Guide pratique inclus',
                  'Attestation individuelle',
                ],
                cta: 'Demander un devis',
              },
              {
                label: 'Journée Design Pro',
                price: "CHF 1'200",
                duration: "6h · jusqu'à 10 personnes",
                highlight: true,
                badge: 'Le plus demandé',
                features: [
                  'Canva avancé + introduction Figma',
                  'Tous formats (social, print, web)',
                  'Kit de marque personnalisé',
                  'Export multi-formats',
                  'Attestation individuelle',
                  'Q&R 30 jours après',
                ],
                cta: 'Demander un devis',
              },
              {
                label: 'Programme Créatif',
                price: "CHF 2'000",
                duration: "12h · jusqu'à 10 personnes",
                highlight: false,
                badge: null,
                features: [
                  'Canva + Figma + Adobe Express',
                  'Identité visuelle complète',
                  "Maquettes d'interfaces web",
                  'Animation et motion basics',
                  'Attestation + rapport individuel',
                  'Suivi 60 jours',
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
      </HeroBg>

      {/* ── FAQ ── */}
      <FAQSection items={FAQ} title="Vos questions sur la formation web design et Canva" />

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
                  <Globe2 size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Aller plus loin</p>
                  <p className="text-white font-bold text-lg leading-tight">Diffuser vos visuels sur les bons réseaux</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Vous créez de beaux visuels. Pour les diffuser efficacement sur les bonnes plateformes et bâtir votre audience, découvrez notre formation réseaux sociaux.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir la formation <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal accentRgb="255,140,0" />
    </main>
  )
}
