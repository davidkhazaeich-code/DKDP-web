'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import {
  Globe, Search, Megaphone, Share2, Film, Presentation, Shield,
  BrainCircuit, BookOpen, Palette, Cpu, Wand2,
  Bot, Workflow, MessageCircle, Smartphone,
  ChevronRight, GraduationCap, Sparkles,
} from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { HeroBg } from '@/components/ui/HeroBg'
import { ClaudeIcon } from '@/components/icons/ClaudeIcon'
import { violet, orange, chrome } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'
import { localizedPath } from '@/i18n/slugs'

// ─── Data ────────────────────────────────────────────────────────────────────

type ServiceItem = {
  icon: React.ElementType
  title: string
  href: string
  description: string
  badge: string | null
  image: string
  pillar: 'agence' | 'formation' | 'ia'
}

const AGENCE_SERVICES: ServiceItem[] = [
  { icon: Globe, title: 'Création de site web', href: '/agence-digitale/creation-site-web', description: 'Sites sur mesure, rapides et optimisés pour la conversion.', badge: 'Best seller', image: '/images/services/dkdp-agence-creation-web.webp', pillar: 'agence' },
  { icon: Smartphone, title: 'Développement d\'application', href: '/agence-digitale/developpement-application', description: 'iOS, Android, web app et PWA sur mesure pour vos besoins métier.', badge: 'Nouveau', image: '/images/services/dkdp-developpement-application-service.webp', pillar: 'agence' },
  { icon: Search, title: 'Référencement SEO', href: '/agence-digitale/seo', description: 'Stratégie de contenu et optimisation technique pour dominer Google.', badge: 'Populaire', image: '/images/services/dkdp-agence-seo.webp', pillar: 'agence' },
  { icon: Megaphone, title: 'Publicité Google Ads', href: '/agence-digitale/publicite-sea', description: 'Campagnes search et display rentables, ROI suivi en temps réel.', badge: null, image: '/images/services/dkdp-agence-sea.webp', pillar: 'agence' },
  { icon: Share2, title: 'Réseaux sociaux', href: '/agence-digitale/reseaux-sociaux', description: 'Présence cohérente sur Instagram, LinkedIn, Facebook.', badge: null, image: '/images/services/dkdp-agence-reseaux-sociaux.webp', pillar: 'agence' },
  { icon: Film, title: 'Création vidéo', href: '/agence-digitale/creation-video', description: 'Vidéos institutionnelles, reels et contenus courts.', badge: null, image: '/images/services/dkdp-agence-creation-video.webp', pillar: 'agence' },
  { icon: Presentation, title: 'Consulting marketing', href: '/agence-digitale/consulting-marketing', description: 'Audit de votre présence digitale et accompagnement stratégique.', badge: null, image: '/images/services/dkdp-agence-consulting.webp', pillar: 'agence' },
  { icon: Shield, title: 'RGPD & Cookies', href: '/agence-digitale/rgpd-cookies', description: 'Mise en conformité, politique de confidentialité, bandeau cookies.', badge: null, image: '/images/services/dkdp-agence-rgpd.webp', pillar: 'agence' },
]

const FORMATION_SERVICES: ServiceItem[] = [
  { icon: BrainCircuit, title: 'Formation IA entreprise', href: '/formation-entreprise/ia', description: 'Intégrez ChatGPT, Claude et Copilot dans le quotidien de vos équipes.', badge: 'Tendance', image: '/images/services/dkdp-formation-ia.webp', pillar: 'formation' },
  { icon: ClaudeIcon, title: 'Formation Claude IA', href: '/formation-entreprise/claude-ai', description: 'Claude.ai, Projects collaboratifs et Claude Code pour vos équipes.', badge: 'Nouveau', image: '/images/services/dkdp-formation-ia.webp', pillar: 'formation' },
  { icon: BookOpen, title: 'Bureautique & Excel', href: '/formation-entreprise/bureautique', description: 'Maîtrisez Excel, Word, PowerPoint et Microsoft 365.', badge: null, image: '/images/services/dkdp-formation-bureautique.webp', pillar: 'formation' },
  { icon: Shield, title: 'Cybersécurité', href: '/formation-entreprise/cybersecurite', description: 'Sensibilisez vos équipes : phishing, mots de passe, RGPD.', badge: null, image: '/images/services/dkdp-formation-cybersecurite.webp', pillar: 'formation' },
  { icon: Share2, title: 'Réseaux sociaux', href: '/formation-entreprise/reseaux-sociaux', description: 'Stratégie, contenu et analyse de performances.', badge: null, image: '/images/services/dkdp-formation-reseaux-sociaux.webp', pillar: 'formation' },
  { icon: Wand2, title: 'Formation Canva', href: '/formation-entreprise/canva', description: 'Brand Kit, templates, posts sociaux et IA Magic Studio en une journée.', badge: 'Populaire', image: '/images/services/dkdp-formation-canva.webp', pillar: 'formation' },
  { icon: Palette, title: 'Formation Web Design', href: '/formation-entreprise/web-design', description: 'Concevez votre site avant de le développer : Figma, UI/UX, prototypes.', badge: null, image: '/images/services/dkdp-formation-web-design.webp', pillar: 'formation' },
  { icon: Cpu, title: 'Informatique', href: '/formation-entreprise/informatique', description: 'Compétences informatiques essentielles au quotidien.', badge: null, image: '/images/services/dkdp-formation-informatique.webp', pillar: 'formation' },
  { icon: Film, title: 'Montage vidéo', href: '/formation-entreprise/montage-video', description: 'Créez des vidéos pro avec CapCut, Premiere, Reels.', badge: null, image: '/images/services/dkdp-formation-montage-video.webp', pillar: 'formation' },
]

const IA_SERVICES: ServiceItem[] = [
  { icon: Bot, title: 'Agents IA sur mesure', href: '/intelligence-artificielle/agents-ia', description: 'Agents intelligents qui automatisent vos tâches et répondent à vos clients.', badge: 'Populaire', image: '/images/services/dkdp-ia-agents-ia.webp', pillar: 'ia' },
  { icon: Workflow, title: 'Automatisation métier', href: '/intelligence-artificielle/automatisation', description: 'Workflows sans code qui connectent vos outils et éliminent le manuel.', badge: null, image: '/images/services/dkdp-ia-automatisation.webp', pillar: 'ia' },
  { icon: BrainCircuit, title: 'Audit & Conseil IA', href: '/intelligence-artificielle/audit-conseil', description: 'Identifiez les 3 actions à fort ROI dans votre entreprise.', badge: 'Best seller', image: '/images/services/dkdp-ia-audit-conseil.webp', pillar: 'ia' },
  { icon: Cpu, title: 'Mise en place IA', href: '/intelligence-artificielle/mise-en-place', description: 'Intégration de ChatGPT, Claude et LLMs dans votre stack existant.', badge: null, image: '/images/services/dkdp-ia-mise-en-place.webp', pillar: 'ia' },
  { icon: MessageCircle, title: 'Chatbot IA sur mesure', href: '/intelligence-artificielle/chatbot-ia', description: 'Un assistant 24/7 pour votre site : FAQ, prise de RDV, qualification de leads.', badge: 'Nouveau', image: '/images/services/dkdp-ia-agents-ia.webp', pillar: 'ia' },
]

type PillarKey = 'agence' | 'formation' | 'ia'

type PillarData = { key: PillarKey; label: string; shortLabel: string; subtitle: string; preview: string[]; heroImage: string; Icon: React.ElementType; color: string; bg: string; border: string; items: ServiceItem[]; accentRgb: string; blob1: string; blob2: string; hubHref: string }

const PILLARS: PillarData[] = [
  {
    key: 'agence', label: 'Marketing digital', shortLabel: 'Marketing', subtitle: '8 services',
    preview: ['Sites web', 'App mobile', 'SEO', 'Google Ads'],
    heroImage: '/images/services/dkdp-agence-creation-web.webp',
    Icon: Globe, color: violet.color, bg: violet.bg, border: violet.border, items: AGENCE_SERVICES,
    accentRgb: '167,139,250', blob1: 'rgba(124,58,237,0.14)', blob2: 'rgba(124,58,237,0.06)',
    hubHref: '/agence-digitale',
  },
  {
    key: 'formation', label: 'Formation entreprise', shortLabel: 'Formation', subtitle: '8 programmes',
    preview: ['IA entreprise', 'Claude IA', 'Excel', 'Cybersécurité'],
    heroImage: '/images/services/dkdp-formation-ia.webp',
    Icon: GraduationCap, color: orange.color, bg: orange.bg, border: orange.border, items: FORMATION_SERVICES,
    accentRgb: '255,140,0', blob1: 'rgba(255,140,0,0.12)', blob2: 'rgba(255,107,0,0.06)',
    hubHref: '/formation-entreprise',
  },
  {
    key: 'ia', label: 'IA et automatisation', shortLabel: 'IA', subtitle: '5 solutions',
    preview: ['Agents IA', 'Chatbot IA', 'Automatisation', 'Audit IA'],
    heroImage: '/images/services/dkdp-ia-agents-ia.webp',
    Icon: Sparkles, color: chrome.color, bg: chrome.bg, border: chrome.border, items: IA_SERVICES,
    accentRgb: '212,212,216', blob1: 'rgba(212,212,216,0.10)', blob2: 'rgba(212,212,216,0.05)',
    hubHref: '/intelligence-artificielle',
  },
]

function getPillarTokens(pillar: PillarKey) {
  if (pillar === 'agence') return violet
  if (pillar === 'formation') return orange
  return chrome
}

const BADGE_STYLES: Record<string, React.CSSProperties> = {
  'Best seller': { background: 'rgba(167,139,250,0.15)', color: '#A78BFA', border: '1px solid rgba(167,139,250,0.30)' },
  'Populaire': { background: 'rgba(167,139,250,0.12)', color: '#c4b5fd', border: '1px solid rgba(167,139,250,0.22)' },
  'Tendance': { background: 'rgba(255,140,0,0.12)', color: '#FF8C00', border: '1px solid rgba(255,140,0,0.25)' },
  'Nouveau': { background: 'rgba(34,197,94,0.12)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.25)' },
}

// ─── English overlay (keyed by FR-canonical href; FR arrays untouched) ─────────

const SERVICE_EN: Record<string, { title: string; description: string }> = {
  '/agence-digitale/creation-site-web': { title: 'Website creation', description: 'Custom websites, fast and optimised for conversion.' },
  '/agence-digitale/developpement-application': { title: 'App development', description: 'iOS, Android, web apps and PWAs tailored to your business needs.' },
  '/agence-digitale/seo': { title: 'SEO', description: 'Content strategy and technical optimisation to dominate Google.' },
  '/agence-digitale/publicite-sea': { title: 'Google Ads', description: 'Profitable search and display campaigns, ROI tracked in real time.' },
  '/agence-digitale/reseaux-sociaux': { title: 'Social media', description: 'Consistent presence on Instagram, LinkedIn, Facebook.' },
  '/agence-digitale/creation-video': { title: 'Video production', description: 'Corporate videos, reels and short-form content.' },
  '/agence-digitale/consulting-marketing': { title: 'Marketing consulting', description: 'Audit of your digital presence and strategic support.' },
  '/agence-digitale/rgpd-cookies': { title: 'GDPR & Cookies', description: 'Compliance, privacy policy, cookie banner.' },
  '/formation-entreprise/ia': { title: 'Corporate AI training', description: 'Bring ChatGPT, Claude and Copilot into your teams daily work.' },
  '/formation-entreprise/claude-ai': { title: 'Claude AI training', description: 'Claude.ai, collaborative Projects and Claude Code for your teams.' },
  '/formation-entreprise/bureautique': { title: 'Office & Excel', description: 'Master Excel, Word, PowerPoint and Microsoft 365.' },
  '/formation-entreprise/cybersecurite': { title: 'Cybersecurity', description: 'Train your teams: phishing, passwords, data protection.' },
  '/formation-entreprise/reseaux-sociaux': { title: 'Social media', description: 'Strategy, content and performance analysis.' },
  '/formation-entreprise/canva': { title: 'Canva training', description: 'Brand Kit, templates, social posts and Magic Studio AI in one day.' },
  '/formation-entreprise/web-design': { title: 'Web design training', description: 'Design your site before building it: Figma, UI/UX, prototypes.' },
  '/formation-entreprise/informatique': { title: 'IT skills', description: 'Essential computer skills for everyday work.' },
  '/formation-entreprise/montage-video': { title: 'Video editing', description: 'Create pro videos with CapCut, Premiere, Reels.' },
  '/intelligence-artificielle/agents-ia': { title: 'Custom AI agents', description: 'Intelligent agents that automate your tasks and answer your clients.' },
  '/intelligence-artificielle/automatisation': { title: 'Business automation', description: 'No-code workflows that connect your tools and remove manual work.' },
  '/intelligence-artificielle/audit-conseil': { title: 'AI audit & consulting', description: 'Identify the 3 high-ROI actions in your company.' },
  '/intelligence-artificielle/mise-en-place': { title: 'AI implementation', description: 'Integrating ChatGPT, Claude and LLMs into your existing stack.' },
  '/intelligence-artificielle/chatbot-ia': { title: 'Custom AI chatbot', description: 'A 24/7 assistant for your website: FAQ, booking, lead qualification.' },
}

const PILLAR_EN: Record<PillarKey, { label: string; shortLabel: string; subtitle: string; preview: string[] }> = {
  agence: { label: 'Digital marketing', shortLabel: 'Marketing', subtitle: '8 services', preview: ['Websites', 'Mobile app', 'SEO', 'Google Ads'] },
  formation: { label: 'Corporate training', shortLabel: 'Training', subtitle: '8 programmes', preview: ['AI for business', 'Claude AI', 'Excel', 'Cybersecurity'] },
  ia: { label: 'AI & automation', shortLabel: 'AI', subtitle: '5 solutions', preview: ['AI agents', 'AI chatbot', 'Automation', 'AI audit'] },
}

const BADGE_LABELS: Record<Locale, Record<string, string>> = {
  fr: { 'Best seller': 'Best seller', 'Populaire': 'Populaire', 'Tendance': 'Tendance', 'Nouveau': 'Nouveau' },
  en: { 'Best seller': 'Best seller', 'Populaire': 'Popular', 'Tendance': 'Trending', 'Nouveau': 'New' },
}

const CONTENT = {
  fr: {
    tag: 'Nos expertises',
    headingA: 'Sites web, SEO, IA et formation.',
    headingB: 'Un seul interlocuteur.',
    subtitle: 'Sélectionnez un pilier pour explorer nos offres.',
    chooseAria: 'Choisir un pilier',
    hint: 'Choisissez un pilier',
    selectPrompt: 'Sélectionnez un pilier',
    learnMore: 'En savoir plus',
    servicesWord: (n: number) => (n > 1 ? 'services' : 'service'),
    seePage: (label: string) => `Voir la page ${label}`,
    seePillar: (label: string) => `Voir ${label}`,
    servicesPanel: (label: string) => `Services ${label}`,
  },
  en: {
    tag: 'Our expertise',
    headingA: 'Websites, SEO, AI and training.',
    headingB: 'One single partner.',
    subtitle: 'Select a pillar to explore our offers.',
    chooseAria: 'Choose a pillar',
    hint: 'Choose a pillar',
    selectPrompt: 'Select a pillar',
    learnMore: 'Learn more',
    servicesWord: (n: number) => (n > 1 ? 'services' : 'service'),
    seePage: (label: string) => `See the ${label} page`,
    seePillar: (label: string) => `View ${label}`,
    servicesPanel: (label: string) => `${label} services`,
  },
} as const

function pillarLabel(p: PillarData, lang: Locale) { return lang === 'en' ? PILLAR_EN[p.key].label : p.label }
function pillarShort(p: PillarData, lang: Locale) { return lang === 'en' ? PILLAR_EN[p.key].shortLabel : p.shortLabel }
function pillarSubtitle(p: PillarData, lang: Locale) { return lang === 'en' ? PILLAR_EN[p.key].subtitle : p.subtitle }
function pillarPreview(p: PillarData, lang: Locale) { return lang === 'en' ? PILLAR_EN[p.key].preview : p.preview }

// ─── Component ───────────────────────────────────────────────────────────────

export function AllServices({ lang = 'fr' }: { lang?: Locale } = {}) {
  const t = CONTENT[lang]
  const [active, setActive] = useState<PillarKey | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  const activePillar = PILLARS.find((p) => p.key === active)
  // Default grid config when nothing selected
  const gridAccent = activePillar?.accentRgb ?? '167,139,250'
  const gridBlob1 = activePillar?.blob1 ?? 'rgba(124,58,237,0.08)'
  const gridBlob2 = activePillar?.blob2 ?? 'rgba(255,107,0,0.05)'

  return (
    <HeroBg
      className="border-y border-border"
      accentRgb={gridAccent}
      blob1={gridBlob1}
      blob2={gridBlob2}
    >
      <section id="nos-expertises" aria-labelledby="all-services-heading" className="min-h-[100svh] flex flex-col justify-center py-14 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <SectionReveal>
            <div className="text-center mb-10 sm:mb-14">
              <GradTag className="mb-4 sm:mb-6">{t.tag}</GradTag>
              <h2 id="all-services-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] mb-3 sm:mb-5">
                {t.headingA}<br className="hidden sm:block" />
                {t.headingB}
              </h2>
              <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </SectionReveal>

          {/* ── Pillar selector cards ── */}
          <SectionReveal delay={0.1}>
            <div
              role="tablist"
              aria-label={t.chooseAria}
              className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12"
            >
              {PILLARS.map((pillar, idx) => {
                const isActive = active === pillar.key
                const shouldAnimate = !hasInteracted
                return (
                  <button
                    key={pillar.key}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="services-panel"
                    onClick={() => { setHasInteracted(true); setActive(isActive ? null : pillar.key) }}
                    className={`group relative flex flex-col overflow-hidden rounded-[12px] sm:rounded-[16px] transition-all duration-300 cursor-pointer backdrop-blur-lg ${isActive ? '' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                    style={{
                      background: isActive ? `${pillar.color}18` : 'var(--bg-card)',
                      border: `2px solid ${pillar.color}${isActive ? '' : shouldAnimate ? '40' : '25'}`,
                      boxShadow: isActive ? `0 0 30px ${pillar.color}20, inset 0 1px 0 ${pillar.color}20` : shouldAnimate ? `0 0 16px ${pillar.color}12` : 'none',
                      animation: shouldAnimate ? `pillarNudge 2.8s ease-in-out infinite` : 'none',
                      animationDelay: shouldAnimate ? `${idx * 0.35}s` : '0s',
                    }}
                    onMouseEnter={(e) => {
                      if (isActive) return
                      const el = e.currentTarget
                      el.style.borderColor = `${pillar.color}70`
                      el.style.background = `var(--bg-card-hover)`
                      el.style.boxShadow = `0 0 20px ${pillar.color}15`
                    }}
                    onMouseLeave={(e) => {
                      if (isActive) return
                      const el = e.currentTarget
                      el.style.borderColor = `${pillar.color}${shouldAnimate ? '40' : '25'}`
                      el.style.background = 'var(--bg-card)'
                      el.style.boxShadow = shouldAnimate ? `0 0 16px ${pillar.color}12` : 'none'
                    }}
                  >
                    {/* Image — visible on desktop */}
                    <div className="hidden md:block relative w-full h-44 overflow-hidden">
                      <Image
                        src={pillar.heroImage}
                        alt=""
                        fill
                        sizes="400px"
                        className={`object-cover transition-all duration-500 ${isActive ? 'opacity-80 scale-105' : 'opacity-60 group-hover:opacity-75 group-hover:scale-105'}`}
                      />
                      {/* Image overlay: dark scene + branded color, theme-independent.
                          The IMAGE is its own local context, no cream veil over it. */}
                      <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(to top, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.05) 60%), linear-gradient(to top, ${pillar.color}15 0%, transparent 40%)` }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 sm:py-4 md:py-5">
                      {/* Colored top bar on mobile */}
                      <div
                        className="md:hidden absolute top-0 left-0 right-0 h-[3px] transition-all duration-300"
                        style={{ background: pillar.color, opacity: isActive ? 1 : 0.5 }}
                      />

                      {/* Icon */}
                      <div
                        className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full transition-all duration-300"
                        style={{
                          background: `${pillar.color}${isActive ? '25' : '15'}`,
                          border: `1.5px solid ${pillar.color}${isActive ? '' : '50'}`,
                        }}
                      >
                        <pillar.Icon
                          size={18}
                          className="sm:hidden transition-colors duration-300"
                          style={{ color: pillar.color }}
                        />
                        <pillar.Icon
                          size={20}
                          className="hidden sm:block transition-colors duration-300"
                          style={{ color: pillar.color }}
                        />
                      </div>

                      {/* Label */}
                      <div className="text-center">
                        <p
                          className="text-[11px] sm:text-sm font-semibold transition-colors duration-300 leading-tight"
                          style={{ color: isActive ? pillar.color : 'var(--text)' }}
                        >
                          <span className="hidden sm:inline">{pillarLabel(pillar, lang)}</span>
                          <span className="sm:hidden">{pillarShort(pillar, lang)}</span>
                        </p>
                        <p
                          className="text-[9px] sm:text-xs mt-0.5 transition-colors duration-300"
                          style={{ color: `${pillar.color}${isActive ? 'cc' : '80'}` }}
                        >
                          {pillarSubtitle(pillar, lang)}
                        </p>
                      </div>

                      {/* Preview service tags — before first interaction */}
                      {shouldAnimate && (
                        <div className="hidden sm:flex flex-wrap justify-center gap-1 mt-0.5">
                          {pillarPreview(pillar, lang).map((name) => (
                            <span
                              key={name}
                              className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                background: `${pillar.color}15`,
                                color: `${pillar.color}aa`,
                                border: `1px solid ${pillar.color}25`,
                              }}
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Active indicator bar */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-t-full transition-all duration-300"
                      style={{
                        width: isActive ? '48px' : '0px',
                        background: pillar.color,
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                  </button>
                )
              })}
            </div>
          </SectionReveal>

          {/* ── Animated cursor hint — before first interaction ── */}
          {!hasInteracted && (
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8" aria-hidden="true">
              <svg
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                className="text-text-muted"
                style={{ animation: 'cursorSlide 3s ease-in-out infinite' }}
              >
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" fill="currentColor" />
              </svg>
              <span className="text-text-muted text-xs sm:text-sm" style={{ animation: 'cursorSlide 3s ease-in-out infinite' }}>
                {t.hint}
              </span>
            </div>
          )}

          {/* ── Services grid ── */}
          <div
            id="services-panel"
            role="tabpanel"
            aria-label={activePillar ? t.servicesPanel(pillarLabel(activePillar, lang)) : t.selectPrompt}
          >
            <AnimatePresence mode="wait">
              {activePillar ? (
                <m.div
                  key={active}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Active pillar label + switch hint */}
                  <m.div
                    className="flex items-center justify-between mb-5 sm:mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: activePillar.color, boxShadow: `0 0 8px ${activePillar.color}60` }}
                      />
                      <span className="text-sm sm:text-base font-semibold" style={{ color: activePillar.color }}>
                        {pillarLabel(activePillar, lang)}
                      </span>
                      <span className="text-text-muted text-xs">
                        · {activePillar.items.length} {t.servicesWord(activePillar.items.length)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {PILLARS.filter(p => p.key !== active).map((p) => (
                        <button
                          key={p.key}
                          onClick={() => setActive(p.key)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-200 hover:scale-105"
                          style={{
                            background: `${p.color}10`,
                            border: `1px solid ${p.color}30`,
                            color: `${p.color}cc`,
                          }}
                          aria-label={t.seePillar(pillarLabel(p, lang))}
                        >
                          <p.Icon size={12} style={{ color: p.color }} />
                          <span className="hidden sm:inline">{pillarShort(p, lang)}</span>
                        </button>
                      ))}
                    </div>
                  </m.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {activePillar.items.map((service, i) => (
                      <ServiceCard key={service.href} service={service} index={i} lang={lang} />
                    ))}
                  </div>

                  {/* Hub link */}
                  <m.div
                    className="mt-8 sm:mt-10 text-center"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <Link
                      href={localizedPath(activePillar.hubHref, lang)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                      style={{ color: activePillar.color }}
                    >
                      {t.seePage(pillarLabel(activePillar, lang))}
                      <ChevronRight size={14} />
                    </Link>
                  </m.div>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </HeroBg>
  )
}

// ─── Card ────────────────────────────────────────────────────────────────────

function ServiceCard({ service, index, lang = 'fr' }: { service: ServiceItem; index: number; lang?: Locale }) {
  const tokens = getPillarTokens(service.pillar)
  const { color, bg, border } = tokens
  const title = lang === 'en' ? (SERVICE_EN[service.href]?.title ?? service.title) : service.title
  const description = lang === 'en' ? (SERVICE_EN[service.href]?.description ?? service.description) : service.description
  const badgeLabel = service.badge ? BADGE_LABELS[lang][service.badge] ?? service.badge : null
  const learnMore = CONTENT[lang].learnMore

  return (
    <m.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.5), ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={localizedPath(service.href, lang)}
        className="group flex flex-col h-full rounded-[14px] border overflow-hidden hover:-translate-y-0.5 transition-transform duration-200 backdrop-blur-lg"
        style={{ background: 'var(--bg-card)', borderColor: service.badge ? `${color}40` : border, boxShadow: service.badge ? `0 0 28px ${color}10` : undefined }}
      >
        {/* Image */}
        <div className="relative h-36 sm:h-40 overflow-hidden">
          <Image
            src={service.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Subtle dark fade at bottom of image, theme-independent so cream pages don't bleach the image. */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
          {service.badge && (
            <span
              className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={BADGE_STYLES[service.badge] ?? {}}
            >
              {badgeLabel}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <div
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[7px] mb-3 flex-shrink-0"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            <service.icon size={15} style={{ color }} />
          </div>
          <h3 className="text-text font-semibold text-[15px] sm:text-base mb-1.5 sm:mb-2">{title}</h3>
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed flex-1">{description}</p>
          <span
            className="mt-4 inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-semibold transition-opacity group-hover:opacity-70"
            style={{ color }}
          >
            {learnMore} <ChevronRight size={12} />
          </span>
        </div>
      </Link>
    </m.div>
  )
}
