import type { Metadata } from 'next'
import Link from 'next/link'
import { Bot, Workflow, BrainCircuit, Cpu, MessageCircle, ArrowRight, Check } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildOrganization } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'AI Agency Geneva · Custom Agents, Automation, Chatbots | DKDP',
  description:
    'Geneva-based AI agency. Custom AI agents, business automation with n8n and Make, AI chatbots, audits and implementation inside your stack. Free AI audit in 48 hours.',
  alternates: {
    canonical: 'https://dkdp.ch/en/artificial-intelligence',
    languages: {
      'fr-CH': 'https://dkdp.ch/intelligence-artificielle',
      en: 'https://dkdp.ch/en/artificial-intelligence',
      'x-default': 'https://dkdp.ch/intelligence-artificielle',
    },
  },
  openGraph: {
    title: 'AI Agency Geneva · Custom Agents, Chatbots, Automation | DKDP',
    description: 'AI that ships and pays back. Agents, chatbots, automation, audits. Designed and trained by the same team.',
    url: 'https://dkdp.ch/en/artificial-intelligence',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
  },
}

const AI_SERVICES = [
  { slug: 'ai-agents',         title: 'Custom AI agents',      icon: Bot,          desc: 'Agents trained on your docs, your tone, your processes. Built on Claude, GPT or Gemini.' },
  { slug: 'automation',        title: 'Business automation',   icon: Workflow,     desc: 'No-code workflows on n8n, Make, Zapier. From lead routing to invoice generation.' },
  { slug: 'audit-consulting',  title: 'AI audit & consulting', icon: BrainCircuit, desc: 'Where does AI move the needle in your business? Hands-on audit and prioritised roadmap.' },
  { slug: 'implementation',    title: 'AI implementation',     icon: Cpu,          desc: 'We deploy the agent, connect it to your stack, train your team to actually use it.' },
  { slug: 'ai-chatbot',        title: 'AI chatbot',            icon: MessageCircle,desc: '24/7 assistant with grounded answers, lead capture, calendar booking, voice input.' },
]

export default function EnAiHubPage() {
  return (
    <>
      <SchemaOrg schema={buildOrganization()} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Artificial intelligence', url: '/en/artificial-intelligence' },
        ])}
      />

      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <GradTag>AI agency · Geneva</GradTag>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight leading-[1.08] mt-4 mb-5">
            AI that ships, <br className="hidden sm:inline" />
            <GradText as="span">not slide decks.</GradText>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-[720px] mx-auto mb-9">
            Custom agents, automation and chatbots designed, built and rolled out by a senior team
            that also trains your people to use them. No PowerPoint theatre, no proof-of-concept hell.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <LiquidMetalButton href="/en/contact" size="lg">Get a free AI audit <ArrowRight size={16} /></LiquidMetalButton>
            <Link href="/en/corporate-training/ai" className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-text-secondary hover:text-text">
              See AI training <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-y border-border" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <GradTag>AI services</GradTag>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-3">Five ways AI pays back</h2>
            <p className="text-text-secondary text-base max-w-[640px] mx-auto leading-relaxed">
              Start with what matters most to your team. We sequence the work so each step ships value within weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_SERVICES.map(({ slug, title, icon: Icon, desc }) => (
              <Link
                key={slug}
                href={`/en/artificial-intelligence/${slug}`}
                className="group flex flex-col gap-3 rounded-xl p-5 border transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--chrome-bg)', borderColor: 'var(--chrome-border)' }}
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'var(--chrome-bg)', border: '1px solid var(--chrome-border)' }}>
                  <Icon size={18} className="text-text-secondary" />
                </div>
                <h3 className="font-bold text-[15px]">{title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                <span className="mt-auto pt-2 inline-flex items-center gap-1 text-xs font-semibold text-text-secondary transition-transform group-hover:translate-x-1">
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
            <GradTag>Approach</GradTag>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4">
              Real AI, on your stack, used by your team
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-4">
              Most AI projects fail not because the model is bad, but because nobody uses it.
              We ship and train at the same time so adoption is built in.
            </p>
            <p className="text-text-secondary text-base leading-relaxed">
              We work on Claude, ChatGPT, Gemini, Copilot, n8n, Make, Supabase and your existing tools.
              No fancy proprietary box you cannot maintain.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              { title: 'Grounded in your context', text: 'Agents read your docs, your style guide, your historical data. Answers stay on brand.' },
              { title: 'Privacy first', text: 'Swiss hosting where it matters. EU-only providers. Anonymised pipelines. GDPR clean.' },
              { title: 'Maintainable by you', text: 'You own the prompts, the workflows, the credentials. We document and train, not lock in.' },
              { title: 'Measured ROI', text: 'Hours saved, lead conversion, ticket deflection. We track the metric your CFO cares about.' },
            ].map((b) => (
              <li key={b.title} className="flex gap-3">
                <span className="flex-shrink-0 mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--chrome-bg)]">
                  <Check size={13} className="text-text-secondary" />
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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Get a free AI audit</h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-7">
            48-hour deliverable. Real findings, prioritised by impact and effort. Yours to keep with no engagement.
          </p>
          <LiquidMetalButton href="/en/contact" size="lg">
            Request the audit <ArrowRight size={16} />
          </LiquidMetalButton>
        </div>
      </section>
    </>
  )
}
