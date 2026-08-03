import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, Clock, Users, Award, ChevronRight, BrainCircuit, Shield, Zap, FileText } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const ROICalculatorFormation = dynamic(() => import('@/components/sections/ROICalculatorFormation').then(m => m.ROICalculatorFormation))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { orange } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS } from '@/components/ui/AppLogos'
import { ToolComparison } from './_components/ToolComparison'
import { GalleryFormation } from './_components/GalleryFormation'
import { SkillsBento } from './_components/SkillsBento'
import { LeadFormInline } from './_components/LeadFormInline'
import { FormateursSection } from './_components/FormateursSection'
import { ModulesMarquee } from './_components/ModulesMarquee'
import { DayAgenda } from './_components/DayAgenda'

export const metadata: Metadata = {
  title: 'Corporate AI Training Geneva & French-speaking Switzerland · ChatGPT, Claude · DKDP',
  description:
    'Train your teams on AI in 1 day. Corporate training in Geneva and French-speaking Switzerland: ChatGPT, Claude, Copilot. 100% operational from day one. Tailored programme for SMEs.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training/ai',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/ia',
      en: 'https://dkdp.ch/en/corporate-training/ai',
      'x-default': 'https://dkdp.ch/formation-entreprise/ia',
    },
  },
  openGraph: {
    url: 'https://dkdp.ch/en/corporate-training/ai',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-ia.png', width: 1376, height: 768, alt: 'Corporate AI training Geneva DKDP' }],
  },
  twitter: {
    images: ['/images/og/formation-ia.png'],
  },
}

const FAQ = [
  {
    question: 'Do you need technical skills to follow the AI training?',
    answer:
      'No. The DKDP training is designed for non-technical people: managers, assistants, sales, HR, finance. We start from the tools you already use and learn to enrich them with AI. No code, no technical prerequisites.',
  },
  {
    question: 'How long does corporate AI training last?',
    answer:
      'The standard training lasts a full day (7h). We also offer a half-day format (3h30) for an introduction to AI tools, and a 2-day format for in-depth mastery including building automations.',
  },
  {
    question: 'Which AI tools are covered in the training?',
    answer:
      'The training covers ChatGPT (OpenAI), Claude (Anthropic), Microsoft Copilot and Gemini (Google). We select the most relevant tools based on your stack and needs. Automation examples with Make or Zapier are also presented.',
  },
  {
    question: 'Can the programme be tailored to our sector?',
    answer:
      'Yes, this is our standard approach. DKDP sends a questionnaire beforehand to understand your sector, your tools and your daily uses. The programme is adapted with concrete examples from your field: report writing, data analysis, client communication, and so on.',
  },
  {
    question: 'How many people can take part in the training?',
    answer:
      'The ideal format is 4 to 10 people per group to ensure each participant can practise and ask their questions. For large teams, we organise several successive sessions.',
  },
  {
    question: 'How much does a day of AI training for my team cost?',
    answer:
      'The AI training is billed by the hour depending on the group size: CHF 200/h for 1 person, CHF 300/h for 2 people. For groups of 3 to 10 people as well as half-day and full-day formats, the rate is set per quote. Contact us for a personalised estimate.',
  },
  {
    question: 'Do participants leave with tools they can use the same evening?',
    answer:
      'Yes. Each participant leaves with their own prompt templates, personalised workflows and a getting-started guide. The goal is that, by the next morning, AI is integrated into their work routine.',
  },
]


const FORMATS = [
  {
    Icon: Users,
    title: 'On-site at your premises',
    desc: 'DKDP comes to your offices in Geneva or French-speaking Switzerland. The ideal format for hands-on learning on your own machines.',
  },
  {
    Icon: Clock,
    title: 'Online or hybrid',
    desc: 'Interactive video-conference sessions for dispersed teams. Just as effective as in person with the right tools.',
  },
  {
    Icon: Award,
    title: 'Completion certificate',
    desc: 'Each participant receives an individual completion certificate specifying the skills acquired.',
  },
]

const color = orange.color, bg = orange.bg, border = orange.border

export default function FormationIAPage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({ name: 'Corporate Artificial Intelligence Training French-speaking Switzerland', url: '/en/corporate-training/ai', description: 'Hands-on AI training for corporate teams in Geneva and French-speaking Switzerland. ChatGPT, Claude, Copilot mastered in 1 day. Tailored programme.', duration: 'P1D', teaches: ['Advanced prompting', 'ChatGPT', 'Claude', 'Copilot', 'AI automation', 'AI privacy'], prerequisites: 'No technical prerequisites', priceFrom: 200, ratingValue: 4.9, ratingCount: 500, image: 'https://dkdp.ch/images/og/formation-ia.png', lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Corporate Training', url: 'https://dkdp.ch/en/corporate-training' },
        { name: 'AI Training', url: 'https://dkdp.ch/en/corporate-training/ai' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href={localizedPath('/formation-entreprise', 'en')} className="text-text-muted text-sm hover:text-text transition-colors">
                Corporate Training
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>AI Training</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Corporate AI training Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>1 day</GradText>{' '}with us. <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>8 hours</GradText>{' '}saved every week.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP trains your staff on ChatGPT, Claude and Microsoft Copilot on-site in Geneva and across French-speaking Switzerland. A 100% tailored programme for SMEs and large companies, focused on practice. <strong className="text-text">100% of our participants are operational from day one</strong> and save an average of 8 hours per week.
                </p>
                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: '100% hands-on', Icon: Zap },
                    { label: 'On your AI tools', Icon: FileText },
                    { label: 'Every role', Icon: Users },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="#devis" size="lg">Request a quote →</LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-text transition-colors">
                    See the programme ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-4 flex items-center gap-1.5">
                  <Shield size={11} style={{ color }} />
                  Satisfaction guaranteed: if no skill is applied from day one, we come back free of charge.
                </p>
              </div>
              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="AI tools we teach in companies">
                  <AppLogoMarquee
            logos={IA_LOGOS}
            durationSeconds={135}
            size="md"
          />
                </div>
                <p className="text-text-muted text-xs mb-2 text-center">Programme updated: April 2026</p>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/gallery/formation-ia-participant-aha-moment.webp"
                    alt="Participant discovering the capabilities of AI during a DKDP training in Geneva"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>

              </div>
            </div>
          </div>
        </section>      </HeroBg>





      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '500+', l: 'Participants trained', sub: 'In French-speaking Switzerland' },
              { v: '4.9/5', l: 'Satisfaction', sub: 'Post-training rating' },
              { v: '100%', l: 'Operational from day one', sub: 'Post-training score' },
              { v: '1h30', l: 'Saved / day / person', sub: 'Observed average' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color }}>{s.v}</p>
                  <p className="text-text text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>


      <LogoBanner lang="en" />
      {/* ── Inline quote form ── */}
      <section id="devis" className="scroll-mt-[66px] py-16 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <LeadFormInline />
        </div>
      </section>

      {/* ── Subnav ── */}
      <ScrollSpyNav
        items={[
          { label: 'Quick quote', href: '#devis' },
          { label: 'Why now', href: '#pourquoi' },
          { label: 'Gallery', href: '#galerie' },
          { label: 'Skills', href: '#compétences' },
          { label: 'ROI', href: '#calculateur-roi-formation' },
          { label: 'Programme', href: '#programme' },
          { label: 'Format', href: '#format' },
          { label: 'Trainers', href: '#formateurs' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: localizedPath('/contact', 'en') }}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ── AI context ── */}
      <section id="pourquoi" className="scroll-mt-[124px] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Why now</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Your teams already use AI. But not the right way.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Most staff have tried ChatGPT once, got a disappointing result, and moved on to something else. Yet training your teams on AI with the right prompting techniques cuts the processing time of repetitive tasks by 60 to 80%.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP does not give generic demonstrations. We work on your real documents, your real emails and your real use cases. By the next morning, you have personal prompts and an operational AI routine. To compare the tools, see our guide <Link href="/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026" className="underline hover:text-text transition-colors">ChatGPT vs Claude vs Copilot for SMEs</Link>.
              </p>
              <div className="space-y-3">
                {[
                  '77% of professionals believe AI will transform their job within the next 3 years',
                  'Teams trained on AI are 40% more productive than those who learn on their own',
                  'The main barrier: not knowing where to start. The training solves exactly that',
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
                  The 3 AI tools covered
                </p>
                <ToolComparison />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  We select the tools based on your stack. Not everyone needs all three.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="galerie" className="scroll-mt-[124px] py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">In pictures</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Our trainings in action.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                Real sessions delivered at our clients&apos; offices in French-speaking Switzerland. Each training is adapted to your team and your tools.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <GalleryFormation />
          </SectionReveal>
        </div>
      </section>

      {/* ── Skills acquired (Bento) ── */}
      <section id="compétences" className="scroll-mt-[124px] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">What you will master</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                6 concrete skills, usable from the next day.
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                No abstract theory. Each skill is practised on your real documents and your real use cases.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <SkillsBento />
          </SectionReveal>
        </div>
      </section>

      {/* ── ROI Calculator Training ── */}
      <ROICalculatorFormation />

      {/* ── Programme ── */}
      <section id="programme" className="scroll-mt-[124px] py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Programme: ChatGPT, Claude and Copilot mastered in 1 day.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                The training begins with 30 minutes of theory on how AI works, then moves straight to practice. Each module includes exercises on your real use cases. We do not run demos: we work on your real documents and your real tasks.
              </p>
              <p className="text-text-secondary leading-relaxed">
                By the end of the day, each participant has their own prompt templates, adapted to their role. No useless theory: only what is usable the next day.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-6">
                <Image
                  src="/images/gallery/formation-ia-collaboration-laptop.webp"
                  alt="Hands-on exercise in pairs during a DKDP AI training in Geneva"
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

      {/* ── Day agenda ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Detailed programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                What happens during the day.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                The day alternates short theory and intensive practice. 90% of the time is spent on exercises based on your real cases. Theory only serves to understand why something works, not to fill slides.
              </p>
              <div className="space-y-3">
                {[
                  '7 hours of training, less than 45 min of pure theory',
                  'Exercises on your real documents and your real tasks',
                  'Each participant leaves with their personal prompt templates',
                  'Individual completion certificate handed out at the end of the day',
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
              <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden mb-6">
                <Image
                  src="/images/gallery/formation-ia-entreprise-geneve-atelier-anime.webp"
                  alt="Corporate AI training Geneva: DKDP trainer leading a hands-on workshop with a small group"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div
                className="rounded-[20px] p-6 border"
                style={{ background: bg, borderColor: border }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
                  Typical day schedule
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
                Training that adapts to you.
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
                  <h3 className="text-text font-bold text-lg">{f.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">{f.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <div className="relative w-full aspect-[21/9] rounded-[16px] overflow-hidden mt-10">
              <Image
                src="/images/gallery/formation-ia-entreprise-geneve-salle-reunion-bande.webp"
                alt="Corporate AI training in French-speaking Switzerland: meeting-room session with a team of employees"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Trainers ── */}
      <FormateursSection />

      {/* ── Testimonials ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">What they say</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Feedback after the AI training.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                quote: 'After one day of training, my team uses ChatGPT daily. We cut the time spent writing our reports by 70%. The ROI was immediate.',
                name: 'Managing Director',
                company: 'Financial SME, Geneva',
                stars: 5,
              },
              {
                quote: 'The training was concrete, adapted to our real use cases. No fluff. The next day, everyone had their prompts and was using them in meetings.',
                name: 'HR Manager',
                company: 'Industrial company, Vaud',
                stars: 5,
              },
              {
                quote: 'We were sceptical. Now we can no longer imagine working without AI. The training demystified the tools and gave the whole team confidence.',
                name: 'Communications Officer',
                company: 'Healthcare sector, Geneva',
                stars: 5,
              },
            ].map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: 'var(--surface-default)', borderColor: 'var(--surface-border)' }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j} style={{ color }}>★</span>
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--surface-border)' }}>
                    <p className="text-text font-semibold text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Pricing ── */}
      <section id="tarifs" className="scroll-mt-[124px] py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Corporate AI training pricing in French-speaking Switzerland.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                The price depends on the number of participants. Half-day (4h) or full day (8h).
              </p>
            </div>
          </SectionReveal>
          <FormationPricing lang="en" />
        </div>
      </section>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Your questions about the AI training" lang="en" />
      </div>

      {/* ── AI bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/intelligence-artificielle', 'en')}
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
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5 text-[#D4D4D8]">Go further</p>
                  <p className="text-text font-bold text-lg leading-tight">Deploy AI across your processes</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    The training gives you the basics. To automate your real processes with custom AI agents: see our Artificial Intelligence offer.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] text-[#D4D4D8] transition-opacity group-hover:opacity-80"
                style={{ background: 'rgba(212,212,216,0.08)', border: '1px solid rgba(212,212,216,0.20)' }}
              >
                See the AI solutions <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal accentRgb="255,140,0" lang="en" />
    </main>
  )
}
