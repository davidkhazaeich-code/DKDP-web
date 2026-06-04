import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Monitor, Smartphone, FileSpreadsheet, Bot, Share2,
  Palette, Shield, Code,
  User, Briefcase, UserSearch, GraduationCap,
  CalendarCheck, MessageSquare,
  ChevronRight, Star, ExternalLink, MapPin, Phone,
  Clock,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { TrustLine } from '@/components/ui/TrustLine'
import { HeroPills } from '@/components/ui/HeroPills'
import { GradText } from '@/components/ui/GradText'
import dynamic from 'next/dynamic'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal   = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
import { buildCourse, buildBreadcrumbList } from '@/lib/schema'
import { orange } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS, BUREAUTIQUE_LOGOS, DESIGN_WEB_LOGOS, SOCIAL_LOGOS } from '@/components/ui/AppLogos'

export const metadata: Metadata = {
  title: 'Computer Training for Individuals Geneva · DKDP',
  description:
    'In-home computer lessons for individuals in Geneva. 463+ satisfied clients, 4.6/5 stars. Excel, AI, smartphone, cybersecurity. CHF 150/h, no commitment.',
  alternates: {
    canonical: 'https://dkdp.ch/en/individual-training',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-particuliers',
      en: 'https://dkdp.ch/en/individual-training',
      'x-default': 'https://dkdp.ch/formation-particuliers',
    },
  },
  openGraph: {
    title: 'Computer Training for Individuals Geneva · DKDP',
    description: 'In-home computer lessons for individuals in Geneva: Excel, AI, smartphone, cybersecurity. CHF 150/h, no commitment.',
    url: 'https://dkdp.ch/en/individual-training',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-particuliers.png', width: 1376, height: 768, alt: 'Computer training for individuals Geneva: in-home Excel, AI, smartphone, cybersecurity lessons by DKDP' }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/og/formation-particuliers.png'] },
}

const accent          = orange.color
const cardBg          = 'var(--bg-card)'
const cardBorder      = 'var(--border)'
const highlightBg     = 'var(--orange-bg)'
const highlightBorder = 'var(--orange-border)'

// ── Topics ──────────────────────────────────────────────────────────────────

const TOPICS = [
  {
    Icon: Monitor,
    title: 'Computer basics',
    desc: 'Getting started with Mac or PC, browsing the internet, managing files and emails. Ideal for beginners and seniors.',
    tags: ['Mac & PC', 'Internet', 'Emails'],
    href: 'https://cours-informatique.ch/cours-informatique/ordinateur/',
  },
  {
    Icon: Smartphone,
    title: 'Smartphone',
    desc: 'iPhone and Android: apps, photos, WhatsApp, settings, synchronisation and mobile security.',
    tags: ['iPhone', 'Android', 'Apps'],
    href: 'https://cours-informatique.ch/cours-informatique/smartphone-iphone-android/',
  },
  {
    Icon: FileSpreadsheet,
    title: 'Office tools',
    desc: 'Word, Excel, PowerPoint, Outlook, Notion. From simple formulas to pivot tables.',
    tags: ['Excel', 'Word', 'PowerPoint', 'Outlook'],
    href: 'https://cours-informatique.ch/cours-informatique/bureautique-word-excel/',
  },
  {
    Icon: Bot,
    title: 'Artificial Intelligence',
    desc: 'ChatGPT, Claude, Copilot, Midjourney. Effective prompting, image generation and everyday automation.',
    tags: ['ChatGPT', 'Claude', 'Prompting'],
    href: 'https://cours-informatique.ch/formation-intelligence-artificielle-ai/',
    highlight: true,
  },
  {
    Icon: Share2,
    title: 'Social media',
    desc: 'LinkedIn, Instagram, TikTok, Facebook. Create content, grow your presence and schedule your posts.',
    tags: ['LinkedIn', 'Instagram', 'TikTok'],
    href: 'https://cours-informatique.ch/cours-informatique/formation-reseaux-sociaux-linkedin-instagram-tiktok/',
  },
  {
    Icon: Palette,
    title: 'Canva & Video editing',
    desc: 'Create visuals, resumes, flyers and presentations with Canva. Video editing with CapCut, iMovie and Premiere.',
    tags: ['Canva', 'CapCut', 'iMovie'],
    href: 'https://cours-informatique.ch/canva/',
  },
  {
    Icon: Shield,
    title: 'Cybersecurity',
    desc: 'Recognise online scams, manage your passwords and protect your personal data.',
    tags: ['Phishing', 'Passwords', 'Data'],
    href: 'https://cours-informatique.ch/formation-cybersecurite/',
  },
  {
    Icon: Code,
    title: 'Web & Development',
    desc: 'WordPress, Figma, Elementor. Python, HTML/CSS, JavaScript to go further into the digital world.',
    tags: ['WordPress', 'Python', 'HTML/CSS'],
    href: 'https://cours-informatique.ch/cours-informatique/formation-développement-web/',
  },
]

// ── Who it is for ─────────────────────────────────────────────────────────────

const PUBLICS = [
  { Icon: User,          title: 'Retiree or senior',         desc: 'Master the internet, email, smartphone and everyday tools.' },
  { Icon: Briefcase,     title: 'Professional retraining',   desc: 'Learn new digital tools to switch roles.' },
  { Icon: GraduationCap, title: 'Job seeker',                desc: 'Strengthen your profile with valuable digital skills.' },
  { Icon: UserSearch,    title: 'Freelancer / Self-employed', desc: 'Save time with AI and digital tools.' },
]

// ── Modalities ────────────────────────────────────────────────────────────────

const MODALITES = [
  {
    Icon: MapPin,
    title: 'In-home or online',
    desc: 'The trainer comes to your home in Geneva, or by video call. Free travel within the Eaux-Vives district.',
  },
  {
    Icon: User,
    title: '100% personalised lessons',
    desc: 'A programme tailored to your level, your pace and your goals. Never a one-size-fits-all course.',
  },
  {
    Icon: CalendarCheck,
    title: 'No commitment',
    desc: 'Lessons available right away, session by session, with no subscription or minimum package. Total flexibility.',
  },
  {
    Icon: MessageSquare,
    title: 'Funding available',
    desc: 'Unemployment, social assistance, disability insurance. The team guides you through the process.',
  },
]

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: 'I am a complete beginner, is that a problem?',
    answer:
      'Not at all. Most participants start from scratch. The first lesson is used to assess your starting level and tailor the programme. We move at your pace, never putting you in a difficult position.',
  },
  {
    question: 'Where do the lessons take place?',
    answer:
      'The trainer comes directly to your home in Geneva. Travel is free for Eaux-Vives residents, and from 20 to 100 CHF for the rest of the canton depending on distance. Lessons are also available by video call.',
  },
  {
    question: 'What is the exact price?',
    answer:
      'CHF 150 per hour, with no hidden fees. Travel fees apply only outside Eaux-Vives (20 to 100 CHF depending on distance). Payment by bank transfer, cash or Swiss QR invoice.',
  },
  {
    question: 'Is there any commitment on the number of lessons?',
    answer:
      'No. No subscription or minimum package. You book session by session according to your availability. A block of several sessions at a preferential rate is possible, to be discussed during the first contact.',
  },
  {
    question: 'Can the training be funded?',
    answer:
      'Yes. Funding is available through unemployment insurance, social assistance or disability insurance. The team supports you throughout the process.',
  },
  {
    question: 'Do you offer online lessons?',
    answer:
      'Yes, all lessons are available by video call via Zoom or Teams. Screen sharing, working on your files in real time, the same quality as in person, with no travel.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IndividualTrainingPage() {
  return (
    <main>
      <SchemaOrg
        schema={buildCourse({
          name: 'Computer Training for Individuals · cours-informatique.ch',
          url: '/en/individual-training',
          description:
            'In-home computer lessons for individuals in Geneva. 463+ satisfied clients. Excel, AI, smartphone, cybersecurity. CHF 150/h, no commitment.',
          lang: 'en',
        })}
      />
      <SchemaOrg schema={buildBreadcrumbList([{ name: 'Home', url: '/en' }, { name: 'Individual training', url: '/en/individual-training' }])} />

      {/* ── Hero ── */}
      <HeroBg
        blob1="rgba(255,107,0,0.13)"
        blob2="rgba(255,107,0,0.06)"
        accentRgb="255,140,0"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Left */}
              <div>
                <GradTag className="mb-6">Individual training</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Learn computing{' '}
                  <GradText as="span">at home, in Geneva.</GradText>
                </h1>
                <p className="text-text-secondary text-lg leading-relaxed mb-4">
                  Through{' '}
                  <a
                    href="https://cours-informatique.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-75"
                    style={{ color: accent }}
                  >
                    cours-informatique.ch
                  </a>
                  , our platform dedicated to individuals: personalised private lessons, in-home or online, with no commitment.
                </p>

                {/* Social proof */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="flex gap-0.5" aria-label="4.6 stars out of 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} style={{ color: accent, fill: accent }} aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-text font-semibold text-sm">4.6/5</span>
                  <span className="text-text-muted text-sm">· 463+ satisfied Geneva residents</span>
                </div>

                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: 'One-to-one lesson', Icon: User },
                    { label: 'At your own pace', Icon: Clock },
                    { label: 'In-home or online', Icon: MapPin },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href="https://cours-informatique.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] font-semibold text-sm text-text transition-opacity hover:opacity-85"
                    style={{ background: accent }}
                  >
                    Visit cours-informatique.ch <ExternalLink size={14} aria-hidden="true" />
                  </a>
                  <a
                    href="tel:+41799407969"
                    className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
                  >
                    <Phone size={13} aria-hidden="true" />
                    +41 79 940 79 69
                  </a>
                </div>
              </div>

              {/* Right: info card */}
              <div>
                <div className="mb-6 lg:mb-8" aria-label="Tools taught in individual training">
                  <AppLogoMarquee
                    logos={[...IA_LOGOS.slice(0, 5), ...BUREAUTIQUE_LOGOS, ...DESIGN_WEB_LOGOS, ...SOCIAL_LOGOS]}
                    durationSeconds={180}
                    size="md"
                  />
                </div>
              <SectionReveal delay={0.15}>
                <div
                  className="hidden lg:flex flex-col gap-5 rounded-2xl p-7 border"
                  style={{ background: cardBg, borderColor: cardBorder }}
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/partners/ci-mascot-thumbs.svg"
                      alt="cours-informatique.ch mascot"
                      width={120}
                      height={120}
                      className="flex-shrink-0"
                    />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">
                        Our dedicated platform
                      </p>
                      <p className="text-text font-bold text-xl">cours-informatique.ch</p>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { val: '463+',    lbl: 'satisfied clients' },
                      { val: '4.6/5',   lbl: 'average rating' },
                      { val: '150 CHF', lbl: 'per hour' },
                      { val: 'Mon–Sat', lbl: '8:00 – 19:00' },
                    ].map(({ val, lbl }) => (
                      <div key={lbl}>
                        <p className="font-bold text-lg text-text leading-tight">{val}</p>
                        <p className="text-text-muted text-xs">{lbl}</p>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-border" />

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-text-muted text-xs">
                      <MapPin size={12} style={{ color: accent }} aria-hidden="true" />
                      36 Rue du 31 Décembre, 1207 Geneva (Eaux-Vives)
                    </div>
                    <div className="flex items-center gap-2 text-text-muted text-xs">
                      <Phone size={12} style={{ color: accent }} aria-hidden="true" />
                      +41 79 940 79 69 · Mon–Sat 8am–7pm
                    </div>
                  </div>
                </div>
              </SectionReveal>
              </div>

            </div>
          </div>
        </section>

      </HeroBg>

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { value: '463+',    label: 'Satisfied clients',    sub: 'in Geneva and French-speaking Switzerland' },
              { value: '4.6/5',   label: 'Average rating',        sub: 'on Trustindex' },
              { value: '150 CHF', label: 'Per hour',              sub: 'no hidden fees' },
              { value: 'Mon–Sat', label: '8am – 7pm',             sub: 'available 6 days a week' },
            ].map((s) => (
              <SectionReveal key={s.label}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-text mb-1">{s.value}</p>
                  <p className="text-text text-sm font-medium">{s.label}</p>
                  <p className="text-text-muted text-xs mt-1">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>





      <LogoBanner label="Trusted by" lang="en" />
      {/* ── Who it is for ── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Who is it for?</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Lessons for everyone, truly.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                cours-informatique.ch is for anyone who wants to progress,
                whatever their level. No prerequisites, no judgement.
                The programme is fully tailored to each profile.
              </p>
              <p
                className="text-sm italic text-text-muted"
                style={{ borderLeft: '2px solid rgba(255,107,0,0.30)', paddingLeft: '1rem' }}
              >
                &ldquo;Learn, practise, progress, have fun.&rdquo;
                <span className="block mt-1 not-italic font-semibold text-text-secondary">
                  cours-informatique.ch philosophy
                </span>
              </p>
            </SectionReveal>

            <div className="grid grid-cols-2 gap-3">
              {PUBLICS.map((p) => (
                <SectionReveal key={p.title}>
                  <div
                    className="flex flex-col gap-2.5 p-4 rounded-[14px] border h-full"
                    style={{ background: cardBg, borderColor: cardBorder }}
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-[8px]"
                      style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid rgba(255,107,0,0.18)` }}
                    >
                      <p.Icon size={16} style={{ color: accent }} aria-hidden="true" />
                    </div>
                    <p className="text-text font-semibold text-sm leading-tight">{p.title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Topics ── */}
      <section id="formations" className="py-24 bg-bg-card border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Topics</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                8 subjects, each available in Geneva.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                Click on a topic to discover the full course details on cours-informatique.ch.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPICS.map((t, i) => (
              <SectionReveal key={t.title} delay={i * 0.05}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full rounded-[16px] border p-5 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: t.highlight ? highlightBg : cardBg,
                    borderColor: t.highlight ? highlightBorder : cardBorder,
                  }}
                >
                  {t.highlight && (
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>
                      Trending 2026
                    </p>
                  )}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] mb-3"
                    style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid rgba(255,107,0,0.15)` }}
                  >
                    <t.Icon size={18} style={{ color: accent }} aria-hidden="true" />
                  </div>
                  <h3 className="text-text font-bold text-base mb-2">{t.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed flex-1">{t.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-3 mb-3">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(212,212,216,0.07)',
                          color: '#A1A1AA',
                          border: '1px solid rgba(212,212,216,0.12)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold mt-auto transition-gap"
                    style={{ color: accent }}
                  >
                    View this course <ExternalLink size={11} aria-hidden="true" />
                  </span>
                </a>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Price & Modalities ── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            <SectionReveal>
              <GradTag className="mb-4">Price</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                CHF 150 per hour,<br />no surprises.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                A single, transparent rate. Travel is free in Eaux-Vives,
                from 20 to 100 CHF for the rest of the canton of Geneva.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'In-home or online lessons (Zoom / Teams)',
                  'Free travel in Eaux-Vives, 1207 Geneva',
                  'No commitment, session by session',
                  'Payment by bank transfer, cash or Swiss QR invoice',
                  'Funding available (unemployment, social assistance, disability insurance)',
                  'Monday to Saturday, 8am to 7pm',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div
                      className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                      style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid rgba(255,107,0,0.18)`, color: accent }}
                    >
                      ✓
                    </div>
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="flex flex-col gap-3">
                {MODALITES.map((m) => (
                  <div
                    key={m.title}
                    className="flex gap-4 p-5 rounded-[14px] border"
                    style={{ background: cardBg, borderColor: cardBorder }}
                  >
                    <div
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px]"
                      style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid rgba(255,107,0,0.15)` }}
                    >
                      <m.Icon size={16} style={{ color: accent }} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-text font-semibold text-sm mb-0.5">{m.title}</p>
                      <p className="text-text-muted text-xs leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        items={FAQ_ITEMS}
        title="Your questions about training for individuals"
        lang="en"
      />

      {/* ── Bridge to corporate ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[16px] border p-7"
              style={{ background: cardBg, borderColor: cardBorder }}
            >
              <p className="text-text-secondary text-sm leading-relaxed max-w-xl">
                Are you a company? Discover our corporate training for teams.
                Tailor-made programmes, in person or remote.
              </p>
              <Link
                href={localizedPath('/formation-entreprise', 'en')}
                className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-[10px] transition-opacity hover:opacity-80"
                style={{ background: 'rgba(255,107,0,0.12)', color: accent, border: `1px solid rgba(255,107,0,0.22)` }}
              >
                Corporate training <ChevronRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <CTAFinal accentRgb="255,140,0" lang="en" />
    </main>
  )
}
