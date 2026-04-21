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
import { getCalApi } from '@calcom/embed-react'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'

// Ouvre la modale Cal.com. Utilisee par la SmartCTABar quand l'assistant
// emet le token [BOOK] dans son message.
async function openBookingModal() {
  const cal = await getCalApi({ namespace: 'planifier-un-appel' })
  cal('modal', {
    calLink: 'david-khazaei/planifier-un-appel',
    config: { layout: 'month_view', theme: 'dark' },
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

function AnimatedPlaceholder({ index, visible }: { index: number; visible: boolean }) {
  const text = PLACEHOLDERS[index]

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <m.span
          key={index}
          className="absolute inset-0 flex items-center text-[#71717a] text-base md:text-sm select-none pointer-events-none whitespace-nowrap overflow-hidden"
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
      <span className="text-xs text-[#71717a]">en train d&apos;ecrire</span>
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
        className={`max-w-[85%] text-[13.5px] leading-relaxed ${
          isUser
            ? 'bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.2)] text-white rounded-2xl rounded-br-sm px-4 py-2.5'
            : 'text-[#d4d4d8]'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <Markdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 last:mb-0 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 last:mb-0 space-y-1">{children}</ol>,
              a: ({ href, children }) => {
                // Internal links use Next.js Link
                if (href?.startsWith('/')) {
                  return (
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1 text-[#A78BFA] font-medium underline underline-offset-2 hover:text-[#c4b5fd] transition-colors"
                    >
                      {children}
                      <ArrowRight size={12} />
                    </Link>
                  )
                }
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#A78BFA] underline underline-offset-2 hover:text-[#c4b5fd] transition-colors">
                    {children}
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
      className="flex flex-wrap gap-2 mt-4"
    >
      {ctas.map((key, idx) => {
        const def = CTA_CATALOG[key]
        const Icon = def.icon
        // Premier CTA : mis en valeur avec gradient violet (primary)
        const isPrimary = idx === 0 && key === 'book'
        const baseClasses = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-medium cursor-pointer transition-all duration-200'
        const primaryClasses = 'text-white border border-[rgba(124,58,237,0.4)] font-semibold hover:border-[rgba(124,58,237,0.6)] hover:brightness-110'
        const primaryStyle = { background: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(167,139,250,0.20))' }
        const secondaryClasses = 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:bg-[rgba(124,58,237,0.08)] hover:border-[rgba(124,58,237,0.25)] hover:text-white'

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
      <p className="text-sm text-[#d4d4d8] mb-4">
        Pour approfondir votre projet, prenons quelques minutes ensemble.
      </p>
      <button
        data-cal-link="david-khazaei/planifier-un-appel"
        data-cal-namespace="planifier-un-appel"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #7C3AED, #FF6B00)' }}
      >
        <CalendarCheck size={15} />
        Planifier un appel gratuit
      </button>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <Link href="/contact" className="text-xs text-[#A78BFA] hover:text-[#c4b5fd] underline underline-offset-2 transition-colors">
          Nous contacter
        </Link>
        <span className="text-xs text-[#52525b]">{'\u00B7'}</span>
        <Link href="/tarifs" className="text-xs text-[#A78BFA] hover:text-[#c4b5fd] underline underline-offset-2 transition-colors">
          Voir les tarifs
        </Link>
        <span className="text-xs text-[#52525b]">{'\u00B7'}</span>
        <Link href="/agence-digitale" className="text-xs text-[#A78BFA] hover:text-[#c4b5fd] underline underline-offset-2 transition-colors">
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
  const [nearFooter, setNearFooter] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const [barFocused, setBarFocused] = useState(false)
  const pathname = usePathname()
  const prevPathnameRef = useRef(pathname)
  const honeypotRef = useRef('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatInputRef = useRef<HTMLTextAreaElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  // ── Dictée vocale (Web Speech API) ──
  const speech = useSpeechRecognition({ lang: 'fr-FR' })
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

  // Cache la barre (état fermé) quand le footer devient visible
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const [chatTransport] = useState(() => new DefaultChatTransport({
    body: () => ({ _hp: honeypotRef.current }),
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
      const parsed = JSON.parse(saved) as { ts?: number; messages?: unknown }
      const age = parsed.ts ? Date.now() - parsed.ts : Infinity
      if (age > CHAT_TTL_MS) {
        localStorage.removeItem(CHAT_STORAGE_KEY)
        return
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
          JSON.stringify({ ts: Date.now(), messages }),
        )
      } else {
        localStorage.removeItem(CHAT_STORAGE_KEY)
      }
    } catch { /* ignore */ }
  }, [messages])

  // Close chat on route change
  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname
      setIsOpen(false)
    }
  }, [pathname])

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
      window.scrollTo(0, scrollYRef.current)
    }
    return () => {
      document.body.classList.remove('chat-open')
      document.body.style.top = ''
      html.classList.remove('lenis-stopped')
    }
  }, [isOpen])

  const hasConversation = messages.length > 0
  const userMessageCount = messages.filter((m) => m.role === 'user').length
  const isLimitReached = userMessageCount >= MESSAGE_LIMIT
  const isLoading = status === 'submitted' || status === 'streaming'

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

  // Cycle placeholder on the bottom bar
  useEffect(() => {
    if (isOpen || barFocused || inputValue) return
    const interval = setInterval(() => {
      setShowPlaceholder(false)
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length)
        setShowPlaceholder(true)
      }, 250)
    }, 3500)
    return () => clearInterval(interval)
  }, [isOpen, barFocused, inputValue])

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
    setMessages([])
    setInputValue('')
    try { sessionStorage.removeItem('dkdp-chat') } catch { /* ignore */ }
  }

  if (!isEurope) return null

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          BOTTOM SEARCH BAR (closed state)
         ════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!isOpen && !nearFooter && (
          <m.div
            ref={barRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              width: barFocused ? 'min(580px, calc(100vw - 32px))' : 'min(410px, calc(100vw - 24px))',
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: DKDP_BOUNCE }}
            className="fixed z-40 left-1/2 -translate-x-1/2"
            style={{
              bottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
            }}
          >
            {speech.error && (
              <m.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-red-300 bg-[#1a0e0e] border border-red-500/30 px-3 py-1 rounded-full shadow-lg"
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
                background: '#111111',
                border: '1px solid rgba(124,58,237,0.15)',
                boxShadow: barFocused
                  ? '0 8px 40px rgba(124,58,237,0.2), 0 0 0 1px rgba(124,58,237,0.3)'
                  : '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
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
                  className="w-full bg-transparent text-sm text-white outline-none placeholder-transparent py-1.5"
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
                        />
                        {barFocused && (
                          <span className="text-base md:text-sm text-[#71717a]">Posez votre question...</span>
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
                  aria-label={speech.isListening ? 'Arreter la dictee' : 'Dicter un message'}
                  aria-pressed={speech.isListening}
                  className="flex-shrink-0 w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center rounded-full cursor-pointer relative"
                  style={{
                    background: speech.isListening
                      ? 'rgba(239,68,68,0.14)'
                      : 'rgba(255,255,255,0.04)',
                  }}
                  whileTap={{ scale: 0.94 }}
                >
                  <Mic size={15} className={speech.isListening ? 'text-red-400' : 'text-[#9CA3AF]'} />
                  {speech.isListening && (
                    <m.span
                      className="absolute inset-0 rounded-full border border-red-400/60 pointer-events-none"
                      animate={{ scale: [1, 1.3], opacity: [0.7, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                </m.button>
              )}

              <m.button
                type="submit"
                disabled={!inputValue.trim()}
                className="flex-shrink-0 w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center rounded-full cursor-pointer disabled:opacity-20 disabled:cursor-default"
                style={{
                  background: inputValue.trim()
                    ? '#7C3AED'
                    : 'rgba(255,255,255,0.06)',
                }}
                whileHover={inputValue.trim() ? { scale: 1.08 } : {}}
                whileTap={inputValue.trim() ? { scale: 0.94 } : {}}
              >
                <Send size={15} className="text-white" />
              </m.button>
            </form>
          </m.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════════
          CHAT WINDOW (open state)
         ════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <div
            ref={chatWindowRef}
            className="fixed z-40 left-1/2 -translate-x-1/2"
            style={{
              width: 'min(580px, calc(100vw - 16px))',
              bottom: 'max(8px, env(safe-area-inset-bottom, 8px))',
            }}
          >
          <m.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring' as const, damping: 22, stiffness: 260 }}
            className="flex flex-col overflow-hidden rounded-2xl w-full"
            style={{
              height: 'min(576px, 78dvh, calc(100dvh - 80px))',
              background: '#0A0A0A',
              border: '1px solid rgba(124,58,237,0.15)',
              boxShadow: '0 16px 70px rgba(0,0,0,0.8), 0 0 80px rgba(124,58,237,0.08)',
              overscrollBehavior: 'contain',
              touchAction: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#1E1E1E] flex-shrink-0">
              <div className="flex items-center gap-3">
                <AnimatedOrb size={32} />
                <div>
                  <Image src="/images/logo/dkdp_blanc-croped.png" alt="DKDP" width={36} height={12} className="h-2.5 w-auto -ml-[5px]" />
                  <p className="text-[11px] text-[#71717a]">Assistant IA</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {messages.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="p-3 sm:p-2.5 rounded-full hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer"
                    title="Effacer la conversation"
                    aria-label="Effacer la conversation"
                  >
                    <RotateCcw size={16} className="text-[#71717a] sm:w-[14px] sm:h-[14px]" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 sm:p-2.5 rounded-full hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.12)] transition-colors cursor-pointer"
                >
                  <X size={20} className="text-white sm:w-[18px] sm:h-[18px]" />
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
                    className="text-[13.5px] text-[#d4d4d8] leading-relaxed"
                  >
                    {WELCOME_MESSAGE}
                  </m.p>
                </div>
              </div>

              {/* Suggestion buttons (visible if no messages) */}
              {messages.length === 0 && (
                <m.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="flex flex-col gap-2 pl-0 sm:pl-9"
                >
                  {QUICK_SUGGESTIONS.map(({ icon, label }) => (
                    <button
                      key={label}
                      onClick={() => handleSuggestionClick(label)}
                      className="group flex items-center gap-2.5 px-4 py-3 sm:py-2.5 rounded-xl text-left text-[13px] cursor-pointer transition-all duration-200 active:scale-[0.98]
                        bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]
                        hover:bg-[rgba(124,58,237,0.08)] hover:border-[rgba(124,58,237,0.25)]"
                    >
                      <span className="text-[#A78BFA] group-hover:text-[#c4b5fd] transition-colors">{icon}</span>
                      <span className="text-[#9CA3AF] group-hover:text-white transition-colors">{label}</span>
                    </button>
                  ))}
                </m.div>
              )}

              {/* Chat messages */}
              {messages.map((m, idx) => {
                const text = getMessageText(m)
                if (!text) return null
                const isLastAssistant = m.role === 'assistant' && idx === lastAssistantIdx && !isLoading
                return (
                  <div key={m.id}>
                    <MessageBubble
                      role={m.role as 'user' | 'assistant'}
                      content={text}
                    />
                    {/* CTA bar adaptatif sous le dernier message assistant */}
                    {isLastAssistant && <SmartCTABar lastAssistantContent={text} />}
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
                  className="text-xs text-center text-red-400/80 py-2"
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
                    className="mb-2 text-[11px] text-red-300 bg-[#1a0e0e] border border-red-500/30 px-3 py-1.5 rounded-lg"
                    role="alert"
                  >
                    {speech.error}
                  </m.div>
                )}
                <form
                  onSubmit={handleChatSubmit}
                  className="flex items-end gap-2 rounded-2xl px-3 py-2"
                  style={{
                    background: '#111111',
                    border: '1px solid rgba(124,58,237,0.12)',
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
                      className="w-full bg-transparent text-sm text-white placeholder-[#71717a] outline-none resize-none py-1.5"
                      style={{ minHeight: '28px', maxHeight: '100px' }}
                    />
                  </div>
                  {speech.isAvailable && (
                    <m.button
                      type="button"
                      onClick={speech.toggle}
                      disabled={isLoading}
                      aria-label={speech.isListening ? 'Arreter la dictee' : 'Dicter un message'}
                      aria-pressed={speech.isListening}
                      className="flex-shrink-0 w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center rounded-full cursor-pointer disabled:opacity-20 disabled:cursor-default mb-0.5 relative"
                      style={{
                        background: speech.isListening
                          ? 'rgba(239,68,68,0.14)'
                          : 'rgba(255,255,255,0.04)',
                      }}
                      whileTap={{ scale: 0.94 }}
                    >
                      <Mic size={14} className={speech.isListening ? 'text-red-400' : 'text-[#9CA3AF]'} />
                      {speech.isListening && (
                        <m.span
                          className="absolute inset-0 rounded-full border border-red-400/60 pointer-events-none"
                          animate={{ scale: [1, 1.3], opacity: [0.7, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                        />
                      )}
                    </m.button>
                  )}
                  <m.button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="flex-shrink-0 w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center rounded-full cursor-pointer disabled:opacity-20 disabled:cursor-default mb-0.5"
                    style={{
                      background: inputValue.trim()
                        ? '#7C3AED'
                        : 'rgba(255,255,255,0.06)',
                    }}
                    whileHover={inputValue.trim() ? { scale: 1.08 } : {}}
                    whileTap={inputValue.trim() ? { scale: 0.94 } : {}}
                  >
                    <Send size={14} className="text-white" />
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
