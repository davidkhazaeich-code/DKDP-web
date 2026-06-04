import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2, Clock, Users, Award, ChevronRight,
  BrainCircuit, Zap, FileText, Code2, Bot, Layers,
  MessageSquare, Eye, Database, Workflow, BarChart2,
  Shield, Sparkles,
  Briefcase, TrendingUp, ShoppingCart, UserCog, DollarSign, Scale,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => m.Testimonials))
const CircularTestimonialsLazy = dynamic(() => import('@/components/ui/circular-testimonials').then(m => m.CircularTestimonials))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))
const ROICalculatorFormation = dynamic(() => import('@/components/sections/ROICalculatorFormation').then(m => ({ default: m.ROICalculatorFormation })))
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { violet, orange, chrome, green } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS } from '@/components/ui/AppLogos'
import { localizedPath } from '@/i18n/slugs'
import { LeadFormInlineClaudeAIEN } from './_components/LeadFormInlineClaudeAIEN'
import { GalleryFormationClaudeAIEN } from './_components/GalleryFormationClaudeAIEN'

export const metadata: Metadata = {
  title: 'Claude AI Training Geneva & French-speaking Switzerland | Corporate | DKDP',
  description:
    'Claude AI training for companies in Geneva and French-speaking Switzerland. Claude.ai, collaborative Projects, Claude Code. Tailored programme, 1 to 2 days, on-site or remote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training/claude-ai',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/claude-ai',
      en: 'https://dkdp.ch/en/corporate-training/claude-ai',
      'x-default': 'https://dkdp.ch/formation-entreprise/claude-ai',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-claude-ai.png', width: 1376, height: 768, alt: 'Claude AI Training Geneva DKDP' }],
  },
}

/* ─────────────────────────────────────────────
   Design tokens (source : @/lib/tokens)
───────────────────────────────────────────── */
const V = violet.color, VB = violet.bg, VD = violet.border
const OR = orange.color, ORB = orange.bg, ORD = orange.border
const CH = chrome.color, CHB = chrome.bg, CHD = chrome.border

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
const FAQ = [
  {
    question: 'Do I need to already know Claude to follow this training?',
    answer:
      'No. The training is designed for all levels, from complete beginner to professionals who already use Claude in a basic way. The programme adapts to the level of the group during the preliminary briefing.',
  },
  {
    question: 'What is the difference between the Claude training and the general AI training?',
    answer:
      'The general AI training covers ChatGPT, Claude, Copilot and automation. This training is an exclusive specialisation on Claude: we go much further with Projects, shared memory, Extended Thinking, long-document analysis, and Claude Code for technical profiles.',
  },
  {
    question: 'Is Claude Code included in the base training?',
    answer:
      'Claude Code is covered in an optional module (additional half-day) reserved for developers, DevOps and technical profiles. For a mixed team, we offer a general day in the morning and the Code module in the afternoon for the tech profiles.',
  },
  {
    question: 'Is the training suited to our industry?',
    answer:
      'Yes. Before each session, DKDP sends a questionnaire to identify your business use cases. The training uses your own documents, processes and real situations as raw material, not generic examples.',
  },
  {
    question: 'Does Claude respect the confidentiality of our data?',
    answer:
      'With the Team or Enterprise plan, Anthropic commits to not using your data to train its models. We dedicate an entire module to confidentiality best practices: what to send, what not to send, and how to securely configure your team workspace.',
  },
  {
    question: 'Can you train a team of 20 people in a single session?',
    answer:
      'The ideal format is 6 to 12 people per group. For 20 people, we organise two successive sessions of the same day, or we train 2-3 internal champions who then roll it out ("Train the trainer" programme).',
  },
  {
    question: 'What are the prices of the Claude AI training?',
    answer:
      'The Claude AI training is billed by the hour depending on the group size: CHF 200/h for 1 person, CHF 300/h for 2 people. For groups of 3 to 10 people as well as the half-day and full-day formats, the price is set on quote. Contact us for a tailored estimate.',
  },
  {
    question: 'Is Claude.ai available in French?',
    answer:
      'Yes. Claude understands and replies in French with excellent quality. The training can be delivered in French or English, and the practical exercises use documents and communications in your working language.',
  },
]

/* ─────────────────────────────────────────────
   Trainers
───────────────────────────────────────────── */
const FORMATEURS = [
  {
    name: 'Romane',
    designation: 'AI, SEO/GEO and UX Expert · Trainer',
    quote:
      "Specialist in artificial intelligence, SEO/GEO and UX, I lead the Claude.ai and Projects sessions combining strategic vision and teaching. My goal: every employee leaves with tools they truly master.",
    src: '/images/team/romane.png',
    cardBg: 'linear-gradient(160deg, rgba(255,107,0,0.20) 0%, rgba(255,107,0,0.05) 100%)',
    cardBorder: 'rgba(255,107,0,0.28)',
    imageScale: 1.38,
    imageOffsetX: 80,
  },
  {
    name: 'David Khazaei',
    designation: 'Claude Code Trainer · DKDP Founder',
    quote:
      "Developer and digital consultant, I use Claude Code daily for my client projects. I lead the technical module: codebase navigation, automated tests, GitHub workflow and agentic agents.",
    src: '/images/team/david-khazaei.png',
    cardBg: 'linear-gradient(160deg, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0.06) 100%)',
    cardBorder: 'rgba(124,58,237,0.3)',
    imageScale: 1,
  },
  {
    name: 'Ali Khazaei',
    designation: 'Trainer · Development and IT',
    quote:
      "Developer and trainer, I work on the IT and web development modules. A teacher above all, I make sure every participant leaves with solid foundations and skills that are immediately applicable.",
    src: '/images/team/ali-khazaei.png',
    cardBg: 'linear-gradient(160deg, rgba(96,165,250,0.18) 0%, rgba(96,165,250,0.04) 100%)',
    cardBorder: 'rgba(96,165,250,0.25)',
    imageScale: 1,
  },
  {
    name: 'Claude',
    designation: 'Independent Trainer · Programming and IT',
    quote:
      "Independent trainer and developer, I work on the technical side of the programming and IT training. A hands-on practitioner, I translate complex concepts into directly applicable skills.",
    src: '/images/team/claude-formation.png',
    cardBg: 'linear-gradient(160deg, rgba(212,212,216,0.15) 0%, rgba(212,212,216,0.04) 100%)',
    cardBorder: 'rgba(212,212,216,0.22)',
    imageScale: 1,
  },
]

/* ─────────────────────────────────────────────
   Inlined: ClaudeProductCard (EN)
───────────────────────────────────────────── */
function ClaudeProductCard({
  title,
  subtitle,
  color,
  bg,
  border,
  icon: Icon,
  features,
  badge,
}: {
  title: string
  subtitle: string
  color: string
  bg: string
  border: string
  icon: React.ElementType
  features: string[]
  badge?: string
}) {
  return (
    <div
      className="flex flex-col gap-5 p-6 rounded-[16px] h-full"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--bg-card)', border: `1px solid ${border}` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        {badge && (
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ color, background: bg, border: `1px solid ${border}` }}
          >
            {badge}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-text font-bold text-lg leading-tight mb-1">{title}</h3>
        <p className="text-text-muted text-sm leading-relaxed">{subtitle}</p>
      </div>
      <ul className="space-y-2 mt-auto">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-text-secondary">
            <CheckCircle2 size={14} style={{ color }} className="flex-shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Inlined: AgendaRow (EN)
───────────────────────────────────────────── */
type AgendaType = 'theory' | 'practice' | 'break' | 'workshop' | 'code' | 'qa'

const AGENDA_STYLES: Record<AgendaType, { bg: string; border: string; color: string; label: string }> = {
  theory:   { bg: chrome.bg,  border: chrome.border,  color: chrome.color,  label: 'Theory'   },
  practice: { bg: orange.bg,  border: orange.border,  color: orange.color,  label: 'Practice' },
  break:    { bg: 'rgba(100,100,100,0.06)', border: 'rgba(100,100,100,0.15)', color: '#6b7280', label: 'Break' },
  workshop: { bg: violet.bg,  border: violet.border,  color: violet.color,  label: 'Workshop' },
  code:     { bg: green.bg,   border: green.border,   color: green.color,   label: 'Code'     },
  qa:       { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.22)', color: '#4ade80',   label: 'Q&A'  },
}

function AgendaRow({
  time,
  title,
  dur,
  type,
}: {
  time: string
  title: string
  dur: string
  type: AgendaType
}) {
  const s = AGENDA_STYLES[type]
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-[8px]"
      style={{ background: s.bg, border: `1px solid ${s.border}` }}
    >
      <span className="text-[11px] font-bold w-11 flex-shrink-0" style={{ color: s.color }}>
        {time}
      </span>
      <span className="text-text text-[12px] font-medium flex-1">{title}</span>
      <span
        className="hidden sm:inline text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0"
        style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
      >
        {s.label}
      </span>
      <span className="text-text-muted text-[10px] flex-shrink-0">{dur}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Inlined: CapabilityCard (EN)
───────────────────────────────────────────── */
function CapabilityCard({
  icon: Icon,
  title,
  desc,
  color,
  bg,
  border,
}: {
  icon: React.ElementType
  title: string
  desc: string
  color: string
  bg: string
  border: string
}) {
  return (
    <SectionReveal>
      <div
        className="flex flex-col gap-3 p-5 rounded-[14px] h-full"
        style={{ background: bg, border: `1px solid ${border}` }}
      >
        <div
          className="w-10 h-10 rounded-[8px] flex items-center justify-center"
          style={{ background: 'var(--bg-card)', border: `1px solid ${border}` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <p className="text-text font-semibold text-sm leading-snug">{title}</p>
        <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
      </div>
    </SectionReveal>
  )
}

/* ─────────────────────────────────────────────
   Inlined: UseCaseCard (EN)
───────────────────────────────────────────── */
function UseCaseCard({
  dept,
  icon: Icon,
  color,
  bg,
  border,
  cases,
}: {
  dept: string
  icon: React.ElementType
  color: string
  bg: string
  border: string
  cases: string[]
}) {
  return (
    <div
      className="flex flex-col gap-3 rounded-[14px] border p-5"
      style={{ background: bg, borderColor: border }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px]"
          style={{ background: 'var(--bg-card)', border: `1px solid ${border}` }}
        >
          <Icon size={15} style={{ color }} aria-hidden="true" />
        </div>
        <span className="text-sm font-bold" style={{ color }}>{dept}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {cases.map((c) => (
          <span
            key={c}
            className="text-[11px] px-2.5 py-1 rounded-full font-medium"
            style={{ background: 'var(--bg-card)', border: `1px solid ${border}`, color }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function ClaudeAITrainingPage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({
        name: 'Claude AI Corporate Training French-speaking Switzerland',
        url: '/corporate-training/claude-ai',
        description: 'Specialised Claude AI training for corporate teams in Geneva. Claude.ai, collaborative Projects, Extended Thinking and Claude Code. Tailored programme.',
        duration: 'P2D',
        teaches: ['Claude.ai', 'Claude Projects', 'Claude Code', 'Prompt engineering', 'Automation'],
        prerequisites: 'No technical prerequisites',
        priceFrom: 200,
        ratingValue: '4.9',
        ratingCount: 500,
        lang: 'en',
      })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Corporate Training', url: 'https://dkdp.ch/en/corporate-training' },
        { name: 'Claude AI Training', url: 'https://dkdp.ch/en/corporate-training/claude-ai' },
      ])} />

      {/* ══ 1. Hero ══ */}
      <HeroBg blob1="rgba(124,58,237,0.15)" blob2="rgba(167,139,250,0.06)" accentRgb="167,139,250">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link href={localizedPath('/formation-entreprise', 'en')} className="text-text-muted text-sm hover:text-text transition-colors">
                Corporate Training
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <div className="flex items-center gap-1.5">
                <Image src="/images/partners/claude-logo.png" alt="Claude AI" width={16} height={16} className="rounded-[4px] opacity-90" />
                <span className="text-sm" style={{ color: OR }}>Claude AI Training</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <h1 className="grad-tag inline-block text-xs md:text-sm">Claude AI Training Geneva & French-speaking Switzerland</h1>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: OR, background: ORB, border: `1px solid ${ORD}` }}
                  >
                    New 2026
                  </span>
                </div>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Your teams are testing Claude. We teach them to <GradText as="span">put it to work</GradText>.
                </p>

                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  Claude AI by Anthropic is the most powerful tool for professional teams in 2026.
                  Long documents, collaborative projects, complex reasoning, code automation.
                  DKDP trains SMEs and large companies in French-speaking Switzerland in depth on every feature that matters.
                </p>

                <p className="text-text-muted text-base leading-relaxed mb-8">
                  We use it ourselves every day, including to develop this very website.
                  What we teach you, we practise.
                </p>

                {/* Trust signals */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { label: '100% hands-on', icon: Zap },
                    { label: 'On your real documents', icon: FileText },
                    { label: 'All industries', icon: Users },
                  ].map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-text-secondary"
                      style={{ background: ORB, border: `1px solid ${ORD}` }}
                    >
                      <Icon size={12} style={{ color: OR }} />
                      {label}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton href={localizedPath('/contact', 'en') + '?service=formation-claude'} size="lg">
                    Request a free quote →
                  </LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-text transition-colors">
                    See the programme ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Programme updated: April 2026</p>
              </div>

              {/* Right - visual */}
              <div className="relative flex flex-col gap-4">
                <div className="mb-6 lg:mb-8" aria-label="The AI ecosystem around Claude">
                  <AppLogoMarquee
            logos={IA_LOGOS}
            durationSeconds={135}
            size="md"
          />
                </div>
                {/* Terminal Claude Code */}
                <div
                  className="rounded-[14px] p-5"
                  style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: `0 0 40px rgba(124,58,237,0.15)` }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <div className="flex items-center gap-1.5 ml-2">
                      <Image src="/images/partners/claude-logo.png" alt="Claude AI" width={18} height={18} className="rounded-[4px]" />
                      <span className="text-[11px] text-text-muted font-mono">claude · DKDP training</span>
                    </div>
                  </div>
                  <div className="space-y-2 font-mono text-[12px]">
                    <p><span style={{ color: V }}>{'>'}</span> <span className="text-zinc-400">Analyse this 80-page report and</span></p>
                    <p className="pl-4 text-zinc-400">identify the 5 critical risks</p>
                    <div className="h-px bg-zinc-800 my-2" />
                    <p style={{ color: '#4ade80' }}>Claude ● Extended Thinking enabled...</p>
                    <p className="text-zinc-300">Analysis in progress (200k tokens) ●●●</p>
                    <div className="h-px bg-zinc-800 my-2" />
                    <p className="text-zinc-300">5 risks identified:</p>
                    <p className="text-zinc-400 pl-4">1. Regulatory exposure (Art. 7)</p>
                    <p className="text-zinc-400 pl-4">2. Supplier concentration (35%)</p>
                    <p className="text-zinc-400 pl-4">3. ...</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: V }} />
                      <span style={{ color: V }}>Response generated in 4.2s</span>
                    </div>
                  </div>
                </div>
                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { v: '200k', l: 'context tokens', c: V },
                    { v: '1M', l: 'Sonnet tokens', c: CH },
                    { v: '5/5', l: 'DKDP reviews', c: OR },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="text-center py-3 rounded-[10px]"
                      style={{ background: 'var(--surface-subtle)', border: '1px solid var(--surface-border)' }}
                    >
                      <p className="text-xl font-bold" style={{ color: s.c }}>{s.v}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>      </HeroBg>





      {/* ══ 2. Stats ══ */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '2h30', l: 'Saved / day / person', sub: 'Post-training average' },
              { v: '94%', l: 'Apply from day 1', sub: 'Skills used' },
              { v: '4.9/5', l: 'Satisfaction', sub: 'DKDP average rating' },
              { v: '100%', l: 'Tailored', sub: 'Your real use cases' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: OR }}>{s.v}</p>
                  <p className="text-text text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>


      <LogoBanner lang="en" />
      {/* ══ 3. Inline quote form ══ */}
      <section className="py-16 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <LeadFormInlineClaudeAIEN />
        </div>
      </section>

      {/* ══ 4. Sticky subnav ══ */}
      <ScrollSpyNav
        items={[
          { label: 'Why Claude', href: '#pourquoi' },
          { label: 'Products', href: '#produits' },
          { label: 'Programme', href: '#programme' },
          { label: 'Capabilities', href: '#competences' },
          { label: 'Departments', href: '#métiers' },
          { label: 'Format', href: '#format' },
          { label: 'ROI', href: '#roi' },
          { label: 'Gallery', href: '#galerie' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: localizedPath('/contact', 'en') }}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ══ 5. Why Claude now ══ */}
      <section id="pourquoi" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Context 2026
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Why Claude is the priority AI<br />tool for companies
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Not all AI assistants are equal for demanding professional use.
                Claude stands out on the dimensions that matter in business.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: FileText,
                title: 'Context from 200k to 1M tokens',
                desc: 'Analyse entire reports, contracts and datasets without splitting documents. Where ChatGPT stops, Claude keeps going.',
                color: V, bg: VB, border: VD,
              },
              {
                icon: BrainCircuit,
                title: 'Extended Thinking',
                desc: 'Claude can reason deeply about complex problems before answering, like a senior consultant who thinks before speaking.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Shield,
                title: 'Data confidentiality',
                desc: 'Team and Enterprise plans: your data is not used to train the model. Zero retention, compliant with Swiss requirements.',
                color: OR, bg: ORB, border: ORD,
              },
              {
                icon: Layers,
                title: 'Collaborative Projects',
                desc: 'Create shared workspaces with persistent memory, files and common instructions for the whole team.',
                color: V, bg: VB, border: VD,
              },
              {
                icon: Code2,
                title: 'Claude Code: dev agent',
                desc: 'An autonomous agent that reads your codebase, writes tests, fixes bugs and creates GitHub PRs, without interrupting you.',
                color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.22)',
              },
              {
                icon: Eye,
                title: 'Vision and document analysis',
                desc: 'Tables, charts, diagrams, scanned PDFs: Claude extracts and interprets with a precision other models do not match.',
                color: CH, bg: CHB, border: CHD,
              },
            ].map((c) => (
              <CapabilityCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} color={c.color} bg={c.bg} border={c.border} />
            ))}
          </div>

          {/* Simplified comparison */}
          <SectionReveal>
            <div
              className="rounded-[20px] p-6 md:p-8"
              style={{ background: 'var(--surface-subtle)', border: '1px solid var(--surface-border)' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: OR }}>Quick comparison</p>
              <p className="text-text-muted text-xs mb-6">DKDP assessment based on the 2026 versions (Claude Sonnet 4.6, GPT-4o, Microsoft Copilot)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border-strong">
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-text-muted w-[40%]">Criterion</th>
                      <th className="text-center py-3 px-4 text-xs font-bold" style={{ color: V }}>
                        <div className="inline-flex items-center gap-1.5">
                          <Image src="/images/partners/claude-logo.png" alt="" width={14} height={14} className="rounded-[3px]" />
                          Claude
                        </div>
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-bold text-[#10b981]">
                        <div className="inline-flex items-center gap-1.5">
                          <Image src="/images/partners/chatgpt-logo.png" alt="" width={14} height={14} className="rounded-[3px]" />
                          ChatGPT
                        </div>
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-bold text-[#3b82f6]">
                        <div className="inline-flex items-center gap-1.5">
                          <Image src="/images/partners/copilot-logo.png" alt="" width={14} height={14} className="rounded-[3px]" />
                          Copilot
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        crit: 'Long context (entire documents)',
                        sub: 'Haiku 200k · Sonnet/Opus 1M tokens',
                        claude: { n: 5, color: V },
                        gpt:    { n: 4, color: '#10b981' },
                        cop:    { n: 2, color: '#3b82f6' },
                      },
                      {
                        crit: 'Complex reasoning and analysis',
                        sub: 'Extended Thinking vs o3 vs GPT-4o',
                        claude: { n: 5, color: V },
                        gpt:    { n: 5, color: '#10b981' },
                        cop:    { n: 3, color: '#3b82f6' },
                      },
                      {
                        crit: 'Confidentiality and data control',
                        sub: 'Team/Enterprise plan: zero retention',
                        claude: { n: 5, color: V },
                        gpt:    { n: 4, color: '#10b981' },
                        cop:    { n: 4, color: '#3b82f6' },
                      },
                      {
                        crit: 'Collaborative work (Projects)',
                        sub: 'Shared memory, files, instructions',
                        claude: { n: 5, color: V },
                        gpt:    { n: 3, color: '#10b981' },
                        cop:    { n: 4, color: '#3b82f6' },
                      },
                      {
                        crit: 'Development and code (agent)',
                        sub: 'Claude Code vs GitHub Copilot vs GPT Operator',
                        claude: { n: 5, color: V },
                        gpt:    { n: 4, color: '#10b981' },
                        cop:    { n: 4, color: '#3b82f6' },
                      },
                      {
                        crit: 'Visual document analysis (PDF, images)',
                        sub: 'Tables, charts, scanned diagrams',
                        claude: { n: 5, color: V },
                        gpt:    { n: 4, color: '#10b981' },
                        cop:    { n: 3, color: '#3b82f6' },
                      },
                      {
                        crit: 'Microsoft 365 integration',
                        sub: 'Word, Excel, Outlook, Teams native',
                        claude: { n: 2, color: V },
                        gpt:    { n: 3, color: '#10b981' },
                        cop:    { n: 5, color: '#3b82f6' },
                      },
                      {
                        crit: 'Image generation',
                        sub: 'DALL-E 3 vs Image Creator vs none native',
                        claude: { n: 1, color: V },
                        gpt:    { n: 5, color: '#10b981' },
                        cop:    { n: 4, color: '#3b82f6' },
                      },
                    ].map((row, i) => {
                      const Stars = ({ n, color }: { n: number; color: string }) => (
                        <span className="inline-flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span
                              key={idx}
                              className="text-[13px] leading-none"
                              style={{ color: idx < n ? color : 'var(--surface-border)' }}
                            >
                              ★
                            </span>
                          ))}
                          <span
                            className="ml-1.5 text-[10px] font-bold tabular-nums"
                            style={{ color: n >= 4 ? color : 'var(--text-muted)' }}
                          >
                            {n}/5
                          </span>
                        </span>
                      )
                      return (
                        <tr key={row.crit} className={`border-b border-border ${i % 2 === 0 ? 'bg-[var(--surface-subtle)]' : ''}`}>
                          <td className="py-3 px-4">
                            <p className="text-text font-medium text-[13px] leading-snug">{row.crit}</p>
                            <p className="text-text-muted text-[10px] mt-0.5 leading-snug">{row.sub}</p>
                          </td>
                          <td className="py-3 px-4 text-center"><Stars n={row.claude.n} color={row.claude.color} /></td>
                          <td className="py-3 px-4 text-center"><Stars n={row.gpt.n} color={row.gpt.color} /></td>
                          <td className="py-3 px-4 text-center"><Stars n={row.cop.n} color={row.cop.color} /></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-text-muted text-[11px] mt-5 text-right">
                DKDP recommendation: Claude for analysis and depth · ChatGPT for creativity and images · Copilot if Microsoft 365 is your stack
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 5. Claude products ══ */}
      <section id="produits" className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <Image src="/images/partners/claude-logo.png" alt="Claude AI" width={20} height={20} className="rounded-[5px]" />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: OR }}>
                  The Claude ecosystem
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                3 tools, one training programme
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                The DKDP training covers the entire Claude ecosystem,
                from the non-technical employee to the developer.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SectionReveal>
              <ClaudeProductCard
                title="Claude.ai"
                subtitle="The web and mobile interface for every employee. Conversations, document analysis, writing, research. The gateway to Claude for your whole team."
                color={V}
                bg={VB}
                border={VD}
                icon={MessageSquare}
                badge="For everyone"
                features={[
                  'Effective, structured prompting',
                  'Analysis of PDFs, Excel, images',
                  'Advanced professional writing',
                  'Meeting and report summaries',
                  'Translation and content adaptation',
                  'Automated research and monitoring',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ClaudeProductCard
                title="Claude Projects"
                subtitle="Claude's collaborative workspaces. Your team shares a common memory, files, instructions and persistent context. The collective brain of your organisation."
                color={CH}
                bg={CHB}
                border={CHD}
                icon={Layers}
                badge="For teams"
                features={[
                  'Creation and management of shared Projects',
                  'Persistent memory and document context',
                  'Custom instructions per project',
                  'Access and permission control',
                  'Team knowledge base',
                  'Synchronisation with Google Drive',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ClaudeProductCard
                title="Claude Code"
                subtitle="Anthropic's autonomous development agent. It reads your codebase, writes tests, fixes bugs, creates PRs and runs complex tasks over 14 hours without intervention."
                color="#4ade80"
                bg="rgba(74,222,128,0.08)"
                border="rgba(74,222,128,0.22)"
                icon={Code2}
                badge="For devs"
                features={[
                  'CLI installation and configuration',
                  'Codebase navigation and understanding',
                  'Automated test generation',
                  'Bug fixing and refactoring',
                  'Full GitHub/GitLab workflow',
                  'Hooks, MCP and extensions',
                ]}
              />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ══ 6. Programme ══ */}
      <section id="programme" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Detailed programme
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Claude AI training programme: one day to master the tool
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                7 hours of hands-on training, built on your own documents and use cases.
                No generic slides. No made-up examples.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Day 1 */}
            <SectionReveal>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: ORB, color: OR, border: `1px solid ${ORD}` }}
                  >
                    Day 1 · Claude.ai + Projects
                  </div>
                  <span className="text-text-muted text-xs">All profiles</span>
                </div>
                <div className="space-y-2">
                  <AgendaRow time="09:00" title="How Claude thinks: architecture and real limits" dur="45 min" type="theory" />
                  <AgendaRow time="09:45" title="Structured prompting: the DKDP method in 5 levels" dur="1h" type="practice" />
                  <AgendaRow time="10:45" title="Analysing your real documents (contracts, reports, data)" dur="1h" type="workshop" />
                  <AgendaRow time="11:45" title="Extended Thinking: enabling deep reasoning" dur="30 min" type="practice" />
                  <AgendaRow time="12:15" title="Lunch break" dur="1h" type="break" />
                  <AgendaRow time="13:15" title="Claude Projects: build your team space live" dur="1h30" type="workshop" />
                  <AgendaRow time="14:45" title="Memory, context and team file sharing" dur="1h" type="practice" />
                  <AgendaRow time="15:45" title="Confidentiality, GDPR and corporate best practices" dur="30 min" type="theory" />
                  <AgendaRow time="16:15" title="Workshop: build your team prompt library" dur="30 min" type="workshop" />
                  <AgendaRow time="16:45" title="Q&A and adoption roadmap" dur="15 min" type="qa" />
                </div>
              </div>
            </SectionReveal>

            {/* Code module */}
            <SectionReveal>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: 'rgba(74,222,128,0.10)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }}
                  >
                    Optional module · Claude Code
                  </div>
                  <span className="text-text-muted text-xs">Technical profiles</span>
                </div>
                <div className="space-y-2">
                  <AgendaRow time="09:00" title="Claude Code architecture: agent vs assistant" dur="30 min" type="theory" />
                  <AgendaRow time="09:30" title="Installation, config and first project live" dur="45 min" type="code" />
                  <AgendaRow time="10:15" title="Codebase navigation: read 50k lines in 30 seconds" dur="1h" type="code" />
                  <AgendaRow time="11:15" title="Automated test generation on your stack" dur="1h" type="workshop" />
                  <AgendaRow time="12:15" title="Lunch break" dur="1h" type="break" />
                  <AgendaRow time="13:15" title="Full GitHub workflow: issue → code → automatic PR" dur="1h30" type="code" />
                  <AgendaRow time="14:45" title="Hooks, MCP and extensions: going further" dur="45 min" type="code" />
                  <AgendaRow time="15:30" title="Multi-task agents and long-running delegation" dur="45 min" type="workshop" />
                  <AgendaRow time="16:15" title="Security, secrets and agentic best practices" dur="30 min" type="theory" />
                  <AgendaRow time="16:45" title="Q&A and practical cases from your team" dur="15 min" type="qa" />
                </div>

                <div
                  className="mt-5 p-4 rounded-[12px] text-sm"
                  style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.18)' }}
                >
                  <p className="text-[#4ade80] font-semibold text-xs uppercase tracking-wider mb-1">Note</p>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    This module runs as a half-day (5h) or a full day depending on the team's level.
                    Prerequisites: comfort with the terminal and Git. No language imposed.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Skills learned */}
          <SectionReveal>
            <div
              className="mt-12 p-6 md:p-8 rounded-[20px]"
              style={{ background: ORB, border: `1px solid ${ORD}` }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: OR }}>
                Skills acquired by the end of the training
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Advanced multi-level prompting',
                  'Long-document analysis (200k+ tokens)',
                  'Extended Thinking for complex problems',
                  'Claude Projects and shared memory',
                  'Custom team prompt library',
                  'Professional writing workflows',
                  'Meeting summary and synthesis',
                  'Data extraction from PDF/Excel',
                  'GDPR and confidentiality best practices',
                  'Basic no-code automation',
                  'Claude Code: agentic dev workflow',
                  'API and MCP integrations (tech profiles)',
                ].map((m) => (
                  <div key={m} className="flex items-start gap-2 text-xs text-text-secondary">
                    <CheckCircle2 size={12} style={{ color: OR }} className="flex-shrink-0 mt-0.5" />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 7. Capabilities ══ */}
      <section id="competences" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Features covered
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                The Claude features you will learn
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                The training does not skim over the features. It teaches you
                to master each tool in real professional situations.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: BrainCircuit,
                title: 'Extended Thinking',
                desc: 'Enable Claude\'s deep reasoning for strategic problems. Claude thinks before answering, with transparency on its reasoning.',
                color: OR, bg: ORB, border: ORD,
              },
              {
                icon: FileText,
                title: 'Long context (200k-1M)',
                desc: 'Analyse 300-page reports, entire codebases, or complete datasets in a single conversation.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Eye,
                title: 'Vision and image analysis',
                desc: 'Tables, charts, diagrams, screenshots, scanned PDFs. Claude sees, understands and explains every visual element.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Layers,
                title: 'Artifacts',
                desc: 'Create deliverables isolated from the conversation: documents, code, visualisations, interactive mini-apps. Share in one click.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Database,
                title: 'Projects and memory',
                desc: 'Persist context across sessions. Claude remembers your company, your clients, your processes, without repeating instructions.',
                color: OR, bg: ORB, border: ORD,
              },
              {
                icon: Workflow,
                title: 'Computer Use',
                desc: 'Claude can control a browser or a desktop to automate repetitive tasks without a single line of code.',
                color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.22)',
              },
              {
                icon: Bot,
                title: 'Claude Code: Agentic',
                desc: 'Delegate development tasks over 14 hours. Claude reads, codes, tests and commits while you sleep.',
                color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.22)',
              },
              {
                icon: BarChart2,
                title: 'Data analysis',
                desc: 'Query your data in natural language. Claude writes SQL, generates charts, identifies anomalies and writes the commentary.',
                color: OR, bg: ORB, border: ORD,
              },
            ].map((c) => (
              <CapabilityCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. Use cases by department ══ */}
      <HeroBg
        blob1="rgba(255,107,0,0.06)"
        blob2="rgba(212,212,216,0.04)"
        accentRgb="167,139,250"
        className="border-b border-border"
      >
      <section id="métiers" className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                By department
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Claude AI use cases by department
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                The training is tailored to your team's functions.
                Here are the most requested use cases by department.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <UseCaseCard
                dept="Leadership"
                icon={Briefcase}
                color="#FF8C00"
                bg="rgba(255,107,0,0.07)"
                border="rgba(255,107,0,0.20)"
                cases={[
                  'Executive report summaries',
                  'Strategic market analysis',
                  'Board meeting preparation',
                  'Strategic plan writing',
                  'Risk assessment',
                ]}
              />
              <UseCaseCard
                dept="Marketing"
                icon={TrendingUp}
                color="#A78BFA"
                bg="rgba(124,58,237,0.08)"
                border="rgba(124,58,237,0.22)"
                cases={[
                  'Multi-format campaign writing',
                  'Competitor analysis',
                  'Creative briefs',
                  'A/B testing copywriting',
                  'SEO and blog content',
                  'Personas and audience research',
                ]}
              />
              <UseCaseCard
                dept="Sales"
                icon={ShoppingCart}
                color="#60a5fa"
                bg="rgba(96,165,250,0.08)"
                border="rgba(96,165,250,0.22)"
                cases={[
                  'Sales proposals',
                  'Client objection analysis',
                  'Meeting minutes',
                  'Prospect research',
                  'Prospecting scripts and emails',
                ]}
              />
              <UseCaseCard
                dept="HR"
                icon={UserCog}
                color="#f472b6"
                bg="rgba(244,114,182,0.08)"
                border="rgba(244,114,182,0.22)"
                cases={[
                  'Job descriptions',
                  'Application summaries',
                  'Automated internal FAQ',
                  'Documentary onboarding',
                  'Policies and procedures',
                  'Feedback analysis',
                ]}
              />
              <UseCaseCard
                dept="Finance"
                icon={DollarSign}
                color="#2dd4bf"
                bg="rgba(45,212,191,0.08)"
                border="rgba(45,212,191,0.22)"
                cases={[
                  'Financial report analysis',
                  'PDF data extraction',
                  'Results commentary',
                  'Supplier contract analysis',
                  'Annotated dashboards',
                ]}
              />
              <UseCaseCard
                dept="Legal"
                icon={Scale}
                color="#fbbf24"
                bg="rgba(251,191,36,0.07)"
                border="rgba(251,191,36,0.22)"
                cases={[
                  'Long contract summaries',
                  'Key clause extraction',
                  'Version comparison',
                  'Regulatory monitoring',
                  'Letter drafting',
                ]}
              />
              <UseCaseCard
                dept="Developers"
                icon={Code2}
                color="#4ade80"
                bg="rgba(74,222,128,0.07)"
                border="rgba(74,222,128,0.22)"
                cases={[
                  'Automated code review',
                  'Unit test generation',
                  'Codebase documentation',
                  'Assisted debugging',
                  'Stack migration',
                  'GitHub/GitLab workflow',
                ]}
              />
            </div>
          </SectionReveal>
        </div>
      </section>
      </HeroBg>

      {/* ══ 9. Formats ══ */}
      <section id="format" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Formats
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                On-site, remote or hybrid
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              {
                Icon: Users,
                title: 'On-site at your offices',
                desc: 'DKDP travels to your offices in Geneva or across French-speaking Switzerland. The ideal format: working on your own machines, in your real environment.',
              },
              {
                Icon: Clock,
                title: 'Online (Zoom/Teams)',
                desc: 'Interactive sessions with screen sharing and breakout workshops. As effective as on-site with the right tools.',
              },
              {
                Icon: Award,
                title: 'Individual certificate',
                desc: 'Each participant receives a personalised certificate specifying the skills and modules covered.',
              },
            ].map(({ Icon, title, desc }) => (
              <SectionReveal key={title}>
                <div
                  className="flex flex-col gap-4 p-5 rounded-[14px] h-full"
                  style={{ background: ORB, border: `1px solid ${ORD}` }}
                >
                  <div
                    className="w-10 h-10 rounded-[8px] flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${ORD}` }}
                  >
                    <Icon size={18} style={{ color: OR }} />
                  </div>
                  <div>
                    <p className="text-text font-semibold text-sm mb-1">{title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10. ROI ══ */}
      <section id="roi" className="scroll-mt-[124px]">
        <ROICalculatorFormation />
      </section>

      {/* ══ 11. Gallery ══ */}
      <section id="galerie" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                In pictures
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                The Claude AI training in practice
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Concrete sessions, active teams, skills that are immediately usable.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <GalleryFormationClaudeAIEN />
          </SectionReveal>
        </div>
      </section>

      {/* ══ 12. Pricing ══ */}
      <section id="tarifs" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Claude AI training pricing
              </h2>
              <p className="text-text-secondary text-lg max-w-xl mx-auto">
                The price depends on the number of participants. Half-day (4h) or full day (8h).
              </p>
            </div>
          </SectionReveal>

          <FormationPricing lang="en" />

          <SectionReveal>
            <p className="text-center text-text-muted text-sm mt-8">
              Need a 2-day programme, a Train-the-Trainer format or coaching follow-up?{' '}
              <Link href={localizedPath('/contact', 'en')} className="underline hover:text-text transition-colors" style={{ color: OR }}>
                Let's talk
              </Link>
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 11. Why DKDP ══ */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionReveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                  Why DKDP
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-6">
                  We train on what we<br />
                  <GradText as="span">use ourselves.</GradText>
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  This website was built with Claude Code. Our SEO is analysed with Claude.
                  Our content is assisted by Claude. We do not train from a manual.
                  We train from our daily practice.
                </p>
                <p className="text-text-secondary leading-relaxed mb-8">
                  This field experience lets us go well beyond generic tutorials:
                  we know what really works, what does not, and how to adapt
                  Claude to specific professional contexts. Learn more about <Link href="/blog/claude-code-leak-utiliser-ia-comme-infrastructure" className="underline hover:text-text transition-colors">how to use Claude as AI infrastructure</Link>.
                </p>
                <div className="space-y-3">
                  {[
                    'David and Romane: two practitioners who use it daily',
                    'Examples drawn from real DKDP projects',
                    'Post-training email follow-up for 30 days',
                    'Programme updated with every new Claude version',
                  ].map((p) => (
                    <div key={p} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Sparkles size={14} style={{ color: OR }} className="flex-shrink-0 mt-0.5" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: '700+', l: 'Clients supported', c: V },
                  { v: '10+', l: 'Years of experience', c: CH },
                  { v: '5/5', l: 'Google rating', c: OR },
                  { v: '100%', l: 'Tailored', c: V },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="text-center py-8 rounded-[16px]"
                    style={{ background: ORB, border: `1px solid ${ORD}` }}
                  >
                    <p className="text-4xl font-bold mb-2" style={{ color: s.c }}>{s.v}</p>
                    <p className="text-text-muted text-xs">{s.l}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ══ 12. Trainers ══ */}
      <HeroBg
        blob1="rgba(255,107,0,0.08)"
        blob2="rgba(124,58,237,0.05)"
        accentRgb="167,139,250"
        className="border-b border-border"
      >
        <section className="py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-16">
                <GradTag className="mb-6">Your trainers</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-text">
                  Trained by practitioners, not theorists.
                </h2>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <CircularTestimonialsLazy
                items={FORMATEURS}
                autoplay={true}
                colors={{
                  name: '#ffffff',
                  designation: OR,
                  quote: '#9CA3AF',
                  arrowBackground: '#1E1E1E',
                  arrowForeground: '#ffffff',
                  arrowHoverBackground: '#FF6B00',
                }}
                fontSizes={{
                  name: '1.6rem',
                  designation: '0.75rem',
                  quote: '1rem',
                }}
              />
            </SectionReveal>
          </div>
        </section>
      </HeroBg>

      {/* ══ 15. Testimonials ══ */}
      <Testimonials accentRgb="167,139,250" lang="en" />

      {/* ══ 16. FAQ ══ */}
      <section id="faq" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text mb-3">Frequently asked questions about the Claude AI training</h2>
              <p className="text-text-muted">Everything you need to know before booking.</p>
            </div>
          </SectionReveal>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <SectionReveal key={item.question}>
                <details className="group rounded-[14px] border border-border bg-bg-card overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                    <span className="text-text text-sm font-semibold leading-snug">{item.question}</span>
                    <ChevronRight size={16} className="flex-shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-text-secondary text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="text-center mt-10">
              <p className="text-text-muted text-sm mb-4">Have a specific question?</p>
              <LiquidMetalButton href={localizedPath('/contact', 'en') + '?service=formation-claude'} size="md">
                Ask your question →
              </LiquidMetalButton>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 14. CTA Final ══ */}
      <CTAFinal accentRgb="167,139,250" lang="en" />
    </main>
  )
}
