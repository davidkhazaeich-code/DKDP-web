import type { Metadata } from 'next'
import Link from 'next/link'
import { Globe, Search, Megaphone, Share2, Film, Presentation, Shield, Smartphone, ArrowRight, Check } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildOrganization } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Digital Agency Geneva · Web Design, SEO, Ads | DKDP',
  description:
    'Geneva-based digital agency. Web design, redesign, SEO, Google Ads, social media, video, GDPR compliance. Fixed quote, senior team, ships in weeks. Free site audit.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale',
      en: 'https://dkdp.ch/en/digital-agency',
      'x-default': 'https://dkdp.ch/agence-digitale',
    },
  },
  openGraph: {
    title: 'Digital Agency Geneva · Web, SEO, Ads | DKDP',
    description: 'The full digital stack for Geneva SMBs: web design, SEO, Google Ads, social, video, GDPR.',
    url: 'https://dkdp.ch/en/digital-agency',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
  },
}

const SERVICES = [
  { slug: 'web-design',           title: 'Web design',          icon: Globe,        desc: 'Custom websites built to convert and perform, on Next.js or headless CMS.' },
  { slug: 'website-redesign',     title: 'Website redesign',    icon: Globe,        desc: 'Migration without SEO loss, modern 2026 design, full speed and accessibility audit.' },
  { slug: 'app-development',      title: 'App development',     icon: Smartphone,   desc: 'iOS, Android, web apps and PWAs tailored to SMB workflows.' },
  { slug: 'seo',                  title: 'SEO & search',        icon: Search,       desc: 'Sustainable organic visibility on Google, Bing and AI search engines.' },
  { slug: 'google-ads',           title: 'Google Ads',          icon: Megaphone,    desc: 'Profitable paid campaigns on Google, Bing and YouTube. Full-funnel ROI reporting.' },
  { slug: 'social-media',         title: 'Social media',        icon: Share2,       desc: 'Consistent, engaging social presence on LinkedIn, Instagram, TikTok.' },
  { slug: 'video-production',     title: 'Video production',    icon: Film,         desc: 'Brand films, product videos, training content. From script to final cut.' },
  { slug: 'marketing-consulting', title: 'Marketing consulting',icon: Presentation, desc: 'Digital strategy, growth experiments, hands-on guidance for your team.' },
  { slug: 'gdpr-cookies',         title: 'GDPR & cookies',      icon: Shield,       desc: 'Legal compliance, cookie consent, data protection without breaking analytics.' },
]

export default function EnDigitalAgencyHubPage() {
  return (
    <>
      <SchemaOrg schema={buildOrganization()} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Digital agency', url: '/en/digital-agency' },
        ])}
      />

      {/* ─── Hero ─── */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <GradTag>Digital agency · Geneva</GradTag>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight leading-[1.08] mt-4 mb-5">
            Websites, SEO and ads <br className="hidden sm:inline" />
            <GradText as="span">that pay back.</GradText>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-[700px] mx-auto mb-9">
            From a single landing page to a full headless rebuild, DKDP runs the digital stack
            for Geneva-based SMBs. Fixed quote, senior team, ships in weeks, no agency middlemen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <LiquidMetalButton href="/en/contact" size="lg">Free quote <ArrowRight size={16} /></LiquidMetalButton>
            <Link href="/en/digital-agency/web-design/site-audit" className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-text-secondary hover:text-text">
              Free site audit <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Services grid ─── */}
      <section className="py-16 sm:py-20 border-y border-border" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <GradTag>Services</GradTag>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-3">A full-stack digital team</h2>
            <p className="text-text-secondary text-base max-w-[640px] mx-auto leading-relaxed">
              Pick a single service or combine several: we deliver as one team, with one timeline and one fixed quote.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map(({ slug, title, icon: Icon, desc }) => (
              <Link
                key={slug}
                href={`/en/digital-agency/${slug}`}
                className="group flex flex-col gap-3 rounded-xl p-5 border transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(124,58,237,0.05)', borderColor: 'rgba(124,58,237,0.18)' }}
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}>
                  <Icon size={18} style={{ color: '#A78BFA' }} />
                </div>
                <h3 className="font-bold text-[15px]">{title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                <span className="mt-auto pt-2 inline-flex items-center gap-1 text-xs font-semibold transition-transform group-hover:translate-x-1" style={{ color: '#A78BFA' }}>
                  Learn more <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why us ─── */}
      <section className="py-20 sm:py-24">
        <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <GradTag>Why DKDP</GradTag>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4">
              Senior craft, no middlemen
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-4">
              You are not handed off to a project manager who relays to an off-shore team.
              Every page is designed and coded by the same senior people you talked to in the first call.
            </p>
            <p className="text-text-secondary text-base leading-relaxed">
              We work weekly in plain sight: clear demos, transparent progress, your feedback baked
              into the next iteration. No surprise invoice, no missed deadline.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              { title: 'Fixed price, no scope creep', text: 'The quote you sign at kickoff is the invoice you pay at launch.' },
              { title: 'Weekly demos, not slide decks', text: 'You see the real product every week, not pretty mockups that never ship.' },
              { title: 'Built for Core Web Vitals and AI search', text: 'Fast, accessible, citable. Optimised for Google, Bing and the new AI engines.' },
              { title: 'Stays reachable after launch', text: 'Need a tweak in six months? Send a message. We are still on the other end.' },
            ].map((b) => (
              <li key={b.title} className="flex gap-3">
                <span className="flex-shrink-0 mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full" style={{ background: 'rgba(167,139,250,0.15)' }}>
                  <Check size={13} style={{ color: '#A78BFA' }} />
                </span>
                <div>
                  <h3 className="font-semibold mb-0.5 text-[15px]">{b.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 sm:py-24 border-t border-border text-center" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Start with a free quote
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-7">
            Tell us what you are trying to ship. We will reply within 24 hours with scope, price and timeline.
          </p>
          <LiquidMetalButton href="/en/contact" size="lg">
            Get my free quote <ArrowRight size={16} />
          </LiquidMetalButton>
        </div>
      </section>
    </>
  )
}
