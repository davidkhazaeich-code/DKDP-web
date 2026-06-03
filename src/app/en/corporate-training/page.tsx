import type { Metadata } from 'next'
import Link from 'next/link'
import { BrainCircuit, BookOpen, Share2, Shield, Wand2, Palette, Cpu, Film, ArrowRight, Check } from 'lucide-react'
import { ClaudeIcon } from '@/components/icons/ClaudeIcon'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildOrganization } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Corporate AI Training Geneva · Claude, ChatGPT, Copilot | DKDP',
  description:
    'Corporate AI training in Geneva and across Switzerland. Hands-on sessions on Claude, ChatGPT, Copilot, Canva, Figma, cybersecurity and office tools. Delivered in English. From CHF 1,500.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise',
      en: 'https://dkdp.ch/en/corporate-training',
      'x-default': 'https://dkdp.ch/formation-entreprise',
    },
  },
  openGraph: {
    title: 'Corporate AI Training Geneva · Claude, ChatGPT, Copilot | DKDP',
    description: 'Practical AI training that sticks. On-site or remote, in English. From CHF 1,500 per half-day.',
    url: 'https://dkdp.ch/en/corporate-training',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
  },
}

const TRAININGS = [
  { slug: 'ai',             title: 'Corporate AI training', icon: BrainCircuit, desc: 'Claude, ChatGPT, Copilot and the workflows your team actually uses daily.' },
  { slug: 'claude-ai',      title: 'Claude training',       icon: ClaudeIcon,   desc: 'Claude.ai, Projects, Cowork and Claude Code. From first prompt to autonomous agents.' },
  { slug: 'office-tools',   title: 'Office tools',          icon: BookOpen,     desc: 'Save hours every week on Excel, Word, PowerPoint and modern office automations.' },
  { slug: 'social-media',   title: 'Social media',          icon: Share2,       desc: 'Master LinkedIn, Instagram, TikTok and the algorithms that move the needle.' },
  { slug: 'cybersecurity',  title: 'Cybersecurity',         icon: Shield,       desc: 'Phishing, password hygiene, MFA, social engineering. Practical drills, not slides.' },
  { slug: 'canva',          title: 'Canva training',        icon: Wand2,        desc: 'Brand Kit, templates, Magic Studio AI. Build a design system in one day.' },
  { slug: 'web-design',     title: 'Web design with Figma', icon: Palette,      desc: 'UI/UX, wireframes, design systems, interactive prototypes. Real client briefs.' },
  { slug: 'it-skills',      title: 'IT skills',             icon: Cpu,          desc: 'Modern fundamentals: cloud, collaboration, automation, AI literacy for non-tech teams.' },
  { slug: 'video-editing',  title: 'Video editing',         icon: Film,         desc: 'Produce shareable, brand-aligned videos with the same tools your team already has.' },
]

export default function EnTrainingHubPage() {
  return (
    <>
      <SchemaOrg schema={buildOrganization()} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Corporate training', url: '/en/corporate-training' },
        ])}
      />

      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <GradTag>Corporate training · Geneva</GradTag>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight leading-[1.08] mt-4 mb-5">
            Hands-on training <br className="hidden sm:inline" />
            <GradText as="span">that sticks.</GradText>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-[720px] mx-auto mb-9">
            Practical, in-the-tool training for your team. AI, office, design, social, security and video.
            On-site or remote, fully bilingual French and English. From CHF 1,500 per half-day session.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <LiquidMetalButton href="/en/contact" size="lg">Book a training day <ArrowRight size={16} /></LiquidMetalButton>
            <Link href="/en/pricing" className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-text-secondary hover:text-text">
              See pricing <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-y border-border" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <GradTag>Training catalogue</GradTag>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-3">Nine training tracks, one team</h2>
            <p className="text-text-secondary text-base max-w-[640px] mx-auto leading-relaxed">
              Each track is delivered by a senior practitioner who also ships in the field, so what you learn matches what is actually used today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRAININGS.map(({ slug, title, icon: Icon, desc }) => (
              <Link
                key={slug}
                href={`/en/corporate-training/${slug}`}
                className="group flex flex-col gap-3 rounded-xl p-5 border transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(255,107,0,0.05)', borderColor: 'rgba(255,107,0,0.18)' }}
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.25)' }}>
                  <Icon size={18} style={{ color: '#FF8C00' }} />
                </div>
                <h3 className="font-bold text-[15px]">{title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                <span className="mt-auto pt-2 inline-flex items-center gap-1 text-xs font-semibold transition-transform group-hover:translate-x-1" style={{ color: '#FF8C00' }}>
                  Learn more <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <GradTag>Format</GradTag>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4">
              The format that actually works
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-4">
              Half-day to two-day sessions, 4 to 12 people, on real cases from your business.
              We co-build a take-home playbook so the team keeps shipping after the trainer leaves.
            </p>
            <p className="text-text-secondary text-base leading-relaxed">
              Available in English or French, on your premises in Geneva, Lausanne, Zurich, Basel,
              or remote over Teams or Meet. Materials included, ready to reuse internally.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              { title: 'Practical from minute one', text: 'No slide marathon. Tools open, real prompts, real data, real shipped output.' },
              { title: 'Tailored to your stack', text: 'Pre-session interview to map your existing tools and pain points before we design the agenda.' },
              { title: 'Take-home playbook', text: 'Your team leaves with a written, reusable playbook in your wording, not a generic PDF.' },
              { title: 'Follow-up email coaching', text: 'Two weeks of email Q&A after the session. Free of charge, no extra invoice.' },
            ].map((b) => (
              <li key={b.title} className="flex gap-3">
                <span className="flex-shrink-0 mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full" style={{ background: 'rgba(255,107,0,0.15)' }}>
                  <Check size={13} style={{ color: '#FF8C00' }} />
                </span>
                <div>
                  <h3 className="font-semibold mb-0.5 text-[15px]">{b.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-24 border-t border-border text-center" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Book a training day</h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-7">
            Tell us your team, your tools, your pains. Within 24 hours you have an agenda, a price, and a date.
          </p>
          <LiquidMetalButton href="/en/contact" size="lg">
            Request a proposal <ArrowRight size={16} />
          </LiquidMetalButton>
        </div>
      </section>
    </>
  )
}
