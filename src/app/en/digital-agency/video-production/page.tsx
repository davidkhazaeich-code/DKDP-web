import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, ShieldCheck, BarChart2, Clock, Globe2, Zap, Star, FileText, MapPin } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { violet } from '@/lib/tokens'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))

export const metadata: Metadata = {
  title: 'Corporate Video Production Geneva & French-speaking Switzerland · DKDP',
  description:
    'Professional video production in Geneva. Brand films, client testimonials, Reels and short-form content. Capture attention and stay memorable.',
  alternates: {
    canonical: 'https://dkdp.ch/en/digital-agency/video-production',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/creation-video',
      en: 'https://dkdp.ch/en/digital-agency/video-production',
      'x-default': 'https://dkdp.ch/agence-digitale/creation-video',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/creation-video.png', width: 1376, height: 768, alt: 'Corporate video production Geneva DKDP' }],
  },
}

const color = violet.color
const bg = violet.bg
const border = violet.border

const FAQ = [
  {
    question: 'How much does a corporate video cost in Geneva?',
    answer:
      'A client testimonial or a short format (30 to 90 seconds) starts at CHF 800. A full institutional video (2 to 5 minutes, shoot and edit) sits between CHF 2\'000 and CHF 6\'000. A quote is drawn up after a brief, based on your precise needs.',
  },
  {
    question: 'What types of videos do you produce?',
    answer:
      'DKDP produces institutional videos, client testimonials, product or service presentations, Reels and short-form content for social media, training capsules, and videos for advertising campaigns.',
  },
  {
    question: 'How long does video production take?',
    answer:
      'A short format (Reel, teaser) is delivered in 5 to 10 days. A full institutional video takes 3 to 5 weeks: brief, script, shoot, editing, revisions and final delivery.',
  },
  {
    question: 'Do you come and film at our offices in Geneva?',
    answer:
      'Yes. DKDP travels to your offices in Geneva and across French-speaking Switzerland for shoots. We bring our own equipment (camera, lighting, microphone). A preliminary location scout is planned for complex projects.',
  },
  {
    question: 'Are the videos suitable for social media?',
    answer:
      'Yes. Each video is deliverable in several formats depending on the platforms: square format (Instagram), vertical 9:16 (Reels, TikTok, Stories) and horizontal 16:9 (YouTube, website). We adapt the edit to each format.',
  },
  {
    question: 'Do you offer subtitles and animated text?',
    answer:
      'Yes. Corrected automatic subtitles, text animations, title cards and basic motion design are included depending on the package. More than 80% of videos on social media are watched without sound: subtitles are not optional.',
  },
  {
    question: 'How many revision cycles are included?',
    answer:
      'Two revision cycles are included in each project. A first round of feedback after the first cut, a second after the adjustments. Additional revisions can be added to the package.',
  },
]

const BENEFITS = [
  {
    Icon: Zap,
    value: '2.7×',
    title: 'Higher engagement',
    desc: 'Video generates on average 2.7× more engagement than static images on social media and 80% more conversions on landing pages.',
  },
  {
    Icon: BarChart2,
    value: '+80%',
    title: 'On-site conversion',
    desc: 'A presentation video on your service page increases the conversion rate by 80% by holding visitors\' attention.',
  },
  {
    Icon: Star,
    value: '4K',
    title: 'Cinematic quality',
    desc: '4K capture, 3-axis stabiliser, professional lighting. Your brand deserves an image that inspires confidence at first glance.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Brief & storyboard',
    desc: 'Defining objectives, key messages and storyboard. Full sign-off before a single frame is shot.',
  },
  {
    step: '02',
    title: 'Preparation',
    desc: 'Location scouting, equipment, briefing the people on camera, shoot-day schedule.',
  },
  {
    step: '03',
    title: 'Capture',
    desc: 'Shoot with 4K equipment, stabiliser and professional lighting. Full coverage of every scene.',
  },
  {
    step: '04',
    title: 'Post-production',
    desc: 'Editing, colour grading, sound design, motion graphics, subtitles.',
  },
  {
    step: '05',
    title: 'Delivery & formats',
    desc: 'Multi-format export for target platforms. Cloud delivery + versions adapted for Reels/YT/LinkedIn.',
  },
]

const VIDEO_FORMATS = [
  {
    type: 'Social Clip / Reel',
    duration: '15 – 90 sec',
    ratio: '9:16 or 1:1',
    use: 'Social media',
    platforms: ['Instagram', 'TikTok', 'LinkedIn'],
    c: '#A78BFA',
    cbg: 'rgba(124,58,237,0.10)',
    cborder: 'rgba(124,58,237,0.22)',
    tagbg: 'rgba(124,58,237,0.18)',
  },
  {
    type: 'Testimonial / Interview',
    duration: '1 – 3 min',
    ratio: '16:9',
    use: 'Website & LinkedIn',
    platforms: ['Homepage', 'LinkedIn', 'YouTube'],
    c: '#4ade80',
    cbg: 'rgba(74,222,128,0.08)',
    cborder: 'rgba(74,222,128,0.22)',
    tagbg: 'rgba(74,222,128,0.14)',
  },
  {
    type: 'Brand Film',
    duration: '2 – 5 min',
    ratio: 'Cinematic',
    use: 'Brand identity',
    platforms: ['Events', 'Website', 'Ads'],
    c: '#60a5fa',
    cbg: 'rgba(96,165,250,0.08)',
    cborder: 'rgba(96,165,250,0.22)',
    tagbg: 'rgba(96,165,250,0.14)',
  },
]

function VideoFormatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      {VIDEO_FORMATS.map((f) => (
        <div
          key={f.type}
          className="p-5 rounded-[14px] flex flex-col gap-4"
          style={{ background: f.cbg, border: `1px solid ${f.cborder}` }}
        >
          {/* Header */}
          <p className="text-[15px] font-bold" style={{ color: f.c }}>{f.type}</p>

          {/* Meta rows */}
          <div className="flex flex-col gap-2.5">
            {[
              { label: 'Duration', value: f.duration },
              { label: 'Format', value: f.ratio },
              { label: 'Use', value: f.use },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase tracking-wider text-text-muted">{label}</span>
                <span className="text-[13px] font-semibold text-text">{value}</span>
              </div>
            ))}
          </div>

          {/* Platform tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
            {f.platforms.map((p) => (
              <span
                key={p}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: f.tagbg, color: f.c }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function VideoProductionPage() {
  return (
    <main>
      <SchemaOrg schema={buildService({ name: 'Corporate video production in French-speaking Switzerland', url: '/en/digital-agency/video-production', description: 'Professional video production in Geneva. Institutional, client testimonials, Reels and short-form content.', lang: 'en' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Digital Agency', url: 'https://dkdp.ch/en/digital-agency' },
        { name: 'Video production', url: 'https://dkdp.ch/en/digital-agency/video-production' },
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
              <span className="text-sm" style={{ color }}>Video production</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Corporate video production Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  A video people watch <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>to the end</GradText>. And one they <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>share</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  Professional video production for SMBs and companies in French-speaking Switzerland. DKDP creates your corporate videos in Geneva: social clips, client testimonials, brand films. 4K capture, delivered in 5 days.
                </p>
                <HeroPills
                  items={[
                    { label: 'Fixed quote', Icon: FileText },
                    { label: 'Shot in Geneva', Icon: MapPin },
                    { label: 'Delivered in 3 weeks', Icon: Clock },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/en/contact?service=service-digital" size="lg">Free video quote →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-text transition-colors">
                    Our method ↓
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}>
                  <Image
                    src="/images/services/dkdp-agence-creation-video.webp"
                    alt="Corporate video production in Geneva by DKDP"
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
              { v: '4K', l: 'Production quality', sub: 'All formats delivered' },
              { v: '2.7×', l: 'Video engagement', sub: 'vs static content' },
              { v: '5 days', l: 'Delivery time', sub: 'Social clips' },
              { v: '50+', l: 'Videos produced', sub: 'In French-speaking Switzerland' },
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
          { label: 'Results', href: '#résultats' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'Process', href: '#process' },
          { label: 'Work', href: '#realisations' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: '/en/contact' }}
        accentColor="#A78BFA"
        accentBg="rgba(124,58,237,0.18)"
        accentBorder="rgba(124,58,237,0.30)"
      />

      {/* ── Our approach ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Our approach</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Professional video production built to convince, not just to shine.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                A beautiful image is not enough. DKDP starts by understanding your message, your audience and the goal of the video: awareness, trust, conversion. Every choice of framing, music and editing is made to serve that goal.
              </p>
              <p className="text-text-secondary leading-relaxed">
                We deliver every video in all the formats you need: website, social media, sales presentation. One shoot, value multiplied.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Indoor and outdoor shooting (Geneva and Switzerland)',
                  '4K capture, stabiliser, professional lighting',
                  'Post-production: editing, colour grading, sound design',
                  'Motion graphics and subtitles',
                  'Multi-format delivery (Reels, Stories, YouTube, LinkedIn)',
                  'Product and corporate shooting',
                  'Advertising videos (Meta Ads, YouTube Ads)',
                  'Interviews and client testimonials',
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

      {/* ── Insight / Problem ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Why video</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Why corporate video converts better than static content.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                The algorithms of every social platform prioritise video. Visitors to your site stay longer with a video. Your prospects remember you if you spoke to them on video. It is measurable, not an opinion.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: Zap, title: 'Video is watched 5× longer than a blog article on social media.', sub: 'Source: HubSpot State of Marketing 2024' },
                  { Icon: BarChart2, title: '80% of consumers prefer to watch a brand video rather than read a text.', sub: 'Source: Wyzowl Video Survey 2024' },
                  { Icon: Star, title: 'Pages with video have a conversion rate 2× higher than pages without video.', sub: 'Source: EyeView Digital' },
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
                <VideoFormatsGrid />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section id="résultats" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Results</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Video marketing: the format that converts best.
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

      {/* ── Offers ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Clear pricing, a fixed quote.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Every quote is detailed and approved before we start. No surprises during production.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Social Clip',
                price: 'CHF 800',
                duration: 'Delivery in 5 days',
                highlight: false,
                features: [
                  '1 short video (30–90 sec)',
                  'Editing + colour grading',
                  '2 formats delivered (9:16 + 16:9)',
                  'Subtitles included',
                  '1 revision',
                ],
                cta: 'Request a quote',
              },
              {
                label: 'Content Series',
                price: "CHF 2'000",
                duration: 'Most requested',
                highlight: true,
                features: [
                  '4 videos (mix of short + long)',
                  'Motion graphics',
                  'Subtitles + licensed music',
                  '3 formats per video',
                  '2 revisions included',
                  'Delivery within 10 days',
                ],
                cta: 'Request a quote',
              },
              {
                label: 'Brand Film',
                price: "CHF 4'500",
                duration: 'Full brand film',
                highlight: false,
                features: [
                  'Corporate film 2–5 min',
                  'Drone if needed',
                  'Interviews + behind the scenes',
                  'Licensed music',
                  '4 formats delivered',
                  'Full usage rights',
                ],
                cta: 'Let\'s discuss your project',
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
                      href="/en/contact?service=service-digital"
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
                From brief to delivered video.
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
                What our clients say.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'DKDP filmed our client testimonials in half a day. The result is a quality we never imagined for this budget. Our prospects watch them before signing.',
                author: 'CEO, consulting firm',
                location: 'Geneva',
              },
              {
                quote: 'We wanted a brand video for our website. DKDP delivered something that surprised us. Our bounce rate has dropped by 65% since it went live.',
                author: 'Founder, luxury boutique',
                location: 'Geneva',
              },
              {
                quote: 'The Reels DKDP produces for us get 10× more views than what we did with our smartphone. The difference is immediate.',
                author: 'Marketing Manager, 80-person SMB',
                location: 'French-speaking Switzerland',
              },
            ].map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.1}>
                <div className="flex flex-col gap-4 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} fill={color} style={{ color }} />
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-text text-sm font-semibold">{t.author}</p>
                    <p className="text-text-muted text-xs">{t.location}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Work + Guarantees ── */}
      <section id="realisations" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Work</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Results, not promises.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                client: 'B2B consulting firm',
                type: 'Client testimonials',
                image: '/images/services/dkdp-agence-creation-video.webp',
                results: ['6 testimonials filmed in 1 day', 'Used on website + LinkedIn', 'Conversion rate +35%'],
                tech: 'Interview · 4K · Motion Graphics',
              },
              {
                client: 'Geneva lifestyle brand',
                type: 'Instagram Reels series',
                image: '/images/services/dkdp-agence-reseaux-sociaux.webp',
                results: ['12 Reels produced / quarter', "Average reach 28'000 / Reel", '+340% followers in 4 months'],
                tech: 'Reels · 9:16 · CapCut Pro',
              },
              {
                client: 'Industrial SMB',
                type: 'Corporate Brand Film',
                image: '/images/services/dkdp-agence-consulting.webp',
                results: ['3-min film + 4 variations', 'Used at a trade show', 'Inbound leads +60% B2B show'],
                tech: 'Brand Film · Drone · 4K · DaVinci',
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
                  { Icon: ShieldCheck, title: 'Approved storyboard', desc: 'You approve the storyboard before the shoot. No surprises: you know exactly what will be filmed.' },
                  { Icon: Clock, title: 'Delivery in 5 days', desc: 'Post-production delivered within 5 days for social clips, 10 days for brand films and interviews.' },
                  { Icon: BarChart2, title: 'All formats included', desc: 'Each video is delivered in several formats adapted to the platforms: 9:16 for Reels, 16:9 for YouTube and LinkedIn.' },
                  { Icon: Globe2, title: 'Full rights transferred', desc: 'You receive all usage rights. No restrictions on use or duration for the delivered videos.' },
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
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="FAQ: video production for SMBs and companies in French-speaking Switzerland" lang="en" />
      </div>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href={localizedPath('/agence-digitale/reseaux-sociaux', 'en')}
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
                  <Zap size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Next step</p>
                  <p className="text-text font-bold text-lg leading-tight">Social media management</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    A professional video is good. Distributed on the right platforms with the right strategy, it is transformational. Discover our social media management.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                See social media <ChevronRight size={12} />
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
