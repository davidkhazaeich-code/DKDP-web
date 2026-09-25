import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, ShieldCheck, AlertTriangle, Clock, Users, Award, Lock, Eye, Wifi, Monitor, Settings, Cpu, BookOpen, XCircle, Zap } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { TrustLine } from '@/components/ui/TrustLine'
import { HeroPills } from '@/components/ui/HeroPills'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))
const FormationTrainer = dynamic(() => import('@/components/sections/FormationTrainer').then(m => ({ default: m.FormationTrainer })))
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { orange } from '@/lib/tokens'
import { ThreatLevelChart } from './_components/ThreatLevelChart'

export const metadata: Metadata = {
  title: 'Cybersecurity Training Geneva & Switzerland · DKDP',
  description:
    'Cybersecurity training for SMEs and companies in French-speaking Switzerland. Phishing, ransomware, social engineering. Real simulations, best practices and an incident response plan. Free quote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training/cybersecurity',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/cybersecurite',
      en: 'https://dkdp.ch/en/corporate-training/cybersecurity',
      'x-default': 'https://dkdp.ch/formation-entreprise/cybersecurite',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-cybersecurite.png', width: 1376, height: 768, alt: 'Corporate cybersecurity training Geneva DKDP' }],
  },
}

const FAQ = [
  {
    question: 'Why train your employees in cybersecurity?',
    // 25/09/2026 : unsourced "95% of incidents" and "the most cost-effective measure" removed.
    answer:
      'Human error is often the starting point of a cybersecurity incident. A click on a phishing link, a shared password, a file downloaded from an unknown source: these are the real entry points for attacks. Training your teams therefore tackles attacks where they begin.',
  },
  {
    question: 'What does DKDP\'s cybersecurity training cover?',
    answer:
      'The training covers: recognising phishing and spoofing attempts, creating and managing secure passwords, the safe use of email and cloud tools, employees\' GDPR obligations, best practices on mobile devices, and the procedure to follow in case of an incident.',
  },
  {
    question: 'How long does the cybersecurity training last?',
    // 25/09/2026 : "3.5 hours" and "7 hours" aligned with the grid (3 h + 1 h, 6 h + 2 h).
    answer:
      'An awareness workshop lasts half a day: 3 hours of training, preceded by 1 hour preparing your programme. A full training course covers an entire day: 6 hours of training, preceded by 2 hours of preparation. For teams that want a complete audit of their practices and systems, a 2-day format is available.',
  },
  {
    question: 'Does the training include attack simulations (simulated phishing)?',
    answer:
      'On request, DKDP can run a simulated phishing exercise before the training to assess how vigilant your teams are. This anonymous exercise serves as a concrete basis for the training and makes the risks immediately tangible.',
  },
  {
    question: 'Is the training suitable for non-technical staff?',
    answer:
      'Absolutely. DKDP\'s cybersecurity training is designed for employees without a technical background. We use concrete examples and real-world scenarios to make the risks understandable to everyone.',
  },
  {
    question: 'Does cybersecurity concern SMEs or only large companies?',
    // 25/09/2026 : unsourced "more than 60% of cyberattacks" and "losses of tens of thousands
    // of francs" removed.
    answer:
      'SMEs are directly concerned, because they often have fewer protections than a large company. A training session of a few hours therefore teaches every employee to recognise the most common attacks.',
  },
]

const MODULES = [
  'Understand current cyberthreats (phishing, ransomware, social engineering)',
  'Recognise a fraudulent email and a suspicious link',
  'Create and manage strong passwords (password manager)',
  'Two-factor authentication (2FA): practical setup',
  'Secure browsing and public Wi-Fi',
  'Backups and data recovery',
  'Best practices on professional mobile devices',
  'Emergency procedure in case of a security incident',
]

const color = orange.color, bg = orange.bg, border = orange.border

const steps = [
  { Icon: Eye, title: 'Awareness', desc: 'Real attack cases on Swiss SMEs presented with quantified impact. We make concrete what seems abstract.' },
  { Icon: AlertTriangle, title: 'Attack simulations', desc: 'Phishing and social engineering detection exercises. Each participant identifies the traps in real time.' },
  { Icon: Lock, title: 'Best practices', desc: 'Hands-on setup: 2FA on critical tools, password manager, backup procedure.' },
  { Icon: ShieldCheck, title: 'Incident response plan', desc: 'Procedures to follow in case of an incident. Each participant leaves with a personalised quick-reference sheet.' },
]

export default function FormationCybersecuritePage() {
  return (
    <main>
      {/* 25/09/2026 : duration PT3H30M brought back to PT3H, the grid half day (3 h of training). */}
      <SchemaOrg schema={buildCourse({ name: 'Corporate Cybersecurity Training French-speaking Switzerland', url: '/en/corporate-training/cybersecurity', description: 'Cybersecurity training for SMEs in Geneva. Phishing, ransomware, social engineering and best practices for non-technical teams.', duration: 'PT3H', teaches: ['Phishing', 'Ransomware', 'Passwords', 'GDPR', 'Cyber incident response plan'], prerequisites: 'No technical prerequisites', priceFrom: 200, lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Corporate Training', url: 'https://dkdp.ch/en/corporate-training' },
        { name: 'Cybersecurity', url: 'https://dkdp.ch/en/corporate-training/cybersecurity' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href={localizedPath('/formation-entreprise', 'en')} className="text-text-muted text-sm hover:text-text transition-colors">
                Corporate Training
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Cybersecurity</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Corporate cybersecurity training Geneva & French-speaking Switzerland</h1>
                {/* 25/09/2026 : "costs" becomes "can cost", the comparison rests on no figure. */}
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  One misplaced click can cost <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>more</GradText>{' '}than a day of training.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP trains your teams to recognise and avoid cyberthreats: phishing, ransomware, social engineering. Hands-on training with real simulations, for SMEs and companies in Geneva and French-speaking Switzerland.
                </p>
                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: 'Practical cases', Icon: Zap },
                    { label: 'Phishing simulations', Icon: ShieldCheck },
                    { label: 'All sectors', Icon: Users },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href={localizedPath('/contact', 'en') + '?service=formation'} size="lg">Request a quote →</LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-text transition-colors">
                    See the programme ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Programme updated: April 2026</p>
              </div>
              <div className="relative">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-cybersecurite.webp"
                    alt="Corporate cybersecurity training in Geneva"
                    fill
                    className="object-cover"
                    priority
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
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
              // 25/09/2026 : unsourced "90% human breaches", "CHF 200k average cost" and "0% phishing
              // clicks after training" removed. Grid facts instead; the NCSC cell names its source, kept.
              { v: '1 to 10', l: 'People per session', sub: 'Groups on quote from 3' },
              { v: '1/2', l: 'SMEs attacked/year', sub: 'In Switzerland (NCSC Report 2024)' },
              { v: '5.0/5', l: 'Google rating', sub: '22 reviews on the DKDP listing' },
              { v: '3 h or 6 h', l: 'Half day or full day', sub: 'Plus 1 h or 2 h of preparation' },
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
          { label: 'Why now', href: '#pourquoi' },
          { label: 'Programme', href: '#programme' },
          { label: 'Profiles', href: '#profils' },
          { label: 'How it works', href: '#deroulement' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: localizedPath('/contact', 'en') }}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ── Why now ── */}
      <section id="pourquoi" className="scroll-mt-[124px] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Why now</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Why cybersecurity is urgent for Swiss SMEs
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Unlike large companies, SMEs have few protections and are seen as easy targets. A single human error is enough: a click on a phishing link, a reused password, an email impersonating a senior executive.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP does not deal in abstract theory. We present real cases that happened in Switzerland, we simulate the attacks, and we give every participant the concrete reflexes to deal with them. In half a day, your teams become your first line of defence. Discover the <Link href={localizedPath('/blog', 'en') + '/cybersecurite-pme-erreurs-courantes'} className="underline hover:text-text transition-colors">8 most common cybersecurity mistakes in SMEs</Link>.
              </p>
              {/* 25/09/2026 : unsourced "90% of cyberattacks" and "CHF 200'000 average cost" rewritten without figures. The NCSC line names its source, kept. */}
              <div className="space-y-3">
                {[
                  'A cyberattack often starts with human error, not with a technical flaw',
                  'One in two Swiss SMEs is the victim of a cyberattack every year (NCSC 2024)',
                  'A security incident is costly for an SME: downtime, lost data, damage to its reputation',
                ].map((fact, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{fact}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-5 md:p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(255,107,0,0.07)' }}
              >
                <ThreatLevelChart />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Programme ── */}
      <section id="programme" className="scroll-mt-[124px] py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Cybersecurity training programme
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Cybersecurity is not just for technicians. DKDP explains the concrete risks your employees face every day: fraudulent emails, weak passwords, unsecured connections. We make threats tangible with real examples of incidents that happened in Switzerland.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Each module ends with simple rules to apply immediately. No technical jargon: concrete, memorable and actionable prevention.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {MODULES.map((item) => (
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

      {/* ── Who it is for ── */}
      <section id="profils" className="scroll-mt-[124px] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profiles</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Who is corporate cybersecurity training for?
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {[
              'Any company employee',
              'Administrative teams',
              'Staff working remotely',
              'HR and sensitive departments',
              'Management and executives',
              'SMEs with no security policy',
              'Regulated sectors (healthcare, finance, law)',
              'New company joiners',
            ].map((role, i) => (
              <SectionReveal key={role} delay={i * 0.07}>
                <div
                  className="flex items-center justify-center text-center p-4 rounded-[12px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <p className="text-text font-medium text-sm">{role}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="deroulement" className="scroll-mt-[124px] py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">How it works</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                How the cybersecurity training works
              </h2>
            </div>
          </SectionReveal>
          <div className="relative">
            <div aria-hidden="true" className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,140,0,0.20) 5%, rgba(255,140,0,0.70) 25%, #FF8C00 50%, rgba(255,140,0,0.70) 75%, rgba(255,140,0,0.20) 95%, transparent)' }} />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <SectionReveal key={s.title} delay={i * 0.08}>
                  <div className="flex flex-col gap-3 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                    <div className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}>
                      <s.Icon size={20} style={{ color }} />
                    </div>
                    <h3 className="text-text font-semibold text-sm">{s.title}</h3>
                    <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FormationTrainer accentColor='#FF8C00' lang="en" />

      {/* 25/09/2026 : anonymous testimonials removed (Marc D., Nicolas R., Sandra M.), no source. The real Google reviews live in FormationTrainer. */}

      {/* ── Pricing ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section id="tarifs" className="scroll-mt-[124px] py-24 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Cybersecurity training pricing
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                The price depends on the number of participants. Half day (4h) or full day (8h).
              </p>
            </div>
          </SectionReveal>
          <FormationPricing lang="en" />
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Your questions about the cybersecurity training" lang="en" />
      </div>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/formation-entreprise/informatique', 'en')}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,0,0.07) 0%, rgba(255,107,0,0.02) 100%)',
                borderColor: border,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Monitor size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Complementary training</p>
                  <p className="text-text font-bold text-lg leading-tight">Corporate IT Skills Training</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Your teams handle the threats. So they are also autonomous in their everyday IT environment, discover our IT skills training.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                See the training <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal accentRgb="255,140,0" lang="en" />
    </main>
  )
}
