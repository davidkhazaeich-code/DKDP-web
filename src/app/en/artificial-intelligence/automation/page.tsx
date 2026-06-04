import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Database,
  Mail,
  LayoutGrid,
  Receipt,
  ShoppingCart,
  BarChart2,
  Zap,
  GitMerge,
  Users,
  MapPin,
  Bot,
  BrainCircuit,
  GraduationCap,
  Star,
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

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Business Automation n8n, Make, Zapier for Swiss SMBs | DKDP',
  description:
    'Automate your business processes with n8n, Make, Zapier. Native Bexio, Abacus, Google Workspace, Slack, HubSpot integrations. Save 10 hrs/week. SMBs in Geneva and French-speaking Switzerland. Quote in 48 h.',
  alternates: {
    canonical: 'https://dkdp.ch/en/artificial-intelligence/automation',
    languages: {
      'fr-CH': 'https://dkdp.ch/intelligence-artificielle/automatisation',
      en: 'https://dkdp.ch/en/artificial-intelligence/automation',
      'x-default': 'https://dkdp.ch/intelligence-artificielle/automatisation',
    },
  },
  openGraph: {
    url: 'https://dkdp.ch/en/artificial-intelligence/automation',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/automatisation-ia.png', width: 1376, height: 768, alt: 'Business automation n8n, Make, Zapier for Swiss SMBs by DKDP' }],
  },
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const color  = chrome.color
const bg     = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'
const violet = violetToken.color
const green  = greenToken.color

// ─── Inline workflow diagram (EN) ──────────────────────────────────────────────
function WorkflowDiagram() {
  const beforeSteps = [
    'Email received',
    'Copy-paste the data',
    'Manual CRM entry',
    'Manual follow-up',
    'Excel report',
  ]
  const afterSteps = [
    'Automatic trigger',
    'Data extracted by AI',
    'CRM updated',
    'Follow-up scheduled',
    'Report generated',
  ]
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-center" style={{ color: 'var(--red-text)' }}>
          Before
        </p>
        <div className="flex flex-col gap-2">
          {beforeSteps.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-[6px]"
              style={{ background: 'var(--red-bg)', border: '1px solid var(--red-border)' }}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                style={{ background: 'var(--red-border)', color: 'var(--red-text)' }}
              >
                {i + 1}
              </span>
              <span className="text-text-muted text-[11px]">{s}</span>
            </div>
          ))}
          <p className="text-[10px] text-center mt-2 font-semibold" style={{ color: 'var(--red-text)' }}>3h / task</p>
        </div>
      </div>
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-3 text-center"
          style={{ color: 'var(--green-text)' }}
        >
          After AI
        </p>
        <div className="flex flex-col gap-2">
          {afterSteps.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-[6px]"
              style={{ background: 'var(--green-bg)', border: '1px solid var(--green-border)' }}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                style={{ background: 'var(--green-border)', color: 'var(--green-text)' }}
              >
                {i + 1}
              </span>
              <span className="text-text-secondary text-[11px]">{s}</span>
            </div>
          ))}
          <p
            className="text-[10px] text-center mt-2 font-semibold"
            style={{ color: 'var(--green-text)' }}
          >
            4 min / task
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const TOOL_CATEGORIES = [
  {
    Icon: Database,
    title: 'CRM',
    tools: 'HubSpot, Salesforce, Pipedrive',
  },
  {
    Icon: Mail,
    title: 'Email and communication',
    tools: 'Gmail, Outlook, Slack',
  },
  {
    Icon: LayoutGrid,
    title: 'Project management',
    tools: 'Notion, Asana, Monday.com',
  },
  {
    Icon: Receipt,
    title: 'Invoicing and ERP',
    tools: 'Abacus, Bexio, SAP',
  },
  {
    Icon: ShoppingCart,
    title: 'E-commerce',
    tools: 'WooCommerce, Shopify',
  },
  {
    Icon: BarChart2,
    title: 'Data and reporting',
    tools: 'Google Sheets, Excel, Power BI',
  },
]

const PROCESS_STEPS = [
  {
    Icon: MapPin,
    n: '01',
    title: 'Mapping',
    desc: 'We identify your manual processes and their real cost in time. A 1-hour workshop with your team: a concrete outcome, a prioritised list.',
  },
  {
    Icon: Zap,
    n: '02',
    title: 'Prototype',
    desc: 'First automated workflow delivered in 2 weeks. Testable in real conditions, editable before final sign-off.',
  },
  {
    Icon: GitMerge,
    n: '03',
    title: 'Integration',
    desc: 'Connection to your existing tools. Zero disruption to your current processes, zero rebuild of your stack.',
  },
  {
    Icon: Users,
    n: '04',
    title: 'Training and autonomy',
    desc: 'Your teams take the controls. We provide follow-up for 3 months to optimise and adjust based on your feedback.',
  },
]

const FAQ = [
  {
    question: 'Do you need technical skills to use the workflows?',
    answer:
      'No. The workflows are designed to be run by your teams without any development skills. We train you so you can view them, trigger them manually if needed, and understand what is happening. Any technical change stays on our side.',
  },
  {
    question: 'Which tools can you connect?',
    answer:
      'We connect almost every cloud tool on the market: CRM (HubSpot, Salesforce, Pipedrive), email (Gmail, Outlook), project management (Notion, Asana, Monday), invoicing (Abacus, Bexio), e-commerce (Shopify, WooCommerce), and reporting (Google Sheets, Power BI). If your tool has an API, we can integrate it.',
  },
  {
    question: 'What happens if a tool changes or updates its API?',
    answer:
      'It is covered by the post-delivery follow-up. During the first 3 months, any interruption linked to an API or configuration change is handled at no extra cost. Beyond that, we offer monthly maintenance to guarantee the continuity of your automations.',
  },
  {
    question: 'Can you automate complex business processes?',
    answer:
      'Yes. Modern no-code workflows handle advanced conditional logic, multiple branches, calls to AI models for decision-making, and real-time integrations. We have automated lead qualification processes across 12 criteria, multi-currency invoicing pipelines, and complete client onboardings.',
  },
  {
    question: 'How is this different from a developer coding an integration?',
    answer:
      'A coded integration is more rigid and more expensive to maintain. If your CRM changes version or you adopt a new tool, refactoring code takes time and money. No-code workflows are modular, visually readable, and editable in minutes. They cover 95% of SMB automation needs.',
  },
  {
    question: 'n8n or Make: which one should I choose for my SMB?',
    answer:
      'n8n if your data is sensitive (fiduciary, medical, legal, HR), if you want a self-hosted deployment in Switzerland, or if you anticipate high volumes. Make (formerly Integromat) if you want the best price/flexibility ratio and complex visual workflows without managing infrastructure. Zapier is still relevant for a quick start with standard integrations. We always recommend the simplest option that covers your use case, with an exit door in case of growth.',
  },
  {
    question: 'Can n8n be hosted in Switzerland?',
    answer:
      'Yes. n8n is open-source and self-hosts on an Infomaniak VPS (Switzerland), Exoscale (Switzerland) or on your own on-premise infrastructure. It is the only major automation platform that offers this option. Your data never leaves the country, and you are FADP 2023 compliant by default. Hosting cost: roughly CHF 20 to 80 per month depending on volume. We handle the setup, updates and backups.',
  },
  {
    question: 'What does an n8n automation cost?',
    answer:
      "A first workflow delivered in 2 weeks starts at CHF 1'500 (fixed, turnkey price). A multi-step automation with business integrations (Bexio, HubSpot, Salesforce) lands between CHF 3'000 and 6'000. For complex projects (AI agent orchestration, RAG on documentation, multi-currency invoicing) we quote per project. Monthly maintenance, optional after the 3 included months, starts at CHF 250/month.",
  },
  {
    question: 'Does my data stay confidential?',
    answer:
      'Yes. On a self-hosted Swiss n8n deployment, your data never leaves your server. On Make and Zapier (EU cloud), data transits but is not used to train third-party models. We systematically sign a DPA (Data Processing Agreement) and a confidentiality agreement before kick-off. Credentials (API tokens) are stored encrypted and rotated.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'Before, my assistant spent two hours every morning entering orders into our ERP. Today it is instant and error-free. We recovered 40 hours a month on a single task.',
    author: 'Operations Manager, distribution company',
    location: 'Geneva',
  },
  {
    quote:
      'The automatic follow-up workflow transformed our collection rate. We no longer lose invoices in inboxes. DKDP set everything up in three weeks, without touching our Bexio.',
    author: 'Finance Director, industrial SMB',
    location: 'Vaud',
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AutomationPage() {
  return (
    <main>
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'Business automation n8n, Make, Zapier in French-speaking Switzerland',
          url: '/en/artificial-intelligence/automation',
          description:
            'Business process automation via n8n (self-hosted or cloud), Make and Zapier. Connects Bexio, Abacus, HubSpot, Salesforce, Google Workspace, Slack, WhatsApp Business, Stripe. FADP 2023 compliant, Swiss hosting available.',
          serviceType: 'Business process automation',
          priceFrom: 1500,
          priceSpecDescription: "From CHF 1'500 for a first automated workflow delivered in 2 weeks",
          lang: 'en',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: 'https://dkdp.ch/en' },
          { name: 'Artificial Intelligence', url: 'https://dkdp.ch/en/artificial-intelligence' },
          { name: 'Business automation', url: 'https://dkdp.ch/en/artificial-intelligence/automation' },
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
              <Link
                href={localizedPath('/intelligence-artificielle', 'en')}
                className="text-text-muted text-sm hover:text-text transition-colors"
              >
                Artificial Intelligence
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Business automation</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">n8n, Make and Zapier automation for SMBs in Geneva and French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  What takes you <GradText as="span">3 hours a day</GradText>, automated in <GradText as="span">2 weeks</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  We connect your CRM, your emails and your ERP with AI workflows on <strong className="text-text">n8n</strong> (self-hostable in Switzerland), <strong className="text-text">Make</strong> or <strong className="text-text">Zapier</strong>. Native integrations with Bexio, Abacus, HubSpot, Google Workspace, Slack, WhatsApp Business, Stripe. For SMBs in French-speaking Switzerland that want to save 10 hours a week without touching a line of code.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <HeroPills
                    accentRgb="212, 212, 216"
                    items={[
                      { label: 'Free audit', Icon: Zap },
                      { label: 'Workflow in 4 weeks', Icon: Clock },
                      { label: 'No commitment', Icon: CheckCircle2 },
                    ]}
                    className="basis-full"
                  />
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Book a free call
                  </LiquidMetalButton>
                  <Link
                    href="#comment-ca-marche"
                    className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
                  >
                    How it works <ArrowRight size={13} />
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Offer updated: April 2026</p>
              </div>

              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="AI tools we integrate into your automations">
                  <AppLogoMarquee
            logos={IA_LOGOS}
            durationSeconds={135}
            size="md"
          />
                </div>
                <div
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(212,212,216,0.10)' }}
                >
                  <Image
                    src="/images/services/dkdp-ia-automatisation.webp"
                    alt="Business automation AI for SMBs in French-speaking Switzerland"
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





      {/* ── Stats bar ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {[
              { value: '70%', label: 'Repetitive tasks automatable on average' },
              { value: '2 wks', label: 'For a first workflow in production' },
              { value: '0 lines', label: 'Of code required from your teams' },
            ].map((s) => (
              <SectionReveal key={s.label}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color }}>{s.value}</p>
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
          { label: 'Why automate', href: '#pourquoi' },
          { label: 'n8n Switzerland', href: '#n8n-suisse' },
          { label: 'Tools & integrations', href: '#outils' },
          { label: 'Process', href: '#comment-ca-marche' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: localizedPath('/contact', 'en') }}
        accentColor="#D4D4D8"
        accentBg="rgba(212,212,216,0.10)"
        accentBorder="rgba(212,212,216,0.20)"
      />

      {/* ── Why automate ── */}
      <section id="pourquoi" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Why automate</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Why automate the repetitive tasks in your SMB
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                SMBs lose on average 5 hours per week per employee on tasks that shuffle data between tools. This is not an organisation problem: it is a connection problem between systems. Read our article: <Link href={localizedPath('/blog/automatiser-taches-repetitives-ia-pme', 'en')} className="underline hover:text-text transition-colors">automating repetitive tasks with AI in your SMB</Link>.
              </p>
              <div className="space-y-3">
                {[
                  'Manual entry between disconnected tools',
                  'Forgotten client and supplier follow-ups',
                  'Costly human errors during data transfers',
                  'Manual reporting that takes hours every week',
                ].map((pain, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{pain}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-8 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
              >
                <p
                  className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center"
                  style={{ color }}
                >
                  Before vs After automation
                </p>
                <WorkflowDiagram />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Connected tools ── */}
      {/* ── Why n8n Switzerland (GEO + FADP angle) ── */}
      <section id="n8n-suisse" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">n8n Switzerland</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Why n8n is the benchmark for SMB automation in Switzerland.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                <strong className="text-text">n8n is the only automation platform that can be self-hosted on a Swiss server</strong>. Your data never leaves the country. Critical for <strong className="text-text">FADP 2023</strong> compliance and for regulated sectors: fiduciary, medical, legal, HR, private banks, insurance.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                We deploy n8n (self-hosted at Infomaniak or managed cloud), Make (formerly Integromat) and Zapier depending on your use case and your budget.
              </p>
              <div className="space-y-3">
                {[
                  { k: 'n8n self-hosted', v: 'Sensitive data, high volumes, custom AI agents, bespoke without limits.' },
                  { k: 'Make (formerly Integromat)', v: 'Complex visual workflows, multiple branches, unbeatable price/flexibility ratio.' },
                  { k: 'Zapier', v: 'Quick start, standard integrations, non-technical teams that run them without lengthy training.' },
                ].map((row) => (
                  <div key={row.k} className="flex gap-3">
                    <CheckCircle2 size={14} className="mt-1 flex-shrink-0" style={{ color }} />
                    <p className="text-sm text-text-secondary"><strong className="text-text">{row.k}:</strong> {row.v}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
                  Native Swiss integrations
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { cat: 'ERP & accounting', names: 'Bexio, Abacus, Sage, Crésus' },
                    { cat: 'Workspace', names: 'Google Workspace, Microsoft 365' },
                    { cat: 'Messaging', names: 'Slack, Teams, WhatsApp Business' },
                    { cat: 'CRM', names: 'HubSpot, Pipedrive, Salesforce, Zoho' },
                    { cat: 'Payments', names: 'Stripe, Twint (webhook), PostFinance' },
                    { cat: 'Data', names: 'Airtable, Notion, Google Sheets' },
                  ].map((row) => (
                    <div
                      key={row.cat}
                      className="p-3 rounded-[10px] border"
                      style={{ background: 'rgba(212,212,216,0.04)', borderColor: border }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color }}>
                        {row.cat}
                      </p>
                      <p className="text-text-secondary text-xs leading-relaxed">{row.names}</p>
                    </div>
                  ))}
                </div>
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Does your business tool have an API? We connect it.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section id="outils" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Connected tools</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                AI integrations: CRM, ERP and connected tools without migration
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                We connect what you already have. No need to change tools, no migration, no full retraining. Your teams keep working as before, without the friction.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOL_CATEGORIES.map((cat, i) => (
              <SectionReveal key={cat.title} delay={i * 0.08}>
                <div
                  className="flex flex-col gap-4 p-6 rounded-[16px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-[10px]"
                    style={{ background: 'rgba(212,212,216,0.10)', border: `1px solid ${border}` }}
                  >
                    <cat.Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="text-text font-semibold text-base mb-1">{cat.title}</h3>
                    <p className="text-text-muted text-sm">{cat.tools}</p>
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
              <GradTag className="mb-4">Our method</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Our method: from audit to automation in 2 weeks
              </h2>
            </div>
          </SectionReveal>

          <div className="relative">
            {/* Connector line, desktop only */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(212,212,216,0.20) 5%, #c0c0c0 25%, #D4D4D8 50%, #c0c0c0 75%, rgba(212,212,216,0.20) 95%, transparent)',
              }}
            />

            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((step, i) => (
                <SectionReveal key={step.n} delay={i * 0.1}>
                  <div className="relative flex flex-col gap-4 p-7 bg-bg rounded-[16px] border border-border h-full">
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

      {/* ── Pricing ── */}
      <section id="tarifs" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                AI automation pricing for SMBs
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                Every project is scoped and signed off before kick-off. You know exactly what you get and when.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                label: 'Starter',
                price: "CHF 1'500",
                sub: 'One-time payment',
                highlight: false,
                features: [
                  '1 automated workflow',
                  '2 connected tools',
                  'Delivery in 2 weeks',
                  '1 month of post-delivery follow-up',
                  'Usage training included',
                ],
                cta: 'Start with Starter',
              },
              {
                label: 'Business',
                price: "CHF 3'500",
                sub: 'The most complete',
                highlight: true,
                features: [
                  'Up to 5 workflows',
                  'Unlimited connected tools',
                  'Delivery in 4 weeks',
                  '3 months of post-delivery follow-up',
                  'Full team training',
                  'Monthly performance report',
                ],
                cta: 'Start with Business',
              },
            ].map((offer, i) => (
              <SectionReveal key={offer.label} delay={i * 0.1}>
                <div
                  className="relative flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{
                    borderColor: offer.highlight ? violet : border,
                    boxShadow: offer.highlight ? '0 0 40px rgba(124,58,237,0.15)' : 'none',
                  }}
                >
                  {offer.highlight && (
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: violet }}
                    />
                  )}
                  <div
                    className="p-7 flex flex-col flex-1"
                    style={{ background: offer.highlight ? 'rgba(124,58,237,0.08)' : 'transparent' }}
                  >
                    {offer.highlight && (
                      <span
                        className="inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                        style={{
                          background: 'rgba(124,58,237,0.15)',
                          color: violet,
                          border: '1px solid rgba(124,58,237,0.30)',
                        }}
                      >
                        The most complete
                      </span>
                    )}
                    <p className="text-text font-bold text-xl mb-1">{offer.label}</p>
                    <p
                      className="text-2xl font-bold mb-1"
                      style={{ color: offer.highlight ? violet : color }}
                    >
                      {offer.price}
                    </p>
                    <p className="text-text-muted text-xs mb-6">{offer.sub}</p>
                    <div className="space-y-2.5 flex-1">
                      {offer.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <CheckCircle2
                            size={14}
                            className="mt-0.5 flex-shrink-0"
                            style={{ color: offer.highlight ? violet : color }}
                          />
                          <span className="text-text-secondary text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`${localizedPath('/contact', 'en')}?service=intelligence-artificielle`}
                      className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all hover:opacity-80"
                      style={{
                        background: offer.highlight ? violet : bg,
                        color: offer.highlight ? '#000' : color,
                        border: `1px solid ${offer.highlight ? 'transparent' : border}`,
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

      {/* ── Testimonials ── */}
      <HeroBg blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.08)" accentRgb="212,212,216">
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Testimonials</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Testimonials: SMBs that automated with DKDP
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={14} fill={color} style={{ color }} />
                    ))}
                  </div>
                  <blockquote className="text-text-secondary leading-relaxed text-sm flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="text-text text-sm font-semibold">{t.author}</p>
                    <p className="text-text-muted text-xs mt-0.5">{t.location}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection
          items={FAQ}
          title="Your questions about business automation"
          lang="en"
        />
      </div>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Going further with AI
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SectionReveal delay={0.05}>
              <Link
                href={localizedPath('/intelligence-artificielle/agents-ia', 'en')}
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(212,212,216,0.05)', borderColor: border }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[9px] flex-shrink-0"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <Bot size={18} style={{ color }} />
                  </div>
                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color }}
                    >
                      AI service
                    </p>
                    <p className="text-text font-semibold text-sm">Custom AI agents</p>
                    <p className="text-text-muted text-xs mt-0.5">
                      Agents that think and act for you.
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color }}
                />
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <Link
                href={localizedPath('/intelligence-artificielle/audit-conseil', 'en')}
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(212,212,216,0.05)', borderColor: border }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[9px] flex-shrink-0"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <BrainCircuit size={18} style={{ color }} />
                  </div>
                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color }}
                    >
                      AI service
                    </p>
                    <p className="text-text font-semibold text-sm">AI Audit and Consulting</p>
                    <p className="text-text-muted text-xs mt-0.5">
                      Identify your 3 high-ROI actions.
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color }}
                />
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <Link
                href={localizedPath('/formation-entreprise/ia', 'en')}
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{
                  background: 'rgba(255,107,0,0.06)',
                  borderColor: 'rgba(255,107,0,0.22)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[9px] flex-shrink-0"
                    style={{
                      background: 'rgba(255,107,0,0.10)',
                      border: '1px solid rgba(255,107,0,0.22)',
                    }}
                  >
                    <GraduationCap size={18} style={{ color: '#FF8C00' }} />
                  </div>
                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: '#FF8C00' }}
                    >
                      Training
                    </p>
                    <p className="text-text font-semibold text-sm">Corporate AI training</p>
                    <p className="text-text-muted text-xs mt-0.5">
                      Your teams autonomous in one day.
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: '#FF8C00' }}
                />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal accentRgb="212,212,216" lang="en" />
    </main>
  )
}
