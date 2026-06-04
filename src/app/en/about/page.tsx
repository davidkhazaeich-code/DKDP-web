import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Wrench,
  BarChart2,
  GraduationCap,
  ChevronRight,
  Globe,
  Brain,
  BookOpen,
  Mail,
  CheckCircle2,
  MapPin,
  Award,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import { DkdpLogo } from '@/components/ui/DkdpLogo'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildPerson } from '@/lib/schema'
import { violet, orange, chrome } from '@/lib/tokens'
import { localizedPath } from '@/i18n/slugs'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))

export const metadata: Metadata = {
  title: 'About · David Khazaei · DKDP Geneva',
  description:
    'DKDP is a Geneva digital agency founded by David Khazaei. Specialist in artificial intelligence, corporate training and web for SMEs across French-speaking Switzerland.',
  alternates: {
    canonical: 'https://dkdp.ch/en/about',
    languages: {
      'fr-CH': 'https://dkdp.ch/a-propos',
      en: 'https://dkdp.ch/en/about',
      'x-default': 'https://dkdp.ch/a-propos',
    },
  },
  openGraph: {
    title: 'About · David Khazaei · DKDP Geneva',
    description: 'Geneva digital agency founded by David Khazaei: AI, corporate training and web for Swiss SMEs since 2015.',
    url: 'https://dkdp.ch/en/about',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/a-propos.png', width: 1376, height: 768, alt: 'About DKDP Geneva: David Khazaei founder, digital agency since 2015' }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/og/a-propos.png'] },
}

// ── Design tokens (aliases) ───────────────────────────────────────
const chromeColor = chrome.color
const chromeBg    = chrome.bg
const chromeBd    = chrome.border
const violetColor = violet.color
const violetBg    = violet.bg
const violetBd    = violet.border
const orangeColor = orange.color
const orangeBg    = orange.bg
const orangeBd    = orange.border

// ── Data ─────────────────────────────────────────────────────────
const VALUES = [
  {
    Icon: Wrench,
    title: 'Pragmatic above all',
    desc: "We don't deploy AI for prestige. We identify what creates real value for your business and we execute.",
  },
  {
    Icon: BarChart2,
    title: 'Measurable results',
    desc: "Every project starts with a simple question: what is the expected ROI? We don't ship a solution if we can't measure its impact.",
  },
  {
    Icon: GraduationCap,
    title: 'Knowledge transfer',
    desc: "Training your teams is part of every engagement. You should understand and master what we deploy for you.",
  },
]

const STATS = [
  { value: '700+', label: 'Clients supported' },
  { value: '3',   label: 'Pillars of expertise' },
  { value: '98%', label: 'Satisfied clients' },
  { value: '2015', label: 'Active since' },
]

const PILLARS = [
  {
    Icon: Globe,
    title: 'Digital Services',
    desc: 'Websites, SEO, Google Ads, social media. A consistent digital presence that drives real results.',
    href: localizedPath('/agence-digitale', 'en'),
    color: violetColor,
    bg: violetBg,
    bd: violetBd,
  },
  {
    Icon: BookOpen,
    title: 'Corporate Training',
    desc: 'Tailored sessions, on site or by video call. We train your teams on digital tools and AI.',
    href: localizedPath('/formation-entreprise', 'en'),
    color: orangeColor,
    bg: orangeBg,
    bd: orangeBd,
  },
  {
    Icon: Brain,
    title: 'Artificial Intelligence',
    desc: 'AI agents, process automation, LLM integration. 10 hours saved per week on average.',
    href: localizedPath('/intelligence-artificielle', 'en'),
    color: chromeColor,
    bg: chromeBg,
    bd: chromeBd,
  },
]

const team = [
  {
    name: 'David Khazaei',
    role: 'Founder · Developer & Digital Consultant',
    bio: "An expert in digital strategy and artificial intelligence, David has supported Swiss SMEs for over ten years. Based in Eaux-Vives, Geneva, he believes technology should serve people, not the other way around.",
    src: '/images/team/david-khazaei.png',
    color: violetColor,
    border: violetBd,
    cardBg: 'linear-gradient(160deg, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.05) 100%)',
    skills: ['AI & Automation', 'Digital strategy', 'Web development', 'SEO', 'Google Ads'],
    email: 'dk@dkdp.ch',
    linkedin: 'https://www.linkedin.com/in/davidkhazaei/',
  },
  {
    name: 'Romane',
    role: 'AI, SEO/GEO & UX expert · Trainer',
    bio: "A specialist in artificial intelligence, SEO/GEO referencing and user experience, Romane combines technical expertise and teaching to train teams and optimise our clients digital presence.",
    src: '/images/team/romane.png',
    color: orangeColor,
    border: 'rgba(255,107,0,0.28)',
    cardBg: 'linear-gradient(160deg, rgba(255,107,0,0.18) 0%, rgba(255,107,0,0.04) 100%)',
    skills: ['Artificial intelligence', 'SEO & GEO', 'UX Design', 'Training'],
    email: 'rd@dkdp.ch',
    linkedin: 'https://www.linkedin.com/in/romane-degeorges/',
  },
  {
    name: 'Ali Khazaei',
    role: 'Trainer · Developer & IT',
    bio: "A passionate developer and trainer, Ali leads the IT and web development modules. An educator above all, he makes sure every participant leaves with solid foundations.",
    src: '/images/team/ali-khazaei.png',
    color: '#60a5fa',
    border: 'rgba(96,165,250,0.25)',
    cardBg: 'linear-gradient(160deg, rgba(96,165,250,0.16) 0%, rgba(96,165,250,0.04) 100%)',
    skills: ['Web development', 'Python', 'IT', 'Office tools', 'Training'],
    email: null,
    linkedin: null,
  },
  {
    name: 'Claude',
    role: 'Independent Collaborator · Developer & Trainer',
    bio: "An independent developer and trainer, Claude brings his technical expertise in programming and IT to DKDP projects. He runs the technical training for IT profiles.",
    src: '/images/team/claude-formation.png',
    color: chromeColor,
    border: chromeBd,
    cardBg: 'linear-gradient(160deg, rgba(212,212,216,0.12) 0%, rgba(212,212,216,0.03) 100%)',
    skills: ['Web development', 'Python', 'IT', 'Cybersecurity'],
    email: null,
    linkedin: null,
  },
]

const REASONS = [
  {
    title: 'French-speaking Switzerland specialist',
    desc: "We know the local market, Swiss legal constraints, and we speak your languages.",
  },
  {
    title: 'ROI-first approach',
    desc: "Every action is justified by an estimated return on investment before we start.",
  },
  {
    title: 'End-to-end support',
    desc: "From the initial audit to training your teams, we cover the whole cycle.",
  },
  {
    title: 'Full transparency',
    desc: "No jargon, no surprises. Clear reports, fixed prices, deadlines met.",
  },
]

// ── Page ─────────────────────────────────────────────────────────
export default function AboutPageEN() {
  return (
    <main>
      <SchemaOrg schema={buildLocalBusiness('en')} />
      <SchemaOrg schema={buildPerson('en')} />

      {/* ── Hero ── */}
      <HeroBg
        blob1="rgba(212,212,216,0.08)"
        blob2="rgba(124,58,237,0.07)"
        accentRgb="156,163,175"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: copy */}
              <div>
                <GradTag className="mb-6">About</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Behind DKDP,{' '}
                  <br />
                  <GradText as="span">a clear vision.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  AI and digital are not reserved for large companies. DKDP helps SMEs across
                  French-speaking Switzerland take action with concrete, measurable results.
                </p>
                <HeroPills
                  accentRgb="156, 163, 175"
                  items={[
                    { label: 'Eaux-Vives, Geneva', Icon: MapPin },
                    { label: '5 years of local expertise', Icon: Award },
                    { label: 'Swiss SMEs supported', Icon: Users },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Let&apos;s discuss your project
                  </LiquidMetalButton>
                  <Link
                    href="#story"
                    className="text-sm text-text-muted hover:text-text transition-colors"
                  >
                    Our story ↓
                  </Link>
                </div>
              </div>

              {/* Right: Logo DKDP */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative">
                  {/* Glow backdrop */}
                  <div
                    className="absolute inset-0 rounded-[28px] blur-3xl scale-125 opacity-60"
                    style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.30) 0%, rgba(212,212,216,0.06) 60%, transparent 100%)' }}
                  />
                  {/* Logo card */}
                  <div
                    className="apropos-logo-card relative w-[380px] h-[280px] rounded-[28px] flex flex-col items-center justify-center gap-7 overflow-hidden"
                    style={{
                      background: 'linear-gradient(140deg, rgba(124,58,237,0.14) 0%, rgba(9,9,11,0.80) 50%, rgba(212,212,216,0.06) 100%)',
                      border: '1px solid rgba(124,58,237,0.28)',
                      boxShadow: '0 0 80px rgba(124,58,237,0.14), inset 0 1px 0 rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Subtle grid */}
                    <div
                      className="apropos-logo-grid absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.06) 39px,rgba(255,255,255,0.06) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.06) 39px,rgba(255,255,255,0.06) 40px)',
                      }}
                    />
                    <DkdpLogo
                      alt="DKDP Geneva"
                      width={220}
                      height={80}
                      className="relative z-10 h-auto w-[210px] opacity-95"
                      priority
                    />
                    {/* Pillar tags */}
                    <div className="relative z-10 flex gap-2">
                      {[
                        { label: 'Digital Services', color: violetColor, bg: violetBg, border: violetBd },
                        { label: 'Training', color: orangeColor, bg: orangeBg, border: orangeBd },
                        { label: 'AI', color: chromeColor, bg: chromeBg, border: chromeBd },
                      ].map((p) => (
                        <span
                          key={p.label}
                          className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                          style={{ background: p.bg, border: `1px solid ${p.border}`, color: p.color }}
                        >
                          {p.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Floating stat : clients */}
                  <div
                    className="apropos-floating-stat absolute -top-5 -right-8 px-4 py-2.5 rounded-[14px] text-center"
                    style={{ background: 'rgba(9,9,11,0.88)', border: `1px solid ${violetBd}`, backdropFilter: 'blur(12px)' }}
                  >
                    <p className="font-bold text-xl leading-none" style={{ color: violetColor }}>700+</p>
                    <p className="text-text-muted text-[10px] mt-0.5">Clients</p>
                  </div>

                  {/* Floating stat : experience */}
                  <div
                    className="apropos-floating-stat absolute -bottom-5 -left-8 px-4 py-2.5 rounded-[14px] text-center"
                    style={{ background: 'rgba(9,9,11,0.88)', border: `1px solid ${orangeBd}`, backdropFilter: 'blur(12px)' }}
                  >
                    <p className="font-bold text-xl leading-none" style={{ color: orangeColor }}>10+</p>
                    <p className="text-text-muted text-[10px] mt-0.5">Years&apos; experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </HeroBg>


      {/* ── Approach / 3 values ── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Our approach</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-2xl mx-auto">
                Three principles that guide every project.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.1}>
                <div
                  className="flex flex-col gap-5 p-7 rounded-[16px] border h-full"
                  style={{ background: chromeBg, borderColor: chromeBd }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: chromeBg, border: `1px solid ${chromeBd}` }}
                  >
                    <v.Icon size={22} style={{ color: chromeColor }} />
                  </div>
                  <h3 className="text-text font-bold text-lg">{v.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{v.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>


      <LogoBanner lang="en" label="700+ clients supported" />
      {/* ── Story ── */}
      <section id="story" className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: story */}
            <div>
              <SectionReveal>
                <GradTag className="mb-5">Our story</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-8">
                  DKDP was born from a simple observation.
                </h2>
              </SectionReveal>

              <div className="flex flex-col gap-5">
                <SectionReveal delay={0.05}>
                  <p className="text-text-secondary leading-relaxed">
                    After several years supporting large organisations in their digital
                    transformation, David realised SMEs were systematically left behind. Too small
                    for the big consulting firms, too complex for classic web agencies.
                  </p>
                </SectionReveal>
                <SectionReveal delay={0.10}>
                  <p className="text-text-secondary leading-relaxed">
                    Active since 2015, he officially founded DKDP in Geneva in 2019 with a clear
                    positioning: bringing SMEs across French-speaking Switzerland the level of
                    expertise and rigour usually reserved for large companies. No useless jargon,
                    no off-the-shelf solutions. Concrete, measurable results, and clients who
                    understand what we do for them.
                  </p>
                </SectionReveal>
                <SectionReveal delay={0.15}>
                  <p className="text-text-secondary leading-relaxed">
                    Today, DKDP covers three complementary pillars: digital services for online
                    visibility, corporate training to upskill teams, and artificial intelligence to
                    automate and accelerate business processes. Three areas of expertise, one single
                    partner.
                  </p>
                </SectionReveal>
              </div>
            </div>

            {/* Right: stats 2x2 */}
            <div className="grid grid-cols-2 gap-5 lg:mt-16">
              {STATS.map((s, i) => (
                <SectionReveal key={s.label} delay={i * 0.08}>
                  <div
                    className="flex flex-col gap-2 p-6 rounded-[16px] border text-center"
                    style={{ background: chromeBg, borderColor: chromeBd }}
                  >
                    <p
                      className="text-[2.4rem] font-bold leading-none"
                      style={{ color: chromeColor }}
                    >
                      {s.value}
                    </p>
                    <p className="text-text-muted text-sm leading-snug">{s.label}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Three pillars ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">What we do</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl mx-auto">
                Three areas of expertise, one team.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <SectionReveal key={p.href} delay={i * 0.1}>
                <Link
                  href={p.href}
                  className="group flex flex-col gap-5 p-7 rounded-[16px] border h-full transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: p.bg, borderColor: p.bd }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: p.bg, border: `1px solid ${p.bd}` }}
                  >
                    <p.Icon size={22} style={{ color: p.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-text font-bold text-lg mb-2">{p.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{p.desc}</p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-opacity group-hover:opacity-70"
                    style={{ color: p.color }}
                  >
                    Discover <ChevronRight size={12} />
                  </span>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <HeroBg
        blob1="rgba(212,212,216,0.06)"
        blob2="rgba(255,107,0,0.04)"
        accentRgb="156,163,175"
        className="border-b border-border"
      >
        <section className="py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-16">
                <GradTag className="mb-6">The team</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  Four experts, one shared vision.
                </h2>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <SectionReveal key={member.name} delay={i * 0.1}>
                  <div
                    className="flex flex-col rounded-[20px] overflow-hidden h-full"
                    style={{ background: member.cardBg, border: `1px solid ${member.border}` }}
                  >
                    {/* Portrait */}
                    <div
                      className="apropos-portrait-well relative h-64 flex items-end justify-center overflow-hidden"
                      style={{ background: 'rgba(0,0,0,0.25)' }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${member.color}22 0%, transparent 70%)` }}
                      />
                      <Image
                        src={member.src}
                        alt={member.name}
                        fill
                        className="relative z-10 object-contain object-bottom"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="apropos-portrait-fade absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-4 p-6 flex-1">
                      <div>
                        <p className="text-text font-bold text-lg leading-tight">{member.name}</p>
                        <p className="text-[11px] font-semibold mt-1 uppercase tracking-wider" style={{ color: member.color }}>{member.role}</p>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">{member.bio}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="apropos-skill-pill text-[10px] font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(0,0,0,0.30)', border: `1px solid ${member.border}`, color: member.color }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      {(member.email || member.linkedin) && (
                        <div
                          className="mt-auto pt-4 border-t flex flex-wrap gap-3"
                          style={{ borderColor: member.border }}
                        >
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors"
                            >
                              <Mail size={12} style={{ color: member.color }} />
                              {member.email}
                            </a>
                          )}
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: member.color }}>
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                              LinkedIn
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Why DKDP ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Why DKDP</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-2xl mx-auto">
                What sets us apart, concretely.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REASONS.map((r, i) => (
              <SectionReveal key={r.title} delay={i * 0.08}>
                <div
                  className="flex gap-5 p-7 rounded-[16px] border h-full"
                  style={{ background: chromeBg, borderColor: chromeBd }}
                >
                  <CheckCircle2
                    size={22}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: chromeColor }}
                  />
                  <div>
                    <h3 className="text-text font-bold text-base mb-2">{r.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal accentRgb="156,163,175" lang="en" />
    </main>
  )
}
