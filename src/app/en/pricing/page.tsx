import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone, Mail, BrainCircuit, Cpu, Bot, Workflow,
  Globe, Search, Megaphone, BarChart2,
  GraduationCap,
  ChevronRight, HelpCircle,
  FileText, CheckCircle2, Clock,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import dynamic from 'next/dynamic'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildOrganization, buildFAQPage } from '@/lib/schema'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { violet, orange, chrome } from '@/lib/tokens'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))

export const metadata: Metadata = buildServiceMetadata({
  title: 'Pricing · Web, AI and Corporate Training · DKDP Geneva',
  description:
    "Transparent pricing for web design, AI automation and corporate training in Geneva. Fixed prices, free 24-hour quote, no commitment. Web from CHF 3'500, AI from CHF 490, training from CHF 200/h.",
  enPath: '/en/pricing',
  frPath: '/tarifs',
  imageAlt: 'DKDP pricing: web design, AI and corporate training rates for Swiss SMBs',
  ogImage: '/images/og/tarifs.png',
})

const chromeColor = chrome.color
const chromeBg = chrome.bg
const chromeBd = chrome.border
const violetColor = violet.color
const violetBg = violet.bg
const violetBd = violet.border
const orangeColor = orange.color
const orangeBg = orange.bg
const orangeBd = orange.border

const HOURLY_RATES: { label: string; rate: number | null }[] = [
  { label: '1 person', rate: 200 },
  { label: '2 people', rate: 300 },
  { label: '3-6 people', rate: null },
  { label: '6-10 people', rate: null },
]

const TRAINING_FORMATS = [
  { label: 'Half-day', detail: '3 hours of training + 1 hour of prep' },
  { label: 'Full day', detail: '6 hours of training + 2 hours of prep' },
]

const AI_SERVICES = [
  {
    Icon: BrainCircuit,
    title: 'AI audit and consulting',
    href: '/en/artificial-intelligence/audit-consulting',
    from: 'CHF 490',
    to: 'CHF 890',
    labelFrom: 'Standard',
    labelTo: 'In-depth',
    desc: 'Diagnose your automation potential. We identify the three highest-ROI actions in your business.',
  },
  {
    Icon: Workflow,
    title: 'Business automation',
    href: '/en/artificial-intelligence/automation',
    from: "CHF 1'500",
    to: "CHF 3'500",
    labelFrom: 'Starter',
    labelTo: 'Business',
    desc: 'No-code workflows that connect your tools and remove manual tasks. Zero friction.',
  },
  {
    Icon: Bot,
    title: 'Custom AI agents',
    href: '/en/artificial-intelligence/ai-agents',
    from: "CHF 2'500",
    to: "CHF 4'900",
    labelFrom: 'Starter',
    labelTo: 'Pro',
    desc: 'AI agents designed for your business. Available 24/7, no fatigue, no errors.',
  },
  {
    Icon: Cpu,
    title: 'LLM integration',
    href: '/en/artificial-intelligence/implementation',
    from: "CHF 3'500",
    to: "CHF 6'500",
    labelFrom: 'Standard',
    labelTo: 'Advanced',
    desc: 'Integrate ChatGPT, Claude and other LLMs inside your existing stack, without rebuilding everything.',
  },
]

const DIGITAL_ITEMS = [
  {
    Icon: Globe,
    title: 'Web design',
    href: '/en/digital-agency/web-design',
    price: "From CHF 3'500",
    note: 'depending on scope and number of pages',
  },
  {
    Icon: Search,
    title: 'SEO and search',
    href: '/en/digital-agency/seo',
    price: "CHF 600 / month · or CHF 1'500 (one-time setup)",
    note: 'monthly retainer, no commitment · or set-up pack',
  },
  {
    Icon: Megaphone,
    title: 'Google Ads',
    href: '/en/digital-agency/google-ads',
    price: 'From CHF 400 / month',
    note: 'management fee · ad spend on top',
  },
  {
    Icon: BarChart2,
    title: 'Marketing consulting',
    href: '/en/digital-agency/marketing-consulting',
    price: 'CHF 180 / hour or project fee',
    note: 'custom quote depending on scope and duration',
  },
]

const FAQ_ITEMS = [
  {
    question: 'How does the first call work?',
    answer:
      'The discovery call lasts 30 minutes and is entirely free. We listen to your need, ask the right questions, and send you a detailed quote within 48 hours. No pressure, no commitment.',
  },
  {
    question: 'Can we split the payment?',
    answer:
      'Yes. For most projects, payment is split in two: 50% on kickoff and 50% on final delivery. A tailored payment schedule can be agreed for larger engagements.',
  },
  {
    question: 'Are there hidden fees?',
    answer:
      'No. The quote covers everything in the agreed scope. If new needs come up during the project, we discuss them before any invoicing. Full transparency.',
  },
  {
    question: 'What is included after delivery?',
    answer:
      'It depends on the service and is detailed in every quote. As a rule: a warranty period, support for minor adjustments, and clear documentation. Ongoing maintenance is covered by a separate monthly retainer.',
  },
]

export default function EnPricingPage() {
  return (
    <main>
      <SchemaOrg schema={buildOrganization('en')} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Pricing', url: '/en/pricing' },
        ])}
      />
      <SchemaOrg schema={buildFAQPage(FAQ_ITEMS)} />

      <HeroBg blob1="rgba(212,212,216,0.07)" blob2="rgba(124,58,237,0.05)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <GradTag className="mb-6">Pricing</GradTag>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                Fixed prices.{' '}
                <GradText as="span">No surprises.</GradText>
              </h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                Every project starts with a free call. We send a precise quote before kickoff. Always.
              </p>
              <div className="flex justify-center mb-10">
                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Free 30-min call
                </LiquidMetalButton>
              </div>
              <HeroPills
                align="center"
                items={[
                  { label: 'Custom quote', Icon: FileText },
                  { label: 'No commitment', Icon: CheckCircle2 },
                  { label: '24-hour reply', Icon: Clock },
                ]}
              />
            </div>
          </div>
        </section>
      </HeroBg>

      <section className="py-10 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div
              className="rounded-[16px] px-8 py-7 border flex flex-col sm:flex-row items-start sm:items-center gap-5"
              style={{ background: chromeBg, borderColor: chromeBd }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[10px] flex-shrink-0"
                style={{ background: 'rgba(212,212,216,0.10)', border: `1px solid ${chromeBd}` }}
              >
                <HelpCircle size={20} style={{ color: chromeColor }} />
              </div>
              <p className="text-text-secondary leading-relaxed text-[15px]">
                <strong className="text-text font-semibold">Prices below are indicative.</strong>{' '}
                Every project is unique. After your free 30-minute discovery call, you receive a
                detailed, no-commitment quote. The figures here give you a clear order of magnitude.
                All prices exclude Swiss VAT (8.1%).
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <LogoBanner />

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-12">
              <span
                className="inline-block text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded-[6px] mb-4"
                style={{ color: orangeColor, background: orangeBg, border: `1px solid ${orangeBd}` }}
              >
                Corporate training
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                An hourly rate{' '}
                <span style={{ color: orangeColor }}>scaled to your group size.</span>
              </h2>
              <p className="text-text-muted text-[15px] mt-3 max-w-xl">
                Price depends on the number of participants. The programme is tailored to every company.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="rounded-[16px] border overflow-hidden" style={{ borderColor: orangeBd }}>
              <div
                className="px-6 py-4"
                style={{ background: orangeBg, borderBottom: `1px solid ${orangeBd}` }}
              >
                <p className="text-text text-sm font-bold">Hourly rate by group size</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4">
                {HOURLY_RATES.map((r, i) => (
                  <div
                    key={r.label}
                    className="flex flex-col items-center justify-center px-4 py-6 text-center"
                    style={{
                      borderRight: i < 3 ? `1px solid ${orangeBd}` : undefined,
                      borderBottom: i < 2 ? `1px solid ${orangeBd}` : undefined,
                    }}
                  >
                    <p className="text-text-muted text-xs font-medium mb-2">{r.label}</p>
                    {r.rate ? (
                      <>
                        <p className="text-2xl font-bold" style={{ color: orangeColor }}>
                          CHF {r.rate}
                        </p>
                        <p className="text-text-muted text-[11px] mt-1">per hour</p>
                      </>
                    ) : (
                      <Link
                        href="/en/contact"
                        className="text-lg font-bold transition-opacity hover:opacity-80"
                        style={{ color: orangeColor }}
                      >
                        On request
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {TRAINING_FORMATS.map((f) => (
                <div
                  key={f.label}
                  className="rounded-[16px] border p-6"
                  style={{ background: orangeBg, borderColor: orangeBd }}
                >
                  <p className="text-text font-bold text-lg mb-1">{f.label}</p>
                  <p className="text-text-muted text-xs mb-3">{f.detail}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">Rate</span>
                    <Link
                      href="/en/contact"
                      className="font-bold text-sm transition-opacity hover:opacity-80"
                      style={{ color: orangeColor }}
                    >
                      On request
                    </Link>
                  </div>
                  <p className="text-text-muted text-[11px] mt-3">
                    Programme tailored to your needs.{' '}
                    <Link href="/en/contact" className="underline hover:text-text transition-colors" style={{ color: orangeColor }}>
                      Request a quote
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div
              className="mt-6 rounded-[14px] border px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ background: orangeBg, borderColor: orangeBd }}
            >
              <p className="text-text-muted text-[12.5px] leading-relaxed">
                Programme tailored to every company. Free quote within 48 hours.
              </p>
              <Link
                href="/en/corporate-training"
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity hover:opacity-80 whitespace-nowrap"
                style={{ background: orangeBg, color: orangeColor, border: `1px solid ${orangeBd}` }}
              >
                See all training programmes <ChevronRight size={12} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="py-24 border-y border-border bg-bg-card">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-12">
              <span
                className="inline-block text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded-[6px] mb-4"
                style={{ color: chromeColor, background: chromeBg, border: `1px solid ${chromeBd}` }}
              >
                Artificial Intelligence
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                Tailored AI and{' '}
                <span style={{ color: chromeColor }}>automation.</span>
              </h2>
              <p className="text-text-muted text-[15px] mt-3 max-w-xl">
                From diagnosis to a full AI agent. Every project is sized against your real needs.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {AI_SERVICES.map((svc, i) => (
              <SectionReveal key={svc.title} delay={i * 0.08}>
                <div
                  className="group flex flex-col h-full rounded-[16px] border p-7 transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: chromeBg, borderColor: chromeBd }}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-[10px] flex-shrink-0"
                      style={{ background: 'rgba(212,212,216,0.10)', border: `1px solid ${chromeBd}` }}
                    >
                      <svc.Icon size={20} style={{ color: chromeColor }} />
                    </div>
                    <div>
                      <h3 className="text-text font-bold text-[16px] leading-tight">{svc.title}</h3>
                      <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed">{svc.desc}</p>
                    </div>
                  </div>

                  <div
                    className="mt-auto rounded-[10px] px-4 py-3 flex items-center justify-between gap-4"
                    style={{ background: 'rgba(212,212,216,0.06)', border: `1px solid ${chromeBd}` }}
                  >
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-0.5">
                        {svc.labelFrom}
                      </p>
                      <p className="text-[17px] font-bold" style={{ color: chromeColor }}>{svc.from}</p>
                    </div>
                    <div className="text-text-muted text-[20px] font-light select-none">↔</div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-0.5">
                        {svc.labelTo}
                      </p>
                      <p className="text-[17px] font-bold" style={{ color: chromeColor }}>{svc.to}</p>
                    </div>
                    <Link
                      href={svc.href}
                      className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-[8px] transition-opacity hover:opacity-70"
                      style={{ background: chromeBg, border: `1px solid ${chromeBd}` }}
                      aria-label={`Learn more about ${svc.title}`}
                    >
                      <ChevronRight size={14} style={{ color: chromeColor }} />
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <div className="mt-8 text-center">
              <Link
                href="/en/artificial-intelligence"
                className="inline-flex items-center gap-2 text-[13px] font-semibold transition-opacity hover:opacity-70"
                style={{ color: chromeColor }}
              >
                Explore all AI services <ChevronRight size={14} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-12">
              <span
                className="inline-block text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded-[6px] mb-4"
                style={{ color: violetColor, background: violetBg, border: `1px solid ${violetBd}` }}
              >
                Digital Agency
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                Web, SEO and{' '}
                <span style={{ color: violetColor }}>digital marketing.</span>
              </h2>
              <p className="text-text-muted text-[15px] mt-3 max-w-xl">
                Prices reflect project complexity and scope. A free quote gives you the exact figure.
              </p>
            </div>
          </SectionReveal>

          <div className="flex flex-col gap-4">
            {DIGITAL_ITEMS.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.08}>
                <Link
                  href={item.href}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-[14px] border px-6 py-5 transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: violetBg, borderColor: violetBd }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-[10px] flex-shrink-0"
                      style={{ background: 'rgba(124,58,237,0.12)', border: `1px solid ${violetBd}` }}
                    >
                      <item.Icon size={20} style={{ color: violetColor }} />
                    </div>
                    <div>
                      <p className="text-text font-bold text-[15px] leading-tight">{item.title}</p>
                      <p className="text-text-muted text-[12.5px] mt-0.5">{item.note}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <p className="text-[15px] font-bold" style={{ color: violetColor }}>{item.price}</p>
                    <ChevronRight
                      size={16}
                      style={{ color: violetColor }}
                      className="opacity-50 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <div
              className="mt-6 rounded-[14px] border px-6 py-5"
              style={{ background: 'rgba(124,58,237,0.04)', borderColor: violetBd }}
            >
              <p className="text-text-muted text-[13.5px] leading-relaxed">
                <strong className="text-text font-semibold">Websites:</strong>{' '}
                rates depend on the number of pages, requested features and the level of design customisation.
                A simple showcase site is different from an e-commerce platform with a customer portal. Free quote, no commitment.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.35}>
            <div className="mt-6 text-center">
              <Link
                href="/en/digital-agency"
                className="inline-flex items-center gap-2 text-[13px] font-semibold transition-opacity hover:opacity-70"
                style={{ color: violetColor }}
              >
                Explore all digital services <ChevronRight size={14} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="py-24 border-t border-border bg-bg-card">
        <div className="max-w-[860px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Frequently asked</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Everything you need to know.
              </h2>
            </div>
          </SectionReveal>

          <div className="flex flex-col gap-4">
            {FAQ_ITEMS.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div
                  className="rounded-[16px] border px-7 py-6"
                  style={{ background: chromeBg, borderColor: chromeBd }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-[8px] flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(212,212,216,0.10)', border: `1px solid ${chromeBd}` }}
                    >
                      <GraduationCap size={15} style={{ color: chromeColor }} />
                    </div>
                    <div>
                      <p className="text-text font-bold text-[15px] mb-2">{item.question}</p>
                      <p className="text-text-secondary text-[14px] leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.35}>
            <div className="mt-10 text-center">
              <p className="text-text-muted text-[14px] mb-4">
                A question that is not in the list?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+41799407969"
                  className="inline-flex items-center gap-2 text-[13px] text-text-muted hover:text-text transition-colors"
                >
                  <Phone size={13} />
                  +41 79 940 79 69
                </a>
                <a
                  href="mailto:dk@dkdp.ch"
                  className="inline-flex items-center gap-2 text-[13px] text-text-muted hover:text-text transition-colors"
                >
                  <Mail size={13} />
                  dk@dkdp.ch
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <CTAFinal />
    </main>
  )
}
