import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, Clock, Users, Award, Star, Smartphone, BarChart2, Layers, Zap, Video } from 'lucide-react'
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
import { VideoToolCards } from './_components/VideoToolCards'

export const metadata: Metadata = {
  title: 'Video Editing Training Geneva & French-speaking Switzerland · DKDP',
  description:
    'Video editing training for SMEs in French-speaking Switzerland. CapCut, DaVinci Resolve, Premiere Pro. Your teams produce in house. Free quote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training/video-editing',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/montage-video',
      en: 'https://dkdp.ch/en/corporate-training/video-editing',
      'x-default': 'https://dkdp.ch/formation-entreprise/montage-video',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-montage-video.png', width: 1376, height: 768, alt: 'Corporate video editing training Geneva DKDP' }],
  },
}

const FAQ = [
  {
    question: 'Do you need professional gear to take the video editing training?',
    answer:
      'No. The DKDP training is built around the smartphone and accessible tools. CapCut and DaVinci Resolve let you create very high quality videos with an iPhone or an Android and a standard computer. We work with what you already have.',
  },
  {
    question: 'Which video editing software is covered in the training?',
    answer:
      'The training covers CapCut (mobile and desktop, free), ideal for Reels and short content, DaVinci Resolve for professional editing and colour grading, and Adobe Premiere Pro for complex projects. The programme is tailored to your level and your needs.',
  },
  {
    question: 'Does the training cover filming or only editing?',
    answer:
      'Both. DKDP covers the basics of filming (framing, natural light, stabilisation, sound) before editing. A good video starts before you open the software.',
  },
  {
    question: 'Can you create professional Reels and TikToks with this training?',
    answer:
      'Yes. A full module is dedicated to short vertical formats (9:16): Instagram Reels, TikTok and YouTube Shorts. We cover short-form storytelling, transitions, automatic captions and royalty-free music.',
  },
  {
    question: 'Is the music used in the videos royalty-free?',
    answer:
      'The training covers royalty-free music sources: CapCut Sound Library, Epidemic Sound, YouTube Audio Library and Pixabay. You learn how to avoid copyright blocks when publishing.',
  },
  {
    question: 'Does the training include automatic captions?',
    answer:
      'Yes. Automatic captions are a module in their own right. More than 80% of videos on social media are watched without sound. CapCut and other tools generate captions automatically that you fix in a few minutes.',
  },
]

const MODULES = [
  'Filming: framing, light, sound on smartphone and camera',
  'CapCut: editing Reels and short videos (mobile and desktop)',
  'DaVinci Resolve: professional editing and colour grading',
  'Automatic and manual captions',
  'Motion graphics and dynamic transitions',
  'Multi-format export (Instagram, YouTube, LinkedIn, website)',
  'Royalty-free music: where to find it and how to integrate it',
  'Fast production workflow for regular content',
]

const ROLES = [
  'Marketing and communication teams',
  'Community managers',
  'Communication officers',
  'Entrepreneurs and freelancers',
  'HR teams (recruitment videos)',
  'Anyone creating regular content',
]

const steps = [
  { Icon: Smartphone, title: 'Capture fundamentals', desc: 'Filming with a smartphone: framing, natural light, sound. The basics to film like a pro without expensive gear.' },
  { Icon: Layers, title: 'CapCut editing', desc: 'Editing Reels and short videos with CapCut. Captions, transitions, music. First video created during the training.' },
  { Icon: BarChart2, title: 'Advanced editing', desc: 'Introduction to DaVinci Resolve. Colour grading, motion graphics and multi-format export.' },
  { Icon: Award, title: 'Workflow & autonomy', desc: 'Setting up a weekly production workflow. Every participant leaves with their templates and their process.' },
]

const color = orange.color, bg = orange.bg, border = orange.border

export default function FormationMontageVideoPage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({ name: 'Corporate Video Editing Training French-speaking Switzerland', url: '/en/corporate-training/video-editing', description: 'Video editing training for company teams in Geneva. CapCut, DaVinci Resolve and Premiere Pro. Produce your professional videos in house.', duration: 'P1D', teaches: ['CapCut', 'DaVinci Resolve', 'Premiere Pro', 'Smartphone filming', 'Multi-format export'], prerequisites: 'No technical prerequisites', priceFrom: 200, ratingValue: '4.9', ratingCount: 500, lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Corporate Training', url: 'https://dkdp.ch/en/corporate-training' },
        { name: 'Video editing', url: 'https://dkdp.ch/en/corporate-training/video-editing' },
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
              <span className="text-sm" style={{ color }}>Video editing</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Video editing training Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Pro Reels and videos, produced <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>in house</GradText>. In <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>one day</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP trains SME teams in French-speaking Switzerland on CapCut, DaVinci Resolve and Premiere Pro. After one day, you produce your Reels, YouTube videos and corporate content yourselves.
                </p>
                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: '100% hands-on', Icon: Zap },
                    { label: 'Your real footage', Icon: Video },
                    { label: 'Every sector', Icon: Users },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href={`${localizedPath('/contact', 'en')}?service=formation`} size="lg">Request a quote →</LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-text transition-colors">
                    See the programme ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Programme updated: April 2026</p>
              </div>
              <div className="relative">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-montage-video.webp"
                    alt="Video editing training with CapCut and DaVinci Resolve for companies in Geneva"
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
              { v: '10+', l: 'Tools mastered', sub: 'CapCut, DaVinci, Premiere...' },
              { v: '2.7×', l: 'Video engagement', sub: 'vs static content' },
              { v: '4h/week', l: 'Saved', sub: 'In post-production' },
              { v: '1 day', l: 'To produce solo', sub: 'Your first pro video' },
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
            DKDP trains SME teams in French-speaking Switzerland in professional video editing with CapCut, DaVinci Resolve and Premiere Pro. Your team members learn to produce Reels, YouTube videos and corporate content in house, from smartphone filming to final export. Hands-on training in one day in Geneva.
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
                Why your company needs video editing training
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Companies that outsource their video production spend on average CHF 300 to 800 per piece of content, with turnaround times of 5 to 10 days. With the right tools and one day of training, your teams produce the same result in 45 minutes, in house.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP does not teach theory. We open CapCut, DaVinci or Premiere and produce real videos during the session. You leave with your templates, your workflow and your first published video.
              </p>
              <div className="space-y-3">
                {[
                  'Reels generate 2.7× more engagement than images on Instagram',
                  'Short video is the number one brand discovery format in 2026',
                  'Producing in house cuts production costs by 70 to 85%',
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
                  The 3 tools covered
                </p>
                <VideoToolCards />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  The programme is tailored to your level. You do not need to master all three.
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
                Video editing training programme
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                The training starts with the basics of smartphone filming (framing, light, sound), then moves on to CapCut for short formats, DaVinci Resolve for professional editing and colour grading, and finally Premiere Pro for those who want to go further. Each module leads to a real production.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Every participant leaves with their own templates, their weekly production workflow and at least one video exported and ready to publish.
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
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profiles</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Who is the video editing training for?
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ROLES.map((role, i) => (
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

      {/* ── How it runs ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">How it runs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                How the video editing training runs
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

      {/* ── Testimonials ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">What they say</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Feedback after the video editing training
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'Before the training, we outsourced our Instagram videos at CHF 300 a piece. Now we make them in house in 45 minutes. Immediate ROI.',
                name: 'Camille R., Marketing Manager',
                company: 'Lifestyle brand, Geneva',
                stars: 5,
              },
              {
                quote: 'In one day, I learned to edit, colour grade and export my YouTube videos. DKDP gave me the basics and the method to be self-sufficient.',
                name: 'Alexandre M., Founder',
                company: 'Sports coach, Lausanne',
                stars: 5,
              },
              {
                quote: 'Our HR team now creates its own videos for job openings. Engagement on our posts is 4× higher since we started using video.',
                name: 'Sandrine W., HR Director',
                company: 'Tech SME, Geneva',
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
                Video editing training pricing
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
        <FAQSection items={FAQ} title="Your questions about the video editing training" lang="en" />
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
                  <Zap size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Go further</p>
                  <p className="text-text font-bold text-lg leading-tight">Distribute your videos with impact</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    You produce your videos. To distribute them effectively on the right platforms and maximise engagement, discover our social media training.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Social media training <ChevronRight size={12} />
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
