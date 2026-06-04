import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  CheckCircle2,
  ChevronRight,
  Bot,
  MessageSquare,
  Workflow,
  Search,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Building2,
  Star,
  Zap,
  BrainCircuit,
  Award,
  CalendarCheck,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { chrome, violet as violetToken, green as greenToken } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS } from '@/components/ui/AppLogos'
import { localizedPath } from '@/i18n/slugs'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))

export const metadata: Metadata = {
  title: 'AI Agency in Geneva | Agents, chatbots, automation | DKDP',
  description:
    'AI agency in Geneva: custom agents, Claude Opus 4.7 or GPT-5 chatbots, n8n automation. 700+ Swiss SMEs supported since 2015. Eaux-Vives. Quote in 48h. Tel +41 79 940 79 69.',
  alternates: {
    canonical: 'https://dkdp.ch/en/artificial-intelligence/geneva',
    languages: {
      'fr-CH': 'https://dkdp.ch/intelligence-artificielle/geneve',
      en: 'https://dkdp.ch/en/artificial-intelligence/geneva',
      'x-default': 'https://dkdp.ch/intelligence-artificielle/geneve',
    },
  },
  openGraph: {
    url: 'https://dkdp.ch/en/artificial-intelligence/geneva',
    title: 'AI Agency in Geneva | Agents, chatbots, automation | DKDP',
    description:
      'Local AI agency in Geneva (Eaux-Vives). Claude AI agents, GPT-5 chatbots, n8n automation. 700+ Swiss SMEs supported. Free 30-minute AI audit.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    siteName: 'DKDP',
    images: [{ url: '/images/og/ia-geneve.png', width: 1376, height: 768, alt: 'AI agency in Geneva: DKDP in Eaux-Vives, agents, chatbots and automation for Swiss SMEs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agency in Geneva | DKDP',
    description: 'AI agency Geneva (Eaux-Vives): agents, chatbots, automation. 700+ Swiss SMEs supported. Quote in 48h.',
  },
  keywords: [
    'AI agency Geneva',
    'artificial intelligence agency Geneva',
    'AI consultant Geneva',
    'AI for SMEs Geneva',
    'AI agents Geneva',
    'AI chatbot Geneva',
    'AI automation Geneva',
    'DKDP',
  ],
}

const V = violetToken.color
const C = chrome.color
const G = greenToken.color
const color = C
const bg = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'

const FAQ = [
  {
    question: 'What does an AI agency in Geneva actually do?',
    answer:
      'An AI agency like DKDP designs, builds and deploys custom artificial-intelligence solutions for SMEs: autonomous agents (sales qualification, customer support, data analysis), chatbots powered by Claude Opus 4.7, GPT-5 or Gemini 3, n8n/Make/Zapier automations that connect your business tools (Bexio, HubSpot, Google Workspace). We work from the initial audit to production, with team training. DKDP is based in Eaux-Vives, Geneva and has supported SMEs across French-speaking Switzerland since 2015.',
  },
  {
    question: 'How much does an AI project for an SME in Geneva cost?',
    answer:
      "DKDP 2026 rates in Geneva: simple AI audit (CHF 890), agent or chatbot prototype (CHF 2'500 to 2'900, 2 weeks), complete project (from CHF 4'900 for a multi-channel Pro agent, from CHF 12'000 for a multi-agent RAG agent). Corporate AI training billed hourly: CHF 200/h for 1 person, CHF 300/h for 2, on quote from 3 participants. A fixed quote is provided within 48 hours of the audit.",
  },
  {
    question: 'Does my data stay in Switzerland?',
    answer:
      'Yes if you request it. For regulated sectors (accounting, medical, legal, private banking, HR) DKDP deploys AI solutions on Swiss servers: Infomaniak (Geneva, Winterthur), Exoscale, or on-premise on your own infrastructure. Sovereign AI models (Infomaniak Euria, Swisscom Swiss AI Assistant, self-hosted Mistral) ensure data never leaves the country. FADP 2023 compliance and professional secrecy by default. A DPA is signed systematically before any project starts.',
  },
  {
    question: 'Do I need to train my employees in AI?',
    answer:
      'Yes, and it is often the most profitable first step. DKDP offers corporate AI training in Geneva (1 day, on site or online) that makes your teams autonomous on ChatGPT, Claude and Microsoft Copilot. 100% of participants are operational the very next day and save on average 8 hours per week. To learn more, see the dedicated corporate AI training page.',
  },
  {
    question: 'Claude, ChatGPT or Gemini for my SME?',
    answer:
      'It depends on the use case. Claude Opus 4.7 (Anthropic) for long reasoning, business document analysis, agents that manipulate tools. GPT-5 (OpenAI) for multimodal agents (text, image, voice) and broad integrations. Gemini 3 (Google) if you are already 100% Google Workspace. For sensitive data, we also offer self-hosted Infomaniak Euria or Mistral Large 2. We compare these models in detail in our guide ChatGPT, Claude, Copilot: which to choose for your SME in 2026.',
  },
  {
    question: 'What is the difference between an AI agent, a chatbot and automation?',
    answer:
      'A chatbot answers questions in a conversation (website, WhatsApp). An AI agent makes autonomous decisions and performs actions in your tools (CRM, ERP, calendar). An automation is a workflow with no direct interaction (an email triggers an action in Bexio). In practice, the three combine: a chatbot that qualifies a lead, an agent that enriches the CRM, an automation that sends a welcome email. DKDP deploys all three depending on your need, often combined.',
  },
  {
    question: 'How long before seeing ROI on an AI project?',
    answer:
      "ROI observed at DKDP 2024-2026: a sales agent or a support chatbot pays for the project in 2 to 4 months for an SME of 5 to 30 employees. A simple automation (invoicing, follow-ups) is profitable in under 30 days. Corporate AI training is profitable from the first month (8 hours per week saved per person, around CHF 1'600 of productivity per employee per month at Geneva SME rates). We deliver a quantified ROI projection during the free initial audit.",
  },
  {
    question: 'Will AI replace jobs in my company?',
    answer:
      'No, unless that is your explicit goal, which is rare. DKDP AI is designed to free your team from repetitive, low-value tasks (data entry, manual follow-ups, email sorting, reporting) and let them focus on what matters: customer relationships, strategy, creativity. Across our deployments, no layoff has been linked to AI. On the contrary, several clients have hired thanks to the growth generated by AI. To go further, read AI or human consultant: what each does better.',
  },
  {
    question: 'Are you compliant with the Swiss FADP?',
    answer:
      'Yes. DKDP systematically applies the FADP 2023 on all projects: signed DPA, processing register, encryption of sensitive data, Swiss hosting available for critical cases, customised data-retention policy, access and deletion rights implemented in our solutions. We regularly work with Geneva accounting firms, medical practices and law offices, which have the strictest requirements.',
  },
  {
    question: 'Can we meet the team in person in Geneva?',
    answer:
      "Yes. DKDP is based at Rue du 31 Décembre 36 in the Eaux-Vives district of Geneva. We offer free 30-minute discovery meetings, by video call or in person. For projects over CHF 5'000, the kick-off systematically takes place in person in Geneva, Lausanne or at your premises. Tel: +41 79 940 79 69.",
  },
]

export default function AIGenevaPageEN() {
  return (
    <main>
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'AI Agency in Geneva',
          url: '/en/artificial-intelligence/geneva',
          description:
            "AI agency in Geneva specialised for Swiss SMEs since 2015. Design and deployment of custom AI agents (Claude Opus 4.7, GPT-5, Gemini 3), smart chatbots connected to WhatsApp Business and the CRM, n8n/Make/Zapier automation of business processes. FADP 2023 and GDPR compliant. Swiss hosting available (Infomaniak). 700+ clients supported. Based in Eaux-Vives (Rue du 31 Décembre 36, 1207 Geneva).",
          serviceType: 'Artificial intelligence agency',
          priceFrom: 890,
          priceSpecDescription: 'From CHF 890 for a 360° AI audit with report and roadmap',
          lang: 'en',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: 'https://dkdp.ch/en' },
          { name: 'Artificial Intelligence', url: 'https://dkdp.ch/en/artificial-intelligence' },
          { name: 'AI in Geneva', url: 'https://dkdp.ch/en/artificial-intelligence/geneva' },
        ])}
      />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.08)" accentRgb="212,212,216">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href={localizedPath('/intelligence-artificielle', 'en')} className="text-text-muted text-sm hover:text-text transition-colors">
                Artificial Intelligence
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>AI in Geneva</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">AI Agency in Geneva</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  AI agency in Geneva: <GradText as="span">agents, chatbots, automation</GradText> for Swiss SMEs.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  700+ Swiss SMEs supported since 2015. Based in Eaux-Vives, Geneva. Claude Opus 4.7, GPT-5 and n8n technologies. FADP 2023 compliant, Swiss hosting available.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <HeroPills
                    accentRgb="212, 212, 216"
                    items={[
                      { label: 'Eaux-Vives, Geneva', Icon: MapPin },
                      { label: 'Free 30-min audit', Icon: Zap },
                      { label: 'First meeting free', Icon: CalendarCheck },
                    ]}
                    className="basis-full"
                  />
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Free 30-min AI audit
                  </LiquidMetalButton>
                  <Link
                    href="#services"
                    className="text-sm text-text-muted hover:text-text transition-colors"
                  >
                    See the services →
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-5 mt-8">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} style={{ color }} />
                    <span className="text-text-muted text-xs">Rue du 31 Décembre 36, 1207 Eaux-Vives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} style={{ color }} />
                    <a href="tel:+41799407969" className="text-text-muted text-xs hover:text-text transition-colors">
                      +41 79 940 79 69
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="AI tools deployed in Geneva and French-speaking Switzerland">
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
                    src="/images/og/ia-geneve.png"
                    alt="AI agency in Geneva DKDP: David Khazaei in the Eaux-Vives offices with an SME team"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {[
              { v: '10 h/wk', l: 'Average gain per employee', sub: 'After AI training + automation' },
              { v: '-40 %', l: 'Customer support costs', sub: 'With an AI chatbot' },
              { v: '+60 %', l: 'Qualified leads', sub: 'With a sales agent' },
              { v: '2 wks', l: 'From mockup to production', sub: 'For a first prototype' },
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
      {/* ── Estimation CTA ── */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link
            href={localizedPath('/agence-digitale/creation-site-web/estimation', 'en')}
            className="group relative block overflow-hidden rounded-[20px] border transition-all hover:-translate-y-0.5 duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(212,212,216,0.14) 0%, rgba(212,212,216,0.04) 100%)',
              borderColor: 'rgba(212,212,216,0.30)',
              boxShadow: '0 0 50px rgba(212,212,216,0.08)',
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 md:p-10">
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color }}>
                  Budget and timeline in 2 minutes
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-text mb-2">
                  Estimate your AI or digital project in Geneva.
                </h2>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl">
                  Free online estimator: AI agent, chatbot, automation, website. Immediate quoted answer, no email required.
                </p>
              </div>
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm shrink-0 transition-transform group-hover:translate-x-1"
                style={{ background: color, color: '#09090B' }}
              >
                Get my estimate
                <ChevronRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Subnav ── */}
      <ScrollSpyNav
        items={[
          { label: 'Services', href: '#services' },
          { label: 'Why local', href: '#pourquoi-local' },
          { label: 'Technologies', href: '#technologies' },
          { label: 'Case studies', href: '#cas-clients' },
          { label: 'Process', href: '#processus' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Free AI audit', href: '/en/contact?service=ia-geneve' }}
        accentColor="#D4D4D8"
        accentBg="rgba(212,212,216,0.10)"
        accentBorder="rgba(212,212,216,0.20)"
      />

      {/* ── 3 most requested AI services in Geneva ── */}
      <section id="services" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Services</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto mb-4">
                The 3 most requested AI services in Geneva in 2026.
              </h2>
              <p className="text-text-secondary text-sm max-w-2xl mx-auto">
                Drawn from 700 audits carried out on Swiss SMEs since 2015.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Bot,
                title: 'Custom AI agents',
                accent: violetToken.color,
                accentBg: 'rgba(167,139,250,0.08)',
                accentBorder: 'rgba(167,139,250,0.20)',
                desc: 'Virtual employees that qualify your leads, answer your clients and analyse your data. Powered by Claude Opus 4.7 or GPT-5, connected to your stack (HubSpot, Bexio, Salesforce).',
                examples: 'Sales agent, Eaux-Vives accounting firm: +40% time saved on lead qualification.',
                href: '/intelligence-artificielle/agents-ia',
                cta: 'See the AI agents',
              },
              {
                Icon: MessageSquare,
                title: 'Smart chatbots',
                accent: G,
                accentBg: 'rgba(74,222,128,0.06)',
                accentBorder: 'rgba(74,222,128,0.20)',
                desc: 'AI chatbots on your website, WhatsApp Business or Messenger. 24/7 support, lead qualification, appointment booking. RAG on your private document base.',
                examples: 'Medical practice, Plainpalais: -60% triage calls, better patient NPS.',
                href: '/intelligence-artificielle/chatbot-ia',
                cta: 'See the chatbots',
              },
              {
                Icon: Workflow,
                title: 'Process automation',
                accent: C,
                accentBg: bg,
                accentBorder: border,
                desc: 'n8n (self-hosted in Switzerland), Make and Zapier workflows that connect Bexio, Abacus, Google Workspace, Slack. FADP 2023 compliant automations.',
                examples: 'E-commerce, Carouge: 40 h/month freed up on invoicing and after-sales.',
                href: '/intelligence-artificielle/automatisation',
                cta: 'See automation',
              },
            ].map((s, i) => (
              <SectionReveal key={s.title} delay={i * 0.08}>
                <Link
                  href={localizedPath(s.href, 'en')}
                  className="flex flex-col h-full rounded-[16px] border p-7 transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: s.accentBg, borderColor: s.accentBorder }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px] mb-5"
                    style={{ background: s.accentBg, border: `1px solid ${s.accentBorder}` }}
                  >
                    <s.Icon size={22} style={{ color: s.accent }} />
                  </div>
                  <h3 className="text-text font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <p className="text-text-muted text-xs italic leading-relaxed mb-4">{s.examples}</p>
                  <p
                    className="text-sm font-semibold inline-flex items-center gap-1.5"
                    style={{ color: s.accent }}
                  >
                    {s.cta} <ChevronRight size={14} />
                  </p>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why a local AI agency in Geneva ── */}
      <section id="pourquoi-local" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Proximity</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Why choose a local AI agency in Geneva?
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                French AI players (large Paris integrators) dominate generic SEO but understand neither the Swiss SME landscape nor Swiss constraints. DKDP, based in Eaux-Vives since 2015, offers physical proximity, regulatory understanding and local billing that no provider outside Switzerland can match.
              </p>
              <div className="space-y-4">
                {[
                  { k: 'Physical proximity', v: 'In-person meetings in Eaux-Vives, travel to Lausanne, Nyon, Fribourg. Systematic in-person kick-off beyond CHF 5’000.' },
                  { k: 'FADP 2023 and GDPR compliance', v: 'Mastered Swiss hosting (Infomaniak, Exoscale). DPA signed systematically. Concrete experience with Geneva accounting firms, medical practices and law offices.' },
                  { k: 'Swiss SME landscape', v: '700+ SMEs supported since 2015. We know Bexio, Abacus, Twint, PostFinance, the specifics of the cantons and Swiss purchasing habits.' },
                  { k: 'Billing in CHF', v: 'No exchange fees, no surprise VAT on French invoicing. Payment by Swiss bank transfer or Twint business.' },
                ].map((row) => (
                  <div key={row.k}>
                    <p className="text-text font-semibold text-sm mb-1 flex items-center gap-2">
                      <CheckCircle2 size={13} style={{ color }} />
                      {row.k}
                    </p>
                    <p className="text-text-secondary text-xs leading-relaxed pl-6">{row.v}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div
                className="rounded-[20px] p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
                  Areas covered
                </p>
                <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs">
                  {[
                    'Geneva', 'Lausanne', 'Nyon', 'Morges',
                    'Fribourg', 'Neuchatel', 'Sion', 'Montreux',
                    'Carouge', 'Meyrin', 'Onex', 'Vernier',
                  ].map((cityName) => (
                    <div
                      key={cityName}
                      className="px-3 py-2 rounded-md border text-text-secondary flex items-center gap-2"
                      style={{ background: 'rgba(212,212,216,0.04)', borderColor: border }}
                    >
                      <MapPin size={11} style={{ color }} />
                      {cityName}
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-[12px] p-4 border"
                  style={{ background: 'rgba(167,139,250,0.08)', borderColor: 'rgba(167,139,250,0.20)' }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: V }}>
                    DKDP offices
                  </p>
                  <p className="text-text text-sm font-semibold mb-1">Rue du 31 Décembre 36</p>
                  <p className="text-text-secondary text-xs">1207 Geneva, Eaux-Vives</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock size={11} className="text-text-muted" />
                    <p className="text-text-muted text-xs">Mon-Fri 9am-6pm</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── AI technologies deployed in Geneva ── */}
      <section id="technologies" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Stack 2026</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto mb-4">
                AI technologies we deploy in Geneva.
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto text-sm">
                The best building blocks on the 2026 market, chosen according to your use case, budget and sovereignty constraints.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Claude Opus 4.7', provider: 'Anthropic', pitch: 'Long reasoning, document analysis, tool manipulation.', accent: V, accentBg: 'rgba(167,139,250,0.08)', accentBorder: 'rgba(167,139,250,0.20)' },
              { name: 'GPT-5 / GPT-5.3', provider: 'OpenAI', pitch: 'Multimodal: text, image, voice. Large integration ecosystem.', accent: C, accentBg: bg, accentBorder: border },
              { name: 'Gemini 3', provider: 'Google', pitch: 'Native Google Workspace integration and long-memory agents.', accent: '#60a5fa', accentBg: 'rgba(96,165,250,0.08)', accentBorder: 'rgba(96,165,250,0.22)' },
              { name: 'Mistral Large 2', provider: 'Mistral / Open-source', pitch: 'High-performing open-source, self-hostable in Switzerland.', accent: '#fbbf24', accentBg: 'rgba(251,191,36,0.08)', accentBorder: 'rgba(251,191,36,0.22)' },
              { name: 'Llama 4', provider: 'Meta / Open-source', pitch: 'Open-source models for total sovereignty.', accent: '#fbbf24', accentBg: 'rgba(251,191,36,0.08)', accentBorder: 'rgba(251,191,36,0.22)' },
              { name: 'LangChain / LangGraph', provider: 'Orchestration', pitch: 'Complex agent chains, routing, validation, escalation.', accent: C, accentBg: bg, accentBorder: border },
              { name: 'n8n / Make / Zapier', provider: 'Automation', pitch: 'Connects Bexio, Salesforce, HubSpot, Google Workspace, WhatsApp.', accent: C, accentBg: bg, accentBorder: border },
              { name: 'Pinecone / Weaviate / Qdrant', provider: 'Vector DB (RAG)', pitch: 'Feed your agents with your private document base.', accent: C, accentBg: bg, accentBorder: border },
              { name: 'Infomaniak Euria / Swisscom', provider: 'Swiss sovereign AI', pitch: 'Hosted 100% in Switzerland. FADP 2023 by default.', accent: G, accentBg: 'rgba(74,222,128,0.06)', accentBorder: 'rgba(74,222,128,0.20)' },
            ].map((t) => (
              <SectionReveal key={t.name}>
                <div
                  className="flex flex-col gap-2 p-5 rounded-[12px] border h-full"
                  style={{ background: t.accentBg, borderColor: t.accentBorder }}
                >
                  <p className="text-text font-bold text-sm">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: t.accent }}>
                    {t.provider}
                  </p>
                  <p className="text-text-muted text-xs leading-relaxed">{t.pitch}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <p className="text-text-muted text-xs text-center mt-8 max-w-2xl mx-auto leading-relaxed">
              To compare consumer models in detail, read{' '}
              <Link href="/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026" className="underline hover:text-text transition-colors">
                ChatGPT, Claude or Copilot: which to choose for your SME in 2026
              </Link>
              .
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── AI case studies in Geneva ── */}
      <section id="cas-clients" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Local results</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                AI case studies in Geneva: real results.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                secteur: 'Accounting firm',
                quartier: 'Eaux-Vives',
                stack: 'Claude Opus 4.7 sales agent + HubSpot + Bexio via n8n',
                resultat: '+40% sales time saved, 18 h/week freed up, lead qualification 100% automated',
              },
              {
                secteur: 'Medical practice',
                quartier: 'Plainpalais',
                stack: 'Infomaniak Euria chatbot (Swiss sovereign) + WhatsApp Business',
                resultat: '-60% triage calls, 24/7 booking, better patient NPS (+22 points)',
              },
              {
                secteur: 'Swiss e-commerce',
                quartier: 'Carouge',
                stack: 'Multilingual GPT-5 support agent + Notion RAG + Zendesk',
                resultat: '+35% customer NPS, 24/7 handling, 70% of level-1 tickets automated',
              },
            ].map((c) => (
              <SectionReveal key={c.secteur}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={14} style={{ color }} />
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color }}>
                      {c.secteur}
                    </p>
                  </div>
                  <p className="text-text font-semibold mb-3">{c.quartier}</p>
                  <div className="mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Deployed stack</p>
                    <p className="text-text-secondary text-xs leading-relaxed">{c.stack}</p>
                  </div>
                  <div className="pt-4 border-t" style={{ borderColor: border }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color }}>Result</p>
                    <p className="text-text text-sm leading-relaxed font-medium">{c.resultat}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <p className="text-text-muted text-xs text-center mt-8 max-w-2xl mx-auto">
              Exact client names are anonymised by default. Named references can be shared during a discovery meeting on explicit request.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="processus" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Process</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                From AI audit to production, in 6 steps.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: Search, n: '01', title: '360° AI audit', desc: 'Video call or in person (Eaux-Vives). 30 free minutes to map your priority AI use cases.' },
              { Icon: MapPin, n: '02', title: '12-month roadmap', desc: 'Detailed plan, estimated ROI, quarterly priorities. Technology choices justified by your stack and constraints.' },
              { Icon: Zap, n: '03', title: '2-week prototype', desc: 'A first agent/chatbot/workflow delivered quickly, testable in real conditions before committing to the full project.' },
              { Icon: BrainCircuit, n: '04', title: 'Production deployment', desc: 'Going live with parallel human validation. Staging, tests, monitoring, clean switchover.' },
              { Icon: Award, n: '05', title: 'Team training', desc: 'Corporate AI training in person in Geneva or online. Your teams autonomous from day one.' },
              { Icon: ShieldCheck, n: '06', title: 'Ongoing support', desc: '3 months of follow-up included. Beyond that, optional monthly maintenance from CHF 250/month.' },
            ].map((step, i) => (
              <SectionReveal key={step.n} delay={i * 0.05}>
                <div
                  className="flex flex-col gap-3 p-6 rounded-[14px] border h-full relative"
                  style={{ background: bg, borderColor: border }}
                >
                  <span className="absolute top-4 right-4 text-[11px] font-bold" style={{ color: `${color}60` }}>
                    {step.n}
                  </span>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[8px]"
                    style={{ background: 'rgba(212,212,216,0.10)', border: `1px solid ${border}` }}
                  >
                    <step.Icon size={17} style={{ color }} />
                  </div>
                  <h3 className="text-text font-semibold text-sm">{step.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{step.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="tarifs" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pricing</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto mb-4">
                AI pricing in Geneva for Swiss SMEs.
              </h2>
              <p className="text-text-secondary text-sm max-w-xl mx-auto">
                Fixed prices, quote within 48 hours of the audit. CHF billing, Swiss VAT.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: '360° AI audit',
                price: 'CHF 890',
                delay: 'Report in 5 days',
                features: [
                  'Mapping of your 3 priority AI use cases',
                  'Quantified ROI estimate per case',
                  'Personalised technology recommendations',
                  '12-month deployment plan',
                  '1h30 debrief session',
                ],
                highlighted: false,
              },
              {
                name: 'AI prototype',
                price: 'From CHF 2’500',
                delay: '2 weeks',
                features: [
                  'One agent, chatbot or workflow delivered',
                  'Integration with 1 existing tool',
                  'Testable in real conditions',
                  'Full-project go/no-go decision',
                  '1 month of follow-up included',
                ],
                highlighted: true,
              },
              {
                name: 'Complete AI project',
                price: 'On quote',
                delay: '4 to 12 weeks',
                features: [
                  'Multi-channel agents or chatbots',
                  'Advanced n8n automations',
                  'Team training included',
                  '3 months of ongoing support',
                  'Monitoring and improvement',
                ],
                highlighted: false,
              },
            ].map((p) => (
              <SectionReveal key={p.name}>
                <div
                  className="flex flex-col h-full rounded-[20px] border p-7 relative"
                  style={{
                    background: p.highlighted ? 'linear-gradient(135deg, rgba(212,212,216,0.12) 0%, rgba(212,212,216,0.04) 100%)' : bg,
                    borderColor: p.highlighted ? 'rgba(212,212,216,0.32)' : border,
                    boxShadow: p.highlighted ? '0 0 50px rgba(212,212,216,0.10)' : undefined,
                  }}
                >
                  {p.highlighted && (
                    <span
                      className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(212,212,216,0.16)', color, border: `1px solid ${border}` }}
                    >
                      Recommended
                    </span>
                  )}
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color }}>
                    {p.name}
                  </p>
                  <p className="text-3xl font-bold text-text mb-1 mt-2">{p.price}</p>
                  <p className="text-text-muted text-xs mb-6">{p.delay}</p>
                  <div className="flex flex-col gap-2.5 flex-1 mb-6">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color }} />
                        <span className="text-text-secondary text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Schedule a call
                  </LiquidMetalButton>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <p className="text-text-muted text-xs text-center mt-8 max-w-2xl mx-auto">
              Corporate AI training billed separately: CHF 200/h for 1 person, CHF 300/h for 2. For 3 to 10 people or a full day, see the{' '}
              <Link href={localizedPath('/formation-entreprise/ia', 'en')} className="underline hover:text-text transition-colors">
                Corporate AI training page
              </Link>
              .
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials accentRgb="212,212,216" lang="en" />

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} lang="en" title="Frequently asked questions about AI in Geneva" />
      </div>

      {/* ── Related services ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Complete your AI journey in Geneva
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { href: '/intelligence-artificielle/agents-ia', label: 'AI agents', desc: 'Claude, GPT-5, LangChain' },
              { href: '/intelligence-artificielle/chatbot-ia', label: 'AI chatbots', desc: 'Claude, WhatsApp, RAG' },
              { href: '/intelligence-artificielle/automatisation', label: 'Automation', desc: 'n8n, Make, Zapier' },
              { href: '/formation-entreprise/ia', label: 'Corporate AI training', desc: 'One day, 100% operational' },
            ].map((link) => (
              <SectionReveal key={link.href}>
                <Link
                  href={localizedPath(link.href, 'en')}
                  className="group flex items-center justify-between gap-4 rounded-[14px] p-5 border transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: bg, borderColor: border }}
                >
                  <div>
                    <p className="text-text font-semibold text-sm">{link.label}</p>
                    <p className="text-text-muted text-xs mt-0.5">{link.desc}</p>
                  </div>
                  <ChevronRight size={16} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color }} />
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local contact ── */}
      <section className="py-24 bg-bg-card border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Let&apos;s meet</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Let&apos;s meet in Eaux-Vives.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                For a free 30-minute AI audit, we meet by video call or at our offices at 36 Rue du 31 Décembre. Close to the Eaux-Vives station, 5 minutes on foot from Geneva city centre.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin size={16} style={{ color }} />
                  <p className="text-text-secondary text-sm">Rue du 31 Décembre 36, 1207 Geneva (Eaux-Vives)</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} style={{ color }} />
                  <a href="tel:+41799407969" className="text-text-secondary text-sm hover:text-text transition-colors">
                    +41 79 940 79 69
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} style={{ color }} />
                  <p className="text-text-secondary text-sm">Monday to Friday, 9am to 6pm</p>
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div
                className="rounded-[20px] p-8 border text-center"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
              >
                <Star size={28} className="mx-auto mb-4" style={{ color }} />
                <p className="text-3xl font-bold text-text mb-2">5.0 / 5.0</p>
                <p className="text-text-secondary text-sm mb-4">18 verified Google reviews</p>
                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Schedule an AI audit
                </LiquidMetalButton>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <CTAFinal accentRgb="212,212,216" lang="en" />
    </main>
  )
}
