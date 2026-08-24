import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Globe2, Users, Building2, Phone, CheckCircle2, Bot, Zap, BrainCircuit, GraduationCap, Sparkles, Workflow, MapPin, CalendarCheck } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { VideoHeroBg } from '@/components/ui/VideoHeroBg'
import { ImageHeroBg } from '@/components/ui/ImageHeroBg'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildBreadcrumbList, buildFAQPage, buildWebPageWithSpeakable, buildService, buildCourse } from '@/lib/schema'
import { CITIES_EN, getCityEN } from '@/lib/cities-en'
import { localizedPath } from '@/i18n/slugs'
import { violet, chrome, orange } from '@/lib/tokens'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))

const V = violet.color, VB = violet.bg, VD = violet.border
const CH = chrome.color, CHB = chrome.bg, CHD = chrome.border
const OR = orange.color, ORB = orange.bg, ORD = orange.border

export function generateStaticParams() {
  return CITIES_EN.map(city => ({ city: city.enSlug }))
}

type Props = { params: Promise<{ city: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCityEN(citySlug)
  if (!city) return {}

  const title = `Digital agency in ${city.name} | Web, SEO, AI & Training | DKDP`
  const description = `Digital agency in ${city.name} (${city.canton}): web design and redesign, SEO, artificial intelligence, training. DKDP supports ${city.name} SMEs since 2015. Quote in 48h.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://dkdp.ch/en/digital-agency/${city.enSlug}`,
      languages: {
        'fr-CH': `https://dkdp.ch/agence-digitale/${city.slug}`,
        en: `https://dkdp.ch/en/digital-agency/${city.enSlug}`,
        'x-default': `https://dkdp.ch/agence-digitale/${city.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://dkdp.ch/en/digital-agency/${city.enSlug}`,
      locale: 'en_US',
      alternateLocale: ['fr_CH'],
      images: [{ url: '/images/og/agence-digitale-ville.png', width: 1376, height: 768, alt: `Digital agency in ${city.name}: web, SEO and AI for ${city.canton} SMEs by DKDP` }],
    },
    twitter: { card: 'summary_large_image', images: ['/images/og/agence-digitale-ville.png'] },
  }
}

const SERVICES = [
  { label: 'Artificial intelligence', href: '/intelligence-artificielle', desc: 'AI agents, automation and audits to boost productivity.' },
  { label: 'Corporate AI training', href: '/formation-entreprise/ia', desc: 'Hands-on training in generative AI, Claude AI and prompt engineering.' },
  { label: 'Custom AI agents', href: '/intelligence-artificielle/agents-ia', desc: 'Deploying autonomous AI agents for your business processes.' },
  { label: 'Website creation', href: '/agence-digitale/creation-site-web', desc: 'Showcase sites, e-commerce and custom web apps.' },
  { label: 'SEO', href: '/agence-digitale/seo', desc: 'Local and national SEO to dominate Google in your region.' },
  { label: 'Google Ads', href: '/agence-digitale/publicite-sea', desc: 'Search and Performance Max campaigns, qualified leads.' },
]

const IA_CAPABILITIES = [
  { Icon: Bot, title: 'Autonomous AI agents', desc: 'Smart agents that perform complex tasks: email sorting, report generation, lead qualification, 24/7 customer service.' },
  { Icon: Workflow, title: 'Process automation', desc: 'Connecting your tools (CRM, ERP, email, accounting) with AI workflows that eliminate repetitive tasks.' },
  { Icon: BrainCircuit, title: 'Custom generative AI', desc: 'Tailored solutions for content generation, document analysis and AI-assisted decision-making.' },
  { Icon: Sparkles, title: 'AI audit & strategy', desc: 'Identifying automation opportunities in your company. Measurable ROI from the first week.' },
]

export default async function CityPageEN({ params }: Props) {
  const { city: citySlug } = await params
  const city = getCityEN(citySlug)
  if (!city) notFound()

  const enBase = `/en/digital-agency/${city.enSlug}`

  const faq = [
    {
      question: `How can artificial intelligence help my company in ${city.name}?`,
      answer: `AI lets ${city.name} companies automate repetitive tasks, improve customer service with smart chatbots, generate marketing content and analyse complex data. DKDP deploys custom AI agents tailored to the ${city.name} business landscape (${city.economicProfile}).`,
    },
    {
      question: `What is an AI agent and how do you deploy one in ${city.name}?`,
      answer: `An AI agent is an autonomous program that can perform complex tasks: answering clients, sorting emails, generating reports, qualifying leads. DKDP deploys AI agents for ${city.name} companies, fully integrated into your existing tools (CRM, ERP, email). Setup in 2 to 4 weeks.`,
    },
    {
      question: `Do you offer AI training in ${city.name}?`,
      answer: `Yes. DKDP offers AI training on site in ${city.name} or by video call. Rates: CHF 150/h (1 person) to CHF 300/h (6-10 people). Half-day (4h) or full-day (8h) formats. ${city.formationContext}`,
    },
    {
      question: `How much does an AI automation project cost in ${city.name}?`,
      answer: `An AI audit starts at CHF 500. A simple AI agent (chatbot, email sorting) ranges from CHF 2'000 to CHF 5'000. A complete automation solution (CRM, workflows, reporting) from CHF 5'000 to CHF 15'000. DKDP provides a fixed quote with estimated ROI before starting.`,
    },
    {
      question: `Does DKDP travel to ${city.name} for training and AI projects?`,
      answer: `Yes. Our offices are in Geneva (${city.distance}), but we regularly work in ${city.name} for on-site training and AI workshops. Project meetings can take place in person, by video call, or hybrid.`,
    },
    {
      question: `Why choose DKDP as an AI agency in ${city.name}?`,
      answer: `DKDP combines technical expertise (web, AI, automation) and 10+ years of experience with 700+ clients across French-speaking Switzerland. Unlike pure-play AI shops, we integrate artificial intelligence into a global digital strategy (website, SEO, training). Our proximity to ${city.name} allows ongoing support.`,
    },
  ]

  return (
    <main>
      <SchemaOrg schema={buildLocalBusiness('en')} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Digital Agency', url: 'https://dkdp.ch/en/digital-agency' },
        { name: city.name, url: `https://dkdp.ch${enBase}` },
      ])} />
      <SchemaOrg schema={buildFAQPage(faq)} />
      <SchemaOrg schema={buildWebPageWithSpeakable({
        name: `Digital agency in ${city.name}`,
        url: enBase,
        description: `Digital agency in ${city.name}: websites, SEO, artificial intelligence and corporate training for SMEs.`,
        lang: 'en',
      })} />
      <SchemaOrg schema={buildService({
        name: `Digital agency in ${city.name}`,
        url: enBase,
        description: `Complete digital services for ${city.name} companies: website creation and redesign, local SEO, AI agents, automation, corporate AI training.`,
        lang: 'en',
      })} />
      <SchemaOrg schema={buildCourse({
        name: `Corporate AI training in ${city.name}`,
        url: enBase,
        description: `Artificial intelligence training for ${city.name} companies. Claude AI, ChatGPT, prompt engineering and automation. On site or by video call.`,
        duration: 'PT4H',
        teaches: ['Claude AI', 'ChatGPT', 'Prompt engineering', 'Automation'],
        priceFrom: 150,
        lang: 'en',
      })} />

      {/* ── Hero ── */}
      {(() => {
        const heroContent = (
          <section className="pt-28 pb-24 md:pt-36 md:pb-32 lg:pt-40 lg:pb-36 min-h-[70vh] md:min-h-[75vh] flex flex-col justify-center" style={{ color: '#FFFFFF' }}>
            <div className="max-w-[1200px] mx-auto px-5 md:px-6 flex flex-col items-center text-center">
              <nav className="flex items-center justify-center gap-1.5 mb-5 md:mb-6" aria-label="Breadcrumb">
                <Link href={localizedPath('/agence-digitale', 'en')} className="text-xs md:text-sm text-white/70 hover:text-white transition-colors">
                  Digital Agency
                </Link>
                <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.7)' }} />
                <span className="text-xs md:text-sm font-medium">{city.name}</span>
              </nav>
              <div className="max-w-2xl">
                <GradTag className="mb-5">
                  Digital agency in {city.name}
                </GradTag>
                <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-bold tracking-[-0.03em] leading-[1.1] mb-5">
                  Digital agency in{' '}
                  <GradText as="span">{city.name}</GradText>{' '}
                  : websites, SEO, AI and training for SMEs.
                </h1>
                <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.85)' }} data-speakable="true">
                  Website creation and redesign, SEO and GEO, artificial intelligence and corporate training. DKDP supports {city.name} SMEs since 2015. 700+ clients, FADP 2023 compliant.
                </p>
                <HeroPills
                  align="center"
                  items={[
                    { label: `Local ${city.name}`, Icon: MapPin },
                    { label: 'First meeting free', Icon: CalendarCheck },
                    { label: 'No commitment', Icon: CheckCircle2 },
                  ]}
                />
                <div className="flex flex-wrap gap-3 items-center justify-center">
                  <LiquidMetalButton href={localizedPath('/contact', 'en')} size="lg">Free AI audit →</LiquidMetalButton>
                  <Link href={localizedPath('/intelligence-artificielle', 'en')} className="text-sm text-white/75 hover:text-white transition-colors px-2 py-1">
                    Our AI services
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )

        if (city.videoSrc) {
          return (
            <VideoHeroBg videoSrc={city.videoSrc} overlayOpacity={0.65} blob1="rgba(124,58,237,0.10)" blob2="rgba(255,107,0,0.05)">
              {heroContent}
            </VideoHeroBg>
          )
        }

        return (
          <ImageHeroBg imageSrc={city.imageSrc!} overlayOpacity={0.55} blob1="rgba(124,58,237,0.10)" blob2="rgba(255,107,0,0.05)">
            {heroContent}
          </ImageHeroBg>
        )
      })()}

      {/* ── Stats bar ── */}
      <section className="py-10 md:py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { v: '700+', l: 'Clients supported' },
              { v: '10+ yrs', l: 'Of experience' },
              { v: '5/5', l: 'Google rating' },
              { v: city.distance, l: `From ${city.name}` },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold" style={{ color: V }}>{s.v}</p>
                  <p className="text-xs md:text-sm text-text-muted mt-1">{s.l}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI & Automation ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: CH }}>Artificial intelligence</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-text">
            AI agents and automation for {city.name}
          </h2>
          <p className="text-text-secondary text-sm md:text-base mb-10 max-w-2xl">
            DKDP deploys AI agents and automation solutions for {city.name} companies. From a smart chatbot to full workflow automation, we transform your business processes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-10">
            {IA_CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="p-5 md:p-6 rounded-xl border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: CHB, borderColor: CHD }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,212,216,0.08)', border: `1px solid ${CHD}` }}
                  >
                    <cap.Icon size={18} style={{ color: CH }} />
                  </div>
                  <div>
                    <p className="text-text font-semibold text-sm mb-1.5">{cap.title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 md:p-6 rounded-2xl border" style={{ background: CHB, borderColor: CHD }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: CH }}>
              AI use cases in {city.name}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {city.iaUseCases.map((useCase) => (
                <div key={useCase} className="flex items-start gap-3">
                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: CH }} />
                  <p className="text-text-secondary text-sm leading-relaxed">{useCase}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t" style={{ borderColor: CHD }}>
              <p className="text-text-muted text-xs mb-3">Business landscape: {city.economicProfile}</p>
              <Link
                href={localizedPath('/intelligence-artificielle', 'en')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: CH }}
              >
                Discover our AI solutions <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── AI Training ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20 border-t border-border">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: OR }}>AI training</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-5 text-text">
                Artificial intelligence training in {city.name}
              </h2>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
                {city.formationContext}
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { Icon: GraduationCap, text: 'Claude AI, ChatGPT, Gemini, GitHub Copilot' },
                  { Icon: Zap, text: 'Prompt engineering and automation' },
                  { Icon: Users, text: 'From 1 to 10 people, on site or by video call' },
                  { Icon: Building2, text: 'Programme tailored to each company' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ border: `1px solid ${ORD}`, background: ORB }}>
                      <item.Icon size={13} style={{ color: OR }} />
                    </div>
                    <p className="text-text-secondary text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
              <Link
                href={localizedPath('/formation-entreprise/ia', 'en')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: OR }}
              >
                See all our training <ChevronRight size={12} />
              </Link>
            </div>

            <div>
              <FormationPricing lang="en" />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── Complete services ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20 border-t border-border">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: V }}>Our services</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-text">
            Complete digital solutions in {city.name}
          </h2>
          <p className="text-text-secondary text-sm md:text-base mb-10 max-w-xl">
            From AI agents to website creation, DKDP covers all your digital needs for {city.name} companies and the canton of {city.canton}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SERVICES.map(s => (
              <Link
                key={s.href}
                href={localizedPath(s.href, 'en')}
                className="group p-4 md:p-5 rounded-xl border border-border bg-white/[0.02] transition-all hover:-translate-y-0.5 hover:border-violet-500/40 duration-200"
              >
                <p className="text-text font-semibold text-sm mb-1.5 group-hover:opacity-80 transition-opacity">{s.label}</p>
                <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold mt-3 text-text-secondary group-hover:text-violet-400 transition-colors">
                  Learn more <ChevronRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* ── Why trust us ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20 border-t border-border">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: V }}>Local expertise</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-5 text-text">
                Why {city.name} companies trust us
              </h2>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
                {city.localContext}
              </p>
              <div className="space-y-5">
                {[
                  { Icon: Building2, title: 'Business landscape', text: city.economicProfile },
                  { Icon: Users, title: 'Population', text: city.population },
                  { Icon: Globe2, title: 'Proximity', text: city.distance },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ border: `1px solid ${VD}`, background: VB }}>
                      <item.Icon size={14} style={{ color: V }} />
                    </div>
                    <div>
                      <p className="text-text text-sm font-medium">{item.title}</p>
                      <p className="text-text-muted text-xs mt-0.5">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 md:p-6 rounded-2xl border border-violet-500/20 bg-white/[0.02]">
              <h3 className="text-base md:text-lg font-semibold text-text mb-5">What we do for you in {city.name}</h3>
              <ul className="space-y-4">
                {SERVICES.slice(0, 4).map(s => (
                  <li key={s.href}>
                    <Link href={localizedPath(s.href, 'en')} className="group flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 transition-colors" style={{ color: V }} />
                      <div>
                        <p className="text-text text-sm font-medium group-hover:opacity-80 transition-opacity">{s.label}</p>
                        <p className="text-text-muted text-xs mt-0.5 leading-relaxed">{s.desc}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── Intermediate CTA ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-12 md:py-16">
          <div className="p-6 md:p-10 rounded-2xl border border-border bg-white/[0.02] text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-text">
              Ready to automate your company in {city.name}?
            </h2>
            <p className="text-text-secondary text-sm md:text-base mb-6 max-w-md mx-auto">
              15 minutes of free AI audit. We identify your automation opportunities and the potential ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <LiquidMetalButton href={localizedPath('/contact', 'en')} size="lg">Free AI audit →</LiquidMetalButton>
              <a
                href="tel:+41799407969"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-text-secondary border border-border hover:border-violet-500/40 hover:text-text transition-all min-h-[44px]"
              >
                <Phone size={14} /> +41 79 940 79 69
              </a>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── Testimonials ── */}
      <Testimonials lang="en" />

      {/* ── FAQ ── */}
      <FAQSection items={faq} lang="en" title="Frequently asked questions" />

      {/* ── Other cities ── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-12 md:py-16 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: V }}>AI and automation also in</p>
        <div className="flex flex-wrap gap-2">
          {CITIES_EN.filter(c => c.enSlug !== city.enSlug).map(c => (
            <Link
              key={c.enSlug}
              href={`/en/digital-agency/${c.enSlug}`}
              className="px-3.5 py-2 rounded-lg border border-border bg-white/[0.02] text-sm text-text-secondary hover:text-text hover:border-violet-500/40 transition-all"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <LogoBanner lang="en" />
      <CTAFinal lang="en" />
    </main>
  )
}
