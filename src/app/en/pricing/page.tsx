import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildOrganization } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Pricing · Digital, AI and Training | DKDP Geneva',
  description:
    'Transparent pricing for websites, AI rollouts and corporate training. Fixed quote, no surprises. Websites from CHF 6,000, AI from CHF 4,000, training from CHF 1,500.',
  alternates: {
    canonical: 'https://dkdp.ch/en/pricing',
    languages: {
      'fr-CH': 'https://dkdp.ch/tarifs',
      en: 'https://dkdp.ch/en/pricing',
      'x-default': 'https://dkdp.ch/tarifs',
    },
  },
  openGraph: {
    title: 'Pricing · Digital, AI and Training | DKDP Geneva',
    description: 'Fixed quote, no surprises. Websites from CHF 6,000, AI from CHF 4,000, training from CHF 1,500.',
    url: 'https://dkdp.ch/en/pricing',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
  },
}

const TIERS = [
  {
    name: 'Digital',
    accent: '#A78BFA',
    bg: 'rgba(124,58,237,0.06)',
    border: 'rgba(124,58,237,0.18)',
    badge: 'Web & SEO',
    headline: 'Websites that pay back',
    starting: 'from CHF 6,000',
    bullets: [
      'Showcase website (5-10 pages) from CHF 6,000',
      'E-commerce from CHF 12,000',
      'Headless rebuild from CHF 15,000',
      'Monthly SEO retainer from CHF 800',
      'Google Ads management from CHF 1,200/month',
    ],
    href: '/en/digital-agency',
    cta: 'See digital services',
  },
  {
    name: 'AI',
    accent: 'var(--text-secondary)',
    bg: 'var(--chrome-bg)',
    border: 'var(--chrome-border)',
    badge: 'AI agency',
    headline: 'AI that ships',
    starting: 'from CHF 4,000',
    bullets: [
      'AI audit and roadmap from CHF 4,000',
      'Custom AI chatbot from CHF 5,000',
      'Internal AI agent from CHF 8,000',
      'n8n / Make automation from CHF 2,500',
      'Monthly AI ops retainer from CHF 1,500',
    ],
    href: '/en/artificial-intelligence',
    cta: 'See AI services',
  },
  {
    name: 'Training',
    accent: '#FF8C00',
    bg: 'rgba(255,107,0,0.06)',
    border: 'rgba(255,107,0,0.18)',
    badge: 'Corporate training',
    headline: 'Training that sticks',
    starting: 'from CHF 1,500',
    bullets: [
      'Half-day AI training from CHF 1,500 (up to 10 people)',
      'Full-day training from CHF 2,800',
      'Multi-session corporate rollout from CHF 8,000',
      'Custom playbook included',
      'Two weeks of email Q&A included',
    ],
    href: '/en/corporate-training',
    cta: 'See training catalogue',
  },
]

export default function EnPricingPage() {
  return (
    <>
      <SchemaOrg schema={buildOrganization()} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Pricing', url: '/en/pricing' },
        ])}
      />

      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <GradTag>Pricing</GradTag>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight leading-[1.08] mt-4 mb-5">
            Clear pricing, <br className="hidden sm:inline" />
            <GradText as="span">fixed quote, no surprises.</GradText>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Every project is scoped and quoted upfront. The number you sign is the number you pay,
            with the timeline you agreed on. Indicative ranges below, exact quote within 24 hours.
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="rounded-2xl p-6 sm:p-7 border flex flex-col"
              style={{ background: tier.bg, borderColor: tier.border }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: tier.accent }}>{tier.badge}</p>
              <h2 className="text-2xl font-bold tracking-tight mb-1">{tier.headline}</h2>
              <p className="text-text-secondary text-sm mb-5">{tier.starting}</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {tier.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed">
                    <Check size={14} className="mt-1 flex-shrink-0" style={{ color: tier.accent }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className="inline-flex items-center gap-1.5 font-semibold text-sm hover:opacity-80 transition-opacity"
                style={{ color: tier.accent }}
              >
                {tier.cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20 border-y border-border" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-10">
            <GradTag>How quotes work</GradTag>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">No game playing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Quote includes everything', text: 'Discovery, design, development, content support, testing, training, SEO setup, launch. No hidden line items.' },
              { title: 'Quote is fixed before kickoff', text: 'Once you sign, the price does not move. If you change scope mid-project, we discuss it openly and quote the delta upfront.' },
              { title: 'Quote is honest about constraints', text: 'If your budget will not deliver what you want, we say so on the call. We do not start projects we know cannot land well.' },
              { title: 'Quote includes post-launch', text: '30 days of free fixes after launch. After that, a fair maintenance retainer is optional.' },
            ].map((p) => (
              <div key={p.title} className="rounded-xl p-5 border border-border" style={{ background: 'var(--bg)' }}>
                <h3 className="font-bold mb-2">{p.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Get your fixed quote</h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-7">
            Within 24 hours of your message, you have scope, price and timeline. Yours to compare with anyone else.
          </p>
          <LiquidMetalButton href="/en/contact" size="lg">
            Request my quote <ArrowRight size={16} />
          </LiquidMetalButton>
        </div>
      </section>
    </>
  )
}
