import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { violet as violetToken, chrome as chromeToken, orange as orangeToken, green as greenToken } from '@/lib/tokens'
import { AuditHeroFormEn } from './_components/AuditHeroFormEn'

export const metadata: Metadata = {
  title: 'Free website audit · Geneva & French-speaking Switzerland · DKDP',
  description:
    'Receive a complete analysis of your website in 48h: performance, SEO, UX, security, accessibility. Free for SMBs in French-speaking Switzerland.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/web-design/site-audit',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/creation-site-web/audit-site',
      en: 'https://dkdp.ch/en/digital-agency/web-design/site-audit',
      'x-default': 'https://dkdp.ch/agence-digitale/creation-site-web/audit-site',
    },
  },
  openGraph: {
    title: 'Free website audit · DKDP Geneva',
    description:
      'Complete analysis of your website: performance, SEO, UX, mobile, security. Results within 48h.',
    url: 'https://dkdp.ch/en/digital-agency/web-design/site-audit',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/audit-site.png', width: 1376, height: 768, alt: 'Free website audit DKDP Geneva: performance, SEO, UX, mobile and security within 48h' }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/og/audit-site.png'] },
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const violet   = violetToken.color
const violetBg = violetToken.bg
const violetBd = violetToken.border
const chrome   = chromeToken.color
const chromeBg = chromeToken.bg
const chromeBd = chromeToken.border
const orange   = orangeToken.color
const green    = greenToken.color

// ─── Schema JSON-LD ───────────────────────────────────────────────────────────
const schemas = [
  buildService({
    name: 'Free website audit',
    url: '/en/digital-agency/web-design/site-audit',
    description:
      'Complete analysis of your website: performance, SEO, UX, mobile, security. Report within 48h for SMBs in French-speaking Switzerland.',
    lang: 'en',
  }),
  buildBreadcrumbList([
    { name: 'Home', url: 'https://dkdp.ch/en' },
    { name: 'Digital agency', url: 'https://dkdp.ch/en/digital-agency' },
    { name: 'Web design', url: 'https://dkdp.ch/en/digital-agency/web-design' },
    { name: 'Site audit', url: 'https://dkdp.ch/en/digital-agency/web-design/site-audit' },
  ]),
  buildFAQPage([
    {
      question: 'Is the website audit really free?',
      answer: "Yes, entirely and with no strings attached. No credit card is required. We carry out this audit free of charge to identify what is holding your site back. If you would like us to fix the issues, we send you a quote, but you are under no obligation.",
    },
    {
      question: 'What is a website audit?',
      answer: 'A website audit is a complete analysis of your website across six dimensions: technical performance, on-page SEO, mobile experience, security, accessibility and UX/conversion. It identifies the issues that hold back your visibility on Google and ranks them by impact priority.',
    },
    {
      question: 'How long does it take to receive the results?',
      answer: 'Your report is sent within 48 business hours at most. In practice, most reports arrive the very next day. You receive a detailed PDF with the issues identified, their severity level and concrete recommendations ranked by priority.',
    },
    {
      question: 'What exactly does the site audit report contain?',
      answer: 'The report covers six points: performance and Core Web Vitals (LCP, CLS, INP), technical SEO (tags, sitemap, indexation), mobile compatibility, HTTPS security, WCAG accessibility, and UX/conversion. Each point is scored, explained and paired with an actionable recommendation.',
    },
    {
      question: 'Does my site need to be hosted in Switzerland?',
      answer: 'No. We audit Swiss, French and Belgian sites without restriction. Our expertise is particularly strong with SMBs in French-speaking Switzerland and Swiss legal requirements (FADP, GDPR).',
    },
    {
      question: 'What is the difference between a site audit and an SEO audit?',
      answer: 'The site audit covers the whole website: performance, security, UX, mobile and on-page SEO. The SEO audit focuses exclusively on organic ranking: keywords, backlinks, content and presence in AI engines. The two are complementary.',
    },
    {
      question: 'Who carries out the audit?',
      answer: 'DKDP experts, not an automated tool. Every audit is analysed manually by our team. We use professional tools (PageSpeed Insights, Screaming Frog, Lighthouse) but the final report is reviewed and enriched by an expert who knows your sector.',
    },
    {
      question: 'What happens if I want to go further after the audit?',
      answer: 'If the issues identified make you want to act, we send you a detailed, costed quote. The decision is entirely yours. There is no sales pressure, no unsolicited calls. Some clients fix the issues themselves thanks to the report.',
    },
  ]),
]

// ─── Data ─────────────────────────────────────────────────────────────────────
const ANALYSIS_POINTS = [
  {
    title: 'Performance & Speed',
    desc: 'Core Web Vitals (LCP, CLS, INP), loading time, PageSpeed score on mobile and desktop.',
    accent: green,
    accentBg: 'rgba(74,222,128,0.08)',
    accentBd: 'rgba(74,222,128,0.20)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Technical SEO',
    desc: 'Meta tags, heading structure, sitemap, robots.txt, structured data, Google indexation.',
    accent: violet,
    accentBg: violetBg,
    accentBd: violetBd,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Mobile experience',
    desc: 'Responsive design, touch targets, readability on smartphone, testing on real devices.',
    accent: chrome,
    accentBg: chromeBg,
    accentBd: chromeBd,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="6" y="2" width="8" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="15.5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Security',
    desc: 'HTTPS, SSL certificate, security headers, forms, common vulnerabilities.',
    accent: orange,
    accentBg: 'rgba(255,140,0,0.08)',
    accentBd: 'rgba(255,140,0,0.20)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L3 5.5V9c0 4.418 3.134 7.95 7 9 3.866-1.05 7-4.582 7-9V5.5L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Accessibility',
    desc: 'WCAG contrast, alt tags, keyboard navigation, ARIA, readability for everyone.',
    accent: violet,
    accentBg: violetBg,
    accentBd: violetBd,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 7h8M10 9v5M8 18l2-4 2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'UX & Conversion',
    desc: 'Clarity of the value proposition, CTAs, user journey, forms, trust.',
    accent: green,
    accentBg: 'rgba(74,222,128,0.08)',
    accentBd: 'rgba(74,222,128,0.20)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 4h12v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const STEPS = [
  {
    n: '01',
    title: 'You enter your URL',
    desc: '30 seconds, no login required, no plugin to install.',
  },
  {
    n: '02',
    title: 'We analyse your site',
    desc: 'Our experts examine the 6 dimensions in detail, by hand.',
  },
  {
    n: '03',
    title: 'You receive the report',
    desc: 'Detailed PDF with priorities and concrete recommendations, within 48h.',
  },
]

const STATS = [
  { value: '500+', label: 'sites analysed in French-speaking Switzerland' },
  { value: '94%', label: 'of sites have at least 3 critical issues identified' },
  { value: '48h', label: 'maximum guaranteed delivery time' },
]

const FAQ_ITEMS = [
  {
    q: 'Is the website audit really free?',
    a: "Yes, entirely and with no strings attached. No credit card is required, no subscription starts automatically. We carry out this audit free of charge so you can discover our method and concretely identify what is holding your site back. If you would like us to fix the issues, we send you a quote, but you are under no obligation.",
  },
  {
    q: 'What is a website audit?',
    a: 'A website audit is a complete, structured analysis of your website across six dimensions: technical performance, on-page SEO, mobile experience, security, accessibility and UX/conversion. It identifies the issues that hold back your visibility on Google, slow down your pages or drive your visitors away, and ranks them by impact priority.',
  },
  {
    q: 'How long does it take to receive the results?',
    a: 'Your report is sent within 48 business hours at most. In practice, most reports arrive the very next day after the request. You receive a detailed PDF with the issues identified, their severity level and the concrete recommendations to put in place, ranked by priority.',
  },
  {
    q: 'What exactly does the site audit report contain?',
    a: 'The report covers six points: performance and Core Web Vitals (LCP, CLS, INP), technical SEO (tags, sitemap, indexation), mobile compatibility and experience, security (HTTPS, headers, forms), WCAG accessibility, and UX/conversion (CTAs, user journey). Each point is scored, explained and paired with an actionable recommendation.',
  },
  {
    q: 'Does my site need to be hosted in Switzerland?',
    a: 'No. We audit Swiss, French and Belgian sites with no geographic restriction. That said, our expertise is particularly strong with SMBs in French-speaking Switzerland: we know the local competitive landscape, the habits of Geneva internet users and Swiss legal requirements (FADP, GDPR).',
  },
  {
    q: 'What is the difference between a site audit and an SEO audit?',
    a: 'The site audit covers your whole website: performance, security, UX, mobile and on-page SEO. The SEO audit focuses exclusively on your organic ranking: keywords, backlinks, editorial structure, local SEO and presence in AI engines. The two are complementary, and we also offer a dedicated free SEO audit.',
  },
  {
    q: 'Who carries out the audit?',
    a: 'DKDP experts, not an automated tool. Every audit is analysed manually by our technical team. We use professional tools (PageSpeed Insights, Screaming Frog, Lighthouse) but the final report is reviewed, interpreted and enriched by an expert who knows your sector.',
  },
  {
    q: 'What happens if I want to go further after the audit?',
    a: 'If the issues identified make you want to act, we send you a detailed, costed quote to fix them. The decision is entirely yours. There is no sales pressure, no unsolicited calls. Some clients fix the issues themselves thanks to the report.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AuditSitePage() {
  return (
    <>
      {schemas.map((s, i) => (
        <SchemaOrg key={i} schema={s} />
      ))}

      {/* ── Hero + Form ──────────────────────────────────────────────────── */}
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
                'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 65%)',
            }}
          />

          <div className="relative z-10 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* ── Left: text ── */}
              <SectionReveal>
                <GradTag className="mb-6">Free website audit</GradTag>

                <h1
                  id="hero-heading"
                  className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold tracking-[-0.03em] text-text mb-6 leading-[1.08]"
                >
                  Your site deserves better.{' '}
                  <GradText as="span">Find out why in 48h.</GradText>
                </h1>

                <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-lg">
                  Enter your site&apos;s URL. We analyse everything: performance, technical SEO,
                  UX, mobile, security. Detailed report sent by email within 48h.
                  Free, no commitment.
                </p>

                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: violetBg,
                    border: `1px solid ${violetBd}`,
                    color: violet,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: violet }}
                    aria-hidden="true"
                  />
                  Analysis carried out by experts · Not a robot · 100% human
                </div>
              </SectionReveal>

              {/* ── Right: form ── */}
              <SectionReveal delay={0.15}>
                <div
                  className="rounded-[24px] p-8 md:p-10 bg-bg-card border border-border"
                  style={{
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 60px rgba(124,58,237,0.10), var(--shadow-card-xl)',
                  }}
                >
                  <h2
                    id="form-heading"
                    className="text-2xl font-bold text-text mb-2 tracking-[-0.02em]"
                  >
                    Analyse your site for free
                  </h2>
                  <p className="text-text-secondary text-sm mb-8">
                    Results sent by email within 48 business hours.
                  </p>

                  <AuditHeroFormEn buttonLabel="Get my free audit" />
                </div>
              </SectionReveal>

            </div>
          </div>
        </section>
      </HeroBg>


      {/* ── Section 3: What we analyse ───────────────────────────────────── */}
      <section aria-labelledby="analysis-heading" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Complete report</GradTag>
              <h2
                id="analysis-heading"
                className="text-3xl md:text-4xl font-bold text-text tracking-[-0.02em]"
              >
                What we analyse on your site
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


      <LogoBanner lang="en" />
      {/* ── Section 4: How it works ──────────────────────────────────────── */}
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
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.desc}
                  </p>

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

      {/* ── Section 5: Stats + Testimonial ───────────────────────────────── */}
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
                The DKDP audit pinpointed 5 issues we had been living with for years without knowing it. In 3 weeks we fixed everything.
              </blockquote>
              <figcaption className="text-text-muted text-sm">
                Marketing manager, Geneva SMB
              </figcaption>
            </figure>
          </SectionReveal>
        </div>
      </section>

      {/* ── Section 6: FAQ ───────────────────────────────────────────────── */}
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
                Everything about the free website audit in French-speaking Switzerland.
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

      {/* ── CTAFinal ─────────────────────────────────────────────────────── */}
      <CTAFinal lang="en" />
    </>
  )
}
