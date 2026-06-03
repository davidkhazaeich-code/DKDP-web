import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  Globe, Search, Megaphone, Share2, Film, Presentation, Shield, Smartphone,
  ChevronRight, Zap, Users, BarChart2, FileText, Award,
  EyeOff, AlertTriangle, TrendingDown, Target, Rocket,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildBreadcrumbList, buildFAQPage, buildOrganization } from '@/lib/schema'
import { FunnelDiagram } from '@/app/agence-digitale/_components/FunnelDiagram'
import { HeroVisual } from '@/app/agence-digitale/_components/HeroVisual'
import { violet } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS, DESIGN_WEB_LOGOS, PRODUCTIVITE_LOGOS, SOCIAL_LOGOS } from '@/components/ui/AppLogos'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const SiteAuditBlock = dynamic(() => import('@/components/sections/SiteAuditBlock').then(m => ({ default: m.SiteAuditBlock })))

export const metadata: Metadata = {
  title: 'Digital Agency Geneva and Switzerland · Web, SEO, Ads · DKDP',
  description: 'Digital agency in Geneva. Web design, SEO, Google Ads and social media for SMBs in French-speaking Switzerland. 100+ websites delivered, free quote in 48 hours.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale',
      en: 'https://dkdp.ch/en/digital-agency',
      'x-default': 'https://dkdp.ch/agence-digitale',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/agence-digitale.png', width: 1376, height: 768, alt: 'Digital agency Geneva, DKDP' }],
  },
}

const SERVICES = [
  {
    Icon: Globe, title: 'Web design', href: '/en/digital-agency/web-design',
    description: 'Custom websites, fast and conversion-optimised. From landing pages to complex e-commerce platforms.',
    badge: 'Best seller',
    image: '/images/services/dkdp-agence-creation-web.webp',
  },
  {
    Icon: Smartphone, title: 'App development', href: '/en/digital-agency/app-development',
    description: 'Custom iOS, Android, web apps and PWAs. A single point of contact from wireframe to store.',
    badge: 'New',
    image: '/images/services/dkdp-developpement-application-service.webp',
  },
  {
    Icon: Search, title: 'SEO and AI search', href: '/en/digital-agency/seo',
    description: 'Content strategy and technical optimisation to dominate Google and AI search engines on your target keywords.',
    badge: 'Popular',
    image: '/images/services/dkdp-agence-seo.webp',
  },
  {
    Icon: Megaphone, title: 'Google Ads', href: '/en/digital-agency/google-ads',
    description: 'Profitable search and display campaigns, with precise ROI and conversion tracking.',
    badge: null,
    image: '/images/services/dkdp-agence-sea.webp',
  },
  {
    Icon: Share2, title: 'Social media', href: '/en/digital-agency/social-media',
    description: 'Consistent presence on Instagram, LinkedIn, Facebook. Content, community management, ads.',
    badge: null,
    image: '/images/services/dkdp-agence-reseaux-sociaux.webp',
  },
  {
    Icon: Film, title: 'Video production', href: '/en/digital-agency/video-production',
    description: 'Brand films, client testimonials, reels and short-form content for your social channels.',
    badge: null,
    image: '/images/services/dkdp-agence-creation-video.webp',
  },
  {
    Icon: Presentation, title: 'Marketing consulting', href: '/en/digital-agency/marketing-consulting',
    description: 'Audit of your digital presence, strategy definition and long-term hands-on guidance.',
    badge: null,
    image: '/images/services/dkdp-agence-consulting.webp',
  },
  {
    Icon: Shield, title: 'GDPR and cookies', href: '/en/digital-agency/gdpr-cookies',
    description: 'Legal compliance, privacy policy, cookie banner and processing register for Swiss businesses.',
    badge: null,
    image: '/images/services/dkdp-agence-rgpd.webp',
  },
]

const STATS = [
  { value: '100+', label: 'Websites delivered' },
  { value: '10+ yrs', label: 'Of experience' },
  { value: '4.9/5', label: 'Client satisfaction' },
]

const WHY = [
  {
    Icon: Zap, title: 'A single point of contact',
    desc: 'No middleman project manager. You speak directly with the expert doing the work, which avoids misunderstandings and speeds up decisions.',
  },
  {
    Icon: BarChart2, title: 'Measurable results',
    desc: 'Every action is tracked. We show you concrete numbers: traffic, leads, conversions. No empty reports.',
  },
  {
    Icon: Users, title: 'A tailored approach',
    desc: 'No templates or packaged solutions. Every project is designed around your objectives, your audience and your market.',
  },
]

const FAQ_AGENCE_EN = [
  {
    question: 'How much does a website cost in Geneva?',
    answer: "A showcase website for an SMB sits between CHF 3'500 and CHF 8'000 depending on complexity. A CMS-based site is between CHF 4'500 and CHF 12'000. E-commerce starts at CHF 6'000. These ranges cover design, development, on-page SEO and tool training.",
  },
  {
    question: 'What is the difference between SEO and GEO?',
    answer: 'SEO (Search Engine Optimisation) optimises a site to appear in traditional Google results. GEO (Generative Engine Optimisation) optimises content to be cited by AI engines such as ChatGPT, Perplexity or Google AI Overviews. DKDP integrates both in every visibility strategy.',
  },
  {
    question: 'How much does corporate AI training cost in Geneva?',
    answer: "An AI training session (6-7 hours, up to 12 people) starts at CHF 1'500. 100% personalised programme based on the real tools and use cases of your company.",
  },
  {
    question: 'Does DKDP work with companies outside Geneva?',
    answer: 'Yes. DKDP supports companies across the canton of Geneva but also in Lausanne, Fribourg, Sion, Neuchatel and the whole of French-speaking Switzerland. English-speaking clients are served daily.',
  },
  {
    question: 'How long does it take to build a website with DKDP?',
    answer: 'A standard showcase site is delivered in 4 to 6 weeks. A custom CMS site takes 6 to 10 weeks. We provide a fixed quote upfront and stick to the agreed timeline.',
  },
  {
    question: 'Is DKDP compliant with GDPR and the Swiss nFADP?',
    answer: 'Yes. Every site built by DKDP includes a privacy policy compliant with the Swiss nFADP (formerly nLPD) and the EU GDPR: consent banner, processing register, legal notices.',
  },
  {
    question: 'Do you handle Google Ads management on top of website work?',
    answer: 'Yes. We run Google Ads campaigns (Search, Display, Performance Max, YouTube) with full tracking. Fixed management fee from CHF 400/month, ad spend on top, no margin on media. We can also work alongside your existing media agency.',
  },
  {
    question: 'Can you maintain a website built by another agency?',
    answer: 'Yes. We pick up sites built on WordPress, Webflow, Shopify, Squarespace, Next.js, Astro or custom stacks. Full audit first, fixed-quote remediation, then a monthly retainer if you want ongoing maintenance.',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

const badgeColors: Record<string, { background: string; color: string; border: string }> = {
  'Best seller': { background: 'rgba(10,10,10,0.84)', color: '#D8B4FE', border: '1px solid rgba(167,139,250,0.70)' },
  'Popular':     { background: 'rgba(10,10,10,0.84)', color: '#C4B5FD', border: '1px solid rgba(124,58,237,0.65)' },
}

export default function EnDigitalAgencyPage() {
  return (
    <main>
      <SchemaOrg schema={buildOrganization('en')} />
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'Digital Agency Geneva',
          url: '/en/digital-agency',
          description: 'Web design, SEO, Google Ads and social media services for SMBs in Geneva and across French-speaking Switzerland.',
          serviceType: 'Digital marketing agency',
          priceFrom: 3500,
          lang: 'en',
          extraAreas: ['Zurich', 'Basel', 'Bern'],
        })}
      />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: '/en' },
        { name: 'Digital agency', url: '/en/digital-agency' },
      ])} />
      <SchemaOrg schema={buildFAQPage(FAQ_AGENCE_EN)} />

      <HeroBg
        blob1="rgba(124,58,237,0.14)"
        blob2="rgba(124,58,237,0.07)"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Digital agency Geneva and French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Your online presence, built to <GradText as="span">bring in real clients</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  Web agency dedicated to SMBs in French-speaking Switzerland. From website creation to SEO and paid campaigns, we build a coherent strategy that generates real results.
                </p>
                <HeroPills
                  items={[
                    { label: 'Fixed quote in 48 hours', Icon: FileText },
                    { label: 'Tailored to SMBs', Icon: Target },
                    { label: '10+ years experience', Icon: Award },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton href="/en/digital-agency/web-design/quote" size="lg">Estimate my project →</LiquidMetalButton>
                  <Link href="#services" className="text-sm text-text-muted hover:text-text transition-colors">
                    See our services ↓
                  </Link>
                </div>
              </div>
              <div>
                <div className="mb-6 lg:mb-8" aria-label="Stack of tools used by our digital agency">
                  <AppLogoMarquee
                    logos={[...IA_LOGOS.slice(0, 6), ...DESIGN_WEB_LOGOS, ...PRODUCTIVITE_LOGOS.slice(0, 6), ...SOCIAL_LOGOS]}
                    durationSeconds={198}
                    size="md"
                  />
                </div>
                <HeroVisual lang="en" />
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
            {STATS.map((s) => (
              <SectionReveal key={s.label}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1 text-text">{s.value}</p>
                  <p className="text-text-muted text-sm">{s.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <LogoBanner label="Trusted by" />

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">The problem</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-2xl mx-auto">
                Without a digital strategy in Geneva, your clients go to your competitors.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: EyeOff,
                stat: '72%',
                title: 'Invisible on Google',
                desc: '72% of local searches end on the first page. If you are not there, your potential clients go straight to a competitor.',
              },
              {
                Icon: AlertTriangle,
                stat: '3 sec',
                title: 'A site that does not convert',
                desc: 'That is how long a visitor takes to leave a slow or badly designed site. A poor experience costs leads every day.',
              },
              {
                Icon: TrendingDown,
                stat: '40%',
                title: 'Wasted ad budget',
                desc: '40% of ad spend goes out without precise targeting or conversion tracking. Data changes everything when you know how to use it.',
              },
            ].map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.1}>
                <div
                  className="flex flex-col gap-4 p-7 rounded-[16px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <item.Icon size={22} style={{ color }} />
                  </div>
                  <p className="text-[2.2rem] font-bold leading-none" style={{ color }}>{item.stat}</p>
                  <h3 className="text-text font-bold text-lg">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <HeroBg className="bg-bg-card border-y border-border" blob1="rgba(124,58,237,0.10)" blob2="rgba(255,107,0,0.07)">
        <section id="services" className="py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="mb-14">
                <GradTag className="mb-4">Our services</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                  Our services: web design, SEO, paid advertising and social media.
                </h2>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((s, i) => (
                <SectionReveal key={s.href} delay={i * 0.07}>
                  <Link
                    href={s.href}
                    className="group flex flex-col h-full bg-bg rounded-[14px] border overflow-hidden hover:-translate-y-0.5 transition-transform duration-200"
                    style={{
                      borderColor: s.badge ? 'rgba(167,139,250,0.38)' : border,
                      boxShadow: s.badge ? '0 0 28px rgba(124,58,237,0.08)' : undefined,
                    }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                      {s.badge && (
                        <span
                          className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={badgeColors[s.badge]}
                        >
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-[7px] mb-3 flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <s.Icon size={16} style={{ color }} />
                      </div>
                      <h3 className="text-text font-semibold mb-2">{s.title}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed flex-1">{s.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold transition-opacity group-hover:opacity-70" style={{ color }}>
                        Learn more <ChevronRight size={12} />
                      </span>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </HeroBg>

      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-5">Free and no commitment</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] leading-[1.1]">
                Start with a free audit.
              </h2>
              <p className="text-text-secondary mt-5 max-w-2xl mx-auto text-base leading-relaxed">
                Before you invest, understand where you stand. Our experts analyse your website and your SEO. You receive a detailed report within 48 hours.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <SectionReveal delay={0.05}>
              <Link
                href="/en/digital-agency/web-design/site-audit"
                className="group flex flex-col h-full rounded-[22px] p-7 border transition-all hover:-translate-y-0.5 duration-200 relative overflow-hidden"
                style={{ background: bg, borderColor: border }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: color }} />
                <span
                  className="inline-flex items-center text-[13px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-7 w-fit"
                  style={{ background: 'rgba(124,58,237,0.12)', color, border: `1px solid ${border}` }}
                >
                  Website audit
                </span>
                <h3 className="text-text text-[1.75rem] font-bold mb-4 leading-[1.15]">Free website audit</h3>
                <p className="text-text-secondary text-base leading-relaxed flex-1">
                  Performance, on-page SEO, UX, mobile compatibility, HTTPS security. PDF report with prioritised recommendations delivered in 48 hours.
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-base font-semibold transition-opacity group-hover:opacity-70" style={{ color }}>
                  Audit my website <ChevronRight size={16} />
                </span>
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <Link
                href="/en/digital-agency/seo/seo-audit"
                className="group flex flex-col h-full rounded-[22px] p-7 border transition-all hover:-translate-y-0.5 duration-200 relative overflow-hidden"
                style={{ background: bg, borderColor: border }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: color }} />
                <span
                  className="inline-flex items-center text-[13px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-7 w-fit"
                  style={{ background: 'rgba(124,58,237,0.12)', color, border: `1px solid ${border}` }}
                >
                  SEO audit
                </span>
                <h3 className="text-text text-[1.75rem] font-bold mb-4 leading-[1.15]">Free SEO audit</h3>
                <p className="text-text-secondary text-base leading-relaxed flex-1">
                  Keywords, backlinks, technical SEO, content, local visibility in Geneva and French-speaking Switzerland. Identify your concrete SEO opportunities.
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-base font-semibold transition-opacity group-hover:opacity-70" style={{ color }}>
                  Audit my SEO <ChevronRight size={16} />
                </span>
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/en/digital-agency/web-design/quote"
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-[22px] p-8 md:p-10 border overflow-hidden transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0.04) 100%)',
                borderColor: 'rgba(167,139,250,0.35)',
                boxShadow: '0 0 40px rgba(124,58,237,0.10)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: color }} />
              <div className="flex items-start gap-5">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-[12px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Rocket size={24} style={{ color }} />
                </div>
                <div>
                  <span
                    className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                    style={{ background: 'rgba(124,58,237,0.12)', color, border: `1px solid ${border}` }}
                  >
                    Free simulator
                  </span>
                  <h3 className="text-text text-2xl md:text-[1.75rem] font-bold mb-2 leading-[1.15]">
                    Estimate the cost of your website in 2 minutes
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed max-w-xl">
                    Configure your project, pick your options and receive a personalised estimate plus a detailed quote within 48 hours. Transparent pricing.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-opacity group-hover:opacity-80"
                style={{ background: 'var(--violet)', color: '#fff' }}
              >
                Estimate my project <ChevronRight size={16} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SectionReveal>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(124,58,237,0.12)' }}>
                <Image
                  src="/images/services/dkdp-agence-consulting.webp"
                  alt="DKDP team, digital agency in Geneva"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </SectionReveal>
            <div>
              <SectionReveal>
                <div className="mb-10">
                  <GradTag className="mb-4">Our difference</GradTag>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                    Why choose DKDP as your digital agency?
                  </h2>
                </div>
              </SectionReveal>
              <div className="flex flex-col gap-8">
                {WHY.map((w, i) => (
                  <SectionReveal key={w.title} delay={i * 0.1}>
                    <div className="flex gap-5">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <w.Icon size={22} style={{ color }} />
                      </div>
                      <div>
                        <h3 className="text-text font-bold text-lg mb-2">{w.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{w.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Our method</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Our method: from audit to launch of your digital project.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                We do not sell websites or SEO. We build coherent digital systems that attract, convince and convert. Every decision is backed by real data.
              </p>
              <div className="relative space-y-4">
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute w-px top-4 bottom-4 pointer-events-none"
                  style={{
                    left: 'calc(1rem - 0.5px)',
                    background: 'linear-gradient(to bottom, #A78BFA 0%, #A78BFA 70%, rgba(167,139,250,0) 100%)',
                  }}
                />
                {[
                  { n: '01', title: 'Full audit', desc: 'Website, SEO, competitors, keywords. We start from your real situation, not theory.' },
                  { n: '02', title: 'Tailored strategy', desc: 'Prioritised action plan with measurable objectives. You approve before we kick off.' },
                  { n: '03', title: 'Agile execution', desc: 'Weekly check-ins, real-time access. You stay in control of your project.' },
                  { n: '04', title: 'Launch and promotion', desc: 'Site live, campaigns activated, first tracked leads from day one.' },
                  { n: '05', title: 'Monthly optimisation', desc: 'Data analysis, adjustments, clear reports. We stay around after delivery.' },
                ].map((step, i) => (
                  <SectionReveal key={step.n} delay={i * 0.07}>
                    <div className="flex gap-4 items-start">
                      <span
                        className="relative z-[1] flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold"
                        style={{ background: bg, border: `1px solid ${border}`, color }}
                      >
                        {step.n}
                      </span>
                      <div>
                        <p className="text-text font-semibold text-sm">{step.title}</p>
                        <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div
                className="rounded-[20px] p-10 border"
                style={{ background: bg, borderColor: border, boxShadow: 'rgba(124,58,237,0.10) 0px 0px 60px' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                  Conversion funnel
                </p>
                <FunnelDiagram lang="en" />
                <div className="mt-8 pt-6 border-t" style={{ borderColor: border }}>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { v: '+240%', l: 'Avg. traffic uplift' },
                      { v: 'x3.5', l: 'Inbound leads' },
                      { v: '< 4 months', l: 'First measurable results' },
                    ].map((kpi) => (
                      <div key={kpi.l}>
                        <p className="text-xl font-bold" style={{ color }}>{kpi.v}</p>
                        <p className="text-text-muted text-[11px] mt-1">{kpi.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Real proof</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Concrete results for SMBs in French-speaking Switzerland.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                client: 'B2B SMB Geneva',
                sector: 'Financial services',
                results: ['+340% organic traffic', '15 qualified leads/month', 'Timeline: 5 months'],
                before: 'Ageing website, no SEO, zero inbound leads',
                after: 'Full rebuild, content strategy, Top 3 ranking on 12 target keywords',
              },
              {
                client: 'SaaS startup',
                sector: 'Technology',
                results: ['Google Ads ROI x4.2', 'CPA cut by 68%', 'Timeline: 6 weeks'],
                before: 'Google Ads budget burned with no results, zero conversion tracking',
                after: 'Full campaign restructure, precise tracking, continuous growth',
              },
              {
                client: 'Local retailer',
                sector: 'Retail',
                results: ['+180% inbound calls', 'Google rating 4.8/5', 'Timeline: 3 months'],
                before: 'Invisible on Google Maps, no local presence',
                after: 'Optimised Google Business Profile, managed reviews, top 3 in local searches',
              },
            ].map((c, i) => (
              <SectionReveal key={c.client} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{ borderColor: border }}
                >
                  <div className="p-6 flex-1" style={{ background: bg }}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-text font-bold">{c.client}</p>
                        <p className="text-text-muted text-xs">{c.sector}</p>
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                        style={{ background: 'rgba(124,58,237,0.15)', color, border: `1px solid ${border}` }}
                      >
                        Delivered
                      </span>
                    </div>
                    <div className="space-y-2 mb-5">
                      {c.results.map((r) => (
                        <div key={r} className="flex items-center gap-2">
                          <Target size={12} style={{ color }} className="flex-shrink-0" />
                          <span className="text-text text-sm font-semibold">{r}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 pt-4" style={{ borderTop: `1px solid ${border}` }}>
                      <p className="text-text-muted text-xs"><span className="text-text-secondary font-medium">Before:</span> {c.before}</p>
                      <p className="text-text-muted text-xs"><span className="text-text font-medium">After:</span> {c.after}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">Trusted by</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
              {[
                { name: 'SwissLife', file: 'swisslife.webp', h: 36 },
                { name: 'Howden', file: 'howden.avif', h: 28 },
                { name: 'OCAS', file: 'ocas.avif', h: 28 },
                { name: 'WellWays', file: 'wellways.avif', h: 28 },
                { name: 'Intown', file: 'intown.avif', h: 24 },
                { name: 'Eli Lilly', file: 'lilly.svg', h: 28 },
                { name: 'Strike', file: 'strike.avif', h: 24 },
              ].map((logo) => (
                <Image
                  key={logo.name}
                  src={`/images/clients/${logo.file}`}
                  alt={logo.name}
                  width={120}
                  height={logo.h}
                  className="grayscale opacity-40 hover:opacity-70 hover:grayscale-0 transition-all duration-300 object-contain"
                  style={{ height: logo.h, width: 'auto' }}
                />
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <SiteAuditBlock />

      <section className="py-20 border-t border-border">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="text-center mb-10">
            <GradTag className="mb-4">FAQ</GradTag>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your questions about our digital agency</h2>
          </div>
          <ul className="space-y-3">
            {FAQ_AGENCE_EN.map(({ question, answer }) => (
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
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Our other areas of expertise
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SectionReveal delay={0.05}>
              <Link
                href="/en/artificial-intelligence"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(212,212,216,0.05)', borderColor: 'rgba(212,212,216,0.18)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-[#D4D4D8]">Artificial Intelligence</p>
                  <p className="text-text font-semibold">Automate your processes with AI</p>
                  <p className="text-text-muted text-xs mt-1">AI agents, automation and consulting. 10 hours saved per week on average.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 text-[#D4D4D8] transition-transform group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <Link
                href="/en/corporate-training"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(255,107,0,0.06)', borderColor: 'rgba(255,107,0,0.20)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#FF8C00' }}>Corporate training</p>
                  <p className="text-text font-semibold">Train your team in digital and AI</p>
                  <p className="text-text-muted text-xs mt-1">Tailored sessions, on-site or remote. 200+ people trained.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: '#FF8C00' }} />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      <CTAFinal />
    </main>
  )
}
