import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, Clock, Users, Award, Star, Smartphone, BarChart2, TrendingUp, Zap, Target, Layers, Share2, Briefcase, Megaphone, Store, GraduationCap, Heart, Hammer, User, Palette } from 'lucide-react'
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
import { AppLogoMarquee, SOCIAL_LOGOS, DESIGN_WEB_LOGOS } from '@/components/ui/AppLogos'
import { SocialBeforeAfter } from './_components/SocialBeforeAfter'

export const metadata: Metadata = {
  title: 'Social Media Training Geneva & French-speaking Switzerland · DKDP',
  description:
    'Social media training for SMEs in French-speaking Switzerland and Geneva. Instagram, LinkedIn, TikTok, Facebook. Strategy, Canva, content calendar. Request your free quote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training/social-media',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/reseaux-sociaux',
      en: 'https://dkdp.ch/en/corporate-training/social-media',
      'x-default': 'https://dkdp.ch/formation-entreprise/reseaux-sociaux',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-reseaux-sociaux.png', width: 1376, height: 768, alt: 'Social media corporate training Geneva DKDP' }],
  },
}

const FAQ = [
  {
    question: 'Does the training cover LinkedIn, Instagram and Facebook?',
    answer:
      'Yes. The training can cover Instagram, LinkedIn, Facebook, TikTok and YouTube depending on your needs. For most Swiss SMEs, DKDP recommends focusing on LinkedIn (B2B) and Instagram (B2C) to maximise impact.',
  },
  {
    question: 'Do I need active accounts already to follow the training?',
    answer:
      'No. The training is adapted whether you start from scratch or want to improve an existing presence. DKDP can help create or optimise the profiles as part of the training.',
  },
  {
    question: 'Does the training include visual creation?',
    answer:
      'Yes. A full module is dedicated to creating visuals with Canva: templates, formats adapted to each network, visual consistency. You leave with your own template kit in your brand colours.',
  },
  {
    question: 'How do you analyse the performance of your posts?',
    answer:
      'The training covers reading and interpreting native analytics (Instagram Insights, LinkedIn Analytics, Meta Business Suite). You learn to identify the content that works and to adjust your strategy accordingly.',
  },
  {
    question: 'Does the training cover paid advertising on social networks?',
    answer:
      'Optional for the Expert Programme. An advanced module on Meta Social Ads (Instagram + Facebook) and LinkedIn Ads can be added. It covers campaign creation, audience targeting and reading the results.',
  },
  {
    question: 'Who is this social media training for?',
    answer:
      'For freelancers, communication officers, community managers, leaders who manage their own networks, shop owners, associations and anyone who wants a professional online presence.',
  },
]

const MODULES = [
  'Social media strategy: goals, target audience, positioning',
  'Creating visuals with Canva (templates and brand identity)',
  'Content calendar: plan 30 days in 2 hours',
  'Copywriting for social media (hooks, captions, CTA)',
  'Instagram: Reels, Stories, carousels and hashtags',
  'LinkedIn: personal branding and B2B content',
  'TikTok and YouTube Shorts: engaging short formats',
  'Planning tools (Meta Business Suite, Buffer)',
  'Performance analysis: the metrics that really matter',
]

const ROLES: { label: string; Icon: typeof Briefcase }[] = [
  { label: 'Freelancers and entrepreneurs', Icon: Briefcase },
  { label: 'SME communication teams', Icon: Megaphone },
  { label: 'Beginner community managers', Icon: Users },
  { label: 'Small shop owners', Icon: Store },
  { label: 'Independent professionals', Icon: GraduationCap },
  { label: 'Associations and institutions', Icon: Heart },
  { label: 'Craftspeople and retailers', Icon: Hammer },
  { label: 'Any professional wanting an online presence', Icon: User },
]

const TESTIMONIALS = [
  {
    quote: 'I had an Instagram account that had been inactive for months. After the training, I post 3 times a week with a real calendar. My followers doubled in 6 weeks.',
    name: 'Caroline P., Independent therapist',
    company: 'Geneva',
    initials: 'CP',
    stars: 5,
  },
  {
    quote: 'DKDP taught us how to use Canva and Meta Business Suite. Our team now manages our 3 accounts in 2 hours a week.',
    name: 'Laurent G., Communication manager',
    company: 'Cultural association, Lausanne',
    initials: 'LG',
    stars: 5,
  },
  {
    quote: 'The LinkedIn part helped me in particular. I now have a real B2B strategy and I generate leads directly from my posts.',
    name: 'Philippe V., Independent consultant',
    company: 'Geneva',
    initials: 'PV',
    stars: 5,
  },
]

const steps = [
  { Icon: Target, title: 'Strategy & audience', desc: 'Defining your positioning, your target audience and measurable goals per platform.' },
  { Icon: Layers, title: 'Content creation', desc: 'Producing visuals with Canva, writing engaging captions. First set of posts created in session.' },
  { Icon: Smartphone, title: 'Publishing & tools', desc: 'Setting up the content calendar and planning tools. Weekly workflow in 2 hours.' },
  { Icon: BarChart2, title: 'Analysis & optimisation', desc: 'Reading native statistics and making adjustments. Each participant leaves with their KPIs defined.' },
]

const color = orange.color, bg = orange.bg, border = orange.border

export default function FormationReseauxSociauxPage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({ name: 'Social Media Corporate Training French-speaking Switzerland', url: '/en/corporate-training/social-media', description: 'Professional social media training in Geneva. Instagram, LinkedIn, TikTok, Facebook. Strategy, Canva, content calendar. Autonomy from the next day.', duration: 'P1D', teaches: ['Social media strategy', 'Content creation', 'Content calendar', 'Instagram', 'LinkedIn', 'TikTok'], prerequisites: 'No technical prerequisites', priceFrom: 200, ratingValue: '4.9', ratingCount: 500, lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Corporate Training', url: 'https://dkdp.ch/en/corporate-training' },
        { name: 'Social media training', url: 'https://dkdp.ch/en/corporate-training/social-media' },
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
              <span className="text-sm" style={{ color }}>Social media</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Social media training Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Your teams post. We teach them to <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>captivate</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP trains SMEs and freelancers in French-speaking Switzerland on Instagram, LinkedIn, TikTok and Facebook. Strategy, Canva, content calendar: you leave fully autonomous from the next day.
                </p>
                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: '100% practical', Icon: Zap },
                    { label: 'Your real accounts', Icon: Share2 },
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
                <div className="mb-6 lg:mb-8" aria-label="Social media and creation tools">
                  <AppLogoMarquee
            logos={[...SOCIAL_LOGOS, ...DESIGN_WEB_LOGOS]}
            durationSeconds={126}
            size="md"
          />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-reseaux-sociaux.webp"
                    alt="Social media corporate training in Geneva"
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
              { v: '+180%', l: 'Average engagement', sub: 'After team training' },
              { v: '5', l: 'Platforms covered', sub: 'Meta, LinkedIn, TikTok, YT' },
              { v: '2h/week', l: 'To manage everything', sub: 'With the right tools' },
              { v: '500+', l: 'Participants trained', sub: 'In French-speaking Switzerland' },
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
            DKDP trains SMEs and freelancers in Geneva and French-speaking Switzerland to manage their social media professionally. Instagram, LinkedIn, TikTok, Facebook: your teams learn to create engaging content, plan a content calendar and analyse performance. Hands-on training in one day, on your own accounts.
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
                Why train your teams on social media
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Most professionals who manage their social media alone post irregularly, with no editorial line or visual consistency. The result: few followers, little engagement, and a lot of wasted time.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP does not train on theory. We work on your real accounts, we create your first posts during the training, we set up your 30-day content calendar. You leave with a system that runs.
              </p>
              <div className="space-y-3">
                {[
                  'Brands that publish with a calendar get 3 times more engagement than those that post spontaneously',
                  'Canva cuts visual creation time by 70% compared to professional tools',
                  '2 hours a week are enough to manage 3 platforms with the right tools',
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
                <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
                  Before / After training
                </p>
                <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden mb-5 border" style={{ borderColor: border }}>
                  <Image
                    src="/images/services/dkdp-formation-reseaux-sociaux-feed-comparaison.webp"
                    alt="Social media training Geneva SME: Instagram feed before and after DKDP training, consistent palette, 2026 content calendar"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                </div>
                <SocialBeforeAfter />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Results observed across our participant groups in French-speaking Switzerland.
                </p>
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
                Social media training programme
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                The training starts with strategy: who you publish for, what message, on which network. We then move to practice: creating visuals in Canva, writing captions, setting up the content calendar and planning tools.
              </p>
              <p className="text-text-secondary leading-relaxed">
                The training is tailored to your current networks and your audience. We do not work on fictional examples: we create your content during the day.
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

      {/* ── Showcase templates Canva ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Concrete deliverables</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-5">
                You leave with your visual kit
              </h2>
              <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto">
                During the training, we create 6 Canva templates in your brand colours: quotes, statistics, tips, announcements, testimonials, carousels. Visual consistency guaranteed across all your posts from the next day.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div
              className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border"
              style={{ borderColor: border, boxShadow: '0 0 60px rgba(255,107,0,0.10)' }}
            >
              <Image
                src="/images/services/dkdp-formation-reseaux-sociaux-canva-templates.webp"
                alt="Social media training Geneva 2026: Canva template kit created during training, Instagram and LinkedIn posts in your brand colours"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
              {[
                { label: 'Quotes', Icon: Star },
                { label: 'Statistics', Icon: BarChart2 },
                { label: 'Tips', Icon: Zap },
                { label: 'Announcements', Icon: Megaphone },
                { label: 'Testimonials', Icon: Heart },
                { label: 'Carousels', Icon: Layers },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] border"
                  style={{ background: bg, borderColor: border }}
                >
                  <t.Icon size={14} style={{ color }} />
                  <span className="text-text text-xs font-medium">{t.label}</span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Pour qui ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profiles</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3">
                Who is the corporate social media training for?
              </h2>
              <p className="text-text-secondary leading-relaxed max-w-xl mx-auto text-sm">
                The training adapts to your level and your activity. No technical prerequisites.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {ROLES.map((role, i) => (
              <SectionReveal key={role.label} delay={i * 0.07}>
                <div
                  className="flex flex-col items-center justify-start text-center p-5 rounded-[12px] border h-full gap-3"
                  style={{ background: bg, borderColor: border }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0"
                    style={{ background: 'rgba(255,107,0,0.12)', border: `1px solid ${border}` }}
                  >
                    <role.Icon size={18} style={{ color }} />
                  </div>
                  <p className="text-text font-medium text-sm leading-tight">{role.label}</p>
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
                How the social media training works
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

      {/* ── Témoignages ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">What they say</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Feedback after the social media training
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
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
                  <div className="mt-6 pt-4 flex items-center gap-3" style={{ borderTop: `1px solid ${border}` }}>
                    <div
                      className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-text font-bold text-[12px] tracking-wide"
                      style={{
                        background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)',
                        boxShadow: '0 4px 14px rgba(255,107,0,0.25)',
                      }}
                      aria-hidden="true"
                    >
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-text font-semibold text-sm truncate">{t.name}</p>
                      <p className="text-text-muted text-xs truncate">{t.company}</p>
                    </div>
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
                Social media training pricing
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
        <FAQSection items={FAQ} title="Your questions about the social media training" lang="en" />
      </section>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/formation-entreprise/montage-video', 'en')}
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
                  <TrendingUp size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Go further</p>
                  <p className="text-text font-bold text-lg leading-tight">Create your own video content</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    You have mastered social media. To create your own professional video content and multiply engagement, discover our video editing training.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Video editing training <ChevronRight size={12} />
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
