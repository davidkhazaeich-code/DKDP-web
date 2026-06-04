import type { Metadata } from 'next'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildService } from '@/lib/schema'
import { EstimationStarter } from '../../../../agence-digitale/creation-site-web/_components/EstimationStarter'
import { PriceChart } from '../../../../agence-digitale/creation-site-web/_components/PriceChart'

export const metadata: Metadata = {
  title: 'Free website quote · Online price estimator · DKDP',
  description:
    'Estimate the cost of your website in a few clicks. Interactive estimator with transparent pricing. Showcase site, e-commerce or custom build. Detailed quote within 48h.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/web-design/quote',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/creation-site-web/estimation',
      en: 'https://dkdp.ch/en/digital-agency/web-design/quote',
      'x-default': 'https://dkdp.ch/agence-digitale/creation-site-web/estimation',
    },
  },
  openGraph: {
    title: 'Free website quote · Estimator · DKDP',
    description: 'Estimate the cost of your website in a few clicks. Interactive estimator. Detailed quote within 48h.',
    url: 'https://dkdp.ch/en/digital-agency/web-design/quote',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/estimation-site-web.png', width: 1376, height: 768, alt: 'Free website quote Geneva: DKDP price estimator, detailed quote within 48h' }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/og/estimation-site-web.png'] },
}

export default function EstimationPage() {
  return (
    <main className="relative min-h-screen">
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Digital Agency', url: 'https://dkdp.ch/en/digital-agency' },
        { name: 'Web design', url: 'https://dkdp.ch/en/digital-agency/web-design' },
        { name: 'Quote', url: 'https://dkdp.ch/en/digital-agency/web-design/quote' },
      ])} />
      <SchemaOrg schema={buildService({
        name: 'Free website quote',
        url: '/en/digital-agency/web-design/quote',
        description: 'Interactive estimator to estimate the cost of your website in Geneva. Answer a few questions and receive a detailed quote within 48h.',
        lang: 'en',
      })} />

      {/* ── Grid background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(167,139,250,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(167,139,250,0.12) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, color-mix(in srgb, var(--bg) 40%, transparent), transparent, var(--bg))' }}
        />
      </div>

      {/* ── Hero ── */}
      <section className="relative pt-24 sm:pt-32 pb-10">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#A78BFA' }}>
            Price estimator
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-text mb-10 leading-tight">
            How much does your website cost?
          </h1>
          <EstimationStarter lang="en" />
        </div>
      </section>

      {/* ── SEO context ── */}
      <section className="relative pb-12">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="rounded-[16px] border border-border bg-bg-card p-7">
            <h2 className="text-text font-bold text-lg mb-3">How does the estimator work?</h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              The DKDP price estimator calculates a cost range based on the type of site (showcase, e-commerce, web application), the number of pages, the features you want (forms, blog, member area, multilingual) and your maintenance needs. These criteria determine the volume of work and therefore the budget.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              The prices shown correspond to DKDP rates in Geneva for custom websites developed in Next.js or Astro. A standard showcase site starts from CHF 2'500, a site with a CMS from CHF 4'500, and an e-commerce site from CHF 6'000.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              The result is an indicative estimate. Once you submit, a DKDP expert reviews your project and sends you a personalised, detailed quote within 48 working hours. No commitment, no credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* ── Chart ── */}
      <section className="relative pb-20 px-4 sm:px-6">
        <PriceChart lang="en" />
      </section>
    </main>
  )
}
