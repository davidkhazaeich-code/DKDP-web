import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, Zap, Users, Award, BookOpen, FileText } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
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
import { AppLogoMarquee, BUREAUTIQUE_LOGOS, PRODUCTIVITE_LOGOS } from '@/components/ui/AppLogos'
import { ExcelSkillsComparison } from './_components/ExcelSkillsComparison'

export const metadata: Metadata = {
  title: 'Office and Excel Training Geneva and French-speaking Switzerland | DKDP',
  description:
    'Office and Excel corporate training in Geneva and French-speaking Switzerland. Word, PowerPoint, Microsoft 365. Programme tailored to your team, SME or large company. Free quote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training/office-tools',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/bureautique',
      en: 'https://dkdp.ch/en/corporate-training/office-tools',
      'x-default': 'https://dkdp.ch/formation-entreprise/bureautique',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-bureautique.png', width: 1376, height: 768, alt: 'Office and Excel corporate training Geneva DKDP' }],
  },
}

const FAQ = [
  {
    question: 'What skill levels does the office training cover?',
    answer:
      'DKDP offers office training for every level: beginner (navigation, files, basic software), intermediate (Excel formulas, advanced formatting, mail merge) and advanced (pivot tables, Excel macros, Power Query). The level of the group is assessed beforehand.',
  },
  {
    question: 'Which applications are covered in the office training?',
    answer:
      'The training covers Microsoft Excel, Word, PowerPoint and Outlook. We can also include Microsoft Teams, SharePoint, OneDrive and the Microsoft 365 collaboration tools depending on your needs.',
  },
  {
    question: 'How long does corporate office training last?',
    answer:
      'A half-day (3h) covers the basics of a specific application. A full day (6h) lets you go deep on Excel or Microsoft 365. A 2-day programme is recommended to cover the entire office suite.',
  },
  {
    question: 'Can the training take place on our own computers?',
    answer:
      'Yes, and it is even preferable. Working on your own machines with your own files makes the training immediately applicable. DKDP can also bring laptops if needed.',
  },
  {
    question: 'How is the participants\' level assessed before the training?',
    answer:
      'DKDP sends a simple assessment questionnaire before each training. This lets us tailor the programme to the real level of the group and avoid wasting time on concepts already mastered.',
  },
  {
    question: 'Do participants receive training materials?',
    answer:
      'Yes. Each participant receives a digital course handout (PDF or Notion) with the key steps, essential shortcuts and practical exercises to complete independently after the training.',
  },
]

const MODULES = [
  'Excel: essential formulas (SUMIF, VLOOKUP, INDEX/MATCH, COUNTIF)',
  'Excel: conditional formatting and dynamic charts',
  'Excel: pivot tables and Power Query',
  'Word: templates, styles and professional mail merge',
  'PowerPoint: designing convincing presentations',
  'Outlook: advanced email management and automatic rules',
  'Microsoft 365: Teams, SharePoint, OneDrive and real-time collaboration',
  'Shortcuts and automations to save 3h per week',
]

const STEPS = [
  {
    Icon: BookOpen,
    title: 'Initial assessment',
    desc: 'Questionnaire sent in advance to calibrate the level of the group. Programme tailored on the day.',
  },
  {
    Icon: Users,
    title: 'Hands-on training',
    desc: 'Work on your real files and real cases. No fictional exercises: we improve your existing documents.',
  },
  {
    Icon: Award,
    title: 'Exercises and quiz',
    desc: 'Progressive exercises throughout the day. Consolidation quiz at the end of the session.',
  },
  {
    Icon: CheckCircle2,
    title: 'Materials and certificate',
    desc: 'Digital reference guide delivered. Individual training certificate. Questions and answers 30 days after.',
  },
]

const color = orange.color, bg = orange.bg, border = orange.border

export default function FormationBureautiquePage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({ name: 'Office and Excel Microsoft 365 Training French-speaking Switzerland', url: '/en/corporate-training/office-tools', description: 'Professional office training in Geneva. Excel, Word, PowerPoint, Outlook and Microsoft 365 for corporate teams.', duration: 'P1D', teaches: ['Excel', 'Word', 'PowerPoint', 'Microsoft 365', 'Pivot tables'], prerequisites: 'No technical prerequisites', priceFrom: 200, ratingValue: '4.9', ratingCount: 500, lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Corporate Training', url: 'https://dkdp.ch/en/corporate-training' },
        { name: 'Office and Excel', url: 'https://dkdp.ch/en/corporate-training/office-tools' },
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
              <span className="text-sm" style={{ color }}>Office and Excel</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Office and Excel training Geneva and French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>3 hours</GradText>{' '}on Excel. We teach them to do it in <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>30 minutes</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP trains your teams on Excel, Word, PowerPoint and Microsoft 365 on site in Geneva and across French-speaking Switzerland. Programme tailored to your SME or large company, to your level and your real usage. Your employees leave with skills they can apply the very next day.
                </p>
                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: '100% hands-on', Icon: Zap },
                    { label: 'On your real files', Icon: FileText },
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
                <div className="mb-6 lg:mb-8" aria-label="Office applications your teams master">
                  <AppLogoMarquee
            logos={[...BUREAUTIQUE_LOGOS, ...PRODUCTIVITE_LOGOS]}
            durationSeconds={153}
            size="md"
          />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-bureautique.webp"
                    alt="Office and Excel corporate training in Geneva"
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
              { v: '3h', l: 'Saved / week', sub: 'Per trained employee' },
              { v: '10%', l: 'Features used', sub: 'Of Excel on average' },
              { v: '85%', l: 'Satisfaction', sub: 'Post-training score' },
              { v: '1 day', l: 'To master it all', sub: 'Intensive hands-on format' },
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
      {/* ── Intro definition ── */}
      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
            DKDP office training is designed for SMEs and companies in Geneva and French-speaking Switzerland that want to strengthen their teams' mastery of Excel, Word and Microsoft 365. In a half-day or a full day, your employees learn to save time on daily tasks, from Excel formulas to PowerPoint presentations. All levels are welcome.
          </p>
        </div>
      </section>

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
                Why train your teams on Excel and office tools
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Most employees use only 10% of the features in Excel or Word. Hours lost every week on tasks that could be automated in a few clicks. DKDP training targets the 20% of features that cover 80% of daily needs.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                We do not work on fictional exercises. We take your real spreadsheets, your real files, and improve them together. From the very next morning, your teams apply what they have learned.
              </p>
              <div className="space-y-3">
                {[
                  'Employees trained in advanced Excel save 3 hours per week on average',
                  'Fewer than 10% of Excel users master pivot tables',
                  'Microsoft 365 is underused in 9 out of 10 companies according to Microsoft',
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
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Before vs after the training
                </p>
                <ExcelSkillsComparison />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  The same person, the same tool. Just the right techniques.
                </p>
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
                Excel, Word and Microsoft 365 training programme
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                The training begins with an assessment of the group's level, then we dive straight into practice. Each module is illustrated with your real use cases. We do not run demos: we work on your real documents.
              </p>
              <p className="text-text-secondary leading-relaxed">
                At the end of the session, each participant has a complete reference guide and an individual certificate. No useless theory: only what is usable the next day.
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
      <section id="profils" className="scroll-mt-[124px] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profiles</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Who is the corporate office training for?
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Administrative assistants',
              'Accountants and analysts',
              'Project officers',
              'Managers and executives',
              'Sales teams',
              'Any Microsoft 365 user',
              'Medical secretaries',
              'HR and recruiters',
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
                A structured day for maximum results.
              </h2>
            </div>
          </SectionReveal>
          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(255,140,0,0.20) 5%, rgba(255,140,0,0.70) 25%, #FF8C00 50%, rgba(255,140,0,0.70) 75%, rgba(255,140,0,0.20) 95%, transparent)',
              }}
            />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((s, i) => (
                <SectionReveal key={s.title} delay={i * 0.08}>
                  <div className="flex flex-col gap-3 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                    <div
                      className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
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
                Feedback after the office training
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'After DKDP\'s Excel training, I automated 4 weekly tasks. What used to take me 3 hours now takes 20 minutes. Magic.',
                name: 'Sophie B., Accountant',
                company: 'Financial SME, Geneva',
                stars: 5,
              },
              {
                quote: 'Our entire administrative team took the training. We now use Teams and SharePoint effectively. Collaboration has been transformed.',
                name: 'Marie D., HR Director',
                company: 'Company of 120 people, Lausanne',
                stars: 5,
              },
              {
                quote: 'I had been using Excel for 15 years but I did not really know what it was. The training opened my eyes to what I was missing.',
                name: 'Isabelle T., Project Officer',
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
                      <span key={j} style={{ color }}>★</span>
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
        <section id="tarifs" className="scroll-mt-[124px] py-24 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Office training pricing
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
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Your questions about the office training" lang="en" />
      </div>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/formation-entreprise/ia', 'en')}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,0,0.06) 0%, rgba(255,107,0,0.02) 100%)',
                borderColor: 'rgba(255,140,0,0.22)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Zap size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Go further</p>
                  <p className="text-text font-bold text-lg leading-tight">ChatGPT and Claude training</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    You have mastered the office tools. To go even further by automating your repetitive tasks with AI, discover our ChatGPT and Claude training.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                See the AI training <ChevronRight size={12} />
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
