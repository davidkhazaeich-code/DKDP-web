import type { Metadata } from 'next'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import dynamic from 'next/dynamic'
import { HeroBg } from '@/components/ui/HeroBg'
const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { violet as violetToken, chrome as chromeToken, orange as orangeToken, green as greenToken } from '@/lib/tokens'
import { AuditHeroForm } from '@/components/sections/AuditHeroForm'

export const metadata: Metadata = {
  title: 'Free SEO audit · DKDP Geneva',
  description:
    'Get a complete analysis of your SEO within 48h: keywords, rankings, backlinks, technical errors, content. Free for SMBs in French-speaking Switzerland.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/seo/seo-audit',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/seo/audit-seo',
      en: 'https://dkdp.ch/en/digital-agency/seo/seo-audit',
      'x-default': 'https://dkdp.ch/agence-digitale/seo/audit-seo',
    },
  },
  openGraph: {
    title: 'Free SEO audit · DKDP Geneva',
    description:
      'Complete analysis of your SEO: keywords, rankings, backlinks, technical SEO, content. Results within 48h.',
    url: 'https://dkdp.ch/en/digital-agency/seo/seo-audit',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/audit-seo.png', width: 1376, height: 768, alt: 'Free SEO audit DKDP Geneva: keyword, technical, content and backlink analysis within 48h' }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/og/audit-seo.png'] },
}

// Design tokens
const violet   = violetToken.color
const violetBg = violetToken.bg
const violetBd = violetToken.border
const chrome   = chromeToken.color
const chromeBg = chromeToken.bg
const chromeBd = chromeToken.border
const orange   = orangeToken.color
const green    = greenToken.color

// Schema JSON-LD
const schemas = [
  buildService({
    name: 'Free SEO audit',
    url: '/en/digital-agency/seo/seo-audit',
    description:
      'Complete analysis of your SEO rankings: keywords, backlinks, technical SEO, content. Report within 48h for SMBs in French-speaking Switzerland.',
    lang: 'en',
  }),
  buildBreadcrumbList([
    { name: 'Home', url: 'https://dkdp.ch/en' },
    { name: 'Digital Agency', url: 'https://dkdp.ch/en/digital-agency' },
    { name: 'SEO', url: 'https://dkdp.ch/en/digital-agency/seo' },
    { name: 'SEO audit', url: 'https://dkdp.ch/en/digital-agency/seo/seo-audit' },
  ]),
  buildFAQPage([
    {
      question: 'Is the SEO audit really free?',
      answer: "Yes, completely and with no strings attached. No credit card required. We offer this audit so you can discover our SEO expertise and identify why your site is not visible on Google. If you want us to work on your SEO, we send you a quote, with no obligation whatsoever.",
    },
    {
      question: 'What is an SEO audit and why have one?',
      answer: "An SEO audit is a complete analysis of your rankings in search engines. It covers your target keywords, your backlink profile, the technical errors blocking your indexing, the quality of your content and your local visibility. Without an audit, you do not know why you are not appearing on Google nor how to fix it effectively.",
    },
    {
      question: 'Why is my site not appearing on Google?',
      answer: "The most common causes are: deficient technical SEO (unindexed pages, misconfigured tags, insufficient Core Web Vitals), a lack of content optimised for the right keywords, low domain authority due to few quality backlinks, or an absent Google My Business presence. Our audit identifies precisely which one applies to your case.",
    },
    {
      question: 'How long does it take to see SEO results after the audit?',
      answer: "The audit is delivered to you within 48 working hours. As for results after implementing the recommendations: technical fixes are visible on Google within 2 to 6 weeks. Ranking improvements on local Geneva keywords generally appear between 6 and 12 weeks. Building authority through backlinks is a long-term effort over 3 to 6 months.",
    },
    {
      question: 'What does the SEO audit report contain?',
      answer: "The report covers six dimensions: target keywords and current rankings, technical SEO (crawl, indexing, structured data), backlink profile and link-building opportunities, content quality and structure, local SEO and Google My Business, and GEO presence in AI engines (Google AI Overviews, ChatGPT, Perplexity). Each point is scored and accompanied by prioritised recommendations.",
    },
    {
      question: 'What is the difference between the SEO audit and the site audit?',
      answer: "The SEO audit focuses exclusively on your organic rankings: positioning, keywords, backlinks, content and AI visibility. The site audit covers your website more broadly: performance, security, accessibility, UX and conversion in addition to on-page SEO. The two are complementary, we also offer a dedicated free site audit.",
    },
    {
      question: 'Does my site need to be based in Switzerland to qualify for the audit?',
      answer: "No. We audit Swiss, French and Belgian sites. Our specialty remains the local SEO context of French-speaking Switzerland: competition on Geneva queries, multilingual strategy (FR/DE/IT), local search behaviours and Google Maps visibility for shops and service providers.",
    },
    {
      question: 'What happens after the SEO audit?',
      answer: "Nothing, if you do not want to continue. You receive your report, it is entirely yours. If you want us to work on your SEO, we send you a costed and prioritised action plan. Our SEO clients observe an average of +240% organic traffic at 6 months. But the decision and the timing remain entirely yours.",
    },
  ]),
]

// Data
const ANALYSIS_POINTS = [
  {
    title: 'Keywords & rankings',
    desc: 'Target queries, current positions, local opportunities in French-speaking Switzerland, competitive analysis on your markets.',
    accent: violet,
    accentBg: violetBg,
    accentBd: violetBd,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6.5 8.5h4M8.5 6.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Technical SEO',
    desc: 'Crawl, indexing, Core Web Vitals, sitemap, robots.txt, structured data and blocking errors.',
    accent: green,
    accentBg: 'rgba(74,222,128,0.08)',
    accentBd: 'rgba(74,222,128,0.20)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Backlinks & authority',
    desc: 'Inbound link profile, Domain Authority, toxic links to disavow, link-building opportunities.',
    accent: orange,
    accentBg: 'rgba(255,140,0,0.08)',
    accentBd: 'rgba(255,140,0,0.20)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M8 12l-3 3a2.828 2.828 0 104 4l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8l3-3a2.828 2.828 0 10-4-4L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 11.5l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Content & structure',
    desc: 'Heading tags, keyword density, duplicate content, page length and editorial optimisation opportunities.',
    accent: chrome,
    accentBg: chromeBg,
    accentBd: chromeBd,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 5h12M4 8h8M4 11h10M4 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Local SEO & GEO',
    desc: 'Google My Business, NAP consistency, local citations, visibility in Geneva and French-speaking Switzerland.',
    accent: violet,
    accentBg: violetBg,
    accentBd: violetBd,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="10" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'GEO & AI Search',
    desc: 'Presence in Google AI Overviews, ChatGPT, Perplexity. Passage optimisation for generative search.',
    accent: green,
    accentBg: 'rgba(74,222,128,0.08)',
    accentBd: 'rgba(74,222,128,0.20)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
  },
]

const STEPS = [
  {
    n: '01',
    title: 'You enter your URL',
    desc: '30 seconds, no login required, no tool to install.',
  },
  {
    n: '02',
    title: 'We analyse your SEO',
    desc: 'Our SEO experts examine the 6 dimensions in detail, with pro tools and a human eye.',
  },
  {
    n: '03',
    title: 'You receive the report',
    desc: 'Detailed PDF with priorities and concrete recommendations to improve your rankings, within 48h.',
  },
]

const STATS = [
  { value: '300+', label: 'sites audited in French-speaking Switzerland' },
  { value: '87%', label: 'of sites have a blocking technical issue' },
  { value: '48h', label: 'maximum delivery time guaranteed' },
]

const FAQ_ITEMS = [
  {
    q: 'Is the SEO audit really free?',
    a: "Yes, completely and with no strings attached. No credit card required, no subscription starts automatically. We offer this audit so you can discover our SEO expertise and concretely identify why your site is not visible on Google. If you want us to work on your SEO, we send you a quote, with no obligation whatsoever.",
  },
  {
    q: 'What is an SEO audit and why have one?',
    a: "An SEO audit is a complete analysis of your rankings in search engines. It covers your target keywords, your backlink profile, the technical errors blocking your indexing, the quality of your content and your local visibility. Without an audit, you do not know why you are not appearing on Google nor how to fix it effectively.",
  },
  {
    q: 'Why is my site not appearing on Google?',
    a: "The most common causes are: deficient technical SEO (unindexed pages, misconfigured tags, insufficient Core Web Vitals), a lack of content optimised for the right keywords, low domain authority due to few quality backlinks, or an absent Google My Business presence. Our audit identifies precisely which one applies to your case.",
  },
  {
    q: 'How long does it take to see SEO results after the audit?',
    a: "The audit is delivered to you within 48 working hours. As for results after implementing the recommendations: technical fixes are visible on Google within 2 to 6 weeks. Ranking improvements on local Geneva keywords appear between 6 and 12 weeks. Building authority through backlinks is a long-term effort over 3 to 6 months.",
  },
  {
    q: 'What does the SEO audit report contain?',
    a: "The report covers six dimensions: target keywords and current rankings, technical SEO (crawl, indexing, structured data), backlink profile and link-building opportunities, content quality and structure, local SEO and Google My Business, and GEO presence in AI engines (Google AI Overviews, ChatGPT, Perplexity). Each point is scored and accompanied by prioritised recommendations.",
  },
  {
    q: 'What is the difference between the SEO audit and the site audit?',
    a: "The SEO audit focuses exclusively on your organic rankings: positioning, keywords, backlinks, content and AI visibility. The site audit covers your website more broadly: performance, security, accessibility, UX and conversion in addition to on-page SEO. The two are complementary, we also offer a dedicated free site audit.",
  },
  {
    q: 'Does my site need to be based in Switzerland to qualify for the audit?',
    a: "No. We audit Swiss, French and Belgian sites. Our specialty remains the local SEO context of French-speaking Switzerland: competition on Geneva queries, multilingual strategy (FR/DE/IT), local search behaviours and Google Maps visibility for shops and service providers.",
  },
  {
    q: 'What happens after the SEO audit?',
    a: "Nothing, if you do not want to continue. You receive your report, it is entirely yours. If you want us to work on your SEO, we send you a costed and prioritised action plan. Our SEO clients observe an average of +240% organic traffic at 6 months. But the decision and the timing remain entirely yours.",
  },
]

// Page
export default function AuditSEOPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <SchemaOrg key={i} schema={s} />
      ))}

      {/* Section 1 : Hero + Form */}
      <HeroBg>
        <section
          aria-labelledby="hero-heading"
          className="relative pt-44 pb-40 px-6"
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left: text */}
              <SectionReveal>
                <GradTag className="mb-6">Free SEO audit</GradTag>

                <h1
                  id="hero-heading"
                  className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold tracking-[-0.03em] text-text mb-6 leading-[1.08]"
                >
                  Your SEO is holding back your growth.{' '}
                  <GradText as="span">Find out why.</GradText>
                </h1>

                <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-lg">
                  Enter your site&apos;s URL. We analyse your SEO rankings, your keywords, your backlinks, the technical errors and your content. Detailed report sent by email within 48h. Free, no commitment.
                </p>

                {/* Trust badge */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: violetBg,
                    border: `1px solid ${violetBd}`,
                    color: violet,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: violet }}
                    aria-hidden="true"
                  />
                  Analysis performed by SEO experts · Not a robot · 100% human
                </div>
              </SectionReveal>

              {/* Right: form card */}
              <SectionReveal delay={0.15}>
                <div
                  className="rounded-[24px] p-8 md:p-10 bg-bg-card border border-border"
                  style={{
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 60px rgba(124,58,237,0.10), var(--shadow-card-xl)',
                  }}
                >
                  <h2
                    className="text-2xl md:text-3xl font-bold text-text mb-2 tracking-[-0.02em]"
                  >
                    Analyse your SEO for free
                  </h2>
                  <p className="text-text-secondary text-sm mb-8">
                    Results sent by email within 48 working hours.
                  </p>

                  <AuditHeroForm buttonLabel="Get my free SEO audit" />
                </div>
              </SectionReveal>

            </div>
          </div>
        </section>
      </HeroBg>


      {/* Section 3 : What we analyse */}
      <section aria-labelledby="analysis-heading" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Complete report</GradTag>
              <h2
                id="analysis-heading"
                className="text-3xl md:text-4xl font-bold text-text tracking-[-0.02em]"
              >
                What we analyse on your SEO
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ANALYSIS_POINTS.map((point, i) => (
              <SectionReveal key={point.title} delay={i * 0.07}>
                <div
                  className="rounded-[16px] border p-6 h-full"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4"
                    style={{
                      background: point.accentBg,
                      border: `1px solid ${point.accentBd}`,
                      color: point.accent,
                    }}
                  >
                    {point.icon}
                  </div>

                  <h3 className="text-text font-bold text-base mb-2">
                    {point.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>


      <LogoBanner />
      {/* Section 4 : How it works */}
      <section aria-labelledby="process-heading" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Simple &amp; fast</GradTag>
              <h2
                id="process-heading"
                className="text-3xl md:text-4xl font-bold text-text tracking-[-0.02em]"
              >
                3 steps, 48 hours
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <SectionReveal key={step.n} delay={i * 0.1}>
                <div
                  className="relative rounded-[16px] border p-8"
                  style={{
                    background: chromeBg,
                    borderColor: chromeBd,
                  }}
                >
                  {/* Large step number */}
                  <p
                    className="text-7xl font-black mb-4 leading-none select-none"
                    style={{ color: violet, opacity: 0.18 }}
                    aria-hidden="true"
                  >
                    {step.n}
                  </p>
                  <h3 className="text-text font-bold text-lg mb-2">
                    {step.title}
                  </h3>
                  <p
                    className="text-text-secondary text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: step.desc }}
                  />

                  {/* Connector arrow between steps (not after last) */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full"
                      style={{ background: 'var(--bg-card)', border: `1px solid ${chromeBd}` }}
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke={chrome} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 : Stats + Testimonial */}
      <section aria-label="Figures and testimonial" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          {/* Stats */}
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {STATS.map((stat) => (
                <div
                  key={stat.value}
                  className="rounded-[16px] border p-8 text-center"
                  style={{ background: violetBg, borderColor: violetBd }}
                >
                  <p
                    className="text-4xl font-black mb-2 tracking-[-0.03em]"
                    style={{ color: violet }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-text-secondary text-sm leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Testimonial */}
          <SectionReveal delay={0.1}>
            <figure
              className="rounded-[20px] border p-8 md:p-10 max-w-2xl mx-auto text-center"
              style={{
                background: chromeBg,
                borderColor: chromeBd,
              }}
            >
              {/* Quote mark */}
              <span
                className="block text-5xl font-serif leading-none mb-4 select-none"
                style={{ color: violet, opacity: 0.5 }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="text-text text-base md:text-lg leading-relaxed font-medium mb-6">
                The DKDP SEO audit revealed we were absent on all 8 of our main keywords. 4 months later, we are on the first page for 6 of them.
              </blockquote>
              <figcaption className="text-text-muted text-sm">
                Sales director, Geneva SMB
              </figcaption>
            </figure>
          </SectionReveal>
        </div>
      </section>

      {/* Section 6 : FAQ */}
      <section aria-labelledby="faq-heading" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Frequently asked questions</GradTag>
              <h2
                id="faq-heading"
                className="text-3xl md:text-4xl font-bold text-text tracking-[-0.02em] mb-4"
              >
                Everything you want to know
              </h2>
              <p className="text-text-secondary text-sm max-w-xl mx-auto">
                Everything about the free SEO audit for SMBs in French-speaking Switzerland.
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.04}>
                <details
                  className="group rounded-[14px] border overflow-hidden"
                  style={{ background: chromeBg, borderColor: chromeBd }}
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer select-none [list-style:none] [&::marker]:hidden [&::-webkit-details-marker]:hidden hover:bg-bg-card-hover transition-colors duration-150">
                    <h3 className="text-text font-semibold text-[15px] leading-snug text-left">
                      {item.q}
                    </h3>
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      className="flex-shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div
                    className="px-6 pb-6 border-t"
                    style={{ borderColor: chromeBd }}
                  >
                    <p className="text-text-secondary text-sm leading-relaxed pt-4">
                      {item.a}
                    </p>
                  </div>
                </details>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTAFinal */}
      <CTAFinal lang="en" />
    </>
  )
}
