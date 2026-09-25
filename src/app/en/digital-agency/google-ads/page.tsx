import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { PRIX, chf } from '@/data/pricing'
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
  Search,
  Target,
  Sparkles,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { TrustLine } from '@/components/ui/TrustLine'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { violet, green } from '@/lib/tokens'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))

export const metadata: Metadata = {
  // 21/09/2026 (SEO plan, D08), mirror of the FR page: fictional dashboard, ROAS 4.2x, -32 %, testimonials and 24h SLA removed.
  title: 'Google Ads & SEA agency Geneva & Romandy · DKDP',
  description:
    'SEA agency in Geneva: audit and management of your Google Ads campaigns for Swiss SMBs, controlled budget, monthly report.',
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


// 25/09/2026 : budget minimum et frais de gestion lus dans src/data/pricing
// (PRIX.adsBudgetMin, PRIX.adsManagementFrom). La gestion « from CHF 350/month »
// contredisait PRIX.adsManagementFrom et la barre de stats de la page.
const FAQ = [
  {
    question: 'What Google Ads budget should an SME in Geneva plan for?',
    answer:
      `The recommended minimum budget is ${chf(PRIX.adsBudgetMin)}/month in ad spend. For a competitive market (lawyer, real estate, dentist), CHF 1'000 to CHF 3'000/month is more realistic. DKDP takes no commission on your budget: you only pay for the strategic management.`,
  },
  {
    question: 'How much does Google Ads campaign management cost at DKDP?',
    answer:
      `Management fees start at ${chf(PRIX.adsManagementFrom)}/month for a simple campaign. A multi-campaign account (Search + Display + Remarketing) is billed between CHF 600 and CHF 1'200/month depending on complexity. First month with audit and setup included.`,
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
    value: 'Weekly',
    title: 'CPA reviewed every week',
    desc: 'Search terms, exclusions, bids and ads are reviewed every week: cost per lead is steered, not discovered at month end.',
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

/** What we actually check in an account (replaces the three fictional cases removed on 21/09/2026). */
const METHODE_AUDIT = [
  { title: 'Conversions', desc: 'Which actions count, which are dead or duplicated, and whether automated bidding optimises on a real signal.' },
  { title: 'Search terms', desc: 'The queries that actually triggered your ads over 90 days, the ones that cost without converting, the exclusions to add.' },
  { title: 'Structure', desc: 'Campaigns, ad groups and match types: a winning keyword is never moved, a catch-all group gets split.' },
  { title: 'Ads and extensions', desc: 'Headlines aligned with the query, landing pages that keep the promise, up-to-date extensions.' },
  { title: 'Bids and budget', desc: 'A strategy suited to the conversion volume available, CPC caps, split by device and area.' },
  { title: 'Measurement', desc: 'GA4, tags and conversion imports verified for real, in a clean browser, before any conclusion.' },
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
    title: 'Campaigns live within 48h',
    desc: 'Once Google approves the ads, campaigns run within 48h. The first data arrives in the first week, and so do the first decisions.',
  },
  {
    Icon: Globe2,
    title: 'Monthly contract',
    desc: 'No 12-month commitment. Monthly contract cancellable with 30 days notice. Performance justifies the relationship.',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

// 25/09/2026 : « CPC 4.80 → 2.10 CHF », « CTR 1.2% → 4.8% » et « cost per lead
// 185 → 62 CHF » présentés comme des métriques réelles retirés, aucune source.
// Le comparatif montre les leviers corrigés, sans chiffres (miroir du FR).
function AdComparison() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="p-4 rounded-[12px]" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}>
        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4 text-center">Unoptimised account</p>
        <div className="space-y-2">
          {[
            { label: 'Keywords', val: 'Too broad' },
            { label: 'Conversions', val: 'Not tracked' },
            { label: 'Ads', val: 'Not tested' },
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
            { label: 'Keywords', val: 'Targeted' },
            { label: 'Conversions', val: 'Tracked' },
            { label: 'Ads', val: 'A/B tested' },
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

// 25/09/2026 : tableau de bord fictif retiré (budget « CHF 2,400 », revenu
// « CHF 19,680 », « ROAS 8.2x », clics, CPC et coût par conversion du jour,
// entonnoir chiffré, scores Lighthouse 99/98/100, « -22% » de CPC), aucune
// source. Miroir du HeroVisual FR : faits de l'offre (PRIX) et contrôles hebdomadaires.
function HeroVisual() {
  const V = violet.color
  const VD = violet.border
  return (
    <div className="relative flex flex-col gap-4">
      {/* Client's Google Ads account */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-zinc-400 font-mono">Your Google Ads account</span>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-400/10 text-green-400">FULL ACCESS</span>
        </div>

        <div className="p-5 space-y-5">
          {/* Budget and fees */}
          <div className="flex items-start gap-5">
            <div className="flex-1">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Media budget</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">from {chf(PRIX.adsBudgetMin)}</span>
                <span className="text-[10px] text-zinc-500">/ month</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full w-full" style={{ background: 'linear-gradient(90deg, #7C3AED, #A78BFA)' }} />
              </div>
              <p className="text-[9px] text-zinc-500 mt-1">Paid to Google, no commission</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">DKDP management</p>
              <p className="text-2xl font-bold text-green-400">from {chf(PRIX.adsManagementFrom)}</p>
              <p className="text-[9px] text-green-400 font-bold">per month</p>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Weekly checks */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Search terms', value: 'Reviewed', note: 'every week' },
              { label: 'Bids', value: 'Adjusted', note: 'every week' },
              { label: 'Ads', value: 'Tested', note: 'A/B' },
              { label: 'Conversions', value: 'Tracked', note: 'from day one' },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-[8px] text-zinc-600 uppercase">{m.label}</p>
                <p className="text-sm font-bold text-white">{m.value}</p>
                <p className="text-[9px] font-bold text-green-400">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating conversion funnel (tracked stages, no figures) */}
      <div className="absolute -right-2 top-8 rotate-1 hidden lg:block">
        <div
          className="rounded-lg p-3"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-2">Tracked funnel</p>
          {[
            { step: 'Visibility', w: '100%' },
            { step: 'Qualified clicks', w: '60%' },
            { step: 'Leads', w: '25%' },
          ].map((f) => (
            <div key={f.step} className="flex items-center gap-2 mb-1">
              <div className="h-3 rounded-sm" style={{ width: f.w, minWidth: '20px', background: 'linear-gradient(90deg, rgba(124,58,237,0.4), rgba(124,58,237,0.15))' }} />
              <span className="text-[8px] text-zinc-400 whitespace-nowrap">{f.step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini stats: offer commitments */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '48h', l: 'Campaigns live', c: '#4ade80' },
          { v: 'CHF 0', l: 'Hidden fees', c: V },
          { v: 'Weekly', l: 'Optimisation', c: '#FF8C00' },
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
      <SchemaOrg schema={buildServiceWithLocalBusiness({ name: 'SEA and Google Ads agency Geneva and French-speaking Switzerland', url: '/en/digital-agency/google-ads', description: 'Audit and management of Google Ads campaigns for SMBs in Geneva and French-speaking Switzerland: Search, Performance Max, remarketing, controlled budget, monthly report.', serviceType: 'Google Ads campaign management (SEA)', priceFrom: PRIX.adsManagementFrom, priceSpecDescription: `Management from ${chf(PRIX.adsManagementFrom)}/month, media budget on top`, lang: 'en' })} />
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
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">SEA & Google Ads agency Geneva & French-speaking Switzerland</h1>
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
              { v: `from ${chf(PRIX.adsManagementFrom)}`, l: 'Management per month', sub: 'Media budget on top' },
              { v: 'Monthly', l: 'Report', sub: 'Cost per lead, terms, decisions' },
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
          { label: 'Method', href: '#realisations' },
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
              {/* 25/09/2026 : « between 40% and 60% of its budget » retiré, statistique sans source. */}
              <p className="text-text-secondary leading-relaxed mb-6">
                A poorly configured Google Ads account loses a significant share of its budget on unqualified clicks, overly broad keywords and landing pages that do not convert. This is not visible in your default dashboard.
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
                {/* 25/09/2026 : « Real metrics on a client account, results achieved in 90 days » retiré, aucune source. */}
                <p className="text-text-muted text-[11px] text-center mt-4">
                  The three levers DKDP fixes first on an existing account.
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
                // 25/09/2026 : « CHF 350/month » contredisait PRIX.adsManagementFrom.
                price: `${chf(PRIX.adsManagementFrom)}/month`,
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
                  'Reply within 1 business day',
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

      {/* ── Audit method ── */}
      <section id="realisations" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Method</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                What we audit before touching a single bid.
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                A Google Ads account is read in its data, not its interface. Six checks, in this order, before the first change.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {METHODE_AUDIT.map((m, i) => (
              <SectionReveal key={m.title} delay={i * 0.08}>
                <div className="flex flex-col h-full rounded-[16px] border p-6" style={{ background: bg, borderColor: border }}>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color }}>0{i + 1}</p>
                  <p className="text-text font-bold mb-2">{m.title}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{m.desc}</p>
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

      {/* ── Bridge ChatGPT Ads (channel open to Swiss businesses since 31.08.2026) ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/agence-digitale/chatgpt-ads', 'en')}
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
                  <Sparkles size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>New channel</p>
                  <p className="text-text font-bold text-lg leading-tight">ChatGPT Ads advertising</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    ChatGPT has shown ads in Switzerland since 24 August 2026. Sponsored cards below the answers, 30-day pilot, same zero-commission rule.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                See ChatGPT Ads <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

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
