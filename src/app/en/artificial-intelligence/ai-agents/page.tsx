import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Bot,
  Users,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Wrench,
  Rocket,
  TrendingUp,
  Star,
  MessageSquare,
  Database,
  Zap,
  ShieldCheck,
  Clock,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import dynamic from 'next/dynamic'
import { HeroBg } from '@/components/ui/HeroBg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { chrome, violet as violetToken, green as greenToken } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS } from '@/components/ui/AppLogos'
import { localizedPath } from '@/i18n/slugs'
const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))

export const metadata: Metadata = {
  title: 'AI Agents Geneva & French-speaking Switzerland | Claude, GPT-5 | DKDP',
  description:
    'Custom autonomous AI agents for Swiss SMBs: virtual assistants, sales agents, RAG. Built on Claude Anthropic, GPT-5, LangChain, n8n. 48-hour quote.',
  alternates: {
    canonical: 'https://dkdp.ch/en/artificial-intelligence/ai-agents',
    languages: {
      'fr-CH': 'https://dkdp.ch/intelligence-artificielle/agents-ia',
      en: 'https://dkdp.ch/en/artificial-intelligence/ai-agents',
      'x-default': 'https://dkdp.ch/intelligence-artificielle/agents-ia',
    },
  },
  openGraph: {
    url: 'https://dkdp.ch/en/artificial-intelligence/ai-agents',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/agents-ia.png', width: 1376, height: 768, alt: 'Custom AI agents Geneva: Claude, GPT-5, LangChain by DKDP' }],
  },
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const color  = chrome.color
const bg     = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'
const violet = violetToken.color
const green  = greenToken.color

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: 'What is the difference between an AI agent and a simple chatbot?',
    answer:
      'A chatbot replies to predefined keywords along a fixed decision tree. An AI agent reads the context of every interaction, makes autonomous decisions based on your business rules, integrates with your tools (CRM, email, databases) and executes concrete actions without human intervention. It is the difference between a smart form and an autonomous teammate.',
  },
  {
    question: 'Which languages can the agent communicate in?',
    answer:
      'DKDP agents work natively in French, English, German and Italian. For specific markets, other languages can be added depending on your context. The agent automatically detects the language of the person it talks to and replies in the same language.',
  },
  {
    question: 'How is my data protected?',
    answer:
      'Data security is an absolute priority. Depending on your constraints, we deploy the agent on your infrastructure (private cloud or on-premise) or via providers compliant with the GDPR and Swiss data protection law. Your data is never used to train third-party models. A confidentiality agreement is always signed.',
  },
  {
    question: 'Who maintains the agent once deployed?',
    answer:
      'DKDP provides a 3-month post-deployment follow-up included in every project. During this period, we monitor performance, adjust behaviours and handle the edge cases identified. Beyond that, a monthly maintenance can be set up. Your team is also trained to handle routine adjustments autonomously.',
  },
  {
    question: 'What happens if the agent makes a mistake?',
    answer:
      'Every agent is built with a confidence threshold. Below that threshold, it automatically escalates to a human rather than answering incorrectly. Errors are logged and analysed during the monthly follow-up. In the first weeks, we recommend human validation on a subset of interactions to calibrate the behaviour.',
  },
  {
    question: 'Claude or ChatGPT for my business?',
    answer:
      'We pick the model based on your use case. Claude Opus 4.7 (Anthropic) is preferred for agents that reason over long text, analyse large documents (contracts, reports, knowledge bases) and use business tools. GPT-5 (OpenAI) is preferred for multimodal agents (text, image, voice) and broad integrations. Gemini 3 (Google) wins when your stack is 100% Google Workspace. For regulated sectors (medical, legal, finance), we also offer self-hosted Mistral, Llama 4, or sovereign Swiss solutions (Infomaniak Euria, Swisscom Swiss AI Assistant).',
  },
  {
    question: 'Is my data hosted in Switzerland?',
    answer:
      'Yes, if your regulatory constraints (FADP 2023, banking secrecy, medical confidentiality) require it. We then deploy the agent on an Infomaniak VPS in Switzerland or on your on-premise infrastructure, with LangChain/LangGraph for orchestration and self-hosted Qdrant or Weaviate as the vector store. Data never leaves Swiss territory. A confidentiality agreement and a DPA (Data Processing Agreement) are signed before kickoff.',
  },
  {
    question: 'What ROI can I expect from a sales AI agent?',
    answer:
      'On DKDP deployments in 2026, a sales-qualification agent frees up on average 15 hours per week for the sales team, handles 100+ leads per day and improves the conversion rate by 20 to 35% (better scoring, sharper follow-ups, automatic CRM enrichment). ROI is generally reached within 2 to 4 months for an SMB of 5 to 30 people. We deliver a quantified ROI projection during the free initial audit.',
  },
  {
    question: 'How long to deploy a custom AI agent?',
    answer:
      'A Starter agent (1 use case, 1 channel) goes live in 2 weeks. A Pro agent (multi-channel, CRM and business-tool integrations, up to 3 coordinated agents) takes 4 to 6 weeks. More complex projects (RAG agents on large knowledge bases, LangGraph multi-agent orchestration, specific integrations like Bexio, HubSpot, Salesforce) are quoted on request, with a first testable version in 3 to 4 weeks.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AiAgentsPage() {
  return (
    <main>
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'Custom AI agents Geneva & French-speaking Switzerland',
          url: '/en/artificial-intelligence/ai-agents',
          description:
            'Custom autonomous AI agent development for Swiss SMBs: virtual assistants, sales agents, support agents and RAG. Technologies Claude (Anthropic), GPT-5 (OpenAI), LangChain, LangGraph, n8n. Swiss hosting available, compliant with FADP 2023 and the GDPR.',
          serviceType: 'Custom AI agent development',
          priceFrom: 2500,
          priceSpecDescription: "From CHF 2'500 for a Starter agent (1 channel, 2 weeks, turnkey)",
          lang: 'en',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ_ITEMS)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: 'https://dkdp.ch/en' },
          { name: 'Artificial Intelligence', url: 'https://dkdp.ch/en/artificial-intelligence' },
          { name: 'AI agents', url: 'https://dkdp.ch/en/artificial-intelligence/ai-agents' },
        ])}
      />

      {/* ── Hero ── */}
      <HeroBg
        blob1="rgba(212,212,216,0.09)"
        blob2="rgba(124,58,237,0.08)"
        accentRgb="212,212,216"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link href={localizedPath('/intelligence-artificielle', 'en')} className="text-text-muted text-sm hover:text-text transition-colors">
                Artificial Intelligence
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>AI agents</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Custom AI agents Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  A virtual employee that works <GradText as="span">24/7</GradText>. And never complains.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  Your repetitive tasks automated, your customers answered, your data analysed.
                  Designed for SMBs in French-speaking Switzerland, operational in 2 weeks.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <HeroPills
                    accentRgb="212, 212, 216"
                    items={[
                      { label: 'Free audit', Icon: Zap },
                      { label: 'Swiss or EU data', Icon: ShieldCheck },
                      { label: 'Live in 4 weeks', Icon: Clock },
                    ]}
                    className="basis-full"
                  />
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Book a call
                  </LiquidMetalButton>
                  <Link
                    href="#types-agents"
                    className="text-sm text-text-muted hover:text-text transition-colors"
                  >
                    See the agents →
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Offer updated: April 2026</p>
              </div>

              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="AI tools for your intelligent agents">
                  <AppLogoMarquee
            logos={IA_LOGOS}
            durationSeconds={126}
            size="md"
          />
                </div>
                <div
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(212,212,216,0.10)' }}
                >
                  <Image
                    src="/images/services/dkdp-ia-agents-ia.webp"
                    alt="Custom AI agents for SMBs in French-speaking Switzerland"
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
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {[
              { value: '24/7', label: 'Agent availability, no leave and no fatigue errors' },
              { value: '90%', label: 'Of requests handled without human intervention' },
              { value: '2 wks', label: 'For a first operational agent' },
            ].map((s) => (
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


      <LogoBanner lang="en" />
      {/* ── Subnav ── */}
      <ScrollSpyNav
        items={[
          { label: 'How it works', href: '#fonctionnement' },
          { label: 'Technical stack', href: '#stack-technique' },
          { label: 'Types of agents', href: '#types-agents' },
          { label: 'Process', href: '#comment-ca-marche' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: localizedPath('/contact', 'en') }}
        accentColor="#D4D4D8"
        accentBg="rgba(212,212,216,0.10)"
        accentBorder="rgba(212,212,216,0.20)"
      />

      {/* ── How it works ── */}
      <section id="fonctionnement" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">How it works</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                AI agent vs chatbot: why companies are switching to intelligent agents.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                A chatbot follows a fixed script and replies by keywords. A true AI agent reads the full
                context of every situation, makes autonomous decisions and executes concrete actions
                inside your tools. The difference is fundamental for your results.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Understands context, not just keywords',
                  'Makes decisions based on your business rules',
                  'Integrates with your existing tools: CRM, email, API',
                  'Learns from every interaction to improve',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-8 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Three types of agents deployed for our clients
                </p>
                {/* AgentTypesGrid (inlined, translated) */}
                <div className="flex flex-col gap-4">
                  {[
                    {
                      Icon: Users,
                      label: 'Qualification agent',
                      accent: violet,
                      accentBg: 'rgba(167,139,250,0.10)',
                      accentBorder: 'rgba(167,139,250,0.22)',
                      lines: [
                        'Receives and analyses every inbound lead',
                        'Asks the right questions, files in the CRM',
                        'Replies instantly, 24/7',
                      ],
                      tag: 'Live in 2 weeks',
                    },
                    {
                      Icon: MessageSquare,
                      label: 'Customer support agent',
                      accent: green,
                      accentBg: 'rgba(74,222,128,0.08)',
                      accentBorder: 'rgba(74,222,128,0.20)',
                      lines: [
                        'Answers frequent questions without delay',
                        'Available 24/7, without overload',
                        'Escalates complex cases to a human',
                      ],
                      tag: 'Live in 2 weeks',
                    },
                    {
                      Icon: Database,
                      label: 'Data analysis agent',
                      accent: color,
                      accentBg: bg,
                      accentBorder: border,
                      lines: [
                        'Reads your CSV, Excel or database files',
                        'Produces automatic summaries and reports',
                        'Alerts on anomalies or critical trends',
                      ],
                      tag: 'Live in 2 weeks',
                    },
                  ].map((t) => (
                    <div
                      key={t.label}
                      className="rounded-[14px] border p-5"
                      style={{ background: t.accentBg, borderColor: t.accentBorder }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-[8px] flex-shrink-0"
                          style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}` }}
                        >
                          <t.Icon size={16} style={{ color: t.accent }} />
                        </div>
                        <p className="text-text font-semibold text-sm">{t.label}</p>
                      </div>
                      <div className="flex flex-col gap-1.5 mb-3">
                        {t.lines.map((line) => (
                          <div key={line} className="flex items-start gap-2">
                            <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: t.accent }} />
                            <span className="text-text-secondary text-xs leading-relaxed">{line}</span>
                          </div>
                        ))}
                      </div>
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: t.accentBg, color: t.accent, border: `1px solid ${t.accentBorder}` }}
                      >
                        {t.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Technical stack (GEO: named entities for AI citations) ── */}
      <section id="stack-technique" className="py-24 border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Technical stack</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto mb-4">
                The AI technologies we master for your custom agents.
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
                We build your agents with the best building blocks on the 2026 market. The choice depends on your use case, your budget and your sovereignty constraints (FADP, GDPR, Swiss hosting).
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[
              {
                label: 'LLM models',
                accent: violet,
                accentBg: 'rgba(167,139,250,0.08)',
                accentBorder: 'rgba(167,139,250,0.22)',
                items: [
                  { name: 'Claude Opus 4.7 (Anthropic)', desc: 'Long reasoning, document analysis, tool use. The best choice for sensitive business agents.' },
                  { name: 'GPT-5 (OpenAI)', desc: 'Multimodal agents: text, image, voice. Large integration ecosystem.' },
                  { name: 'Gemini 3 (Google)', desc: 'Native Google Workspace integration. Perfect for teams already on Gmail, Drive, Docs.' },
                ],
              },
              {
                label: 'Orchestration',
                accent: color,
                accentBg: bg,
                accentBorder: border,
                items: [
                  { name: 'LangChain', desc: 'The reference framework for chaining LLM calls, tools and memory.' },
                  { name: 'LangGraph', desc: 'Orchestration of complex agents as a graph: routing, validation, escalation.' },
                  { name: 'n8n / Make / Zapier', desc: 'Connects your agents to Bexio, Salesforce, HubSpot, Google Workspace, WhatsApp.' },
                ],
              },
              {
                label: 'Vector stores (RAG)',
                accent: green,
                accentBg: 'rgba(74,222,128,0.06)',
                accentBorder: 'rgba(74,222,128,0.20)',
                items: [
                  { name: 'Pinecone', desc: 'Managed vector DB, high performance, ideal for large knowledge bases.' },
                  { name: 'Weaviate / Qdrant', desc: 'Open-source alternatives, self-hostable in Switzerland for sensitive data.' },
                  { name: 'Cohere & OpenAI embeddings', desc: 'To turn your private documentation into an agent memory.' },
                ],
              },
            ].map((group, i) => (
              <SectionReveal key={group.label} delay={i * 0.08}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-6"
                  style={{ background: group.accentBg, borderColor: group.accentBorder }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-4"
                    style={{ color: group.accent }}
                  >
                    {group.label}
                  </p>
                  <div className="flex flex-col gap-4 flex-1">
                    {group.items.map((item) => (
                      <div key={item.name}>
                        <p className="text-text font-semibold text-sm mb-1">{item.name}</p>
                        <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div
              className="rounded-[16px] p-6 border text-center"
              style={{ background: 'rgba(212,212,216,0.04)', borderColor: border }}
            >
              <p className="text-text-secondary text-sm leading-relaxed max-w-3xl mx-auto">
                For regulated sectors (fiduciary, medical, legal, HR), we also offer <strong className="text-text">Mistral Large 2</strong> and <strong className="text-text">Llama 4</strong> self-hosted on a Swiss server, as well as the sovereign solutions <strong className="text-text">Infomaniak Euria</strong> and <strong className="text-text">Swisscom Swiss AI Assistant</strong>. Your data never leaves the territory. To compare the 3 mainstream models, read our guide{' '}
                <Link href="/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026" className="underline hover:text-text transition-colors">
                  ChatGPT, Claude or Copilot: which one to choose for your SMB
                </Link>
                .
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Types of agents ── */}
      <section id="types-agents" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Our agents</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-2xl mx-auto">
                Our AI agents: sales, support and analysis, connected to your stack.
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto mt-4 text-sm">
                Three proven patterns, deployable in 2 to 6 weeks, powered by Claude Opus 4.7 or GPT-5 depending on your requirements.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Users,
                title: 'Sales agent',
                stack: 'Claude Opus 4.7 + HubSpot + Bexio via n8n',
                accent: violet,
                accentBg: 'rgba(167,139,250,0.08)',
                accentBorder: 'rgba(167,139,250,0.20)',
                pourQui: 'Sales teams and SMBs with inbound leads',
                capabilities: [
                  'Handles 100+ leads per day with no human effort',
                  'Asks the qualification questions from your script',
                  'Enriches HubSpot, Pipedrive or Salesforce automatically',
                ],
                roi: '15 hours freed per week on average',
              },
              {
                Icon: MessageSquare,
                title: 'Customer support agent',
                stack: 'RAG on a Notion or Confluence base, deployed on WhatsApp Business via Twilio',
                accent: green,
                accentBg: 'rgba(74,222,128,0.06)',
                accentBorder: 'rgba(74,222,128,0.18)',
                pourQui: 'E-commerce, SaaS and high-volume services',
                capabilities: [
                  'Cuts ticket volume by 70% on average',
                  'Available 24/7, replies in under 3 seconds',
                  'Escalates complex cases to Zendesk or Intercom',
                ],
                roi: 'CSAT +25 points in 3 months',
              },
              {
                Icon: BarChart3,
                title: 'Analysis and reporting agent',
                stack: 'GPT-5 or Claude Sonnet 4.6, integrated with Slack + Google Workspace',
                accent: color,
                accentBg: bg,
                accentBorder: border,
                pourQui: 'Managers and leadership who steer by data',
                capabilities: [
                  'Reads your CSV, Excel, BigQuery or Airtable',
                  'Produces readable reports posted in Slack',
                  'Alerts on anomalies and critical trends',
                ],
                roi: '3 hours of weekly reporting eliminated',
              },
            ].map((agent, i) => (
              <SectionReveal key={agent.title} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: agent.accentBg, borderColor: agent.accentBorder }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px] mb-5"
                    style={{ background: agent.accentBg, border: `1px solid ${agent.accentBorder}` }}
                  >
                    <agent.Icon size={22} style={{ color: agent.accent }} />
                  </div>
                  <h3 className="text-text font-bold text-lg mb-2">{agent.title}</h3>
                  <p
                    className="text-[10px] font-medium mb-3 leading-snug"
                    style={{ color: agent.accent }}
                  >
                    <span className="uppercase tracking-wider font-bold">Stack: </span>{agent.stack}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-4 text-text-muted">
                    For whom: {agent.pourQui}
                  </p>
                  <div className="flex flex-col gap-2 flex-1 mb-5">
                    {agent.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: agent.accent }} />
                        <span className="text-text-secondary text-sm">{cap}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="pt-4 border-t"
                    style={{ borderColor: agent.accentBorder }}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: agent.accent }}>
                      Estimated ROI
                    </p>
                    <p className="text-text text-sm font-semibold">{agent.roi}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="comment-ca-marche" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Our process</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Developing your AI agent in 4 steps.
              </h2>
            </div>
          </SectionReveal>

          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(212,212,216,0.20) 5%, #c0c0c0 25%, #D4D4D8 50%, #c0c0c0 75%, rgba(212,212,216,0.20) 95%, transparent)',
              }}
            />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  Icon: Wrench,
                  n: '01',
                  title: 'Scope definition',
                  desc: 'Together we identify the priority use case, the input and output data, and the business rules that guide the agent decisions.',
                },
                {
                  Icon: Bot,
                  n: '02',
                  title: 'Build and training',
                  desc: 'Prompt engineering, connection to your existing tools, iterative testing with your real data. The agent learns your context.',
                },
                {
                  Icon: Rocket,
                  n: '03',
                  title: 'Progressive deployment',
                  desc: 'Go live on a real subset, with human validation in parallel. We tune it before scaling to 100% of the volume.',
                },
                {
                  Icon: TrendingUp,
                  n: '04',
                  title: 'Continuous optimisation',
                  desc: 'Performance monitoring, targeted adjustments and a monthly report for 3 months. Your agent improves over time.',
                },
              ].map((step, i) => (
                <SectionReveal key={step.n} delay={i * 0.1}>
                  <div
                    className="relative flex flex-col gap-4 p-7 rounded-[16px] border h-full"
                    style={{ background: `linear-gradient(${bg}, ${bg}), var(--bg)`, borderColor: border }}
                  >
                    <span
                      className="absolute top-4 right-4 text-[11px] font-bold"
                      style={{ color: `${color}60` }}
                    >
                      {step.n}
                    </span>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                      style={{ background: 'rgba(212,212,216,0.08)', border: `1px solid ${border}` }}
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

      {/* ── Pricing ── */}
      <section id="tarifs" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                AI agent pricing for SMBs.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Starter */}
            <SectionReveal delay={0.05}>
              <div
                className="flex flex-col h-full rounded-[20px] border p-8"
                style={{ background: bg, borderColor: border }}
              >
                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color }}>
                    Starter agent
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-text">CHF 2&apos;500</span>
                  </div>
                  <p className="text-text-muted text-xs">Fixed price, turnkey project</p>
                </div>
                <div className="flex flex-col gap-3 flex-1 mb-8">
                  {[
                    '1 custom agent',
                    '1 channel: email or chat',
                    'Delivered in 2 weeks',
                    '1 month of post-deployment follow-up',
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                      <span className="text-text-secondary text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Start with Starter
                </LiquidMetalButton>
              </div>
            </SectionReveal>

            {/* Pro */}
            <SectionReveal delay={0.1}>
              <div
                className="flex flex-col h-full rounded-[20px] border p-8 relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.04) 100%)',
                  borderColor: 'rgba(167,139,250,0.30)',
                  boxShadow: '0 0 50px rgba(167,139,250,0.08)',
                }}
              >
                <span
                  className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(167,139,250,0.15)', color: violet, border: '1px solid rgba(167,139,250,0.30)' }}
                >
                  Recommended
                </span>
                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: violet }}>
                    Pro agent
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-text">CHF 4&apos;900</span>
                  </div>
                  <p className="text-text-muted text-xs">Fixed price, turnkey project</p>
                </div>
                <div className="flex flex-col gap-3 flex-1 mb-8">
                  {[
                    'Up to 3 custom agents',
                    'Multi-channel: email, chat, WhatsApp',
                    'CRM and business-tool integrations',
                    'Delivered in 4 weeks',
                    '3 months of follow-up and monthly reporting',
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: violet }} />
                      <span className="text-text-secondary text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Start with Pro
                </LiquidMetalButton>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <HeroBg blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.08)" accentRgb="212,212,216">
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Testimonials</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Client testimonials: AI agents deployed in Geneva.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionReveal delay={0.05}>
              <div
                className="flex flex-col h-full rounded-[16px] border p-8"
                style={{ background: bg, borderColor: border }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={color} style={{ color }} />
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed mb-6 flex-1">
                  &ldquo;We were receiving 80 to 120 quote requests a week. My team spent two full days
                  sorting and qualifying them. Today the agent filters, replies and files in the CRM in
                  under a minute. We freed up 18 hours a week on a task that had zero added value.&rdquo;
                </p>
                <div>
                  <p className="text-text font-semibold text-sm">Marc-Antoine V.</p>
                  <p className="text-text-muted text-xs">Sales Director, real estate agency, Geneva</p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div
                className="flex flex-col h-full rounded-[16px] border p-8"
                style={{ background: bg, borderColor: border }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={color} style={{ color }} />
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed mb-6 flex-1">
                  &ldquo;Our customer support was under pressure: 200 emails a day, three people
                  overwhelmed. DKDP deployed an agent in two weeks. Today 70% of requests are resolved
                  automatically. Our teams only handle the genuinely complex cases. The satisfaction
                  score rose by 22 points.&rdquo;
                </p>
                <div>
                  <p className="text-text font-semibold text-sm">Sophie B.</p>
                  <p className="text-text-muted text-xs">Head of Customer Success, B2B SaaS, Lausanne</p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ_ITEMS} title="Your questions about AI agents." lang="en" />
      </div>

      {/* ── Other services ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Complete your AI journey
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SectionReveal delay={0.05}>
              <Link
                href={localizedPath('/intelligence-artificielle/automatisation', 'en')}
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(212,212,216,0.04)', borderColor: border }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color }}>
                    Business automation
                  </p>
                  <p className="text-text font-semibold text-sm">Connect your tools without coding</p>
                  <p className="text-text-muted text-xs mt-1">
                    Automated workflows between CRM, email, ERP and your apps.
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color }}
                />
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <Link
                href={localizedPath('/intelligence-artificielle/audit-conseil', 'en')}
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(74,222,128,0.05)', borderColor: 'rgba(74,222,128,0.18)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: green }}>
                    AI audit and consulting
                  </p>
                  <p className="text-text font-semibold text-sm">Identify your top 3 AI priorities</p>
                  <p className="text-text-muted text-xs mt-1">
                    Potential audit, estimated ROI, action plan. No commitment.
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: green }}
                />
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <Link
                href={localizedPath('/formation-entreprise/ia', 'en')}
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(255,107,0,0.06)', borderColor: 'rgba(255,107,0,0.20)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#FF8C00' }}>
                    AI training
                  </p>
                  <p className="text-text font-semibold text-sm">Train your teams in a single day</p>
                  <p className="text-text-muted text-xs mt-1">
                    ChatGPT, Claude, Copilot. Autonomous the very next day.
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: '#FF8C00' }}
                />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <CTAFinal accentRgb="212,212,216" lang="en" />
    </main>
  )
}
