import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, Users, Star, Layers, PenTool, Layout, Globe2, Zap, Code2, MapPin } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { AppLogoMarquee, DESIGN_WEB_LOGOS } from '@/components/ui/AppLogos'
import { FigmaPillars } from '@/components/formation/figma/FigmaPillars'
import { DesignVocabulary } from '@/components/formation/figma/DesignVocabulary'
import { FigmaToolComparison } from '@/components/formation/figma/FigmaToolComparison'
import { FigmaLevels } from '@/components/formation/figma/FigmaLevels'
import { FigmaUseCases } from '@/components/formation/figma/FigmaUseCases'
import { IntraVsCatalogue } from '@/components/formation/figma/IntraVsCatalogue'
import { FigmaTrainer } from '@/components/formation/figma/FigmaTrainer'
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { orange } from '@/lib/tokens'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))

export const metadata: Metadata = {
  title: 'Figma Training for Companies in Geneva and Switzerland | DKDP',
  // Measured at 914 px against a ~920 px desktop SERP limit: it renders in full.
  description:
    'Figma training for teams and SMEs in Geneva, Switzerland. Mockups, wireframes, prototypes and design systems, on your projects. Free quote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training/figma',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/figma',
      en: 'https://dkdp.ch/en/corporate-training/figma',
      'x-default': 'https://dkdp.ch/formation-entreprise/figma',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-figma.png', width: 1376, height: 768, alt: 'Figma corporate training in Geneva: mockups, prototypes and design systems' }],
  },
}

const FAQ = [
  {
    question: 'What is corporate Figma training?',
    answer:
      'Corporate Figma training teaches your colleagues to design the screens of your digital projects themselves: wireframes, mockups, clickable prototypes and a component library. At DKDP it takes place at your offices, on your own projects rather than an invented exercise, and runs from half a day to two full days depending on the level you need.',
  },
  {
    question: 'Do you need to be a designer to take Figma training?',
    answer:
      'No. The programme is built for non-designers: project managers, marketing leads, founders, executive assistants, developers and engineers. We start from the basics of layout (grid, hierarchy, contrast, legibility) and build up from there. No drawing or graphic design skill is required.',
  },
  {
    question: 'Is Figma free?',
    answer:
      'Yes, to get started. The Figma Starter plan is free with no end date: you get unlimited files in your personal drafts, plus three shared files for co-editing, each limited to three pages. Version history is kept for 30 days. A paid plan becomes useful once several people work together across many files. No licence is needed to attend the training.',
  },
  {
    question: 'Is Figma available in French?',
    answer:
      'Yes. Figma has offered a French interface since 15 October 2025, across the browser, desktop app and mobile app, switchable in the account language preferences. It matters for a team in French-speaking Switzerland: the training can run entirely in French, including the names of the features.',
  },
  {
    question: 'How long does it take to learn Figma?',
    answer:
      'Half a day is enough to read, comment on and edit an existing file. A full day lets someone produce a screen end to end: wireframe, mockup, clickable prototype. Two days are needed to maintain a shared library over time, with its components, variables and naming rules.',
  },
  {
    question: 'Figma or Canva: which one should we choose?',
    answer:
      'The two tools serve different jobs. Canva is built for communication material: posters, social posts, presentations, documents. Figma is built for interfaces: website screens, app screens, user journeys. If you need marketing assets, Canva is enough. If you need to design a site or an application before having it built, it is Figma.',
  },
  {
    question: 'What is the difference between a wireframe, a mockup and a prototype?',
    answer:
      'A wireframe is a black-and-white sketch that settles what goes where, with no visual decisions. A mockup is a faithful picture of the finished screen, with real colours, real typography and real images. A prototype links those mockups so you can click from screen to screen and test the journey on a real phone. All three are made in Figma, and the training covers them in that order.',
  },
  {
    question: 'What is Auto Layout in Figma?',
    answer:
      'Auto Layout is Figma’s automatic layout system. Instead of aligning every element by hand, you set spacing and alignment rules and the frame adapts on its own when the content or the screen width changes. It is what lets you build the mobile, tablet and desktop versions in parallel rather than duplicating the work three times.',
  },
  {
    question: 'What is a design system, and do we need one?',
    answer:
      'A design system gathers your reusable pieces (buttons, cards, forms, colours, typography, spacing) together with the rules for using them. Editing the original updates it everywhere it appears. For an SME, a small design system that is actually maintained beats an ambitious one abandoned after three months, and that is what we build during the training, at your scale.',
  },
  {
    question: 'Is Dev Mode and developer handover covered?',
    answer:
      'Yes, from the full-day level onwards. Figma’s Dev Mode provides measurements, colours, fonts, spacing, image exports and the matching CSS straight from the mockup. Your developers, agency or supplier stop working from hand-annotated screenshots. The module is adapted when the technical team does not come from a web background.',
  },
  {
    question: 'Does Figma run on both Mac and Windows?',
    answer:
      'Yes, on both, and directly in the browser with nothing to install. That is a practical difference from Sketch, which remains macOS only. A mixed Mac and Windows team can therefore work on the same files, which is the most common situation in Swiss SMEs.',
  },
  {
    question: 'Can the training take place at our offices?',
    answer:
      'Yes, and it is the format we recommend. DKDP travels across Geneva and French-speaking Switzerland. Working on your own machines, with your files and your real constraints, produces better results than a neutral classroom. Remote sessions remain possible for teams spread across several sites.',
  },
  {
    question: 'How much does corporate Figma training cost in Switzerland?',
    answer:
      'The price depends on the number of participants and the duration chosen, from half a day to two days. Our corporate training rates start at CHF 200 per hour for one person. The quote is free and the programme is scoped against your projects before it is priced, rather than sold off a catalogue.',
  },
  {
    question: 'Do participants receive a certificate?',
    answer:
      'Each participant receives a named certificate of attendance stating the programme covered, the duration and the dates. It is an internal record and a useful document for a continuing-education file. It is not a qualification issued or recognised by the state, and we prefer to say so plainly.',
  },
]

const color = orange.color, bg = orange.bg, border = orange.border

const steps = [
  {
    Icon: Layers,
    title: 'Scoping beforehand',
    desc: 'A conversation before the session to identify your projects, your brand and the team’s real starting level. The content is built on that.',
  },
  {
    Icon: PenTool,
    title: 'Structure and wireframes',
    desc: 'Design principles, then your screens laid out in low fidelity. Journeys get validated before any visual decision.',
  },
  {
    Icon: Layout,
    title: 'Mockups and components',
    desc: 'Auto Layout, reusable components and a library in your brand. Your screens move to high fidelity, responsive.',
  },
  {
    Icon: Code2,
    title: 'Prototype and handover',
    desc: 'A clickable journey testable on a phone, and Dev Mode set up for your developers or your supplier.',
  },
]

const REGIONS = [
  'Geneva', 'Lausanne', 'Nyon', 'Morges', 'Vevey', 'Montreux',
  'Fribourg', 'Neuchâtel', 'Sion', 'Yverdon-les-Bains',
]

export default function FigmaTrainingPage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({
        name: 'Corporate Figma training, Geneva and French-speaking Switzerland',
        url: '/en/corporate-training/figma',
        description: 'Figma training for teams, SMEs and companies in Geneva and French-speaking Switzerland. Wireframes, mockups, clickable prototypes, design systems and developer handover, at your offices and on your own projects.',
        duration: 'P1D',
        teaches: ['Figma', 'Mockup design', 'Wireframes', 'Interactive prototypes', 'Auto Layout', 'Design system', 'Components and variants', 'Dev Mode', 'UI/UX Design'],
        prerequisites: 'No technical prerequisites and no graphic design skills required',
        priceFrom: 200,
        ratingValue: '4.9',
        ratingCount: 500,
        image: 'https://dkdp.ch/images/services/dkdp-formation-figma-geneve.webp',
        lang: 'en',
      })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Corporate Training', url: 'https://dkdp.ch/en/corporate-training' },
        { name: 'Figma Training', url: 'https://dkdp.ch/en/corporate-training/figma' },
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
              <span className="text-sm" style={{ color }}>Figma Training</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Figma training in Geneva and French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Design your screens before you have them <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>built</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP trains your teams on Figma, the tool that has become the standard for designing interfaces.
                  Wireframes, mockups, clickable prototypes and design systems, on your real projects, at your offices.
                </p>
                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: '100% hands-on', Icon: Zap },
                    { label: 'On your projects', Icon: Layout },
                    { label: 'Every sector', Icon: Users },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href={localizedPath('/contact', 'en') + '?service=formation'} size="lg">Request a quote →</LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-text transition-colors">
                    See the programme ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Programme updated: August 2026</p>
              </div>
              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="Design and web tools we teach">
                  <AppLogoMarquee logos={DESIGN_WEB_LOGOS} durationSeconds={108} size="md" />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-figma-geneve.webp"
                    alt="Corporate Figma training in Geneva: a trainer guiding two colleagues through responsive mockups"
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
        </section>
      </HeroBg>

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: 'Free', l: 'To get started', sub: 'Three shared files, with no end date' },
              { v: 'French', l: 'Interface available', sub: 'Since October 2025' },
              { v: '1 day', l: 'For a complete screen', sub: 'Wireframe, mockup and prototype' },
              { v: 'On site', l: 'Geneva and the region', sub: 'At your offices, on your files' },
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
      <ScrollSpyNav
        items={[
          { label: 'Vocabulary', href: '#vocabulaire' },
          { label: 'Programme', href: '#programme' },
          { label: 'Use cases', href: '#cas-usage' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ── Standalone definition ── */}
      <section className="py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
            Figma is the tool on which most websites and applications are now designed: screens are drawn there,
            assembled into clickable journeys, and handed over to developers. DKDP trains SMEs, startups and teams
            across Geneva and French-speaking Switzerland to use it on their own projects, from half a day to two
            days, at their offices.
          </p>
        </div>
      </section>

      {/* ── Why ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Why now</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Why train your team on Figma
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Starting a digital project with no screens drawn means handing the interpretation of your needs to
                someone who does not know your business. The result is rarely bad technically. It is simply beside
                the point, and you find out at the moment when fixing it costs the most.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Once your team can produce mockups, the conversation changes. You stop describing an intention and
                start showing a screen. Your supplier prices development instead of pricing uncertainty, and the
                trade-offs happen while they are still free.
              </p>
              <div className="space-y-3">
                {[
                  'Figma has had a French interface since October 2025, which removes the last barrier for a team that does not work in English',
                  'The free plan lets you start without a licence: three shared files, three pages per file, with no end date',
                  'Dev Mode provides measurements, colours and exports straight from the mockup, with no hand-annotated screenshots',
                  'In our sessions the hard part is almost never the tool: it is agreeing on what you want before drawing it',
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
                  The three mechanics that make Figma
                </p>
                <FigmaPillars lang="en" />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Each one is applied directly to a real screen from your business.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Vocabulary ── */}
      <section id="vocabulaire" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-4">
              <GradTag className="mb-4">Designing mockups</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Wireframe, mockup, prototype, design system
              </h2>
            </div>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-14 leading-relaxed">
              These four words describe four different things, and confusing them is expensive in meetings.
              Here is what each one covers, in the order you produce them.
            </p>
          </SectionReveal>
          <DesignVocabulary lang="en" />
        </div>
      </section>

      {/* ── Tool comparison ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-4">
              <GradTag className="mb-4">Choosing the tool</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Figma, Canva, Adobe XD or Sketch
              </h2>
            </div>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-14 leading-relaxed">
              The question comes up in every scoping call, usually as “we already have Canva, isn’t that enough?”.
              The honest answer: it depends entirely on what you are producing.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <FigmaToolComparison lang="en" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Programme by level ── */}
      <section id="programme" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-4">
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Three levels, based on what your team has to produce
              </h2>
            </div>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-14 leading-relaxed">
              The content is set during scoping, against your projects. This breakdown is a starting point, not a catalogue.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <FigmaLevels lang="en" accent={color} />
          </SectionReveal>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section id="cas-usage" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Use cases</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                What your teams actually do with it
              </h2>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <FigmaUseCases lang="en" accent={color} />
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden order-2 lg:order-1" style={{ boxShadow: '0 0 50px rgba(255,107,0,0.12)' }}>
                <Image
                  src="/images/services/dkdp-formation-figma-prototype-mobile.webp"
                  alt="Figma prototype tested on a phone: the mobile mockup built during training, clickable before development"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                  A journey you can test before it exists
                </h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  By the end of the day your screens are not images in a slide deck. They are linked together,
                  they open on a phone, and they can be walked through like a real application.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  That is when the flaws show up: one step too many, a button nobody finds, a form that is too long.
                  Fixing them takes five minutes in Figma. After development, it takes a quote.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── In-house vs catalogue ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-4">
              <GradTag className="mb-4">Our format</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Why we do not run off-the-shelf sessions
              </h2>
            </div>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-14 leading-relaxed">
              Most Figma courses in the region are taught in a classroom, on fixed dates, using an invented exercise.
              That format exists and works for discovering a tool. It is not the one we chose.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <IntraVsCatalogue lang="en" accent={color} />
          </SectionReveal>
        </div>
      </section>

      {/* ── Who it is for ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profiles</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Who Figma training is for
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Marketing and communication leads',
              'Project and product managers',
              'Founders and SME leadership',
              'Developers moving into design',
              'Executive assistants and internal teams',
              'Technical offices and engineering teams',
              'Graphic designers moving to interfaces',
              'Independents running their own site',
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

      {/* ── How a session runs ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">How it runs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                How a session unfolds
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
              {steps.map((s, i) => (
                <SectionReveal key={s.title} delay={i * 0.08}>
                  <div className="flex flex-col gap-3 p-7 bg-bg border border-border rounded-[16px] h-full">
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

      <FigmaTrainer lang="en" accent={color} />

      {/* ── Testimonials ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">What they say</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Feedback after the Figma training
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'Auto Layout was a revelation. I can now lay out a mobile, tablet and desktop page in parallel without duplicating the work. My iterations are three times faster.',
                name: 'Julien K., Founder',
                company: 'Tech startup, Geneva',
                stars: 5,
              },
              {
                quote: 'We trained our whole product team on Figma and on the design system. Our visual brief became far more precise, and the back-and-forth with our development agency dropped noticeably.',
                name: 'Sophie B., Product Manager',
                company: 'SaaS scale-up, Lausanne',
                stars: 5,
              },
              {
                quote: 'Dev Mode saved me an enormous amount of time. I pull the colours, the spacing and the CSS directly without asking the designer a single question. Handover became smooth.',
                name: 'Marc D., Lead Developer',
                company: 'Industrial SME, Vaud',
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
                  Figma training pricing
                </h2>
                <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                  The price depends on the number of participants and the duration. Half a day, a full day or two days,
                  at your offices or remotely.
                </p>
              </div>
            </SectionReveal>
            <FormationPricing lang="en" />
          </div>
        </section>
      </HeroBg>

      {/* ── Coverage ── */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="rounded-[20px] border border-border bg-bg-card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <MapPin size={18} style={{ color }} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em]">
                  Figma training in Geneva and across French-speaking Switzerland
                </h2>
              </div>
              <p className="text-text-secondary leading-relaxed mb-6 max-w-3xl">
                DKDP is based in Geneva, in the Eaux-Vives district, and travels to your offices anywhere in
                French-speaking Switzerland. Travel is included in the rate for the canton of Geneva and its
                surroundings, and quoted separately beyond that. For teams spread across several sites, the session
                can run remotely, with the same exercises on the same files.
              </p>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map((city) => (
                  <span
                    key={city}
                    className="text-[12px] px-3 py-1.5 rounded-full border text-text-secondary"
                    style={{ background: bg, borderColor: border }}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Your questions about Figma training" lang="en" />
      </section>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/agence-digitale/creation-site-web', 'en')}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,0,0.06) 0%, rgba(255,107,0,0.02) 100%)',
                borderColor: border,
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
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Go further</p>
                  <p className="text-text font-bold text-lg leading-tight">You have the mockup. We build it.</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Your teams can now design their own screens in Figma. To turn those mockups into a fast,
                    well-ranked website, take a look at our web design service.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                View the service <ChevronRight size={12} />
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
