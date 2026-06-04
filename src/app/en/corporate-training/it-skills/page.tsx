import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, ShieldCheck, AlertTriangle, Clock, Users, Award, Star, Lock, Eye, Wifi, Monitor, Settings, Cpu, BookOpen, Zap } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { TrustLine } from '@/components/ui/TrustLine'
import { HeroPills } from '@/components/ui/HeroPills'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))
const FormationTrainer = dynamic(() => import('@/components/sections/FormationTrainer').then(m => ({ default: m.FormationTrainer })))
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { orange } from '@/lib/tokens'
import { AppLogoMarquee, BUREAUTIQUE_LOGOS, PRODUCTIVITE_LOGOS } from '@/components/ui/AppLogos'
import { ITProblemsComparison } from './_components/ITProblemsComparison'

export const metadata: Metadata = {
  title: 'IT Skills Training Geneva and French-speaking Switzerland · DKDP',
  description:
    'IT skills training for SMEs in Geneva and French-speaking Switzerland. Windows, emails, network, collaboration tools. All levels, on site. Request your free quote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training/it-skills',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/informatique',
      en: 'https://dkdp.ch/en/corporate-training/it-skills',
      'x-default': 'https://dkdp.ch/formation-entreprise/informatique',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-informatique.png', width: 1376, height: 768, alt: 'IT skills corporate training Geneva DKDP' }],
  },
}

const FAQ = [
  {
    question: 'What is general IT skills training for in a company?',
    answer:
      'Many employees have been using their computer for years without mastering the basics that really save time: keyboard shortcuts, file organisation, collaboration tools, automatic backups. A half-day of training can save 30 minutes per day and per person.',
  },
  {
    question: 'Does the training cover Windows and Mac?',
    answer:
      'Yes. DKDP adapts the training to your IT environment: Windows 10/11, macOS, or both if your team is mixed. We always start from what your employees actually use.',
  },
  {
    question: 'Can you train employees with very different levels?',
    answer:
      'Yes, with a little organisation. For groups with very mixed levels, DKDP recommends splitting into two groups (beginner and intermediate) or defining a common base and optional modules for the more advanced participants.',
  },
  {
    question: 'Does the training cover cloud tools (Google Drive, OneDrive)?',
    answer:
      'Yes. Using the cloud effectively is a core module: synchronisation, file sharing, real-time collaboration, permission management. We cover Google Workspace or Microsoft 365 depending on your environment.',
  },
  {
    question: 'Does the training include advice on digital organisation?',
    answer:
      'Yes. A complete module is dedicated to digital organisation: folder structure, file naming, email management (sorting, archiving, automatic filters), and task management tools.',
  },
  {
    question: 'How much does IT skills training cost for a team?',
    answer:
      'Our training is billed by the hour according to the size of the group: CHF 150/h for 1 person, CHF 200/h for 2 people, CHF 250/h for 3 to 6 people and CHF 300/h for 6 to 10 people. The half-day (4h) or the full day (8h) include tailored preparation.',
  },
]

const MODULES = [
  'Windows 10/11: navigation, customisation and optimisation',
  'File and folder management (efficient organisation)',
  'Basic security: strong passwords, updates, antivirus',
  'Professional emails (Outlook): organisation and automatic rules',
  'Network connection and sharing (Wi-Fi, printers, VPN)',
  'Automatic backups (OneDrive, cloud)',
  'Web browsers and online productivity tools',
  'Introduction to collaboration tools (Teams, Google Workspace)',
]

const color = orange.color, bg = orange.bg, border = orange.border

const steps = [
  { Icon: Monitor, title: 'Group diagnosis', desc: 'Assessment of the real level of each participant. Programme adjusted according to the gaps identified.' },
  { Icon: Settings, title: 'Guided practice', desc: 'Exercises on the participants\' machines. We solve the real problems they face every day.' },
  { Icon: Cpu, title: 'Everyday cases', desc: 'Simulation of common breakdowns and simple troubleshooting procedures. Immediate autonomy.' },
  { Icon: Award, title: 'Follow-up and certificate', desc: 'Digital reference guide delivered. Individual certificate. Answers to questions 30 days after the training.' },
]

export default function FormationInformatiquePage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({ name: 'Corporate IT Skills Training French-speaking Switzerland', url: '/en/corporate-training/it-skills', description: 'IT skills training for SMEs in Geneva. Windows, emails, network, collaboration tools. All levels, on site.', duration: 'P1D', teaches: ['Windows', 'File management', 'Professional emails', 'Collaboration tools', 'Cloud'], prerequisites: 'No technical prerequisites', priceFrom: 200, ratingValue: '4.9', ratingCount: 500, lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Corporate Training', url: 'https://dkdp.ch/en/corporate-training' },
        { name: 'IT skills', url: 'https://dkdp.ch/en/corporate-training/it-skills' },
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
              <span className="text-sm" style={{ color }}>IT skills</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">IT skills corporate training Geneva and French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>No more</GradText>{' '}calling IT for every little task.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP trains your SME employees in French-speaking Switzerland to use Windows, emails, the network and collaboration tools in complete autonomy. All levels, on site in Geneva.
                </p>
                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: '100% hands-on', Icon: Zap },
                    { label: 'Your own tools', Icon: Monitor },
                    { label: 'All levels', Icon: Users },
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
                <div className="mb-6 lg:mb-8" aria-label="IT tools your teams master">
                  <AppLogoMarquee
            logos={[...BUREAUTIQUE_LOGOS, ...PRODUCTIVITE_LOGOS]}
            durationSeconds={162}
            size="md"
          />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-informatique.webp"
                    alt="IT skills corporate training in Geneva"
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
        </section>      </HeroBg>





      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '-40%', l: 'IT tickets reduced', sub: 'After training the teams' },
              { v: '2h/week', l: 'Saved', sub: 'Per trained employee' },
              { v: '95%', l: 'Autonomy', sub: 'On common IT tasks' },
              { v: '15 years', l: 'Of IT experience', sub: 'Geneva and French-speaking Switzerland' },
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
      {/* ══ Subnav sticky ══ */}
      <ScrollSpyNav
        items={[
          { label: 'Programme', href: '#programme' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: localizedPath('/contact', 'en') }}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ── Intro definition ── */}
      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
            DKDP corporate IT skills training is aimed at SMEs in Geneva and French-speaking Switzerland that want to strengthen the digital skills of their employees. Windows, professional emails, cloud, collaboration tools: your teams gain autonomy and efficiency in a single day. All levels are welcome, from the complete beginner to the employee who wants to structure their habits.
          </p>
        </div>
      </section>

      {/* ── Why now ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Why now</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Why your teams need IT skills training
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Jammed printer, file nowhere to be found, overflowing inbox, network that will not respond: these small everyday problems are expensive in lost productivity. And every call to IT support ties up two people instead of one.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP trains your teams on their real machines, with their real problems. The result: immediate autonomy, fewer IT tickets, and employees who gain confidence and efficiency the very day after the training.
              </p>
              <div className="space-y-3">
                {[
                  'Trained teams reduce their IT tickets by 40% on average',
                  'Each trained employee saves 2 hours per week on common tasks',
                  '95% of participants report being autonomous on IT tasks after the training',
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
                <ITProblemsComparison />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Programme ── */}
      <section id="programme" className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Corporate IT skills training programme
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Most IT training spends too much time on theory. DKDP focuses on the daily actions that make the difference: how to find a file in 5 seconds, share a document without creating 4 versions, or sort 100 emails in 10 minutes.
              </p>
              <p className="text-text-secondary leading-relaxed">
                The training is adapted to your environment (Windows, Mac, Google Workspace, Microsoft 365) and to the real level of your teams. We start where you are.
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

      {/* ── Who is it for ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profiles</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Who is corporate IT skills training for?
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {[
              'New joiners in a company',
              'Employees not comfortable with IT',
              'Senior workers in retraining',
              'Secretaries and assistants',
              'SMEs without a dedicated IT team',
              'Anyone wishing to gain IT autonomy',
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
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">How it works</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                How the IT skills training works
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

      <FormationTrainer accentColor='#FF8C00' />

      {/* ── Testimonials ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">What they say</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Feedback after the IT skills training
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                quote: 'Our employees used to call IT support 15 times a week for basic problems. After the training, it is 4 times. And these are real problems.',
                name: 'Jean-Pierre L., IT Manager',
                company: 'SME of 60 people, Geneva',
                stars: 5,
              },
              {
                quote: 'We trained our 8 administrative assistants. They now manage their backups, their network and their emails in complete autonomy.',
                name: 'Isabelle C., HR Director',
                company: 'Medical practice, Lausanne',
                stars: 5,
              },
              {
                quote: 'At 58, I was embarrassed to ask my colleagues basic questions. DKDP\'s training made me autonomous without judging me.',
                name: 'Patrick S., Employee',
                company: 'Public sector, Geneva',
                stars: 5,
              },
            ].map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={12} style={{ color }} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${border}` }}>
                    <p className="text-text font-semibold text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                IT skills training pricing
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                The price depends on the number of participants. Half-day (4h) or full day (8h).
              </p>
            </div>
          </SectionReveal>
          <FormationPricing lang="en" />
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Your questions about the IT skills training" lang="en" />
      </section>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/formation-entreprise/cybersecurite', 'en')}
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
                  <ShieldCheck size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Complementary training</p>
                  <p className="text-text font-bold text-lg leading-tight">Corporate Cybersecurity Training</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    You are now autonomous on IT. To protect your company from cyber threats, discover our cybersecurity training.
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
