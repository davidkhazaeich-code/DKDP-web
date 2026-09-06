'use client'

import { useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, m } from 'framer-motion'
import {
  X, Send, CalendarCheck, RotateCcw, Globe, Sparkles, ArrowRight, MessageCircle,
  Mail, Mic, Search, Megaphone, Bot, Workflow, BrainCircuit, GraduationCap, FileText,
} from 'lucide-react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getCalApi } from '@calcom/embed-react'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { trackChatOpen } from '@/lib/analytics'

// Ouvre la modale Cal.com. Utilisee par la SmartCTABar quand l'assistant
// emet le token [BOOK] dans son message.
async function openBookingModal() {
  const cal = await getCalApi({ namespace: 'planifier-un-appel' })
  const theme =
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-theme') === 'light'
      ? 'light'
      : 'dark'
  cal('modal', {
    calLink: 'david-khazaei/planifier-un-appel',
    config: { layout: 'month_view', theme },
  })
}

const MESSAGE_LIMIT = 10
const MAX_CHAR_LENGTH = 500
const DKDP_BOUNCE = [0.34, 1.56, 0.64, 1] as const

const WELCOME_MESSAGE =
  'Bienvenue chez DKDP. Nous accompagnons les entreprises a se demarquer en ligne avec des sites modernes et bien références. Comment puis-je vous aider aujourd\u2019hui ?'

const QUICK_SUGGESTIONS = [
  { icon: <Globe size={14} />, label: 'Creer un site web' },
  { icon: <MessageCircle size={14} />, label: 'Je veux un chatbot IA comme celui-ci' },
  { icon: <Sparkles size={14} />, label: 'Explorer vos formations IA' },
  { icon: <CalendarCheck size={14} />, label: 'Obtenir un devis gratuit' },
]

const PLACEHOLDERS = [
  'Besoin d\u2019une information ?',
  'Un projet de site web en tete ?',
  'Combien coute un site web ?',
  'Parlez-moi de vos formations IA',
]

// ── Version anglaise des textes du widget ───────────────────────────────────
// Le site existe en francais et en anglais. Ces textes s'affichent avant que le
// visiteur ait ecrit quoi que ce soit, donc la langue vient du chemin : sur
// /en/pricing il faut deja l'accueillir en anglais. Une fois la conversation
// lancee, c'est le modele qui suit la langue du visiteur, plus le chemin.
type ChatLocale = 'fr' | 'en'

const EN_WELCOME_MESSAGE =
  'Welcome to DKDP. We help companies stand out online with modern websites that rank well. How can I help you today?'

const EN_QUICK_SUGGESTIONS = [
  { icon: <Globe size={14} />, label: 'Build a website' },
  { icon: <MessageCircle size={14} />, label: 'I want an AI chatbot like this one' },
  { icon: <Sparkles size={14} />, label: 'Explore your AI training' },
  { icon: <CalendarCheck size={14} />, label: 'Get a free quote' },
]

const EN_PLACEHOLDERS = [
  'Looking for something?',
  'Got a website project in mind?',
  'How much does a website cost?',
  'Tell me about your AI training',
]

/** La locale vient du chemin : /en et /en/... sont anglais, le reste francais. */
function localeFromPath(pathname: string | null): ChatLocale {
  return pathname === '/en' || pathname?.startsWith('/en/') ? 'en' : 'fr'
}

/** Libelles d'accessibilite, lus par les lecteurs d'ecran. */
const LABELS = {
  fr: {
    ask: 'Posez votre question a notre IA',
    dictate: 'Dicter un message',
    stopDictation: 'Arreter la dictee',
    send: 'Envoyer le message',
    clear: 'Effacer la conversation',
  },
  en: {
    ask: 'Ask our AI a question',
    dictate: 'Dictate a message',
    stopDictation: 'Stop dictation',
    send: 'Send message',
    clear: 'Clear conversation',
  },
} as const

/** Textes du widget pour la locale courante. */
function copyFor(locale: ChatLocale) {
  return locale === 'en'
    ? {
        welcome: EN_WELCOME_MESSAGE,
        suggestions: EN_QUICK_SUGGESTIONS,
        placeholders: EN_PLACEHOLDERS,
        speechLang: 'en-US',
        labels: LABELS.en,
      }
    : {
        welcome: WELCOME_MESSAGE,
        suggestions: QUICK_SUGGESTIONS,
        placeholders: PLACEHOLDERS,
        speechLang: 'fr-FR',
        labels: LABELS.fr,
      }
}

// ── CTA quick links shown after assistant messages ──────────────────────────

const INLINE_CTAS = [
  { href: '/intelligence-artificielle/chatbot-ia', label: 'Chatbot pour mon site web' },
  { href: '/#nos-expertises', label: 'Nos services' },
  { href: '/contact', label: 'Nous contacter' },
]

// ── Animated orb ────────────────────────────────────────────────────────────

function AnimatedOrb({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  if (!animated) {
    return (
      <div className="relative flex-shrink-0 rounded-full overflow-hidden" style={{ width: size, height: size }}>
        <div className="absolute inset-0.5 rounded-full" style={{ background: 'linear-gradient(135deg, #A78BFA, #D4D4D8, #7C3AED)' }} />
        <div className="absolute rounded-full" style={{ inset: '28%', background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.3) 0%, transparent 55%)' }} />
      </div>
    )
  }

  return (
    <div className="relative flex-shrink-0 rounded-full overflow-hidden" style={{ width: size, height: size }}>
      {/* Glow pulse */}
      <m.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.25, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Base gradient */}
      <div className="absolute inset-0.5 rounded-full" style={{ background: 'linear-gradient(135deg, #A78BFA, #7C3AED)' }} />
      {/* Blob 1 */}
      <m.div
        className="absolute rounded-full"
        style={{ width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(212,212,216,0.6) 0%, transparent 60%)', filter: 'blur(3px)' }}
        animate={{ x: ['-10%', '30%', '10%', '-20%', '-10%'], y: ['10%', '-15%', '25%', '-10%', '10%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Blob 2 */}
      <m.div
        className="absolute rounded-full"
        style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(124,58,237,0.7) 0%, transparent 55%)', filter: 'blur(2px)' }}
        animate={{ x: ['20%', '-15%', '-25%', '15%', '20%'], y: ['-15%', '20%', '-10%', '25%', '-15%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Blob 3 */}
      <m.div
        className="absolute rounded-full"
        style={{ width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 50%)', filter: 'blur(2px)' }}
        animate={{ x: ['-5%', '25%', '-20%', '10%', '-5%'], y: ['20%', '-10%', '15%', '-20%', '20%'], scale: [1, 1.2, 0.9, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Specular highlight */}
      <m.div
        className="absolute rounded-full"
        style={{ inset: '20%', background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35) 0%, transparent 55%)' }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// ── Animated placeholder ────────────────────────────────────────────────────

function AnimatedPlaceholder({
  index,
  visible,
  texts,
}: {
  index: number
  visible: boolean
  texts: string[]
}) {
  // Repli sur le premier : si la langue bascule en pleine rotation, l'index
  // courant peut depasser la nouvelle liste.
  const text = texts[index] ?? texts[0]

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <m.span
          key={index}
          className="absolute inset-0 flex items-center text-text-muted text-base md:text-sm select-none pointer-events-none whitespace-nowrap overflow-hidden"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.018 } },
            exit: { transition: { staggerChildren: 0.01, staggerDirection: -1 } },
          }}
        >
          {text.split('').map((char, i) => (
            <m.span
              key={i}
              style={{ display: 'inline-block' }}
              variants={{
                initial: { opacity: 0, filter: 'blur(6px)', y: 4 },
                animate: {
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                  transition: {
                    opacity: { duration: 0.2 },
                    filter: { duration: 0.25 },
                    y: { type: 'spring' as const, stiffness: 100, damping: 20 },
                  },
                },
                exit: {
                  opacity: 0,
                  filter: 'blur(6px)',
                  y: -4,
                  transition: { opacity: { duration: 0.12 }, filter: { duration: 0.15 } },
                },
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </m.span>
          ))}
        </m.span>
      )}
    </AnimatePresence>
  )
}

// ── Typing indicator ────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <m.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1.5 px-4 py-2"
    >
      <AnimatedOrb size={20} />
      <span className="text-xs sm:text-[13px] text-text-muted">en train d&apos;ecrire</span>
    </m.div>
  )
}

// ── Message bubble ──────────────────────────────────────────────────────────

function MessageBubble({ role, content }: { role: 'user' | 'assistant'; content: string }) {
  const isUser = role === 'user'

  // Le token [BOOK] est consommé par la CTA bar (voir SmartCTABar) pour
  // transformer un des 3 boutons en reservation Cal.com. On se contente
  // ici de le retirer du texte visible.
  const visibleContent = isUser ? content : stripBookToken(content)

  return (
    <m.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: DKDP_BOUNCE }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] text-[13.5px] sm:text-[15px] leading-relaxed ${
          isUser
            ? 'bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.25)] text-text rounded-2xl rounded-br-sm px-4 py-2.5'
            : 'text-text-secondary'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              // mb-4 par defaut entre paragraphes ; quand un paragraphe ne
              // contient qu'un lien-bouton, on lui donne my-5 supplementaire
              // (~1 ligne vide) pour bien le detacher du texte au-dessus et
              // au-dessous, comme le demande la lecture en bulle de chat.
              p: ({ children }) => (
                <p className="mb-4 last:mb-0 [&:has(>a:only-child)]:my-5 [&:has(>a:only-child)]:first:mt-2">
                  {children}
                </p>
              ),
              strong: ({ children }) => <strong className="text-text font-semibold">{children}</strong>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-4 last:mb-0 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-4 last:mb-0 space-y-1">{children}</ol>,
              a: ({ href, children }) => {
                // Liens rendus en pill button : couleur violette, pas de souligne,
                // une petite marge horizontale et verticale pour respirer dans le texte.
                const linkClasses = 'inline-flex items-center gap-1 mx-1 my-1 px-2.5 py-0.5 rounded-full text-[12px] sm:text-[13px] font-medium align-middle whitespace-nowrap bg-[var(--violet-bg)] border border-[var(--violet-border)] text-[var(--violet-text)] hover:bg-[var(--violet-glow)] hover:text-[var(--violet)] transition-colors'

                // Anchor links (#hash) and protocol links (mailto:, tel:) stay as <a>.
                const isInternal = typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')
                if (isInternal) {
                  return (
                    <Link href={href} className={linkClasses}>
                      {children}
                      <ArrowRight size={11} />
                    </Link>
                  )
                }
                const isProtocol = typeof href === 'string' && /^(mailto:|tel:|sms:)/i.test(href)
                return (
                  <a
                    href={href}
                    target={isProtocol ? undefined : '_blank'}
                    rel={isProtocol ? undefined : 'noopener noreferrer'}
                    className={linkClasses}
                  >
                    {children}
                    <ArrowRight size={11} />
                  </a>
                )
              },
            }}
          >
            {visibleContent}
          </Markdown>
        )}
      </div>
    </m.div>
  )
}

function stripBookToken(text: string): string {
  return text.replace(/\[BOOK\]/g, '').replace(/\n{3,}/g, '\n\n').trim()
}

// ── Smart CTA bar : 3 CTAs qui s'adaptent au dernier message ────────────────

type CTAKey =
  | 'book' | 'contact' | 'services' | 'tarifs'
  | 'site-web' | 'seo' | 'sea' | 'reseaux-sociaux' | 'video' | 'consulting'
  | 'agents-ia' | 'automatisation' | 'audit-ia' | 'mise-en-place-ia' | 'chatbot'
  | 'formation-ia' | 'formation-claude'

type CTADef = {
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  href?: string
  action?: () => void
}

// Catalogue des CTAs indexe par chemin pour le matching des liens
// markdown emis par l'assistant. `book` n'a pas de href puisque la
// modale Cal.com s'ouvre via une action cote client.
const CTA_CATALOG: Record<CTAKey, CTADef> = {
  book:              { label: 'Réserver 30 min',           icon: CalendarCheck, action: openBookingModal },
  contact:           { label: 'Nous contacter',            icon: Mail,          href: '/contact' },
  services:          { label: 'Nos services',              icon: Sparkles,      href: '/#nos-expertises' },
  tarifs:            { label: 'Voir les tarifs',           icon: FileText,      href: '/tarifs' },
  'site-web':        { label: 'Création de site web',      icon: Globe,         href: '/agence-digitale/creation-site-web' },
  seo:               { label: 'SEO et référencement',      icon: Search,        href: '/agence-digitale/seo' },
  sea:               { label: 'Publicité Google Ads',      icon: Megaphone,     href: '/agence-digitale/publicite-sea' },
  'reseaux-sociaux': { label: 'Réseaux sociaux',           icon: Sparkles,      href: '/agence-digitale/reseaux-sociaux' },
  video:             { label: 'Création vidéo',            icon: Sparkles,      href: '/agence-digitale/creation-video' },
  consulting:        { label: 'Consulting marketing',      icon: Sparkles,      href: '/agence-digitale/consulting-marketing' },
  'agents-ia':       { label: 'Agents IA sur mesure',      icon: Bot,           href: '/intelligence-artificielle/agents-ia' },
  automatisation:    { label: 'Automatisation métier',     icon: Workflow,      href: '/intelligence-artificielle/automatisation' },
  'audit-ia':        { label: 'Audit et conseil IA',       icon: BrainCircuit,  href: '/intelligence-artificielle/audit-conseil' },
  'mise-en-place-ia':{ label: 'Mise en place IA',          icon: Sparkles,      href: '/intelligence-artificielle/mise-en-place' },
  chatbot:           { label: 'Chatbot IA sur mesure',     icon: MessageCircle, href: '/intelligence-artificielle/chatbot-ia' },
  'formation-ia':    { label: 'Formation IA entreprise',   icon: GraduationCap, href: '/formation-entreprise/ia' },
  'formation-claude':{ label: 'Formation Claude IA',       icon: GraduationCap, href: '/formation-entreprise/claude-ai' },
}

// Mapping href → CTAKey pour detecter quel CTA le bot a mentionne
const HREF_TO_CTA: Record<string, CTAKey> = Object.entries(CTA_CATALOG).reduce((acc, [key, def]) => {
  if (def.href) acc[def.href] = key as CTAKey
  return acc
}, {} as Record<string, CTAKey>)

// Mots-cles de repli quand aucun lien markdown n'est trouve dans le message
const KEYWORD_TO_CTA: { pattern: RegExp; cta: CTAKey }[] = [
  { pattern: /\bchatbot\b/i,                           cta: 'chatbot' },
  { pattern: /\bagent[s]? ia\b/i,                      cta: 'agents-ia' },
  { pattern: /\bautomatis/i,                           cta: 'automatisation' },
  { pattern: /\baudit\b.*\bia\b|\bconseil\b.*\bia\b/i, cta: 'audit-ia' },
  { pattern: /\bformation claude\b/i,                  cta: 'formation-claude' },
  { pattern: /\bformation ia\b|\bformation chatgpt\b/i,cta: 'formation-ia' },
  { pattern: /\bsite (web|internet)\b|refonte/i,       cta: 'site-web' },
  { pattern: /\bseo\b|référencement|mots.cl/i,         cta: 'seo' },
  { pattern: /google ads|\bsea\b|publicité/i,          cta: 'sea' },
  { pattern: /réseaux sociaux|instagram|linkedin/i,    cta: 'reseaux-sociaux' },
  { pattern: /vidéo|montage/i,                         cta: 'video' },
  { pattern: /tarif|prix|budget|combien/i,             cta: 'tarifs' },
]

// Choisit jusqu'a 3 CTAs pertinents a partir du contenu du dernier message
// assistant (+ fallback vers un set par defaut).
function selectCTAs(content: string): CTAKey[] {
  const picks: CTAKey[] = []
  const add = (key: CTAKey) => {
    if (!picks.includes(key) && picks.length < 3) picks.push(key)
  }

  // 1. Token [BOOK] -> reservation Cal.com en premier
  if (/\[BOOK\]/.test(content)) add('book')

  // 2. Liens markdown explicites /agence-digitale/... -> CTA direct
  const linkRe = /\]\((\/[a-z0-9/-]+)\)/gi
  let match: RegExpExecArray | null
  while ((match = linkRe.exec(content)) !== null) {
    const href = match[1].replace(/#.*$/, '') // drop fragment
    const cta = HREF_TO_CTA[href]
    if (cta) add(cta)
  }

  // 3. Mots-cles si pas encore 3 CTAs
  if (picks.length < 3) {
    for (const { pattern, cta } of KEYWORD_TO_CTA) {
      if (pattern.test(content)) add(cta)
      if (picks.length >= 3) break
    }
  }

  // 4. Remplit avec defaults neutres (en evitant les doublons)
  const FALLBACKS: CTAKey[] = ['services', 'tarifs', 'contact']
  for (const cta of FALLBACKS) {
    if (picks.length >= 3) break
    add(cta)
  }

  return picks
}

function SmartCTABar({ lastAssistantContent }: { lastAssistantContent: string }) {
  const ctas = selectCTAs(lastAssistantContent)

  return (
    <m.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="flex flex-wrap gap-2 mt-5"
    >
      {ctas.map((key, idx) => {
        const def = CTA_CATALOG[key]
        const Icon = def.icon
        // Premier CTA : mis en valeur avec gradient violet (primary)
        const isPrimary = idx === 0 && key === 'book'
        const baseClasses = 'inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[11.5px] sm:text-[13px] font-medium cursor-pointer transition-all duration-200'
        const primaryClasses = 'text-white border border-[rgba(124,58,237,0.4)] font-semibold hover:border-[rgba(124,58,237,0.6)] hover:brightness-110'
        const primaryStyle = { background: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(167,139,250,0.20))' }
        const secondaryClasses = 'bg-[var(--surface-default)] border border-[var(--surface-border)] text-text-secondary hover:bg-[rgba(124,58,237,0.10)] hover:border-[rgba(124,58,237,0.30)] hover:text-text'

        const inner = (
          <>
            <Icon size={11} />
            {def.label}
            {!def.action && <ArrowRight size={10} />}
          </>
        )

        if (def.action) {
          return (
            <button
              key={key}
              type="button"
              onClick={def.action}
              className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
              style={isPrimary ? primaryStyle : undefined}
            >
              {inner}
            </button>
          )
        }

        return (
          <Link
            key={key}
            href={def.href!}
            className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
            style={isPrimary ? primaryStyle : undefined}
          >
            {inner}
          </Link>
        )
      })}
    </m.div>
  )
}

// ── Limit reached CTA ───────────────────────────────────────────────────────

function LimitReachedCTA() {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: DKDP_BOUNCE }}
      className="mx-5 mb-3 p-5 rounded-2xl text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(255,107,0,0.06))',
        border: '1px solid rgba(124,58,237,0.2)',
      }}
    >
      <p className="text-sm sm:text-[15px] text-text-secondary mb-4">
        Pour approfondir votre projet, prenons quelques minutes ensemble.
      </p>
      <button
        data-cal-link="david-khazaei/planifier-un-appel"
        data-cal-namespace="planifier-un-appel"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm sm:text-[15px] font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #7C3AED, #FF6B00)' }}
      >
        <CalendarCheck size={15} />
        Planifier un appel gratuit
      </button>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <Link href="/contact" className="text-xs sm:text-[13px] text-[#A78BFA] hover:text-[#c4b5fd] underline underline-offset-2 transition-colors">
          Nous contacter
        </Link>
        <span className="text-xs sm:text-[13px] text-text-muted">{'\u00B7'}</span>
        <Link href="/tarifs" className="text-xs sm:text-[13px] text-[#A78BFA] hover:text-[#c4b5fd] underline underline-offset-2 transition-colors">
          Voir les tarifs
        </Link>
        <span className="text-xs sm:text-[13px] text-text-muted">{'\u00B7'}</span>
        <Link href="/agence-digitale" className="text-xs sm:text-[13px] text-[#A78BFA] hover:text-[#c4b5fd] underline underline-offset-2 transition-colors">
          Nos services
        </Link>
      </div>
    </m.div>
  )
}

// ── Main ChatWidget ─────────────────────────────────────────────────────────

export function ChatWidget() {
  const [isEurope, setIsEurope] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const [barFocused, setBarFocused] = useState(false)
  const pathname = usePathname()
  // Textes du widget selon la langue de la page (voir copyFor plus haut).
  const copy = copyFor(localeFromPath(pathname))
  const prevPathnameRef = useRef(pathname)
  const honeypotRef = useRef('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatInputRef = useRef<HTMLTextAreaElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  // ── Analytics : session_id genere paresseusement au 1er message ──
  // On stocke en ref pour que le transport callback lise toujours la
  // valeur courante sans recreer le transport. Le sessionId est aussi
  // persiste dans localStorage avec les messages (meme TTL 24h) pour
  // qu'un reload mid-conversation continue la meme session analytics.
  const sessionIdRef = useRef<string | null>(null)
  const lastActivityRef = useRef<number>(0)
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function getOrCreateSessionId(): string {
    if (sessionIdRef.current) return sessionIdRef.current
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`
    sessionIdRef.current = id
    return id
  }

  function closeAnalyticsSession() {
    const id = sessionIdRef.current
    if (!id) return
    sessionIdRef.current = null

    // Nettoie le sessionId du localStorage tout en gardant les messages.
    // Si le visiteur revient (TTL 24h), il voit toujours sa conversation,
    // mais analytics-wise un nouveau sessionId sera genere au prochain
    // message envoye. Evite l'orphelinat de chat_messages apres
    // closeSession + reload.
    try {
      const saved = localStorage.getItem('dkdp-chat')
      if (saved) {
        const parsed = JSON.parse(saved) as { ts?: number; messages?: unknown }
        if (parsed.messages) {
          localStorage.setItem(
            'dkdp-chat',
            JSON.stringify({ ts: parsed.ts ?? Date.now(), messages: parsed.messages }),
          )
        }
      }
    } catch { /* ignore */ }

    if (typeof navigator === 'undefined') return
    const payload = JSON.stringify({
      sessionId: id,
      referrer: typeof window !== 'undefined' ? window.location.pathname : undefined,
    })
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' })
        navigator.sendBeacon('/api/chat/close', blob)
      } else {
        fetch('/api/chat/close', {
          method: 'POST',
          body: payload,
          keepalive: true,
          headers: { 'Content-Type': 'text/plain' },
        }).catch(() => {})
      }
    } catch { /* ignore */ }
  }

  // ── Dictée vocale (Web Speech API) ──
  const speech = useSpeechRecognition({ lang: copy.speechLang })
  useEffect(() => {
    if (speech.transcript) setInputValue(speech.transcript)
  }, [speech.transcript])

  // Log speech errors to console (aide debug et transparent pour l'utilisateur)
  useEffect(() => {
    if (speech.error) console.warn('[chatbot dictation]', speech.error)
  }, [speech.error])

  // Hide chat outside Europe
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )geo-eu=([^;]*)/)
    if (match && match[1] === '0') setIsEurope(false)
  }, [])

  // Le callback body est invoque a chaque envoi de message (PAS pendant render).
  // L'acces aux refs est donc safe : on disable react-hooks/refs qui flag
  // toute fonction lisant un ref passee a un constructeur, sans distinguer
  // l'invocation differee de l'invocation pendant render.
  // eslint-disable-next-line react-hooks/refs
  const [chatTransport] = useState(() => new DefaultChatTransport({
    body: () => ({
      _hp: honeypotRef.current,
      sessionId: getOrCreateSessionId(),
      // Page d'ou part la conversation. Envoyee a chaque message et plus
      // seulement dans le beacon de fermeture, qui se perd souvent.
      referrer: typeof window !== 'undefined' ? window.location.pathname : undefined,
    }),
  }))

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport: chatTransport,
  })

  // ── Persist messages in localStorage avec TTL 1h ──
  // localStorage (vs sessionStorage precedent) survit a la fermeture de
  // l'onglet : le visiteur qui revient dans l'heure retrouve sa conversation.
  // Au-dela de 1h on repart sur un chat neuf pour eviter d'accumuler des
  // contextes perimes.
  const CHAT_STORAGE_KEY = 'dkdp-chat'
  const CHAT_TTL_MS = 24 * 60 * 60 * 1000 // 24 heures
  const restoredRef = useRef(false)

  // Restore on mount
  useEffect(() => {
    if (restoredRef.current) return
    restoredRef.current = true
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY)
      if (!saved) return
      const parsed = JSON.parse(saved) as { ts?: number; messages?: unknown; sessionId?: unknown }
      const age = parsed.ts ? Date.now() - parsed.ts : Infinity
      if (age > CHAT_TTL_MS) {
        localStorage.removeItem(CHAT_STORAGE_KEY)
        return
      }
      if (typeof parsed.sessionId === 'string' && parsed.sessionId.length > 0) {
        sessionIdRef.current = parsed.sessionId
      }
      if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
        setMessages(parsed.messages as typeof messages)
      }
    } catch { /* ignore */ }
  }, [setMessages])

  // Save when messages change (skip initial render before restore)
  useEffect(() => {
    if (!restoredRef.current) return
    try {
      if (messages.length > 0) {
        localStorage.setItem(
          CHAT_STORAGE_KEY,
          JSON.stringify({ ts: Date.now(), messages, sessionId: sessionIdRef.current }),
        )
      } else {
        localStorage.removeItem(CHAT_STORAGE_KEY)
      }
    } catch { /* ignore */ }
  }, [messages])

  // Close chat on route change.
  // closedByNavRef signale au useEffect du body-lock qu'il ne doit PAS
  // restaurer la position de scroll de l'ancienne page sur la nouvelle.
  const closedByNavRef = useRef(false)
  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname
      if (isOpen) closedByNavRef.current = true
      setIsOpen(false)
    }
  }, [pathname, isOpen])

  // Lock body scroll when chat is open (prevents background scroll on mobile)
  const scrollYRef = useRef(0)
  useEffect(() => {
    const html = document.documentElement
    if (isOpen) {
      scrollYRef.current = window.scrollY
      document.body.classList.add('chat-open')
      document.body.style.top = `-${scrollYRef.current}px`
      // Pause Lenis smooth scroll to prevent scroll accumulation
      html.classList.add('lenis-stopped')
    } else {
      document.body.classList.remove('chat-open')
      document.body.style.top = ''
      html.classList.remove('lenis-stopped')
      // Skip scroll restore if the chat closed because the user navigated:
      // scrollYRef belongs to the previous page and would land them at a random
      // position on the new page (felt like "the link is broken").
      if (closedByNavRef.current) {
        closedByNavRef.current = false
        scrollYRef.current = 0
      } else {
        window.scrollTo(0, scrollYRef.current)
      }
    }
    return () => {
      document.body.classList.remove('chat-open')
      document.body.style.top = ''
      html.classList.remove('lenis-stopped')
    }
  }, [isOpen])

  // Conversion (engagement) : ouverture du chatbot, comptee une fois par chargement.
  const chatOpenTrackedRef = useRef(false)
  useEffect(() => {
    if (isOpen && !chatOpenTrackedRef.current) {
      chatOpenTrackedRef.current = true
      trackChatOpen()
    }
  }, [isOpen])

  const hasConversation = messages.length > 0
  const userMessageCount = messages.filter((m) => m.role === 'user').length
  const isLimitReached = userMessageCount >= MESSAGE_LIMIT
  const isLoading = status === 'submitted' || status === 'streaming'

  // ── Follow-ups dynamiques ──
  // Apres chaque reponse de l'assistant, on appelle /api/chat/suggestions
  // pour proposer 3 questions de relance contextualisees.
  const [suggestions, setSuggestions] = useState<string[]>([])
  const suggestionsAbortRef = useRef<AbortController | null>(null)
  const lastFetchedIdRef = useRef<string | null>(null)

  // Find the last assistant message index to show CTAs only on it
  const lastAssistantIdx = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'assistant') return i
    }
    return -1
  })()

  function getMessageText(message: typeof messages[number]): string {
    return message.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('') ?? ''
  }

  // Fetch des follow-ups quand un message assistant vient de finir
  useEffect(() => {
    if (status !== 'ready') return
    if (messages.length === 0) return
    if (isLimitReached) return
    const lastMsg = messages[messages.length - 1]
    if (lastMsg.role !== 'assistant') return
    if (lastFetchedIdRef.current === lastMsg.id) return
    const lastText = getMessageText(lastMsg)
    if (!lastText.trim()) return

    lastFetchedIdRef.current = lastMsg.id
    suggestionsAbortRef.current?.abort()
    const ctrl = new AbortController()
    suggestionsAbortRef.current = ctrl

    const tail = messages.slice(-4).map((msg) => ({
      role: msg.role,
      content: getMessageText(msg),
    }))

    fetch('/api/chat/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: tail }),
      signal: ctrl.signal,
    })
      .then((r) => r.ok ? r.json() : { suggestions: [] })
      .then((data: { suggestions?: unknown }) => {
        if (ctrl.signal.aborted) return
        if (Array.isArray(data.suggestions)) {
          const list = data.suggestions
            .filter((s): s is string => typeof s === 'string')
            .slice(0, 3)
          setSuggestions(list)
        }
      })
      .catch(() => { /* abort ou reseau, ignore */ })
  }, [status, messages, isLimitReached])

  // Quand l'utilisateur envoie un nouveau message, on cache les
  // suggestions precedentes (elles ne refletent plus le contexte).
  useEffect(() => {
    if (messages.length === 0) {
      setSuggestions([])
      return
    }
    const lastMsg = messages[messages.length - 1]
    if (lastMsg.role === 'user') {
      setSuggestions([])
      suggestionsAbortRef.current?.abort()
    }
  }, [messages])

  // Cycle placeholder on the bottom bar
  useEffect(() => {
    if (isOpen || barFocused || inputValue) return
    const interval = setInterval(() => {
      setShowPlaceholder(false)
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % copy.placeholders.length)
        setShowPlaceholder(true)
      }, 250)
    }, 3500)
    return () => clearInterval(interval)
    // copy.placeholders.length : le widget est monte dans le layout racine et
    // survit aux changements de page, donc la langue peut basculer en cours de
    // route (FR -> EN). Sans cette dependance le modulo garderait l'ancienne
    // longueur.
  }, [isOpen, barFocused, inputValue, copy.placeholders.length])

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, status])

  // Focus chat input when opening
  useEffect(() => {
    if (isOpen) setTimeout(() => chatInputRef.current?.focus(), 350)
  }, [isOpen])

  // Close bar focus on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        if (!inputValue) setBarFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [inputValue])

  // Close chat on Escape
  useEffect(() => {
    function handleKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // ── Analytics : ferme la session sur unload, hide tab, ou inactivite ──
  // Trois triggers pour maximiser la chance de generer un resume :
  //   1. beforeunload : visiteur ferme l'onglet ou navigue ailleurs
  //   2. visibilitychange (hidden) : passe a un autre onglet > 30s
  //   3. inactivite cote chat : 5 min sans nouveau message
  useEffect(() => {
    const INACTIVITY_MS = 5 * 60 * 1000

    function bumpActivity() {
      lastActivityRef.current = Date.now()
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
      inactivityTimerRef.current = setTimeout(() => {
        closeAnalyticsSession()
      }, INACTIVITY_MS)
    }

    function handleUnload() {
      closeAnalyticsSession()
    }

    function handleVisibility() {
      if (document.visibilityState === 'hidden') {
        // Petit delai : un alt-tab rapide ne doit pas couper la session.
        setTimeout(() => {
          if (document.visibilityState === 'hidden') closeAnalyticsSession()
        }, 30 * 1000)
      }
    }

    bumpActivity()
    window.addEventListener('beforeunload', handleUnload)
    window.addEventListener('pagehide', handleUnload)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('beforeunload', handleUnload)
      window.removeEventListener('pagehide', handleUnload)
      document.removeEventListener('visibilitychange', handleVisibility)
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
    }
  }, [])

  // Bump l'activite a chaque nouveau message (relance le timer 5 min).
  useEffect(() => {
    if (messages.length === 0) return
    lastActivityRef.current = Date.now()
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
    inactivityTimerRef.current = setTimeout(() => {
      closeAnalyticsSession()
    }, 5 * 60 * 1000)
  }, [messages.length])

  // Close chat when any internal link inside the chat window is clicked
  const chatWindowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = chatWindowRef.current
    if (!el || !isOpen) return
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (href && (href.startsWith('/') || href.startsWith('#'))) {
        setIsOpen(false)
      }
    }
    el.addEventListener('click', handleClick)
    return () => el.removeEventListener('click', handleClick)
  }, [isOpen])

  const handleBarSubmit = useCallback((e?: FormEvent) => {
    e?.preventDefault()
    const text = inputValue.trim()
    if (!text) return
    speech.stop()
    setIsOpen(true)
    sendMessage({ text })
    setInputValue('')
    setBarFocused(false)
  }, [inputValue, sendMessage, speech])

  function handleChatSubmit(e?: FormEvent) {
    e?.preventDefault()
    const text = inputValue.trim()
    if (!text || isLoading || isLimitReached) return
    speech.stop()
    sendMessage({ text })
    setInputValue('')
    if (chatInputRef.current) chatInputRef.current.style.height = 'auto'
  }

  function handleChatKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleChatSubmit()
    }
  }

  function handleSuggestionClick(text: string) {
    setIsOpen(true)
    sendMessage({ text })
  }

  function handleReset() {
    // Cloture la session analytics courante avant de repartir a zero.
    closeAnalyticsSession()
    setMessages([])
    setInputValue('')
    setSuggestions([])
    suggestionsAbortRef.current?.abort()
    lastFetchedIdRef.current = null
    try { localStorage.removeItem(CHAT_STORAGE_KEY) } catch { /* ignore */ }
  }

  if (!isEurope) return null

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          BOTTOM SEARCH BAR (closed state)
         ════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!isOpen && (
          <div ref={barRef} className="chat-bottom-bar-wrapper">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              width: barFocused ? 'min(580px, calc(100vw - 16px))' : 'min(410px, calc(100vw - 16px))',
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: DKDP_BOUNCE }}
          >
            {speech.error && (
              <m.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] px-3 py-1 rounded-full shadow-lg"
                style={{
                  color: 'var(--red-text)',
                  background: 'var(--red-bg)',
                  border: '1px solid var(--red-border)',
                }}
                role="alert"
              >
                {speech.error}
              </m.div>
            )}
            <form
              onSubmit={handleBarSubmit}
              onClick={() => { if (messages.length > 0) setIsOpen(true) }}
              className="relative flex items-center gap-3 rounded-full px-3 py-2 transition-shadow duration-300 cursor-text"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-violet)',
                boxShadow: barFocused
                  ? '0 0 0 1px rgba(124,58,237,0.30)'
                  : '0 0 0 1px var(--surface-border)',
              }}
            >
              <AnimatedOrb size={28} animated />

              {/* Honeypot: invisible to humans, bots fill it */}
              <input
                type="text"
                name="website"
                onChange={(e) => { honeypotRef.current = e.target.value }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, width: 0, height: 0 }}
              />

              <div className="relative flex-1 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  maxLength={MAX_CHAR_LENGTH}
                  aria-label={copy.labels.ask}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_CHAR_LENGTH) setInputValue(e.target.value)
                  }}
                  onFocus={() => {
                    if (messages.length > 0) {
                      setIsOpen(true)
                      return
                    }
                    setBarFocused(true)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleBarSubmit()
                    }
                  }}
                  className="w-full bg-transparent text-sm text-text outline-none placeholder-transparent py-1.5"
                />
                {!inputValue && (
                  <div className="absolute inset-0 flex items-center pointer-events-none">
                    {hasConversation ? (
                      <span className="text-base md:text-sm text-[#A78BFA] font-medium">Reprendre notre conversation.</span>
                    ) : (
                      <>
                        <AnimatedPlaceholder
                          index={placeholderIndex}
                          visible={showPlaceholder && !barFocused}
                          texts={copy.placeholders}
                        />
                        {barFocused && (
                          <span className="text-base md:text-sm text-text-muted">Posez votre question...</span>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

              {speech.isAvailable && (
                <m.button
                  type="button"
                  onClick={speech.toggle}
                  aria-label={speech.isListening ? copy.labels.stopDictation : copy.labels.dictate}
                  aria-pressed={speech.isListening}
                  className="flex-shrink-0 w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center rounded-full cursor-pointer relative"
                  style={{
                    background: speech.isListening
                      ? 'var(--red-bg)'
                      : 'var(--surface-default)',
                  }}
                  whileTap={{ scale: 0.94 }}
                >
                  <Mic size={15} className={speech.isListening ? 'text-[var(--red-text)]' : 'text-text-secondary'} />
                  {speech.isListening && (
                    <m.span
                      className="absolute inset-0 rounded-full border pointer-events-none"
                      style={{ borderColor: 'var(--red-border)' }}
                      animate={{ scale: [1, 1.3], opacity: [0.7, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                </m.button>
              )}

              <m.button
                type="submit"
                disabled={!inputValue.trim()}
                aria-label={copy.labels.send}
                className="flex-shrink-0 w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-default"
                style={{
                  background: inputValue.trim()
                    ? '#7C3AED'
                    : 'var(--surface-border)',
                }}
                whileHover={inputValue.trim() ? { scale: 1.08 } : {}}
                whileTap={inputValue.trim() ? { scale: 0.94 } : {}}
              >
                <Send size={15} className={inputValue.trim() ? 'text-white' : 'text-text-secondary'} />
              </m.button>
            </form>
          </m.div>
          </div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════════
          BACKDROP (click outside to close)
         ════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            key="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════════
          CHAT WINDOW (open state)
         ════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <div ref={chatWindowRef} className="chat-window">
          <m.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring' as const, damping: 24, stiffness: 280 }}
            className="flex flex-col overflow-hidden rounded-2xl w-full h-full"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-violet)',
              boxShadow: '0 0 0 1px var(--border-violet)',
              overscrollBehavior: 'contain',
              touchAction: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <AnimatedOrb size={32} />
                <div>
                  <Image src="/images/logo/dkdp_blanc-croped.png" alt="DKDP" width={36} height={12} className="h-2.5 w-auto -ml-[5px] dark-only" />
                  <Image src="/images/logo/dkdp_noir-croped.png" alt="DKDP" width={36} height={12} className="h-2.5 w-auto -ml-[5px] light-only" />
                  <p className="text-[11px] sm:text-[12.5px] text-text-muted">Assistant IA</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {messages.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="p-3 sm:p-2.5 rounded-full hover:bg-[var(--surface-default)] transition-colors cursor-pointer"
                    title={copy.labels.clear}
                    aria-label={copy.labels.clear}
                  >
                    <RotateCcw size={16} className="text-text-muted sm:w-[14px] sm:h-[14px]" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 sm:p-2.5 rounded-full hover:bg-[var(--surface-default)] active:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
                >
                  <X size={20} className="text-text sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>

            {/* ── Messages area ── */}
            <div
              className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
              data-lenis-prevent
              style={{
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Welcome + suggestions : disparaissent au 1er message user */}
              <AnimatePresence initial={false}>
                {messages.length === 0 && (
                  <m.div
                    key="welcome-block"
                    exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ overflow: 'hidden' }}
                    className="space-y-4"
                  >
                    {/* Welcome */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <AnimatedOrb size={24} />
                      </div>
                      <div>
                        <m.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="text-[13.5px] sm:text-[15px] text-text-secondary leading-relaxed"
                        >
                          {copy.welcome}
                        </m.p>
                      </div>
                    </div>

                    {/* Suggestion buttons */}
                    <m.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                      className="flex flex-col gap-2 pl-0 sm:pl-9"
                    >
                      {copy.suggestions.map(({ icon, label }) => (
                        <button
                          key={label}
                          onClick={() => handleSuggestionClick(label)}
                          className="group flex items-center gap-2.5 px-4 py-3 sm:py-3 rounded-xl text-left text-[13px] sm:text-[14.5px] cursor-pointer transition-all duration-200 active:scale-[0.98]
                            bg-[var(--surface-default)] border border-[var(--surface-border)]
                            hover:bg-[rgba(124,58,237,0.10)] hover:border-[rgba(124,58,237,0.30)]"
                        >
                          <span className="text-[#A78BFA] group-hover:text-[#c4b5fd] transition-colors">{icon}</span>
                          <span className="text-text-secondary group-hover:text-text transition-colors">{label}</span>
                        </button>
                      ))}
                    </m.div>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Chat messages */}
              {messages.map((msg, idx) => {
                const text = getMessageText(msg)
                if (!text) return null
                const isLastAssistant = msg.role === 'assistant' && idx === lastAssistantIdx && !isLoading
                return (
                  <div key={msg.id}>
                    <MessageBubble
                      role={msg.role as 'user' | 'assistant'}
                      content={text}
                    />
                    {/* CTA bar adaptatif sous le dernier message assistant */}
                    {isLastAssistant && <SmartCTABar lastAssistantContent={text} />}
                    {/* Follow-ups dynamiques generes par l'API */}
                    {isLastAssistant && suggestions.length > 0 && (
                      <m.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                        className="flex flex-col gap-2.5 mt-5"
                      >
                        <p className="text-[11px] sm:text-[12px] text-text-muted uppercase tracking-wider font-medium">
                          Vous pouvez aussi demander
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {suggestions.map((s, i) => (
                            <button
                              key={`${s}-${i}`}
                              type="button"
                              onClick={() => {
                                setSuggestions([])
                                speech.stop()
                                sendMessage({ text: s })
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] sm:text-[13px] font-medium cursor-pointer transition-all duration-200 bg-[var(--surface-default)] border border-[var(--surface-border)] text-text-secondary hover:bg-[rgba(124,58,237,0.10)] hover:border-[rgba(124,58,237,0.30)] hover:text-text"
                            >
                              {s}
                              <ArrowRight size={11} />
                            </button>
                          ))}
                        </div>
                      </m.div>
                    )}
                  </div>
                )
              })}

              {/* Typing */}
              {isLoading && status === 'submitted' && <TypingIndicator />}

              {/* Error */}
              {error && (
                <m.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-center py-2"
                  style={{ color: 'var(--red-text)' }}
                >
                  Une erreur est survenue. Veuillez reessayer.
                </m.p>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Limit reached ── */}
            {isLimitReached && <LimitReachedCTA />}

            {/* ── Input bar (inside chat) ── */}
            {!isLimitReached && (
              <div
                className="flex-shrink-0 px-4 pt-2"
                style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))' }}
              >
                {speech.error && (
                  <m.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-2 text-[11px] px-3 py-1.5 rounded-lg"
                    style={{
                      color: 'var(--red-text)',
                      background: 'var(--red-bg)',
                      border: '1px solid var(--red-border)',
                    }}
                    role="alert"
                  >
                    {speech.error}
                  </m.div>
                )}
                <form
                  onSubmit={handleChatSubmit}
                  className="flex items-end gap-2 rounded-2xl px-3 py-2"
                  style={{
                    background: 'var(--bg-card-hover)',
                    border: '1px solid var(--border-violet)',
                  }}
                >
                  <div className="relative flex-1 min-w-0">
                    <textarea
                      ref={chatInputRef}
                      value={inputValue}
                      onChange={(e) => {
                        const val = e.target.value
                        if (val.length <= MAX_CHAR_LENGTH) {
                          setInputValue(val)
                          e.target.style.height = 'auto'
                          e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
                        }
                      }}
                      onKeyDown={handleChatKeyDown}
                      rows={1}
                      maxLength={MAX_CHAR_LENGTH}
                      disabled={isLoading}
                      placeholder="Ecrivez votre message..."
                      className="w-full bg-transparent text-sm sm:text-[15px] text-text placeholder-text-muted outline-none resize-none py-1.5"
                      style={{ minHeight: '28px', maxHeight: '100px' }}
                    />
                  </div>
                  {speech.isAvailable && (
                    <m.button
                      type="button"
                      onClick={speech.toggle}
                      disabled={isLoading}
                      aria-label={speech.isListening ? copy.labels.stopDictation : copy.labels.dictate}
                      aria-pressed={speech.isListening}
                      className="flex-shrink-0 w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center rounded-full cursor-pointer disabled:opacity-20 disabled:cursor-default mb-0.5 relative"
                      style={{
                        background: speech.isListening
                          ? 'var(--red-bg)'
                          : 'var(--surface-default)',
                      }}
                      whileTap={{ scale: 0.94 }}
                    >
                      <Mic size={14} className={speech.isListening ? 'text-[var(--red-text)]' : 'text-text-secondary'} />
                      {speech.isListening && (
                        <m.span
                          className="absolute inset-0 rounded-full border pointer-events-none"
                          style={{ borderColor: 'var(--red-border)' }}
                          animate={{ scale: [1, 1.3], opacity: [0.7, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                        />
                      )}
                    </m.button>
                  )}
                  <m.button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    aria-label={copy.labels.send}
                    className="flex-shrink-0 w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-default mb-0.5"
                    style={{
                      background: inputValue.trim()
                        ? '#7C3AED'
                        : 'var(--surface-border)',
                    }}
                    whileHover={inputValue.trim() ? { scale: 1.08 } : {}}
                    whileTap={inputValue.trim() ? { scale: 0.94 } : {}}
                  >
                    <Send size={14} className={inputValue.trim() ? 'text-white' : 'text-text-secondary'} />
                  </m.button>
                </form>
              </div>
            )}
          </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
