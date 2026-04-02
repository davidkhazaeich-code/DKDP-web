import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, BarChart2, Clock, TrendingUp, Zap, Users, Award, Star, BookOpen, Settings, Monitor, Cpu } from 'lucide-react'
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
  title: 'Formation Bureautique & Excel Genève · Microsoft 365 · DKDP',
  description:
    'Formation bureautique professionnelle à Genève. Excel, Word, PowerPoint et Microsoft 365. Tous niveaux, sur mesure, en présentiel ou en ligne.',
  alternates: { canonical: 'https://dkdp.ch/formation-entreprise/bureautique' },
}

function ExcelSkillsComparison() {
  const before = [
    'SOMME basique uniquement',
    'Copier-coller manuel',
    'Mise en forme manuelle',
    'Filtres simples',
    'Tableaux statiques',
  ]
  const after = [
    'TCD et tableaux dynamiques',
    'RECHERCHEV, INDEX/EQUIV',
    'Mise en forme conditionnelle',
    'Graphiques dynamiques',
    'Power Query et macros',
    'Formules imbriquées',
  ]
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div
        className="flex flex-col gap-3 p-4 rounded-[12px]"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}
      >
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#f87171' }}>Avant formation</p>
        <div className="space-y-2">
          {before.map((item) => (
            <div key={item} className="flex items-start gap-1.5">
              <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#f87171' }} />
              <span className="text-text-muted text-[11px] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex flex-col gap-3 p-4 rounded-[12px]"
        style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)' }}
      >
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#4ade80' }}>Après formation DKDP</p>
        <div className="space-y-2">
          {after.map((item) => (
            <div key={item} className="flex items-start gap-1.5">
              <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#4ade80' }} />
              <span className="text-text-muted text-[11px] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const FAQ = [
  {
    question: 'À quel niveau de compétences s\'adresse la formation bureautique ?',
    answer:
      'DKDP propose des formations bureautique pour tous les niveaux : débutant (navigation, fichiers, logiciels de base), intermédiaire (Excel formules, mise en forme avancée, publipostage) et avancé (tableaux croisés dynamiques, macros Excel, Power Query). Le niveau du groupe est évalué en amont.',
  },
  {
    question: 'Quels logiciels sont couverts dans la formation bureautique ?',
    answer:
      'La formation couvre Microsoft Excel, Word, PowerPoint et Outlook. On peut aussi inclure Microsoft Teams, SharePoint, OneDrive et les outils de collaboration Microsoft 365 selon vos besoins.',
  },
  {
    question: 'Combien de temps dure une formation bureautique en entreprise ?',
    answer:
      'Une demi-journée (3h) couvre les bases d\'un logiciel spécifique. Une journée complète (6h) permet d\'aller en profondeur sur Excel ou Microsoft 365. Un programme sur 2 jours est recommandé pour couvrir l\'ensemble de la suite bureautique.',
  },
  {
    question: 'La formation peut-elle se faire sur nos ordinateurs ?',
    answer:
      'Oui, c\'est même préférable. Travailler sur vos propres machines avec vos propres fichiers rend la formation immédiatement applicable. DKDP peut aussi apporter des ordinateurs portables si nécessaire.',
  },
  {
    question: 'Comment est évalué le niveau des participants avant la formation ?',
    answer:
      'DKDP envoie un questionnaire d\'évaluation simple avant chaque formation. Cela permet d\'adapter le programme au niveau réel du groupe et de ne pas perdre de temps sur des notions déjà maîtrisées.',
  },
  {
    question: 'Les participants reçoivent-ils des supports de formation ?',
    answer:
      'Oui. Chaque participant reçoit un support de cours numérique (PDF ou Notion) avec les étapes-clés, les raccourcis essentiels et des exercices pratiques à faire en autonomie après la formation.',
  },
]

const MODULES = [
  'Excel : formules essentielles (SOMME.SI, RECHERCHEV, INDEX/EQUIV, NB.SI)',
  'Excel : mise en forme conditionnelle et graphiques dynamiques',
  'Excel : tableaux croisés dynamiques et Power Query',
  'Word : modèles, styles et publipostage professionnel',
  'PowerPoint : design de présentations convaincantes',
  'Outlook : gestion avancée des emails et règles automatiques',
  'Microsoft 365 : Teams, SharePoint, OneDrive et collaboration temps réel',
  'Raccourcis et automatisations pour gagner 3h/semaine',
]

const STEPS = [
  {
    Icon: BookOpen,
    title: 'Évaluation initiale',
    desc: 'Questionnaire envoyé en amont pour calibrer le niveau du groupe. Programme adapté le jour J.',
  },
  {
    Icon: Users,
    title: 'Formation pratique',
    desc: 'Travail sur vos vrais fichiers et vos vrais cas. Pas d\'exercices fictifs : on améliore vos documents existants.',
  },
  {
    Icon: Award,
    title: 'Exercices & Quiz',
    desc: 'Exercices progressifs tout au long de la journée. Quiz de consolidation en fin de session.',
  },
  {
    Icon: CheckCircle2,
    title: 'Support & attestation',
    desc: 'Guide de référence numérique livré. Attestation individuelle de formation. Q&R 30 jours après.',
  },
]

const color = '#FF8C00'
const bg = 'rgba(255,107,0,0.08)'
const border = 'rgba(255,107,0,0.18)'

export default function FormationBureautiquePage() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildCourse({ name: 'Formation Bureautique Excel Microsoft 365 Genève', url: '/formation-entreprise/bureautique', description: 'Formation bureautique professionnelle à Genève. Excel, Word, PowerPoint, Outlook et Microsoft 365 pour équipes d\'entreprise.' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Bureautique & Excel', url: 'https://dkdp.ch/formation-entreprise/bureautique' },
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
              <span className="text-sm" style={{ color }}>Bureautique &amp; Excel</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Excel · Word · Microsoft 365</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Maîtrisez Excel et Microsoft 365,{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>vraiment.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP forme vos équipes à Excel, Word, PowerPoint et Microsoft 365 en présentiel à Genève. Formation adaptée à votre niveau et vos usages réels. Vos collaborateurs repartent avec des compétences applicables dès le lendemain.
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
                    src="/images/services/dkdp-formation-bureautique.webp"
                    alt="Formation bureautique et Excel en entreprise à Genève"
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
              { v: '3h', l: 'Gagnées / semaine', sub: 'Par collaborateur formé' },
              { v: '10%', l: 'Fonctions utilisées', sub: "D'Excel en moyenne" },
              { v: '85%', l: 'Satisfaction', sub: 'Note post-formation' },
              { v: '1 journée', l: 'Pour tout maîtriser', sub: 'Format intensif pratique' },
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
                { label: 'Pourquoi maintenant', href: '#pourquoi' },
                { label: 'Programme', href: '#programme' },
                { label: 'Profils', href: '#profils' },
                { label: 'Déroulement', href: '#deroulement' },
                { label: 'Tarifs', href: '#tarifs' },
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
              style={{ background: 'rgba(255,107,0,0.12)', color: '#FF8C00', border: '1px solid rgba(255,107,0,0.25)' }}
            >
              Prendre contact
            </Link>
          </div>
        </div>
      </div>

      {/* ── Pourquoi maintenant ── */}
      <section id="pourquoi" className="scroll-mt-[112px] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi maintenant</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Vos équipes utilisent Excel depuis des années. Mais pas comme ça.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La plupart des collaborateurs n&apos;utilisent que 10% des fonctionnalités d&apos;Excel ou de Word. Des heures perdues chaque semaine sur des tâches qui pourraient être automatisées en quelques clics. La formation DKDP cible les 20% de fonctions qui couvrent 80% des besoins quotidiens.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                On ne travaille pas sur des exercices fictifs. On prend vos vrais tableaux, vos vrais fichiers, et on les améliore ensemble. Dès le lendemain matin, vos équipes appliquent ce qu&apos;elles ont appris.
              </p>
              <div className="space-y-3">
                {[
                  'Les collaborateurs formés à Excel avancé gagnent en moyenne 3h par semaine',
                  "Moins de 10% des utilisateurs d'Excel maîtrisent les tableaux croisés dynamiques",
                  'Microsoft 365 est sous-utilisé dans 9 entreprises sur 10 selon Microsoft',
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
                  Avant vs après la formation
                </p>
                <ExcelSkillsComparison />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  La même personne, le même outil. Juste les bonnes techniques.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Programme ── */}
      <section id="programme" className="scroll-mt-[112px] py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Des outils que vous utilisez chaque jour, enfin maîtrisés.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La formation commence par une évaluation du niveau du groupe, puis on plonge directement dans la pratique. Chaque module est illustré avec vos cas d&apos;usage réels. On ne fait pas de démo : on travaille sur vos vrais documents.
              </p>
              <p className="text-text-secondary leading-relaxed">
                En fin de session, chaque participant dispose d&apos;un guide de référence complet et d&apos;une attestation individuelle. Pas de théorie inutile : que ce qui est utilisable le lendemain.
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
      <section id="profils" className="scroll-mt-[112px] py-24">
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
              'Assistantes administratives',
              'Comptables et analystes',
              'Chargés de projet',
              'Managers et cadres',
              'Équipes commerciales',
              'Tout collaborateur MS365',
              'Secrétaires médicales',
              'RH et recruteurs',
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
      <section id="deroulement" className="scroll-mt-[112px] py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Déroulement</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Une journée structurée pour un résultat maximal.
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
              {STEPS.map((s, i) => (
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
                quote: 'Après la formation Excel de DKDP, j\'ai automatisé 4 tâches hebdomadaires. Ce que je faisais en 3 heures se fait maintenant en 20 minutes. Magique.',
                name: 'Comptable',
                company: 'PME financière, Genève',
                stars: 5,
              },
              {
                quote: 'Toute notre équipe administrative a suivi la formation. On utilise maintenant Teams et SharePoint efficacement. La collaboration s\'est transformée.',
                name: 'DRH',
                company: 'Entreprise 120 personnes, Lausanne',
                stars: 5,
              },
              {
                quote: 'J\'utilisais Excel depuis 15 ans mais je ne savais pas ce que c\'était vraiment. La formation m\'a ouvert les yeux sur ce que je ratais.',
                name: 'Chargée de projet',
                company: 'Secteur public, Genève',
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
                      <span key={j} style={{ color }}>★</span>
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
        <section id="tarifs" className="scroll-mt-[112px] py-24 border-y border-border">
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
                label: 'Demi-journée',
                price: "CHF 700",
                duration: '3h',
                max: "Jusqu'à 10 participants",
                features: [
                  '1 logiciel au choix',
                  'Exercices pratiques',
                  'Support numérique',
                  'Attestation incluse',
                ],
                highlight: false,
                cta: 'Demander un devis',
              },
              {
                label: 'Journée complète',
                price: "CHF 1'200",
                duration: '6h',
                max: "Jusqu'à 10 participants",
                features: [
                  'Excel + Word + Outlook',
                  'Travail sur vos vrais fichiers',
                  'Exercices progressifs',
                  'Support complet + raccourcis',
                  'Attestation individuelle',
                  'Q&R 30 jours après',
                ],
                highlight: true,
                cta: 'Demander un devis',
              },
              {
                label: 'Programme 2 jours',
                price: "CHF 2'200",
                duration: '12h',
                max: "Jusqu'à 10 participants",
                features: [
                  'Suite complète MS365',
                  'Excel avancé (TCD, Power Query)',
                  'Teams & SharePoint complet',
                  'Automatisations et macros',
                  'Attestation + rapport individuel',
                  'Suivi 60 jours',
                ],
                highlight: false,
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
                    {offer.highlight && (
                      <span
                        className="inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                        style={{ background: bg, color, border: `1px solid ${border}` }}
                      >
                        Le plus demandé
                      </span>
                    )}
                    <p className="text-white font-bold text-xl mb-1">{offer.label}</p>
                    <p className="text-2xl font-bold mb-0.5" style={{ color }}>{offer.price}</p>
                    <p className="text-text-muted text-xs mb-1">{offer.duration}</p>
                    <p className="text-text-muted text-xs mb-6">{offer.max}</p>
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
      <div id="faq" className="scroll-mt-[112px]">
        <FAQSection items={FAQ} title="Vos questions sur la formation bureautique" />
      </div>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/formation-entreprise/ia"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,0,0.06) 0%, rgba(255,107,0,0.02) 100%)',
                borderColor: 'rgba(255,140,0,0.22)',
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
                  <p className="text-white font-bold text-lg leading-tight">Formation ChatGPT et Claude</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Vous maîtrisez la bureautique. Pour aller encore plus loin en automatisant vos tâches répétitives avec l&apos;IA, découvrez notre formation ChatGPT et Claude.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir la formation IA <ChevronRight size={12} />
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
