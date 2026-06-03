import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Bot, Workflow, BrainCircuit, Cpu, ChevronRight, Clock, TrendingUp, ShieldCheck, GraduationCap, CheckCircle2, Layers, GitMerge, Zap, MessageCircle, Users } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import dynamic from 'next/dynamic'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const ROICalculator = dynamic(() => import('@/components/sections/ROICalculator').then(m => ({ default: m.ROICalculator })))
const AutomationDiagram = dynamic(() => import('@/app/intelligence-artificielle/_components/AutomationDiagram').then(m => ({ default: m.AutomationDiagram })))

import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildBreadcrumbList, buildFAQPage, buildOrganization } from '@/lib/schema'
import { chrome } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS } from '@/components/ui/AppLogos'

export const metadata: Metadata = {
  title: 'AI Agency Geneva and Switzerland · AI for SMBs · DKDP',
  description: 'AI agency in Geneva for SMBs and corporates. Custom AI agents, business process automation, audit and consulting. 700+ companies supported in French-speaking Switzerland. Free audit.',
  alternates: {
    canonical: 'https://dkdp.ch/en/artificial-intelligence',
    languages: {
      'fr-CH': 'https://dkdp.ch/intelligence-artificielle',
      en: 'https://dkdp.ch/en/artificial-intelligence',
      'x-default': 'https://dkdp.ch/intelligence-artificielle',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/intelligence-artificielle.png', width: 1376, height: 768, alt: 'Artificial intelligence for SMBs Geneva, DKDP' }],
  },
}

const SERVICES = [
  {
    Icon: Bot, title: 'Custom AI agents', href: '/en/artificial-intelligence/ai-agents',
    description: 'Smart agents that automate your repetitive tasks, answer your clients or analyse your data. Designed for your business.',
    badge: 'Popular',
    image: '/images/services/dkdp-ia-agents-ia.webp',
  },
  {
    Icon: Workflow, title: 'Business automation', href: '/en/artificial-intelligence/automation',
    description: 'No-code workflows that connect your tools (CRM, email, ERP) and remove manual tasks. Zero friction.',
    badge: null,
    image: '/images/services/dkdp-ia-automatisation.webp',
  },
  {
    Icon: BrainCircuit, title: 'AI audit and consulting', href: '/en/artificial-intelligence/audit-consulting',
    description: 'An audit of your automation potential. We identify the three highest-ROI actions inside your business.',
    badge: 'Best seller',
    image: '/images/services/dkdp-ia-audit-conseil.webp',
  },
  {
    Icon: Cpu, title: 'AI implementation', href: '/en/artificial-intelligence/implementation',
    description: 'Integration of ChatGPT, Claude and other LLMs inside your existing stack. Without rebuilding everything.',
    badge: null,
    image: '/images/services/dkdp-ia-mise-en-place.webp',
  },
  {
    Icon: MessageCircle, title: 'Custom AI chatbot', href: '/en/artificial-intelligence/ai-chatbot',
    description: 'A 24/7 assistant designed for your business. Answer clients, qualify leads and book meetings automatically.',
    badge: 'New',
    image: '/images/services/dkdp-ia-agents-ia.webp',
  },
]

const STATS = [
  { value: '700+', label: 'Clients supported' },
  { value: '10h', label: 'Saved per week on average' },
  { value: '3 months', label: 'To a positive ROI' },
]

const BENEFITS = [
  {
    Icon: Clock, title: 'Win real time back',
    desc: 'AI takes over low-value tasks. Your team focuses on what really matters.',
  },
  {
    Icon: TrendingUp, title: 'Growth without hiring',
    desc: 'Scale your activity without multiplying headcount. An AI agent works 24/7, no fatigue, no errors.',
  },
  {
    Icon: ShieldCheck, title: 'Secure deployment',
    desc: 'We make sure your data stays confidential. Swiss hosting or private cloud depending on your constraints.',
  },
]

const FAQ_IA_EN = [
  {
    question: 'How long until we see ROI on an AI project?',
    answer: 'Most DKDP AI projects reach a positive ROI within 3 months. A typical automation project is profitable within 6 to 12 weeks of going live, depending on the complexity of the processes and the volume handled.',
  },
  {
    question: 'Are our data secure with AI?',
    answer: 'Yes. We deploy AI engines compliant with the Swiss nFADP and the EU GDPR. Sensitive sectors (finance, health, legal) are served with sovereign Swiss hosting via Infomaniak Euria or Swisscom Swiss AI Assistant. Data Processing Agreements are signed by default.',
  },
  {
    question: 'Do we need an internal IT team to deploy AI?',
    answer: 'No. DKDP handles every technical aspect: integration, security, training, monitoring. Your team only deals with the business side and the use cases they care about.',
  },
  {
    question: 'Claude, ChatGPT or Gemini, which engine should we pick?',
    answer: 'Claude Opus 4.7 (Anthropic) for long-context reasoning and document-heavy tasks. GPT-5 (OpenAI) for multimodal use cases (images, PDFs, audio). Gemini 3 (Google) if you are already on Google Workspace. We benchmark all three during the audit phase and pick the right tool for your real needs.',
  },
  {
    question: 'How do you measure the success of an AI project?',
    answer: 'Three concrete metrics: time saved per week, error rate reduction, and team satisfaction. Reported monthly with a real dashboard, not vanity metrics. No subjective KPIs, only measurable outcomes.',
  },
  {
    question: 'Can we use a sovereign Swiss AI?',
    answer: 'Yes. For regulated sectors we deploy Infomaniak Euria (Swiss AI hosted in Geneva and Winterthur) or Swisscom Swiss AI Assistant. We can also self-host Mistral Large 2 or Llama 4 on a Swiss VPS. Data never leaves Swiss territory.',
  },
  {
    question: 'How much does an AI project cost?',
    answer: "An AI audit starts at CHF 490. A business automation between CHF 1'500 and CHF 3'500. A custom AI agent between CHF 2'500 and CHF 4'900. An LLM integration between CHF 3'500 and CHF 6'500. Fixed-quote pricing, no hidden costs.",
  },
  {
    question: 'How long does an AI project take?',
    answer: 'A first prototype is delivered within 2 weeks. Full production deployment takes 4 to 8 weeks depending on complexity. We share weekly updates with a working preview from week one.',
  },
  {
    question: 'Can the agent connect to our existing tools?',
    answer: 'Yes. We connect to HubSpot, Pipedrive, Salesforce, Bexio, Notion, Slack, Microsoft 365, Google Workspace and dozens of other tools. Custom APIs are also supported. No need to rebuild your tech stack.',
  },
]

const color  = chrome.color
const bg     = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'
const badgeColors: Record<string, { background: string; color: string; border: string }> = {
  'Best seller': { background: 'rgba(10,10,10,0.84)', color: '#86efac', border: '1px solid rgba(74,222,128,0.68)' },
  'Popular':     { background: 'rgba(10,10,10,0.84)', color: '#C4B5FD', border: '1px solid rgba(124,58,237,0.65)' },
  'Free':        { background: 'rgba(10,10,10,0.84)', color: '#86efac', border: '1px solid rgba(74,222,128,0.60)' },
  'New':         { background: 'rgba(10,10,10,0.84)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.60)' },
}

export default function EnArtificialIntelligencePage() {
  return (
    <main>
      <SchemaOrg schema={buildOrganization('en')} />
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'Artificial Intelligence Agency Geneva',
          url: '/en/artificial-intelligence',
          description: 'Custom AI agents, business automation, audits and AI consulting for SMBs in Geneva and across French-speaking Switzerland.',
          serviceType: 'AI consulting and implementation',
          priceFrom: 490,
          lang: 'en',
          extraAreas: ['Zurich', 'Basel', 'Bern'],
        })}
      />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: '/en' },
        { name: 'Artificial Intelligence', url: '/en/artificial-intelligence' },
      ])} />
      <SchemaOrg schema={buildFAQPage(FAQ_IA_EN)} />

      <HeroBg
        blob1="rgba(212,212,216,0.09)"
        blob2="rgba(124,58,237,0.08)"
        accentRgb="212,212,216"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Artificial Intelligence for SMBs Geneva and Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Deploy AI <GradText as="span">where it matters</GradText>. Not everywhere for the show.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  SMBs in French-speaking Switzerland: automate what slows you down. Deploy AI where it really matters. We handle everything, from audit to production rollout.
                </p>
                <HeroPills
                  accentRgb="212, 212, 216"
                  items={[
                    { label: 'Free 30-min audit', Icon: Zap },
                    { label: 'Swiss or EU data residency', Icon: ShieldCheck },
                    { label: 'All B2B sectors', Icon: Users },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton href="/en/artificial-intelligence/audit-consulting" size="lg">
                    Request an AI audit →
                  </LiquidMetalButton>
                  <Link href="#services" className="text-sm text-text-muted hover:text-text transition-colors">
                    See our solutions ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Offer updated: April 2026</p>
              </div>
              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="AI tools deployed in business">
                  <AppLogoMarquee
                    logos={IA_LOGOS}
                    durationSeconds={126}
                    size="md"
                  />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(212,212,216,0.10)' }}>
                  <Image
                    src="/images/pillars/intelligence-artificielle.webp"
                    alt="Artificial intelligence for SMBs Geneva and French-speaking Switzerland"
                    fill
                    className="object-cover"
                    priority
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
            {STATS.map((s) => (
              <SectionReveal key={s.label}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1 text-text">{s.value}</p>
                  <p className="text-text-muted text-sm">{s.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <LogoBanner label="Companies that trust us" />

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Why now</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Why Swiss SMBs are adopting AI in 2026.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                In 2026, SMBs that do not integrate AI into their processes fall behind. Not because it is a trend, but because their competitors reply faster, produce more with less, and capture the same clients at a lower cost.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP identifies the three processes inside your business best suited for AI automation. In under an hour, you know exactly where to act first.
              </p>
              <div className="space-y-3">
                {[
                  'Processing time reduction: 85% on average',
                  'Operating cost divided by 3 on automated processes',
                  'Time to deployment: 2 to 6 weeks depending on complexity',
                  'No extra hiring required',
                ].map((fact, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{fact}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-8 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Before vs After AI automation
                </p>
                <AutomationDiagram lang="en" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <HeroBg blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.08)" accentRgb="212,212,216">
        <section id="services" className="py-24 border-y border-border">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="mb-14">
                <GradTag className="mb-4">Our solutions</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                  Our artificial intelligence services.
                </h2>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((s, i) => (
                <SectionReveal key={s.href} delay={i * 0.08}>
                  <Link
                    href={s.href}
                    className="group flex flex-col h-full bg-bg rounded-[14px] border overflow-hidden hover:-translate-y-0.5 transition-transform duration-200 relative"
                    style={{
                      borderColor: s.badge === 'Best seller' ? 'rgba(34,197,94,0.38)' : s.badge ? 'rgba(167,139,250,0.32)' : border,
                      boxShadow: s.badge ? '0 0 28px rgba(34,197,94,0.06)' : undefined,
                    }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                      {s.badge && (
                        <span
                          className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={badgeColors[s.badge]}
                        >
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-[7px] flex-shrink-0 mb-3"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <s.Icon size={16} style={{ color }} />
                      </div>
                      <h3 className="text-text font-semibold text-[16px] mb-2">{s.title}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed flex-1">{s.description}</p>
                      <span
                        className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold transition-opacity group-hover:opacity-70"
                        style={{ color }}
                      >
                        Learn more <ChevronRight size={12} />
                      </span>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>

            <SectionReveal delay={0.35}>
              <Link
                href="/en/corporate-training/ai"
                className="group mt-5 flex items-center justify-between gap-6 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,107,0,0.10) 0%, rgba(255,107,0,0.03) 100%)',
                  borderColor: 'rgba(255,107,0,0.22)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-[10px] flex-shrink-0"
                    style={{ background: 'rgba(255,107,0,0.12)', border: '1px solid rgba(255,107,0,0.25)' }}
                  >
                    <GraduationCap size={20} style={{ color: '#FF8C00' }} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#FF8C00' }}>
                      Take action
                    </p>
                    <p className="text-text font-semibold">
                      AI training for your team
                    </p>
                    <p className="text-text-muted text-[12.5px] mt-0.5">
                      Your team masters ChatGPT, Claude and Copilot in a single day.
                    </p>
                  </div>
                </div>
                <span
                  className="flex-shrink-0 flex items-center gap-1 text-[12px] font-semibold transition-opacity group-hover:opacity-70"
                  style={{ color: '#FF8C00' }}
                >
                  See the programme <ChevronRight size={12} />
                </span>
              </Link>
            </SectionReveal>
          </div>
        </section>
      </HeroBg>

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SectionReveal>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(124,58,237,0.12)' }}>
                <Image
                  src="/images/services/dkdp-ia-audit-conseil.webp"
                  alt="AI audit and consulting for Swiss SMBs"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </SectionReveal>
            <div>
              <SectionReveal>
                <div className="mb-10">
                  <GradTag className="mb-4">Why AI now</GradTag>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                    The concrete benefits of AI for your business.
                  </h2>
                </div>
              </SectionReveal>
              <div className="flex flex-col gap-6">
                {BENEFITS.map((b, i) => (
                  <SectionReveal key={b.title} delay={i * 0.1}>
                    <div className="flex gap-5 p-6 bg-bg-card border border-border rounded-[14px]">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <b.Icon size={22} style={{ color }} />
                      </div>
                      <div>
                        <h3 className="text-text font-bold text-lg mb-2">{b.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ROICalculator />

      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Our method</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Our method: from AI audit to production in 4 steps.
              </h2>
            </div>
          </SectionReveal>
          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(212,212,216,0.20) 5%, #c0c0c0 25%, #D4D4D8 50%, #c0c0c0 75%, rgba(212,212,216,0.20) 95%, transparent)',
              }}
            />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  Icon: Layers,
                  n: '01',
                  title: 'Process audit',
                  desc: 'We map your current workflows and identify the 3 processes with the highest automation ROI. Duration: 1 to 2 hours with your team.',
                },
                {
                  Icon: GitMerge,
                  n: '02',
                  title: 'Working prototype',
                  desc: 'A first AI agent or automated workflow live in under 2 weeks. You test it in real conditions before validating.',
                },
                {
                  Icon: Zap,
                  n: '03',
                  title: 'Deployment and integration',
                  desc: 'Connection to your existing tools (CRM, email, ERP, Notion). Zero friction, no need to rebuild your tech stack.',
                },
                {
                  Icon: TrendingUp,
                  n: '04',
                  title: 'Training and follow-up',
                  desc: 'Your team learns to use and adjust the automations. Monthly follow-up for 3 months to optimise performance.',
                },
              ].map((step, i) => (
                <SectionReveal key={step.n} delay={i * 0.1}>
                  <div className="relative flex flex-col gap-4 p-7 bg-bg rounded-[16px] border border-border h-full">
                    <span
                      className="absolute top-4 right-4 text-[11px] font-bold"
                      style={{ color: `${color}60` }}
                    >
                      {step.n}
                    </span>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <step.Icon size={22} style={{ color }} />
                    </div>
                    <h3 className="text-text font-bold text-lg">{step.title}</h3>
                    <p className="text-text-secondary leading-relaxed text-sm flex-1">{step.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Measurable ROI</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Client results: measurable ROI on our AI projects.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 items-stretch">
            {[
              { v: '85%', l: 'Processing time reduction', sub: 'On automated processes' },
              { v: '10h', l: 'Saved per week', sub: 'Per team member on average' },
              { v: '3 wks', l: 'First prototype delivered', sub: 'In real conditions' },
              { v: 'x3.1', l: 'Avg. ROI at 6 months', sub: 'Across shipped projects' },
            ].map((kpi, i) => (
              <SectionReveal key={kpi.l} delay={i * 0.08} className="h-full">
                <div className="flex flex-col justify-center text-center h-full p-6 rounded-[14px] border" style={{ background: bg, borderColor: border }}>
                  <p className="text-3xl md:text-4xl font-bold mb-2 leading-none" style={{ color }}>{kpi.v}</p>
                  <p className="text-text text-sm font-semibold leading-snug">{kpi.l}</p>
                  <p className="text-text-muted text-xs mt-1 leading-snug">{kpi.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                sector: 'Real estate agency',
                challenge: 'Manual qualification of 120 incoming leads per week',
                solution: 'Pre-qualification AI agent connected to the CRM',
                result: '90% of leads qualified without human intervention. 18 hours freed per week.',
              },
              {
                sector: 'HR consultancy',
                challenge: 'CV processing and application screening in 3 business days',
                solution: 'AI pipeline: automatic extraction, scoring, summary and routing',
                result: 'Lead time cut to 4 hours. Selection quality improved by 40%.',
              },
              {
                sector: 'B2B e-commerce',
                challenge: 'Customer service handled manually, 200 emails per day',
                solution: 'AI chatbot and smart routing of complex requests',
                result: '75% of requests resolved without a human agent. CSAT +22 points.',
              },
            ].map((c, i) => (
              <SectionReveal key={c.sector} delay={i * 0.1}>
                <div className="flex flex-col h-full rounded-[16px] border border-border p-6 bg-bg-card">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color }}>
                    {c.sector}
                  </p>
                  <div className="space-y-3 flex-1">
                    <div>
                      <p className="text-text-muted text-xs font-semibold mb-1">Problem</p>
                      <p className="text-text-secondary text-sm">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-text-muted text-xs font-semibold mb-1">Deployed solution</p>
                      <p className="text-text-secondary text-sm">{c.solution}</p>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-text text-sm font-semibold">{c.result}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="text-center mb-10">
            <GradTag className="mb-4">FAQ</GradTag>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your questions about artificial intelligence</h2>
          </div>
          <ul className="space-y-3">
            {FAQ_IA_EN.map(({ question, answer }) => (
              <li key={question}>
                <details className="group rounded-xl border border-border p-4 sm:p-5 transition-colors hover:border-[var(--text-muted)] bg-bg-card">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                    <span className="font-semibold text-[15px] sm:text-base leading-snug">{question}</span>
                    <span className="flex-shrink-0 mt-1 text-text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-text-secondary text-sm sm:text-[15px] leading-relaxed">{answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Complete your AI journey
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SectionReveal delay={0.05}>
              <Link
                href="/en/corporate-training/ai"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(255,107,0,0.07)', borderColor: 'rgba(255,107,0,0.22)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#FF8C00' }}>AI training</p>
                  <p className="text-text font-semibold">Train your team in a single day</p>
                  <p className="text-text-muted text-xs mt-1">ChatGPT, Claude, Copilot. Your team is independent from day one.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: '#FF8C00' }} />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <Link
                href="/en/digital-agency"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(124,58,237,0.07)', borderColor: 'rgba(124,58,237,0.22)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#A78BFA' }}>Digital agency</p>
                  <p className="text-text font-semibold">Your website and SEO optimised</p>
                  <p className="text-text-muted text-xs mt-1">Web design, SEO, Google Ads. Measurable digital presence.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 text-[#A78BFA] transition-transform group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      <CTAFinal accentRgb="212,212,216" />
    </main>
  )
}
