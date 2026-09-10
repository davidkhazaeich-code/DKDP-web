import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2, Clock, Users, Award, ChevronRight,
  BrainCircuit, Zap, FileText, Code2, Layers,
  MessageSquare, Database, Shield, ShieldCheck,
  Sparkles, BookOpen, SlidersHorizontal, Wand2, Target,
  MousePointerClick, Building2, Headphones,
  Briefcase, TrendingUp, ShoppingCart, UserCog, DollarSign,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => m.Testimonials))
const CircularTestimonialsLazy = dynamic(() => import('@/components/ui/circular-testimonials').then(m => m.CircularTestimonials))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))
const ROICalculatorFormation = dynamic(() => import('@/components/sections/ROICalculatorFormation').then(m => ({ default: m.ROICalculatorFormation })))
const ArticleCarousel = dynamic(() => import('@/components/sections/ArticleCarousel').then(m => ({ default: m.ArticleCarousel })))
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { getArticlesByTopic, countArticlesByTopic, CHATGPT_TOPIC } from '@/lib/blog/topics'
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { violet, orange, chrome, green, blue, pink, teal } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS } from '@/components/ui/AppLogos'
import { localizedPath } from '@/i18n/slugs'
/* Composants bilingues partages avec la page FR (prop `lang`), pattern des
   composants Figma : pas de copie EN, comme le hub EN qui importe deja
   HeroVisual et ProgressionDiagram depuis le hub FR. */
import { ChatGptProductCard } from '@/app/formation-entreprise/chatgpt/_components/ChatGptProductCard'
import { AgendaRow } from '@/app/formation-entreprise/chatgpt/_components/AgendaRow'
import { CapabilityCard } from '@/app/formation-entreprise/chatgpt/_components/CapabilityCard'
import { UseCaseCard } from '@/app/formation-entreprise/chatgpt/_components/UseCaseCard'
import { AstraAvailability } from '@/app/formation-entreprise/chatgpt/_components/AstraAvailability'
import { ToolComparison } from '@/app/formation-entreprise/chatgpt/_components/ToolComparison'
import { AstraHeroCard } from '@/app/formation-entreprise/chatgpt/_components/AstraHeroCard'
import { LeadFormInlineChatGpt } from '@/app/formation-entreprise/chatgpt/_components/LeadFormInlineChatGpt'
import { GalleryFormationChatGpt } from '@/app/formation-entreprise/chatgpt/_components/GalleryFormationChatGpt'

export const metadata: Metadata = {
  title: 'ChatGPT Astra training Geneva & Switzerland | DKDP',
  description:
    'ChatGPT Astra (GPT-6) training for companies in Geneva and French-speaking Switzerland. ChatGPT Work, GPTs, Codex and data protection on your real cases. One tailored day.',
  alternates: {
    canonical: 'https://dkdp.ch/en/corporate-training/chatgpt',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/chatgpt',
      en: 'https://dkdp.ch/en/corporate-training/chatgpt',
      'x-default': 'https://dkdp.ch/formation-entreprise/chatgpt',
    },
  },
  openGraph: {
    url: 'https://dkdp.ch/en/corporate-training/chatgpt',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/formation-chatgpt.png', width: 1376, height: 768, alt: 'ChatGPT Astra training Geneva DKDP' }],
  },
  twitter: {
    images: ['/images/og/formation-chatgpt.png'],
  },
}

/* ─────────────────────────────────────────────
   Design tokens (source : @/lib/tokens)
───────────────────────────────────────────── */
const V = violet.color, VB = violet.bg, VD = violet.border
const OR = orange.color, ORB = orange.bg, ORD = orange.border
const CH = chrome.color, CHB = chrome.bg, CHD = chrome.border
const GR = green.color, GRB = green.bg, GRD = green.border

/** Number of cards rendered in the watch carousel. */
const WATCH_MAX_CARDS = 12

const CONTACT = localizedPath('/contact', 'en')
const HUB = localizedPath('/formation-entreprise', 'en')
const AI_TRAINING = localizedPath('/formation-entreprise/ia', 'en')
const CLAUDE_TRAINING = localizedPath('/formation-entreprise/claude-ai', 'en')

/* ─────────────────────────────────────────────
   FAQ
   `links` are not part of the FAQPage schema: they are rendered under the
   answer for internal linking (AI training, Claude training).
───────────────────────────────────────────── */
const FAQ: { question: string; answer: string; links?: { label: string; href: string }[] }[] = [
  {
    question: 'Does the training cover ChatGPT Astra (GPT-6)?',
    answer:
      'Yes. The programme has been updated for ChatGPT Astra (GPT-6), unveiled on 3 September 2026 and opened to paying subscribers from 4 September. You learn what Astra changes in practice: a model that acts, in a browser, in forms, all the way to a finished document, instead of only answering, ChatGPT Work for long missions and Codex for code. As the roll-out is still staggered on 10 September, we check at the start of the session what each account actually sees.',
  },
  {
    question: 'Do we need a Plus or Pro plan to follow the training?',
    answer:
      'A ChatGPT account is enough for the method, but Astra is not in the same place on every plan: absent from Free and Go (GPT-5.6 Luna), limited to ChatGPT Work and Codex on Plus (the chat stays on GPT-5.6 Sol), available in the chat on Pro under the name GPT-6 Pro with a weekly message cap, and everywhere on Business and Enterprise. It is the first thing we settle in training, so that nobody pays for Pro when Sol is enough.',
  },
  {
    question: 'What is the difference with the general AI training and the Claude training?',
    answer:
      'The general AI training compares ChatGPT Astra, Claude and Copilot and picks the tool that fits your stack. The Claude training is the specialisation on Claude, our recommendation for analysis, depth and confidentiality. This training is the ChatGPT specialisation: Astra, ChatGPT Work, GPTs and Codex, on your real cases. If you hesitate, we decide together during the preliminary briefing.',
    links: [
      { label: 'General AI training', href: AI_TRAINING },
      { label: 'Claude AI training', href: CLAUDE_TRAINING },
    ],
  },
  {
    question: 'What does Astra change compared with GPT-5.6 Sol?',
    answer:
      'Astra replaces GPT-5.6 Sol as OpenAI\'s flagship model. It drives a computer and a browser, chains steps on its own and produces finished documents, with a 1 million token context. OpenAI reports it close to 2x faster than Sol at computer use and measures a hallucination rate of 4.2% against 12.2% for Sol. These scores come from OpenAI and have not been independently replicated: in training, we check them on your own tasks.',
  },
  {
    question: 'Is our data protected with ChatGPT?',
    answer:
      'With ChatGPT Business and Enterprise, your conversations are not used to train the models and the administrator controls the workspace settings. The data and privacy module of the day fixes what never goes into ChatGPT (client, patient or employee data, trade secrets), the settings to check on every account and the steps to follow for a company subject to the Swiss data protection act (nLPD).',
  },
  {
    question: 'We use Copilot in Microsoft 365, is it the same thing?',
    answer:
      'Not quite. Copilot has been powered by GPT-6 Astra since 4 September 2026 and grounds it in your Microsoft 365 files, meetings and conversations through Work IQ, within your existing permissions. If Microsoft 365 is your stack, it is often the right choice, and our general AI training covers it. ChatGPT remains the tool when you want ChatGPT Work, GPTs and Codex, or an AI that is independent from your office suite.',
    links: [{ label: 'General AI training, including Copilot', href: AI_TRAINING }],
  },
  {
    question: 'How long is the training and where does it take place?',
    answer:
      'One day, on-site at your offices in Geneva or across French-speaking Switzerland, or remotely on Zoom or Teams. The ideal format is 6 to 12 people per group. For a larger team, we organise two successive sessions or train internal champions who then roll it out.',
  },
  {
    question: 'Do participants receive a certificate?',
    answer:
      'Yes. Each participant receives an individual, personalised certificate listing the modules covered and the skills worked on, useful for HR records or skill mapping.',
  },
]

/* ─────────────────────────────────────────────
   Trainers: same people and component as the Claude page, wording adapted
   so that a ChatGPT page does not announce Claude-only sessions.
───────────────────────────────────────────── */
const FORMATEURS = [
  {
    name: 'Romane',
    designation: 'AI, SEO/GEO and UX Expert · Trainer',
    quote:
      "Specialist in artificial intelligence, SEO/GEO and UX, I lead the ChatGPT, Claude and Copilot sessions combining strategic vision and teaching. My goal: every employee leaves with tools they truly master.",
    src: '/images/team/romane.png',
    cardBg: 'linear-gradient(160deg, rgba(255,107,0,0.20) 0%, rgba(255,107,0,0.05) 100%)',
    cardBorder: 'rgba(255,107,0,0.28)',
    imageScale: 1,
  },
  {
    name: 'David Khazaei',
    designation: 'Automation and agents trainer · DKDP Founder',
    quote:
      "Developer and digital consultant, I use AI agents daily for my client projects. I lead the technical part: Codex, missions handed to ChatGPT Work and automating a workstation.",
    src: '/images/team/david-khazaei.png',
    cardBg: 'linear-gradient(160deg, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0.06) 100%)',
    cardBorder: 'rgba(124,58,237,0.3)',
    imageScale: 1,
  },
  {
    name: 'Ali Khazaei',
    designation: 'Trainer · Development and IT',
    quote:
      "Developer and trainer, I work on the IT and web development modules. A teacher above all, I make sure every participant leaves with solid foundations and skills that are immediately applicable.",
    src: '/images/team/ali-khazaei.png',
    cardBg: 'linear-gradient(160deg, rgba(96,165,250,0.18) 0%, rgba(96,165,250,0.04) 100%)',
    cardBorder: 'rgba(96,165,250,0.25)',
    imageScale: 1,
  },
  {
    name: 'Claude',
    designation: 'Independent Trainer · Programming and IT',
    quote:
      "Independent trainer and developer, I work on the technical side of the programming and IT training. A hands-on practitioner, I translate complex concepts into directly applicable skills.",
    src: '/images/team/claude-formation.png',
    cardBg: 'linear-gradient(160deg, rgba(212,212,216,0.15) 0%, rgba(212,212,216,0.04) 100%)',
    cardBorder: 'rgba(212,212,216,0.22)',
    imageScale: 1,
  },
]

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function ChatGptTrainingPage() {
  /* ChatGPT and OpenAI watch, recomputed on every render from the blog.
     Any article touching a CHATGPT_TOPIC keyword (slug, title or tags) surfaces
     here on its own, newest first. Nothing to edit on this page when an article
     ships. The counter shows the real total, not the display cap. */
  const chatgptArticles = getArticlesByTopic(CHATGPT_TOPIC, WATCH_MAX_CARDS)
  const chatgptArticlesTotal = countArticlesByTopic(CHATGPT_TOPIC)
  const latestPublished = chatgptArticles[0]?.date ?? null

  return (
    <main>
      <SchemaOrg schema={buildCourse({
        name: 'ChatGPT Astra Corporate Training French-speaking Switzerland',
        url: '/en/corporate-training/chatgpt',
        description: 'Specialised ChatGPT training for corporate teams in Geneva and French-speaking Switzerland. ChatGPT Astra (GPT-6), ChatGPT Work, GPTs, Codex, data protection. Tailored one-day programme.',
        duration: 'P1D',
        teaches: ['ChatGPT Astra (GPT-6)', 'ChatGPT Work', 'Custom GPTs', 'Codex', 'Prompt engineering', 'Data protection and nLPD'],
        prerequisites: 'No technical prerequisites',
        priceFrom: 200,
        ratingValue: '4.9',
        ratingCount: 500,
        image: 'https://dkdp.ch/images/og/formation-chatgpt.png',
        lang: 'en',
      })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Corporate Training', url: 'https://dkdp.ch/en/corporate-training' },
        { name: 'ChatGPT training', url: 'https://dkdp.ch/en/corporate-training/chatgpt' },
      ])} />

      {/* ══ 1. Hero ══ */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(74,222,128,0.06)" accentRgb="255,140,0">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link href={HUB} className="text-text-muted text-sm hover:text-text transition-colors">
                Corporate Training
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <div className="flex items-center gap-1.5">
                <Image src="/images/partners/chatgpt-logo.png" alt="ChatGPT" width={16} height={16} className="rounded-[4px] opacity-90" />
                <span className="text-sm" style={{ color: OR }}>ChatGPT training</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <h1 className="grad-tag inline-block text-xs md:text-sm">ChatGPT training Geneva & French-speaking Switzerland</h1>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: OR, background: ORB, border: `1px solid ${ORD}` }}
                  >
                    New · September 2026
                  </span>
                </div>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  ChatGPT Astra at work: your teams move from conversation to <GradText as="span">action</GradText>.
                </p>

                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  ChatGPT Astra (GPT-6), released on 3 September 2026, no longer just answers: it drives a browser,
                  fills in forms and delivers finished documents. With ChatGPT Work for long missions and Codex for code,
                  DKDP trains your teams in Geneva and across French-speaking Switzerland on your real files, not on demos.
                </p>

                <p className="text-text-muted text-base leading-relaxed mb-8">
                  Where Astra is really available on your plan, what you hand to it and what you never hand to it:
                  that is the first thing we settle in training.
                </p>

                {/* Trust signals */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { label: '100% hands-on', icon: Zap },
                    { label: 'On your real documents', icon: FileText },
                    { label: 'All industries', icon: Users },
                  ].map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-text-secondary"
                      style={{ background: ORB, border: `1px solid ${ORD}` }}
                    >
                      <Icon size={12} style={{ color: OR }} />
                      {label}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton href={CONTACT + '?service=formation'} size="lg">
                    Request a free quote →
                  </LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-text transition-colors">
                    See the programme ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Programme updated: September 2026</p>
              </div>

              {/* Right - visual */}
              <div className="relative flex flex-col gap-4">
                <div className="mb-2 lg:mb-4" aria-label="The AI ecosystem around ChatGPT">
                  <AppLogoMarquee
                    logos={IA_LOGOS}
                    durationSeconds={135}
                    size="md"
                  />
                </div>
                <AstraHeroCard lang="en" />
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ══ 2. Stats ══ */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '500+', l: 'People trained', sub: 'In French-speaking Switzerland' },
              { v: '4.9/5', l: 'Satisfaction', sub: 'DKDP average rating' },
              { v: '100%', l: 'Tailored', sub: 'Your real use cases' },
              { v: '30 d', l: 'Email follow-up', sub: 'After the training' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: OR }}>{s.v}</p>
                  <p className="text-text text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <LogoBanner lang="en" />

      {/* ══ 3. Inline quote form ══ */}
      <section className="py-16 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <LeadFormInlineChatGpt lang="en" />
        </div>
      </section>

      {/* ══ 4. Sticky subnav ══ */}
      <ScrollSpyNav
        items={[
          { label: 'Astra', href: '#astra' },
          { label: 'Plans', href: '#abonnements' },
          { label: 'Gallery', href: '#galerie' },
          { label: 'Products', href: '#produits' },
          { label: 'Programme', href: '#programme' },
          { label: 'Capabilities', href: '#competences' },
          { label: 'Departments', href: '#metiers' },
          { label: 'Format', href: '#format' },
          { label: 'ROI', href: '#roi' },
          { label: 'Pricing', href: '#tarifs' },
          { label: 'Articles', href: '#articles' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Get in touch', href: CONTACT }}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ══ 5. What changes with Astra ══ */}
      <section id="astra" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Context September 2026
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                What changes with ChatGPT Astra (GPT-6)
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Unveiled on 3 September 2026, Astra replaces GPT-5.6 Sol as OpenAI&apos;s flagship model.
                Six changes that matter for a team, then what they are worth against Claude and Copilot.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: MousePointerClick,
                title: 'Astra acts, it no longer just answers',
                desc: 'It drives a computer and a browser, clicks, fills in fields, reads what appears on screen, chains steps on its own and produces finished documents. OpenAI reports it close to 2x faster than GPT-5.6 Sol at computer use.',
                color: GR, bg: GRB, border: GRD,
              },
              {
                icon: FileText,
                title: 'A one million token context',
                desc: '1,050,000 tokens in and 128,000 out: entire reports, contracts or files in a single conversation. Text and image in, knowledge cut-off on 30 April 2026, no native audio or video.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Target,
                title: 'Three times fewer hallucinations',
                desc: 'OpenAI measures a hallucination rate of 4.2% against 12.2% for Sol. The figure comes from OpenAI and has not been independently replicated: in training, we test it against your own documents.',
                color: OR, bg: ORB, border: ORD,
              },
              {
                icon: Layers,
                title: 'ChatGPT Work for long missions',
                desc: 'Released on 9 July 2026. You give it an expected result, it gathers the context from connected apps and files, splits the work and keeps going for hours, including when you are no longer at the screen.',
                color: V, bg: VB, border: VD,
              },
              {
                icon: Code2,
                title: 'Codex for code, with memory',
                desc: 'In Codex, Astra keeps notes from one context window to the next instead of summarising everything, and the history stays available. Asynchronous tool calls, instructions you can change mid-run, adjustable reasoning effort.',
                color: GR, bg: GRB, border: GRD,
              },
              {
                icon: Shield,
                title: 'Guardrails, and refusals',
                desc: 'First model rated "Critical" for cybersecurity in OpenAI\'s Preparedness Framework: the public version is restricted and refuses some requests. What you hand to it, and above all the data you protect, is decided before the first request.',
                color: OR, bg: ORB, border: ORD,
              },
            ].map((c) => (
              <CapabilityCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} color={c.color} bg={c.bg} border={c.border} />
            ))}
          </div>

          {/* Quick comparison, same format as the Claude page */}
          <SectionReveal>
            <ToolComparison lang="en" />
          </SectionReveal>

          <SectionReveal>
            <p className="text-text-muted text-sm mt-8 max-w-3xl">
              Hesitating between the tools? Our{' '}
              <Link href={AI_TRAINING} className="underline hover:text-text transition-colors">general AI training</Link>{' '}
              compares them on your stack, and our{' '}
              <Link href={CLAUDE_TRAINING} className="underline hover:text-text transition-colors">Claude AI training</Link>{' '}
              goes deeper into the tool we recommend for analysis. To read our full reasoning (in French):{' '}
              <Link href="/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026" className="underline hover:text-text transition-colors">ChatGPT, Claude, Copilot: which one for your SME</Link>.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 6. Where Astra is available ══ */}
      <section id="abonnements" className="py-24 border-b border-border scroll-mt-[124px] bg-bg-card">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Plans
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Where Astra is available, plan by plan
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                It is the point everyone misses, and the first thing we settle in training:
                depending on the plan, Astra is in the chat, only in Work and Codex, or absent.
                Knowing when GPT-5.6 Sol is enough avoids paying for Pro for nothing.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <AstraAvailability lang="en" />
          </SectionReveal>
        </div>
      </section>

      {/* ══ 7. Gallery ══ */}
      <section id="galerie" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                In pictures
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                The ChatGPT training in practice
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Real sessions delivered at our clients&apos; offices in French-speaking Switzerland, on their own use cases.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <GalleryFormationChatGpt lang="en" />
          </SectionReveal>
        </div>
      </section>

      {/* ══ 8. ChatGPT products ══ */}
      <section id="produits" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <Image src="/images/partners/chatgpt-logo.png" alt="ChatGPT" width={20} height={20} className="rounded-[5px]" />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: OR }}>
                  The ChatGPT ecosystem
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Six surfaces, one training programme
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Chat, Work and Codex are the three surfaces of ChatGPT. We add GPTs, the Business and Enterprise offers,
                and Copilot for teams that live in Microsoft 365.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SectionReveal>
              <ChatGptProductCard
                title="ChatGPT (Chat)"
                subtitle="The classic conversation, on desktop and mobile. Document analysis, writing, research, images. The gateway for your whole team."
                color={GR}
                bg={GRB}
                border={GRD}
                icon={MessageSquare}
                badge="For everyone"
                features={[
                  'Model picker: Astra, Sol or Luna depending on the plan',
                  'Reasoning effort adjustable mid-conversation',
                  'Images with GPT Image',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ChatGptProductCard
                title="ChatGPT Work"
                subtitle="The agent for long missions. You give it an expected result, it gathers the context, splits the work and keeps going on its own for hours."
                color={V}
                bg={VB}
                border={VD}
                icon={Layers}
                badge="Long missions"
                features={[
                  'Released on 9 July 2026',
                  'Delivers spreadsheets, presentations, documents and web apps',
                  'Included in Plus, Pro, Business and Enterprise, with Astra',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ChatGptProductCard
                title="Codex"
                subtitle="ChatGPT's software development surface, with GPT-6 Astra. For the profiles who write code or automate their workstation."
                color={GR}
                bg={GRB}
                border={GRD}
                icon={Code2}
                badge="Technical profiles"
                features={[
                  'Notes kept from one context window to the next',
                  'History you can consult instead of a summary',
                  'Astra from the Plus plan',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ChatGptProductCard
                title="Custom GPTs"
                subtitle="An assistant configured once for a recurring task: proofreading quotes, answering one type of request, formatting a report."
                color={CH}
                bg={CHB}
                border={CHD}
                icon={Database}
                badge="Recurring tasks"
                features={[
                  'Instructions and reference files for one precise task',
                  'Shared with the team in the same workspace',
                  'Built in training on your own cases',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ChatGptProductCard
                title="ChatGPT Business and Enterprise"
                subtitle="The team offers. Astra in the chat, Work and Codex, an administered workspace, and your data not used to train the models."
                color={OR}
                bg={ORB}
                border={ORD}
                icon={Building2}
                badge="For teams"
                features={[
                  'Business Standard 20 to 25 USD per seat, Premium 100 to 125, Enterprise on quote',
                  'No training on your conversations',
                  'Astra off by default on Enterprise, the administrator turns it on',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ChatGptProductCard
                title="Microsoft Copilot"
                subtitle="GPT-6 Astra in Microsoft 365 since 4 September 2026. The same model, grounded in your files, meetings and conversations by Work IQ, within your existing permissions."
                color="#3b82f6"
                bg="rgba(59,130,246,0.08)"
                border="rgba(59,130,246,0.22)"
                icon={Sparkles}
                badge="If Microsoft 365"
                features={[
                  'Copilot Cowork and Copilot Studio',
                  'Also available in GitHub Copilot, Microsoft Foundry and Azure',
                  'Covered in detail in our general AI training',
                ]}
              />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ══ 9. Programme ══ */}
      <section id="programme" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Detailed programme
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                ChatGPT training programme: one day to move into action
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                7 hours of hands-on training, built on your own documents and use cases.
                No generic slides. No made-up examples.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.05}>
            <div className="relative w-full aspect-[21/9] rounded-[16px] overflow-hidden mb-14">
              <Image
                src="/images/gallery/formation-ia-entreprise-geneve-salle-reunion-bande.webp"
                alt="ChatGPT training Geneva: DKDP session in a meeting room with a team of employees on their own use cases"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Day */}
            <SectionReveal>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: ORB, color: OR, border: `1px solid ${ORD}` }}
                  >
                    Day · ChatGPT Astra, Work and GPTs
                  </div>
                  <span className="text-text-muted text-xs">All profiles</span>
                </div>
                <div className="space-y-2">
                  <AgendaRow lang="en" time="09:00" title="Fundamentals and models: Astra, Sol, Luna, which one answers when" dur="45 min" type="theory" />
                  <AgendaRow lang="en" time="09:45" title="The art of the request: role, context, format, iteration, on your real documents" dur="1h15" type="practice" />
                  <AgendaRow lang="en" time="11:00" title="ChatGPT Work on a real mission from the team" dur="1h15" type="workshop" />
                  <AgendaRow lang="en" time="12:15" title="Lunch break" dur="1h" type="break" />
                  <AgendaRow lang="en" time="13:15" title="GPTs and Projects for recurring tasks" dur="1h30" type="workshop" />
                  <AgendaRow lang="en" time="14:45" title="Data and privacy: what never goes into ChatGPT, settings, Business and Enterprise" dur="45 min" type="theory" />
                  <AgendaRow lang="en" time="15:30" title="Action plan and the team's request library" dur="1h" type="workshop" />
                  <AgendaRow lang="en" time="16:30" title="Q&A and next steps" dur="30 min" type="qa" />
                </div>
              </div>
            </SectionReveal>

            {/* Right column: photo + notes */}
            <SectionReveal>
              <div>
                <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-5">
                  <Image
                    src="/images/gallery/formation-ia-entreprise-geneve-atelier-anime.webp"
                    alt="ChatGPT training Geneva: DKDP trainer leading a hands-on workshop for a small group"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div
                  className="p-4 rounded-[12px] text-sm mb-4"
                  style={{ background: ORB, border: `1px solid ${ORD}` }}
                >
                  <p className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: OR }}>Prerequisites</p>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    One ChatGPT account per participant, on the plan you already have. The plan is checked during the
                    preliminary briefing: that is where we see whether Astra is in your chat, only in Work and Codex, or absent.
                    No technical prerequisites.
                  </p>
                </div>

                <div
                  className="p-4 rounded-[12px] text-sm"
                  style={{ background: GRB, border: `1px solid ${GRD}` }}
                >
                  <p className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: GR }}>Technical profiles</p>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    Codex is introduced in the fundamentals block and explored further on request for the team&apos;s developers,
                    within the same one-day format. No language imposed.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Skills learned */}
          <SectionReveal>
            <div
              className="mt-12 p-6 md:p-8 rounded-[20px]"
              style={{ background: ORB, border: `1px solid ${ORD}` }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: OR }}>
                Skills acquired by the end of the training
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Structured request: role, context, format, iteration',
                  'Choosing Astra, Sol or Luna for the task',
                  'Long-document analysis, up to 1 million tokens',
                  'ChatGPT Work: handing over and reviewing a long mission',
                  'GPTs and Projects for recurring tasks',
                  'Request library shared by the team',
                  'Professional writing and meeting summaries',
                  'Data extraction from PDFs and spreadsheets',
                  'Images with GPT Image for communication',
                  'Privacy settings and Swiss data protection (nLPD)',
                  'What you never hand to ChatGPT',
                  'Codex: the basics for technical profiles',
                ].map((m) => (
                  <div key={m} className="flex items-start gap-2 text-xs text-text-secondary">
                    <CheckCircle2 size={12} style={{ color: OR }} className="flex-shrink-0 mt-0.5" />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 10. Capabilities ══ */}
      <section id="competences" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Features covered
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                The ChatGPT features you will learn
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                The training does not skim over the features. It teaches you
                to master each tool in real professional situations.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: BrainCircuit,
                title: 'The art of the request',
                desc: 'Role, context, format, iteration: the DKDP method to get a usable result on the first try, and to fix it in two exchanges when it is not.',
                color: OR, bg: ORB, border: ORD,
              },
              {
                icon: SlidersHorizontal,
                title: 'Model picker',
                desc: 'Astra, Sol or Luna: which one answers on your plan, which one to choose for the task, and how to adjust the reasoning effort mid-conversation.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Layers,
                title: 'ChatGPT Work',
                desc: 'Phrase an expected result, connect the right files, let Work run on its own, then review and correct the deliverable: spreadsheet, presentation, document or web app.',
                color: V, bg: VB, border: VD,
              },
              {
                icon: FileText,
                title: 'Document analysis',
                desc: 'Contracts, reports, spreadsheets, scanned PDFs: up to 1 million tokens in a single conversation, without splitting the documents.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Database,
                title: 'GPTs and Projects',
                desc: 'An assistant configured once, with its instructions and reference files, for every recurring task. Shared with the team.',
                color: OR, bg: ORB, border: ORD,
              },
              {
                icon: Wand2,
                title: 'Images with GPT Image',
                desc: 'Visuals, variations and mock-ups for communication and presentations, with the limits to know before publishing.',
                color: GR, bg: GRB, border: GRD,
              },
              {
                icon: Code2,
                title: 'Codex',
                desc: 'For technical profiles: handing a coding task to Astra, keeping notes from one context window to the next, reviewing what it produced.',
                color: GR, bg: GRB, border: GRD,
              },
              {
                icon: ShieldCheck,
                title: 'Data and privacy',
                desc: 'The settings to check on every account, what Business and Enterprise change, and the list of what never goes into ChatGPT.',
                color: OR, bg: ORB, border: ORD,
              },
            ].map((c) => (
              <CapabilityCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11. Use cases by department ══ */}
      <HeroBg
        blob1="rgba(255,107,0,0.06)"
        blob2="rgba(212,212,216,0.04)"
        accentRgb="255,140,0"
        className="border-b border-border"
      >
      <section id="metiers" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                By department
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                ChatGPT use cases by department
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                The training is tailored to your team&apos;s functions.
                Here are the most requested tasks by department.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <UseCaseCard
                dept="Leadership"
                icon={Briefcase}
                color={OR}
                bg={ORB}
                border={ORD}
                cases={[
                  'Report and file summaries',
                  'Board meeting preparation',
                  'Plan and budget review',
                  'Structured industry watch',
                  'Decision memos',
                ]}
              />
              <UseCaseCard
                dept="Marketing"
                icon={TrendingUp}
                color={V}
                bg={VB}
                border={VD}
                cases={[
                  'Multi-format campaigns',
                  'Visuals with GPT Image',
                  'Creative briefs',
                  'SEO pages and articles',
                  'Competitor analysis',
                ]}
              />
              <UseCaseCard
                dept="HR"
                icon={UserCog}
                color={pink.color}
                bg={pink.bg}
                border={pink.border}
                cases={[
                  'Job descriptions',
                  'Application sorting and summaries',
                  'Internal FAQ with a GPT',
                  'Onboarding documents',
                  'Procedures and policies',
                ]}
              />
              <UseCaseCard
                dept="Finance and administration"
                icon={DollarSign}
                color={teal.color}
                bg={teal.bg}
                border={teal.border}
                cases={[
                  'Data extraction from invoices and PDFs',
                  'Checks prepared with ChatGPT Work',
                  'Results commentary',
                  'Letters and reminders',
                  'Annotated dashboards',
                ]}
              />
              <UseCaseCard
                dept="Sales"
                icon={ShoppingCart}
                color={blue.color}
                bg={blue.bg}
                border={blue.border}
                cases={[
                  'Sales proposals',
                  'Prospect research',
                  'Objection handling',
                  'Meeting notes',
                  'Follow-up emails',
                ]}
              />
              <UseCaseCard
                dept="Customer service"
                icon={Headphones}
                color={CH}
                bg={CHB}
                border={CHD}
                cases={[
                  'Template answers from your knowledge base',
                  'Sorting and prioritising requests',
                  'Customer history summaries',
                  'Translating exchanges',
                  'Response templates per channel',
                ]}
              />
            </div>
          </SectionReveal>
        </div>
      </section>
      </HeroBg>

      {/* ══ 12. Formats ══ */}
      <section id="format" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Formats
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                On-site, remote or hybrid
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              {
                Icon: Users,
                title: 'On-site at your offices',
                desc: 'DKDP travels to your offices in Geneva or across French-speaking Switzerland. The ideal format: working on your own machines, in your real environment.',
              },
              {
                Icon: Clock,
                title: 'Online (Zoom/Teams)',
                desc: 'Interactive sessions with screen sharing and breakout workshops. As effective as on-site with the right tools.',
              },
              {
                Icon: Award,
                title: 'Individual certificate',
                desc: 'Each participant receives a personalised certificate specifying the skills and modules covered.',
              },
            ].map(({ Icon, title, desc }) => (
              <SectionReveal key={title}>
                <div
                  className="flex flex-col gap-4 p-5 rounded-[14px] h-full"
                  style={{ background: ORB, border: `1px solid ${ORD}` }}
                >
                  <div
                    className="w-10 h-10 rounded-[8px] flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${ORD}` }}
                  >
                    <Icon size={18} style={{ color: OR }} />
                  </div>
                  <div>
                    <p className="text-text font-semibold text-sm mb-1">{title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 13. ROI ══ */}
      <section id="roi" className="scroll-mt-[124px]">
        <ROICalculatorFormation />
      </section>

      {/* ══ 14. Pricing ══ */}
      <section id="tarifs" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                ChatGPT training pricing
              </h2>
              <p className="text-text-secondary text-lg max-w-xl mx-auto">
                The price depends on the number of participants. Half-day (4h) or full day (8h).
              </p>
            </div>
          </SectionReveal>

          <FormationPricing lang="en" />

          <SectionReveal>
            <p className="text-center text-text-muted text-sm mt-8">
              Need a 2-day programme, a Train-the-Trainer format or coaching follow-up?{' '}
              <Link href={CONTACT} className="underline hover:text-text transition-colors" style={{ color: OR }}>
                Let&apos;s talk
              </Link>
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 15. Why DKDP ══ */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionReveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                  Why DKDP
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-6">
                  We train on what we<br />
                  <GradText as="span">practise ourselves.</GradText>
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  We use AI assistants every day, including to build this website.
                  Our ChatGPT programme relies on the same method as our AI and Claude training:
                  structuring a request, a context, a knowledge base and guardrails.
                </p>
                <p className="text-text-secondary leading-relaxed mb-8">
                  That method transfers to whichever tool you pick next, ChatGPT, Claude or Copilot.
                  It is also why we treat all three equally and say frankly where each one is strongest,
                  as in our <Link href="/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026" className="underline hover:text-text transition-colors">ChatGPT, Claude, Copilot comparison for SMEs</Link> (in French).
                  All our programmes are on the <Link href={HUB} className="underline hover:text-text transition-colors">Corporate training</Link> page.
                </p>
                <div className="space-y-3">
                  {[
                    'Romane and David: two practitioners who use AI daily',
                    'Examples drawn from real DKDP projects',
                    'Post-training email follow-up for 30 days',
                    'Programme updated with every new ChatGPT release',
                  ].map((p) => (
                    <div key={p} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Sparkles size={14} style={{ color: OR }} className="flex-shrink-0 mt-0.5" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal>
              <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-4">
                <Image
                  src="/images/gallery/formation-ia-entreprise-geneve-panorama-outils.webp"
                  alt="ChatGPT training Geneva: DKDP trainer presenting the AI tools landscape, ChatGPT, Claude and Copilot, to a corporate team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: '700+', l: 'Clients supported', c: V },
                  { v: '10+', l: 'Years of experience', c: CH },
                  { v: '4.9/5', l: 'Google rating', c: OR },
                  { v: '100%', l: 'Tailored', c: V },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="text-center py-8 rounded-[16px]"
                    style={{ background: ORB, border: `1px solid ${ORD}` }}
                  >
                    <p className="text-4xl font-bold mb-2" style={{ color: s.c }}>{s.v}</p>
                    <p className="text-text-muted text-xs">{s.l}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ══ 16. Watch and articles ══ */}
      {chatgptArticles.length > 0 && (
        <section id="articles" className="py-24 border-b border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="max-w-3xl mb-10">
                <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                  ChatGPT and OpenAI watch
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                  We follow what OpenAI ships, and we write about it
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  New models, surfaces landing, limits we hit in the field: we publish what we
                  learn from using them every day. These articles are written by the team that runs the
                  training, and the programme is updated right after. Articles are published in French.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-text-secondary"
                    style={{ background: ORB, border: `1px solid ${ORD}` }}
                  >
                    <BookOpen size={12} style={{ color: OR }} />
                    {chatgptArticlesTotal} articles about ChatGPT and OpenAI
                  </div>
                  {latestPublished && (
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-text-secondary"
                      style={{ background: ORB, border: `1px solid ${ORD}` }}
                    >
                      <Clock size={12} style={{ color: OR }} />
                      Latest published: {latestPublished}
                    </div>
                  )}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <ArticleCarousel
                articles={chatgptArticles}
                accentColor={OR}
                accentBorder={ORD}
                lang="en"
                label="DKDP articles about ChatGPT and OpenAI"
              />
            </SectionReveal>

            <SectionReveal>
              <p className="text-text-muted text-sm mt-8">
                All our AI, SEO and training coverage lives on{' '}
                <Link href={localizedPath('/blog', 'en')} className="underline hover:text-text transition-colors" style={{ color: OR }}>
                  the DKDP blog
                </Link>
                .
              </p>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* ══ 17. Trainers ══ */}
      <HeroBg
        blob1="rgba(255,107,0,0.08)"
        blob2="rgba(124,58,237,0.05)"
        accentRgb="255,140,0"
        className="border-b border-border"
      >
        <section className="py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-16">
                <GradTag className="mb-6">Your trainers</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-text">
                  Trained by practitioners, not theorists.
                </h2>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <CircularTestimonialsLazy
                items={FORMATEURS}
                autoplay={true}
                colors={{
                  name: '#ffffff',
                  designation: OR,
                  quote: '#9CA3AF',
                  arrowBackground: '#1E1E1E',
                  arrowForeground: '#ffffff',
                  arrowHoverBackground: '#FF6B00',
                }}
                fontSizes={{
                  name: '1.6rem',
                  designation: '0.75rem',
                  quote: '1rem',
                }}
              />
            </SectionReveal>
          </div>
        </section>
      </HeroBg>

      {/* ══ 18. Testimonials ══ */}
      <Testimonials accentRgb="255,140,0" lang="en" />

      {/* ══ 19. FAQ ══ */}
      <section id="faq" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text mb-3">Frequently asked questions about the ChatGPT training</h2>
              <p className="text-text-muted">Everything you need to know before booking.</p>
            </div>
          </SectionReveal>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <SectionReveal key={item.question}>
                <details className="group rounded-[14px] border border-border bg-bg-card overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                    <span className="text-text text-sm font-semibold leading-snug">{item.question}</span>
                    <ChevronRight size={16} className="flex-shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-text-secondary text-sm leading-relaxed">{item.answer}</p>
                    {item.links && (
                      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                        {item.links.map((l) => (
                          <Link key={l.href} href={l.href} className="underline hover:text-text transition-colors" style={{ color: OR }}>
                            {l.label} →
                          </Link>
                        ))}
                      </p>
                    )}
                  </div>
                </details>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="text-center mt-10">
              <p className="text-text-muted text-sm mb-4">Have a specific question?</p>
              <LiquidMetalButton href={CONTACT + '?service=formation'} size="md">
                Ask your question →
              </LiquidMetalButton>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 20. CTA Final ══ */}
      <CTAFinal accentRgb="255,140,0" lang="en" />
    </main>
  )
}
