import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, Clock, Users, Award, Star, Layers, PenTool, Layout, Globe2, TrendingUp, BarChart2, Zap, Code2 } from 'lucide-react'
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
import { AppLogoMarquee, DESIGN_WEB_LOGOS } from '@/components/ui/AppLogos'
import { FigmaFeatureCards } from './_components/FigmaFeatureCards'

export const metadata: Metadata = {
  title: 'Figma Web Design Training Geneva & French-speaking Switzerland | UI/UX | DKDP',
  description:
    'Web design and Figma training for SMEs and companies in Geneva and French-speaking Switzerland. UI/UX, wireframes, mockups, design system, interactive prototypes. Design your site before you build it. Free quote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training/web-design',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/web-design',
      en: 'https://dkdp.ch/en/corporate-training/web-design',
      'x-default': 'https://dkdp.ch/formation-entreprise/web-design',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-web-design.png', width: 1376, height: 768, alt: 'Web design and Figma corporate training Geneva DKDP' }],
  },
}

const FAQ = [
  {
    question: 'Do you need to be a designer to take the Web Design training?',
    answer:
      "No. The training is designed for non-designer profiles: product managers, founders, technical marketers, front-end developers, entrepreneurs. We start from the UI/UX fundamentals (grid, hierarchy, typography, accessibility) and gradually build your first Figma mockups. No illustration or graphic design skill is required.",
  },
  {
    question: 'Why choose Figma over another design tool?',
    answer:
      "Figma has become the global standard for web design in 2026: 4 million active designers, used by 90% of tech startups and almost every large Swiss SME. Key advantages: real-time collaboration like Google Docs, a free plan that is enough to get started, a massive community of templates and plugins, and a built-in Dev Mode that simplifies the handoff to development.",
  },
  {
    question: 'What is Auto Layout in Figma and why does it matter?',
    answer:
      "Auto Layout is Figma's responsive layout system. Rather than aligning each element manually, you define rules (spacing, alignment, padding) and Figma adapts your frames automatically when the content changes. The result: mobile, tablet and desktop mockups built in parallel, without duplicating the work. It is one of the key skills of the training.",
  },
  {
    question: 'What is a design system and why build one?',
    answer:
      "A design system brings together the reusable components of your interface (buttons, cards, forms, typography, colours) with their variants and usage rules. A change to the main component propagates automatically everywhere. Benefits: guaranteed consistency, fast iterations, easier onboarding for new members. The training includes a dedicated module on creating a minimal but robust design system.",
  },
  {
    question: 'Does the training cover interactive prototypes?',
    answer:
      "Yes. A whole module is dedicated to Figma prototyping: transitions between screens, simple animations, hover states, scroll effects, working forms. You leave with a clickable prototype of your project, ready to present to your stakeholders or to test with your users before development.",
  },
  {
    question: 'Is the handoff to developers covered?',
    answer:
      "Yes. The training covers Figma's Dev Mode (formerly Inspect): automatic retrieval of colours, spacing and fonts, asset exports and ready-to-copy CSS code. Your mockups become directly usable by your technical team or your web agency, with no back-and-forth on the details.",
  },
  {
    question: 'How long does the Web Design training last?',
    answer:
      "A half-day (4h) for the fundamentals: UI/UX principles, first wireframes, getting started with Figma. A full day (8h) to go further: Auto Layout, design system, prototypes, dev handoff. Product and marketing teams generally opt for the full day.",
  },
  {
    question: 'Can the training take place at our offices?',
    answer:
      "Yes. DKDP works in Geneva and across French-speaking Switzerland on site (your offices), in our training spaces, or remotely depending on your preference. For product teams who then need to collaborate on Figma, on-site training is often the most effective.",
  },
]

const MODULES = [
  'UI/UX principles 2026: grid, hierarchy, typography, accessibility, contrast',
  'Low-fidelity wireframes: mobile-first architecture and user flows',
  'Getting started with Figma: interface, frames, pages, projects, collaboration',
  'Auto Layout: responsive mockups without repeating the work',
  'Design system: colour tokens, typography, spacing and grid',
  'Reusable components and variants (buttons, cards, forms)',
  'High-fidelity mockups: website pages, mobile app, dashboard',
  'Interactive prototypes: flows, transitions, hover states, scroll',
  'Team collaboration: shared libraries, comments, validation',
  'Dev Mode: clean handoff to developers or your web agency',
  'UI trends 2026: glassmorphism, dark mode, motion design',
  'Essential Figma plugins: Iconify, Unsplash, Content Reel, Figma to Code',
]

const color = orange.color, bg = orange.bg, border = orange.border

const steps = [
  {
    Icon: Layers,
    title: 'UI/UX basics',
    desc: "The fundamentals that set a professional interface apart from an amateur design. Hierarchy, contrast, accessibility, mobile-first.",
  },
  {
    Icon: PenTool,
    title: 'Wireframes',
    desc: 'Building your architecture screen by screen in low fidelity. Validating flows before any visual investment.',
  },
  {
    Icon: Layout,
    title: 'Figma mockups',
    desc: "Auto Layout, components, design system. Your responsive high-fidelity pages, ready to present internally or to clients.",
  },
  {
    Icon: Code2,
    title: 'Prototype and handoff',
    desc: 'A clickable prototype you can test internally, and Dev Mode configured for a clean handoff to your developers.',
  },
]

export default function FormationWebDesignPage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({ name: 'Web Design and Figma Corporate Training, French-speaking Switzerland', url: '/en/corporate-training/web-design', description: "Web design and Figma training for product, marketing teams and founders in Geneva and French-speaking Switzerland. UI/UX, wireframes, mockups, design system, prototypes. Design your site before you build it.", duration: 'P1D', teaches: ['Figma', 'UI/UX Design', 'Wireframes', 'Auto Layout', 'Design System', 'Interactive prototypes', 'Dev Mode'], prerequisites: 'No technical prerequisites', priceFrom: 200, ratingValue: '4.9', ratingCount: 500, lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Corporate Training', url: 'https://dkdp.ch/en/corporate-training' },
        { name: 'Web Design Training', url: 'https://dkdp.ch/en/corporate-training/web-design' },
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
              <span className="text-sm" style={{ color }}>Web Design Training</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Web Design and Figma Training Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Design your site before you <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>build it</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP trains your product, marketing teams and founders in modern web design and Figma in Geneva and French-speaking Switzerland. UI/UX, wireframes, mockups, design system, prototypes: drive your web projects without depending on an agency for every screen.
                </p>
                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: '100% hands-on', Icon: Zap },
                    { label: 'On your projects', Icon: Layout },
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
                <div className="mb-6 lg:mb-8" aria-label="Design and web tools we teach">
                  <AppLogoMarquee
            logos={DESIGN_WEB_LOGOS}
            durationSeconds={108}
            size="md"
          />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-web-design.webp"
                    alt="Figma and web design corporate training in Geneva: responsive mockups and design system"
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
              { v: '4M+', l: 'Figma designers', sub: 'Global standard for web design' },
              { v: '90%', l: 'Startups', sub: 'Use Figma for their product' },
              { v: '70%', l: 'Time saved', sub: 'On mockup iterations' },
              { v: '1 day', l: 'To wireframe', sub: 'Your first web project' },
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
          { label: 'Programme', href: '#programme' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ── Intro definition ── */}
      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
            DKDP trains SMEs, startups and companies in Geneva and French-speaking Switzerland in the fundamentals of modern web design with Figma. Your team members learn to design interfaces, iterate on mockups and collaborate cleanly with their developers or their agency. Hands-on training on your real projects, in a single day.
          </p>
        </div>
      </section>

      {/* ── Pourquoi maintenant ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Why now</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Why train your teams in web design and Figma
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Launching a web project without a clear mockup means exposing yourself to costly back-and-forth with your agency. Asking a developer to guess the UX means getting a product that works technically but does not reach your users. And explaining a vision verbally guarantees 30% rework.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                With Figma mastered, your product and marketing teams design their own mockups, test flows with clickable prototypes, and provide their developers with a precise visual specification. The result is measurable: less rework, faster projects, products that convert.
              </p>
              <div className="space-y-3">
                {[
                  "Figma is used by 4 million designers worldwide and more than 90% of tech startups",
                  "A mockup validated upfront reduces development costs by 30 to 40% on average",
                  "Figma's Dev Mode cuts the handoff time between design and development by three",
                  "A minimal design system speeds up future iterations of your product by 50%",
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
                  The 3 Figma pillars of the training
                </p>
                <FigmaFeatureCards />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Each pillar is applied directly to a concrete case from your project.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Programme ── */}
      <section id="programme" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Full programme of the Web Design training
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                The training starts with the UI/UX fundamentals (45 minutes) then switches straight into Figma. Each participant builds their own wireframes, their first high-fidelity mockups and a clickable prototype, on a real project brought by your team.
              </p>
              <p className="text-text-secondary leading-relaxed">
                By the end of the session, you leave with a Figma library started for your company (colours, typography, components), a documented project and a configured Dev Mode, ready to be handed over to your developers.
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

      {/* ── Pour qui ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profiles</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Who the corporate Web Design training is for
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Product managers and product leads',
              'Startup founders and CEOs',
              'Technical and growth marketers',
              'Front-end developers moving into design',
              'UX writers and content designers',
              'Internal product teams',
              'Designers transitioning to Figma',
              'Solo entrepreneurs driving their app',
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

      {/* ── Déroulement ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">How it works</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                How the Web Design training works
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

      <FormationTrainer accentColor='#FF8C00' lang="en" />

      {/* ── Témoignages ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">What they say</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Feedback after the Web Design training
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The Auto Layout part was a revelation. I can now mock up a mobile, tablet and desktop page in parallel, without duplicating the work. My iterations are three times faster.",
                name: 'Julien K., Founder',
                company: 'Tech startup, Geneva',
                stars: 5,
              },
              {
                quote: "We trained our whole product team in Figma and the design system. Our visual specification has become much more precise: 40% less rework with our development agency.",
                name: 'Sophie B., Product Manager',
                company: 'SaaS scale-up, Lausanne',
                stars: 5,
              },
              {
                quote: "Dev Mode saved me a huge amount of time. I pull the colours, spacing and CSS code directly without asking the designer a single question. The handoff has become seamless.",
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

      {/* ── Tarifs ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Web Design training pricing
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                The price depends on the number of participants. Half-day (4h) or full day (8h), on site or remote.
              </p>
            </div>
          </SectionReveal>
          <FormationPricing lang="en" />
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Your questions about web design and Figma training" lang="en" />
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
                    Your teams now know how to design their interfaces in Figma. To turn those mockups into a fast, SEO-friendly website, discover our web design service.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                See the service <ChevronRight size={12} />
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
