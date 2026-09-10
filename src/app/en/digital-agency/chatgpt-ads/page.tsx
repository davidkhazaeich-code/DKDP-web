import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, ShieldCheck, Clock, Search, Megaphone } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { getArticlesByTopic, CHATGPT_TOPIC } from '@/lib/blog/topics'
import { violet } from '@/lib/tokens'
import { localizedPath } from '@/i18n/slugs'
import { FAQ } from '@/app/agence-digitale/chatgpt-ads/_components/copy'
import { ChatMockHero } from '@/app/agence-digitale/chatgpt-ads/_components/ChatMockHero'
import { HowItWorks } from '@/app/agence-digitale/chatgpt-ads/_components/HowItWorks'
import { RolloutTimeline } from '@/app/agence-digitale/chatgpt-ads/_components/RolloutTimeline'
import { PlanVisibilityGrid } from '@/app/agence-digitale/chatgpt-ads/_components/PlanVisibilityGrid'
import { ChannelComparison } from '@/app/agence-digitale/chatgpt-ads/_components/ChannelComparison'
import { BudgetSimulator } from '@/app/agence-digitale/chatgpt-ads/_components/BudgetSimulator'
import { SectorsGrid } from '@/app/agence-digitale/chatgpt-ads/_components/SectorsGrid'
import { MethodSteps } from '@/app/agence-digitale/chatgpt-ads/_components/MethodSteps'
import { PricingGrid } from '@/app/agence-digitale/chatgpt-ads/_components/PricingGrid'
import { ExpertBlock } from '@/app/agence-digitale/chatgpt-ads/_components/ExpertBlock'
import { ComplianceTiles } from '@/app/agence-digitale/chatgpt-ads/_components/ComplianceTiles'
import { RomandieCoverage } from '@/app/agence-digitale/chatgpt-ads/_components/RomandieCoverage'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then((m) => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then((m) => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then((m) => m.FAQSection))
const ArticleCarousel = dynamic(() => import('@/components/sections/ArticleCarousel').then((m) => ({ default: m.ArticleCarousel })))

/**
 * English mirror of /agence-digitale/chatgpt-ads (created 10 September 2026).
 * Same bilingual components, same facts sheet (`docs/chatgpt-ads-facts-2026-09-10.md`).
 */

const lp = (fr: string) => localizedPath(fr, 'en')
const CONTACT = `${lp('/contact')}?service=service-digital`

export const metadata: Metadata = {
  title: 'ChatGPT Ads agency Geneva & Switzerland | DKDP',
  description:
    'ChatGPT Ads for Swiss SMEs: Ads Manager account, sponsored cards, 30-day pilot, conversion tracking. Geneva agency, zero media commission.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/chatgpt-ads',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/chatgpt-ads',
      en: 'https://dkdp.ch/en/digital-agency/chatgpt-ads',
      'x-default': 'https://dkdp.ch/agence-digitale/chatgpt-ads',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/chatgpt-ads.png', width: 1376, height: 768, alt: 'ChatGPT Ads: advertising inside ChatGPT for SMEs in Geneva and French-speaking Switzerland, by DKDP' }],
  },
}

const color = violet.color
const bg = violet.bg
const border = violet.border

const STATS = [
  { v: '24 August 2026', l: 'Ads live in Switzerland', sub: '31 European markets' },
  { v: '31 August 2026', l: 'Self-serve Ads Manager', sub: 'Swiss businesses accepted' },
  { v: 'CHF 20', l: 'Minimum daily budget', sub: 'Account billed in francs, per OpenAI' },
  { v: 'CHF 0', l: 'Media commission', sub: '100% of the budget goes to OpenAI' },
]

const VEILLE_MAX = 8

export default function ChatGptAdsPageEN() {
  const articles = getArticlesByTopic(CHATGPT_TOPIC, VEILLE_MAX)

  return (
    <main>
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'ChatGPT Ads advertising, French-speaking Switzerland',
          url: '/en/digital-agency/chatgpt-ads',
          description:
            'Creation and management of ChatGPT Ads campaigns for SMEs in Geneva and French-speaking Switzerland: Ads Manager account setup, sponsored cards, conversion measurement, 30-day pilot then monthly management, with no commission on media spend.',
          serviceType: 'ChatGPT Ads advertising',
          priceFrom: 1200,
          priceSpecDescription: '30-day pilot from CHF 1\'200, monthly management from CHF 450',
          lang: 'en',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ.en)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: 'https://dkdp.ch/en' },
          { name: 'Digital agency', url: 'https://dkdp.ch/en/digital-agency' },
          { name: 'ChatGPT Ads', url: 'https://dkdp.ch/en/digital-agency/chatgpt-ads' },
        ])}
      />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href={lp('/agence-digitale')} className="text-text-muted text-sm hover:text-text transition-colors">
                Digital agency
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>ChatGPT Ads</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">ChatGPT Ads Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Your business inside ChatGPT&apos;s answer, right when the customer{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>decides</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  Since 24 August 2026 ChatGPT shows ads in Switzerland, and OpenAI&apos;s Ads Manager has been open to Swiss businesses since 31 August. DKDP, a Geneva agency, opens this channel for SMEs across French-speaking Switzerland: Ads Manager account, sponsored cards, conversion measurement, and a 30-day pilot before you commit one more franc. No media commission, account in your name.
                </p>
                <HeroPills
                  items={[
                    { label: 'Switzerland: open since 31.08.2026', Icon: CheckCircle2 },
                    { label: 'Zero media commission', Icon: ShieldCheck },
                    { label: '30-day pilot', Icon: Clock },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href={CONTACT} size="lg">Launch a ChatGPT Ads campaign →</LiquidMetalButton>
                  <Link href="#simulateur" className="text-sm text-text-muted hover:text-text transition-colors">
                    Estimate my budget ↓
                  </Link>
                </div>
              </div>
              <ChatMockHero lang="en" />
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Sourced figures ── */}
      <section className="py-12 border-b border-border" aria-label="ChatGPT Ads in Switzerland, key facts">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color }}>{s.v}</p>
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
          { label: 'How it works', href: '#fonctionnement' },
          { label: 'Audience', href: '#audience' },
          { label: 'Comparison', href: '#comparatif' },
          { label: 'Simulator', href: '#simulateur' },
          { label: 'Who it is for', href: '#pour-qui' },
          { label: 'Method', href: '#methode' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Launch a campaign', href: CONTACT }}
        accentColor="#A78BFA"
        accentBg="rgba(124,58,237,0.18)"
        accentBorder="rgba(124,58,237,0.30)"
      />

      {/* ── How it works ── */}
      <section id="fonctionnement" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="max-w-3xl mb-12">
              <GradTag className="mb-4">How it works</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-5">
                How advertising inside ChatGPT works
              </h2>
              <p className="text-text-secondary leading-relaxed">
                A ChatGPT ad is not triggered by a keyword but by a conversation. The person explains what they want, ChatGPT answers, and below the answer a sponsored card offers your service if it matches the context. You provide context hints, a title, copy, an image and a landing page; OpenAI picks the ad through a relevance-weighted second-price auction. Ads run on a system separate from the model: they never change what ChatGPT answers.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <HowItWorks lang="en" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section id="deploiement" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-16 items-end mb-12">
              <div>
                <GradTag className="mb-4">Timeline</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  Seven months from the first test to Swiss SMEs getting in
                </h2>
              </div>
              <p className="text-text-secondary leading-relaxed">
                OpenAI tested ads in the United States in February 2026, opened a self-serve Ads Manager in May, then announced 31 European markets on 18 August. Swiss businesses have been able to create their account since 31 August. This is when a channel is cheap to enter: few Swiss-French advertisers, a second-price auction, and time to learn before the competition shows up.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <RolloutTimeline lang="en" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Audience ── */}
      <section id="audience" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Audience</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Who sees your ads inside ChatGPT, plan by plan
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                Ads only appear for users on the Free and Go plans. Plus, Pro, Business, Enterprise and Edu subscribers never see a sponsored card, nor do users under 18. This detail decides everything: a consumer offer speaks to a very wide audience, a B2B offer often targets decision-makers who pay for an ad-free plan.
              </p>
              <p className="text-text-secondary leading-relaxed">
                A 30-day pilot measures exactly how much audience is left for your business, before any budget decision.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <PlanVisibilityGrid lang="en" />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section id="comparatif" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <GradTag className="mb-4">Comparison</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4">
                Google Ads or ChatGPT Ads: which one for your Swiss SME?
              </h2>
              <p className="text-text-secondary leading-relaxed">
                The two channels do not replace each other. Google captures demand already phrased as keywords, ChatGPT captures demand taking shape inside a conversation. Here is what changes, criterion by criterion, with DKDP&apos;s recommendation.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <ChannelComparison lang="en" />
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="text-center text-sm text-text-muted mt-6">
              Already running Google campaigns? See{' '}
              <Link href={lp('/agence-digitale/publicite-sea')} className="underline hover:text-text transition-colors">our Google Ads service in Geneva</Link>.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Simulator ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="simulateur" className="py-24 border-y border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <GradTag className="mb-4">Simulator</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4">
                  Estimate your ChatGPT Ads budget
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Set your monthly media budget, the cost-per-click range you assume and the share of clicks that become a contact. The simulator returns a range, never a promise: OpenAI publishes no benchmark, and the channel is less than a year old in Switzerland.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <BudgetSimulator lang="en" />
            </SectionReveal>
          </div>
        </section>
      </HeroBg>

      {/* ── Who it is for ── */}
      <section id="pour-qui" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-10 lg:gap-16 items-center mb-14">
            <SectionReveal>
              <GradTag className="mb-4">Who it is for</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Which businesses ChatGPT Ads works for in Geneva and French-speaking Switzerland
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                During its test period, OpenAI mainly accepts consumer categories: household goods, local services, travel and experiences, digital products and education. Regulated industries are either prohibited or subject to manual approval. DKDP checks your eligibility before you open an account.
              </p>
              <p className="text-text-secondary leading-relaxed">
                The right candidate has a clear offer, a precise landing page and a simple way to convert: book, call, order, sign up.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="relative aspect-[16/9] rounded-[16px] overflow-hidden border border-border">
                <Image
                  src="/images/services/dkdp-chatgpt-ads-secteurs-pme-romandes.webp"
                  alt="ChatGPT Ads for Swiss SMEs: retail, restaurants, local services, tourism and training, the industries that work in Geneva and French-speaking Switzerland in 2026"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </SectionReveal>
          </div>
          <SectionReveal delay={0.1}>
            <SectorsGrid lang="en" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Method ── */}
      <section id="methode" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Method</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Our ChatGPT Ads method in 5 steps
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                The same rigour as on Google Ads, adapted to OpenAI&apos;s rules: the account belongs to you, measurement is set up before the first card, and nothing is committed beyond the pilot without a report.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <MethodSteps lang="en" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Pricing ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-b border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-14">
                <GradTag className="mb-4">Pricing</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  ChatGPT Ads management pricing: clear, no commission
                </h2>
                <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                  Your media budget goes 100% to OpenAI, on your account. DKDP only bills the management, and always starts with a pilot.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <PricingGrid lang="en" />
            </SectionReveal>
          </div>
        </section>
      </HeroBg>

      {/* ── Who runs it ── */}
      <section id="expert" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <ExpertBlock lang="en" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Data ── */}
      <section id="conformite" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="max-w-3xl mb-12">
              <GradTag className="mb-4">Data</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-5">
                Data, privacy and Swiss data protection: what really happens
              </h2>
              <p className="text-text-secondary leading-relaxed">
                One question comes up at every scoping call: &ldquo;what about my customers&apos; conversations?&rdquo;. Here are OpenAI&apos;s rules as they apply in Switzerland, and what DKDP sets up on your side.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <ComplianceTiles lang="en" />
          </SectionReveal>
        </div>
      </section>

      {/* ── French-speaking Switzerland ── */}
      <section id="zone" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="relative aspect-[21/9] rounded-[20px] overflow-hidden border border-border mb-12">
              <Image
                src="/images/services/dkdp-chatgpt-ads-suisse-romande-villes.webp"
                alt="ChatGPT Ads French-speaking Switzerland: the Lake Geneva arc from Geneva to Montreux, the cities covered by the DKDP agency for advertising inside ChatGPT"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <RomandieCoverage lang="en" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Watch ── */}
      {articles.length > 0 && (
        <section className="py-20 bg-bg-card border-y border-border" aria-labelledby="veille-chatgpt-ads">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <GradTag className="mb-4">Watch</GradTag>
                  <h2 id="veille-chatgpt-ads" className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                    ChatGPT and OpenAI: what we follow
                  </h2>
                </div>
                <Link href={lp('/blog')} className="text-sm text-text-secondary hover:text-text transition-colors">
                  All articles →
                </Link>
              </div>
            </SectionReveal>
            <ArticleCarousel articles={articles} accentColor={color} accentBorder={border} lang="en" label="Articles about ChatGPT and OpenAI" />
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ.en} title="Your questions about ChatGPT Ads" lang="en" />
      </div>

      {/* ── Bridges ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              Icon: Megaphone,
              kicker: 'Complementary channel',
              title: 'Google Ads advertising',
              text: 'Demand already phrased: Search, Display, Performance Max, managed from Geneva with the same zero-commission rule.',
              href: lp('/agence-digitale/publicite-sea'),
              cta: 'See Google Ads',
            },
            {
              Icon: Search,
              kicker: 'No cost per click',
              title: 'SEO and visibility in AI answers',
              text: 'Being cited in Google and AI assistant answers without paying for each click: lasting presence, next to bought presence.',
              href: lp('/agence-digitale/seo'),
              cta: 'See SEO',
            },
          ].map((b) => (
            <SectionReveal key={b.href}>
              <Link
                href={b.href}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-7 border transition-all hover:-translate-y-0.5 duration-200 h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.03) 100%)',
                  borderColor: 'rgba(124,58,237,0.28)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0" style={{ background: bg, border: `1px solid ${border}` }}>
                    <b.Icon size={20} style={{ color }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>{b.kicker}</p>
                    <p className="text-text font-bold text-lg leading-tight">{b.title}</p>
                    <p className="text-text-muted text-[12.5px] mt-1 max-w-md">{b.text}</p>
                  </div>
                </div>
                <span
                  className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                  style={{ background: bg, color, border: `1px solid ${border}` }}
                >
                  {b.cta} <ChevronRight size={12} aria-hidden="true" />
                </span>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </section>

      <CTAFinal lang="en" />
    </main>
  )
}
