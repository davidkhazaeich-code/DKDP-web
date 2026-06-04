import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  ChevronRight,
  MessageCircle,
  Clock,
  Users,
  CalendarCheck,
  Building2,
  Stethoscope,
  Home,
  ShoppingBag,
  Scale,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Activity,
  Sparkles,
  Bell,
  Database,
  Mail,
  Phone,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList, buildWebPageWithSpeakable } from '@/lib/schema'
import { chrome, violet } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS } from '@/components/ui/AppLogos'
import { localizedPath } from '@/i18n/slugs'
const CTAFinal = dynamic(() =>
  import('@/components/sections/CTAFinal').then((m) => ({ default: m.CTAFinal }))
)
const LogoBanner = dynamic(() =>
  import('@/components/sections/LogoBanner').then((m) => ({ default: m.LogoBanner }))
)
const FAQSection = dynamic(() =>
  import('@/components/sections/FAQSection').then((m) => ({ default: m.FAQSection }))
)
const Testimonials = dynamic(() =>
  import('@/components/sections/Testimonials').then((m) => ({ default: m.Testimonials }))
)

export const metadata: Metadata = {
  title: 'AI Chatbot Geneva & French-speaking Switzerland | Claude, GPT-5 | DKDP',
  description:
    'AI chatbot development for SMBs in Geneva: 24/7 support, lead qualification, appointment booking. Powered by Claude (Anthropic), GPT-5. WhatsApp, website and Messenger integration. Deployed in 2 weeks.',
  alternates: {
    canonical: 'https://dkdp.ch/en/artificial-intelligence/ai-chatbot',
    languages: {
      'fr-CH': 'https://dkdp.ch/intelligence-artificielle/chatbot-ia',
      en: 'https://dkdp.ch/en/artificial-intelligence/ai-chatbot',
      'x-default': 'https://dkdp.ch/intelligence-artificielle/chatbot-ia',
    },
  },
  openGraph: {
    title: 'AI Chatbot Geneva & French-speaking Switzerland | Claude, GPT-5 | DKDP',
    description:
      'AI chatbot designed for your business: 24/7 customer support, lead qualification, automatic appointment booking. Engines: Claude Opus 4.7, GPT-5, Gemini 3. DKDP agency, Geneva.',
    url: 'https://dkdp.ch/en/artificial-intelligence/ai-chatbot',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    siteName: 'DKDP',
    images: [{ url: '/images/og/chatbot-ia.png', width: 1376, height: 768, alt: 'Custom AI chatbot Geneva powered by Claude and GPT-5, DKDP agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Chatbot Geneva & French-speaking Switzerland | Claude, GPT-5 | DKDP',
    description:
      "AI chatbot designed for your business: 24/7 support, qualified leads, automatic appointments. From CHF 2'900. DKDP agency, Geneva.",
  },
  keywords: [
    'AI chatbot Geneva',
    'business chatbot Switzerland',
    'Claude chatbot',
    'GPT-5 chatbot',
    'WhatsApp chatbot SMB',
    'sovereign Swiss chatbot',
    'virtual assistant SMB',
    'custom chatbot',
    'DKDP',
  ],
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const FAQ = [
  {
    question: 'Chatbot vs AI agent: what is the difference?',
    answer:
      "A chatbot answers questions within a conversation, usually on your website or WhatsApp. An AI agent goes further: it makes autonomous decisions, executes actions in your tools (CRM, ERP, calendar) and can chain several tasks together. A chatbot that triggers a Zapier workflow effectively becomes an agent. DKDP deploys both depending on your need, on a continuum: we often start with an Essential chatbot and evolve toward an agent as the use cases expand.",
  },
  {
    question: 'Claude or GPT for my chatbot?',
    answer:
      "Claude Opus 4.7 (Anthropic) for chatbots that reason over long documents: contracts, technical FAQs, legal databases, anonymised medical records. The best choice if your clients ask complex questions. GPT-5 (OpenAI) for multimodal chatbots (photos, PDFs, audio): ideal for technical or medical support with attachments. Gemini 3 (Google) if you are already in Google Workspace. All our chatbots are connected to your private knowledge base (RAG) to answer with your own content, never by hallucinating.",
  },
  {
    question: 'Can we use a sovereign Swiss AI for my chatbot?',
    answer:
      "Yes. For regulated sectors (fiduciary, medical, legal, private banking, HR) we offer Infomaniak Euria (Swiss AI hosted in Geneva and Winterthur) or Swisscom Swiss AI Assistant. We can also deploy Mistral Large 2 or Llama 4 self-hosted on a Swiss VPS. The data never leaves the territory. A DPA is systematically signed. Slightly higher cost (roughly +15 to 25%) but FADP 2023 compliance and professional secrecy guaranteed.",
  },
  {
    question: 'How do you integrate the chatbot on WhatsApp?',
    answer:
      "Via the WhatsApp Business API (Twilio or 360dialog). We request a business number in your name, link it to the chatbot, and obtain Meta validation in 2 to 5 days. The chatbot then responds automatically on WhatsApp with your brand identity, handles escalations to your advisors and syncs the conversations into your CRM. Particularly effective for real estate agencies, medical practices and e-commerce stores.",
  },
  {
    question: 'How much does a custom AI chatbot cost?',
    answer:
      "An Essential chatbot starts at CHF 2,900 (answers to frequent questions, website, 2-week deployment). Packages with connection to your business tools (CRM, calendar, ERP) range between CHF 5,500 and CHF 12,000. For multi-channel chatbots with RAG over a large knowledge base, pricing is on quote. Fixed price provided before kickoff, no surprises. Optional monthly maintenance from CHF 250/month.",
  },
  {
    question: 'How long does it take to deploy a chatbot?',
    answer:
      "Between 2 and 5 weeks depending on complexity. An Essential chatbot that answers frequent questions is operational in 2 weeks. An assistant connected to your CRM or booking system (Cal.com, Calendly) takes 4 to 5 weeks. A multi-channel chatbot (website + WhatsApp + Messenger) with RAG over private documentation deploys in 5 to 6 weeks.",
  },
  {
    question: 'Is my customer data protected?',
    answer:
      "Yes. DKDP hosts the chatbots on GDPR-compliant European infrastructure or on a Swiss server (Infomaniak) if your FADP constraints require it. Your data is never used to train third-party models (explicit contractual clause with Anthropic, OpenAI, Google). We explain exactly where your data transits before deployment. A DPA is systematically signed.",
  },
  {
    question: 'Can the chatbot make mistakes or invent answers?',
    answer:
      "Every AI system has limits. That is why DKDP configures each chatbot with guardrails: it answers only from your validated content (RAG with a confidence threshold), and transfers to a human when the question exceeds its scope. We test rigorously before going live with a corpus of 50 to 100 business questions. Hallucinations are reduced to less than 2% on DKDP 2026 use cases.",
  },
  {
    question: 'Who maintains the chatbot after launch?',
    answer:
      "DKDP offers monthly follow-up included in the Pro and Custom packages (3 months included). We analyse the conversations, adjust the answers, add new content based on your feedback. You have nothing technical to manage. Beyond that, ongoing monthly maintenance from CHF 250/month (logs, monitoring, prompt adjustments, adding new FAQs).",
  },
  {
    question: 'Can the chatbot be connected to my existing tools?',
    answer:
      "Yes. Booking calendars (Cal.com, Calendly), CRM (HubSpot, Pipedrive, Salesforce, Zoho), ticketing systems (Zendesk, Intercom), ERP (Bexio, Abacus), internal databases, Google Workspace, Microsoft 365. We adapt to your existing stack without rebuilding everything, via API or n8n/Make webhooks.",
  },
  {
    question: 'How do I see what my chatbot does day to day?',
    answer:
      "Every DKDP chatbot ships with a private, token-protected dashboard: number of conversations, automatic resolution rate, average duration, peak hours and dominant topics, updated continuously. Each session is automatically summarised by Claude Haiku (intent, tone, urgency, next step). The contact details left by visitors (email, phone, request) are extracted automatically and sent to your CRM or by email. You can receive real-time alerts on hot leads or sensitive topics. No client-side installation, accessible from a simple secure link.",
  },
  {
    question: 'How long are conversations retained?',
    answer:
      "By default, conversations are retained for 90 days in a European or Swiss database, then purged automatically. This duration is configurable (30, 60, 90 days, or up to 1 year for regulated sectors). The AI summaries and captured leads can be retained longer in anonymised form to track performance over time. Everything is compliant with FADP 2023 and GDPR, and a DPA is signed before deployment.",
  },
  {
    question: 'Which platforms and CMS is the chatbot compatible with?',
    answer:
      "The chatbot integrates via a simple script to paste into your site, without a rebuild. Compatible with Webflow, WordPress, Shopify, Wix, Squarespace, HubSpot CMS, Framer, as well as custom sites (Next.js, Astro, Laravel, PHP). Installation takes 15 minutes and DKDP handles the integration end to end.",
  },
  {
    question: 'Does the chatbot replace my team?',
    answer:
      "No, and that is not the goal. The chatbot handles repetitive requests and the hours when no one is available. Your team focuses on the high-value exchanges. It is a tool, not a replacement. On DKDP 2026 deployments, support teams free up on average 40 to 60% of their time on level 1 tickets.",
  },
]

const PROBLEMS = [
  {
    Icon: MessageCircle,
    problem: 'The same questions come back every day',
    solution: 'Your chatbot answers common requests instantly: opening hours, pricing, availability, procedures. Your team no longer repeats the same answers.',
    metric: '80%',
    metricLabel: 'of common questions handled automatically',
  },
  {
    Icon: Clock,
    problem: 'You lose clients outside business hours',
    solution: 'A prospect who asks a question at 10 pm gets an immediate answer. They do not go elsewhere. The chatbot qualifies the lead and passes it to you the next morning, ready to be contacted.',
    metric: '24/7',
    metricLabel: 'availability at no extra cost',
  },
  {
    Icon: Users,
    problem: 'Onboarding new clients takes too much time',
    solution: 'The chatbot guides each new client through your steps: documents to provide, forms to fill in, appointments to book. Your onboarding becomes smooth and self-service.',
    metric: '-60%',
    metricLabel: 'of time spent on onboarding',
  },
  {
    Icon: CalendarCheck,
    problem: 'Booking appointments creates back-and-forth',
    solution: 'The chatbot directly offers your available slots and confirms the booking. No more coordination emails, no more "When are you available?".',
    metric: '3x',
    metricLabel: 'more appointments booked after hours',
  },
]

const STEPS = [
  {
    num: 1,
    title: 'Discovery of your business',
    desc: 'We analyse your current client interactions: which questions come back, which processes take time, where a chatbot would have the most impact. You have nothing to prepare.',
    duration: '1 to 2 days',
  },
  {
    num: 2,
    title: 'Design and writing',
    desc: 'We define the chatbot personality, its limits, its answers. We write the content from your documents and your expertise. You validate before any implementation.',
    duration: '3 to 5 days',
  },
  {
    num: 3,
    title: 'Development and testing',
    desc: 'We build the chatbot, connect it to your tools if needed, and test it with real scenarios. You get access to a test version to validate.',
    duration: '1 to 3 weeks',
  },
  {
    num: 4,
    title: 'Deployment and follow-up',
    desc: 'Go-live on your site or your channels. We monitor the first conversations, adjust what needs to be, and train you to read the statistics.',
    duration: '2 to 3 days',
  },
]

const INDUSTRIES = [
  {
    Icon: Scale,
    title: 'Fiduciaries and law firms',
    scenario: 'Your clients regularly ask which documents are needed to set up a company, the filing deadlines or the status of their file. The chatbot answers instantly and sends the right forms.',
    example: '"Which documents do I need to create an LLC?" -> Answer + link to the onboarding form',
  },
  {
    Icon: Stethoscope,
    title: 'Medical and dental practices',
    scenario: 'Patients call to book appointments, check opening hours or ask pre-consultation questions. The chatbot handles appointment booking and practical information, even on weekends.',
    example: '"I would like an appointment for a scaling" -> Slot proposal + automatic confirmation',
  },
  {
    Icon: Home,
    title: 'Real estate agencies',
    scenario: 'Prospects want information about a property, to check availability or to schedule a viewing. The chatbot qualifies the lead (budget, neighbourhood, surface) and offers a slot with the right agent.',
    example: '"Do you have any 3-room flats in Eaux-Vives?" -> Filtering + property presentation + appointment booking',
  },
  {
    Icon: ShoppingBag,
    title: 'Retail and e-commerce',
    scenario: 'Your clients ask about opening hours, the availability of a product or the tracking of their order. The chatbot answers in real time and redirects to the purchase or the booking.',
    example: '"Is the dress available in size M?" -> Stock check + direct link to the product',
  },
  {
    Icon: Building2,
    title: 'Service SMBs (accounting, consulting, coaching)',
    scenario: 'Your prospects hesitate and ask questions before getting in touch. The chatbot presents your offers, answers common objections and proposes a discovery call.',
    example: '"What is the difference between your packages?" -> Clear comparison + CTA to a free call',
  },
]

const OFFERS = [
  {
    name: 'Essential',
    price: '2\'900',
    desc: 'For businesses that want to answer frequent questions without tying up their team.',
    features: [
      'Chatbot on your website',
      'Up to 50 configured question-answer pairs',
      'Design integrated into your brand identity',
      'Transfer to email if the question is complex',
      'Activity dashboard (conversations and statistics)',
      '1 month of follow-up included',
    ],
    recommended: false,
  },
  {
    name: 'Pro',
    price: '5\'500',
    desc: 'For businesses that want to automate appointment booking and qualify their leads.',
    features: [
      'Everything included in Essential',
      'Connection to your booking calendar',
      'Automatic lead qualification with contact extraction',
      'Custom knowledge base (FAQ, products, procedures)',
      'Advanced dashboard: AI summary per session, top intents, captured leads',
      'Email alerts for hot leads',
      '3 months of follow-up and adjustments included',
    ],
    recommended: true,
  },
  {
    name: 'Custom',
    price: 'On quote',
    desc: 'For businesses with specific needs: CRM, database, multi-channel, multilingual.',
    features: [
      'Everything included in Pro',
      'Connected to your existing tools (CRM, ERP, ticketing)',
      'Multi-channel deployment on quote (website, WhatsApp Business, Messenger)',
      'Multilingual chatbot (FR, EN, DE)',
      'Advanced business logic and custom workflows',
      'Bespoke dashboard and automated exports',
      'Ongoing follow-up and monthly evolution',
    ],
    recommended: false,
  },
]

const color = chrome.color
const bg = chrome.bg
const bd = chrome.border

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function ChatbotIAPage() {
  return (
    <main>
      {/* ── Schema.org ── */}
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'Custom AI chatbot Geneva & French-speaking Switzerland',
          url: '/en/artificial-intelligence/ai-chatbot',
          description:
            'Design and deployment of custom AI chatbots for SMBs in Geneva and French-speaking Switzerland. Powered by Claude Opus 4.7 (Anthropic), GPT-5 (OpenAI) or Gemini 3 (Google). WhatsApp Business, website and Messenger integration. RAG over a private knowledge base. FADP 2023 compliant, Swiss hosting available.',
          serviceType: 'Custom AI chatbot development',
          priceFrom: 2900,
          priceSpecDescription: "From CHF 2'900 for an Essential chatbot deployed in 2 weeks",
          lang: 'en',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: 'https://dkdp.ch/en' },
          { name: 'Artificial Intelligence', url: 'https://dkdp.ch/en/artificial-intelligence' },
          { name: 'AI chatbot', url: 'https://dkdp.ch/en/artificial-intelligence/ai-chatbot' },
        ])}
      />
      <SchemaOrg
        schema={buildWebPageWithSpeakable({
          name: 'Custom AI chatbot for businesses in French-speaking Switzerland',
          url: '/en/artificial-intelligence/ai-chatbot',
          description: 'DKDP designs and deploys custom AI chatbots for SMBs in Geneva. 24/7 customer support, lead qualification, automatic appointment booking. From CHF 2900, deployed in 2 to 5 weeks.',
          lang: 'en',
        })}
      />
      {/* Structured pricing for rich snippets */}
      <SchemaOrg
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Custom AI chatbot',
          description: 'AI chatbot designed and deployed for your business. 24/7 customer support, lead qualification, automatic appointment booking.',
          image: 'https://dkdp.ch/images/og/chatbot-ia.png',
          brand: { '@type': 'Brand', name: 'DKDP' },
          category: 'AI chatbot development service',
          url: 'https://dkdp.ch/en/artificial-intelligence/ai-chatbot',
          offers: [
            {
              '@type': 'Offer',
              name: 'Essential chatbot',
              price: '2900',
              priceCurrency: 'CHF',
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
              description: 'FAQ chatbot for website, 50 question-answer pairs, 1 month of follow-up',
              url: 'https://dkdp.ch/en/artificial-intelligence/ai-chatbot#offres',
              seller: { '@type': 'Organization', name: 'DKDP', url: 'https://dkdp.ch' },
              areaServed: { '@type': 'Country', name: 'Switzerland' },
            },
            {
              '@type': 'Offer',
              name: 'Pro chatbot',
              price: '5500',
              priceCurrency: 'CHF',
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
              description: 'Chatbot with calendar, lead qualification, 3 months of follow-up',
              url: 'https://dkdp.ch/en/artificial-intelligence/ai-chatbot#offres',
              seller: { '@type': 'Organization', name: 'DKDP', url: 'https://dkdp.ch' },
              areaServed: { '@type': 'Country', name: 'Switzerland' },
            },
            {
              '@type': 'Offer',
              name: 'Custom chatbot',
              price: '8000',
              priceCurrency: 'CHF',
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: '8000',
                priceCurrency: 'CHF',
                description: 'From CHF 8,000, on quote',
              },
              description: 'Multi-channel, multilingual chatbot, connected to CRM/ERP, ongoing follow-up. On quote.',
              url: 'https://dkdp.ch/en/artificial-intelligence/ai-chatbot#offres',
              seller: { '@type': 'Organization', name: 'DKDP', url: 'https://dkdp.ch' },
              areaServed: { '@type': 'Country', name: 'Switzerland' },
            },
          ],
        }}
      />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(212,212,216,0.12)" blob2="rgba(212,212,216,0.06)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link
                href={localizedPath('/intelligence-artificielle', 'en')}
                className="text-text-muted text-sm hover:text-text transition-colors"
              >
                Artificial Intelligence
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>
                AI chatbot
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Custom AI chatbot Geneva & French-speaking Switzerland</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Not a generic chatbot. An assistant that <GradText as="span">knows your business</GradText>.
                </p>
                <p data-speakable className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP designs custom AI chatbots for SMBs in Geneva and French-speaking Switzerland.
                  Not a generic widget: an intelligent virtual assistant designed for your business, your questions
                  and your clients. Deployed on your site in 2 to 5 weeks, from CHF 2&apos;900.
                </p>
                <HeroPills
                  accentRgb="212, 212, 216"
                  items={[
                    { label: 'POC in 2 to 3 weeks', Icon: Clock },
                    { label: 'Swiss or EU data', Icon: ShieldCheck },
                    { label: 'WhatsApp or Web', Icon: MessageCircle },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href={localizedPath('/contact', 'en') + '?service=chatbot-ia'} size="lg">
                    Discuss my project<span aria-hidden="true"> →</span>
                  </LiquidMetalButton>
                  <Link
                    href="#comment-ca-marche"
                    className="text-sm text-text-muted hover:text-text transition-colors"
                  >
                    How it works ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Offer updated: April 2026</p>
              </div>

              {/* Chat mockup */}
              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="AI models we integrate into your chatbots">
                  <AppLogoMarquee
            logos={IA_LOGOS}
            durationSeconds={126}
            size="md"
          />
                </div>
                <div
                  className="relative w-full rounded-2xl p-6 space-y-4"
                  style={{
                    background: 'rgba(212,212,216,0.04)',
                    border: `1px solid ${bd}`,
                    boxShadow: '0 0 60px rgba(212,212,216,0.08)',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-4" style={{ borderBottom: `1px solid ${bd}` }}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: bg }}
                    >
                      <MessageCircle size={14} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-text text-sm font-semibold">Your Company Assistant</p>
                      <p className="text-text-muted text-xs">Online</p>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>

                  {/* Messages */}
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-white/[0.07] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[75%]">
                        <p className="text-sm text-text">
                          Hello, what are your opening hours this week?
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div
                        className="rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]"
                        style={{ background: bg, border: `1px solid ${bd}` }}
                      >
                        <p className="text-sm text-text-secondary">
                          Hello! We are open Monday to Friday from 9 am to 6 pm.
                          Would you like to book an appointment? I can offer you a slot
                          directly.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-white/[0.07] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[75%]">
                        <p className="text-sm text-text">Yes, Thursday afternoon if possible</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div
                        className="rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]"
                        style={{ background: bg, border: `1px solid ${bd}` }}
                      >
                        <p className="text-sm text-text-secondary">
                          Thursday 2 pm or 4 pm are available. Which one suits you?
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ background: 'rgba(212,212,216,0.10)', color, border: `1px solid ${bd}` }}
                          >
                            Thursday 2 pm
                          </span>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ background: 'rgba(212,212,216,0.10)', color, border: `1px solid ${bd}` }}
                          >
                            Thursday 4 pm
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div
                    className="flex items-center gap-3 pt-3 mt-2"
                    style={{ borderTop: `1px solid ${bd}` }}
                  >
                    <div className="flex-1 bg-white/[0.04] rounded-full px-4 py-2.5">
                      <p className="text-text-muted text-sm">Write your message...</p>
                    </div>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: bg, border: `1px solid ${bd}` }}
                    >
                      <ArrowRight size={14} style={{ color }} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>      </HeroBg>





      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '24/7', l: 'Availability', sub: 'At no extra cost' },
              { v: '2-5 wks', l: 'Deployment time', sub: 'Turnkey' },
              { v: '80%', l: 'Questions automated', sub: 'From the first month' },
              { v: 'CHF 2\'900', l: 'Starting from', sub: 'Fixed quote, no surprises' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1 text-text">
                    {s.v}
                  </p>
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
          { label: 'Benefits', href: '#benefices' },
          { label: 'AI model', href: '#modele-ia' },
          { label: 'Process', href: '#comment-ca-marche' },
          { label: 'Insights', href: '#pilotage' },
          { label: 'Use cases', href: '#cas-usage' },
          { label: 'Pricing', href: '#offres' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Discuss the project', href: localizedPath('/contact', 'en') + '?service=chatbot-ia' }}
        accentColor="#D4D4D8"
        accentBg="rgba(212,212,216,0.12)"
        accentBorder="rgba(212,212,216,0.25)"
      />

      {/* ── Problemes / Benefices ── */}
      <section id="benefices" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">The problem you know</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Why an AI chatbot changes everything for your website
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROBLEMS.map((item, i) => (
              <SectionReveal key={item.problem} delay={i * 0.08}>
                <div
                  className="rounded-xl p-6 h-full"
                  style={{ background: 'rgba(212,212,216,0.04)', border: `1px solid ${bd}` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: bg }}
                    >
                      <item.Icon size={18} style={{ color }} />
                    </div>
                    <p className="text-2xl font-bold" style={{ color }}>
                      {item.metric}
                    </p>
                    <p className="text-text-muted text-xs flex-1">{item.metricLabel}</p>
                  </div>
                  <p className="text-text font-semibold mb-2">{item.problem}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.solution}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modèle IA (GEO : entités LLM nommées) ── */}
      <section id="modele-ia" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">AI engine</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto mb-4">
                Which AI model for your chatbot?
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
                We choose the AI engine based on your business constraints, budget and data sovereignty. All our chatbots run in RAG mode over your private knowledge base, never by hallucinating.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: 'Claude Opus 4.7',
                provider: 'Anthropic',
                accentColor: violet.color,
                accentBg: 'rgba(167,139,250,0.08)',
                accentBorder: 'rgba(167,139,250,0.22)',
                pitch: 'Long-context reasoning, large documents, legal or technical analysis.',
                useCase: 'Fiduciary, legal, level 2 technical support',
              },
              {
                name: 'GPT-5',
                provider: 'OpenAI',
                accentColor: chrome.color,
                accentBg: 'rgba(212,212,216,0.06)',
                accentBorder: 'rgba(212,212,216,0.18)',
                pitch: 'Multimodal: text, image, voice. Attachments handled natively.',
                useCase: 'Technical and medical support with attachments, e-commerce',
              },
              {
                name: 'Gemini 3',
                provider: 'Google',
                accentColor: '#60a5fa',
                accentBg: 'rgba(96,165,250,0.06)',
                accentBorder: 'rgba(96,165,250,0.20)',
                pitch: 'Native integration with Google Workspace, Gmail, Drive, Docs.',
                useCase: 'Teams already 100% Google, HR onboarding',
              },
              {
                name: 'Infomaniak Euria',
                provider: 'Sovereign Swiss AI',
                accentColor: '#4ade80',
                accentBg: 'rgba(74,222,128,0.06)',
                accentBorder: 'rgba(74,222,128,0.20)',
                pitch: 'Hosted 100% in Switzerland (Geneva, Winterthur). FADP 2023 by default.',
                useCase: 'Regulated sectors: medical, legal, private banking, HR',
              },
            ].map((m, i) => (
              <SectionReveal key={m.name} delay={i * 0.08}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-6"
                  style={{ background: m.accentBg, borderColor: m.accentBorder }}
                >
                  <div className="mb-3">
                    <p className="text-text font-bold text-base">{m.name}</p>
                    <p className="text-[11px] uppercase tracking-wider mt-0.5" style={{ color: m.accentColor }}>
                      {m.provider}
                    </p>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">{m.pitch}</p>
                  <div className="pt-3 border-t" style={{ borderColor: m.accentBorder }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: m.accentColor }}>
                      Ideal for
                    </p>
                    <p className="text-text-muted text-xs leading-relaxed">{m.useCase}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <p className="text-text-muted text-sm text-center mt-8 max-w-2xl mx-auto leading-relaxed">
              We also offer <strong className="text-text">Mistral Large 2</strong> and <strong className="text-text">Llama 4</strong> self-hosted on a Swiss server when sovereignty is contractual. To compare the consumer models, read our guide{' '}
              <Link href={localizedPath('/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026', 'en')} className="underline hover:text-text transition-colors">
                ChatGPT, Claude or Copilot for your SMB
              </Link>
              .
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── ROI Visual ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Measurable impact</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4">
                ROI of a smart chatbot: results from the first month
              </h2>
              <p data-speakable className="text-text-secondary text-lg max-w-2xl mx-auto">
                A well-designed AI chatbot does not replace your team. It absorbs 80% of
                the repetitive requests so that your staff can focus on the
                high-value interactions. Geneva SMBs that deploy a
                DKDP chatbot see on average 60% reduction in onboarding time
                and 24/7 client availability at no extra cost.
              </p>
            </div>
          </SectionReveal>

          {/* Inline HTML bar chart: before/after */}
          <SectionReveal delay={0.1}>
            <div
              className="rounded-xl p-6 md:p-8 max-w-3xl mx-auto"
              style={{ background: violet.bg, border: `1px solid ${violet.border}` }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-[0.12em] mb-6"
                style={{ color: violet.color }}
              >
                Before / After chatbot
              </p>
              <div className="space-y-6">
                {[
                  { label: 'Repetitive questions handled manually', before: 100, after: 20, unit: '%' },
                  { label: 'Average response time', before: 100, after: 12, unit: '', beforeLabel: '4h', afterLabel: '< 30 min' },
                  { label: 'Leads lost outside business hours', before: 35, after: 5, unit: '%' },
                ].map((row) => (
                  <div key={row.label}>
                    <p className="text-text-secondary text-sm mb-2">{row.label}</p>
                    <div className="space-y-1.5">
                      {/* Before bar */}
                      <div className="flex items-center gap-3">
                        <span className="text-text-muted text-xs w-12 flex-shrink-0">Before</span>
                        <div className="flex-1 h-4 rounded-full bg-white/[0.04] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${row.before}%`,
                              background: 'rgba(239,68,68,0.4)',
                              minWidth: '8%',
                            }}
                          />
                        </div>
                        <span className="text-text-muted text-xs w-16 text-right flex-shrink-0">
                          {row.beforeLabel ?? `${row.before}${row.unit}`}
                        </span>
                      </div>
                      {/* After bar */}
                      <div className="flex items-center gap-3">
                        <span className="text-text-muted text-xs w-12 flex-shrink-0">After</span>
                        <div className="flex-1 h-4 rounded-full bg-white/[0.04] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${row.after}%`,
                              background: 'rgba(124,58,237,0.6)',
                              minWidth: '4%',
                            }}
                          />
                        </div>
                        <span className="text-xs w-16 text-right flex-shrink-0" style={{ color: violet.color }}>
                          {row.afterLabel ?? `${row.after}${row.unit}`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Comment ca marché ── */}
      <section
        id="comment-ca-marche"
        className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Our method</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                You have nothing technical to do.
              </h2>
              <p data-speakable className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
                From the discovery of your business through to going live, DKDP manages
                the entire project from our offices in Geneva. You validate at every
                step, we execute. Average timeline: 2 to 5 weeks.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <SectionReveal key={step.num} delay={i * 0.1}>
                <div className="relative h-full">
                  {/* Connector line (hidden on last) */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-6 h-px" style={{ background: bd }} />
                  )}
                  <div
                    className="rounded-xl p-6 h-full"
                    style={{ background: 'rgba(212,212,216,0.04)', border: `1px solid ${bd}` }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-4"
                      style={{ background: bg, color, border: `1px solid ${bd}` }}
                    >
                      {step.num}
                    </div>
                    <h3 className="text-text font-semibold mb-2">{step.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-3">{step.desc}</p>
                    <p className="text-text-muted text-xs" style={{ color }}>
                      {step.duration}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Inline timeline chart: typical project */}
          <SectionReveal delay={0.4}>
            <div
              className="mt-12 rounded-xl p-6"
              style={{ background: violet.bg, border: `1px solid ${violet.border}` }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-[0.12em] mb-5"
                style={{ color: violet.color }}
              >
                Typical timeline of a chatbot project
              </p>
              <div className="flex flex-col sm:flex-row gap-0">
                {[
                  { label: 'Discovery', weeks: 'Week 1', opacity: 0.3 },
                  { label: 'Design', weeks: 'Weeks 1-2', opacity: 0.45 },
                  { label: 'Development', weeks: 'Weeks 2-4', opacity: 0.65 },
                  { label: 'Deployment', weeks: 'Weeks 4-5', opacity: 0.85 },
                ].map((phase, i) => (
                  <div key={phase.label} className="flex-1 relative">
                    <div
                      className="h-2 sm:h-3"
                      style={{
                        background: `rgba(124,58,237,${phase.opacity})`,
                        borderRadius: i === 0 ? '6px 0 0 6px' : i === 3 ? '0 6px 6px 0' : '0',
                      }}
                    />
                    <div className="mt-2 sm:mt-3">
                      <p className="text-text text-xs font-semibold">{phase.label}</p>
                      <p className="text-text-muted text-[10px]">{phase.weeks}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-text-muted text-xs mt-4">
                Average total duration: 2 to 5 weeks depending on complexity. You validate at every step.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Pilotage & données : dashboard + extraction auto ── */}
      <section id="pilotage" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Insights and data</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                You see everything your chatbot does. <GradText as="span">In real time.</GradText>
              </h2>
              <p data-speakable className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                Every conversation is logged, summarised by AI and indexed. A private
                dashboard gives you access to activity statistics, captured leads and the
                detected trends. No installation, no technical handling.
              </p>
            </div>
          </SectionReveal>

          {/* 4 features cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              {
                Icon: Activity,
                title: 'Activity dashboard',
                desc: 'Active conversations, automatic resolution rate, peak hours, average duration, dominant topics. Updated continuously.',
              },
              {
                Icon: Sparkles,
                title: 'AI summary per session',
                desc: 'Each exchange is summarised by Claude Haiku: visitor intent, tone, level of urgency, recommended next step.',
              },
              {
                Icon: Database,
                title: 'Automatic contact extraction',
                desc: 'Email, phone, name, request, context: extracted without a form, sent in real time to your CRM or by email.',
              },
              {
                Icon: Bell,
                title: 'Smart alerts',
                desc: 'Immediate notification when a hot lead is qualified, a sensitive topic appears or a VIP client enters a conversation.',
              },
            ].map((f, i) => (
              <SectionReveal key={f.title} delay={i * 0.08}>
                <div
                  className="rounded-xl p-6 h-full"
                  style={{ background: 'rgba(212,212,216,0.04)', border: `1px solid ${bd}` }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: bg }}
                  >
                    <f.Icon size={18} style={{ color }} />
                  </div>
                  <h3 className="text-text font-semibold mb-2">{f.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Mockup dashboard */}
          <SectionReveal delay={0.2}>
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(212,212,216,0.03)',
                border: `1px solid ${bd}`,
                boxShadow: '0 0 60px rgba(212,212,216,0.05)',
              }}
            >
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: `1px solid ${bd}` }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: bg }}
                  >
                    <Activity size={16} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-text font-semibold text-sm">Chatbot dashboard</p>
                    <p className="text-text-muted text-xs">Last 7 days · private access</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-text-muted text-xs">Live data</span>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { v: '247', l: 'Conversations', sub: '+18% vs week -1' },
                  { v: '82%', l: 'Auto resolution', sub: 'without human intervention' },
                  { v: '31', l: 'Qualified leads', sub: '12 sent to CRM' },
                  { v: '1m 24s', l: 'Average duration', sub: 'per session' },
                ].map((k) => (
                  <div
                    key={k.l}
                    className="rounded-lg p-4"
                    style={{ background: 'rgba(212,212,216,0.04)', border: `1px solid ${bd}` }}
                  >
                    <p className="text-2xl font-bold text-text mb-1">{k.v}</p>
                    <p className="text-text-secondary text-xs font-semibold">{k.l}</p>
                    <p className="text-text-muted text-[11px] mt-0.5">{k.sub}</p>
                  </div>
                ))}
              </div>

              {/* 2-column body */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top intentions */}
                <div
                  className="rounded-lg p-5"
                  style={{ background: 'rgba(212,212,216,0.04)', border: `1px solid ${bd}` }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-4" style={{ color }}>
                    Top detected intents
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: 'Quote request', pct: 38 },
                      { label: 'Appointment booking', pct: 27 },
                      { label: 'Pricing question', pct: 18 },
                      { label: 'Product support', pct: 12 },
                      { label: 'Other', pct: 5 },
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-text-secondary text-xs">{row.label}</span>
                          <span className="text-text-muted text-xs">{row.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${row.pct}%`, background: chrome.color, opacity: 0.7 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent leads */}
                <div
                  className="rounded-lg p-5"
                  style={{ background: 'rgba(212,212,216,0.04)', border: `1px solid ${bd}` }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-4" style={{ color }}>
                    Recently captured leads
                  </p>
                  <div className="space-y-3">
                    {[
                      { name: 'Sophie B.', intent: 'E-commerce site quote', via: Mail, meta: 'sophie.b@…' },
                      { name: 'Marc D.', intent: 'AI consultation booking', via: Phone, meta: '+41 79 …' },
                      { name: 'Laura M.', intent: 'Pro chatbot pricing', via: Mail, meta: 'laura.m@…' },
                      { name: 'Jean P.', intent: 'SEO audit', via: Mail, meta: 'jean.p@…' },
                    ].map((lead) => (
                      <div
                        key={lead.name}
                        className="flex items-center gap-3 pb-3"
                        style={{ borderBottom: `1px solid rgba(212,212,216,0.06)` }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: bg }}
                        >
                          <lead.via size={13} style={{ color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-text text-sm font-medium truncate">{lead.name}</p>
                          <p className="text-text-muted text-xs truncate">{lead.intent}</p>
                        </div>
                        <span className="text-text-muted text-[11px] truncate hidden sm:inline-block max-w-[110px]">
                          {lead.meta}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-text-muted text-xs text-center mt-6">
                Dashboard protected by token, access limited to your team. European
                or Swiss hosting, compliant with FADP 2023 and GDPR. Conversation
                retention configurable (30, 60 or 90 days by default).
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Cas d'usage / Industries ── */}
      <section id="cas-usage" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Concrete use cases</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                AI chatbot by sector: fiduciary, medical, real estate
              </h2>
              <p data-speakable className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
                Every DKDP chatbot is designed for a specific business: fiduciaries, medical
                practices, real estate agencies, retail and service SMBs in Geneva. Here is
                how it fits concretely into these sectors.
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-4">
            {INDUSTRIES.map((ind, i) => (
              <SectionReveal key={ind.title} delay={i * 0.06}>
                <div
                  className="rounded-xl p-6 grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-6 items-start"
                  style={{ background: 'rgba(212,212,216,0.03)', border: `1px solid ${bd}` }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: bg }}
                  >
                    <ind.Icon size={22} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="text-text font-semibold mb-2">{ind.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{ind.scenario}</p>
                  </div>
                  <div
                    className="rounded-lg px-4 py-3"
                    style={{ background: 'rgba(212,212,216,0.05)', border: `1px solid rgba(212,212,216,0.10)` }}
                  >
                    <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">
                      Example conversation
                    </p>
                    <p className="text-text-secondary text-sm italic leading-relaxed">
                      {ind.example}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offres / Pricing ── */}
      <section
        id="offres"
        className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Our packages</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Business AI chatbot pricing: 3 packages
              </h2>
              <p data-speakable className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
                Fixed quote in CHF, no surprises. Each package includes design,
                development and deployment by our team in Geneva. Payment in 3 instalments available.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFERS.map((offer, i) => (
              <SectionReveal key={offer.name} delay={i * 0.1}>
                <div
                  className="rounded-xl p-6 h-full flex flex-col relative"
                  style={{
                    background: offer.recommended
                      ? 'rgba(212,212,216,0.07)'
                      : 'rgba(212,212,216,0.03)',
                    border: `1px solid ${offer.recommended ? 'rgba(212,212,216,0.30)' : bd}`,
                  }}
                >
                  {offer.recommended && (
                    <div
                      className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: color, color: '#09090B' }}
                    >
                      Recommended
                    </div>
                  )}
                  <h3 className="text-text text-xl font-bold mb-1">{offer.name}</h3>
                  <p className="mb-4">
                    <span className="text-3xl font-bold" style={{ color }}>
                      {offer.price.startsWith('On') ? '' : 'CHF '}
                      {offer.price}
                    </span>
                    {!offer.price.startsWith('On') && (
                      <span className="text-text-muted text-sm ml-1">excl. VAT</span>
                    )}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">{offer.desc}</p>
                  <ul className="space-y-2.5 flex-1">
                    {offer.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                        <span className="text-text-secondary text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      href={localizedPath('/contact', 'en') + '?service=chatbot-ia'}
                      className="block w-full text-center py-3 rounded-lg text-sm font-semibold transition-all duration-150 hover:opacity-90"
                      style={{
                        background: offer.recommended ? color : 'transparent',
                        color: offer.recommended ? '#09090B' : color,
                        border: offer.recommended ? 'none' : `1px solid ${bd}`,
                      }}
                    >
                      {offer.price.startsWith('On') ? 'Request a quote' : 'Choose this package'}
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <p className="text-text-muted text-sm text-center mt-8">
              All prices are in CHF and exclude VAT. Payment in 3 instalments available. Custom
              quote within 48 hours.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials lang="en" />

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Questions about our AI chatbots" lang="en" />
      </div>

      {/* ── CTA Final ── */}
      <CTAFinal lang="en" />
    </main>
  )
}
