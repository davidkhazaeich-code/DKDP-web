import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle2,
  Zap,
  PieChart,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  BarChart2,
  Clock,
  Globe2,
  Star,
  Search,
  Target,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { TrustLine } from '@/components/ui/TrustLine'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { violet, green } from '@/lib/tokens'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))

export const metadata: Metadata = {
  title: 'Google Ads Geneva & French-speaking Switzerland · SEA Campaigns · DKDP',
  description:
    'Google Ads agency in Geneva. Profitable Search and Display campaigns, with precise ROI tracking. Results from the first week.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/google-ads',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/publicite-sea',
      en: 'https://dkdp.ch/en/digital-agency/google-ads',
      'x-default': 'https://dkdp.ch/agence-digitale/publicite-sea',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/publicite-sea.png', width: 1376, height: 768, alt: 'Google Ads SEA advertising Geneva DKDP' }],
  },
}


const FAQ = [
  {
    question: 'What Google Ads budget should an SME in Geneva plan for?',
    answer:
      'The recommended minimum budget is CHF 500/month in ad spend. For a competitive market (lawyer, real estate, dentist), CHF 1\'000 to CHF 3\'000/month is more realistic. DKDP takes no commission on your budget: you only pay for the strategic management.',
  },
  {
    question: 'How much does Google Ads campaign management cost at DKDP?',
    answer:
      'Management fees start at CHF 350/month for a simple campaign. A multi-campaign account (Search + Display + Remarketing) is billed between CHF 600 and CHF 1\'200/month depending on complexity. First month with audit and setup included.',
  },
  {
    question: 'When will I see results with Google Ads?',
    answer:
      'Google Ads generates traffic as soon as the campaigns go live, usually within 24 to 48 hours. The first conversions appear within the first week. Cost and ROI optimisation happens over the first 4 to 8 weeks.',
  },
  {
    question: 'What is the difference between Search Ads and Display Ads?',
    answer:
      'Search Ads appear in Google results when someone searches for your service. Display Ads are banners on Google partner sites. Search targets existing demand; Display builds awareness. DKDP often recommends a combination of both.',
  },
  {
    question: 'Does DKDP take a commission on my advertising budget?',
    answer:
      'No. DKDP only bills for its management services. Your advertising budget goes directly into your Google Ads account, which you own. You have full access to your account at any time.',
  },
  {
    question: 'Can we target only Geneva and French-speaking Switzerland?',
    answer:
      'Yes. Google Ads allows very precise geographic targeting: city, radius around an address, canton, or custom area. DKDP configures the targeting to maximise the relevance of your ads within your catchment area.',
  },
  {
    question: 'How do you measure the ROI of a Google Ads campaign?',
    answer:
      'DKDP sets up conversion tracking (calls, forms, purchases) from the start. You see exactly how much each lead or sale costs you. The monthly report includes the cost per acquisition, the ROAS (return on ad spend) and optimisation recommendations.',
  },
]

const BENEFITS = [
  {
    Icon: Zap,
    value: '48h',
    title: 'Immediate traffic',
    desc: 'Your ads are live within 48h after launch. No waiting, no algorithm to feed: you are visible from the moment you go live.',
  },
  {
    Icon: PieChart,
    value: 'CHF/lead',
    title: 'ROI measured perfectly',
    desc: 'Every advertising franc is tracked. You know precisely your cost per lead, call and sale. No phantom spending.',
  },
  {
    Icon: TrendingUp,
    value: '-32%',
    title: 'Continuously falling CPA',
    desc: 'On average, our clients reduce their cost per acquisition by 32% within the first 3 months thanks to systematic optimisation.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Audit & benchmark',
    desc: 'Analysis of the existing account or market audit. Competitor keywords, optimal budget, recommended structure.',
  },
  {
    step: '02',
    title: 'Structure & ads',
    desc: 'Creation of ad groups, A/B-optimised copy, extensions. Conversion tracking configured.',
  },
  {
    step: '03',
    title: 'Controlled launch',
    desc: 'Campaigns go live, monitoring of the first 48 hours, immediate adjustments.',
  },
  {
    step: '04',
    title: 'Continuous optimisation',
    desc: 'Weekly analysis, bid and negative keyword adjustments, Quality Score improvement.',
  },
  {
    step: '05',
    title: 'Reporting & insights',
    desc: 'Full monthly report: ROAS, CPA, impressions, clicks, strategic recommendations.',
  },
]

const REALISATIONS = [
  {
    client: 'B2B accounting firm',
    type: 'Search campaign',
    image: '/images/services/dkdp-agence-sea.webp',
    results: ['+340% qualified leads', 'CPA from CHF 185 to CHF 58', 'ROAS 6.2x in 90 days'],
    tech: 'Google Ads · Search · Extensions',
  },
  {
    client: 'Specialist clinic',
    type: 'Search + Display',
    image: '/images/services/dkdp-agence-creation-web.webp',
    results: ['0 to 40 patients/month via Ads', 'CTR 5.8% (industry average: 1.4%)', 'Budget CHF 1\'200/month, revenue +220k'],
    tech: 'Google Ads · Display · Call Tracking',
  },
  {
    client: 'Lifestyle e-commerce',
    type: 'Shopping + Performance Max',
    image: '/images/services/dkdp-agence-reseaux-sociaux.webp',
    results: ['ROAS 8.1x on Shopping', '+180% revenue in Q4', 'Conversion rate 4.2% vs 1.1%'],
    tech: 'Google Shopping · Performance Max · GA4',
  },
]

const ENGAGEMENTS = [
  {
    Icon: ShieldCheck,
    title: 'Zero media commission',
    desc: 'Your advertising budget goes 100% to Google. DKDP takes no commission on media spend.',
  },
  {
    Icon: BarChart2,
    title: 'Transparent reporting',
    desc: 'Full access to your account at any time. Monthly report with every metric, unfiltered.',
  },
  {
    Icon: Clock,
    title: 'Results within 48h',
    desc: 'Campaigns are live within 48h after approval. You see the first data from the first week.',
  },
  {
    Icon: Globe2,
    title: 'Monthly contract',
    desc: 'No 12-month commitment. Monthly contract cancellable with 30 days notice. Performance justifies the relationship.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'Before DKDP, we spent CHF 2\'500/month on Ads with 3 leads a month. Now we get 18 leads for CHF 1\'800. The difference is the management.',
    author: 'Sales Director, B2B SME, Geneva',
  },
  {
    quote: 'The conversion tracking they set up let us see exactly where our customers came from. We were able to cut 30% of useless budget.',
    author: 'Founder, online boutique, Lausanne',
  },
  {
    quote: 'We had tried to manage our Ads in-house. We were losing money without knowing it. DKDP tripled our ROAS in under 2 months.',
    author: 'Manager, dental clinic, Geneva',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

function AdComparison() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="p-4 rounded-[12px]" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}>
        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4 text-center">Unoptimised account</p>
        <div className="space-y-2">
          {[
            { label: 'Average CPC', val: '4.80 CHF' },
            { label: 'Ad CTR', val: '1.2%' },
            { label: 'Cost per lead', val: '185 CHF' },
          ].map((m) => (
            <div key={m.label} className="flex justify-between items-center">
              <span className="text-text-muted text-[11px]">{m.label}</span>
              <span className="text-red-400 text-[11px] font-bold">{m.val}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="h-1.5 rounded-full bg-red-500/60 w-full" />
          <div className="h-1.5 rounded-full bg-red-500/40 w-3/4" />
        </div>
        <p className="text-red-400 text-[10px] text-center mt-2 font-semibold">Wasted budget</p>
      </div>
      <div className="p-4 rounded-[12px]" style={{ background: green.bg, border: `1px solid ${green.border}` }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: green.color }}>DKDP account</p>
        <div className="space-y-2">
          {[
            { label: 'Average CPC', val: '2.10 CHF' },
            { label: 'Ad CTR', val: '4.8%' },
            { label: 'Cost per lead', val: '62 CHF' },
          ].map((m) => (
            <div key={m.label} className="flex justify-between items-center">
              <span className="text-text-muted text-[11px]">{m.label}</span>
              <span className="text-[11px] font-bold" style={{ color: green.color }}>{m.val}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="h-1.5 rounded-full w-full" style={{ background: 'linear-gradient(90deg, #22c55e55, #4ade80)' }} />
          <div className="h-1.5 rounded-full w-1/4" style={{ background: 'rgba(74,222,128,0.3)' }} />
        </div>
        <p className="text-[10px] text-center mt-2 font-semibold" style={{ color: green.color }}>Optimised budget</p>
      </div>
    </div>
  )
}

function HeroVisual() {
  const V = violet.color
  const VD = violet.border
  return (
    <div className="relative flex flex-col gap-4">
      {/* Google Ads Live Campaign */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-zinc-400 font-mono">Active campaign</span>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-400/10 text-green-400">LIVE</span>
        </div>

        <div className="p-5 space-y-5">
          {/* Budget dial */}
          <div className="flex items-start gap-5">
            <div className="flex-1">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Monthly budget</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">CHF 2,400</span>
                <span className="text-[10px] text-zinc-500">/ month</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full w-[68%]" style={{ background: 'linear-gradient(90deg, #7C3AED, #A78BFA)' }} />
              </div>
              <p className="text-[9px] text-zinc-500 mt-1">68% spent · 12 days left</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Revenue generated</p>
              <p className="text-2xl font-bold text-green-400">CHF 19,680</p>
              <p className="text-[9px] text-green-400 font-bold">ROAS 8.2x</p>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Live metrics ticker */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Clicks today', value: '47', trend: '+12' },
              { label: 'Average CPC', value: '1.18', trend: '-0.22' },
              { label: 'Conv. today', value: '6', trend: '+3' },
              { label: 'Cost/conv.', value: '18.40', trend: '-4.60' },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-[8px] text-zinc-600 uppercase">{m.label}</p>
                <p className="text-sm font-bold text-white">{m.label.includes('CPC') || m.label.includes('Cost') ? `CHF ${m.value}` : m.value}</p>
                <p className="text-[9px] font-bold" style={{ color: m.trend.startsWith('-') ? '#4ade80' : '#4ade80' }}>{m.trend}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating conversion funnel */}
      <div className="absolute -right-2 top-8 rotate-1 hidden lg:block">
        <div
          className="rounded-lg p-3"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-2">Funnel today</p>
          {[
            { step: 'Impressions', val: '1,842', w: '100%' },
            { step: 'Clicks', val: '47', w: '60%' },
            { step: 'Conversions', val: '6', w: '25%' },
          ].map((f) => (
            <div key={f.step} className="flex items-center gap-2 mb-1">
              <div className="h-3 rounded-sm" style={{ width: f.w, minWidth: '20px', background: 'linear-gradient(90deg, rgba(124,58,237,0.4), rgba(124,58,237,0.15))' }} />
              <span className="text-[8px] text-zinc-400 whitespace-nowrap">{f.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Lighthouse */}
      <div className="absolute -left-3 bottom-16 -rotate-2 hidden lg:block">
        <div
          className="rounded-lg p-2.5 grid grid-cols-3 gap-2"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          {[
            { label: 'Perf', score: 99 },
            { label: 'SEO', score: 98 },
            { label: 'A11y', score: 100 },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="w-8 h-8 mx-auto rounded-full border-2 border-green-400/60 flex items-center justify-center">
                <span className="text-[9px] font-bold text-green-400">{s.score}</span>
              </div>
              <span className="text-[7px] text-zinc-500 mt-0.5 block">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '8.2x', l: 'Average ROAS', c: '#4ade80' },
          { v: '-22%', l: 'Cost per click', c: V },
          { v: 'CHF 0', l: 'Hidden fees', c: '#FF8C00' },
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
  )
}

export default function PubliciteSEAPage() {
  return (
    <main>
      <SchemaOrg schema={buildService({ name: 'Google Ads advertising French-speaking Switzerland', url: '/en/digital-agency/google-ads', description: 'Google Ads campaign management for SMEs in Geneva. Search, Display and remarketing with precise ROI tracking.', lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Digital Agency', url: 'https://dkdp.ch/en/digital-agency' },
        { name: 'Google Ads Advertising', url: 'https://dkdp.ch/en/digital-agency/google-ads' },
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
              <span className="text-sm" style={{ color }}>Google Ads Advertising</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Google Ads Campaigns Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Every franc invested, <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>measured</GradText>. Every lead, <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>counted</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  An SEA agency specialised for SMEs in French-speaking Switzerland. DKDP manages your Google Ads campaigns with an obsession for ROI. Budget 100% dedicated to media, transparent management with no commission, tracking of every conversion. Qualified traffic within the first 48h.
                </p>
                <HeroPills
                  items={[
                    { label: 'No commitment', Icon: CheckCircle2 },
                    { label: 'Weekly tracking', Icon: BarChart2 },
                    { label: 'Guaranteed budget optimisation', Icon: Target },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href={`${localizedPath('/contact', 'en')}?service=service-digital`} size="lg">Free Ads audit →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-text transition-colors">
                    Our method ↓
                  </Link>
                </div>
              </div>
              <HeroVisual />
            </div>
          </div>
        </section>
      </HeroBg>


      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '4.2×', l: 'Average ROAS', sub: 'Return on ad spend' },
              { v: '-32%', l: 'Cost per lead', sub: 'Gain in 90 days' },
              { v: '48h', l: 'Qualified traffic', sub: 'From launch' },
              { v: '0 CHF', l: 'Media commission', sub: 'Budget 100% to Google' },
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
          { label: 'Case studies', href: '#realisations' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: localizedPath('/contact', 'en') }}
        accentColor="#A78BFA"
        accentBg="rgba(124,58,237,0.18)"
        accentBorder="rgba(124,58,237,0.30)"
      />

      {/* ── Notre approche ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Our approach</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Our SEA approach: zero wasted spend, only results
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Most SME Google Ads accounts bleed budget on off-target keywords, untested ads and badly configured conversion tracking. DKDP always starts by fixing these leaks before increasing the budget.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Your Ads account belongs to you. You have access to everything at any time. DKDP takes no commission on your media budget: every advertising franc goes directly to Google. Discover our comparison <Link href={localizedPath('/blog/seo-vs-google-ads-geneve', 'en')} className="underline hover:text-text transition-colors">SEO vs Google Ads: what to choose in Geneva?</Link>
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Google Search campaigns (buyer keywords)',
                  'Google Display and remarketing',
                  'Performance Max / Shopping',
                  'Precise conversion tracking (calls, forms)',
                  'Continuous A/B testing on ads',
                  'Geographic targeting Geneva / French-speaking Switzerland',
                  'Detailed monthly reporting',
                  'Full access to your Ads account',
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

      {/* ── Le vrai problème ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">The real problem</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Badly managed Google advertising: your budget goes in the bin
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                A poorly configured Google Ads account loses between 40% and 60% of its budget on unqualified clicks, overly broad keywords and landing pages that do not convert. This is not visible in your default dashboard.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: Clock, title: '76% of SMEs do not have conversion tracking correctly configured', sub: 'Source: Google Partner insights 2024' },
                  { Icon: TrendingUp, title: 'Quality Score can divide or multiply your CPC by 3 depending on relevance', sub: 'Source: Google Ads documentation' },
                  { Icon: Search, title: 'The top 3 paid results capture 46% of clicks on commercial queries', sub: 'Source: WordStream, 2024' },
                ].map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-3 items-start">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-[8px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <item.Icon size={16} style={{ color }} />
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
                  Before / After DKDP optimisation
                </p>
                <AdComparison />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Real metrics on a client account managed by DKDP. Results achieved in 90 days.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Bénéfices ── */}
      <section id="résultats" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Results</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Concrete results from your Google Ads campaigns
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

      {/* ── Témoignages ── */}
      <section className="py-16 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-[11px] font-bold uppercase tracking-widest text-center mb-10" style={{ color }}>
              What our clients say
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.08}>
                <div
                  className="flex flex-col gap-4 p-6 rounded-[16px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-[11px] font-semibold" style={{ color }}>{t.author}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offres ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                SEA agency pricing: clear, with no hidden commission
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Your advertising budget goes 100% to Google. DKDP only bills for strategic management, with no surprises.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Starter Campaign',
                price: 'CHF 350/month',
                duration: 'Monthly management',
                highlight: false,
                features: [
                  '1 Search campaign',
                  'Up to CHF 2\'000 budget/month',
                  'Conversion tracking',
                  'Monthly report',
                  'Full account access',
                ],
              },
              {
                label: 'Multi-Campaign',
                price: 'CHF 700/month',
                duration: 'Most popular',
                highlight: true,
                features: [
                  'Search + Display + Remarketing',
                  'Unlimited budget',
                  'A/B ad testing',
                  'Weekly + monthly report',
                  'AI bid optimisation',
                  'Priority support',
                ],
              },
              {
                label: 'Full Ads Management',
                price: 'CHF 1\'200/month',
                duration: 'Complex accounts',
                highlight: false,
                features: [
                  'All campaign types',
                  'Performance Max + Shopping',
                  'Custom + lookalike audiences',
                  'Multi-channel strategy',
                  'Monthly meeting + deck',
                  'Guaranteed 24h SLA',
                ],
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
                        Most popular
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
                      href={`${localizedPath('/contact', 'en')}?service=service-digital`}
                      className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all hover:opacity-80"
                      style={{
                        background: offer.highlight ? color : bg,
                        color: offer.highlight ? '#000' : color,
                        border: `1px solid ${border}`,
                      }}
                    >
                      Request a quote <ChevronRight size={14} />
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
                From audit to traffic in 5 steps.
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

      {/* ── Réalisations ── */}
      <section id="realisations" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Case studies</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Results, not promises.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {REALISATIONS.map((r, i) => (
              <SectionReveal key={r.client} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{ borderColor: border }}
                >
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={r.image}
                      alt={r.client}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', color, border: `1px solid ${border}` }}
                    >
                      {r.type}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1" style={{ background: bg }}>
                    <p className="text-text font-bold mb-4">{r.client}</p>
                    <div className="space-y-2 flex-1">
                      {r.results.map((res) => (
                        <div key={res} className="flex items-center gap-2">
                          <Star size={11} style={{ color }} className="flex-shrink-0" />
                          <span className="text-text text-sm font-semibold">{res}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-text-muted text-[11px] mt-4 font-mono">{r.tech}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Engagements */}
          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Our commitments
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ENGAGEMENTS.map((g) => (
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
          </SectionReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Your questions about Google Ads" lang="en" />
      </div>

      {/* ── Bridge SEO ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/agence-digitale/seo', 'en')}
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
                  <Search size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Next step</p>
                  <p className="text-text font-bold text-lg leading-tight">SEO referencing</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Your ads bring immediate traffic. For a lasting presence on Google with no cost per click, discover our SEO strategy.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                See SEO <ChevronRight size={12} />
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
