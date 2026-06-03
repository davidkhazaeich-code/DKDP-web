import type { Metadata } from 'next'
import Link from 'next/link'
import { Monitor, Sparkles, GraduationCap, ArrowRight, Check } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradText } from '@/components/ui/GradText'
import { GradTag } from '@/components/ui/GradTag'
import { TrustBadge } from '@/components/ui/TrustBadge'
import { HomeHeroBackground } from '@/components/sections/HomeHeroBackground'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildOrganization, buildWebSite, buildWebPageWithSpeakable, buildFAQPage } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Digital Agency Geneva · Web, AI & Training | DKDP',
  description:
    'Geneva digital agency for web design, SEO, AI rollouts and corporate AI training. 700+ Swiss clients. Free quote in 24 hours, fixed price, ships in weeks.',
  alternates: {
    canonical: 'https://dkdp.ch/en',
    languages: {
      'fr-CH': 'https://dkdp.ch/',
      'en': 'https://dkdp.ch/en',
      'x-default': 'https://dkdp.ch/',
    },
  },
  openGraph: {
    title: 'Digital Agency Geneva · Web, AI & Training | DKDP',
    description:
      'Websites that convert, AI that scales, training that sticks. 700+ Swiss clients trust DKDP. Free quote in 24h.',
    url: 'https://dkdp.ch/en',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DKDP, digital agency in Geneva' }],
  },
  twitter: {
    images: ['/og-image.png'],
  },
}

const EN_FAQ_ITEMS = [
  {
    question: 'What services does DKDP offer in Geneva?',
    answer:
      "DKDP is a Geneva-based digital agency covering three pillars: digital services (web design, redesign, SEO, Google Ads, social media, video, GDPR compliance), artificial intelligence (custom AI agents, business automation, AI audits, chatbots, AI implementation in your stack) and corporate training (Claude, ChatGPT, Copilot, Canva, Figma, cybersecurity, video editing, office tools). We serve SMBs, scale-ups and large enterprises across French-speaking Switzerland.",
  },
  {
    question: 'How long does it take to deliver a website?',
    answer:
      'A typical showcase website is delivered in 4 to 6 weeks (briefing, content, design, build, SEO setup, launch). Complex projects with custom development, e-commerce or AI features take 8 to 12 weeks. We always give a fixed quote upfront and stick to the agreed timeline.',
  },
  {
    question: 'Do you work in English with international clients in Geneva?',
    answer:
      'Yes. Our team is fully bilingual French and English. We work daily with expat-led companies, international organisations, and Swiss SMBs serving global markets. Meetings, deliverables, documentation and training sessions can all be delivered in English.',
  },
  {
    question: 'How much does corporate AI training cost?',
    answer:
      "AI training for teams starts at CHF 1'500 per half-day session for up to 10 people, including a custom playbook tailored to your workflows. Full company-wide rollouts (5 to 10 sessions, supporting tooling, post-training help) range from CHF 8'000 to CHF 20'000 depending on team size and complexity.",
  },
  {
    question: 'What makes DKDP different from other Geneva agencies?',
    answer:
      "We are a small, senior team that ships code itself. No account managers, no offshoring, no PowerPoint theatre. You talk directly to the people who design, build, train and ship. We combine deep web craft (Next.js, headless CMS, fast Core Web Vitals) with hands-on AI expertise (Claude, ChatGPT, n8n, custom agents) and the ability to train your team on the tools we deploy.",
  },
  {
    question: 'Do you offer free audits before engagement?',
    answer:
      'Yes. We offer a free SEO audit and a free site audit, both delivered within 48 hours. The reports are concrete (your real issues, prioritised, with effort estimates) and yours to keep with no engagement on your side. Many clients use them as a second opinion before deciding whether to engage with us or anyone else.',
  },
]

export default function EnHomePage() {
  return (
    <>
      <SchemaOrg schema={buildLocalBusiness()} />
      <SchemaOrg schema={buildOrganization()} />
      <SchemaOrg schema={buildFAQPage(EN_FAQ_ITEMS.map(({ question, answer }) => ({ question, answer })))} />
      <SchemaOrg schema={buildWebSite()} />
      <SchemaOrg
        schema={buildWebPageWithSpeakable({
          name: 'Digital Agency Geneva',
          url: '/en',
          description: 'Geneva-based digital agency specialised in web design, SEO, artificial intelligence and corporate AI training.',
        })}
      />

      {/* ─── Hero ─── */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-14 pb-16 md:pb-0">
        <HomeHeroBackground />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 text-center">
          <div className="mb-5 sm:mb-8 flex flex-col items-center gap-4">
            <TrustBadge variant="light" />
          </div>
          <h1 className="text-[clamp(1.6rem,5vw,4.25rem)] font-bold leading-[1.08] tracking-[-0.03em] mb-4 sm:mb-6 max-w-[1100px] mx-auto">
            The Geneva digital agency
            <br />
            <GradText as="span">that helps you stand out.</GradText>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-[820px] mx-auto">
            We build your website, sharpen your SEO, roll out AI inside your teams and train your people.
            Measurable results, no fluff. 700+ Swiss clients already trust us.
          </p>
          <div className="flex justify-center">
            <LiquidMetalButton href="#pillars" size="lg">
              Discover our services <ArrowRight size={16} />
            </LiquidMetalButton>
          </div>
        </div>
      </section>

      {/* ─── Stats bar ─── */}
      <section className="border-y border-border py-10 sm:py-14" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-text mb-1">700+</p>
            <p className="text-text-secondary text-xs sm:text-sm">Clients in Switzerland</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-text mb-1">5 yrs</p>
            <p className="text-text-secondary text-xs sm:text-sm">Building digital for SMBs</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-text mb-1">4.9/5</p>
            <p className="text-text-secondary text-xs sm:text-sm">Average Google rating</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-text mb-1">&lt;24h</p>
            <p className="text-text-secondary text-xs sm:text-sm">Quote turnaround time</p>
          </div>
        </div>
      </section>

      {/* ─── Three pillars ─── */}
      <section id="pillars" className="py-20 sm:py-28 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12 sm:mb-16">
            <GradTag>What we do</GradTag>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-4 mb-4">
              Three pillars, one team
            </h2>
            <p className="text-text-secondary text-base sm:text-lg max-w-[680px] mx-auto leading-relaxed">
              Whether you need a new website, an AI rollout or a hands-on training session,
              you get the same senior team that ships code itself, no handoffs, no agencies-of-agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Digital pillar */}
            <Link
              href="/en/digital-agency"
              className="group rounded-2xl p-6 sm:p-7 border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(167,139,250,0.15)]"
              style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.18)' }}
            >
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}
              >
                <Monitor size={22} style={{ color: '#A78BFA' }} />
              </div>
              <h3 className="text-xl font-bold mb-2">Digital agency</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                Websites that convert, redesigns that preserve SEO, Google Ads that pay back,
                video and social campaigns that build brand. The full stack from strategy to launch.
              </p>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                <li className="flex items-center gap-2"><Check size={14} style={{ color: '#A78BFA' }} /> Web design & development</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: '#A78BFA' }} /> SEO and Google Ads</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: '#A78BFA' }} /> Video, social, brand</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: '#A78BFA' }} /> GDPR & cookie compliance</li>
              </ul>
              <p
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-1"
                style={{ color: '#A78BFA' }}
              >
                Explore digital services <ArrowRight size={14} />
              </p>
            </Link>

            {/* AI pillar */}
            <Link
              href="/en/artificial-intelligence"
              className="group rounded-2xl p-6 sm:p-7 border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(212,212,216,0.12)]"
              style={{ background: 'var(--chrome-bg)', borderColor: 'var(--chrome-border)' }}
            >
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                style={{ background: 'var(--chrome-bg)', border: '1px solid var(--chrome-border)' }}
              >
                <Sparkles size={22} style={{ color: 'var(--text-secondary)' }} />
              </div>
              <h3 className="text-xl font-bold mb-2">Artificial intelligence</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                Custom AI agents, no-code automation, chatbots tuned to your business,
                and a clear audit of where AI moves the needle for your team, on your stack.
              </p>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                <li className="flex items-center gap-2"><Check size={14} className="text-text-secondary" /> Custom AI agents</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-text-secondary" /> Business automation (n8n, Make)</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-text-secondary" /> AI chatbots that actually help</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-text-secondary" /> Audit, consulting, rollout</li>
              </ul>
              <p
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-1 text-text-secondary"
              >
                Explore AI solutions <ArrowRight size={14} />
              </p>
            </Link>

            {/* Training pillar */}
            <Link
              href="/en/corporate-training"
              className="group rounded-2xl p-6 sm:p-7 border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,140,0,0.15)]"
              style={{ background: 'rgba(255,107,0,0.06)', borderColor: 'rgba(255,107,0,0.18)' }}
            >
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                style={{ background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.25)' }}
              >
                <GraduationCap size={22} style={{ color: '#FF8C00' }} />
              </div>
              <h3 className="text-xl font-bold mb-2">Corporate training</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                Train your teams on Claude, ChatGPT, Copilot, Canva, Figma and the daily-driver tools
                they actually use. Practical, hands-on, with a take-home playbook.
              </p>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                <li className="flex items-center gap-2"><Check size={14} style={{ color: '#FF8C00' }} /> AI tools (Claude, ChatGPT, Copilot)</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: '#FF8C00' }} /> Canva, Figma, web design</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: '#FF8C00' }} /> Cybersecurity, video, office</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: '#FF8C00' }} /> On-site or remote, in English</li>
              </ul>
              <p
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-1"
                style={{ color: '#FF8C00' }}
              >
                Explore training catalogue <ArrowRight size={14} />
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Why DKDP ─── */}
      <section className="py-20 sm:py-28 border-t border-border" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-start">
            <div>
              <GradTag>Why DKDP</GradTag>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 mb-5">
                A senior team, no middlemen, ships in weeks.
              </h2>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-4">
                Most Geneva agencies sell you a slide deck, sub-contract the work, and disappear
                until invoicing. We do the opposite: a small senior team, hands on the code,
                in front of your team, week after week.
              </p>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                Because we both deploy AI and train your people on it, you avoid the classic gap
                between a shiny tool and a team that does not use it.
              </p>
            </div>

            <ul className="space-y-5">
              <li className="flex gap-4">
                <span className="flex-shrink-0 mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold" style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80' }}>1</span>
                <div>
                  <h3 className="font-semibold mb-1">Direct access to senior craft</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">You talk to the people writing the code, designing the UI, training your team. No relay race.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold" style={{ background: 'rgba(167,139,250,0.12)', color: '#A78BFA' }}>2</span>
                <div>
                  <h3 className="font-semibold mb-1">Web and AI under one roof</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">The website, the AI agent and the team that uses both are designed and shipped by the same crew.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold" style={{ background: 'rgba(255,140,0,0.12)', color: '#FF8C00' }}>3</span>
                <div>
                  <h3 className="font-semibold mb-1">Geneva-based, internationally fluent</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">Local in Eaux-Vives, fluent in English, used to working with expat-led companies and international organisations.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold" style={{ background: 'rgba(96,165,250,0.12)', color: '#60a5fa' }}>4</span>
                <div>
                  <h3 className="font-semibold mb-1">Fixed scope, fixed price, on time</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">Every quote is fixed before kickoff. No surprise change requests, no inflated invoices, no missed deadlines.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12 sm:mb-16">
            <GradTag>How we work</GradTag>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-4 mb-4">
              From first call to live launch
            </h2>
            <p className="text-text-secondary text-base sm:text-lg max-w-[680px] mx-auto leading-relaxed">
              A predictable four-step rhythm, used across web, AI and training projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: '01', title: 'Discovery call', text: '30-minute call to understand your business, goals and constraints. Free, no pitch deck.' },
              { n: '02', title: 'Fixed quote', text: 'Within 24-48 hours, a clear scope and a fixed price. You decide if it makes sense.' },
              { n: '03', title: 'Build & ship', text: 'Weekly demos, transparent progress, your feedback baked in at every step.' },
              { n: '04', title: 'Train & hand off', text: 'We train your team to run what we shipped, then stay reachable for follow-ups.' },
            ].map((step) => (
              <div key={step.n} className="rounded-xl p-5 border border-border" style={{ background: 'var(--bg-card)' }}>
                <p className="text-xs font-bold tracking-widest text-text-muted mb-2">STEP {step.n}</p>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Social proof ─── */}
      <section className="py-20 sm:py-28 border-t border-border" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <GradTag>Trusted by</GradTag>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 mb-4">
              700+ Swiss businesses already work with us
            </h2>
            <p className="text-text-secondary text-base max-w-[640px] mx-auto leading-relaxed">
              From single-person studios in Geneva to multi-site groups across Switzerland,
              we ship for them and stay reachable when something needs fixing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                quote: '"DKDP rebuilt our website and rolled out an AI agent for our sales team. We talk to David and Romane directly. It just works."',
                name: 'Operations director',
                role: 'Swiss SMB, retail',
              },
              {
                quote: '"After two failed attempts with other agencies, DKDP shipped exactly what we needed in six weeks. SEO is up, conversions tripled."',
                name: 'Founder',
                role: 'B2B services, Lausanne',
              },
              {
                quote: '"The AI training they ran with our team was the most useful day of the year. Concrete, hands-on, no buzzwords."',
                name: 'Head of HR',
                role: 'Geneva-based scale-up',
              },
            ].map((t, i) => (
              <figure key={i} className="rounded-2xl p-6 border border-border h-full flex flex-col" style={{ background: 'var(--bg)' }}>
                <blockquote className="text-text-secondary leading-relaxed text-[15px] flex-1">{t.quote}</blockquote>
                <figcaption className="mt-5 pt-5 border-t border-border">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-text-muted text-xs">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="text-center mb-12">
            <GradTag>FAQ</GradTag>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">
              Common questions, straight answers
            </h2>
          </div>
          <ul className="space-y-3">
            {EN_FAQ_ITEMS.map(({ question, answer }) => (
              <li key={question}>
                <details className="group rounded-xl border border-border p-4 sm:p-5 transition-colors hover:border-[var(--text-muted)]" style={{ background: 'var(--bg-card)' }}>
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

      {/* ─── Final CTA ─── */}
      <section className="py-24 sm:py-32 border-t border-border" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[820px] mx-auto px-6 text-center">
          <GradTag>Let&apos;s talk</GradTag>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-4 mb-5">
            Ready to <GradText as="span">move to the next level</GradText>?
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-[600px] mx-auto">
            Free quote, 24-hour reply, no commitment. Tell us what you&apos;re trying to ship,
            we&apos;ll tell you what it takes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <LiquidMetalButton href="/en/contact" size="lg">
              Book a call <ArrowRight size={16} />
            </LiquidMetalButton>
            <Link
              href="/en/pricing"
              className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-text-secondary hover:text-text transition-colors"
            >
              View pricing <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
