import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  BrainCircuit, BookOpen, Shield, Share2, Palette, Cpu, Film, Sparkles, Wand2,
  ChevronRight, Award, CalendarCheck, Users, ExternalLink, User, GraduationCap, Monitor,
  Clock, BarChart2, Lightbulb, Target, BookCheck, Briefcase, MapPin,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import dynamic from 'next/dynamic'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { ParallaxOrangeBlobs } from '@/components/ui/ParallaxOrangeBlobs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const FormationTrainer = dynamic(() => import('@/components/sections/FormationTrainer').then(m => ({ default: m.FormationTrainer })))
const FormationROICalculator = dynamic(() => import('@/components/sections/FormationROICalculator').then(m => ({ default: m.FormationROICalculator })))
const ProgressionDiagram = dynamic(() => import('@/app/formation-entreprise/_components/ProgressionDiagram').then(m => ({ default: m.ProgressionDiagram })))

import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildCourse, buildBreadcrumbList, buildFAQPage, buildOrganization } from '@/lib/schema'
import { orange } from '@/lib/tokens'
import { HeroVisual } from '@/app/formation-entreprise/_components/HeroVisual'
import { AppLogoMarquee, IA_LOGOS, BUREAUTIQUE_LOGOS, PRODUCTIVITE_LOGOS } from '@/components/ui/AppLogos'

export const metadata: Metadata = {
  title: 'Corporate Training Geneva and Switzerland · SMBs and Teams · DKDP',
  description: 'Corporate IT training in Geneva and across Switzerland. Train your team on AI, Excel, cybersecurity. Tailored sessions, on-site or remote. Free quote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise',
      en: 'https://dkdp.ch/en/corporate-training',
      'x-default': 'https://dkdp.ch/formation-entreprise',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-entreprise.png', width: 1376, height: 768, alt: 'Corporate IT training Geneva, DKDP' }],
  },
}

const PROGRAMS = [
  {
    Icon: BrainCircuit, title: 'Corporate AI training', href: '/en/corporate-training/ai',
    description: 'ChatGPT, Claude, Copilot: learn to integrate AI tools into your daily work and win back 2 hours every day.',
    badge: 'Trending',
    image: '/images/services/dkdp-formation-ia.webp',
  },
  {
    Icon: Sparkles, title: 'Claude AI Training', href: '/en/corporate-training/claude-ai',
    description: 'Master Claude.ai, collaborative Projects and Claude Code. The dedicated training on the most powerful AI on the market.',
    badge: 'New',
    image: '/images/services/dkdp-formation-ia.webp',
  },
  {
    Icon: BookOpen, title: 'Office tools and Excel', href: '/en/corporate-training/office-tools',
    description: 'Master Excel, Word, PowerPoint and Microsoft 365 tools. From formulas to pivot tables.',
    badge: null,
    image: '/images/services/dkdp-formation-bureautique.webp',
  },
  {
    Icon: Shield, title: 'Cybersecurity', href: '/en/corporate-training/cybersecurity',
    description: 'Train your team on the risks: phishing, passwords, GDPR. A trained team equals a protected company.',
    badge: null,
    image: '/images/services/dkdp-formation-cybersecurite.webp',
  },
  {
    Icon: Share2, title: 'Social media training', href: '/en/corporate-training/social-media',
    description: 'Strategy, content creation, planning and performance analysis on LinkedIn, Instagram and Facebook.',
    badge: null,
    image: '/images/services/dkdp-formation-reseaux-sociaux.webp',
  },
  {
    Icon: Wand2, title: 'Canva training', href: '/en/corporate-training/canva',
    description: 'Build professional visuals in 5 minutes. Brand Kit, templates, social posts, presentations and Magic Studio AI.',
    badge: 'Popular',
    image: '/images/services/dkdp-formation-canva.webp',
  },
  {
    Icon: Palette, title: 'Figma training', href: '/en/corporate-training/figma',
    description: 'Design your website before you build it. UI/UX, Figma, wireframes, design systems, interactive prototypes.',
    badge: null,
    image: '/images/services/dkdp-formation-figma-geneve.webp',
  },
  {
    Icon: Cpu, title: 'IT skills', href: '/en/corporate-training/it-skills',
    description: 'Essential IT skills for everyday efficiency. Shortcuts, organisation, cloud, collaboration.',
    badge: null,
    image: '/images/services/dkdp-formation-informatique.webp',
  },
  {
    Icon: Film, title: 'Video editing', href: '/en/corporate-training/video-editing',
    description: 'Create professional videos for your social channels and presentations. CapCut, Premiere, Reels.',
    badge: null,
    image: '/images/services/dkdp-formation-montage-video.webp',
  },
]

const STATS = [
  { value: '500+', label: 'People trained' },
  { value: '4.9/5', label: 'Average satisfaction' },
  { value: '100%', label: 'Tailored' },
]

const FORMATS = [
  {
    Icon: Users, title: 'On-site at your office',
    desc: 'We travel to your office. Ideal format for teams of 1 to 10 people, with hands-on exercises on your own tools.',
  },
  {
    Icon: CalendarCheck, title: 'Online and hybrid',
    desc: 'Interactive video sessions for distributed teams or remote training. As effective as on-site.',
  },
  {
    Icon: Award, title: 'Entirely tailored',
    desc: 'The programme adapts to your sector, your tools and your level. No generic training: only what is relevant.',
  },
]

const FAQ_FORMATION_EN = [
  {
    question: 'How long does an AI training session last in Geneva?',
    answer: 'The standard format is a half-day (3 hours) or a full day (6 hours), tailored to your level and objectives. Hour-by-hour custom formats are also available for specific topics.',
  },
  {
    question: 'How much does corporate AI training cost?',
    answer: "An AI training session starts at CHF 200/hour for 1 person, CHF 300/hour for 2 people. For groups (3 to 10 people) the rate is set per project. Custom programme: half-day, full day or recurring sessions.",
  },
  {
    question: 'Who teaches at DKDP?',
    answer: 'Active trainers in their field: web designers, AI experts, cybersecurity specialists. No external instructors disconnected from reality. Every trainer is also a hands-on consultant.',
  },
  {
    question: 'How long does it take to deploy training in a company?',
    answer: 'Custom programme delivered within 48 hours of the discovery call. First session typically takes place within 1 to 3 weeks depending on availability. Urgent format possible on request.',
  },
  {
    question: 'Are the training sessions in person or online?',
    answer: 'Both. On-site sessions across Geneva and French-speaking Switzerland (Lausanne, Fribourg, Neuchatel). Online via video conference with interactive exercises, screen sharing and live workshops. Hybrid format also available.',
  },
  {
    question: 'Is there a specific training for managers?',
    answer: 'Yes. We design specific training for executives and managers: AI for decision-making, dashboards and KPIs in Excel, presentation skills with Canva, team cybersecurity. Shorter, denser, action-focused formats.',
  },
  {
    question: 'Can the team be trained on its own tools?',
    answer: 'Yes, and it is even recommended. We adapt every exercise to your existing tools (Microsoft 365, Google Workspace, Notion, HubSpot, etc.). Your team learns directly on its real environment, no test sandbox.',
  },
  {
    question: 'Do you provide a certificate at the end of the training?',
    answer: 'Yes. Each participant receives a personalised completion certificate, useful for HR records or skill mapping. Detailed PDF summary of the programme covered also provided.',
  },
]

const color = orange.color, bg = orange.bg, border = orange.border

const badgeColors: Record<string, { background: string; color: string; border: string }> = {
  'Trending':    { background: 'rgba(10,10,10,0.84)', color: '#FCD34D', border: '1px solid rgba(255,140,0,0.68)' },
  'Popular':     { background: 'rgba(10,10,10,0.84)', color: '#FDBA74', border: '1px solid rgba(255,107,0,0.62)' },
  'New':         { background: 'rgba(10,10,10,0.84)', color: '#FCD34D', border: '1px solid rgba(255,140,0,0.68)' },
}

export default function EnCorporateTrainingPage() {
  return (
    <main>
      <SchemaOrg schema={buildOrganization('en')} />
      <SchemaOrg schema={buildCourse({
        name: 'Corporate IT and AI training',
        url: '/en/corporate-training',
        description: 'Corporate IT and AI training in Geneva for SMBs and large companies. AI, office tools, cybersecurity, social media. Tailored sessions on your real tools.',
        duration: 'P1D',
        teaches: ['AI', 'Office tools', 'Cybersecurity', 'Social media', 'Web design', 'IT skills', 'Video editing'],
        prerequisites: 'No technical prerequisites',
        priceFrom: 200,
        ratingValue: '4.9',
        ratingCount: 500,
        lang: 'en',
      })} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: '/en' },
        { name: 'Corporate training', url: '/en/corporate-training' },
      ])} />
      <SchemaOrg schema={buildFAQPage(FAQ_FORMATION_EN)} />

      <HeroBg
        blob1="rgba(255,107,0,0.13)"
        blob2="rgba(255,107,0,0.06)"
        accentRgb="255,140,0"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Corporate training Geneva and Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Your team is skilled <GradText as="span">by tomorrow</GradText>. Not in six months.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  Tailored IT training for SMBs and large companies in Geneva. AI, office tools, cybersecurity: your team progresses in a single day, on their real tools.
                </p>
                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: '100% tailored', Icon: Target },
                    { label: 'On your real tools', Icon: Briefcase },
                    { label: 'Geneva and Switzerland', Icon: MapPin },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton href="/en/contact?service=training" size="lg">Request a quote →</LiquidMetalButton>
                  <Link href="#programmes" className="text-sm text-text-muted hover:text-text transition-colors">
                    See the programmes ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Programme updated: April 2026</p>
              </div>
              <div>
                <div className="mb-6 lg:mb-8" aria-label="Tools taught in corporate training">
                  <AppLogoMarquee
                    logos={[...IA_LOGOS.slice(0, 6), ...BUREAUTIQUE_LOGOS, ...PRODUCTIVITE_LOGOS]}
                    durationSeconds={171}
                    size="md"
                  />
                </div>
                <HeroVisual lang="en" />
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
            {STATS.map((s) => (
              <SectionReveal key={s.label}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1 text-text">{s.value}</p>
                  <p className="text-text-muted text-sm">{s.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <LogoBanner label="Teams already trained" />

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">The context</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-2xl mx-auto">
                Why train your team in digital skills?
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                Icon: Clock,
                stat: '2h',
                title: 'Lost every day',
                desc: 'That is the average time a team member loses on digital tasks they have only mastered at 60%. Shortcuts, cloud, email: a half-day is enough to change everything.',
              },
              {
                Icon: BarChart2,
                stat: '63%',
                title: 'Of SMBs are under-equipped',
                desc: '63% of SMBs report that their team does not master the digital tools at their disposal. Targeted IT training closes that gap fast.',
              },
              {
                Icon: Lightbulb,
                stat: '3x',
                title: 'More productive after',
                desc: 'That is the average productivity gain observed after targeted digital training. Not because people work more, but because they work better.',
              },
            ].map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.1}>
                <div
                  className="flex flex-col gap-4 p-7 rounded-[16px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <item.Icon size={22} style={{ color }} />
                  </div>
                  <p className="text-[2.2rem] font-bold leading-none" style={{ color }}>{item.stat}</p>
                  <h3 className="text-text font-bold text-lg">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal delay={0.25}>
            <div
              className="rounded-[16px] p-7 border text-center"
              style={{ background: 'rgba(255,107,0,0.05)', borderColor: 'rgba(255,107,0,0.20)' }}
            >
              <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Our corporate IT training programmes are designed for immediate impact: every team member walks out with skills usable the next day, on their real tools, in their real professional context. Whether you are an SMB of 5 or a team of 50, the programme adapts.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <HeroBg className="bg-bg-card border-y border-border" accentRgb="255,140,0" blob1="rgba(255,107,0,0.10)" blob2="rgba(124,58,237,0.07)">
        <section id="programmes" className="relative py-24 overflow-hidden">
          <ParallaxOrangeBlobs />
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="mb-14">
                <GradTag className="mb-4">Our programmes</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                  Our IT training programmes for companies and SMBs
                </h2>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROGRAMS.map((p, i) => (
                <SectionReveal key={p.href} delay={i * 0.06}>
                  <Link
                    href={p.href}
                    className="group flex flex-col h-full bg-bg rounded-[14px] border overflow-hidden hover:-translate-y-0.5 transition-transform duration-200 relative"
                    style={{
                      borderColor: p.badge ? 'rgba(255,140,0,0.40)' : border,
                      boxShadow: p.badge ? '0 0 28px rgba(255,107,0,0.08)' : undefined,
                    }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                      {p.badge && (
                        <span
                          className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={badgeColors[p.badge] ?? { background: 'rgba(10,10,10,0.84)', color: '#FDBA74', border: '1px solid rgba(255,107,0,0.62)' }}
                        >
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-[7px] mb-3"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <p.Icon size={16} style={{ color }} />
                      </div>
                      <h3 className="text-text font-semibold mb-2">{p.title}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed flex-1">{p.description}</p>
                      <span
                        className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold transition-opacity group-hover:opacity-70"
                        style={{ color }}
                      >
                        See the programme <ChevronRight size={12} />
                      </span>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </HeroBg>

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Real impact</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                What corporate IT training really changes
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-16">
            <SectionReveal>
              <div
                className="h-full rounded-[20px] p-8 border"
                style={{ background: bg, borderColor: border }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6" style={{ color }}>
                  Progress observed across 500+ participants
                </p>
                <ProgressionDiagram lang="en" />
              </div>
            </SectionReveal>

            <div className="grid grid-cols-2 gap-4 items-stretch">
              {[
                { v: '500+',     l: 'Participants trained', sub: 'In French-speaking Switzerland since 2015' },
                { v: '4.9/5',    l: 'Satisfaction',          sub: 'Average post-training score' },
                { v: '91%',      l: 'Apply on day one',      sub: 'Skills used immediately' },
                { v: '< 3 wks',  l: 'To measurable effect',  sub: 'Productivity gain visible' },
              ].map((kpi, i) => (
                <SectionReveal key={kpi.l} delay={i * 0.08} className="h-full">
                  <div
                    className="flex flex-col justify-center h-full p-6 rounded-[14px] border text-center"
                    style={{ background: bg, borderColor: border }}
                  >
                    <p className="text-3xl font-bold mb-2 leading-none" style={{ color }}>{kpi.v}</p>
                    <p className="text-text text-sm font-semibold leading-snug">{kpi.l}</p>
                    <p className="text-text-muted text-xs mt-1 leading-snug">{kpi.sub}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'AI training',
                before: 'The team avoids ChatGPT, afraid of making mistakes or leaking data',
                after: 'Every team member has their own prompts, saves 1.5 hours a day and understands the limits',
                tag: 'ChatGPT, Claude, Copilot',
              },
              {
                title: 'Office tools and Excel',
                before: 'Reports take 4 hours every Monday morning, manually, with recurring errors',
                after: 'Automated pivot tables in 15 minutes. Zero data-entry errors',
                tag: 'Excel, Microsoft 365',
              },
              {
                title: 'Cybersecurity',
                before: '3 out of 5 team members click on a simulated phishing link in the initial test',
                after: 'After training: zero clicks in follow-up tests. Reflexes acquired for good',
                tag: 'Phishing, GDPR, Passwords',
              },
            ].map((c, i) => (
              <SectionReveal key={c.title} delay={i * 0.1}>
                <div className="flex flex-col h-full rounded-[16px] border border-border overflow-hidden">
                  <div className="p-5 min-h-[96px] flex flex-col justify-between" style={{ background: bg }}>
                    <span
                      className="self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(10,10,10,0.84)', color, border: '1px solid rgba(255,107,0,0.52)' }}
                    >
                      {c.tag}
                    </span>
                    <p className="text-text font-bold mt-3">{c.title}</p>
                  </div>
                  <div className="p-5 flex flex-col gap-4 flex-1 bg-bg-card">
                    <div>
                      <p className="text-text-muted text-xs font-semibold mb-1">Before</p>
                      <p className="text-text-secondary text-sm">{c.before}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-1" style={{ color }}>After DKDP</p>
                      <p className="text-text text-sm">{c.after}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <FormationROICalculator />

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionReveal>
                <div className="mb-10">
                  <GradTag className="mb-4">How it works</GradTag>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                    A training programme that adapts to you.
                  </h2>
                </div>
              </SectionReveal>
              <div className="flex flex-col gap-6">
                {FORMATS.map((f, i) => (
                  <SectionReveal key={f.title} delay={i * 0.1}>
                    <div className="flex gap-5 p-6 bg-bg-card border border-border rounded-[14px]">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <f.Icon size={22} style={{ color }} />
                      </div>
                      <div>
                        <h3 className="text-text font-bold text-lg mb-2">{f.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
            <SectionReveal delay={0.2}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.12)' }}>
                <Image
                  src="/images/services/dkdp-formation-ia.webp"
                  alt="On-site AI training for professional teams"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section className="py-24 border-y border-border">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-14">
                <GradTag className="mb-4">How it unfolds</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  From request to result in 4 steps.
                </h2>
              </div>
            </SectionReveal>
            <div className="relative">
              <div
                aria-hidden="true"
                className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(255,140,0,0.20) 5%, rgba(255,140,0,0.70) 25%, #FF8C00 50%, rgba(255,140,0,0.70) 75%, rgba(255,140,0,0.20) 95%, transparent)',
                }}
              />
              <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    Icon: Users,
                    n: '01',
                    title: 'Needs analysis',
                    desc: 'A 30-minute call to understand your team, your tools, your current level and your objectives. We build the programme together.',
                  },
                  {
                    Icon: BookCheck,
                    n: '02',
                    title: 'Tailored programme',
                    desc: 'We deliver a personalised programme within 48 hours. Modules, duration, examples from your sector. You approve before the training.',
                  },
                  {
                    Icon: GraduationCap,
                    n: '03',
                    title: 'Hands-on training',
                    desc: 'Interactive session at your office or remote. We work on your real tools, your real files, your real cases. No theory without practice.',
                  },
                  {
                    Icon: Target,
                    n: '04',
                    title: 'Post-training follow-up',
                    desc: 'PDF recap guide delivered. Q&A session available 30 days after. We make sure the skills stick.',
                  },
                ].map((step, i) => (
                  <SectionReveal key={step.n} delay={i * 0.1}>
                    <div className="relative flex flex-col gap-4 p-7 bg-bg rounded-[16px] border border-border h-full">
                      <span
                        className="absolute top-4 right-4 text-[11px] font-bold"
                        style={{ color: `${color}55` }}
                      >
                        {step.n}
                      </span>
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <step.Icon size={22} style={{ color }} />
                      </div>
                      <h3 className="text-text font-bold text-lg">{step.title}</h3>
                      <p className="text-text-secondary leading-relaxed text-sm flex-1">{step.desc}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      <FormationTrainer accentColor='#FF8C00' lang="en" />

      <section className="py-20 border-t border-border">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="text-center mb-10">
            <GradTag className="mb-4">FAQ</GradTag>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your questions about our training programmes</h2>
          </div>
          <ul className="space-y-3">
            {FAQ_FORMATION_EN.map(({ question, answer }) => (
              <li key={question}>
                <details className="group rounded-xl border border-border p-4 sm:p-5 transition-colors hover:border-[var(--text-muted)] bg-bg-card">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                    <span className="font-semibold text-[15px] sm:text-base leading-snug">{question}</span>
                    <span className="flex-shrink-0 mt-1 text-text-muted transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-text-secondary text-sm sm:text-[15px] leading-relaxed">{answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Our other areas of expertise
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SectionReveal delay={0.05}>
              <Link
                href="/en/artificial-intelligence"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(212,212,216,0.05)', borderColor: 'rgba(212,212,216,0.18)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-[#D4D4D8]">Artificial Intelligence</p>
                  <p className="text-text font-semibold">Automate your processes with AI</p>
                  <p className="text-text-muted text-xs mt-1">AI agents, automation, free audit. ROI in under 3 months.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 text-[#D4D4D8] transition-transform group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <Link
                href="/en/digital-agency"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(124,58,237,0.07)', borderColor: 'rgba(124,58,237,0.22)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#A78BFA' }}>Digital agency</p>
                  <p className="text-text font-semibold">A website and SEO that bring in clients</p>
                  <p className="text-text-muted text-xs mt-1">Web design, SEO, Google Ads. A single point of contact.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 text-[#A78BFA] transition-transform group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="relative overflow-hidden rounded-[24px] border"
              style={{
                background: 'linear-gradient(135deg, rgba(255,105,0,0.10) 0%, rgba(255,105,0,0.04) 60%, rgba(255,140,0,0.07) 100%)',
                borderColor: 'rgba(255,105,0,0.28)',
              }}
            >
              <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,105,0,0.10) 0%, transparent 70%)' }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0 items-stretch">
                <div className="p-10 md:p-12">
                  <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest"
                    style={{ background: 'rgba(255,105,0,0.15)', color: '#FF8C00', border: '1px solid rgba(255,105,0,0.30)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF6900' }} />
                    Our partner brand
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4 text-text">
                    Are you an individual or self-employed?
                  </h2>
                  <p className="text-text-secondary text-base leading-relaxed mb-8 max-w-xl">
                    DKDP training programmes are built for corporate teams. For individuals, seniors or beginners who want to learn at their own pace, we founded{' '}
                    <span className="text-text font-semibold">cours-informatique.ch</span>{' '}
                    : one-to-one in-person classes in Geneva or at home, run by the same trainers. Note: cours-informatique.ch sessions are delivered in French.
                  </p>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
                    {[
                      { Icon: User, label: 'One-to-one classes, a dedicated trainer' },
                      { Icon: Monitor, label: 'Beginners and seniors welcome' },
                      { Icon: GraduationCap, label: 'At home or in central Geneva' },
                    ].map(({ Icon, label }) => (
                      <div key={label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-[10px]"
                        style={{ background: 'rgba(255,105,0,0.10)', border: '1px solid rgba(255,105,0,0.18)' }}
                      >
                        <Icon size={14} style={{ color: '#FF8C00' }} />
                        <span className="text-text-secondary text-sm">{label}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://cours-informatique.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[10px] text-sm font-semibold transition-all hover:opacity-80"
                    style={{
                      background: '#FF6900',
                      color: '#fff',
                    }}
                  >
                    Discover cours-informatique.ch
                    <ExternalLink size={14} />
                  </a>
                </div>

                <div className="hidden lg:flex items-center justify-center relative overflow-hidden rounded-r-[24px] p-8"
                  style={{ background: 'rgba(255,105,0,0.08)', borderLeft: '1px solid rgba(255,105,0,0.18)' }}
                >
                  <Image
                    src="/images/partners/ci-mascot-thumbs.svg"
                    alt="cours-informatique.ch mascot"
                    width={260}
                    height={160}
                    className="w-full h-auto object-contain"
                  />
                </div>

              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <CTAFinal accentRgb="255,140,0" />
    </main>
  )
}
