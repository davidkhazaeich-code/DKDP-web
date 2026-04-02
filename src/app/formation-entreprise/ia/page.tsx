import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, Clock, Users, Award, ChevronRight, TrendingUp, BarChart2, Zap, BrainCircuit } from 'lucide-react'
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
  title: 'Formation IA en Entreprise à Genève · ChatGPT, Claude, Copilot · DKDP',
  description:
    'Formation Intelligence Artificielle en entreprise à Genève. ChatGPT, Claude et Copilot maîtrisés en une journée. Programme sur mesure, présentiel ou distanciel.',
  alternates: { canonical: 'https://dkdp.ch/formation-entreprise/ia' },
}

function ToolComparison() {
  const tools = [
    {
      name: 'ChatGPT',
      maker: 'OpenAI',
      strengths: ['Polyvalent et créatif', "Génération d'images", 'Plugins et GPTs', 'Navigation web'],
      color: '#10b981',
      cardBg: 'rgba(16,185,129,0.08)',
      cardBorder: 'rgba(16,185,129,0.25)',
    },
    {
      name: 'Claude',
      maker: 'Anthropic',
      strengths: ['Documents très longs', 'Données sensibles', 'Rédaction précise', 'Analyse de PDF'],
      color: '#A78BFA',
      cardBg: 'rgba(124,58,237,0.08)',
      cardBorder: 'rgba(124,58,237,0.25)',
    },
    {
      name: 'Copilot',
      maker: 'Microsoft',
      strengths: ['Intégré Office 365', 'Word et PowerPoint', 'Excel et Outlook', 'Teams et OneNote'],
      color: '#3b82f6',
      cardBg: 'rgba(59,130,246,0.08)',
      cardBorder: 'rgba(59,130,246,0.25)',
    },
  ]
  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {tools.map((t) => (
        <div
          key={t.name}
          className="flex flex-col gap-3 p-4 rounded-[12px]"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <div>
            <p className="text-white font-bold text-sm">{t.name}</p>
            <p className="text-[10px] font-semibold" style={{ color: t.color }}>{t.maker}</p>
          </div>
          <div className="space-y-1.5">
            {t.strengths.map((s) => (
              <div key={s} className="flex items-start gap-1.5">
                <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: t.color }} />
                <span className="text-text-muted text-[11px] leading-snug">{s}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function DayAgenda() {
  const slots: { time: string; title: string; dur: string; type: 'theory' | 'practice' | 'break' | 'workshop' | 'qa' }[] = [
    { time: '09:00', title: "Introduction : comment fonctionne vraiment l'IA", dur: '30 min', type: 'theory' },
    { time: '09:30', title: 'Prompting efficace : techniques avancées', dur: '1h30', type: 'practice' },
    { time: '11:00', title: "ChatGPT et Claude : cas d'usage réels de votre équipe", dur: '1h', type: 'practice' },
    { time: '12:00', title: 'Pause déjeuner', dur: '1h', type: 'break' },
    { time: '13:00', title: 'Microsoft Copilot dans Word, Excel, Outlook', dur: '1h30', type: 'practice' },
    { time: '14:30', title: 'Automatisations simples avec Make / Zapier', dur: '1h', type: 'practice' },
    { time: '15:30', title: 'Sécurité, RGPD et limites des outils IA', dur: '30 min', type: 'theory' },
    { time: '16:00', title: 'Atelier : construire vos templates de prompts personnels', dur: '45 min', type: 'workshop' },
    { time: '16:45', title: 'Questions / Réponses et roadmap individuelle', dur: '15 min', type: 'qa' },
  ]
  const typeStyle = {
    theory:   { bg: 'rgba(212,212,216,0.08)', border: 'rgba(212,212,216,0.22)', color: '#D4D4D8', label: 'Théorie' },
    practice: { bg: 'rgba(255,107,0,0.10)',   border: 'rgba(255,107,0,0.28)',   color: '#FF8C00', label: 'Pratique' },
    break:    { bg: 'rgba(100,100,100,0.06)', border: 'rgba(100,100,100,0.15)', color: '#6b7280', label: 'Pause' },
    workshop: { bg: 'rgba(124,58,237,0.10)',  border: 'rgba(124,58,237,0.28)',  color: '#A78BFA', label: 'Atelier' },
    qa:       { bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.22)',   color: '#4ade80', label: 'Q&R' },
  }
  return (
    <div className="space-y-2">
      {slots.map((s, i) => {
        const ts = typeStyle[s.type]
        return (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-[8px]"
            style={{ background: ts.bg, border: `1px solid ${ts.border}` }}
          >
            <span className="text-[11px] font-bold w-11 flex-shrink-0" style={{ color: ts.color }}>{s.time}</span>
            <span className="text-white text-[12px] font-medium flex-1">{s.title}</span>
            <span
              className="hidden sm:inline text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{ background: ts.bg, color: ts.color, border: `1px solid ${ts.border}` }}
            >
              {ts.label}
            </span>
            <span className="text-text-muted text-[10px] flex-shrink-0">{s.dur}</span>
          </div>
        )
      })}
    </div>
  )
}

const FAQ = [
  {
    question: 'Faut-il des compétences techniques pour suivre la formation IA ?',
    answer:
      'Non. La formation DKDP est conçue pour des non-techniciens : managers, assistantes, commerciaux, RH, comptables. On part des outils que vous utilisez déjà et on apprend à les enrichir avec l\'IA. Aucun code, aucun prérequis technique.',
  },
  {
    question: 'Combien de temps dure la formation IA en entreprise ?',
    answer:
      'La formation standard dure une journée complète (7h). On propose aussi un format demi-journée (3h30) pour une introduction aux outils IA, et un format sur 2 jours pour une maîtrise approfondie incluant la création d\'automatisations.',
  },
  {
    question: 'Quels outils IA sont abordés dans la formation ?',
    answer:
      'La formation couvre ChatGPT (OpenAI), Claude (Anthropic), Microsoft Copilot et Gemini (Google). On sélectionne les outils les plus pertinents selon votre stack et vos besoins. Des exemples d\'automatisation avec Make ou Zapier sont également présentés.',
  },
  {
    question: 'Peut-on personnaliser le programme selon notre secteur ?',
    answer:
      'Oui, c\'est notre approche standard. DKDP envoie un questionnaire en amont pour comprendre votre secteur, vos outils et vos usages quotidiens. Le programme est adapté avec des exemples concrets de votre métier : rédaction de rapports, analyse de données, communication client, etc.',
  },
  {
    question: 'Combien de personnes peuvent participer à la formation ?',
    answer:
      'Le format idéal est de 4 à 12 personnes pour garantir que chaque participant puisse pratiquer et poser ses questions. Pour les grandes équipes, on organise plusieurs sessions. Des ateliers de sensibilisation jusqu\'à 25 personnes sont aussi possibles.',
  },
  {
    question: 'Combien coûte une journée de formation IA pour mon équipe ?',
    answer:
      'Une journée de formation IA en entreprise est facturée entre CHF 1\'500 et CHF 2\'000 selon la personnalisation et le nombre de participants (tarif forfaitaire par groupe). La demi-journée démarre à CHF 900. Un devis précis est établi après le brief.',
  },
  {
    question: 'Les participants repartent-ils avec des outils utilisables le soir même ?',
    answer:
      'Oui. Chaque participant repart avec ses propres templates de prompts, des workflows personnalisés et un guide de démarrage. L\'objectif est que dès le lendemain matin, l\'IA soit intégrée dans leur routine de travail.',
  },
]

const MODULES = [
  'Les bases de l\'IA générative : comment ça fonctionne vraiment',
  'Prompting efficace : les techniques qui font la différence',
  'ChatGPT en pratique : rédaction, synthèse, analyse',
  'Claude pour les tâches longues et sensibles',
  'Microsoft Copilot dans Word, Excel et Outlook',
  'Automatisations simples avec Make ou Zapier',
  'Sécurité, confidentialité et limites des outils IA',
]

const FORMATS = [
  {
    Icon: Users,
    title: 'En présentiel chez vous',
    desc: 'DKDP se déplace dans vos locaux à Genève ou en Suisse romande. Format idéal pour un apprentissage pratique sur vos propres machines.',
  },
  {
    Icon: Clock,
    title: 'En ligne ou hybride',
    desc: 'Sessions interactives en visioconférence pour les équipes dispersées. Aussi efficace qu\'en présentiel avec les bons outils.',
  },
  {
    Icon: Award,
    title: 'Attestation de formation',
    desc: 'Chaque participant reçoit une attestation de formation individuelle précisant les compétences acquises.',
  },
]

const color = '#FF8C00'
const bg = 'rgba(255,107,0,0.08)'
const border = 'rgba(255,107,0,0.18)'

export default function FormationIAPage() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildCourse({ name: 'Formation Intelligence Artificielle en entreprise Genève', url: '/formation-entreprise/ia', description: 'Formation IA pratique pour équipes d\'entreprise à Genève. ChatGPT, Claude, Copilot. Programme sur mesure, 1 journée.' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Formation IA', url: 'https://dkdp.ch/formation-entreprise/ia' },
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
              <span className="text-sm" style={{ color }}>Formation IA</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Intelligence Artificielle · 1 journée</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Vos équipes maîtrisent l&apos;IA{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>en une journée.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP forme vos collaborateurs à ChatGPT, Claude et Microsoft Copilot en présentiel à Genève. Programme 100% sur mesure, orienté pratique. Vos équipes gagnent en moyenne 8 heures par semaine dès le lendemain de la formation.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact" size="lg">Demander un devis →</LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-white transition-colors">
                    Voir le programme ↓
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-ia.webp"
                    alt="Formation Intelligence Artificielle en entreprise à Genève"
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
              { v: '200+', l: 'Participants formés', sub: 'En Suisse romande' },
              { v: '4.9/5', l: 'Satisfaction', sub: 'Note post-formation' },
              { v: '91%', l: 'Appliquent dès J+1', sub: 'Compétences utilisées' },
              { v: '1h30', l: 'Gagnée / jour / pers.', sub: 'Moyenne observée' },
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

      {/* ── Contexte IA ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi maintenant</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Vos équipes utilisent déjà l&apos;IA. Mais pas de la bonne façon.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La plupart des collaborateurs ont testé ChatGPT une fois, obtenu un résultat décevant, et sont passés à autre chose. Pourtant, avec les bonnes techniques de prompting, l&apos;IA réduit de 60 à 80% le temps de traitement des tâches répétitives.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP ne fait pas de démonstrations génériques. On travaille sur vos vrais documents, vos vrais emails et vos vrais cas d&apos;usage. Dès le lendemain matin, vous avez des prompts personnels et une routine IA opérationnelle.
              </p>
              <div className="space-y-3">
                {[
                  "77% des professionnels pensent que l'IA va transformer leur métier dans les 3 prochaines années",
                  "Les équipes formées à l'IA sont 40% plus productives que celles qui apprennent seules",
                  'Le principal frein : ne pas savoir par où commencer. La formation résout exactement ça',
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
                className="rounded-[20px] p-8 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(255,107,0,0.07)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Les 3 outils IA couverts
                </p>
                <ToolComparison />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  On sélectionne les outils selon votre stack. Tout le monde n&apos;a pas besoin des trois.
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
                Une journée 100% pratique.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La formation commence par 30 minutes de théorie sur le fonctionnement de l&apos;IA, puis on passe immédiatement à la pratique. Chaque module inclut des exercices sur vos cas d&apos;usage réels. On ne fait pas de démo : on travaille sur vos vrais documents et vos vraies tâches.
              </p>
              <p className="text-text-secondary leading-relaxed">
                En fin de journée, chaque participant dispose de ses propres templates de prompts, adaptés à son poste. Pas de théorie inutile : que ce qui est utilisable le lendemain.
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

      {/* ── ROI par poste ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Retour sur investissement</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que chaque poste gagne concrètement.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              { role: 'Manager', saved: '2h / jour', tasks: 'Comptes-rendus, synthèses, préparation réunions, emails complexes', color },
              { role: 'Assistante de direction', saved: '3h / jour', tasks: "Rédaction, organisation des agenda, emails, gestion de documents", color },
              { role: 'Commercial', saved: '1h30 / jour', tasks: 'Propositions commerciales, suivi clients, qualification de leads', color },
              { role: 'Comptable / Finance', saved: '1h30 / jour', tasks: 'Analyses, synthèses de données, rapports, notes de frais', color },
              { role: 'Chargé de communication', saved: '2h / jour', tasks: 'Contenus réseaux sociaux, visuels, articles, newsletters', color },
              { role: 'Équipe RH', saved: '2h / jour', tasks: "Offres d'emploi, intégration, emails candidats, notes de synthèse", color },
            ].map((r, i) => (
              <SectionReveal key={r.role} delay={i * 0.07}>
                <div
                  className="flex flex-col gap-3 p-6 rounded-[14px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold">{r.role}</p>
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(255,107,0,0.15)', color: r.color, border: `1px solid rgba(255,107,0,0.28)` }}
                    >
                      {r.saved}
                    </span>
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed">{r.tasks}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div
              className="rounded-[16px] p-4 border"
              style={{ background: 'rgba(255,107,0,0.04)', borderColor: 'rgba(255,107,0,0.18)' }}
            >
              <p className="text-text-secondary text-sm text-center">
                Pour une équipe de 8 personnes à 1h30 économisée / jour en moyenne : <span className="text-white font-bold">240h / mois libérées</span>. Soit l&apos;équivalent de <span className="text-white font-bold">1.5 équivalent temps plein</span> réaffecté à des tâches à haute valeur.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Agenda de la journée ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme détaillé</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Ce qui se passe pendant la journée.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La journée est structurée pour alterner théorie courte et pratique intensive. 90% du temps est consacré à des exercices sur vos cas réels. La théorie sert uniquement à comprendre pourquoi quelque chose fonctionne, pas à remplir des slides.
              </p>
              <div className="space-y-3">
                {[
                  { Icon: Zap, text: '7 heures de formation, moins de 45 min de théorie pure' },
                  { Icon: TrendingUp, text: 'Exercices sur vos vrais documents et vos vraies tâches' },
                  { Icon: BarChart2, text: 'Chaque participant repart avec ses templates de prompts personnels' },
                  { Icon: Award, text: 'Attestation individuelle de formation remise en fin de journée' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-[7px] flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <item.Icon size={15} style={{ color }} />
                    </div>
                    <span className="text-text-secondary text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-6 border"
                style={{ background: bg, borderColor: border }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
                  Planning type d&apos;une journée
                </p>
                <DayAgenda />
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
            {['Managers', 'Assistantes de direction', 'Commerciaux', 'Équipes RH', 'Comptables', 'Chargés de communication'].map((role, i) => (
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

      {/* ── Formats ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Format</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Une formation qui s&apos;adapte à vous.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FORMATS.map((f, i) => (
              <SectionReveal key={f.title} delay={i * 0.1}>
                <div className="flex flex-col gap-4 p-7 bg-bg rounded-[16px] border border-border h-full">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <f.Icon size={22} style={{ color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg">{f.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">{f.desc}</p>
                </div>
              </SectionReveal>
            ))}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                quote: "Après une journée de formation, mon équipe utilise ChatGPT quotidiennement. On a réduit le temps de rédaction de nos rapports de 70%. Le ROI a été immédiat.",
                name: 'Directeur général',
                company: 'PME financière, Genève',
                stars: 5,
              },
              {
                quote: "La formation était concrète, adaptée à nos vrais cas d'usage. Pas de blabla. Le lendemain, tout le monde avait ses prompts et les utilisait en réunion.",
                name: 'Responsable RH',
                company: 'Entreprise industrielle, Vaud',
                stars: 5,
              },
              {
                quote: "On était sceptiques. Maintenant on ne peut plus imaginer travailler sans l'IA. La formation a démystifié les outils et donné confiance à toute l'équipe.",
                name: 'Chargée de communication',
                company: 'Secteur santé, Genève',
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
      <section className="py-24 bg-bg-card border-y border-border">
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
                price: 'CHF 900',
                duration: '3h30',
                max: "Jusqu'à 12 personnes",
                features: [
                  'Introduction aux outils IA',
                  'Techniques de prompting de base',
                  "Cas d'usage concrets par poste",
                  'Guide de démarrage inclus',
                ],
                highlight: false,
                cta: 'Demander un devis',
              },
              {
                label: 'Journée complète',
                price: "CHF 1'500",
                duration: '7 heures',
                max: "Jusqu'à 12 personnes",
                features: [
                  'Programme complet (voir agenda)',
                  'Automatisations Make / Zapier',
                  'Templates de prompts personnels',
                  'Attestation de formation',
                  'Suivi Q&R 30 jours inclus',
                ],
                highlight: true,
                cta: 'Demander un devis',
              },
              {
                label: '2 jours',
                price: "CHF 2'800",
                duration: '14 heures',
                max: "Jusqu'à 10 personnes",
                features: [
                  'Maîtrise avancée des outils IA',
                  'Agents IA et automatisations complexes',
                  'Mise en oeuvre dans vos process',
                  'Suivi mensuel 3 mois inclus',
                  'Format idéal équipes techniques',
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
                        Le plus populaire
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
                      href="/contact"
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

      {/* ── FAQ ── */}
      <FAQSection items={FAQ} title="Vos questions sur la formation IA" />

      {/* ── Bridge IA ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/intelligence-artificielle"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(212,212,216,0.08) 0%, rgba(212,212,216,0.02) 100%)',
                borderColor: 'rgba(212,212,216,0.22)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: 'rgba(212,212,216,0.06)', border: '1px solid rgba(212,212,216,0.20)' }}
                >
                  <BrainCircuit size={20} style={{ color: '#D4D4D8' }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5 text-[#D4D4D8]">Aller plus loin</p>
                  <p className="text-white font-bold text-lg leading-tight">Déployer l&apos;IA dans vos processus</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    La formation donne les bases. Pour automatiser vos vrais processus avec des agents IA sur mesure : voyez notre offre Intelligence Artificielle.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] text-[#D4D4D8] transition-opacity group-hover:opacity-80"
                style={{ background: 'rgba(212,212,216,0.08)', border: '1px solid rgba(212,212,216,0.20)' }}
              >
                Voir les solutions IA <ChevronRight size={12} />
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
