import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Clock,
  Users,
  ShieldCheck,
  BarChart2,
  Video,
  MapPin,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { TrustLine } from '@/components/ui/TrustLine'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { violet } from '@/lib/tokens'
import { AppLogoMarquee, SOCIAL_LOGOS, IA_LOGOS } from '@/components/ui/AppLogos'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))

// Inline English mirror of ./_components/PlatformGrid (FR component renders French).
function PlatformGrid() {
  const platforms = [
    {
      name: 'Instagram',
      color: '#E1306C',
      bg: 'rgba(225,48,108,0.10)',
      border: 'rgba(225,48,108,0.25)',
      useCase: 'Lifestyle, e-commerce, B2C',
      metric: '4.7% average engagement',
    },
    {
      name: 'LinkedIn',
      color: '#0A66C2',
      bg: 'rgba(10,102,194,0.10)',
      border: 'rgba(10,102,194,0.25)',
      useCase: 'B2B, recruitment, thought leadership',
      metric: '+320% organic reach',
    },
    {
      name: 'Facebook',
      color: '#1877F2',
      bg: 'rgba(24,119,242,0.10)',
      border: 'rgba(24,119,242,0.25)',
      useCase: 'Local community, ages 35-55',
      metric: 'Ads CPM -40% vs Google',
    },
    {
      name: 'TikTok',
      color: '#FF0050',
      bg: 'rgba(255,0,80,0.08)',
      border: 'rgba(255,0,80,0.22)',
      useCase: 'Virality, ages 18-35, discovery',
      metric: '8.5% completion rate',
    },
    {
      name: 'YouTube',
      color: '#FF0000',
      bg: 'rgba(255,0,0,0.08)',
      border: 'rgba(255,0,0,0.22)',
      useCase: 'Video SEO, tutorials, brand film',
      metric: '2nd largest search engine worldwide',
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
      {platforms.map((p) => (
        <div
          key={p.name}
          className="p-4 rounded-[12px]"
          style={{ background: p.bg, border: `1px solid ${p.border}` }}
        >
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: p.color }}>
            {p.name}
          </p>
          <p className="text-text text-[12px] font-semibold leading-snug mb-1">{p.useCase}</p>
          <p className="text-text-muted text-[11px]">{p.metric}</p>
        </div>
      ))}
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Social Media Geneva & French-speaking Switzerland · Instagram, LinkedIn · DKDP',
  description:
    'Social media agency in Geneva: community management, content creation and Social Ads for SMBs. Instagram, LinkedIn, TikTok, YouTube.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/social-media',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/reseaux-sociaux',
      en: 'https://dkdp.ch/en/digital-agency/social-media',
      'x-default': 'https://dkdp.ch/agence-digitale/reseaux-sociaux',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/reseaux-sociaux-agence.png', width: 1376, height: 768, alt: 'Social media management Geneva DKDP' }],
  },
}


const FAQ = [
  {
    question: 'How much does social media management by an agency in Geneva cost?',
    answer:
      'A social media management package at DKDP starts at CHF 450/month for a single platform. A presence across 3 networks with video content and Meta Ads is around CHF 900/month. The Full Social package at CHF 1\'600/month covers 5 platforms with 7-day community management.',
  },
  {
    question: 'Which social networks does DKDP work on?',
    answer:
      'DKDP manages Instagram, LinkedIn, Facebook, TikTok and YouTube. The choice of networks depends on your target audience. B2B in Geneva: LinkedIn is essential. B2C fashion or food: Instagram and TikTok. We only manage the networks that are relevant to your sector.',
  },
  {
    question: 'How often do you publish content?',
    answer:
      'Depending on the package chosen: from 12 posts per month (Starter package) to unlimited content for the Pro and Full Social packages. Consistency matters more than frequency: DKDP prioritises coherence and quality over volume.',
  },
  {
    question: 'Who creates the visuals and the copy?',
    answer:
      'DKDP creates the visuals (design, Reels, Stories) and writes the copy (captions, hashtags). We can also work from your own photos or videos. An editorial calendar is shared each month for approval before publishing.',
  },
  {
    question: 'Can you manage comments and private messages?',
    answer:
      'Yes. The community management included in our packages covers replies to comments and private messages within 2 hours on weekdays. For complex sales enquiries, we forward them to you with the full context.',
  },
  {
    question: 'Are Social Ads (advertising) included in the package?',
    answer:
      'The Pro package includes CHF 300 of managed Meta Ads budget. The Full Social package includes Ads management across all platforms. The media budget is always separate from the management fee and belongs to you.',
  },
  {
    question: 'How do we know if social media actually brings in clients?',
    answer:
      'DKDP sets up UTM links and tracking pixels to measure visits and conversions coming from social networks. The monthly report includes reach, engagement, clicks to the site and, where applicable, the leads or sales generated.',
  },
]

const BENEFITS = [
  {
    Icon: TrendingUp,
    value: '+180%',
    title: 'Engagement on the rise',
    desc: 'Our clients see their engagement increase by 180% on average within the first 3 months thanks to a content strategy tailored to each platform.',
  },
  {
    Icon: Clock,
    value: '12h/wk',
    title: 'Your time freed up',
    desc: 'Creating quality content takes 12 to 15 hours per week. DKDP handles everything so you can focus on your core business.',
  },
  {
    Icon: Users,
    value: 'x3.2',
    title: 'Amplified reach',
    desc: 'With a consistent multi-platform strategy, the reach of your messages is multiplied by 3 to 4 compared to ad hoc management.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Audit & strategy',
    desc: 'Analysis of your existing accounts, your audience and your competitors. A defined strategy per platform.',
  },
  {
    step: '02',
    title: 'Content identity',
    desc: 'Editorial charter, tone of voice, visual templates. Everything that makes your content recognisable.',
  },
  {
    step: '03',
    title: 'Monthly production',
    desc: 'Creation of visuals, copy, hashtags and scheduling within an approved editorial calendar.',
  },
  {
    step: '04',
    title: 'Publishing & community',
    desc: 'Publishing at optimal times, replies to comments, DM management, competitive monitoring.',
  },
  {
    step: '05',
    title: 'Analysis & optimisation',
    desc: 'Monthly performance report, A/B testing of formats, ongoing strategy adjustment.',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

export default function ReseauxSociauxPage() {
  return (
    <main>
      <SchemaOrg schema={buildService({ name: 'Social media management French-speaking Switzerland', url: '/en/digital-agency/social-media', description: 'Social media management for SMBs in Geneva. Strategy, content, community management and Social Ads.', lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Digital Agency', url: 'https://dkdp.ch/en/digital-agency' },
        { name: 'Social media', url: 'https://dkdp.ch/en/digital-agency/social-media' },
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
              <span className="text-sm" style={{ color }}>Social media</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Social media management Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Posts that <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>do the work</GradText>, not presence for the sake of it.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  Your community manager in Geneva: DKDP, a social media agency, manages your presence from A to Z. Strategy, content creation, publishing and community management. +180% average engagement in 3 months. You focus on your business, we handle the rest.
                </p>
                <HeroPills
                  items={[
                    { label: 'No commitment', Icon: CheckCircle2 },
                    { label: 'Monthly reporting', Icon: BarChart2 },
                    { label: 'Local production in Geneva', Icon: MapPin },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=service-digital" size="lg">Request a quote →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-text transition-colors">
                    Our method ↓
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="Social networks and AI tools we run">
                  <AppLogoMarquee
            logos={[...SOCIAL_LOGOS, ...IA_LOGOS.slice(0, 5)]}
            durationSeconds={144}
            size="md"
          />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}>
                  <Image
                    src="/images/services/dkdp-gestion-reseaux-sociaux-geneve.webp"
                    alt="Social media management in Geneva, two professionals analysing social media performance"
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
              { v: '+180%', l: 'Average engagement', sub: 'Over first 3 months' },
              { v: '5', l: 'Platforms managed', sub: 'Meta, LinkedIn, TikTok, YT...' },
              { v: '12h/wk', l: 'Freed up', sub: 'For your team' },
              { v: '2.7M', l: 'Cumulative impressions', sub: 'Active clients 2025/2026' },
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
          { label: 'Results', href: '#résultats' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'Process', href: '#process' },
          { label: 'Work', href: '#realisations' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: '/contact' }}
        accentColor="#A78BFA"
        accentBg="rgba(124,58,237,0.18)"
        accentBorder="rgba(124,58,237,0.30)"
      />

      {/* ── Notre approche ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Our approach</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Social media content creation for your business.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Posting for the sake of posting is pointless. DKDP builds an editorial strategy based on your target audience, your sector and your business goals. Every piece of content has a purpose: visibility, engagement, traffic or conversion.
              </p>
              <p className="text-text-secondary leading-relaxed">
                We work with your team to understand your company culture and your tone. The result is an authentic, consistent presence that truly reflects who you are.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Tailored content strategy',
                  'Creation of visuals and Reels/Stories videos',
                  'Monthly editorial calendar',
                  'Community management (moderation + replies)',
                  'Meta Ads and LinkedIn Ads advertising',
                  'Collaboration with local influencers',
                  'Monthly performance analysis',
                  'Crisis management and online reputation',
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

      {/* ── Le vrai problème ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">The real problem</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Are your social networks really working for you?
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                A presence on social media without a strategy is wasted time and money. Algorithms reward consistency, quality and engagement. Without these three pillars, your content disappears.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: TrendingUp, title: '90% of brands post without a defined strategy. The result: less than 2% average engagement', sub: 'Source: Sprout Social Index 2024' },
                  { Icon: Clock, title: '12 to 15 hours per week: that is the time needed to properly manage 3 social networks', sub: 'Source: HubSpot Social Media Report' },
                  { Icon: Users, title: '78% of consumers buy after following a brand on social media for at least 3 months', sub: 'Source: GlobalWebIndex 2024' },
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
                  Platforms managed by DKDP
                </p>
                <PlatformGrid />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Each platform is chosen according to your target audience. We only manage what truly pays off.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Bénéfices ── */}
      <section id="résultats" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Results</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                The concrete results of professional social media management.
              </h2>
            </div>
          </SectionReveal>
          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.20) 5%, #A78BFA 50%, rgba(124,58,237,0.20) 95%, transparent)' }}
            />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </div>
      </section>

      {/* ── Offres ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Community management packages Geneva: clear pricing.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Media budget not included in the packages. Each package is monthly and can be cancelled at any time.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Starter',
                price: 'CHF 450/month',
                duration: '1 platform',
                features: [
                  '12 posts/month',
                  'Weekly Stories',
                  'Caption + hashtag writing',
                  'Editorial calendar',
                  'Monthly report',
                ],
                cta: 'Get started',
                highlight: false,
              },
              {
                label: 'Pro',
                price: 'CHF 900/month',
                duration: '3 platforms',
                features: [
                  'Unlimited content',
                  'Reels and Stories included',
                  'Meta Ads included (CHF 300 budget)',
                  'Community management',
                  'Bi-monthly report',
                ],
                cta: 'Get started',
                highlight: true,
              },
              {
                label: 'Full Social',
                price: 'CHF 1\'600/month',
                duration: '5 platforms',
                features: [
                  'Unlimited content, all formats',
                  'Multi-platform Ads',
                  '7-day community management',
                  'Influencer seeding',
                  'Quarterly strategy',
                ],
                cta: 'Let us discuss your project',
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
                      href="/contact?service=service-digital"
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
                How our social media agency manages your networks.
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

      {/* ── Témoignages ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="realisations" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Testimonials</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                What our clients say.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'In 3 months, our Instagram account grew from 800 to 4\'200 engaged followers. But above all, we generate 8 to 10 leads per week via DM. The ROI is real.',
                name: 'Founder',
                company: 'Lifestyle brand, Geneva',
              },
              {
                quote: 'DKDP has managed our networks for 8 months. Our LinkedIn engagement has been multiplied by 5. Our prospects know our name even before we call them.',
                name: 'Sales Director',
                company: 'B2B SMB, Vaud',
              },
              {
                quote: 'We had tried to do it in-house. It was time-consuming and the results were not there. DKDP changed everything in 60 days.',
                name: 'Communications Manager',
                company: '50-person company',
              },
            ].map((t, i) => (
              <SectionReveal key={t.company} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] p-7 border"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-3.5 h-3.5 fill-current" style={{ color }} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-6">&quot;{t.quote}&quot;</p>
                  <div>
                    <p className="text-text font-semibold text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs mt-0.5">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Engagements ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Our commitments
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { Icon: ShieldCheck, title: '100% original content', desc: 'No generic content or stock photos. Every post is created specifically for your brand and your audience.' },
                  { Icon: BarChart2, title: 'Detailed monthly report', desc: 'Reach, impressions, engagement, followers, clicks: all the metrics that matter, clearly explained.' },
                  { Icon: Clock, title: 'Calendar approved in advance', desc: 'You receive next month\'s editorial calendar for approval. You keep full editorial control.' },
                  { Icon: Users, title: 'Community responsiveness', desc: 'DKDP replies to your comments and messages within 2 hours on weekdays. Your community is always taken care of.' },
                ].map((g, i) => (
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

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Your questions about social media management" lang="en" />
      </div>

      {/* ── Bridge SEO ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/agence-digitale/creation-video', 'en')}
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
                  <Video size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Complementary service</p>
                  <p className="text-text font-bold text-lg leading-tight">Professional video production</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Social networks perform 2.7x better with video. Discover our professional video production service to amplify your presence.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Watch the video <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal lang="en" />
    </main>
  )
}
