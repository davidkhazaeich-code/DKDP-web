import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronRight,
  CheckCircle2,
  FileText,
  Calendar,
  Target,
  BarChart3,
  Database,
  Cpu,
  Layers,
  Clock,
  Bot,
  Workflow,
  Star,
  MapPin,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import dynamic from 'next/dynamic'
import { HeroBg } from '@/components/ui/HeroBg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { chrome, violet as violetToken, green as greenToken } from '@/lib/tokens'
import { localizedPath } from '@/i18n/slugs'
import { AppLogoMarquee, IA_LOGOS } from '@/components/ui/AppLogos'
const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))

export const metadata: Metadata = {
  title: 'AI Audit for Businesses in Geneva and French-speaking Switzerland | DKDP',
  description:
    'AI consulting for SMBs in French-speaking Switzerland. Structured AI audit: 3 high-ROI actions identified. From CHF 490, full report within 48 hours.',
  alternates: {
    canonical: 'https://dkdp.ch/en/artificial-intelligence/audit-consulting',
    languages: {
      'fr-CH': 'https://dkdp.ch/intelligence-artificielle/audit-conseil',
      en: 'https://dkdp.ch/en/artificial-intelligence/audit-consulting',
      'x-default': 'https://dkdp.ch/intelligence-artificielle/audit-conseil',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/audit-conseil-ia.png', width: 1376, height: 768, alt: 'AI audit and consulting for businesses in Geneva by DKDP' }],
  },
}

const color  = chrome.color
const bg     = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'
const green  = greenToken.color
const violet = violetToken.color

// ── AuditScoreCard (inlined, translated) ──────────────────────────────────────

function AuditScoreCard() {
  const scoreBorder = 'rgba(212,212,216,0.15)'
  const rows = [
    { label: 'Lead qualification', niveau: 'High',   gain: '12h/week', roi: 'x4.2', niveauColor: green },
    { label: 'Email handling',     niveau: 'Medium', gain: '5h/week',  roi: 'x2.8', niveauColor: '#FBBF24' },
    { label: 'Monthly reporting',  niveau: 'High',   gain: '8h/week',  roi: 'x3.5', niveauColor: green },
  ]

  return (
    <div
      className="rounded-[20px] p-6 border w-full"
      style={{ background: 'rgba(212,212,216,0.04)', borderColor: scoreBorder, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-text font-bold text-[15px]">Your AI audit result</p>
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(74,222,128,0.12)', color: green, border: `1px solid rgba(74,222,128,0.25)` }}
        >
          High potential
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-4 gap-2 mb-2 px-1">
        <p className="text-text-muted text-[9px] font-bold uppercase tracking-wider col-span-2">Opportunity</p>
        <p className="text-text-muted text-[9px] font-bold uppercase tracking-wider text-center">Gain</p>
        <p className="text-text-muted text-[9px] font-bold uppercase tracking-wider text-right">ROI</p>
      </div>

      {/* Rows */}
      <div className="space-y-2 mb-5">
        {rows.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-2 items-center p-3 rounded-[10px]"
            style={{ background: 'rgba(212,212,216,0.05)', border: `1px solid ${scoreBorder}` }}
          >
            <div className="col-span-2">
              <p className="text-text text-[12px] font-semibold leading-tight">{row.label}</p>
              <span
                className="text-[9px] font-bold uppercase tracking-wider"
                style={{ color: row.niveauColor }}
              >
                {row.niveau}
              </span>
            </div>
            <p className="text-[11px] text-center" style={{ color }}>{row.gain}</p>
            <p className="text-[12px] font-bold text-right" style={{ color: green }}>{row.roi}</p>
          </div>
        ))}
      </div>

      {/* Score bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <p className="text-[11px] font-semibold" style={{ color }}>Automatability score</p>
          <p className="text-[12px] font-bold" style={{ color: green }}>78/100</p>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(212,212,216,0.12)' }}>
          <div
            className="h-full rounded-full"
            style={{ width: '78%', background: `linear-gradient(to right, ${green}, #22c55e)` }}
          />
        </div>
      </div>

      {/* Footer */}
      <p className="text-text-muted text-[9px] text-center mt-4">
        Example audit result. Your situation may differ.
      </p>
    </div>
  )
}

// ── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: 'Is the audit really no-commitment?',
    answer:
      'Yes. The audit costs CHF 490 or CHF 890 depending on the format, but there is no obligation to continue. You leave with a full report that you can implement on your own, with another provider, or with us. Our belief: if the work is good, you will come back. Many do.',
  },
  {
    question: 'How long does the audit session last?',
    answer:
      'The initial scoping session lasts 60 minutes. We then analyse your processes internally over 24 to 48 hours. You receive your full report within 48 hours of the session, then we schedule a 45-minute presentation session with your team.',
  },
  {
    question: 'Do I need to prepare anything before the audit?',
    answer:
      'No complex preparation required. It helps to list your 5 to 10 most time-consuming tasks and to have access to an overview of your main tools (CRM, management software, inbox). We guide the session: you simply answer our questions.',
  },
  {
    question: 'What happens after the audit?',
    answer:
      'You receive a full PDF report with 3 prioritised actions and their estimated ROI. If you want to go further, we can deploy the identified automations through our AI Agents, Business Automation or AI Implementation services. No obligation, you choose your own pace.',
  },
  {
    question: 'Can we implement the recommendations ourselves?',
    answer:
      'Absolutely. The report is written to be actionable on your own. We specify the tools to use, the technical steps and the available resources. If you prefer to delegate the implementation, our teams can handle the entire deployment.',
  },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function AuditConsultingPage() {
  const schemaService = buildService({
    name: 'AI Audit and Consulting in French-speaking Switzerland',
    url: '/en/artificial-intelligence/audit-consulting',
    description: 'An audit of your automation potential. We identify the 3 high-ROI actions in your business. No commitment.',
    lang: 'en',
  })

  const schemaFaq = buildFAQPage(FAQ_ITEMS)

  const schemaBreadcrumb = buildBreadcrumbList([
    { name: 'Home',                     url: 'https://dkdp.ch/en' },
    { name: 'Artificial Intelligence',  url: 'https://dkdp.ch/en/artificial-intelligence' },
    { name: 'AI Audit and Consulting',  url: 'https://dkdp.ch/en/artificial-intelligence/audit-consulting' },
  ])

  return (
    <main>
      <SchemaOrg schema={schemaService} />
      <SchemaOrg schema={schemaFaq} />
      <SchemaOrg schema={schemaBreadcrumb} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <HeroBg
        blob1="rgba(212,212,216,0.09)"
        blob2="rgba(124,58,237,0.08)"
        accentRgb="212,212,216"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <h1 className="grad-tag inline-block text-xs md:text-sm">AI audit for businesses in Geneva and French-speaking Switzerland</h1>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(74,222,128,0.12)', color: green, border: `1px solid rgba(74,222,128,0.25)` }}
                  >
                    No commitment
                  </span>
                </div>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  3 concrete opportunities <GradText as="span">within 48 hours</GradText>. Not a report that gathers dust.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8">
                  Our AI consulting identifies the 3 high-ROI automation opportunities for your SMB in French-speaking Switzerland. Concrete results in one session, full report within 48 hours.
                </p>
                <HeroPills
                  accentRgb="212, 212, 216"
                  items={[
                    { label: 'Within 7 days', Icon: Clock },
                    { label: 'No commitment', Icon: CheckCircle2 },
                    { label: 'Geneva and French-speaking Switzerland', Icon: MapPin },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Request an AI audit
                  </LiquidMetalButton>
                  <p className="text-text-muted text-sm">Full report in 48 hours</p>
                </div>
                <p className="text-text-muted text-xs mt-6">Offer updated: April 2026</p>
              </div>

              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="AI tools we audit and compare">
                  <AppLogoMarquee
            logos={IA_LOGOS}
            durationSeconds={135}
            size="md"
          />
                </div>
                <div
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(212,212,216,0.10)' }}
                >
                  <Image
                    src="/images/services/dkdp-ia-audit-conseil.webp"
                    alt="AI audit and consulting for SMBs in French-speaking Switzerland"
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
        </section>      </HeroBg>





      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {[
              { value: '1h',   label: 'Length of the audit session' },
              { value: '3',    label: 'AI opportunities identified, minimum' },
              { value: '48h',  label: 'To receive your full report' },
            ].map((s) => (
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


      <LogoBanner lang="en" />
      {/* ── Subnav ── */}
      <ScrollSpyNav
        items={[
          { label: 'Our approach', href: '#approche' },
          { label: 'What you receive', href: '#livrables' },
          { label: 'Process', href: '#process' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: localizedPath('/contact', 'en') }}
        accentColor="#D4D4D8"
        accentBg="rgba(212,212,216,0.10)"
        accentBorder="rgba(212,212,216,0.20)"
      />

      {/* ── What we analyse ───────────────────────────────────────────────── */}
      <section id="approche" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: text */}
            <SectionReveal>
              <GradTag className="mb-4">Our approach</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Our AI consulting method: a structured diagnosis.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-10">
                Before talking about AI, we understand your business. Our audit covers four key dimensions to build a solid diagnosis and give you actionable recommendations.
              </p>
              <div className="space-y-5">
                {[
                  {
                    Icon: Layers,
                    title: 'Mapping your processes',
                    desc: 'Workflows, volumes handled, frequencies. We understand how your business really works.',
                  },
                  {
                    Icon: Cpu,
                    title: 'Analysis of the tools in place',
                    desc: 'Current stack, possible integrations, compatibility with AI solutions. No rebuilding of your infrastructure.',
                  },
                  {
                    Icon: Database,
                    title: 'Assessment of available data',
                    desc: 'Quality, accessibility, structure. Data is the fuel of AI: we check that the tank is there.',
                  },
                  {
                    Icon: BarChart3,
                    title: 'ROI potential calculation',
                    desc: 'A concrete estimate in hours saved and in CHF. No vague promises: figures based on your situation.',
                  },
                ].map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-4 items-start">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-[8px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <item.Icon size={18} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-text font-semibold text-[15px] mb-1">{item.title}</p>
                        <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </SectionReveal>

            {/* Right: AuditScoreCard */}
            <SectionReveal delay={0.15}>
              <AuditScoreCard />
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* ── Your deliverable ──────────────────────────────────────────────── */}
      <section id="livrables" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">What you receive</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                What you receive after the AI audit.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                Not just a summary. A precise action plan, ready to be implemented.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: FileText,
                num: '01',
                title: 'Full audit report',
                tag: 'PDF',
                items: [
                  'Mapping of your processes',
                  'Automation potential by area',
                  'Prioritised recommendations',
                ],
              },
              {
                Icon: Target,
                num: '02',
                title: '90-day action plan',
                tag: 'Strategy',
                items: [
                  '3 prioritised quick wins',
                  'ROI estimate for each',
                  'Recommended deployment order',
                ],
              },
              {
                Icon: Calendar,
                num: '03',
                title: 'Presentation session',
                tag: '45 min',
                items: [
                  'Walkthrough of the report with your team',
                  'Questions and answers',
                  'Tool recommendations',
                ],
              },
            ].map((d, i) => (
              <SectionReveal key={d.title} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-[10px]"
                      style={{ background: 'rgba(212,212,216,0.08)', border: `1px solid ${border}` }}
                    >
                      <d.Icon size={20} style={{ color }} />
                    </div>
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: 'rgba(212,212,216,0.08)', color: `${color}80`, border: `1px solid ${border}` }}
                    >
                      {d.tag}
                    </span>
                  </div>
                  <span
                    className="text-[11px] font-bold mb-1"
                    style={{ color: `${color}50` }}
                  >
                    {d.num}
                  </span>
                  <h3 className="text-text font-bold text-lg mb-4">{d.title}</h3>
                  <ul className="space-y-2.5 flex-1">
                    {d.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: green }} />
                        <span className="text-text-secondary text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section id="process" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">How it works</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                4 steps of your audit, from the call to the action plan.
              </h2>
            </div>
          </SectionReveal>

          <div className="relative">
            {/* Connector line */}
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
                  n: '01',
                  Icon: Clock,
                  title: 'Scoping interview',
                  duration: '30 min',
                  desc: 'We understand your business, your tools and your goals. No jargon: a real conversation about what slows you down.',
                },
                {
                  n: '02',
                  Icon: Layers,
                  title: 'Analysis and mapping',
                  duration: '24-48h',
                  desc: 'We work internally. Analysis of your processes, identification of opportunities, calculation of the potential of each automation.',
                },
                {
                  n: '03',
                  Icon: FileText,
                  title: 'Report and recommendations',
                  duration: 'Delivery',
                  desc: 'A complete document with 3 prioritised actions, estimated ROI for each and concrete tool recommendations.',
                },
                {
                  n: '04',
                  Icon: Calendar,
                  title: 'Presentation session',
                  duration: '45 min',
                  desc: 'Walkthrough of the report with your team. Questions, answers and an action plan. You leave with a clear direction.',
                },
              ].map((step, i) => (
                <SectionReveal key={step.n} delay={i * 0.1}>
                  <div
                    className="relative flex flex-col gap-4 p-7 rounded-[16px] border h-full"
                    style={{ background: `linear-gradient(${bg}, ${bg}), var(--bg)`, borderColor: border }}
                  >
                    <span
                      className="absolute top-4 right-4 text-[11px] font-bold"
                      style={{ color: `${color}60` }}
                    >
                      {step.n}
                    </span>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                      style={{ background: 'rgba(212,212,216,0.08)', border: `1px solid ${border}` }}
                    >
                      <step.Icon size={22} style={{ color }} />
                    </div>
                    <div>
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest"
                        style={{ color: green }}
                      >
                        {step.duration}
                      </span>
                      <h3 className="text-text font-bold text-lg mt-1">{step.title}</h3>
                    </div>
                    <p className="text-text-secondary leading-relaxed text-sm flex-1">{step.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section id="tarifs" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                AI audit pricing for SMBs.
              </h2>
              <p className="text-text-secondary mt-4 max-w-lg mx-auto text-[15px]">
                Free for companies that engage DKDP for the implementation that follows.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Standard */}
            <SectionReveal>
              <div
                className="flex flex-col h-full rounded-[20px] border p-8"
                style={{ background: bg, borderColor: border }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color }}>Standard Audit</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-bold text-text">CHF 490</span>
                </div>
                <p className="text-text-muted text-sm mb-8">Ideal for SMBs wanting to test AI on a specific department</p>

                <ul className="space-y-3 flex-1 mb-8">
                  {[
                    'Mapping of one department',
                    '1 full audit report (PDF)',
                    '3 prioritised actions with ROI',
                    '45-minute presentation session',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                      <span className="text-text-secondary text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Choose the standard audit
                </LiquidMetalButton>
              </div>
            </SectionReveal>

            {/* Complete */}
            <SectionReveal delay={0.1}>
              <div
                className="flex flex-col h-full rounded-[20px] border p-8 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(212,212,216,0.04) 100%)',
                  borderColor: 'rgba(167,139,250,0.30)',
                  boxShadow: '0 0 40px rgba(167,139,250,0.07)',
                }}
              >
                {/* Popular badge */}
                <span
                  className="absolute top-5 right-5 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(167,139,250,0.15)', color: violet, border: '1px solid rgba(167,139,250,0.30)' }}
                >
                  Recommended for SMBs
                </span>

                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: violet }}>Complete Audit</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-bold text-text">CHF 890</span>
                </div>
                <p className="text-text-muted text-sm mb-8">For companies ready to deploy AI across the entire organisation</p>

                <ul className="space-y-3 flex-1 mb-8">
                  {[
                    'Audit of the entire company',
                    'Multi-department report',
                    '2 presentation sessions',
                    'Detailed 90-day plan',
                    'Complete tool recommendations',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: violet }} />
                      <span className="text-text-secondary text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Choose the complete audit
                </LiquidMetalButton>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <HeroBg blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.08)" accentRgb="212,212,216">
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Testimonials</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                What our SMB clients discovered through the audit.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Sandra M.',
                role: 'Director, accounting firm',
                quote: "I thought our invoice processing workflow was unavoidable. The audit revealed we could automate 70% of the flow in a few weeks. I would never have spotted that on my own. The report gave me a concrete action plan, not generalities.",
                stars: 5,
              },
              {
                name: 'Thomas V.',
                role: 'Founder, B2B e-commerce',
                quote: "What surprised me was the depth of the analysis. In 48 hours, David had mapped our processes better than we ever had. Each of the 3 opportunities identified represented a real, measurable time saving. We started with the simplest one: positive ROI in 3 weeks.",
                stars: 5,
              },
            ].map((t, i) => (
              <SectionReveal key={t.name} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-8"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star key={si} size={14} fill={color} style={{ color }} />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-[15px] flex-1 mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-text font-semibold text-[14px]">{t.name}</p>
                    <p className="text-text-muted text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ_ITEMS} title="Your questions about the AI audit." lang="en" />
      </div>

      {/* ── Bridge to other AI services ───────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-text-muted text-xs font-semibold uppercase tracking-widest mb-3">
                After your audit
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em]">
                After the audit: our AI deployment services.
              </h2>
              <p className="text-text-secondary mt-3 max-w-lg mx-auto text-[15px]">
                The audit sets the diagnosis. These three services deploy the solutions identified.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                href: localizedPath('/intelligence-artificielle/agents-ia', 'en'),
                Icon: Bot,
                accent: violet,
                accentBg: 'rgba(167,139,250,0.10)',
                accentBorder: 'rgba(167,139,250,0.22)',
                label: 'AI Agents',
                title: 'Custom AI agents',
                desc: 'Agents that automate your repetitive tasks, answer your customers and analyse your data, 24/7.',
              },
              {
                href: localizedPath('/intelligence-artificielle/automatisation', 'en'),
                Icon: Workflow,
                accent: '#60A5FA',
                accentBg: 'rgba(96,165,250,0.10)',
                accentBorder: 'rgba(96,165,250,0.22)',
                label: 'Automation',
                title: 'Business automation',
                desc: 'No-code workflows that connect your CRM, email and ERP tools. Manual tasks disappear.',
              },
              {
                href: localizedPath('/intelligence-artificielle/mise-en-place', 'en'),
                Icon: Cpu,
                accent: '#F472B6',
                accentBg: 'rgba(244,114,182,0.10)',
                accentBorder: 'rgba(244,114,182,0.22)',
                label: 'Implementation',
                title: 'AI implementation',
                desc: 'Integration of ChatGPT, Claude and LLMs into your existing stack. Without rebuilding everything.',
              },
            ].map((link, i) => (
              <SectionReveal key={link.href} delay={i * 0.08}>
                <Link
                  href={link.href}
                  className="group flex flex-col h-full rounded-[16px] border p-7 transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: link.accentBg, borderColor: link.accentBorder }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-[10px] mb-5"
                    style={{ background: `${link.accentBg}`, border: `1px solid ${link.accentBorder}` }}
                  >
                    <link.Icon size={20} style={{ color: link.accent }} />
                  </div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-2"
                    style={{ color: link.accent }}
                  >
                    {link.label}
                  </p>
                  <h3 className="text-text font-bold text-lg mb-3">{link.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{link.desc}</p>
                  <span
                    className="mt-5 inline-flex items-center gap-1 text-[12px] font-semibold transition-opacity group-hover:opacity-70"
                    style={{ color: link.accent }}
                  >
                    Learn more <ChevronRight size={12} />
                  </span>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTAFinal ──────────────────────────────────────────────────────── */}
      <CTAFinal accentRgb="212,212,216" lang="en" />

    </main>
  )
}
