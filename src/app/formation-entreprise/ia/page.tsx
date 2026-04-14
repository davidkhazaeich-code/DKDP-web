import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, Clock, Users, Award, ChevronRight, BrainCircuit, Shield } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const ROICalculatorFormation = dynamic(() => import('@/components/sections/ROICalculatorFormation').then(m => m.ROICalculatorFormation))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { orange } from '@/lib/tokens'
import { ToolComparison } from './_components/ToolComparison'
import { GalleryFormation } from './_components/GalleryFormation'
import { SkillsBento } from './_components/SkillsBento'
import { LeadFormInline } from './_components/LeadFormInline'
import { FormateursSection } from './_components/FormateursSection'
import { ModulesMarquee } from './_components/ModulesMarquee'
import { DayAgenda } from './_components/DayAgenda'

export const metadata: Metadata = {
  title: 'Formation IA entreprise Genève · ChatGPT, Claude, Copilot en 1 jour · DKDP',
  description:
    "Former ses équipes à l'IA en 1 jour. Formation entreprise à Genève et en Suisse romande : ChatGPT, Claude, Copilot. 100% opérationnels dès J+1. Programme sur mesure pour PME.",
  alternates: {
    canonical: 'https://dkdp.ch/formation-entreprise/ia',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/ia',
      'x-default': 'https://dkdp.ch/formation-entreprise/ia',
    },
  },
  openGraph: {
    url: 'https://dkdp.ch/formation-entreprise/ia',
    images: [{ url: '/images/og/formation-ia.png', width: 1376, height: 768, alt: 'Formation IA entreprise Genève DKDP' }],
  },
  twitter: {
    images: ['/images/og/formation-ia.png'],
  },
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
      'Le format idéal est de 4 à 10 personnes par groupe pour garantir que chaque participant puisse pratiquer et poser ses questions. Pour les grandes équipes, on organise plusieurs sessions successives.',
  },
  {
    question: 'Combien coûte une journée de formation IA pour mon équipe ?',
    answer:
      'La formation IA est facturée à l\'heure selon la taille du groupe : CHF 200/h pour 1 personne, CHF 300/h pour 2 personnes. Pour les groupes de 3 à 10 personnes ainsi que les formules demi-journée et journée entière, le tarif est établi sur devis. Contactez-nous pour un chiffrage personnalisé.',
  },
  {
    question: 'Les participants repartent-ils avec des outils utilisables le soir même ?',
    answer:
      'Oui. Chaque participant repart avec ses propres templates de prompts, des workflows personnalisés et un guide de démarrage. L\'objectif est que dès le lendemain matin, l\'IA soit intégrée dans leur routine de travail.',
  },
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

const color = orange.color, bg = orange.bg, border = orange.border

export default function FormationIAPage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({ name: 'Formation Intelligence Artificielle en entreprise Genève', url: '/formation-entreprise/ia', description: 'Formation IA pratique pour équipes d\'entreprise à Genève et Suisse romande. ChatGPT, Claude, Copilot maîtrisés en 1 jour. Programme sur mesure.', duration: 'P1D', teaches: ['Prompting avancé', 'ChatGPT', 'Claude', 'Copilot', 'Automatisation IA', 'Confidentialité IA'], prerequisites: 'Aucun prérequis technique', priceFrom: 200, ratingValue: 4.9, ratingCount: 500, image: 'https://dkdp.ch/images/og/formation-ia.png' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Formation IA', url: 'https://dkdp.ch/formation-entreprise/ia' },
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
              <span className="text-sm" style={{ color }}>Formation IA</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Intelligence Artificielle · 1 jour · Genève</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Formation IA en entreprise à Genève :{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>maîtrisez ChatGPT en une journée</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP forme vos collaborateurs à ChatGPT, Claude et Microsoft Copilot en présentiel à Genève et en Suisse romande. Programme 100% sur mesure pour PME et grandes entreprises, orienté pratique. <strong className="text-white">100% de nos participants sont opérationnels dès J+1</strong> et gagnent en moyenne 8 heures par semaine.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="#devis" size="lg">Demander un devis →</LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-white transition-colors">
                    Voir le programme ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-4 flex items-center gap-1.5">
                  <Shield size={11} style={{ color }} />
                  Satisfaction garantie : si aucune compétence n&apos;est appliquée dès J+1, on revient gratuitement.
                </p>
                <p className="text-text-muted text-xs mt-2">Programme mis à jour : avril 2026</p>
              </div>
              <div className="relative">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/gallery/formation-ia-participant-aha-moment.webp"
                    alt="Participant decouvrant les capacites de l'IA lors d'une formation DKDP Geneve"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
              { v: '500+', l: 'Participants formés', sub: 'En Suisse romande' },
              { v: '4.9/5', l: 'Satisfaction', sub: 'Note post-formation' },
              { v: '100%', l: 'Opérationnels dès J+1', sub: 'Score post-formation' },
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

      {/* ── Formulaire inline devis ── */}
      <section id="devis" className="scroll-mt-[66px] py-16 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <LeadFormInline />
        </div>
      </section>

      {/* ── Subnav ── */}
      <ScrollSpyNav
        items={[
          { label: 'Devis rapide', href: '#devis' },
          { label: 'Pourquoi maintenant', href: '#pourquoi' },
          { label: 'Programme', href: '#programme' },
          { label: 'Compétences', href: '#compétences' },
          { label: 'ROI', href: '#roi' },
          { label: 'Format', href: '#format' },
          { label: 'Formateurs', href: '#formateurs' },
          { label: 'Galerie', href: '#galerie' },
          { label: 'Tarifs', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Prendre contact', href: '/contact' }}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ── Contexte IA ── */}
      <section id="pourquoi" className="scroll-mt-[124px] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi maintenant</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Vos équipes utilisent déjà l&apos;IA. Mais pas de la bonne façon.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La plupart des collaborateurs ont testé ChatGPT une fois, obtenu un résultat décevant, et sont passés à autre chose. Pourtant, former ses équipes à l&apos;IA avec les bonnes techniques de prompting réduit de 60 à 80% le temps de traitement des tâches répétitives.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP ne fait pas de démonstrations génériques. On travaille sur vos vrais documents, vos vrais emails et vos vrais cas d&apos;usage. Dès le lendemain matin, vous avez des prompts personnels et une routine IA opérationnelle. Pour comparer les outils, consultez notre guide <Link href="/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026" className="underline hover:text-white transition-colors">ChatGPT vs Claude vs Copilot pour les PME</Link>.
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
                className="rounded-[20px] p-5 md:p-7 border"
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

      {/* ── Competences acquises (Bento) ── */}
      <section id="compétences" className="scroll-mt-[124px] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Ce que vous maîtriserez</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                6 compétences concrètes, utilisables dès le lendemain.
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                Pas de théorie abstraite. Chaque compétence est travaillée sur vos vrais documents et vos vrais cas d&apos;usage.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <SkillsBento />
          </SectionReveal>
        </div>
      </section>

      {/* ── Calculateur ROI Formation ── */}
      <ROICalculatorFormation />

      {/* ── Programme ── */}
      <section id="programme" className="scroll-mt-[124px] py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Programme : ChatGPT, Claude et Copilot maîtrisés en 1 jour.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La formation commence par 30 minutes de théorie sur le fonctionnement de l&apos;IA, puis on passe immédiatement à la pratique. Chaque module inclut des exercices sur vos cas d&apos;usage réels. On ne fait pas de démo : on travaille sur vos vrais documents et vos vraies tâches.
              </p>
              <p className="text-text-secondary leading-relaxed">
                En fin de journée, chaque participant dispose de ses propres templates de prompts, adaptés à son poste. Pas de théorie inutile : que ce qui est utilisable le lendemain.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-6">
                <Image
                  src="/images/gallery/formation-ia-collaboration-laptop.webp"
                  alt="Exercice pratique en duo lors d'une formation IA DKDP Geneve"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <ModulesMarquee />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Agenda de la journée ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme détaillé</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Ce qui se passe pendant la journée.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La journée alterne théorie courte et pratique intensive. 90% du temps est consacré à des exercices sur vos cas réels. La théorie sert uniquement à comprendre pourquoi quelque chose fonctionne, pas à remplir des slides.
              </p>
              <div className="space-y-3">
                {[
                  '7 heures de formation, moins de 45 min de théorie pure',
                  'Exercices sur vos vrais documents et vos vraies tâches',
                  'Chaque participant repart avec ses templates de prompts personnels',
                  'Attestation individuelle de formation remise en fin de journée',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-[7px] flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <CheckCircle2 size={15} style={{ color }} />
                    </div>
                    <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
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

      {/* ── Formats ── */}
      <section id="format" className="scroll-mt-[124px] py-24 bg-bg-card border-y border-border">
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

      {/* ── Formateurs ── */}
      <FormateursSection />

      {/* ── Témoignages ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Ce qu&apos;ils en disent</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Retours après la formation IA.
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
                  style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j} style={{ color }}>★</span>
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Galerie ── */}
      <section id="galerie" className="scroll-mt-[124px] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">En images</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Nos formations en action.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                Des sessions pratiques dans un cadre professionnel. Chaque formation est adaptée à votre équipe et vos outils.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <GalleryFormation />
          </SectionReveal>
        </div>
      </section>

      {/* ── Tarifs ── */}
      <section id="tarifs" className="scroll-mt-[124px] py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Tarifs de la formation IA entreprise en Suisse romande.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                Le prix dépend du nombre de participants. Demi-journée (4h) ou journée entière (8h).
              </p>
            </div>
          </SectionReveal>
          <FormationPricing />
        </div>
      </section>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Vos questions sur la formation IA" />
      </div>

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
      <CTAFinal accentRgb="255,140,0" />
    </main>
  )
}
