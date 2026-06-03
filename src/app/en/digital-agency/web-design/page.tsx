import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { CheckCircle2, Zap, Search, Settings, ChevronRight, TrendingUp, BarChart2, ShieldCheck, Star, Globe2, Clock, FileText } from 'lucide-react'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList, buildOrganization } from '@/lib/schema'
import { PerformanceComparison } from '@/app/agence-digitale/creation-site-web/_components/PerformanceComparison'
import { TechStack } from '@/app/agence-digitale/creation-site-web/_components/TechStack'
import { HeroVisual } from '@/app/agence-digitale/creation-site-web/_components/HeroVisual'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { violet } from '@/lib/tokens'
import { AppLogoMarquee, DESIGN_WEB_LOGOS, IA_LOGOS } from '@/components/ui/AppLogos'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const SiteAuditBlock = dynamic(() => import('@/components/sections/SiteAuditBlock').then(m => ({ default: m.SiteAuditBlock })))

export const metadata: Metadata = {
  title: 'Web Design Geneva and Switzerland · Custom Websites · DKDP',
  description: "Professional web design in Geneva. Showcase, e-commerce or custom websites. Fast, SEO-ready, delivered in 3 to 5 weeks. From CHF 2'500, free quote.",
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/web-design',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/creation-site-web',
      en: 'https://dkdp.ch/en/digital-agency/web-design',
      'x-default': 'https://dkdp.ch/agence-digitale/creation-site-web',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/creation-site-web.png', width: 1376, height: 768, alt: 'Web design Geneva, DKDP' }],
  },
}

const FAQ_EN = [
  {
    question: 'How much does a professional website cost in Geneva?',
    answer:
      "A professional showcase website starts at CHF 2'500. A website with member portal, blog or online shop sits between CHF 5'000 and CHF 12'000. DKDP delivers a fixed quote before kickoff, no surprises.",
  },
  {
    question: 'How long until my website is delivered?',
    answer:
      'A showcase site is delivered in 3 to 5 weeks. A more complex project (e-commerce, portal, API integrations) takes 6 to 12 weeks. A schedule with validation milestones is shared from day one.',
  },
  {
    question: 'Can I edit the website content myself after delivery?',
    answer:
      'Yes. Every DKDP site is delivered with a simple admin interface (Sanity, WordPress or Notion depending on the project). A hands-on training session is included in the price.',
  },
  {
    question: 'Which technologies do you use to build websites?',
    answer:
      'DKDP works mainly with Next.js, Astro and WordPress depending on the project. Sites are hosted on Vercel or Infomaniak. Every technology choice is justified by the project objectives, not by a default preference.',
  },
  {
    question: 'Will my site be optimised for Google search?',
    answer:
      'Yes. Every site delivered by DKDP integrates the SEO fundamentals: semantic HTML structure, optimised title and meta tags, compressed images, Core Web Vitals performance, and Schema.org markup. Advanced SEO (content, backlinks) is offered as a separate retainer.',
  },
  {
    question: 'Will my site be mobile-friendly?',
    answer:
      'Always. DKDP designs mobile-first: the layout is first optimised for smartphone, then adapted for tablet and desktop. More than 65% of web traffic comes from mobile. Non-negotiable.',
  },
  {
    question: 'What happens if I am not satisfied with the design?',
    answer:
      'The process includes a mockup validation phase before any development. Two cycles of revisions are included. If a disagreement persists, we talk it through: DKDP never delivers a site without explicit client approval.',
  },
  {
    question: 'Can I follow the project progress?',
    answer:
      'Yes. You get access to a preview link from the development phase and receive regular progress updates by email or video call.',
  },
  {
    question: 'What if I want to change something mid-project?',
    answer:
      'We distinguish adjustments (included) from new features (additional quote). Everything is clearly defined in the contract from the start.',
  },
  {
    question: 'Do you offer post-launch support?',
    answer:
      'Yes. We offer maintenance, evolution and monthly SEO packages. You are never alone once the site is delivered.',
  },
]

const BENEFITS = [
  {
    Icon: Zap,
    title: 'Fast and high-performing',
    value: '< 1.5s',
    desc: 'Loading time optimised for green Core Web Vitals scores and a smooth user experience across every device.',
  },
  {
    Icon: Search,
    title: 'SEO-ready from day one',
    value: 'Top 3',
    desc: 'Semantic structure, tags, Schema.org, performance: SEO fundamentals are built into development, not added after.',
  },
  {
    Icon: Settings,
    title: 'Self-managed',
    value: '100%',
    desc: 'Intuitive admin interface to edit your text, images and pages without touching code. Training included.',
  },
]

type AccentKey = 'violet' | 'chrome' | 'orange' | 'green'

const STEPS: { num: number; title: string; week: string; duration: string; accent: AccentKey; desc: string; deliverables: string; icon: string }[] = [
  {
    num: 1, title: 'Audit and discovery', week: 'Week 1', duration: '1 to 2 days', accent: 'violet',
    desc: 'We start by understanding your business, your audience, your objectives and your constraints. Analysis of the existing site, competitive benchmark, digital opportunities mapped.',
    deliverables: 'Full brief, audit report (if existing site), strategic proposal', icon: 'search',
  },
  {
    num: 2, title: 'Proposal and quote', week: 'Week 1-2', duration: '2 to 5 days', accent: 'chrome',
    desc: 'You receive a detailed proposal: exact scope, schedule, recommended technologies, transparent budget. No surprise.',
    deliverables: 'Detailed quote, project plan, chosen technologies', icon: 'doc',
  },
  {
    num: 3, title: 'Design and mockups', week: 'Week 2-4', duration: '5 to 10 days', accent: 'violet',
    desc: 'Wireframes, desktop and mobile mockups. Every UI decision is justified. You validate before a single line of code is written.',
    deliverables: 'Figma mockups, brand kit, interactive prototype', icon: 'pen',
  },
  {
    num: 4, title: 'Development', week: 'Week 3-8', duration: '2 to 6 weeks', accent: 'orange',
    desc: 'Build in Next.js or Astro, performance optimisation, technical SEO, accessibility. You have access to a preview link at every key milestone.',
    deliverables: 'Complete site, source code, tests and optimisations', icon: 'code',
  },
  {
    num: 5, title: 'QA and adjustments', week: 'Week 7-9', duration: '3 to 7 days', accent: 'green',
    desc: 'We test every feature together. You send feedback, we integrate adjustments. Zero frustration: we never deliver a product you have not validated.',
    deliverables: 'QA report, fix list, final validated version', icon: 'check',
  },
  {
    num: 6, title: 'Launch and follow-up', week: 'Week 9-10', duration: '1 to 2 days', accent: 'violet',
    desc: 'Deployment, DNS configuration, post-launch SEO checks, kickoff report. And after? We stay available for evolutions.',
    deliverables: 'Site live, hands-on guide, launch report', icon: 'rocket',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

export default function EnWebDesignPage() {
  return (
    <main>
      <SchemaOrg schema={buildOrganization('en')} />
      <SchemaOrg schema={buildServiceWithLocalBusiness({
        name: 'Web design Geneva',
        url: '/en/digital-agency/web-design',
        description: 'Custom professional web design for SMBs in Geneva. Showcase sites, e-commerce, Next.js, Astro, WordPress. From CHF 2,500.',
        serviceType: 'Web design and development',
        priceFrom: 2500,
        lang: 'en',
        extraAreas: ['Zurich', 'Basel', 'Bern'],
      })} />
      <SchemaOrg schema={buildFAQPage(FAQ_EN)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Digital agency', url: 'https://dkdp.ch/en/digital-agency' },
        { name: 'Web design', url: 'https://dkdp.ch/en/digital-agency/web-design' },
      ])} />

      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/en/digital-agency" className="text-text-muted text-sm hover:text-text transition-colors">
                Digital agency
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Web design</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Web design Geneva and Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  A website that <GradText as="span">brings in clients</GradText>, not compliments.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP builds professional websites for SMBs in Geneva and French-speaking Switzerland: showcase, e-commerce or fully custom. Every project is designed to be fast, visible on Google and easy to self-manage. Pricing starts at CHF 2&apos;500, with a fixed quote and no surprises.
                </p>
                <HeroPills
                  items={[
                    { label: 'Fixed quote in 48 hours', Icon: FileText },
                    { label: 'Delivery in 4 to 8 weeks', Icon: Clock },
                    { label: 'Hosting included', Icon: ShieldCheck },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/en/digital-agency/web-design/quote" size="lg">Estimate my project →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-text transition-colors">
                    Our method ↓
                  </Link>
                </div>
              </div>
              <HeroVisual lang="en" />
            </div>
          </div>
        </section>
        <div className="pt-4 pb-12" aria-label="Stack for your custom websites">
          <AppLogoMarquee
            logos={[...DESIGN_WEB_LOGOS, ...IA_LOGOS.slice(0, 4)]}
            durationSeconds={126}
            size="md"
          />
        </div>
      </HeroBg>

      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '100+', l: 'Websites delivered', sub: 'In French-speaking Switzerland' },
              { v: '10+ yrs', l: 'Of experience', sub: 'In Geneva digital' },
              { v: '4.9/5', l: 'Satisfaction', sub: 'Verified client score' },
              { v: '< 1.5s', l: 'Average load time', sub: 'PageSpeed score 90+' },
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

      <LogoBanner />

      <ScrollSpyNav
        items={[
          { label: 'Our approach', href: '#approche' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'Process', href: '#process' },
          { label: 'Estimate', href: '/en/digital-agency/web-design/quote' },
          { label: 'Case studies', href: '#realisations' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Estimate my project', href: '/en/digital-agency/web-design/quote' }}
        accentColor="#A78BFA"
        accentBg="rgba(124,58,237,0.18)"
        accentBorder="rgba(124,58,237,0.30)"
      />

      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Our approach</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                A website that works for your SMB.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                A beautiful but slow website, badly indexed or hard to update, brings in nothing. DKDP designs sites that combine polished design, technical performance and SEO fundamentals so your investment pays back from month one.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Every project starts with a deep brief. We understand your market, your clients and your objectives before opening Figma. The result: a site built for your audience, not to impress other designers.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Professional showcase site (1 to 20 pages)',
                  'Shopify or WooCommerce online shop',
                  'Custom web application (Next.js)',
                  'Conversion landing page (ad campaign)',
                  'Multilingual site (FR / EN / DE)',
                  'Full rebuild of an existing site',
                  'CRM, form, online payment integrations',
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

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">The real problem</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Your website is losing clients without you knowing.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                A slow site, badly optimised for mobile or badly structured for Google loses visitors every hour. It does not show up in your accounting, but it is measurable: Google PageSpeed, Core Web Vitals and bounce rate do not lie.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: Clock, title: '53% of visitors leave a site that takes more than 3 seconds to load', sub: 'Source: Google / Think with Google' },
                  { Icon: TrendingUp, title: '70% of web traffic comes from mobile. A non-mobile site loses 7 visitors out of 10', sub: 'Source: Statista 2024' },
                  { Icon: Search, title: 'The first 3 Google results capture 75% of clicks. Below that: invisible', sub: 'Source: Advanced Web Ranking' },
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
                  Performance comparison
                </p>
                <PerformanceComparison lang="en" />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Real Core Web Vitals metrics. The PageSpeed score directly impacts Google ranking.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="py-24">
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

      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-14">
                <GradTag className="mb-4">Pricing</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  Web design: clear pricing, fixed quote.
                </h2>
                <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">No surprise mid-project. Every quote is detailed and approved before anything kicks off.</p>
              </div>
            </SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: 'Showcase site',
                  price: "from CHF 2'500",
                  duration: '3 to 5 weeks',
                  features: [
                    'Custom design (Figma)',
                    'Up to 10 pages',
                    'Built-in technical SEO',
                    'Responsive mobile / tablet',
                    'Admin interface',
                    'Training included',
                  ],
                  cta: 'Request a quote',
                  highlight: false,
                },
                {
                  label: 'E-commerce',
                  price: "from CHF 5'000",
                  duration: '5 to 8 weeks',
                  features: [
                    'Shopify or WooCommerce shop',
                    'Unlimited product catalogue',
                    'Secure online payment',
                    'Stock management',
                    'Transactional emails',
                    'Conversion optimisation',
                  ],
                  cta: 'Request a quote',
                  highlight: true,
                },
                {
                  label: 'Custom / Web app',
                  price: 'On request',
                  duration: '6 to 12 weeks',
                  features: [
                    'Next.js web application',
                    'API / CRM integrations',
                    'Member portal or back office',
                    'Multilingual site',
                    'Maximum performance',
                    'Scalable architecture',
                  ],
                  cta: 'Talk about your project',
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
                        href="/en/digital-agency/web-design/quote"
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

      <section className="py-14 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-6">
              Technologies we master
            </p>
            <TechStack />
            <p className="text-center text-text-muted text-[11px] mt-6 max-w-lg mx-auto">
              Every technology is picked for the project objectives, not out of habit. We explain our choices before we code.
            </p>
          </SectionReveal>
        </div>
      </section>

      <HeroBg blob1="rgba(124,58,237,0.12)" blob2="rgba(124,58,237,0.06)">
        <section id="process" className="py-24 border-y border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-16">
                <GradTag className="mb-4">The process</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  Build your website in 6 steps.
                </h2>
              </div>
            </SectionReveal>
            <ProcessTimeline steps={STEPS} />
          </div>
        </section>
      </HeroBg>

      <section id="realisations" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Case studies</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Websites delivered in Geneva: concrete results.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                client: 'B2B consulting firm',
                type: 'Showcase rebuild',
                image: '/images/services/dkdp-agence-creation-web.webp',
                results: ['+340% organic traffic', '15 qualified leads / month', 'Delivered in 4 weeks'],
                tech: 'Next.js · Sanity · Vercel',
              },
              {
                client: 'Geneva lifestyle shop',
                type: 'Shopify e-commerce',
                image: '/images/services/dkdp-agence-reseaux-sociaux.webp',
                results: ['+220% online revenue', 'Conversion rate x2.8', 'Full mobile-first build'],
                tech: 'Shopify · Liquid · Klaviyo',
              },
              {
                client: 'Specialist clinic',
                type: 'Showcase + CRM',
                image: '/images/services/dkdp-agence-consulting.webp',
                results: ['0 to 80 patients / month via web', 'PageSpeed score 98/100', 'Bilingual FR / EN'],
                tech: 'Astro · HubSpot · Infomaniak',
              },
            ].map((r, i) => (
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

          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Our commitments
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { Icon: ShieldCheck, title: 'Fixed quote', desc: 'The price agreed upfront is the final price. No add-ons without your written approval.' },
                  { Icon: Clock, title: 'Deadlines kept', desc: 'A schedule with milestones is shared from kickoff. Delays are communicated in advance, never after.' },
                  { Icon: BarChart2, title: '2 revisions included', desc: 'Two feedback cycles on design and content are baked into every project, at no extra cost.' },
                  { Icon: Globe2, title: '3-month support', desc: 'After delivery, DKDP stays available for 3 months to fix any bug or help with onboarding.' },
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

      <SiteAuditBlock />

      <section id="faq" className="py-20 border-t border-border scroll-mt-[124px]">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="text-center mb-10">
            <GradTag className="mb-4">FAQ</GradTag>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your questions about web design</h2>
          </div>
          <ul className="space-y-3">
            {FAQ_EN.map(({ question, answer }) => (
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
            <Link
              href="/en/digital-agency/seo"
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
                  <p className="text-text font-bold text-lg leading-tight">SEO and AI search</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Your site is delivered SEO-ready. To dominate Google on your target keywords, a content and link-building strategy is required.
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

      <div className="text-center pb-2">
        <Link href="/en/about" className="text-text-muted hover:text-text text-sm transition-colors mt-3 block">
          Learn more about the agency and David Khazaei
        </Link>
      </div>
      <CTAFinal />
    </main>
  )
}
