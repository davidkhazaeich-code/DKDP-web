import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, Clock, Users, Award, Star, Layers, Wand2, Palette, Share2, Sparkles, Globe2, Zap, FileText } from 'lucide-react'
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
import { AppLogoMarquee, DESIGN_WEB_LOGOS, SOCIAL_LOGOS } from '@/components/ui/AppLogos'

export const metadata: Metadata = {
  title: 'Canva Training Geneva & French-speaking Switzerland | Brand Kit, Magic Studio | DKDP',
  description:
    'Canva training for SMEs and companies in Geneva and French-speaking Switzerland. Brand Kit, templates, social posts, presentations, Magic Studio AI. Your teams create professional visuals in a single day. Free quote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training/canva',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/canva',
      en: 'https://dkdp.ch/en/corporate-training/canva',
      'x-default': 'https://dkdp.ch/formation-entreprise/canva',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-canva.png', width: 1376, height: 768, alt: 'Canva corporate training Geneva DKDP' }],
  },
}

const FAQ = [
  {
    question: 'Do you need to be a graphic designer to take the Canva training?',
    answer:
      "No. The DKDP Canva training is designed for non-designers. We start from the basics of design (typography, colours, visual hierarchy) and build your first visuals together. Most participants have never opened Canva before the training and leave fully autonomous by the end of the day.",
  },
  {
    question: 'What is the difference between free Canva and Canva Pro?',
    answer:
      "The free version already covers 80% of an SME's needs. Canva Pro (CHF 15/month per user or CHF 30/month for a team) unlocks the full Brand Kit (logo, palette, company fonts), background removal, automatic resizing (Magic Resize), and more than 100 million premium templates and photos. DKDP helps you choose the plan that is genuinely useful for your needs.",
  },
  {
    question: 'What is the Canva Brand Kit and why set it up?',
    answer:
      "The Brand Kit centralises your company's visual identity inside Canva: logo, colour palette, official fonts, gradients, photos. Once set up, every team member accesses the same elements from any template. The result: your visuals stay consistent no matter who creates them. Setting up the Brand Kit is the first real time saver.",
  },
  {
    question: 'What formats can you create with Canva?',
    answer:
      "Social media posts (Instagram, LinkedIn, Facebook, TikTok, X), animated Stories and Reels, professional presentations, printable flyers and posters, brochures, newsletters, web banners, business cards, email signatures, short videos, internal documents, org charts. More than 100 preformatted formats are available from the start.",
  },
  {
    question: 'How does Magic Studio (Canva AI) work?',
    answer:
      "Magic Studio brings together the AI features built into Canva: Magic Write generates text, Magic Edit modifies an image with a written instruction, Magic Resize adapts a visual to several formats in one click, Magic Eraser removes an object from a photo, Background Remover cuts out a subject. These tools speed up production by 3 to 5 times depending on the use case. The training covers the 5 main tools.",
  },
  {
    question: 'Can the team work on the same design together?',
    answer:
      "Yes. Canva includes real-time collaboration similar to Google Docs: comments, suggestions, internal template sharing, shared brand spaces. The training includes a module on organising a team workflow to avoid duplication and guarantee visual consistency.",
  },
  {
    question: 'How long does the Canva training last?',
    answer:
      "A half-day (4h) for the basics: interface, first visuals, Brand Kit. A full day (8h) to go further: Magic Studio, team workflow, advanced presentations, videos. Most SMEs opt for the full day, which pays off the fastest.",
  },
  {
    question: 'Can the training take place at our premises?',
    answer:
      "Yes. DKDP works in Geneva and across French-speaking Switzerland on site (your premises), in our training spaces, or by video call depending on your preference. On-site training is often preferred to make it easier for the full team to take part.",
  },
]

const MODULES = [
  'Discovering Canva: interface, dashboards, projects and folders',
  'Complete Brand Kit: logo, colour palette, company fonts',
  'Template library: 250,000+ designs ready to customise',
  'Social media posts: Instagram, LinkedIn, Facebook, TikTok',
  'Animated Stories and Reels in a few minutes',
  'Professional presentations: an alternative to PowerPoint',
  'Printable flyers, brochures and posters',
  'Harmonised newsletters and email signatures',
  'Magic Studio: Magic Write, Magic Resize, Magic Edit, Background Remover',
  'Multi-format visual consistency and brand rules',
  'Canva Pro vs free: choosing the right plan',
  'Team workflow: shared templates, comments, approval',
]

const color = orange.color, bg = orange.bg, border = orange.border

const steps = [
  {
    Icon: Layers,
    title: 'Design basics',
    desc: "Essential theory in 45 min: colours, typography, hierarchy. What sets a pro visual apart from an amateur one in Canva.",
  },
  {
    Icon: Palette,
    title: 'Brand Kit configured',
    desc: "Import of your logo, official palette and company fonts. Your templates in your brand colours, ready to use.",
  },
  {
    Icon: Share2,
    title: 'Templates in practice',
    desc: 'Creation of your 5 priority templates: posts, stories, presentations, flyers. Smooth production for your daily work.',
  },
  {
    Icon: Wand2,
    title: 'Magic Studio and AI',
    desc: "Mastery of Canva's AI tools to produce 5x faster. Team workflow configured and ready to scale.",
  },
]

function CanvaFeatureCards() {
  const features = [
    {
      name: 'Brand Kit',
      tag: 'Unified identity',
      bestFor: 'Logo, palette, fonts, primary and secondary colours imported once and for all',
      detail: 'Guaranteed consistency across 100% of your visuals',
      c: '#00C4CC',
      cbg: 'rgba(0,196,204,0.08)',
      cborder: 'rgba(0,196,204,0.22)',
    },
    {
      name: 'Templates',
      tag: '250,000+ designs',
      bestFor: 'Instagram and LinkedIn posts, presentations, flyers, brochures, newsletters',
      detail: 'Customised in a few clicks with your Brand Kit',
      c: '#FF8C00',
      cbg: 'rgba(255,140,0,0.10)',
      cborder: 'rgba(255,140,0,0.22)',
    },
    {
      name: 'Magic Studio',
      tag: 'Canva AI',
      bestFor: 'Magic Resize, Magic Edit, Magic Write, background removal',
      detail: 'Production 5x faster thanks to built-in AI',
      c: '#A78BFA',
      cbg: 'rgba(167,139,250,0.10)',
      cborder: 'rgba(167,139,250,0.22)',
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
      {features.map((f) => (
        <div
          key={f.name}
          className="p-4 rounded-[12px] flex flex-col gap-3"
          style={{ background: f.cbg, border: `1px solid ${f.cborder}` }}
        >
          <div>
            <p className="text-text font-bold text-sm mb-1.5">{f.name}</p>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block"
              style={{ background: 'var(--bg-card)', color: f.c, border: `1px solid ${f.cborder}` }}
            >
              {f.tag}
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Ideal for</p>
              <p className="text-[12px] font-semibold leading-snug" style={{ color: f.c }}>{f.bestFor}</p>
            </div>
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Benefit</p>
              <p className="text-text text-[12px] leading-snug">{f.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function FormationCanvaPage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({ name: 'Canva Corporate Training French-speaking Switzerland', url: '/en/corporate-training/canva', description: 'Canva training for SME and corporate teams in Geneva and French-speaking Switzerland. Brand Kit, templates, social posts, presentations, Magic Studio AI. Become autonomous on Canva in a single day.', duration: 'P1D', teaches: ['Canva', 'Brand Kit', 'Magic Studio AI', 'Templates', 'Social media', 'Presentations'], prerequisites: 'No technical prerequisites', priceFrom: 200, ratingValue: '4.9', ratingCount: 500, lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Corporate Training', url: 'https://dkdp.ch/en/corporate-training' },
        { name: 'Canva Training', url: 'https://dkdp.ch/en/corporate-training/canva' },
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
              <span className="text-sm" style={{ color }}>Canva Training</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Canva Training Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Create your visuals in 5 minutes. <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>In your brand colours</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP trains your SME and corporate teams on Canva in Geneva and across French-speaking Switzerland. Posts, presentations, flyers, brochures: your staff create professional visuals without an agency, the day after the training.
                </p>
                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: '100% hands-on', Icon: Zap },
                    { label: 'On your real visuals', Icon: FileText },
                    { label: 'All industries', Icon: Users },
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
                <div className="mb-6 lg:mb-8" aria-label="Design and social tools we teach">
                  <AppLogoMarquee
            logos={[...DESIGN_WEB_LOGOS, ...SOCIAL_LOGOS]}
            durationSeconds={144}
            size="md"
          />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-canva.webp"
                    alt="Canva corporate training in Geneva: Brand Kit and custom templates"
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
              { v: '250M+', l: 'Users', sub: 'Canva worldwide' },
              { v: '5 min', l: 'Per visual', sub: 'With Brand Kit configured' },
              { v: '80%', l: 'Time saved', sub: 'On graphic production' },
              { v: '1 day', l: 'To become autonomous', sub: 'With no prerequisites' },
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
            DKDP trains the SMEs and companies of Geneva and French-speaking Switzerland on Canva, the most widely used graphic design tool in the world. Your staff learn to produce professional communication materials (social posts, presentations, flyers, brochures) with no prior technical skills. Hands-on training in a single day.
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
                Why train your teams on Canva in 2026
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Waiting on an agency for one Instagram post. Paying a freelance designer for a flyer. Chasing three times for a client presentation. These frictions slow down your sales and marketing teams, and eat into a budget you could invest elsewhere.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                With a well-configured Brand Kit and the right templates, your staff create consistent, professional visuals fully on their own. In a single day of training, autonomy becomes a lasting reality.
              </p>
              <div className="space-y-3">
                {[
                  "Swiss SMEs spend an average of CHF 4,000/year on outsourced graphic design",
                  "Canva is used by more than 250 million people worldwide, including 95% of the Fortune 500",
                  "A well-configured Brand Kit cuts visual production time by 70%",
                  "Magic Studio (Canva AI) speeds up production further by 3 to 5 times depending on the use case",
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
                  The 3 pillars of the training
                </p>
                <CanvaFeatureCards />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Each pillar is covered with hands-on cases on your real materials.
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
                Full programme of the Canva training
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                The training starts with the fundamental principles of design (45 minutes, no more) then moves straight into Canva. Each participant creates their first visuals during the session, in their company colours, on the formats they will actually use from the very next day.
              </p>
              <p className="text-text-secondary leading-relaxed">
                By the end of the session, you have an operational Brand Kit and a kit of ready-to-use templates. No more starting from scratch with every publication: your templates do the work, your team saves time.
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
                Who the corporate Canva training is for
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Communication and marketing teams',
              'Community managers',
              'Executive assistants',
              'HR managers (job ads, welcome handbooks)',
              'Sales reps (client presentations)',
              'Freelancers and solo entrepreneurs',
              'SME owners with no designer',
              'Anyone who creates visual materials',
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
                How the Canva training unfolds
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
                Feedback after the Canva training
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Before the training, I paid a freelance designer for every Instagram post. Now I create my visuals in 5 minutes with my Canva templates. Paid off in two weeks.",
                name: 'Nathalie F., Founder',
                company: 'Artisan boutique, Geneva',
                stars: 5,
              },
              {
                quote: "We trained our entire communication team on Canva, with a unified Brand Kit. The visual consistency of our brand improved overnight. No more mismatched visuals between colleagues.",
                name: 'Thomas L., Marketing manager',
                company: 'SME of 40 people, Vaud',
                stars: 5,
              },
              {
                quote: "Magic Studio was a real revelation. I resize a visual for 5 social networks in one click, I remove a background in 2 seconds. What used to take me 30 minutes now takes 2 minutes.",
                name: 'Sarah M., Community manager',
                company: 'Events agency, Geneva',
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
                Canva training pricing
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                The price depends on the number of participants. Half-day (4h) or full day (8h), on site or by video call.
              </p>
            </div>
          </SectionReveal>
          <FormationPricing lang="en" />
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Your questions about the Canva training" lang="en" />
      </section>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/formation-entreprise/reseaux-sociaux', 'en')}
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
                  <p className="text-text font-bold text-lg leading-tight">Distribute your Canva visuals on the right networks</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    You create beautiful visuals with Canva. To distribute them effectively on the right platforms and build your audience, discover our social media training.
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
