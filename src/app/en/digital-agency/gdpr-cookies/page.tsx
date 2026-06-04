import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, XCircle, ChevronRight, ShieldCheck, BarChart2, Clock, Globe2, Zap, AlertTriangle, Lock, Star } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { violet, green } from '@/lib/tokens'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))

export const metadata: Metadata = {
  title: 'GDPR and FADP Geneva & French-speaking Switzerland | Cookie banner | DKDP',
  description:
    'GDPR and FADP compliance for companies and SMBs in Geneva. Cookie banner, privacy policy, processing register. Audit within 48h, from CHF 800.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/gdpr-cookies',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/rgpd-cookies',
      en: 'https://dkdp.ch/en/digital-agency/gdpr-cookies',
      'x-default': 'https://dkdp.ch/agence-digitale/rgpd-cookies',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    url: 'https://dkdp.ch/en/digital-agency/gdpr-cookies',
    images: [{ url: '/images/og/rgpd-cookies.png', width: 1376, height: 768, alt: 'GDPR and FADP compliance Geneva DKDP' }],
  },
}

const FAQ = [
  {
    question: 'Is my website necessarily subject to GDPR in Switzerland?',
    answer:
      'If your site is visited by people residing in the EU or if you process personal data of European citizens, the GDPR applies even if you are based in Switzerland. The Swiss FADP (Federal Act on Data Protection) applies to all Swiss companies. DKDP helps you comply with both.',
  },
  {
    question: 'What is the FADP and how does it differ from the GDPR?',
    answer:
      'The FADP (revised nFADP in force since September 2023) is the Swiss data protection law. It is close to the GDPR but has some differences: no obligation to appoint a DPO in all cases, a register of processing activities is required, and different penalties. GDPR compliance largely ensures FADP compliance.',
  },
  {
    question: 'What must a compliant cookie banner contain?',
    answer:
      'A compliant banner must clearly inform about the use of cookies, request explicit and granular consent (by category), allow users to refuse as easily as to accept, and allow them to change their preferences at any time. DKDP implements solutions compliant with these requirements.',
  },
  {
    question: 'How much does GDPR compliance cost at DKDP?',
    answer:
      'A compliance audit is billed at CHF 800. The complete Compliance Pack (audit + implementation + documents) is CHF 2\'500. Monthly monitoring is available at CHF 350/month for companies that want to delegate regulatory watch.',
  },
  {
    question: 'What is a register of processing activities?',
    answer:
      'It is an internal document that lists all the personal data processing carried out by your company: contact forms, newsletter, analytics, CRM, etc. It is mandatory for any company with more than 250 employees and recommended for all others. DKDP creates and documents it for you.',
  },
  {
    question: 'My site uses Google Analytics. Is that GDPR compliant?',
    answer:
      'Google Analytics 4 (GA4) with IP anonymisation and a properly configured consent banner is generally accepted. DKDP can configure GA4 in a compliant mode or suggest a privacy-friendly alternative such as Plausible.',
  },
  {
    question: 'What penalties do you risk in case of non-compliance?',
    answer:
      'Under GDPR: up to 4% of annual worldwide turnover or 20 million euros. Under the revised Swiss FADP: up to CHF 50\'000 in case of infringement. Beyond fines, your reputation is at stake. DKDP protects you before it happens.',
  },
]

const BENEFITS = [
  {
    Icon: ShieldCheck,
    value: '0 CHF',
    title: 'Zero fines',
    desc: 'Once compliant, you eliminate the risk of a fine of up to CHF 50\'000 (Swiss FADP) or 4% of worldwide turnover (European GDPR) in case of an inspection.',
  },
  {
    Icon: Zap,
    value: '48h',
    title: 'Express audit',
    desc: 'The full audit of your situation is delivered within 48h. You know exactly where you stand and what must be fixed first.',
  },
  {
    Icon: Lock,
    value: '100%',
    title: 'Guaranteed compliance',
    desc: 'After implementation, you receive a DKDP compliance certificate. You can respond to any client or authority request.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Initial audit',
    desc: 'Analysis of your site, collection practices, processors and existing documents. Report delivered within 48h.',
  },
  {
    step: '02',
    title: 'Report',
    desc: 'Identification of each non-compliance with a risk level (critical / important / minor) and an action plan.',
  },
  {
    step: '03',
    title: 'Implementation',
    desc: 'Setup of the cookie banner, drafting of legal documents, compliance of forms.',
  },
  {
    step: '04',
    title: 'Contracts and registers',
    desc: 'Drafting or adapting data processing agreements (DPA) and creating the register of processing activities.',
  },
  {
    step: '05',
    title: 'Certification and training',
    desc: 'Delivery of the DKDP compliance certificate, team training and setup of annual monitoring.',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

export default function GDPRCookiesPage() {
  return (
    <main>
      <SchemaOrg schema={buildService({ name: 'GDPR and FADP compliance French-speaking Switzerland', url: '/en/digital-agency/gdpr-cookies', description: 'GDPR and revised FADP compliance for SMBs in Geneva. 48h audit, cookie banner, privacy policy, register of processing activities, compliance certificate.', lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Digital Agency', url: 'https://dkdp.ch/en/digital-agency' },
        { name: 'GDPR and Cookies', url: 'https://dkdp.ch/en/digital-agency/gdpr-cookies' },
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
              <span className="text-sm" style={{ color }}>GDPR and Cookies</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">GDPR and FADP compliance Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Compliant in <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>5 days</GradText>. At peace for <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>years</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP supports companies and SMBs in Geneva with their GDPR and FADP compliance: cookie banner, privacy policy, register of processing activities. Audit delivered within 48h, full implementation in 5 days.
                </p>
                <HeroPills
                  items={[
                    { label: 'Free site audit', Icon: Zap },
                    { label: 'Compliant in 2 weeks', Icon: Clock },
                    { label: '12-month updates', Icon: ShieldCheck },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href={`${localizedPath('/contact', 'en')}?service=service-digital`} size="lg">Request an audit →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-text transition-colors">
                    Our method ↓
                  </Link>
                </div>
              </div>
              {/* HeroVisual (inlined, translated) */}
              <div className="relative flex flex-col gap-4">
                {/* Compliance Scanner */}
                <div
                  className="rounded-[14px] overflow-hidden"
                  style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${border}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green-400">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[10px] text-zinc-400 font-mono">Compliance audit</span>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-400/10 text-green-400">Compliant</span>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Big score */}
                    <div className="flex items-center gap-5">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
                          <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
                          <circle
                            cx="48" cy="48" r="40" fill="none"
                            stroke="#4ade80" strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 40 * 0.97} ${2 * Math.PI * 40 * 0.03}`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-green-400">97%</span>
                          <span className="text-[8px] text-zinc-500">compliant</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 flex-1">
                        {[
                          { cat: 'GDPR (EU)', score: 100, color: '#4ade80' },
                          { cat: 'revFADP (Switzerland)', score: 100, color: '#4ade80' },
                          { cat: 'Cookies (ePrivacy)', score: 92, color: '#fbbf24' },
                        ].map((c) => (
                          <div key={c.cat}>
                            <div className="flex justify-between text-[10px] mb-0.5">
                              <span className="text-zinc-400">{c.cat}</span>
                              <span className="font-bold" style={{ color: c.color }}>{c.score}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: c.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Checklist items */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                      {[
                        { item: 'Cookie banner', done: true },
                        { item: 'Privacy policy', done: true },
                        { item: 'Processing register', done: true },
                        { item: 'DPA contracts', done: true },
                        { item: 'Form consent', done: true },
                        { item: 'Breach procedure', done: false },
                      ].map((c) => (
                        <div key={c.item} className="flex items-center gap-1.5 text-[10px]">
                          {c.done ? (
                            <span className="text-green-400 text-[8px]">&#10003;</span>
                          ) : (
                            <span className="text-amber-400 text-[8px]">&#9679;</span>
                          )}
                          <span className={c.done ? 'text-zinc-400' : 'text-amber-300'}>{c.item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating risk meter */}
                <div className="absolute -right-2 top-8 rotate-1 hidden lg:block">
                  <div
                    className="rounded-lg p-3 text-center"
                    style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
                  >
                    <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1">Fine risk</p>
                    <p className="text-xl font-bold text-green-400">Low</p>
                    <p className="text-[8px] text-zinc-500 mt-0.5">After compliance</p>
                  </div>
                </div>

                {/* Floating before/after */}
                <div className="absolute -left-3 bottom-16 -rotate-2 hidden lg:block">
                  <div
                    className="rounded-lg p-2.5"
                    style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(252,165,165,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
                  >
                    <div className="flex gap-3">
                      <div className="text-center">
                        <p className="text-[7px] text-zinc-600 uppercase">Before</p>
                        <p className="text-sm font-bold text-red-400">23%</p>
                      </div>
                      <div className="text-zinc-600 self-center">&#8594;</div>
                      <div className="text-center">
                        <p className="text-[7px] text-zinc-600 uppercase">After</p>
                        <p className="text-sm font-bold text-green-400">97%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { v: '97%', l: 'Compliance score', c: '#4ade80' },
                    { v: '48h', l: 'Setup', c: violet.color },
                    { v: 'Included', l: 'Certificate issued', c: '#FF8C00' },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="text-center py-3 rounded-[10px]"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <p className="text-lg font-bold" style={{ color: s.c }}>{s.v}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </HeroBg>


      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: 'CHF 50k', l: 'Max FADP fine', sub: 'Swiss revFADP law 2023' },
              { v: '72h', l: 'Notification deadline', sub: 'In case of a data breach' },
              { v: '100%', l: 'Guaranteed compliance', sub: 'After our intervention' },
              { v: '5 days', l: 'Turnaround time', sub: 'From report to implementation' },
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
          { label: 'Process', href: '#process' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: localizedPath('/contact', 'en') }}
        accentColor={color}
        accentBg={bg}
        accentBorder={border}
      />

      {/* ── Our approach ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Our approach</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                GDPR and FADP compliance audit: our method in 5 steps.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                GDPR compliance is not optional. But it must not block you either. DKDP takes care of the entire compliance of your site: audit of processing activities, drafting of legal documents, and technical implementation of the cookie banner.
              </p>
              <p className="text-text-secondary leading-relaxed">
                We clearly explain what you need to do, why, and we set it up for you. No useless legal jargon: concrete, operational compliance.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Complete FADP / GDPR compliance audit',
                  'Cookie banner implementation (Axeptio or Cookiebot)',
                  'Drafting of the privacy policy',
                  'Register of processing activities',
                  'Compliance of contact forms',
                  'Data processing agreements (DPA)',
                  'Team training on best practices',
                  'Annual monitoring and updates',
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

      {/* ── Insight ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">The real problem</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Legal risks without GDPR compliance for Swiss companies.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Most Swiss SMBs do not know they are in breach. A form without a legal notice, an analytics cookie without consent, a processor without a DPA contract: each of these points can trigger a penalty or a complaint from a competitor.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: AlertTriangle, title: 'CHF 50\'000 maximum fine under revFADP 2023 in case of intentional infringement', sub: 'Federal Act on Data Protection, in force since Sept. 2023' },
                  { Icon: AlertTriangle, title: '4% of worldwide turnover or 20M euros under European GDPR in case of breach', sub: 'Regulation (EU) 2016/679, applicable if you have clients in the EU' },
                  { Icon: AlertTriangle, title: '72h to notify the authorities in case of a personal data leak', sub: 'Legal GDPR and revFADP deadline, non-compliance aggravates penalties' },
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
                  Without compliance vs after a DKDP audit
                </p>
                {/* ComplianceGap (inlined, translated) */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="p-4 rounded-[12px]" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}>
                    <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4 text-center">Current risks</p>
                    <div className="space-y-2.5">
                      {[
                        'Cookies without valid consent',
                        'Privacy policy missing or incomplete',
                        'Non-compliant forms',
                        'Processors without DPA contracts',
                        'Missing processing register',
                        'Fine up to CHF 50\'000',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <XCircle size={12} className="flex-shrink-0 mt-0.5 text-red-400" />
                          <span className="text-text-secondary text-[11px] leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-[12px]" style={{ background: green.bg, border: `1px solid ${green.border}` }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: green.color }}>Fixed situation</p>
                    <div className="space-y-2.5">
                      {[
                        'Compliant cookie banner (Axeptio / Cookiebot)',
                        'Complete and up-to-date privacy policy',
                        'Forms with legal notices',
                        'DPA contracts signed with processors',
                        'Complete processing register',
                        'DKDP compliance certificate delivered',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <CheckCircle2 size={12} className="flex-shrink-0 mt-0.5" style={{ color: green.color }} />
                          <span className="text-text-secondary text-[11px] leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Every non-compliant point is an active legal risk. DKDP handles them all.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Protection</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                The concrete benefits of GDPR compliance.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </section>

      {/* ── Offers / Pricing ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="py-24 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                GDPR compliance pricing in Geneva.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Each service is defined before we start. No hourly billing, no surprises during the engagement.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'FADP Audit',
                price: 'CHF 800',
                duration: 'One-off service',
                highlight: false,
                features: [
                  'Complete compliance audit',
                  'Identification of all non-compliances',
                  'Documented report with prioritisation',
                  '5-step remediation roadmap',
                  'Risk presentation',
                ],
                cta: 'Order the audit',
              },
              {
                label: 'Compliance Pack',
                price: "CHF 2'500",
                duration: 'Recommended',
                highlight: true,
                features: [
                  'Initial audit included',
                  'Compliant cookie banner (Axeptio/Cookiebot)',
                  'Privacy policy drafted',
                  'Processing register',
                  'Forms brought into compliance',
                  'DPA contract templates provided',
                ],
                cta: 'Start compliance',
              },
              {
                label: 'Compliance + Monitoring',
                price: 'CHF 350/month',
                duration: 'After the Compliance Pack',
                highlight: false,
                features: [
                  'Guaranteed annual updates',
                  'Regulatory watch included',
                  'GDPR request handling (access, erasure)',
                  'Support in case of an inspection',
                  'Annual document review',
                ],
                cta: 'Secure my compliance',
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
                        Most requested
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
                      href={`${localizedPath('/contact', 'en')}?service=service-digital`}
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
                Compliant in 5 steps.
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

      {/* ── Testimonials ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Testimonials</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                They are compliant. They sleep better.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'We had ignored the GDPR for 3 years. A competitor filed a complaint. DKDP made us compliant in one week. Flawless and responsive work.',
                author: 'Director',
                company: 'E-commerce SMB, Geneva',
                stars: 5,
              },
              {
                quote: 'Our site was collecting data without the right forms. DKDP sorted everything out in 48h. Our lawyer validated the work without a single correction.',
                author: 'Founder',
                company: 'HR firm, Lausanne',
                stars: 5,
              },
              {
                quote: 'As a healthcare practitioner, compliance is non-negotiable. DKDP knows the specifics of sensitive data. An impeccable result.',
                author: 'Independent physician',
                company: 'Medical practice, Geneva',
                stars: 5,
              },
            ].map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full p-7 rounded-[16px] border"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={12} style={{ color }} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="text-text font-semibold text-sm">{t.author}</p>
                    <p className="text-text-muted text-xs mt-0.5">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Case studies + Guarantees ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Case studies</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Concrete compliance work.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                client: 'B2C e-commerce SMB',
                type: 'Complete compliance',
                image: '/images/services/dkdp-agence-rgpd.webp',
                results: ['Audit + implementation in 5 days', 'GDPR-compliant Axeptio banner', 'Privacy policy + DPA delivered'],
                tech: 'Axeptio · GDPR · DPA · FADP',
              },
              {
                client: 'Medical practice',
                type: 'Health data (sensitive)',
                image: '/images/services/dkdp-agence-consulting.webp',
                results: ['Complete processing register', 'Compliant patient forms', '5-person team training'],
                tech: 'FADP · Health · Register · DPA',
              },
              {
                client: 'B2B SaaS startup',
                type: 'GDPR + Processors',
                image: '/images/services/dkdp-agence-creation-web.webp',
                results: ['12 processor DPA contracts', 'Privacy policy EN + FR', 'CNIL-compliant cookie notice'],
                tech: 'GDPR · DPA · Cookiebot · Multilingual',
              },
            ].map((r, i) => (
              <SectionReveal key={r.client} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{ borderColor: border }}
                >
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={r.image}
                      alt={r.client}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', color, border: `1px solid ${border}` }}
                    >
                      {r.type}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1" style={{ background: bg }}>
                    <p className="text-text font-bold mb-4">{r.client}</p>
                    <div className="space-y-2 flex-1">
                      {r.results.map((res) => (
                        <div key={res} className="flex items-center gap-2">
                          <Star size={11} style={{ color }} className="flex-shrink-0" />
                          <span className="text-text text-sm font-semibold">{res}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-text-muted text-[11px] mt-4 font-mono">{r.tech}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Guarantees */}
          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Our commitments
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { Icon: ShieldCheck, title: 'FADP + GDPR covered', desc: 'DKDP masters both regulations. If you have clients in the EU, you are covered on both fronts.' },
                  { Icon: BarChart2, title: 'Proprietary documents', desc: 'All documents produced belong entirely to you. No dependency on our platform or subscription.' },
                  { Icon: Clock, title: 'Guaranteed deadline', desc: 'Audit delivered within 48h, standard Compliance Pack implementation within 5 business days. No workload on your side.' },
                  { Icon: Globe2, title: 'Regulatory watch', desc: 'The law evolves. DKDP updates your documents every year so your compliance stays current without any effort on your part.' },
                ].map((g) => (
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
      <FAQSection items={FAQ} title="Frequently asked questions about GDPR, FADP and cookies" lang="en" />

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/agence-digitale/creation-site-web', 'en')}
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
                  <Globe2 size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Next step</p>
                  <p className="text-text font-bold text-lg leading-tight">Web design</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Your compliance is in order. For a modern, high-performing and SEO-optimised website that bakes in these standards from the design stage, discover our web design service.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                See web design <ChevronRight size={12} />
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
