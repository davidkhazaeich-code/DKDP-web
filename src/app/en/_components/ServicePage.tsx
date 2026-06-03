import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Quote, type LucideIcon } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildOrganization, buildFAQPage } from '@/lib/schema'

export type ServicePagePillar = 'agence' | 'ia' | 'formation' | 'apropos'

export type PricingTier = {
  /** Tier label, e.g. "Starter". */
  name: string
  /** Headline price, e.g. "From CHF 2'500". */
  price: string
  /** Optional secondary price/cadence line, e.g. "fixed quote". */
  cadence?: string
  /** Short description of this tier. */
  description: string
  /** What is included in this tier (4-7 bullets). */
  features: string[]
  /** If true, render this tier with a "popular" highlight. */
  highlighted?: boolean
  /** CTA label override (defaults to "Get a quote"). */
  ctaLabel?: string
  /** CTA href override (defaults to /en/contact). */
  ctaHref?: string
}

export type Testimonial = {
  quote: string
  author: string
  /** Role + company, e.g. "Operations Director, Geneva fiduciary". */
  role: string
}

export type ComparisonRow = {
  label: string
  /** Cell values per column (order must match comparisonHeaders). */
  values: string[]
  /** Optional emphasis on a specific column (0-indexed). */
  emphasizeColumn?: number
}

export type BridgeLink = {
  label: string
  href: string
  description: string
}

export type ServicePageConfig = {
  pillar: ServicePagePillar
  hubName: string
  hubHref: string
  tag: string
  h1Lead: string
  h1Highlight: string
  subtitle: string
  icon: LucideIcon
  primaryCta?: string
  primaryHref?: string
  secondaryCta?: string
  secondaryHref?: string
  /** Optional "Problem" section narrative (rendered before bullets). */
  problem?: {
    title: string
    items: { title: string; text: string }[]
  }
  bullets: { title: string; text: string }[]
  stats?: { value: string; label: string }[]
  process?: { title: string; text: string }[]
  /** Optional pricing tier section (rendered after process). */
  pricing?: {
    title?: string
    subtitle?: string
    tiers: PricingTier[]
    /** Optional disclaimer note below tiers. */
    note?: string
  }
  /** Optional comparison table (e.g. SEO vs Google Ads, Claude vs ChatGPT). */
  comparison?: {
    title: string
    subtitle?: string
    headers: string[]
    rows: ComparisonRow[]
  }
  /** Optional testimonials row. */
  testimonials?: Testimonial[]
  /** Optional bridge section (links to sibling pillar pages). */
  bridge?: {
    title: string
    subtitle?: string
    links: BridgeLink[]
  }
  faq?: { question: string; answer: string }[]
  breadcrumbName?: string
  finalTitle?: string
  finalText?: string
  /** Optional extra section rendered between bullets and CTA. */
  extra?: ReactNode
  /** Additional JSON-LD schemas to emit (e.g. Service, ServiceWithLocalBusiness). */
  extraSchemas?: Record<string, unknown>[]
}

const PILLAR_STYLES: Record<ServicePagePillar, { color: string; bg: string; border: string; iconBg: string; iconBorder: string }> = {
  agence: {
    color: '#A78BFA',
    bg: 'rgba(124,58,237,0.06)',
    border: 'rgba(124,58,237,0.18)',
    iconBg: 'rgba(124,58,237,0.15)',
    iconBorder: 'rgba(124,58,237,0.25)',
  },
  ia: {
    color: 'var(--text-secondary)',
    bg: 'var(--chrome-bg)',
    border: 'var(--chrome-border)',
    iconBg: 'var(--chrome-bg)',
    iconBorder: 'var(--chrome-border)',
  },
  formation: {
    color: '#FF8C00',
    bg: 'rgba(255,107,0,0.06)',
    border: 'rgba(255,107,0,0.18)',
    iconBg: 'rgba(255,107,0,0.15)',
    iconBorder: 'rgba(255,107,0,0.25)',
  },
  apropos: {
    color: 'var(--text-secondary)',
    bg: 'var(--gray-bg)',
    border: 'var(--gray-border)',
    iconBg: 'var(--gray-bg)',
    iconBorder: 'var(--gray-border)',
  },
}

/**
 * Standard EN service-detail page used by every leaf route under /en/.
 * Pure presentation, no data fetching: pages just pass a config.
 *
 * Optional sections (in render order): Hero → Stats → Problem → Bullets →
 * Process → Pricing → Comparison → Extra → Testimonials → FAQ → Bridge → Final CTA.
 */
export function ServicePage({ config, currentUrl }: { config: ServicePageConfig; currentUrl: string }) {
  const s = PILLAR_STYLES[config.pillar]
  const Icon = config.icon
  const primaryCta = config.primaryCta ?? 'Free quote'
  const primaryHref = config.primaryHref ?? '/en/contact'
  const finalTitle = config.finalTitle ?? 'Talk to us'
  const finalText =
    config.finalText ??
    'Free quote within 24 hours. Scope, price and timeline upfront. No commitment.'
  const breadcrumbName = config.breadcrumbName ?? config.h1Lead

  return (
    <>
      <SchemaOrg schema={buildOrganization('en')} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: config.hubName, url: config.hubHref },
          { name: breadcrumbName, url: currentUrl },
        ])}
      />
      {config.faq && config.faq.length > 0 && (
        <SchemaOrg schema={buildFAQPage(config.faq)} />
      )}
      {config.extraSchemas?.map((schema, i) => (
        <SchemaOrg key={i} schema={schema} />
      ))}

      {/* ─── Hero ─── */}
      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-6" style={{ background: s.iconBg, border: `1px solid ${s.iconBorder}` }}>
            <Icon size={24} style={{ color: s.color }} />
          </div>
          <GradTag>{config.tag}</GradTag>
          <h1 className="text-[clamp(1.9rem,4.6vw,3.75rem)] font-bold tracking-tight leading-[1.1] mt-4 mb-5">
            {config.h1Lead}{' '}
            <GradText as="span">{config.h1Highlight}</GradText>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-[720px] mx-auto mb-9">
            {config.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <LiquidMetalButton href={primaryHref} size="lg">
              {primaryCta} <ArrowRight size={16} />
            </LiquidMetalButton>
            {config.secondaryCta && config.secondaryHref && (
              <Link
                href={config.secondaryHref}
                className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-text-secondary hover:text-text"
              >
                {config.secondaryCta} <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      {config.stats && config.stats.length > 0 && (
        <section className="border-y border-border py-10 sm:py-14" style={{ background: 'var(--bg-card)' }}>
          <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {config.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold text-text mb-1">{stat.value}</p>
                <p className="text-text-secondary text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Problem block ─── */}
      {config.problem && (
        <section className="py-20 sm:py-24">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-12">
              <GradTag>The problem</GradTag>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">{config.problem.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {config.problem.items.map((item) => (
                <div key={item.title} className="rounded-xl p-5 border border-border" style={{ background: 'var(--bg-card)' }}>
                  <h3 className="font-bold mb-2 text-text">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── What you get (bullets) ─── */}
      <section className="py-20 sm:py-24" style={{ background: config.problem ? 'var(--bg-card)' : undefined }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <GradTag>What you get</GradTag>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-3">
              The work, in plain English
            </h2>
            <p className="text-text-secondary text-base max-w-[640px] mx-auto leading-relaxed">
              No vague promises. Every line below is what we actually ship on this engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.bullets.map((b) => (
              <div key={b.title} className="rounded-xl p-5 border flex flex-col" style={{ background: s.bg, borderColor: s.border }}>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full mb-3" style={{ background: s.iconBg, border: `1px solid ${s.iconBorder}` }}>
                  <Check size={14} style={{ color: s.color }} />
                </span>
                <h3 className="font-bold mb-2">{b.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      {config.process && config.process.length > 0 && (
        <section className="py-20 sm:py-24 border-y border-border" style={{ background: 'var(--bg)' }}>
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-12">
              <GradTag>How we work</GradTag>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">From kickoff to handover</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {config.process.map((step, i) => (
                <div key={step.title} className="rounded-xl p-5 border border-border" style={{ background: 'var(--bg-card)' }}>
                  <p className="text-xs font-bold tracking-widest text-text-muted mb-2">
                    STEP {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Pricing ─── */}
      {config.pricing && config.pricing.tiers.length > 0 && (
        <section className="py-20 sm:py-24" style={{ background: 'var(--bg-card)' }}>
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-12">
              <GradTag>Pricing</GradTag>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-3">
                {config.pricing.title ?? 'Three packages, one fixed quote'}
              </h2>
              {config.pricing.subtitle && (
                <p className="text-text-secondary text-base max-w-[640px] mx-auto leading-relaxed">
                  {config.pricing.subtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {config.pricing.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="relative rounded-2xl p-7 border flex flex-col"
                  style={{
                    background: tier.highlighted ? s.bg : 'var(--bg)',
                    borderColor: tier.highlighted ? s.color : 'var(--border)',
                    boxShadow: tier.highlighted ? `0 0 0 1px ${s.color}` : undefined,
                  }}
                >
                  {tier.highlighted && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{ background: s.color, color: '#0A0A0A' }}
                    >
                      Most popular
                    </span>
                  )}
                  <p className="text-text-muted text-xs font-bold tracking-widest uppercase mb-2">
                    {tier.name}
                  </p>
                  <p className="text-3xl font-bold text-text mb-1">{tier.price}</p>
                  {tier.cadence && <p className="text-text-muted text-xs mb-4">{tier.cadence}</p>}
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">{tier.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
                        <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: s.color }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier.ctaHref ?? '/en/contact'}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{
                      background: tier.highlighted ? s.color : 'transparent',
                      color: tier.highlighted ? '#0A0A0A' : s.color,
                      border: `1px solid ${s.color}`,
                    }}
                  >
                    {tier.ctaLabel ?? 'Get a quote'} <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>

            {config.pricing.note && (
              <p className="text-center text-text-muted text-xs mt-8 max-w-[700px] mx-auto leading-relaxed">
                {config.pricing.note}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─── Comparison table ─── */}
      {config.comparison && (
        <section className="py-20 sm:py-24 border-y border-border">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-10">
              <GradTag>Compare</GradTag>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-3">
                {config.comparison.title}
              </h2>
              {config.comparison.subtitle && (
                <p className="text-text-secondary text-base max-w-[640px] mx-auto leading-relaxed">
                  {config.comparison.subtitle}
                </p>
              )}
            </div>
            <div className="overflow-x-auto rounded-2xl border border-border" style={{ background: 'var(--bg-card)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-4 font-bold text-text-muted text-xs tracking-widest uppercase">
                      Criterion
                    </th>
                    {config.comparison.headers.map((h, i) => (
                      <th key={h} className="text-left px-5 py-4 font-bold text-xs tracking-widest uppercase" style={{ color: i === 0 ? s.color : 'var(--text-muted)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {config.comparison.rows.map((row, ri) => (
                    <tr key={row.label} className={ri < config.comparison!.rows.length - 1 ? 'border-b border-border' : ''}>
                      <td className="px-5 py-4 font-semibold text-text-secondary">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className="px-5 py-4"
                          style={{
                            background: row.emphasizeColumn === i ? s.bg : undefined,
                            color: row.emphasizeColumn === i ? s.color : 'var(--text)',
                            fontWeight: row.emphasizeColumn === i ? 600 : 400,
                          }}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ─── Extra slot ─── */}
      {config.extra}

      {/* ─── Testimonials ─── */}
      {config.testimonials && config.testimonials.length > 0 && (
        <section className="py-20 sm:py-24" style={{ background: 'var(--bg-card)' }}>
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-12">
              <GradTag>Testimonials</GradTag>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">What clients say</h2>
            </div>
            <div className={`grid grid-cols-1 ${config.testimonials.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-5`}>
              {config.testimonials.map((t) => (
                <div key={t.author} className="rounded-2xl p-7 border border-border flex flex-col" style={{ background: 'var(--bg)' }}>
                  <Quote size={20} className="mb-4 flex-shrink-0" style={{ color: s.color }} />
                  <p className="text-text-secondary leading-relaxed text-[15px] mb-5 flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-text font-bold text-sm">{t.author}</p>
                  <p className="text-text-muted text-xs">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ─── */}
      {config.faq && config.faq.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="max-w-[820px] mx-auto px-6">
            <div className="text-center mb-10">
              <GradTag>FAQ</GradTag>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">Common questions</h2>
            </div>
            <ul className="space-y-3">
              {config.faq.map(({ question, answer }) => (
                <li key={question}>
                  <details className="group rounded-xl border border-border p-4 sm:p-5 transition-colors hover:border-[var(--text-muted)]" style={{ background: 'var(--bg-card)' }}>
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
      )}

      {/* ─── Bridge to sibling pillars ─── */}
      {config.bridge && config.bridge.links.length > 0 && (
        <section className="py-20 sm:py-24 border-y border-border" style={{ background: 'var(--bg-card)' }}>
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-10">
              <GradTag>Going further</GradTag>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">{config.bridge.title}</h2>
              {config.bridge.subtitle && (
                <p className="text-text-secondary text-base max-w-[640px] mx-auto leading-relaxed mt-3">
                  {config.bridge.subtitle}
                </p>
              )}
            </div>
            <div className={`grid grid-cols-1 ${config.bridge.links.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
              {config.bridge.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-xl border border-border p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--text-muted)]"
                  style={{ background: 'var(--bg)' }}
                >
                  <p className="font-bold text-text mb-2 flex items-center gap-1.5">
                    {link.label}
                    <ArrowRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">{link.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Final CTA ─── */}
      <section className="py-20 sm:py-24 border-t border-border text-center" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{finalTitle}</h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-7">{finalText}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <LiquidMetalButton href={primaryHref} size="lg">{primaryCta} <ArrowRight size={16} /></LiquidMetalButton>
            <Link href={config.hubHref} className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-text-secondary hover:text-text">
              Back to {config.hubName.toLowerCase()} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
