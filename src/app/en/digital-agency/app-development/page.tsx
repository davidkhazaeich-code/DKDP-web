import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ChevronRight, ShieldCheck, Code2, Users, RefreshCw, FileText, Settings, Smartphone, Globe, Zap } from 'lucide-react'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { violet, orange, teal } from '@/lib/tokens'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))

export const metadata: Metadata = {
  title: 'App Development Geneva & Western Switzerland | iOS, Android | DKDP',
  description:
    'Mobile and web app development for SMBs in Geneva. iOS, Android, React Native, custom web apps. From the spec sheet to launch, free quote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/app-development',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/developpement-application',
      en: 'https://dkdp.ch/en/digital-agency/app-development',
      'x-default': 'https://dkdp.ch/agence-digitale/developpement-application',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/developpement-application.webp', width: 1376, height: 768, alt: 'App development Geneva DKDP' }],
  },
}

const FAQ = [
  {
    question: 'How much does mobile app development cost in Geneva?',
    answer:
      'A simple mobile app (React Native, essential features) starts around CHF 15\'000. A native iOS or Android app with a full backend ranges between CHF 25\'000 and CHF 60\'000. A web app or PWA is often less expensive, between CHF 8\'000 and CHF 20\'000. Every project receives a fixed quote before kickoff.',
  },
  {
    question: 'How long does it take to develop an app?',
    answer:
      'A simple PWA or web app can be delivered in 8 to 12 weeks. A complete mobile app with a backend usually takes 4 to 6 months. Timelines depend on the functional scope, validated and quoted upfront in the spec sheet.',
  },
  {
    question: 'Which technology should I choose between native (Swift/Kotlin) and React Native?',
    answer:
      'React Native covers 90% of needs with a single codebase for iOS and Android, the most efficient choice for most SMB projects. Native makes sense if your app requires high graphics performance, deep hardware access, or features that are very specific to one platform. We advise you objectively based on your case.',
  },
  {
    question: 'Do I keep ownership of the delivered code?',
    answer:
      'Yes, in full. The source code belongs to you at final delivery. No dependency on DKDP to evolve your app afterwards, you are free to hand it to whoever you want.',
  },
  {
    question: 'Does DKDP handle publication on the App Store and Google Play?',
    answer:
      'Yes. Preparing the files, configuring developer accounts (or creating them if you do not have any yet), screenshots, descriptions and submission to the stores are included in the final deliverable.',
  },
]

type AccentKey = 'violet' | 'chrome' | 'orange' | 'green'

const STEPS: {
  num: number
  title: string
  week: string
  duration: string
  accent: AccentKey
  desc: string
  deliverables: string
  icon: string
}[] = [
  {
    num: 1,
    title: 'Discovery & scoping',
    week: 'Week 1-2',
    duration: '1 to 2 wks',
    accent: 'violet',
    icon: 'search',
    desc: 'Analysis of business needs, definition of the functional scope, user personas, platform choice. We clarify the objective before touching Figma.',
    deliverables: 'Spec sheet, fixed quote, schedule',
  },
  {
    num: 2,
    title: 'UX/UI design',
    week: 'Week 2-5',
    duration: '2 to 3 wks',
    accent: 'chrome',
    icon: 'pen',
    desc: 'Wireframes, desktop and mobile Figma mockups, clickable prototype. You validate the full interface before a single line of code is written.',
    deliverables: 'Figma mockups, interactive prototype',
  },
  {
    num: 3,
    title: 'Development',
    week: 'Week 4-14',
    duration: '4 to 10 wks',
    accent: 'orange',
    icon: 'code',
    desc: 'Short sprints with regular demos. Continuous access to a test environment on your own devices. Progress is visible at every step, not only at the end.',
    deliverables: 'Test env., sprint demos, source code',
  },
  {
    num: 4,
    title: 'Testing & QA',
    week: 'Week 13-15',
    duration: '1 to 2 wks',
    accent: 'green',
    icon: 'check',
    desc: 'Functional, performance and security testing on iOS, Android and browsers. Fixes are integrated before going to production.',
    deliverables: 'Test report, validated fixes',
  },
  {
    num: 5,
    title: 'Launch & follow-up',
    week: 'Go-live',
    duration: 'Ongoing',
    accent: 'violet',
    icon: 'rocket',
    desc: 'Deployment, App Store and Google Play publication, training for your team, technical documentation. Support included for 30 days after launch.',
    deliverables: 'Store publication, documentation, 30-day support',
  },
]

const WHY = [
  {
    Icon: Users,
    title: 'A single point of contact',
    desc: 'From the mockup to the store: design, development, deployment. No subcontracting, no information lost between teams.',
  },
  {
    Icon: Code2,
    title: 'Code delivered, no lock-in',
    desc: 'The source code belongs to you at delivery. You can hand it to any developer afterwards.',
  },
  {
    Icon: ShieldCheck,
    title: 'Post-launch follow-up included',
    desc: '30 days of support after launch to fix any bug or help your team get to grips with the application.',
  },
  {
    Icon: RefreshCw,
    title: 'Compatible with your other tools',
    desc: 'Native integration with your existing systems: CRM, ERP, third-party APIs, DKDP automation tools.',
  },
]

// ── Inlined from FR ./_components/AppTypesSection (French text translated) ──
const APPS = [
  {
    Icon: Smartphone,
    title: 'Native mobile app',
    desc: 'An iOS or Android app built with the full system APIs: push notifications, camera, GPS, biometrics. Maximum performance, a refined experience.',
    tags: ['Swift (iOS)', 'Kotlin (Android)', 'React Native'],
    color: violet.color,
    bg: violet.bg,
    border: violet.border,
  },
  {
    Icon: Globe,
    title: 'Web App & SaaS',
    desc: 'A business application accessible from any browser. Dashboard, client portal, internal tool. No installation, simplified deployment.',
    tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    color: orange.color,
    bg: orange.bg,
    border: orange.border,
  },
  {
    Icon: Zap,
    title: 'PWA',
    desc: 'The experience of a mobile app, the deployment of a website. Works offline, installs on the home screen, sends notifications. Ideal for controlled budgets.',
    tags: ['Offline', 'Push notifications', 'Installable'],
    color: teal.color,
    bg: teal.bg,
    border: teal.border,
  },
]

function AppTypesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {APPS.map((app, i) => (
        <SectionReveal key={app.title} delay={i * 0.1}>
          <div
            className="flex flex-col gap-4 p-7 bg-bg-card border border-border rounded-[16px] h-full hover:-translate-y-0.5 transition-transform duration-300"
          >
            {/* Icon */}
            <div
              className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
              style={{ background: app.bg, border: `1px solid ${app.border}` }}
            >
              <app.Icon size={22} style={{ color: app.color }} strokeWidth={1.75} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-text font-bold text-lg mb-3">{app.title}</h3>
              <p className="text-text-secondary leading-relaxed text-sm">{app.desc}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
              {app.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-[6px]"
                  style={{ background: app.bg, color: app.color, border: `1px solid ${app.border}` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      ))}
    </div>
  )
}

// ── Inlined from FR ./_components/TechStack (French labels translated) ──
const CATEGORIES = [
  {
    label: 'Mobile',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    accent: '#A78BFA',
    accentBg: 'rgba(124,58,237,0.10)',
    accentBorder: 'rgba(124,58,237,0.25)',
    techs: [
      { name: 'React Native', dot: '#61DBFB' },
      { name: 'Swift (iOS)', dot: '#FA7343' },
      { name: 'Kotlin (Android)', dot: '#A97BFF' },
      { name: 'Expo', dot: '#ffffff' },
    ],
  },
  {
    label: 'Web & Backend',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    accent: '#60a5fa',
    accentBg: 'rgba(96,165,250,0.10)',
    accentBorder: 'rgba(96,165,250,0.25)',
    techs: [
      { name: 'Next.js', dot: '#ffffff' },
      { name: 'Node.js', dot: '#6CC24A' },
      { name: 'TypeScript', dot: '#3178C6' },
      { name: 'Tailwind CSS', dot: '#38BDF8' },
    ],
  },
  {
    label: 'Database & Auth',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    accent: '#4ade80',
    accentBg: 'rgba(74,222,128,0.10)',
    accentBorder: 'rgba(74,222,128,0.25)',
    techs: [
      { name: 'PostgreSQL', dot: '#336791' },
      { name: 'Supabase', dot: '#3ECF8E' },
      { name: 'Prisma', dot: '#5A67D8' },
      { name: 'Firebase', dot: '#FFCA28' },
    ],
  },
  {
    label: 'Design & Deployment',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    accent: '#fbbf24',
    accentBg: 'rgba(251,191,36,0.10)',
    accentBorder: 'rgba(251,191,36,0.25)',
    techs: [
      { name: 'Figma', dot: '#F24E1E' },
      { name: 'Vercel', dot: '#D4D4D8' },
      { name: 'AWS', dot: '#FF9900' },
      { name: 'App Store / Play', dot: '#A78BFA' },
    ],
  },
]

function TechStack() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border rounded-[16px] overflow-hidden">
      {CATEGORIES.map((cat) => (
        <div
          key={cat.label}
          className="bg-bg-card p-6 flex flex-col gap-5"
        >
          {/* Category header */}
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-[8px] flex-shrink-0"
              style={{ background: cat.accentBg, border: `1px solid ${cat.accentBorder}`, color: cat.accent }}
            >
              {cat.icon}
            </div>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ color: cat.accent }}
            >
              {cat.label}
            </span>
          </div>

          {/* Tech list */}
          <div className="grid grid-cols-2 gap-2">
            {cat.techs.map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] border transition-colors duration-150"
                style={{ background: 'var(--surface-default)', borderColor: 'var(--surface-border)' }}
              >
                <span
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{ background: t.dot }}
                />
                <span className="text-[13px] font-medium text-text-secondary truncate">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Inlined from FR ./_components/AppGallery (alt + captions translated) ──
const GALLERY = [
  {
    src: '/images/apps/dkdp-app-fitness-tracking-mobile.webp',
    alt: 'Fitness and health mobile app on iPhone: activity tracking, heart rate and statistics, developed by DKDP Geneva',
    caption: 'Health mobile app',
    aspect: 'portrait' as const,
  },
  {
    src: '/images/apps/dkdp-app-saas-project-management.webp',
    alt: 'Project management SaaS dashboard on MacBook: kanban, team tracking and dashboards, developed by DKDP Geneva',
    caption: 'Project management SaaS',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/apps/dkdp-app-food-delivery-mobile.webp',
    alt: 'Food delivery app on iPhone: restaurant menu, real-time order tracking, developed by DKDP',
    caption: 'Mobile delivery app',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/apps/dkdp-app-fintech-banking-mobile.webp',
    alt: 'Fintech banking app on iPhone: balance, transaction history and transfers, developed by DKDP Geneva',
    caption: 'Fintech app',
    aspect: 'portrait' as const,
  },
  {
    src: '/images/apps/dkdp-app-ecommerce-fashion-ipad.webp',
    alt: 'Luxury fashion e-commerce app on iPad: product catalogue and elegant navigation, developed by DKDP Geneva',
    caption: 'Fashion e-commerce',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/apps/dkdp-app-immobilier-responsive.webp',
    alt: 'Responsive real estate app on MacBook and iPhone: listings map, property sheets and agent contact, developed by DKDP',
    caption: 'Responsive real estate app',
    aspect: 'landscape' as const,
  },
]

function GalleryCard({ item }: { item: (typeof GALLERY)[number] }) {
  const aspectClass = item.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-video'

  return (
    <div className="group relative rounded-[14px] border border-border bg-bg-card overflow-hidden hover:-translate-y-0.5 transition-transform duration-300">
      {/* Parallax image — overflow handled by parent */}
      <ParallaxImage
        src={item.src}
        alt={item.alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`w-full ${aspectClass}`}
        strength={10}
      />

      {/* Hover overlay + caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <span className="text-[12px] font-semibold text-white/90 tracking-wide">{item.caption}</span>
      </div>
    </div>
  )
}

function AppGallery() {
  return (
    <div className="space-y-4">
      {/* Row 1: portrait + landscape */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
        <SectionReveal delay={0}>
          <GalleryCard item={GALLERY[0]} />
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <GalleryCard item={GALLERY[1]} />
        </SectionReveal>
      </div>

      {/* Row 2: landscape + landscape */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionReveal delay={0.12}>
          <GalleryCard item={GALLERY[2]} />
        </SectionReveal>
        <SectionReveal delay={0.16}>
          <GalleryCard item={GALLERY[4]} />
        </SectionReveal>
      </div>

      {/* Row 3: portrait + landscape */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
        <SectionReveal delay={0.2}>
          <GalleryCard item={GALLERY[3]} />
        </SectionReveal>
        <SectionReveal delay={0.24}>
          <GalleryCard item={GALLERY[5]} />
        </SectionReveal>
      </div>
    </div>
  )
}

// ── Inlined from FR ./_components/HeroVisual (French labels translated) ──
const V = violet.color
const VD = violet.border

function HeroVisual() {
  return (
    <div className="relative flex gap-4 items-end">

      {/* ── Phone mockup (iOS style) ── */}
      <div className="relative flex-shrink-0">
        <div
          className="w-[120px] rounded-[24px] overflow-hidden"
          style={{
            background: '#0d0d0d',
            border: `1px solid ${VD}`,
            boxShadow: '0 0 40px rgba(124,58,237,0.18)',
          }}
        >
          {/* Notch */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-16 h-4 rounded-full bg-black/80 border border-white/5" />
          </div>

          {/* App screen */}
          <div className="px-2.5 pb-4 space-y-2.5">
            {/* App header */}
            <div className="flex items-center justify-between">
              <div className="w-14 h-2.5 rounded bg-white/15" />
              <div className="w-5 h-5 rounded-full" style={{ background: 'rgba(124,58,237,0.3)', border: `1px solid ${VD}` }} />
            </div>

            {/* KPI card */}
            <div
              className="rounded-[10px] p-2.5"
              style={{ background: 'rgba(124,58,237,0.12)', border: `1px solid ${VD}` }}
            >
              <div className="w-10 h-1.5 rounded bg-white/20 mb-2" />
              <div className="text-[14px] font-bold leading-none" style={{ color: V }}>+38%</div>
              <div className="w-8 h-1 rounded bg-white/10 mt-1" />
            </div>

            {/* List items */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-lg flex-shrink-0"
                  style={{ background: i === 1 ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
                <div className="space-y-1 flex-1">
                  <div className="h-1.5 rounded bg-white/15" style={{ width: `${75 - i * 10}%` }} />
                  <div className="h-1 rounded bg-white/6" style={{ width: `${55 - i * 8}%` }} />
                </div>
              </div>
            ))}

            {/* Bottom nav */}
            <div className="flex justify-around pt-1">
              {[true, false, false, false].map((active, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-lg"
                  style={{ background: active ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.04)', border: `1px solid ${active ? VD : 'transparent'}` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Badge iOS/Android */}
        <div
          className="absolute -top-2 -right-3 rounded-full px-2.5 py-1 text-[9px] font-bold whitespace-nowrap"
          style={{ background: 'rgba(124,58,237,0.9)', color: '#fff', boxShadow: '0 4px 12px rgba(124,58,237,0.4)' }}
        >
          iOS &amp; Android
        </div>
      </div>

      {/* ── Web / SaaS mockup (browser) ── */}
      <div className="relative flex-1">
        <div
          className="rounded-[14px] overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.12)' }}
        >
          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
            <div className="flex-1 mx-2 h-5 rounded-md bg-white/5 flex items-center px-2.5">
              <span className="text-[9px] text-zinc-500 font-mono">app.your-company.ch</span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-4 space-y-3">
            {/* Top nav */}
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {['Dashboard', 'Clients', 'Stats'].map((label, i) => (
                  <span
                    key={label}
                    className="text-[9px] px-2 py-0.5 rounded"
                    style={{
                      color: i === 0 ? V : '#666',
                      background: i === 0 ? 'rgba(124,58,237,0.12)' : 'transparent',
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="w-5 h-5 rounded-full bg-white/8" />
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Orders', val: '1 284', c: V },
                { label: 'Revenue', val: 'CHF 48k', c: '#FF8C00' },
                { label: 'Clients', val: '342', c: '#4ade80' },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-[8px] p-2"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="text-[8px] text-zinc-500 mb-0.5">{k.label}</p>
                  <p className="text-[11px] font-bold" style={{ color: k.c }}>{k.val}</p>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div
              className="rounded-[10px] p-3 h-16 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-[8px] text-zinc-600 mb-1">30-day activity</p>
              <svg viewBox="0 0 200 30" className="w-full" preserveAspectRatio="none" style={{ height: 28 }}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 25 L20 20 L40 22 L60 15 L80 18 L100 10 L120 12 L140 8 L160 5 L180 3 L200 1 L200 30 L0 30 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M0 25 L20 20 L40 22 L60 15 L80 18 L100 10 L120 12 L140 8 L160 5 L180 3 L200 1"
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Table rows */}
            <div className="space-y-1.5">
              {[80, 65, 50].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-white/5 flex-shrink-0" />
                  <div className="h-1.5 rounded bg-white/10 flex-1" style={{ maxWidth: `${w}%` }} />
                  <div className="h-1.5 w-8 rounded" style={{ background: 'rgba(124,58,237,0.25)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badge Web App */}
        <div
          className="absolute -bottom-2 -left-3 rounded-full px-2.5 py-1 text-[9px] font-bold whitespace-nowrap"
          style={{ background: 'rgba(255,140,0,0.85)', color: '#fff', boxShadow: '0 4px 12px rgba(255,140,0,0.35)' }}
        >
          Web App / PWA
        </div>
      </div>

      {/* Floating code snippet */}
      <div className="hidden lg:block absolute -right-4 top-4 rotate-2">
        <div
          className="rounded-lg p-2.5 font-mono text-[9px] leading-relaxed"
          style={{ background: 'rgba(0,0,0,0.88)', border: `1px solid ${VD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <p><span className="text-violet-400">const</span> <span className="text-zinc-300">app</span> = {'{'}</p>
          <p className="pl-3"><span className="text-zinc-500">platform:</span> <span className="text-orange-400">&apos;iOS/Android&apos;</span>,</p>
          <p className="pl-3"><span className="text-zinc-500">stack:</span> <span className="text-green-400">&apos;React Native&apos;</span>,</p>
          <p className="pl-3"><span className="text-zinc-500">deploy:</span> <span className="text-violet-400">&apos;App Store&apos;</span></p>
          <p>{'}'}</p>
        </div>
      </div>
    </div>
  )
}

const color = violet.color
const bg = violet.bg
const border = violet.border

export default function AppDevelopmentPage() {
  return (
    <main>
      <SchemaOrg schema={buildService({
        name: 'App development in Western Switzerland',
        url: '/en/digital-agency/app-development',
        description: 'Custom iOS, Android and web app development for SMBs in Geneva. React Native, Next.js, Supabase.',
        lang: 'en',
      })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Digital Agency', url: 'https://dkdp.ch/en/digital-agency' },
        { name: 'App development', url: 'https://dkdp.ch/en/digital-agency/app-development' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href={localizedPath('/agence-digitale', 'en')} className="text-text-muted text-sm hover:text-text transition-colors">
                Digital agency
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>App development</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">App development Geneva & Western Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  An app that <GradText as="span">runs your business</GradText>, not your patience.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  iOS, Android, web app or PWA: DKDP develops robust business applications for SMBs that want to digitalise their operations or create a new customer experience. A single point of contact, from the mockup to the store.
                </p>
                <HeroPills
                  items={[
                    { label: 'Fixed quote within 48h', Icon: FileText },
                    { label: 'Data in Switzerland or the EU', Icon: ShieldCheck },
                    { label: 'Maintenance included', Icon: Settings },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href={localizedPath('/contact', 'en')} size="lg">Discuss your project →</LiquidMetalButton>
                  <Link href="#types" className="text-sm text-text-muted hover:text-text transition-colors">
                    See the app types ↓
                  </Link>
                </div>
              </div>
              <HeroVisual />
            </div>
          </div>
        </section>
      </HeroBg>


      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '30+', l: 'Apps delivered', sub: 'Mobile, web and PWA' },
              { v: '3 platforms', l: 'iOS · Android · Web', sub: 'A single point of contact' },
              { v: '4.9/5', l: 'Client satisfaction', sub: 'Verified rating' },
              { v: '8 years', l: 'Of dev expertise', sub: 'In Western Switzerland' },
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
          { label: 'App types', href: '#types' },
          { label: 'Process', href: '#process' },
          { label: 'Stack', href: '#stack' },
          { label: 'Work', href: '#galerie' },
          { label: 'Why DKDP', href: '#pourquoi' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Discuss your project', href: localizedPath('/contact', 'en') }}
        accentColor="#A78BFA"
        accentBg="rgba(124,58,237,0.18)"
        accentBorder="rgba(124,58,237,0.30)"
      />

      {/* ── App types ── */}
      <section id="types" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">What we build</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Every app, a single point of contact.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                iOS, Android, web app or PWA. We choose the technology based on your real needs, not out of habit.
              </p>
            </div>
          </SectionReveal>
          <AppTypesSection />
        </div>
      </section>

      {/* ── Why a business app? ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">The real need</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                When Excel is no longer enough.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                An SMB that manages its interventions on paper, its orders by email or its clients in a spreadsheet loses time every day. It is not visible in the financials, but it is measurable in lost hours, errors and blocked growth.
              </p>
              <p className="text-text-secondary leading-relaxed">
                A well-designed business application automates repetitive tasks, centralises data and offers your teams and your clients an experience worthy of your business. Combined with our{' '}
                <Link href={localizedPath('/intelligence-artificielle/automatisation', 'en')} className="underline underline-offset-2 hover:text-text transition-colors" style={{ color }}>AI automation</Link>
                {' '}or{' '}
                <Link href={localizedPath('/intelligence-artificielle/agents-ia', 'en')} className="underline underline-offset-2 hover:text-text transition-colors" style={{ color }}>AI agents</Link>
                {' '}solutions, your application gains intelligence without weighing your teams down.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="flex flex-col gap-4">

                {/* Marquee */}
                <div className="relative overflow-hidden rounded-[12px] border border-border bg-bg-card py-3">
                  {/* fade edges */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10 bg-gradient-to-r from-bg-card to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10 bg-gradient-to-l from-bg-card to-transparent" />
                  <div className="flex w-max animate-marquee gap-0">
                    {[
                      'Field intervention management iOS/Android',
                      'Secure client portal',
                      'Online ordering tool',
                      'Real-time team dashboard',
                      'Mobile e-commerce app',
                      'HR or logistics management',
                      'MVP to validate an idea',
                      'Field intervention management iOS/Android',
                      'Secure client portal',
                      'Online ordering tool',
                      'Real-time team dashboard',
                      'Mobile e-commerce app',
                      'HR or logistics management',
                      'MVP to validate an idea',
                    ].map((item, i) => (
                      <span key={i} className="flex items-center gap-3 px-5 whitespace-nowrap text-[13px] text-text-secondary">
                        <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image with parallax */}
                <ParallaxImage
                  src="/images/apps/dkdp-besoin-app-metier-entreprise.webp"
                  alt="Professional using a custom business application developed by DKDP Geneva"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-[4/3] rounded-[16px] border border-border"
                  strength={10}
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <HeroBg blob1="rgba(124,58,237,0.12)" blob2="rgba(124,58,237,0.06)">
        <section id="process" className="py-24 border-y border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-16">
                <GradTag className="mb-4">Our method</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  From the spec sheet to the store, without nasty surprises.
                </h2>
                <p className="text-text-secondary mt-4 max-w-lg mx-auto text-sm">
                  Every step has concrete deliverables. You always know where your project stands.
                </p>
              </div>
            </SectionReveal>
            <ProcessTimeline steps={STEPS} />
          </div>
        </section>
      </HeroBg>

      {/* ── Tech stack ── */}
      <section id="stack" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Tech stack</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Technologies chosen to last.
              </h2>
              <p className="text-text-secondary mt-4 max-w-lg mx-auto text-sm">
                Every technology choice is justified by the project objectives. No trendy frameworks that will be obsolete in two years.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <TechStack />
          </SectionReveal>
        </div>
      </section>

      {/* ── App gallery ── */}
      <section id="galerie" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Interfaces we built</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Apps designed for real-world use.
              </h2>
              <p className="text-text-secondary mt-4 max-w-lg mx-auto text-sm">
                Mobile CRM, web SaaS, field management, e-commerce, PWA: each project has its own logic, its own use, its own business constraints.
              </p>
            </div>
          </SectionReveal>
          <AppGallery />
        </div>
      </section>

      {/* ── Why DKDP ── */}
      <section id="pourquoi" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Why DKDP</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                What concretely changes.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY.map((w, i) => (
              <SectionReveal key={w.title} delay={i * 0.09}>
                <div
                  className="flex gap-5 p-7 bg-bg-card border border-border rounded-[16px] h-full hover:-translate-y-0.5 transition-transform duration-300"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <w.Icon size={22} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="text-text font-bold text-lg mb-2">{w.title}</h3>
                    <p className="text-text-secondary leading-relaxed text-sm">{w.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <CTAFinal accentRgb="124,58,237" lang="en" />

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 border-t border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">FAQ</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Frequently asked questions.
              </h2>
            </div>
          </SectionReveal>
          <FAQSection items={FAQ} lang="en" />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials lang="en" />
    </main>
  )
}
