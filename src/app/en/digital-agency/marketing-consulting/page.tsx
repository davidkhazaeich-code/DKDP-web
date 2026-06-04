import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { CheckCircle2, ChevronRight, ShieldCheck, BarChart2, Clock, Globe2, TrendingUp, Users, Star, Zap } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { violet } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS, DESIGN_WEB_LOGOS, SOCIAL_LOGOS } from '@/components/ui/AppLogos'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))

export const metadata: Metadata = {
  title: 'Marketing Consulting Geneva & French-speaking Switzerland · DKDP',
  description:
    'Digital marketing consulting for SMBs in Geneva. Digital presence audit, bespoke strategy and ongoing support. Clarify your digital direction.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/marketing-consulting',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/consulting-marketing',
      en: 'https://dkdp.ch/en/digital-agency/marketing-consulting',
      'x-default': 'https://dkdp.ch/agence-digitale/consulting-marketing',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    url: 'https://dkdp.ch/en/digital-agency/marketing-consulting',
    images: [{ url: '/images/og/consulting-marketing.png', width: 1376, height: 768, alt: 'Digital marketing consulting Geneva DKDP' }],
  },
}


const FAQ = [
  {
    question: 'What is a digital presence audit?',
    answer:
      'A digital presence audit analyses all of your online channels: website, SEO, social media, Google Ads, email and online reputation. DKDP delivers a report with a score per channel, the priority friction points and an action plan ranked by impact.',
  },
  {
    question: 'How much does an audit or a consulting engagement at DKDP cost?',
    answer:
      'A full marketing audit is priced at CHF 1\'500. Monthly support starts at CHF 900 / month. The full 360° Strategy is available at CHF 3\'500 / month. A first discovery call is free.',
  },
  {
    question: 'Who is digital marketing consulting for?',
    answer:
      'For SMBs that want to get started online without knowing where to begin. For companies investing in digital without seeing results. For leaders who want to understand their situation before delegating. And for in-house teams that need an expert outside perspective.',
  },
  {
    question: 'What is the difference between consulting and full management?',
    answer:
      'Consulting gives you the strategy, the analysis and the recommendations. You implement it yourself or with your team. Full management means DKDP executes on your behalf. Both approaches can be combined: DKDP audit and strategy, in-house execution.',
  },
  {
    question: 'Do you work with in-house marketing teams?',
    answer:
      'Yes. DKDP often works alongside an in-house team: situation audit, best-practice training, strategic framing or ad-hoc support on specific projects. We adapt to your organisation.',
  },
  {
    question: 'What deliverables do you receive from a consulting engagement?',
    answer:
      'Depending on the engagement: an audit report with scores and recommendations, a 6 or 12-month strategic plan, a mapping of channels and personas, an execution brief for each initiative, or a presentation for the management committee. Every engagement ends with an actionable deliverable.',
  },
]

const BENEFITS = [
  {
    Icon: TrendingUp,
    value: '+65%',
    title: 'More leads',
    desc: 'On average, our clients generate 65% more leads within the first 6 months of support thanks to a structured acquisition strategy.',
  },
  {
    Icon: BarChart2,
    value: '6 months',
    title: 'Proven ROI',
    desc: 'In 6 months, you have a complete dashboard, measurable KPIs and a clear view of the return on your marketing investment.',
  },
  {
    Icon: Users,
    value: '95%',
    title: 'Client retention',
    desc: '95% of our clients renew their engagement after the first year. Proof that the method works.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: '360° audit',
    desc: 'Complete analysis of your current channels, your funnel, your KPIs and your competitive positioning.',
  },
  {
    step: '02',
    title: 'Strategy',
    desc: 'Definition of priorities, channels to activate and the action plan over 3 and 12 months.',
  },
  {
    step: '03',
    title: 'Implementation',
    desc: 'Activation of the identified levers: SEO, Ads, social, email, content. Each action is prioritised.',
  },
  {
    step: '04',
    title: 'Measurement and optimisation',
    desc: 'Real-time dashboards. Every week, we analyse, we adjust, we improve.',
  },
  {
    step: '05',
    title: 'Coaching and reporting',
    desc: 'Monthly meeting with the decision-maker. Complete report, informed decisions, autonomous team.',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

export default function ConsultingMarketingPage() {
  return (
    <main>
      <SchemaOrg schema={buildService({ name: 'Digital Marketing Consulting French-speaking Switzerland', url: '/en/digital-agency/marketing-consulting', description: 'Digital presence audit and strategic consulting for SMBs in Geneva. Prioritised action plan and ongoing support.', lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Digital Agency', url: 'https://dkdp.ch/en/digital-agency' },
        { name: 'Marketing consulting', url: 'https://dkdp.ch/en/digital-agency/marketing-consulting' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href={localizedPath('/agence-digitale', 'en')} className="text-text-muted text-sm hover:text-text transition-colors">
                Digital Service
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Marketing consulting</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Digital marketing consulting Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Actions, KPIs, <GradText as="span">results</GradText>. Not a 50-page report.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  As a digital marketing consultant for SMBs in French-speaking Switzerland, DKDP audits your digital presence, defines your growth strategy and steers execution month after month. No 50-page report: KPIs, actions and proven results in 6 months.
                </p>
                <HeroPills
                  items={[
                    { label: 'Free audit', Icon: Zap },
                    { label: 'No commitment', Icon: CheckCircle2 },
                    { label: 'Within 7 days', Icon: Clock },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href={localizedPath('/contact', 'en') + '?service=service-digital'} size="lg">Free discovery call →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-text transition-colors">
                    Our method ↓
                  </Link>
                </div>
              </div>
              {/* ── Hero visual ── */}
              <div className="relative flex flex-col gap-4">
                {/* Audit Radar + Before/After */}
                <div
                  className="rounded-[14px] overflow-hidden"
                  style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${border}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <span className="text-[10px] text-zinc-400 font-mono">Marketing Audit 360 · Result</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="text-[9px] text-amber-400 font-bold">Before DKDP</span>
                      <div className="w-2 h-2 rounded-full bg-green-400 ml-2" />
                      <span className="text-[9px] text-green-400 font-bold">After 6 months</span>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Radar-style bars */}
                    <div className="space-y-3">
                      {[
                        { axis: 'digital strategy', before: 25, after: 85 },
                        { axis: 'technical SEO', before: 18, after: 92 },
                        { axis: 'content & copywriting', before: 35, after: 78 },
                        { axis: 'conversion (UX/CRO)', before: 22, after: 71 },
                        { axis: 'analytics & tracking', before: 12, after: 88 },
                        { axis: 'paid advertising', before: 40, after: 82 },
                      ].map((a) => (
                        <div key={a.axis}>
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-zinc-400">{a.axis}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400/60 text-[9px] line-through">{a.before}%</span>
                              <span className="text-green-400 font-bold text-[9px]">{a.after}%</span>
                            </div>
                          </div>
                          <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
                            {/* Before bar (faded) */}
                            <div
                              className="absolute inset-y-0 left-0 rounded-full opacity-30"
                              style={{ width: `${a.before}%`, background: '#fbbf24' }}
                            />
                            {/* After bar */}
                            <div
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{ width: `${a.after}%`, background: 'linear-gradient(90deg, rgba(74,222,128,0.7), rgba(74,222,128,0.3))' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] text-zinc-500 uppercase">Overall score</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-amber-400/50 text-sm line-through">25/100</span>
                          <span className="text-green-400 text-xl font-bold">83/100</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-zinc-500 uppercase">Improvement</p>
                        <p className="text-xl font-bold" style={{ color }}>+232%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating ROI card */}
                <div className="absolute -right-2 top-8 rotate-1 hidden lg:block">
                  <div
                    className="rounded-lg p-3"
                    style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
                  >
                    <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1">ROI at 6 months</p>
                    <p className="text-xl font-bold text-green-400">+340%</p>
                    <p className="text-[8px] text-zinc-500">on the marketing budget</p>
                  </div>
                </div>

                {/* Floating quick wins */}
                <div className="absolute -left-3 bottom-16 -rotate-2 hidden lg:block">
                  <div
                    className="rounded-lg p-2.5"
                    style={{ background: 'rgba(0,0,0,0.9)', border: `1px solid ${border}`, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
                  >
                    <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1.5">Quick wins identified</p>
                    {['technical SEO', 'GA4 tracking', 'Landing pages'].map((w) => (
                      <div key={w} className="flex items-center gap-1.5 text-[9px]">
                        <span className="text-green-400">&#10003;</span>
                        <span className="text-zinc-400">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { v: '+232%', l: 'Marketing score', c: '#4ade80' },
                    { v: '360°', l: 'Complete audit', c: color },
                    { v: '3 months', l: 'First results', c: '#FF8C00' },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="text-center py-3 rounded-[10px]"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <p className="text-lg font-bold" style={{ color: s.c }}>{s.v}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ── Marquee tools integrated into hero ── */}
        <div className="pt-4 pb-12" aria-label="Marketing tools we deploy for you">
          <AppLogoMarquee
            logos={[...IA_LOGOS.slice(0, 5), ...DESIGN_WEB_LOGOS, ...SOCIAL_LOGOS]}
            durationSeconds={189}
            size="md"
          />
        </div>

      </HeroBg>





      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '+65%', l: 'Leads generated', sub: 'Average gain at 6 months' },
              { v: '10 years', l: 'Of expertise', sub: 'B2B and B2C Switzerland' },
              { v: '95%', l: 'Client renewal', sub: 'After the first year' },
              { v: '6 months', l: 'Measurable ROI', sub: 'Average timeframe observed' },
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
      {/* ── Subnav ── */}
      <ScrollSpyNav
        items={[
          { label: 'Our approach', href: '#approche' },
          { label: 'Results', href: '#résultats' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'Process', href: '#process' },
          { label: 'Testimonials', href: '#temoignages' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: localizedPath('/contact', 'en') }}
        accentColor="#A78BFA"
        accentBg="rgba(124,58,237,0.18)"
        accentBorder="rgba(124,58,237,0.30)"
      />

      {/* ── Our approach ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Our approach</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Marketing advice for SMBs: an outside perspective that makes the difference.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                When you manage your own marketing day to day, it is hard to see what is blocking you. DKDP brings a fresh perspective, concrete data and experience across more than 150 projects to pinpoint exactly where your opportunities are lost.
              </p>
              <p className="text-text-secondary leading-relaxed">
                DKDP consulting is pragmatic: we always end with an action plan ranked by priority, with resource and timeline estimates. You know exactly what to do, in what order, and why.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Complete marketing audit (acquisition, conversion, retention)',
                  'Definition of the 12-month growth strategy',
                  'Setup of KPIs and dashboards',
                  'Sales funnel optimisation',
                  'Multi-channel acquisition strategy (SEO, Ads, Social, Email)',
                  'Content plan and editorial strategy',
                  'Training of in-house marketing teams',
                  'Monthly support and real-time adjustments',
                ].map((item) => (
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

      {/* ── Insight / problem ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">The real problem</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                SMB digital strategy: why most invest without a defined direction.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Without an audit or a clear direction, every franc spent on marketing is a gamble. DKDP measures the gap between your current situation and your real potential on each growth lever.
              </p>
              <div className="space-y-4">
                {[
                  { title: '74% of Swiss SMBs have no documented digital strategy', sub: 'Source: EY / SME Federation study' },
                  { title: '60% of marketing budgets are wasted on unmeasured channels', sub: 'Source: McKinsey Marketing Analytics Report' },
                  { title: 'An unoptimised funnel loses on average 70% of prospects before the first contact', sub: 'Source: HubSpot State of Marketing' },
                ].map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-3 items-start">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-[8px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <TrendingUp size={16} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-text text-sm font-semibold leading-snug">{item.title}</p>
                        <p className="text-text-muted text-[11px] mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-5 md:p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(124,58,237,0.08)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Scores by marketing pillar
                </p>
                {/* ── Marketing audit score ── */}
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                    <span style={{ color: 'rgba(239,68,68,0.85)' }}>Average SMB score without support</span>
                    <span style={{ color }}>DKDP 6-month target</span>
                  </div>
                  {[
                    { label: 'Acquisition', before: 25, after: 78 },
                    { label: 'Conversion', before: 20, after: 72 },
                    { label: 'Retention', before: 30, after: 85 },
                    { label: 'Branding', before: 35, after: 80 },
                    { label: 'Analytics', before: 15, after: 90 },
                  ].map((p) => (
                    <div key={p.label} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-text text-xs font-semibold">{p.label}</span>
                        <span className="text-[11px] font-bold" style={{ color }}>+{p.after - p.before}pts</span>
                      </div>
                      <div className="relative h-2 w-full rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                        <div
                          className="absolute left-0 top-0 h-full rounded-full"
                          style={{ width: `${p.before}%`, background: 'rgba(239,68,68,0.55)' }}
                        />
                      </div>
                      <div className="relative h-2 w-full rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                        <div
                          className="absolute left-0 top-0 h-full rounded-full"
                          style={{ width: `${p.after}%`, background: 'linear-gradient(90deg, #7C3AED, #A78BFA)' }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-text-muted">
                        <span>{p.before}%</span>
                        <span style={{ color }}>{p.after}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-text-muted text-[11px] text-center mt-6">
                  Average scores measured across our clients before and after 6 months of DKDP support.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section id="résultats" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Results</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                What you concretely gain.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <SectionReveal key={b.title} delay={i * 0.1}>
                <div className="flex flex-col gap-4 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <b.Icon size={22} style={{ color }} />
                  </div>
                  <div className="text-3xl font-bold" style={{ color }}>{b.value}</div>
                  <h3 className="text-text font-bold text-lg">{b.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">{b.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offers ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Digital marketing consulting pricing for SMBs.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Every service is documented and validated before kickoff. No annual commitment on monthly plans.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Marketing Audit',
                price: 'CHF 1\'500',
                duration: 'one-off service',
                features: [
                  'Acquisition + conversion + retention audit',
                  'Competitor analysis',
                  'Priorities report',
                  '12-month roadmap',
                  'Presentation of recommendations',
                ],
                cta: 'Request an audit',
                highlight: false,
              },
              {
                label: 'Monthly Support',
                price: 'CHF 900 / month',
                duration: 'Most requested',
                features: [
                  'Initial audit included',
                  'Monthly marketing strategy',
                  'Weekly KPI tracking',
                  '1 priority action / month implemented',
                  'Marketing team coaching',
                  'Monthly report + recommendations',
                ],
                cta: 'Start the support',
                highlight: true,
              },
              {
                label: '360° Strategy',
                price: 'CHF 3\'500 / month',
                duration: 'Full management',
                features: [
                  'Full marketing management',
                  'All channels (SEO + Ads + Social + Email)',
                  'Content production included',
                  'Outsourced marketing team',
                  'Weekly executive reporting',
                  'Priority access to associate director',
                ],
                cta: 'Let us discuss your project',
                highlight: false,
              },
            ].map((offer, i) => (
              <SectionReveal key={offer.label} delay={i * 0.1}>
                <div
                  className="relative flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{
                    borderColor: offer.highlight ? color : border,
                    boxShadow: offer.highlight ? `0 0 40px rgba(124,58,237,0.15)` : 'none',
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
                        Most requested
                      </span>
                    )}
                    <p className="text-text font-bold text-xl mb-1">{offer.label}</p>
                    <p className="text-2xl font-bold mb-1" style={{ color }}>{offer.price}</p>
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
                      href={localizedPath('/contact', 'en') + '?service=service-digital'}
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

      {/* ── Process ── */}
      <section id="process" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Method</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Our digital marketing consulting method in 5 steps.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS.map((p, i) => (
              <SectionReveal key={p.step} delay={i * 0.08}>
                <div className="flex flex-col gap-3 p-5 bg-bg rounded-[14px] border border-border h-full">
                  <div className="text-[11px] font-bold tracking-widest" style={{ color }}>{p.step}</div>
                  <h3 className="text-text font-semibold text-sm">{p.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="temoignages" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Testimonials</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Results, not promises.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'DKDP mapped our entire funnel in 2 weeks. We discovered we were losing 60% of our leads between the first contact and the quote. It is now fixed.',
                author: 'Managing Director, B2B consulting firm',
                location: 'Geneva',
              },
              {
                quote: 'Before the support, we were doing marketing blind. Now we have dashboards, KPIs and a real strategy. Our revenue grew by 40% in 8 months.',
                author: 'Founder, communications agency',
                location: 'Lausanne',
              },
              {
                quote: 'DKDP saved us 3 costly strategic mistakes by bringing an outside perspective. The investment in consulting paid for itself in 2 months.',
                author: 'MD, industrial SMB',
                location: 'Vaud',
              },
            ].map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.1}>
                <div
                  className="flex flex-col gap-5 p-7 rounded-[16px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={13} fill={color} style={{ color }} />
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="text-text text-sm font-semibold">{t.author}</p>
                    <p className="text-text-muted text-xs mt-0.5">{t.location}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Commitments ── */}
      <section className="py-24 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Our commitments
              </p>
              <div className="relative">
                <div aria-hidden="true" className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.20) 5%, #A78BFA 50%, rgba(124,58,237,0.20) 95%, transparent)' }} />
                <div className="relative z-[1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { Icon: ShieldCheck, title: 'Documented strategy', desc: 'You receive a complete strategy document after each phase. Everything is written, not verbal: you keep the knowledge.' },
                    { Icon: BarChart2, title: 'KPIs defined together', desc: 'The success metrics are defined with you before we start. You know exactly how to measure success.' },
                    { Icon: Clock, title: 'Results in 30 days', desc: 'The first actions are in place within the first 30 days. No month 1 of "thinking": we start the work immediately.' },
                    { Icon: Globe2, title: 'Total flexibility', desc: 'Monthly support with no annual commitment. If the results are not there, you can leave. We prefer excellence over contractual lock-in.' },
                  ].map((g) => (
                    <div key={g.title} className="text-center">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-[10px] mx-auto mb-4"
                        style={{ background: 'rgba(124,58,237,0.12)', border: `1px solid ${border}` }}
                      >
                        <g.Icon size={22} style={{ color }} />
                      </div>
                      <p className="text-text font-bold text-sm mb-2">{g.title}</p>
                      <p className="text-text-muted text-xs leading-relaxed">{g.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Your questions about marketing consulting" lang="en" />
      </div>

      {/* ── SEO bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/agence-digitale/publicite-sea', 'en')}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.03) 100%)',
                borderColor: 'rgba(124,58,237,0.28)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <TrendingUp size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Next step</p>
                  <p className="text-text font-bold text-lg leading-tight">Google Ads advertising</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Your strategy is defined. To quickly activate paid acquisition, discover our Google Ads campaign management.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                See the Ads <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal lang="en" />
    </main>
  )
}
