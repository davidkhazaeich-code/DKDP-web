import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  CheckCircle2,
  ChevronRight,
  Smartphone,
  Gauge,
  Lock,
  Search,
  Wrench,
  Layers,
  Activity,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Clock,
  Map,
  Code2,
  Zap,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { violet } from '@/lib/tokens'
import { AppLogoMarquee, DESIGN_WEB_LOGOS, IA_LOGOS } from '@/components/ui/AppLogos'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const SiteAuditBlock = dynamic(() => import('@/components/sections/SiteAuditBlock').then(m => ({ default: m.SiteAuditBlock })))

export const metadata: Metadata = {
  title: 'Website redesign Geneva & French-speaking Switzerland | No SEO loss | DKDP',
  description:
    'Redesign of outdated websites in Geneva: modern design, rethought UX, WordPress or Next.js migration with no SEO loss. +240% traffic in 6 months on average. Free audit, 48-hour quote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/website-redesign',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/refonte-site-web',
      en: 'https://dkdp.ch/en/digital-agency/website-redesign',
      'x-default': 'https://dkdp.ch/agence-digitale/refonte-site-web',
    },
  },
  openGraph: {
    url: 'https://dkdp.ch/en/digital-agency/website-redesign',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [
      {
        url: '/images/og/refonte-site-web.png',
        width: 1376,
        height: 768,
        alt: 'Website redesign in Geneva: modern migration with no SEO loss by DKDP',
      },
    ],
  },
  keywords: [
    'website redesign Geneva',
    'website rebuild Geneva',
    'website migration Switzerland',
    'WordPress redesign Geneva',
    'Next.js redesign French-speaking Switzerland',
    'Shopify e-commerce redesign',
    'website migration no SEO loss',
    'DKDP',
  ],
}

/* ── Design tokens ─────────────────────────────────────────────────────────── */
const V = violet.color
const VB = 'rgba(167,139,250,0.08)'
const VD = 'rgba(167,139,250,0.22)'

/* ── Data ──────────────────────────────────────────────────────────────────── */
const SYMPTOMS = [
  { Icon: Clock, title: 'Outdated design', desc: 'Your site is more than 4 years old without a redesign. It signals a dated brand, especially against your newer competitors.' },
  { Icon: Smartphone, title: 'Not mobile-friendly', desc: 'Core Web Vitals red on mobile. 65 to 78% of French-speaking Swiss traffic comes from mobile. You lose half your prospects.' },
  { Icon: Activity, title: 'Zero conversion', desc: 'Traffic but no leads. CTAs nowhere to be found, a 12-field form, a broken journey.' },
  { Icon: Layers, title: 'Not responsive on tablet', desc: 'The site breaks on iPad portrait (768px). Directors and B2B clients read from their tablet.' },
  { Icon: Lock, title: 'No access to the back-office', desc: 'The previous developer has disappeared or refuses you access. Impossible to edit, update or fix a typo.' },
  { Icon: Wrench, title: 'Impossible to edit on your own', desc: 'Every text change requires a quote. You avoid updating the site and it fossilises.' },
  { Icon: Gauge, title: 'Slowdowns and crashes', desc: 'PageSpeed under 50 on mobile. The site lags, goes down during peaks, penalising SEO and UX.' },
  { Icon: ShieldCheck, title: 'Not FADP and GDPR compliant', desc: 'Missing cookie banner, no processing register, a ghost privacy policy. Legal risk.' },
]

const APPROACH = [
  {
    Icon: Search,
    title: 'Full SEO audit before the redesign',
    desc: 'We analyse the pages that rank, your backlinks, your active keywords. We pinpoint exactly what must be preserved before touching anything.',
  },
  {
    Icon: Map,
    title: 'Systematic 301 redirect plan',
    desc: 'Every old URL is mapped and redirected to its new equivalent. No SEO juice lost, no 404 in Search Console.',
  },
  {
    Icon: Layers,
    title: 'Progressive migration, no downtime',
    desc: 'New version built on a staging environment. Night switch over the weekend. Rollback plan ready. Your visitors never see an error page.',
  },
  {
    Icon: TrendingUp,
    title: 'Preservation of existing SEO juice',
    desc: 'We keep the H1/H2 structures, the main URLs, the text that performs. We improve what was not working, we do not break what was working.',
  },
  {
    Icon: Gauge,
    title: 'Core Web Vitals green by guarantee',
    desc: 'LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile and desktop. Tested on iPhone 15, Samsung S24, iPad. Lighthouse score 90 or higher on every page delivered.',
  },
]

const PROCESS_STEPS = [
  { n: '01', title: 'SEO audit of the existing site', desc: 'Pages that rank, active keywords, backlinks to preserve. Detailed report in 48 hours.' },
  { n: '02', title: 'French-speaking Switzerland competitor benchmark', desc: 'Analysis of the 5 local competitors beating you on Google and in AI Overviews.' },
  { n: '03', title: 'Wireframes and Figma prototype', desc: 'Mockup of the key pages. Validation over video call before any development.' },
  { n: '04', title: 'Client design validation', desc: '2 revision cycles included. No code until the design is approved in writing.' },
  { n: '05', title: 'Development on staging', desc: 'Pre-production environment protected by password. You test in real time.' },
  { n: '06', title: 'Content migration + 301', desc: 'Transfer of the existing content, 301 redirect plan for every old URL.' },
  { n: '07', title: 'Core Web Vitals + WCAG tests', desc: 'Lighthouse validation, axe DevTools, manual mobile and keyboard tests. Score 90 or higher.' },
  { n: '08', title: 'Go-live + 30-day monitoring', desc: 'DNS switch, IndexNow ping, Search Console submission. Post-launch SEO monitoring for 30 days.' },
]

const TECH_STACK = [
  { name: 'Next.js', cat: 'Modern applications', desc: 'React 19, Server Components, native performance, ideal for ambitious SMBs.' },
  { name: 'WordPress', cat: 'Preserved CMS redesigns', desc: 'Custom-built theme, ACF Pro, audited plugins. For teams already trained.' },
  { name: 'Shopify', cat: 'E-commerce', desc: 'High-performance stores, custom Hydrogen, Twint and PostFinance integration.' },
  { name: 'Sanity', cat: 'Headless CMS', desc: 'Custom back-office, real-time editing, GraphQL/GROQ API.' },
  { name: 'Contentful', cat: 'Headless CMS', desc: 'For international marketing teams, validation workflows.' },
  { name: 'Astro', cat: 'High-performance static sites', desc: 'Ultra-fast SSG build, LCP < 1s. Ideal for SEO-critical showcase sites.' },
  { name: 'Vercel', cat: 'Hosting', desc: 'Global CDN, preview deployments, native Next.js integration. 99.99% uptime.' },
  { name: 'Cloudflare', cat: 'CDN and security', desc: 'DDoS protection, WAF, edge cache. For high-traffic or sensitive sites.' },
]

const CASE_STUDIES = [
  {
    sector: 'Geneva fiduciary',
    pain: 'WordPress site from 2019, PageSpeed 32 on mobile, no blog.',
    result: 'Next.js redesign, SEO blog, Core Web Vitals green.',
    kpis: [
      { label: 'Organic traffic', v: '+240%', sub: '12 months' },
      { label: 'Bounce rate', v: '-60%', sub: 'mobile' },
      { label: 'Qualified leads', v: 'x3.2', sub: 'per month' },
    ],
  },
  {
    sector: 'French-speaking Swiss e-commerce',
    pain: 'Slow Prestashop store, 5-step checkout funnel.',
    result: 'Shopify Hydrogen migration, 2-step checkout, Twint.',
    kpis: [
      { label: 'Conversion rate', v: '+180%', sub: '6 months' },
      { label: 'Mobile LCP', v: '1.8s', sub: 'green' },
      { label: 'Average cart', v: '+22%', sub: 'Twint included' },
    ],
  },
  {
    sector: 'Industrial SMB',
    pain: 'Static showcase site, monolingual, no back-office.',
    result: 'Astro + Sanity redesign, multilingual FR/DE/EN/IT.',
    kpis: [
      { label: 'Markets opened', v: '5 countries', sub: 'FR, DE, EN, IT' },
      { label: 'Update time', v: '-85%', sub: 'Sanity editing' },
      { label: 'Organic traffic', v: '+115%', sub: 'global' },
    ],
  },
]

const FAQ_ITEMS = [
  {
    question: 'How much does a website redesign cost in Geneva?',
    answer:
      "A showcase site redesign (up to 10 pages) starts at CHF 3'900. A corporate site (10 to 30 pages, multilingual) sits between CHF 7'500 and CHF 18'000. A full e-commerce redesign or a custom technical migration is quoted on request. Every project includes the pre-redesign SEO audit, the 301 redirect plan, back-office training and 3 months of post-launch support. Fixed quote provided before we start, no surprises.",
  },
  {
    question: 'How long does a full redesign take?',
    answer:
      'A showcase site redesign is delivered in 5 to 8 weeks. A multilingual corporate site takes 10 to 14 weeks. A complex e-commerce migration (Prestashop to Shopify with a catalogue over 500 products) runs 12 to 16 weeks. A schedule with written validation milestones is shared from the brief. We meet the timeline on 95% of DKDP projects 2024-2026.',
  },
  {
    question: 'Will I lose my Google ranking after the redesign?',
    answer:
      'No, if the redesign is done correctly. DKDP starts with a full SEO audit of the existing site: pages that rank, backlinks, active keywords, Core Web Vitals. Every old URL is mapped and 301-redirected to its new equivalent. The H1/H2 structures that perform are preserved. Result across our 14 redesigns 2024-2026: no organic traffic loss at launch, +240% average traffic at 12 months.',
  },
  {
    question: 'Do we have to rebuild everything or can we migrate what exists?',
    answer:
      'It depends on the technical state. If your WordPress is clean (recent theme, plugins up to date, no technical debt), we can redesign the layout without changing the CMS. If your site is built on obsolete tech (Flash, PHP 5, a builder with no code access), a full migration is needed. DKDP systematically assesses this in the initial audit, with no technological bias.',
  },
  {
    question: 'What is the difference between a redesign and a new build?',
    answer:
      "A new website starts from scratch: new domain, no SEO history, no content to preserve. A redesign concerns an existing site with history (backlinks, indexed pages, ranking content) that must be preserved and improved. The budgets differ: a new build starts at CHF 2'500, a redesign at CHF 3'900 because it includes the SEO audit and the redirect plan. For a detailed comparison, read our article on website redesign: when and why.",
  },
  {
    question: 'Can we keep our domain name and our content?',
    answer:
      'Yes, in the vast majority of cases. We keep the domain (no major DNS migration), recover the text content via export or scraping if needed, and migrate the media (images, PDFs, videos) to the new storage. The main URLs are kept or 301-redirected. If you want to change domain, we handle the full migration with a dedicated SEO strategy.',
  },
  {
    question: 'Will the site be editable by my team?',
    answer:
      'Always. Every DKDP redesign is delivered with a back-office adapted to your team: Sanity or Contentful (headless, modern, for marketing teams), WordPress (for teams already trained), or Notion (for the smallest setups). A 1.5-hour training session is included, plus a video guide. Routine changes (text, images, pages) are made without contacting us again.',
  },
  {
    question: 'How does the migration work without service downtime?',
    answer:
      'The new version is developed on a password-protected staging environment. Once everything is approved, we switch to production during a short maintenance window (15 to 30 minutes, usually a Saturday 11pm to 1am). Visitors never see an error page. A rollback plan is ready in case of an issue. We monitor the following 24 hours.',
  },
  {
    question: 'WordPress redesign or move to Next.js?',
    answer:
      'It depends on your needs. WordPress stays relevant if your team is trained, if you have many contributors, and if extreme performance is not critical. Next.js is superior for: mobile performance (LCP < 1s), technical SEO, applications with business logic (dashboards, calculators, client portals), AI/agent integrations. We never force a tech: we recommend the one that serves your objectives.',
  },
  {
    question: 'Is the redesign GDPR and Swiss FADP compliant?',
    answer:
      'Yes, by default. Every DKDP redesign includes: a compliant cookie banner (explicit consent, opt-in per category), a privacy policy aligned with the Swiss FADP 2023 and the EU GDPR, a documented processing register, secure forms with a legal notice, the option of 100% Swiss hosting (Infomaniak Geneva). For regulated sectors (fiduciary, medical, legal), we also provide the PIA impact assessment and the DPA with subcontractors.',
  },
]

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function RefonteSiteWebPage() {
  return (
    <main>
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'Website redesign Geneva & French-speaking Switzerland',
          url: '/en/digital-agency/website-redesign',
          description:
            'Redesign of outdated websites in Geneva and French-speaking Switzerland: modern design, rethought UX, WordPress, Next.js, Shopify or Astro migration with no SEO loss. Pre-redesign SEO audit, 301 redirect plan, Core Web Vitals green by guarantee. FADP 2023 and GDPR compliant.',
          serviceType: 'Website redesign',
          priceFrom: 3900,
          priceSpecDescription: "From CHF 3'900 for a showcase site redesign (10 pages), SEO audit included",
          lang: 'en',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ_ITEMS)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: 'https://dkdp.ch/en' },
          { name: 'Digital Agency', url: 'https://dkdp.ch/en/digital-agency' },
          { name: 'Website redesign', url: 'https://dkdp.ch/en/digital-agency/website-redesign' },
        ])}
      />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)" accentRgb="167,139,250">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href={localizedPath('/agence-digitale', 'en')} className="text-text-muted text-sm hover:text-text transition-colors">
                Digital Agency
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color: V }}>
                Website redesign
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">
                  Website redesign Geneva & French-speaking Switzerland
                </h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Your site is <GradText as="span">costing you clients</GradText>. We rebuild it with real results.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  Full redesign, migration with no SEO loss, 2026 design, Core Web Vitals green by guarantee. For French-speaking Swiss SMBs who want a site that truly converts. <strong className="text-text">+240% organic traffic in 12 months</strong> on average across the 14 DKDP redesigns 2024-2026.
                </p>
                <HeroPills
                  items={[
                    { label: 'Free audit', Icon: Zap },
                    { label: 'Delivery 4 to 8 wks', Icon: Clock },
                    { label: 'SEO preserved', Icon: Search },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Free audit of my site
                  </LiquidMetalButton>
                  <Link
                    href="#symptomes"
                    className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
                  >
                    Symptoms of a site to rebuild <ArrowRight size={13} />
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">
                  Fixed price from CHF 3'900. SEO audit included. Quote in 48 hours.
                </p>
              </div>

              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="Stack for your website redesign">
                  <AppLogoMarquee
            logos={[...DESIGN_WEB_LOGOS, ...IA_LOGOS.slice(0, 4)]}
            durationSeconds={126}
            size="md"
          />
                </div>
                <div
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(167,139,250,0.18)' }}
                >
                  <Image
                    src="/images/og/refonte-site-web.png"
                    alt="Website redesign in Geneva: before/after split-screen 2026 design with Core Web Vitals green by DKDP"
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
              { v: '+240%', l: 'Organic traffic', sub: 'Average at 12 months' },
              { v: '0%', l: 'SEO loss', sub: '14 redesigns 2024-2026' },
              { v: '5-8 wks', l: 'Showcase timeline', sub: 'Schedule met' },
              { v: '90+', l: 'Lighthouse score', sub: 'Mobile and desktop' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: V }}>
                    {s.v}
                  </p>
                  <p className="text-text text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>


      <LogoBanner lang="en" />
      {/* ── Estimation CTA (high-intent lead-gen) ── */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link
            href={localizedPath('/agence-digitale/creation-site-web/estimation', 'en')}
            className="group relative block overflow-hidden rounded-[20px] border transition-all hover:-translate-y-0.5 duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(167,139,250,0.14) 0%, rgba(167,139,250,0.04) 100%)',
              borderColor: 'rgba(167,139,250,0.32)',
              boxShadow: '0 0 50px rgba(167,139,250,0.10)',
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 md:p-10">
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: V }}>
                  Budget and timeline in 2 minutes
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-text mb-2">
                  How much will redesigning your site cost?
                </h2>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl">
                  Free online estimator. Sizes, tech, modules, timelines. Immediate priced answer, no email required.
                </p>
              </div>
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm shrink-0 transition-transform group-hover:translate-x-1"
                style={{ background: 'var(--violet)', color: '#fff' }}
              >
                Get my estimate
                <ChevronRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Subnav ── */}
      <ScrollSpyNav
        items={[
          { label: 'Symptoms', href: '#symptomes' },
          { label: 'Our approach', href: '#approche' },
          { label: 'Redesign vs new build', href: '#vs-creation' },
          { label: 'Tech stack', href: '#stack' },
          { label: 'Results', href: '#cas-clients' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'Process', href: '#processus' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Free audit', href: localizedPath('/agence-digitale/creation-site-web/audit-site', 'en') }}
        accentColor={V}
        accentBg="rgba(124,58,237,0.18)"
        accentBorder="rgba(124,58,237,0.30)"
      />

      {/* ── Symptoms ── */}
      <section id="symptomes" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Symptoms</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Does your current site show any of these symptoms?
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                If you tick more than 3 boxes, a redesign is probably profitable within 12 months.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SYMPTOMS.map((s, i) => (
              <SectionReveal key={s.title} delay={i * 0.05}>
                <div
                  className="flex flex-col h-full rounded-[14px] border p-6"
                  style={{ background: VB, borderColor: VD }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[8px] mb-4"
                    style={{ background: 'rgba(167,139,250,0.12)', border: `1px solid ${VD}` }}
                  >
                    <s.Icon size={18} style={{ color: V }} />
                  </div>
                  <h3 className="text-text font-semibold text-base mb-2">{s.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Our approach</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                A redesign that preserves your SEO and improves everything else.
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                The difference between a successful redesign and an SEO disaster is decided in the first 30 days of the project.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {APPROACH.map((a, i) => (
              <SectionReveal key={a.title} delay={i * 0.08}>
                <div
                  className="flex flex-col h-full rounded-[14px] border p-6"
                  style={{ background: VB, borderColor: VD }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[8px] mb-4"
                    style={{ background: 'rgba(167,139,250,0.12)', border: `1px solid ${VD}` }}
                  >
                    <a.Icon size={18} style={{ color: V }} />
                  </div>
                  <h3 className="text-text font-semibold text-base mb-2">{a.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{a.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Redesign vs New build ── */}
      <section id="vs-creation" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Redesign vs new build</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Redesign or new build: what is the difference?
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                The choice is not symbolic. It determines your budget, your timing and your SEO strategy.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'New build',
                tag: 'New project',
                desc: 'You start from scratch: new domain, no SEO history, no content to preserve.',
                points: [
                  'No historical constraints',
                  "Budget: from CHF 2'500",
                  'Timeline: 3 to 5 weeks (showcase)',
                  'SEO to build from A to Z',
                ],
                href: localizedPath('/agence-digitale/creation-site-web', 'en'),
                cta: 'See the new build',
                accent: 'var(--surface-default)',
                accentBorder: 'var(--surface-border)',
                accentText: 'var(--text)',
              },
              {
                title: 'Redesign',
                tag: 'Existing site',
                desc: 'Your site exists, it ranks on certain keywords, it has backlinks. We preserve and improve.',
                points: [
                  'Mandatory pre-redesign SEO audit',
                  "Budget: from CHF 3'900 (showcase)",
                  'Timeline: 5 to 8 weeks (showcase)',
                  'Systematic 301 redirect plan',
                ],
                href: '#tarifs',
                cta: 'See redesign pricing',
                accent: VB,
                accentBorder: VD,
                accentText: V,
                highlight: true,
              },
            ].map((card) => (
              <SectionReveal key={card.title}>
                <div
                  className="flex flex-col h-full rounded-[20px] border p-8 relative"
                  style={{
                    background: card.accent,
                    borderColor: card.accentBorder,
                    ...(card.highlight
                      ? { boxShadow: '0 0 50px rgba(167,139,250,0.10)' }
                      : {}),
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-2"
                    style={{ color: card.accentText }}
                  >
                    {card.tag}
                  </p>
                  <h3 className="text-text font-bold text-2xl mb-3">{card.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">{card.desc}</p>
                  <div className="space-y-2 mb-7 flex-1">
                    {card.points.map((p) => (
                      <div key={p} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: card.accentText }} />
                        <span className="text-text-secondary text-sm">{p}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                    style={{ color: card.accentText }}
                  >
                    {card.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech stack ── */}
      <section id="stack" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Tech stack</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Our tech stack for your redesigns.
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                We choose the tech based on your needs, not on our preferences. All tested on 50+ projects.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TECH_STACK.map((t, i) => (
              <SectionReveal key={t.name} delay={i * 0.05}>
                <div
                  className="flex flex-col h-full rounded-[14px] border p-5"
                  style={{ background: 'var(--surface-subtle)', borderColor: 'var(--surface-border)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 size={16} style={{ color: V }} />
                    <p className="text-text font-semibold text-sm">{t.name}</p>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: V }}>
                    {t.cat}
                  </p>
                  <p className="text-text-muted text-xs leading-relaxed flex-1">{t.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case studies ── */}
      <section id="cas-clients" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Results</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Real results after a DKDP redesign.
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                3 anonymised cases, French-speaking Swiss SMBs, between 2024 and 2026. Figures from Google Analytics 4 and Search Console.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((c, i) => (
              <SectionReveal key={c.sector} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: VB, borderColor: VD }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: V }}>
                    {c.sector}
                  </p>
                  <div className="mb-4">
                    <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">Before</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{c.pain}</p>
                  </div>
                  <div className="mb-6">
                    <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">After</p>
                    <p className="text-text text-sm leading-relaxed font-medium">{c.result}</p>
                  </div>
                  <div className="flex flex-col gap-3 mt-auto pt-4 border-t" style={{ borderColor: VD }}>
                    {c.kpis.map((k) => (
                      <div key={k.label} className="flex items-baseline justify-between gap-3">
                        <p className="text-text-muted text-xs leading-tight">{k.label}</p>
                        <div className="text-right">
                          <p className="text-text text-lg font-bold leading-none">{k.v}</p>
                          <p className="text-text-muted text-[10px] mt-0.5">{k.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-14">
                <GradTag className="mb-4">Pricing</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  Website redesign pricing.
                </h2>
                <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                  Fixed prices, SEO audit included, systematic 301 redirect plan, 3 months of support.
                </p>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  tier: 'Showcase',
                  price: "CHF 3'900",
                  volume: 'up to 10 pages',
                  features: [
                    'Pre-redesign SEO audit',
                    'Custom Figma design',
                    'WordPress, Next.js or Astro migration',
                    '301 redirect plan',
                    'Back-office training (1.5 hours)',
                    '3 months of support included',
                  ],
                  highlight: false,
                },
                {
                  tier: 'Corporate',
                  price: "CHF 7'500",
                  volume: '10 to 30 pages, multilingual',
                  features: [
                    'Everything in Showcase, plus:',
                    'Multilingual FR/DE/EN/IT',
                    'Headless CMS (Sanity or Contentful)',
                    'API integrations (CRM, Calendar, ERP)',
                    'Structured SEO blog',
                    'WCAG 2.1 AA accessibility audit',
                  ],
                  highlight: true,
                  badge: 'Popular',
                },
                {
                  tier: 'E-commerce / custom',
                  price: 'On request',
                  volume: '> 30 pages or full store',
                  features: [
                    'E-commerce redesign (Shopify, Hydrogen)',
                    'Product catalogue migration',
                    'Twint, Stripe, PostFinance integration',
                    'Client portals, custom dashboards',
                    'Microservices architecture',
                    'Extended support negotiated',
                  ],
                  highlight: false,
                },
              ].map((t) => (
                <SectionReveal key={t.tier}>
                  <div
                    className="flex flex-col h-full rounded-[20px] border p-8 relative"
                    style={{
                      background: t.highlight ? 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.04) 100%)' : VB,
                      borderColor: t.highlight ? 'rgba(167,139,250,0.35)' : VD,
                      boxShadow: t.highlight ? '0 0 50px rgba(167,139,250,0.10)' : 'none',
                    }}
                  >
                    {t.badge && (
                      <span
                        className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(167,139,250,0.18)', color: V, border: `1px solid ${VD}` }}
                      >
                        {t.badge}
                      </span>
                    )}
                    <div className="mb-6">
                      <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: V }}>
                        {t.tier} redesign
                      </p>
                      <p className="text-3xl font-bold text-text mb-1">{t.price}</p>
                      <p className="text-text-muted text-xs">{t.volume}</p>
                    </div>
                    <div className="flex flex-col gap-2.5 flex-1 mb-8">
                      {t.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: V }} />
                          <span className="text-text-secondary text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                    <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                      Discuss my redesign
                    </LiquidMetalButton>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Process 8 steps ── */}
      <section id="processus" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Process</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Our 8-step redesign process.
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                From the initial SEO audit to post-launch monitoring. No step is negotiable.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.map((s, i) => (
              <SectionReveal key={s.n} delay={i * 0.05}>
                <div
                  className="flex flex-col h-full rounded-[14px] border p-6 relative"
                  style={{ background: VB, borderColor: VD }}
                >
                  <span
                    className="absolute top-4 right-4 text-[11px] font-bold opacity-40"
                    style={{ color: V }}
                  >
                    {s.n}
                  </span>
                  <h3 className="text-text font-semibold text-base mb-2 pr-8">{s.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <Testimonials accentRgb="167,139,250" lang="en" />
      </section>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ_ITEMS} title="Frequently asked questions about redesign." lang="en" />
      </div>

      {/* ── Blog articles bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Go deeper on redesign
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                href: localizedPath('/blog/refonte-site-web-quand-pourquoi', 'en'),
                tag: 'Supporting article',
                title: '7 signals that tell you to redesign',
                desc: 'The complete guide to knowing whether now is the time or not.',
              },
              {
                href: localizedPath('/blog/core-web-vitals-2026-guide-complet', 'en'),
                tag: 'Performance',
                title: 'Core Web Vitals 2026: complete guide',
                desc: 'LCP, INP, CLS: what Google really expects in 2026.',
              },
              {
                href: localizedPath('/blog/cout-site-web-geneve-2026', 'en'),
                tag: 'Budget',
                title: 'How much does a site cost in Geneva',
                desc: 'Detailed ranges by project type, 2026.',
              },
            ].map((a, i) => (
              <SectionReveal key={a.href} delay={i * 0.05}>
                <Link
                  href={a.href}
                  className="group flex flex-col gap-2 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200 h-full"
                  style={{ background: 'rgba(167,139,250,0.04)', borderColor: VD }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: V }}>
                    {a.tag}
                  </p>
                  <p className="text-text font-semibold text-sm">{a.title}</p>
                  <p className="text-text-muted text-xs leading-relaxed flex-1">{a.desc}</p>
                  <p className="text-xs font-medium inline-flex items-center gap-1 mt-2" style={{ color: V }}>
                    Read the article
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </p>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead gen audit ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SiteAuditBlock />
        </div>
      </section>

      <CTAFinal accentRgb="167,139,250" lang="en" />
    </main>
  )
}
