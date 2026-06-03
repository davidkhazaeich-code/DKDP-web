import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, type LucideIcon } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildOrganization, buildFAQPage } from '@/lib/schema'

export type ServicePagePillar = 'agence' | 'ia' | 'formation' | 'apropos'

export type ServicePageConfig = {
  pillar: ServicePagePillar
  /** Breadcrumb label for the parent hub (e.g. "Digital agency"). */
  hubName: string
  /** Hub href (e.g. "/en/digital-agency"). */
  hubHref: string
  /** Tag chip above H1 (e.g. "Web design · Geneva"). */
  tag: string
  /** H1 — keep the second part for the gradient highlight. */
  h1Lead: string
  h1Highlight: string
  /** Hero subtitle paragraph. */
  subtitle: string
  /** Hero icon. */
  icon: LucideIcon
  /** Primary CTA in hero (text). Default: "Free quote". */
  primaryCta?: string
  primaryHref?: string
  /** Secondary CTA in hero (text + href). */
  secondaryCta?: string
  secondaryHref?: string
  /** "What you get" bullets (3-6 items). */
  bullets: { title: string; text: string }[]
  /** Optional outcomes / stats block (4 numbers). */
  stats?: { value: string; label: string }[]
  /** "How we work" 4-step process. */
  process?: { title: string; text: string }[]
  /** FAQ items for SEO/GEO. */
  faq?: { question: string; answer: string }[]
  /** Page breadcrumb name (last item, defaults to h1Lead). */
  breadcrumbName?: string
  /** Final CTA section text override. */
  finalTitle?: string
  finalText?: string
  /** Optional extra section rendered between bullets and CTA. */
  extra?: ReactNode
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
      <SchemaOrg schema={buildOrganization()} />
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

      {/* ─── Stats (optional) ─── */}
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

      {/* ─── What you get (bullets) ─── */}
      <section className="py-20 sm:py-24">
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

      {/* ─── Process (optional) ─── */}
      {config.process && config.process.length > 0 && (
        <section className="py-20 sm:py-24 border-y border-border" style={{ background: 'var(--bg-card)' }}>
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-12">
              <GradTag>How we work</GradTag>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">From kickoff to handover</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {config.process.map((step, i) => (
                <div key={step.title} className="rounded-xl p-5 border border-border" style={{ background: 'var(--bg)' }}>
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

      {/* ─── Extra slot ─── */}
      {config.extra}

      {/* ─── FAQ (optional) ─── */}
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

      {/* ─── Final CTA ─── */}
      <section className="py-20 sm:py-24 border-t border-border text-center" style={{ background: 'var(--bg-card)' }}>
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
