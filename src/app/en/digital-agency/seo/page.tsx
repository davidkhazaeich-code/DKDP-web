import type { Metadata } from 'next'
import Link from 'next/link'
import { PRIX, chf } from '@/data/pricing'
import { liveForDomain } from '@/lib/realisations'
import { hasEnglish, localizeRealisation } from '@/lib/realisations/en'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { CheckCircle2, ChevronRight, ShieldCheck, BarChart2, Clock, Globe2, TrendingUp, Search, Star, Zap } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { violet } from '@/lib/tokens'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))

export const metadata: Metadata = {
  // 21/09/2026 (SEO plan, D02.1): the previous title measured 692 px, Google cut it.
  title: 'SEO Agency Geneva & Switzerland | DKDP',
  description:
    'SEO agency in Geneva and French-speaking Switzerland: audit, local SEO, content and link building for Swiss SMBs. No commitment.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/seo',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/seo',
      en: 'https://dkdp.ch/en/digital-agency/seo',
      'x-default': 'https://dkdp.ch/agence-digitale/seo',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    url: 'https://dkdp.ch/en/digital-agency/seo',
    images: [{ url: '/images/og/seo-geneve.png', width: 1376, height: 768, alt: 'SEO agency Geneva: organic search, local SEO and GEO by DKDP' }],
  },
}

const color = violet.color
const bg = violet.bg
const border = violet.border

const FAQ = [
  {
    question: 'How much does SEO cost in Geneva?',
    answer:
      `An SEO engagement with DKDP costs ${chf(PRIX.seoMonthly)}/month for a local showcase site, no commitment, or ${chf(PRIX.seoAuditOnce)} as a one-off (audit and setup). An ambitious SEO project (e-commerce, French-speaking Swiss market) sits between CHF 1'000 and CHF 2'500/month. We always start with a free audit to calibrate the effort required.`,
  },
  {
    question: 'How long does it take to see SEO results in Geneva?',
    answer:
      'The first ranking improvements are visible between 6 and 12 weeks for local Geneva queries. Significant organic traffic and steady leads build over 3 to 6 months. DKDP shares a transparent monthly report with the key indicators.',
  },
  {
    question: 'What is the difference between on-page and off-page SEO?',
    answer:
      "On-page SEO covers everything on your site: page structure, tags, content, loading speed, internal linking. Off-page SEO concerns the authority of your domain: backlinks, brand mentions, local presence. DKDP works on both dimensions.",
  },
  {
    question: 'Do you need to create content regularly for SEO?',
    answer:
      'Yes, content is a central pillar of SEO. DKDP defines a content strategy based on the search intent of your target customers. We can write the content for you or provide a detailed brief if you prefer to do it in-house.',
  },
  {
    question: 'What does a DKDP SEO audit include?',
    answer:
      "The SEO audit covers: technical crawl of the site (errors, redirects, loading time), tag and structure analysis, audit of existing content, backlink profile analysis, and competitor analysis on your target keywords. The report is delivered with clear priorities.",
  },
  {
    question: 'Is local SEO different from classic SEO?',
    answer:
      'Local SEO targets geo-located searches like "digital service Geneva" or "plumber 1207". It includes optimising your Google Business Profile, consistent NAP citations across directories, and content centred on your geographic area. Ideal for Geneva SMBs.',
  },
  {
    question: 'Google Ads and SEO, do you have to choose?',
    answer:
      'No. Google Ads brings immediate traffic while SEO builds your authority over the long term. The two are complementary: Ads gives you visibility from tomorrow, SEO gradually reduces your dependence on paid campaigns. DKDP manages both if needed.',
  },
  {
    question: 'What is GEO (Generative Engine Optimization)?',
    answer:
      'GEO (Generative Engine Optimization) is the optimisation of your content to appear in answers generated by AI: ChatGPT, Perplexity, Google AI Overviews and Bing Copilot. These engines cite reliable sources to answer your prospects’ questions. If your site is not structured to be citable, you are absent where a growing share of decisions is made. GEO relies on E-E-A-T markup, Schema.org structured data, question-answer content and domain authority. DKDP integrates GEO into every SEO engagement.',
  },
]

const BENEFITS = [
  {
    Icon: TrendingUp,
    value: 'Durable',
    title: 'Traffic that compounds',
    desc: 'Unlike Ads, SEO traffic does not stop when you cut the budget. It grows and compounds over time.',
  },
  {
    Icon: Search,
    value: 'CHF 0/click',
    title: 'Free visitors',
    desc: 'Once you rank, each visitor costs you nothing. SEO is the most profitable long-term investment.',
  },
  {
    Icon: Globe2,
    value: '6 to 12 wks',
    title: 'First local positions',
    desc: 'On local Geneva queries, the first movements show within 6 to 12 weeks; meaningful traffic builds over 3 to 6 months.',
  },
]

/** Translated case studies covering SEO, with a site screenshot, in /en/portfolio order. */
const CAS_SEO = liveForDomain('seo-geo', { limit: 2, withImage: true, slugs: hasEnglish }).map((r) => localizeRealisation(r, 'en')).map((r) => ({
  client: r.client.name,
  type: r.domains.includes('site-web') ? 'Website and local SEO' : 'SEO and GEO',
  image: r.hero?.desktopFull ?? '',
  results: (r.results ?? []).slice(0, 3).map((x) => `${x.metric}: ${x.value}`),
  tech: r.tags.slice(0, 4).join(' · '),
  href: `/en/portfolio/${r.slug}`,
}))

const PROCESS = [
  {
    step: '01',
    title: 'Technical audit',
    desc: 'Complete analysis: speed, indexing, errors, tags, internal linking. Priority report delivered within 48 hours.',
  },
  {
    step: '02',
    title: 'Keywords',
    desc: 'Identification of high-potential queries with buying intent. Mapping of target pages by keyword.',
  },
  {
    step: '03',
    title: 'On-page',
    desc: 'Rewriting of titles, metas, H1-H3. Semantic structure, topic clusters, optimised internal linking.',
  },
  {
    step: '04',
    title: 'Content & links',
    desc: 'Production of optimised articles and acquisition of backlinks on Swiss and French-language authority sites.',
  },
  {
    step: '05',
    title: 'Tracking & reporting',
    desc: 'Weekly monitoring of positions, monthly report with traffic, conversions and recommendations.',
  },
]

export default function SEOPage() {
  return (
    <main>
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'SEO and GEO agency in French-speaking Switzerland',
          url: '/en/digital-agency/seo',
          description:
            'Organic search (SEO) and Generative Engine Optimization (GEO) agency in Geneva. Technical SEO audit, local SEO (Google Business Profile, local citations, reviews), content strategy, E-E-A-T, Schema.org, link building. Optimisation for Google, ChatGPT, Perplexity, Claude AI, Copilot and AI Overviews. Swiss SMBs.',
          serviceType: 'Organic search and GEO',
          priceFrom: PRIX.seoMonthly,
          priceSpecDescription: `${chf(PRIX.seoMonthly)}/month for an SMB SEO engagement, no commitment`,
          lang: 'en',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Digital Agency', url: 'https://dkdp.ch/en/digital-agency' },
        { name: 'SEO', url: 'https://dkdp.ch/en/digital-agency/seo' },
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
              <span className="text-sm" style={{ color }}>SEO</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                {/* 21/09/2026 (SEO plan, D02.1): the H1 is the big title, the badge is a span. */}
                <span className="grad-tag inline-block text-xs md:text-sm mb-6">SEO Geneva & French-speaking Switzerland</span>
                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.03em] leading-[1.1] text-text mb-5">
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>SEO agency in Geneva</GradText>{' '}and French-speaking Switzerland: organic search, local SEO and GEO
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-text mb-4">
                  The first page of Google. Not the third.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP, an SEO agency in Geneva, builds your organic authority with a complete search strategy: technical audit, optimised content and link building. Our SEO agency guides Swiss SMBs toward durable organic search, with no cost per click.
                </p>
                <HeroPills
                  items={[
                    { label: 'Free audit', Icon: Zap },
                    { label: 'First results within 90 days', Icon: TrendingUp },
                    { label: 'No commitment', Icon: CheckCircle2 },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href={localizedPath('/contact', 'en') + '?service=service-digital'} size="lg">Free SEO audit →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-text transition-colors">
                    Our method ↓
                  </Link>
                </div>
              </div>
              {/* HeroVisual (inlined, translated) */}
              <div className="relative flex flex-col gap-4">
                <div
                  className="rounded-[14px] overflow-hidden"
                  style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${border}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-violet-400">
                        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M7 14l4-4 4 4 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {/* 25/09/2026 : mock-up labelled "Example" in its header, the rankings and scores are illustrative. */}
                      <span className="text-[10px] text-zinc-400 font-mono">SEO and GEO report · Example</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[9px] text-green-400 font-bold">Active</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Keyword rankings */}
                    <div>
                      <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2">Keywords on the rise</p>
                      <div className="space-y-2">
                        {[
                          { kw: 'your service + Geneva', before: 34, after: 3, change: '+31' },
                          { kw: 'your sector + French-speaking Switzerland', before: 52, after: 7, change: '+45' },
                          { kw: 'your expertise + Geneva', before: 28, after: 1, change: '+27' },
                        ].map((k) => (
                          <div key={k.kw} className="flex items-center gap-3 text-[10px]">
                            <span className="text-zinc-400 flex-1 truncate">{k.kw}</span>
                            <span className="text-zinc-600 line-through text-[9px]">#{k.before}</span>
                            <span className="text-green-400 font-bold">#{k.after}</span>
                            <div className="flex items-center gap-0.5 text-green-400 text-[8px] font-bold w-8">
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {k.change}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Traffic growth mini chart */}
                    <div className="flex items-end gap-4">
                      <div className="flex-1">
                        <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2">Organic traffic (12 months)</p>
                        <div className="flex items-end gap-[3px] h-12">
                          {[12, 14, 13, 18, 22, 20, 28, 35, 42, 52, 64, 82].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t-sm"
                              style={{
                                height: `${h}%`,
                                background: i >= 8
                                  ? 'linear-gradient(180deg, #4ade80, rgba(74,222,128,0.3))'
                                  : 'rgba(255,255,255,0.06)',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-right pb-1">
                        <p className="text-xl font-bold text-green-400">Page 1</p>
                        <p className="text-[8px] text-zinc-500">illustrative mock-up</p>
                      </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* GEO visibility */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[9px] text-zinc-500 uppercase tracking-widest">GEO visibility (AI)</p>
                        <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">New</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { engine: 'Google AI', score: 87, c: '#4ade80' },
                          { engine: 'ChatGPT', score: 72, c: color },
                          { engine: 'Perplexity', score: 68, c: '#FF8C00' },
                        ].map((e) => (
                          <div key={e.engine} className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p className="text-[8px] text-zinc-500 mb-1">{e.engine}</p>
                            <div className="flex items-baseline gap-1">
                              <span className="text-sm font-bold" style={{ color: e.c }}>{e.score}%</span>
                              <span className="text-[7px] text-zinc-600">cited</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating traffic source */}
                <div className="hidden lg:block absolute -right-3 top-6 rotate-1">
                  <div
                    className="rounded-lg p-3"
                    style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
                  >
                    <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1.5">Traffic sources</p>
                    {[
                      { src: 'Google', pct: 68, c: '#4ade80' },
                      { src: 'AI (GEO)', pct: 18, c: color },
                      { src: 'Direct', pct: 14, c: '#FF8C00' },
                    ].map((s) => (
                      <div key={s.src} className="flex items-center gap-2 mb-1">
                        <div className="h-1.5 rounded-full" style={{ width: `${s.pct}px`, background: s.c }} />
                        <span className="text-[8px] text-zinc-400">{s.src} {s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Lighthouse scores */}
                <div className="hidden lg:block absolute -left-3 bottom-16 -rotate-2">
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
                    { v: 'Monthly', l: 'Ranking report', c: '#4ade80' },
                    { v: 'Page 1', l: 'Local goal', c: color },
                    { v: 'GEO Ready', l: 'AI + Google', c: '#FF8C00' },
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
      </HeroBg>


      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '2', l: 'Published case studies', sub: 'Golden Cash, SOS Relevage' },
              { v: '5.0/5', l: 'Google rating', sub: '22 reviews on the DKDP listing' },
              { v: 'CHF 0', l: 'Per click', sub: 'Unlike Ads' },
              // 25/09/2026 : unsourced "6 months, average duration observed" removed.
              { v: chf(PRIX.seoMonthly), l: 'Per month', sub: 'No-commitment engagement' },
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
          { label: 'Results', href: '#resultats' },
          { label: 'Local SEO', href: '#seo-local-geneve' },
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

      {/* ── Our approach ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Our approach</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Organic search: qualified traffic, not just visitors.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                SEO is not limited to a few well-filled tags. DKDP combines a rigorous technical audit, content optimised for your customers&apos; search intent, and the gradual acquisition of authority. The result: qualified traffic that grows month after month.
              </p>
              <p className="text-text-secondary leading-relaxed">
                We work primarily in the Geneva and French-speaking Swiss market, which gives us a precise understanding of local queries, search behaviour and online competition in your sector. Read our guide on <Link href={localizedPath('/blog/seo-local-geneve-2026', 'en')} className="underline hover:text-text transition-colors">local SEO in Geneva in 2026</Link>.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Complete technical SEO audit (errors, indexing, speed)',
                  'Keyword research with buying intent',
                  'On-page optimisation (titles, metas, H1-H3, structure)',
                  'SEO content creation (articles, service pages)',
                  'Link building (quality backlinks on authority sites)',
                  'Local SEO Google Business Profile',
                  'Core Web Vitals and technical performance',
                  'GEO: visibility in ChatGPT, Perplexity and AI Overviews',
                  'Monthly tracking of positions and traffic',
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

      {/* ── GEO - AI visibility ── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                GEO · New in 2026
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Your site must also appear in AI.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                ChatGPT, Perplexity, Google AI Overviews and Copilot answer your prospects&apos; questions directly, without a Google click. If your content is not citable by these AI engines, you are absent where a growing share of buying decisions is made.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                <span className="text-text font-semibold">GEO (Generative Engine Optimization)</span>, also called AEO (Answer Engine Optimization), optimises your content to be cited as a reference source. DKDP integrates this dimension into every SEO engagement.
              </p>
              <div className="space-y-3">
                {[
                  'E-E-A-T optimisation to be recognised as a reliable source',
                  'Schema.org markup: FAQ, Organization, Article',
                  'Question-answer content extractable by AI',
                  'Targeted text passages for Google AI Overviews & Snippets',
                  'Tracking of your brand mentions in AI answers',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-5 md:p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(124,58,237,0.08)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
                  Targeted AI engines
                </p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { name: 'ChatGPT', maker: 'OpenAI', c: '#10b981', cbg: 'rgba(16,185,129,0.08)', cbd: 'rgba(16,185,129,0.22)', note: 'Most used AI assistant' },
                    { name: 'Perplexity', maker: 'AI Search', c: '#22d3ee', cbg: 'rgba(34,211,238,0.08)', cbd: 'rgba(34,211,238,0.22)', note: 'Answers with cited sources' },
                    { name: 'AI Overviews', maker: 'Google', c: '#A78BFA', cbg: 'rgba(124,58,237,0.08)', cbd: 'rgba(124,58,237,0.22)', note: 'Google result no. 1' },
                    { name: 'Copilot', maker: 'Microsoft', c: '#60a5fa', cbg: 'rgba(96,165,250,0.08)', cbd: 'rgba(96,165,250,0.22)', note: 'Built into Bing and Edge' },
                  ].map((p) => (
                    <div key={p.name} className="p-3.5 rounded-[10px] border" style={{ background: p.cbg, borderColor: p.cbd }}>
                      <p className="text-text font-bold text-sm">{p.name}</p>
                      <p className="text-[10px] font-semibold mb-1" style={{ color: p.c }}>{p.maker}</p>
                      <p className="text-text-muted text-[10px]">{p.note}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4" style={{ borderColor: border }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-center" style={{ color }}>
                    Optimised GEO signals
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['E-E-A-T', 'Schema.org', 'FAQ markup', 'Text passages', 'Domain authority', 'Source citations'].map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(124,58,237,0.12)', color, border: `1px solid ${border}` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Insight / Problem ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">The real problem</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Being on Google page 2 means being invisible.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                The position you hold on Google directly determines how many visitors you receive. The top results capture most of the clicks and page 2 gets almost none: clicks do not spread out, they concentrate.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: TrendingUp, title: '28% of clicks go to the first Google result. The second gets 15%.', sub: 'Source: Advanced Web Ranking 2024' },
                  { Icon: Search, title: '75% of users never look at the second page of results.', sub: 'Source: HubSpot Research' },
                  // 25/09/2026 : unsourced "DKDP finding across 50+ projects" removed; timings from the FAQ above.
                  { Icon: Clock, title: 'SEO takes 6 months to build. Every month without a strategy is a month lost.', sub: 'First rankings in 6 to 12 weeks, steady traffic in 3 to 6 months' },
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
                {/* SEOFunnel (inlined, translated) */}
                <div className="space-y-3 w-full">
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: violet.color }}>
                    Click share by Google position
                  </p>
                  {[
                    { pos: 'Position 1', pct: 28, c: '#A78BFA' },
                    { pos: 'Position 2-3', pct: 15, c: '#8B5CF6' },
                    { pos: 'Position 4-10', pct: 4, c: 'rgba(139,92,246,0.60)' },
                    { pos: 'Page 2+', pct: 1, c: 'rgba(139,92,246,0.30)' },
                  ].map((p) => (
                    <div key={p.pos} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-text text-sm font-semibold">{p.pos}</span>
                        <span className="font-bold text-sm" style={{ color: violet.color }}>{p.pct}% of clicks</span>
                      </div>
                      <div className="h-2.5 rounded-full" style={{ background: violet.bg }}>
                        <div className="h-full rounded-full" style={{ width: `${(p.pct / 28) * 100}%`, background: p.c }} />
                      </div>
                    </div>
                  ))}
                  <p className="text-text-muted text-[10px] text-center mt-2">Source: Advanced Web Ranking 2024</p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section id="resultats" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Results</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                The concrete results of our SEO for SMBs in Geneva.
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

      {/* ── Local SEO Geneva ── */}
      <section id="seo-local-geneve" className="py-24 border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Local SEO Geneva</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Local SEO in Geneva: Google Business Profile, local citations and local pack.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                In Geneva as elsewhere, a large share of commercial searches are about a local need, and on mobile a &laquo; near me &raquo; search often ends in a call or a trip. If you do not appear in the <strong className="text-text">local pack</strong> (the 3 Google Maps listings above the blue results), a good share of your Geneva prospects therefore never see you.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                DKDP deploys a complete local SEO strategy: optimisation of your <strong className="text-text">Google Business Profile</strong> (formerly Google My Business), building a network of consistent local citations (NAP: Name, Address, Phone), structured collection of customer reviews, <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">LocalBusiness</code> schema on all your pages and mobile Core Web Vitals optimisation (LCP, CLS, INP) for mobile-first ranking. For a complete guide, read <Link href={localizedPath('/blog/seo-local-geneve-2026', 'en')} className="underline hover:text-text transition-colors">Local SEO Geneva 2026: dominate Google Maps</Link>.
              </p>
              <div className="space-y-3">
                {[
                  { k: 'Google Business Profile', v: 'Optimised listing, 360° photos, weekly posts, review responses, attributes (accessibility, parking, Twint payment methods).' },
                  { k: 'Local citations', v: 'Registration and NAP consistency on local.ch, search.ch, Yellow.local.ch, Yellow Pages, Hotfrog, Yelp, Apple Maps.' },
                  { k: 'Customer reviews', v: 'Automated collection process after service (email, SMS, QR code). Personalised response to each review, positive or negative.' },
                  { k: 'Local pack & Maps', v: 'Positioning in the 3 listings of the local pack for your geo-located keywords (e.g. "fiduciary Eaux-Vives", "dentist Carouge").' },
                  { k: 'Mobile-first ranking', v: 'Core Web Vitals in the green: LCP < 2.5 s, INP < 200 ms, CLS < 0.1. Systematic testing on iPhone and Android.' },
                  { k: 'LocalBusiness schema', v: 'JSON-LD enriched with geo-coordinates, openingHoursSpecification and areaServed.' },
                ].map((row) => (
                  <div key={row.k} className="flex gap-3">
                    <CheckCircle2 size={14} className="mt-1 flex-shrink-0" style={{ color }} />
                    <p className="text-sm text-text-secondary">
                      <strong className="text-text">{row.k}:</strong> {row.v}
                    </p>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <div
                className="rounded-[20px] p-6 md:p-8 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(124,58,237,0.08)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: violet.color }}>
                  Neighbourhoods and municipalities covered
                </p>
                <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
                  {[
                    'Eaux-Vives', 'Plainpalais', 'Champel', 'Servette',
                    'Pâquis', 'Cité-Centre', 'Carouge', 'Lancy',
                    'Onex', 'Vernier', 'Meyrin', 'Chêne-Bougeries',
                    'Thônex', 'Geneva right bank', 'Geneva left bank', 'Grand-Saconnex',
                  ].map((quartier) => (
                    <div
                      key={quartier}
                      className="px-2.5 py-1.5 rounded-md border text-text-secondary"
                      style={{ background: 'rgba(124,58,237,0.05)', borderColor: 'rgba(124,58,237,0.20)' }}
                    >
                      {quartier}
                    </div>
                  ))}
                </div>

                {/* 25/09/2026 : unsourced "Average local SEO KPIs (6 months DKDP)" (x4.8, x5.9, x6.3,
                    x12) and "average observed across the 14 SMBs" removed. The block now lists the
                    indicators we track, with no promised result. */}
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: violet.color }}>
                  What we track every month
                </p>
                <div className="space-y-3">
                  {[
                    'Appearances in the local pack',
                    'Clicks for directions',
                    'Calls from the Google listing',
                    'New Google reviews',
                  ].map((label) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <CheckCircle2 size={14} className="flex-shrink-0" style={{ color: violet.color }} />
                      <p className="text-text-secondary text-xs leading-tight">{label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-text-muted text-[11px] mt-6 leading-relaxed">
                  These indicators come from your Google listing. We record them before we start, then in the monthly report, and how they evolve depends on the sector, local competition and starting situation.
                </p>
              </div>
            </SectionReveal>
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
                SEO pricing Geneva: clear and with no hidden commitment.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Each service is detailed and validated before starting. No nasty surprises during the engagement.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'SEO Audit',
                price: chf(PRIX.seoAuditOnce),
                duration: 'One-time service',
                highlight: false,
                features: [
                  'Complete technical audit',
                  'Keyword analysis',
                  'Priority report',
                  '6-month roadmap',
                  'Presentation of the results',
                  'Search Console access included',
                ],
                cta: 'Request an audit',
              },
              {
                label: 'SEO Monthly',
                price: `${chf(PRIX.seoMonthly)}/month`,
                duration: 'Most requested',
                highlight: true,
                features: [
                  'Initial audit included',
                  '2 SEO articles/month',
                  'Ongoing on-page optimisation',
                  'Monthly link building (4 links)',
                  'Weekly position tracking',
                  'Monthly report + recommendations',
                ],
                cta: 'Start SEO',
              },
              {
                label: 'SEO Authority',
                price: `${chf(PRIX.seoAuthorityMonthly)}/month`,
                duration: 'Competitive markets',
                highlight: false,
                features: [
                  'Everything in SEO Monthly',
                  '4 SEO articles/month',
                  'Intensive link building (8 links/month)',
                  'Multi-location local SEO',
                  'Topic cluster strategy',
                  'Monthly follow-up meeting',
                ],
                cta: 'Dominate your market',
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
                How we build your visibility.
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

      {/* 25/09/2026 : three anonymous testimonials removed ("top 3 on 8 queries", "traffic tripled in
          10 months", "60% of new patients"), invented. The named reviews of the shared Testimonials
          component stay further down. */}

      {/* ── Case studies + Guarantees ── */}
      <section id="realisations" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Case studies</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Results, not promises.
              </h2>
            </div>
          </SectionReveal>
          {/* Two published case studies from src/lib/realisations (21/09/2026, SEO plan): the three fictional cases were removed. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {CAS_SEO.map((r, i) => (
              <SectionReveal key={r.client} delay={i * 0.1}>
                <Link
                  href={r.href}
                  className="flex flex-col h-full rounded-[16px] border overflow-hidden transition-colors hover:border-violet-light"
                  style={{ borderColor: border }}
                >
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={r.image}
                      alt={r.client}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
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
                    <span className="text-sm font-semibold mt-4 inline-flex items-center gap-1" style={{ color }}>
                      See the case study <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>

          {/* Guarantees */}
          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Our commitments
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { Icon: ShieldCheck, title: 'Measurable results', desc: 'Monthly report of positions, traffic and conversions. Progress is quantified, not narrated.' },
                  { Icon: TrendingUp, title: 'White-hat SEO', desc: 'No black-hat techniques. Every action respects Google guidelines and builds durable authority.' },
                  { Icon: Clock, title: 'First signals in 30 days', desc: 'Technical fixes and first optimisations are visible in Search Console within the first 4 weeks.' },
                  { Icon: Globe2, title: 'Your data stays yours', desc: 'You keep control of Search Console, Analytics and GBP. DKDP works on your platforms, never in a silo.' },
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
          </SectionReveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials lang="en" />

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Organic search FAQ Geneva" lang="en" />
      </div>

      {/* ── Bridge ── */}
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
                  <BarChart2 size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Next step</p>
                  <p className="text-text font-bold text-lg leading-tight">Google Ads advertising</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    SEO takes time. To generate leads immediately while your search ranking ramps up, discover Google Ads advertising.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                See Google Ads <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="text-center pb-2">
        <Link href={localizedPath('/a-propos', 'en')} className="text-text-muted hover:text-text text-sm transition-colors mt-3 block">
          Learn more about the agency and David Khazaei
        </Link>
      </div>
      <CTAFinal lang="en" />
    </main>
  )
}
