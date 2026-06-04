import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronRight,
  CheckCircle2,
  Database,
  FileSearch,
  MessageSquare,
  Code2,
  Newspaper,
  MailOpen,
  ShieldCheck,
  Layers,
  GitMerge,
  Zap,
  BarChart2,
  Clock,
  GraduationCap,
  Server,
  Cpu,
  ArrowDown,
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
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { chrome, violet as violetToken, green as greenToken } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS } from '@/components/ui/AppLogos'
import { localizedPath } from '@/i18n/slugs'
const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))

export const metadata: Metadata = {
  title: 'AI implementation Geneva & French-speaking Switzerland | ChatGPT Claude | DKDP',
  description: "Custom AI integration for companies and SMEs in Geneva. ChatGPT, Claude, Mistral connected to your existing tools. Fast deployment, without rebuilding everything. Free quote.",
  alternates: {
    canonical: 'https://dkdp.ch/en/artificial-intelligence/implementation',
    languages: {
      'fr-CH': 'https://dkdp.ch/intelligence-artificielle/mise-en-place',
      en: 'https://dkdp.ch/en/artificial-intelligence/implementation',
      'x-default': 'https://dkdp.ch/intelligence-artificielle/mise-en-place',
    },
  },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/mise-en-place-ia.png', width: 1376, height: 768, alt: 'AI implementation for companies in Geneva DKDP' }],
  },
}

// ── Design tokens ──────────────────────────────────────────────
const color  = chrome.color
const bg     = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'
const violet = violetToken.color
const green  = greenToken.color

// ── Inline LLM stack diagram (English) ─────────────────────────
function LLMStackDiagram() {
  const violetColor = violet

  const layers = [
    {
      label: 'Your interface',
      sublabel: 'Website, app, back-office',
      icon: <Server size={15} style={{ color: 'var(--text)' }} />,
      bg: 'var(--surface-default)',
      border: 'var(--surface-border)',
      textColor: 'var(--text)',
    },
    {
      label: 'DKDP orchestration layer',
      sublabel: 'Prompt engineering, memory, tools',
      icon: <Cpu size={15} style={{ color: violetColor }} />,
      bg: 'rgba(167,139,250,0.12)',
      border: 'rgba(167,139,250,0.30)',
      textColor: violetColor,
    },
    {
      label: 'LLM: ChatGPT / Claude / Mistral',
      sublabel: 'Language model in production',
      icon: <Zap size={15} style={{ color: color }} />,
      bg: 'rgba(212,212,216,0.08)',
      border: 'rgba(212,212,216,0.22)',
      textColor: color,
    },
    {
      label: 'Your data',
      sublabel: 'CRM, docs, database',
      icon: <Database size={15} style={{ color: 'var(--text-secondary)' }} />,
      bg: 'var(--surface-default)',
      border: 'var(--surface-border)',
      textColor: 'var(--text-secondary)',
    },
  ]

  return (
    <div className="flex flex-col gap-0 w-full">
      <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
        AI integration architecture
      </p>
      {layers.map((layer, i) => (
        <div key={layer.label}>
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-[10px]"
            style={{ background: layer.bg, border: `1px solid ${layer.border}` }}
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-[6px] flex-shrink-0"
              style={{ background: layer.bg, border: `1px solid ${layer.border}` }}
            >
              {layer.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight" style={{ color: layer.textColor }}>
                {layer.label}
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">{layer.sublabel}</p>
            </div>
          </div>
          {i < layers.length - 1 && (
            <div className="flex justify-center py-1" aria-hidden="true">
              <ArrowDown size={14} className="text-text-muted opacity-40" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Inline FAQ accordion ───────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: 'Is our data safe with an external LLM?',
    answer:
      'Data security is our priority. We work with strict confidentiality agreements and configure the OpenAI/Anthropic APIs in "no training" mode so your data is never used to train the models. For highly sensitive data, we offer an integration with locally hosted models (self-hosted Mistral, LLaMA via Ollama) that never leave your infrastructure.',
  },
  {
    question: 'How do we choose the right LLM for our project?',
    answer:
      'The choice of LLM depends on your use case: GPT-4o excels at complex, multilingual and vision-based tasks. Claude is optimal for long documents, analysis and code. Mistral is the best choice if European GDPR compliance and self-hosting are strong constraints. We always run a comparative benchmark on your real data before validating the final choice.',
  },
  {
    question: 'Can the LLM be hosted on our own servers?',
    answer:
      'Yes. For cases requiring maximum confidentiality or independence from cloud providers, we deploy open-source models (Mistral, LLaMA) on your infrastructure via Ollama or vLLM. Performance is lower than frontier proprietary models, but more than enough for most business cases.',
  },
  {
    question: 'What happens if OpenAI changes its model or pricing?',
    answer:
      'It is a real risk that we anticipate. Our orchestration layer is built with an abstraction that lets you switch LLM provider without changing your application code. We use libraries such as LangChain or LiteLLM that handle this portability. In practice, switching from GPT-4o to Claude only takes a few hours of configuration.',
  },
  {
    question: 'What is the cost of LLM API calls in production?',
    answer:
      'Costs vary depending on volume and model. As a guide: GPT-4o costs around $2.50 per million input tokens. For an internal assistant handling 500 requests per day, the cost is around $30 to $80 per month depending on the length of the exchanges. We set up cost monitoring and optimisations (caching, prompt compression) to keep the production bill under control.',
  },
]

// ── Page ───────────────────────────────────────────────────────
export default function ImplementationPage() {
  return (
    <main>
      <SchemaOrg
        schema={buildService({
          name: 'AI implementation French-speaking Switzerland: ChatGPT Claude LLM integration',
          url: '/en/artificial-intelligence/implementation',
          description:
            'Integration of ChatGPT, Claude and other LLMs into your existing stack. Custom orchestration layer, prompt engineering, connection to your data. Without rebuilding everything.',
          lang: 'en',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ_ITEMS)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Artificial Intelligence', url: '/en/artificial-intelligence' },
          { name: 'AI implementation', url: '/en/artificial-intelligence/implementation' },
        ])}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <HeroBg
        blob1="rgba(212,212,216,0.09)"
        blob2="rgba(124,58,237,0.08)"
        accentRgb="212,212,216"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link
                href={localizedPath('/intelligence-artificielle', 'en')}
                className="text-text-muted text-sm hover:text-text transition-colors"
              >
                Artificial Intelligence
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>AI implementation</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">AI implementation for companies in Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Integrate AI into your existing tools. <GradText as="span">Without breaking anything</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  We integrate ChatGPT, Claude and the best LLMs directly into your existing tools.
                  Deployment tailored to SMEs in French-speaking Switzerland: your codebase stays intact, you gain AI capabilities within a few weeks.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <HeroPills
                    accentRgb="212, 212, 216"
                    items={[
                      { label: 'Free audit', Icon: Zap },
                      { label: 'Production in 4 weeks', Icon: Clock },
                      { label: 'Training included', Icon: GraduationCap },
                    ]}
                    className="basis-full"
                  />
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Book a call
                  </LiquidMetalButton>
                  <Link
                    href="#llms"
                    className="text-sm text-text-muted hover:text-text transition-colors"
                  >
                    See supported LLMs
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Offer updated: April 2026</p>
              </div>

              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="AI tools we deploy at your company">
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
                    src="/images/services/dkdp-ia-mise-en-place.webp"
                    alt="Custom LLM integration and AI implementation in Geneva"
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





      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {[
              { value: '3', label: 'LLMs supported in production', sub: 'ChatGPT, Claude, Mistral' },
              { value: '4 wks', label: 'Average integration time', sub: 'From kickoff to production' },
              { value: '0', label: 'Stack rebuilds', sub: 'Your existing code is preserved' },
            ].map((s) => (
              <SectionReveal key={s.label}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1 text-text">{s.value}</p>
                  <p className="text-text text-sm font-semibold">{s.label}</p>
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
          { label: 'Why it is complex', href: '#complexite' },
          { label: 'Language models', href: '#llms' },
          { label: 'Applications', href: '#applications' },
          { label: 'Our method', href: '#methode' },
          { label: 'Pricing', href: '#tarifs' },
        ]}
        cta={{ label: 'Get in touch', href: localizedPath('/contact', 'en') }}
        accentColor="#D4D4D8"
        accentBg="rgba(212,212,216,0.10)"
        accentBorder="rgba(212,212,216,0.20)"
      />

      {/* ── The problem ───────────────────────────────────────── */}
      <section id="complexite" className="py-24 bg-bg-card border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Why it is complex</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Why deploying AI requires custom integration.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Generic ChatGPT does not know your internal procedures, your clients, or your business constraints.
                For an LLM to be useful in your company, it needs to be grounded in your context: your data, your tools, your processes.
                This is precisely the engineering that DKDP delivers.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Connecting an LLM to your stack without a solid architecture produces inaccurate answers, confidentiality issues and uncontrolled API costs.
                We build the orchestration layer that makes the integration reliable and maintainable.
              </p>
              <div className="space-y-3">
                {[
                  'Access to your proprietary data and internal documents',
                  'Business context maintained throughout the conversation',
                  'Security and confidentiality of sensitive data',
                  'Production reliability: monitoring, alerts, fallbacks',
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
                <LLMStackDiagram />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Use cases ──────────────────────────────────────────── */}
      <HeroBg className="bg-bg-card border-y border-border" accentRgb="212,212,216" blob1="rgba(212,212,216,0.08)" blob2="rgba(124,58,237,0.06)">
      <section id="applications" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Concrete applications</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Concrete applications of AI in business.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                Icon: MessageSquare,
                title: 'Internal assistant',
                desc: 'A chatbot that answers from your docs, internal procedures and knowledge base. Your teams find information in seconds, not minutes.',
                tag: 'high demand',
                tagColor: violet,
              },
              {
                Icon: MailOpen,
                title: 'Content generation',
                desc: 'Emails, reports, product sheets generated from your templates and data. Consistent tone guaranteed, production time divided by 5.',
                tag: null,
                tagColor: '',
              },
              {
                Icon: FileSearch,
                title: 'Document analysis',
                desc: 'Automatic reading of PDFs, contracts, invoices. Extraction of key data and structured summary in a few seconds per document.',
                tag: null,
                tagColor: '',
              },
              {
                Icon: ShieldCheck,
                title: 'Augmented customer support',
                desc: 'Smart FAQ connected to your CRM and customer history. Automatic resolution of common requests, intelligent escalation of complex cases.',
                tag: null,
                tagColor: '',
              },
              {
                Icon: Code2,
                title: 'Code and automation',
                desc: 'Script generator, developer assistance, automated code review. Technical productivity multiplied without hiring.',
                tag: null,
                tagColor: '',
              },
              {
                Icon: Newspaper,
                title: 'Monitoring and summarising',
                desc: 'Automatic summaries of industry news, market reports, competitive alerts. Stay informed without spending hours reading.',
                tag: null,
                tagColor: '',
              },
            ].map((uc, i) => (
              <SectionReveal key={uc.title} delay={i * 0.07}>
                <div
                  className="relative flex flex-col h-full rounded-[14px] border p-6"
                  style={{ background: bg, borderColor: border }}
                >
                  {uc.tag && (
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: 'rgba(167,139,250,0.15)', color: uc.tagColor, border: `1px solid rgba(167,139,250,0.30)` }}
                    >
                      {uc.tag}
                    </span>
                  )}
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-[9px] mb-4 flex-shrink-0"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <uc.Icon size={20} style={{ color }} />
                  </div>
                  <h3 className="text-text font-bold text-base mb-2">{uc.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{uc.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      </HeroBg>

      {/* ── LLMs ──────────────────────────────────────────────── */}
      <section id="llms" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Language models</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                The language models we deploy for SMEs.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* OpenAI GPT-4o */}
            <SectionReveal delay={0}>
              <div
                className="flex flex-col h-full rounded-[16px] border p-7"
                style={{ background: bg, borderColor: border }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[9px] font-bold text-sm flex-shrink-0"
                    style={{ background: 'rgba(16,163,127,0.15)', border: '1px solid rgba(16,163,127,0.30)', color: '#10a37f' }}
                  >
                    GPT
                  </div>
                  <div>
                    <p className="text-text font-bold text-base leading-tight">OpenAI GPT-4o</p>
                    <p className="text-[11px] text-text-muted">OpenAI</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  The most versatile model. Ideal for complex tasks, multilingual work and image analysis.
                  Best overall performance across varied business cases.
                </p>
                <div className="mt-auto space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color }}>Strengths</p>
                  {['Complex tasks and reasoning', 'Native multilingual (FR/DE/IT/EN)', 'Vision: image and PDF analysis', 'Very large plugin ecosystem'].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <CheckCircle2 size={12} style={{ color: '#10a37f' }} />
                      <span className="text-text-muted text-[12px]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Anthropic Claude */}
            <SectionReveal delay={0.08}>
              <div
                className="flex flex-col h-full rounded-[16px] border p-7 relative"
                style={{
                  background: 'rgba(167,139,250,0.06)',
                  borderColor: 'rgba(167,139,250,0.28)',
                  boxShadow: '0 0 40px rgba(167,139,250,0.06)',
                }}
              >
                <span
                  className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                  style={{ background: 'rgba(167,139,250,0.15)', color: violet, border: '1px solid rgba(167,139,250,0.30)' }}
                >
                  Recommended
                </span>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[9px] font-bold text-sm flex-shrink-0"
                    style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.30)', color: violet }}
                  >
                    CL
                  </div>
                  <div>
                    <p className="text-text font-bold text-base leading-tight">Anthropic Claude</p>
                    <p className="text-[11px] text-text-muted">Anthropic</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  Excellence on long documents, in-depth analysis and code. Very large context window.
                  Constitutional architecture for safer answers.
                </p>
                <div className="mt-auto space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: violet }}>Strengths</p>
                  {['Long documents (200k tokens)', 'Contract and report analysis', 'Code generation and review', 'Complex, nuanced instructions'].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <CheckCircle2 size={12} style={{ color: violet }} />
                      <span className="text-text-muted text-[12px]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Mistral */}
            <SectionReveal delay={0.16}>
              <div
                className="flex flex-col h-full rounded-[16px] border p-7"
                style={{ background: bg, borderColor: border }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[9px] font-bold text-sm flex-shrink-0"
                    style={{ background: 'rgba(255,120,50,0.15)', border: '1px solid rgba(255,120,50,0.30)', color: '#ff7832' }}
                  >
                    MI
                  </div>
                  <div>
                    <p className="text-text font-bold text-base leading-tight">Mistral</p>
                    <p className="text-[11px] text-text-muted">Mistral AI (France)</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  European model, GDPR-friendly. Can be self-hosted on your infrastructure for maximum confidentiality.
                  Excellent performance-to-cost ratio.
                </p>
                <div className="mt-auto space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color }}>Strengths</p>
                  {['European GDPR-compliant', 'Self-hosting possible', 'Lower costs than US models', 'Very good on French and German'].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <CheckCircle2 size={12} style={{ color: '#ff7832' }} />
                      <span className="text-text-muted text-[12px]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────── */}
      <HeroBg accentRgb="212,212,216" blob1="rgba(212,212,216,0.08)" blob2="rgba(124,58,237,0.06)">
      <section id="methode" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Our method</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Our AI integration method in 4 steps.
              </h2>
            </div>
          </SectionReveal>

          <div className="relative">
            {/* Connector line chrome metal */}
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
                  Icon: Layers,
                  n: '01',
                  title: 'Technical audit',
                  desc: 'We analyse your stack, your available data, your security constraints and your priority use cases. Deliverable: integration roadmap.',
                },
                {
                  Icon: GitMerge,
                  n: '02',
                  title: 'Architecture',
                  desc: 'Choice of the right LLM, design of the orchestration layer, prompting and context-management strategy. Not a line of code before validation.',
                },
                {
                  Icon: Code2,
                  n: '03',
                  title: 'Development and testing',
                  desc: 'API integration, context and memory management, reliability tests on your real data. Fast iterations until the target quality.',
                },
                {
                  Icon: BarChart2,
                  n: '04',
                  title: 'Deployment and monitoring',
                  desc: 'Go live, alerts on errors and API costs, performance dashboard. Continuous optimisation of the prompt and the model.',
                },
              ].map((step, i) => (
                <SectionReveal key={step.n} delay={i * 0.1}>
                  <div
                    className="relative flex flex-col gap-4 p-7 bg-bg rounded-[16px] border border-border h-full"
                  >
                    <span
                      className="absolute top-4 right-4 text-[11px] font-bold"
                      style={{ color: `${color}60` }}
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

      {/* ── Pricing ───────────────────────────────────────────── */}
      <section id="tarifs" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                AI integration pricing for companies.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                A free discovery call to identify the package suited to your project.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Standard */}
            <SectionReveal delay={0}>
              <div
                className="flex flex-col h-full rounded-[20px] border p-8"
                style={{ background: bg, borderColor: border }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color }}>
                  Standard Integration
                </p>
                <p className="text-4xl font-bold text-text mb-1">
                  CHF 3&apos;500
                </p>
                <p className="text-text-muted text-sm mb-6">one-time payment</p>
                <div className="space-y-3 flex-1 mb-8">
                  {[
                    '1 LLM integrated (GPT-4o, Claude or Mistral)',
                    '1 target use case',
                    'Connection to 1 data source',
                    'Prompt engineering and testing',
                    'Delivery within 3 weeks',
                    'Technical documentation',
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                      <span className="text-text-secondary text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <LiquidMetalButton href={`${localizedPath('/contact', 'en')}?service=artificial-intelligence`} size="lg">
                  Request a quote
                </LiquidMetalButton>
              </div>
            </SectionReveal>

            {/* Advanced */}
            <SectionReveal delay={0.1}>
              <div
                className="flex flex-col h-full rounded-[20px] border p-8 relative"
                style={{
                  background: 'rgba(167,139,250,0.06)',
                  borderColor: 'rgba(167,139,250,0.30)',
                  boxShadow: '0 0 50px rgba(167,139,250,0.08)',
                }}
              >
                <span
                  className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(167,139,250,0.15)', color: violet, border: '1px solid rgba(167,139,250,0.30)' }}
                >
                  Recommended
                </span>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: violet }}>
                  Advanced Integration
                </p>
                <p className="text-4xl font-bold text-text mb-1">
                  CHF 6&apos;500
                </p>
                <p className="text-text-muted text-sm mb-6">one-time payment</p>
                <div className="space-y-3 flex-1 mb-8">
                  {[
                    'Multi-LLM possible (smart routing)',
                    'Up to 3 use cases',
                    'Multiple sources (CRM, docs, API)',
                    'RAG: retrieval-augmented generation',
                    'Delivery in 5 to 6 weeks',
                    'Monitoring and alerts, 3 months included',
                    'Documentation and team training',
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: violet }} />
                      <span className="text-text-secondary text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Book a call
                </LiquidMetalButton>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <HeroBg blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.08)" accentRgb="212,212,216">
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">They trust us</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                What they say about their AI integration.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                quote:
                  'We were afraid of having to rebuild everything to integrate AI. DKDP connected Claude to our document base in 3 weeks. Our teams save 2 hours a day on information retrieval.',
                author: 'Operations Manager',
                company: 'Consulting firm, Geneva',
                initial: 'OM',
              },
              {
                quote:
                  'Prompt engineering makes all the difference. Before, our internal tests gave generic answers. With the DKDP orchestration layer, the model knows our business and our clients. The results are incomparable.',
                author: 'CTO',
                company: 'B2B SaaS scale-up, Lausanne',
                initial: 'CT',
              },
            ].map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-1 mb-5" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} width="14" height="14" viewBox="0 0 14 14" fill="#A78BFA" aria-hidden="true">
                        <path d="M7 1l1.55 3.14L12 4.6l-2.5 2.44.59 3.44L7 8.77l-3.09 1.71.59-3.44L2 4.6l3.45-.46L7 1z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold flex-shrink-0"
                      style={{ background: 'rgba(167,139,250,0.15)', color: violet, border: `1px solid rgba(167,139,250,0.25)` }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-text text-sm font-semibold">{t.author}</p>
                      <p className="text-text-muted text-xs">{t.company}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <FAQSection items={FAQ_ITEMS} title="Your questions about LLM integration." lang="en" />

      {/* ── Bridge ────────────────────────────────────────────── */}
      <section className="py-16 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Complete your AI journey
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SectionReveal delay={0.05}>
              <Link
                href={localizedPath('/intelligence-artificielle/agents-ia', 'en')}
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(167,139,250,0.07)', borderColor: 'rgba(167,139,250,0.22)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: violet }}>AI agents</p>
                  <p className="text-text font-semibold">Custom AI agents</p>
                  <p className="text-text-muted text-xs mt-1">Automate your repetitive tasks with intelligent agents.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: violet }} />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.10}>
              <Link
                href={localizedPath('/intelligence-artificielle/automatisation', 'en')}
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(212,212,216,0.05)', borderColor: 'rgba(212,212,216,0.15)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color }}>Automation</p>
                  <p className="text-text font-semibold">Business automation</p>
                  <p className="text-text-muted text-xs mt-1">No-code workflows that connect your existing tools.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color }} />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <Link
                href={localizedPath('/intelligence-artificielle/audit-conseil', 'en')}
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(74,222,128,0.05)', borderColor: 'rgba(74,222,128,0.18)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: green }}>Audit and consulting</p>
                  <p className="text-text font-semibold">AI audit and consulting</p>
                  <p className="text-text-muted text-xs mt-1">Identify the 3 high-ROI actions in your company.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: green }} />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── CTA Final ─────────────────────────────────────────── */}
      <CTAFinal accentRgb="212,212,216" lang="en" />
    </main>
  )
}
