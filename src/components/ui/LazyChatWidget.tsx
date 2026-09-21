'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { Send } from 'lucide-react'
import { localizedPath } from '@/i18n/slugs'
import { markHandover, setPendingFocus, setPendingInput } from './chat-handover'

const ChatWidget = dynamic(
  () => import('@/components/ui/ChatWidget').then(m => ({ default: m.ChatWidget })),
  { ssr: false },
)

/**
 * Pages sans chatbot, exprimees en chemins FR.
 * L'estimateur a son propre parcours guide : deux assistants a l'ecran en
 * meme temps se marchent dessus.
 */
const HIDDEN_FR_PATHS = ['/agence-digitale/creation-site-web/estimation']

/** Les memes pages dans les deux langues, derivees pour eviter la derive. */
export const HIDDEN_PATHS = [
  ...HIDDEN_FR_PATHS,
  ...HIDDEN_FR_PATHS.map((path) => localizedPath(path, 'en')),
]

/** Delai apres `load` au bout duquel le widget se charge meme sans geste. */
const IDLE_DELAY_MS = 4000

/** Premier texte de la barre, identique au premier placeholder du widget. */
const PLACEHOLDER = { fr: 'Besoin d\u2019une information ?', en: 'Looking for something?' }
const ASK = { fr: 'Poser une question', en: 'Ask a question' }

function localeFromPath(pathname: string | null): 'fr' | 'en' {
  return pathname === '/en' || pathname?.startsWith('/en/') ? 'en' : 'fr'
}

// Meme garde geographique que le widget : le cookie geo-eu=0 vient du
// middleware, la barre ne doit pas apparaitre puis disparaitre hors Europe.
// Lu comme un store externe (valeur serveur : Europe) pour ne pas poser un
// setState dans un effet.
const noSubscribe = () => () => {}
const readIsEurope = () => !/(?:^|; )geo-eu=0(?:;|$)/.test(document.cookie)
const serverIsEurope = () => true

/**
 * Le chunk ChatWidget (226 Ko, react-markdown et framer-motion compris) etait
 * monte sur toutes les pages a 500 ms, a 76 % inutilise (Lighthouse du
 * 14/09/2026, action D21). Il ne part plus qu'au premier geste du visiteur
 * (pointeur, clavier, defilement) ou, a defaut, 4 s apres `load`. Entre-temps
 * une barre statique au meme endroit et au meme aspect tient la place : ce
 * qu'on y tape et le focus sont remis au widget (chat-handover.ts).
 */
export function LazyChatWidget() {
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  const isEurope = useSyncExternalStore(noSubscribe, readIsEurope, serverIsEurope)
  const inputRef = useRef<HTMLInputElement>(null)
  const locale = localeFromPath(pathname)

  useEffect(() => {
    if (ready) return
    let timer: ReturnType<typeof setTimeout> | undefined
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll']
    const arm = () => {
      // Un focus pris avant l'hydratation n'a pas declenche onFocus : on le
      // relit ici, et la saisie deja faite est relue par le widget (value).
      const input = inputRef.current
      if (input && document.activeElement === input) {
        setPendingFocus(true)
        if (input.value) setPendingInput(input.value)
      }
      markHandover()
      setReady(true)
    }
    const opts: AddEventListenerOptions = { once: true, passive: true, capture: true }
    events.forEach((e) => window.addEventListener(e, arm, opts))
    const afterLoad = () => { timer = setTimeout(arm, IDLE_DELAY_MS) }
    if (document.readyState === 'complete') afterLoad()
    else window.addEventListener('load', afterLoad, { once: true })
    return () => {
      events.forEach((e) => window.removeEventListener(e, arm, opts))
      window.removeEventListener('load', afterLoad)
      if (timer) clearTimeout(timer)
    }
  }, [ready])

  if (HIDDEN_PATHS.includes(pathname)) return null
  if (pathname?.startsWith('/admin')) return null
  if (!isEurope) return null

  // Le chatbot etait masque sur tout /en tant qu'il ne parlait que francais.
  // Il est desormais bilingue : textes du widget selon la langue de la page,
  // reponses dans la langue du visiteur, et liens convertis en /en/... via la
  // table de conversion en fin de system prompt. La garde n'a plus lieu d'etre.

  if (ready) return <ChatWidget />

  return (
    <div className="chat-bottom-bar-wrapper">
      <div style={{ width: 'min(410px, calc(100vw - 16px))' }}>
        <form
          onSubmit={(e) => { e.preventDefault(); markHandover(); setReady(true) }}
          className="relative flex items-center gap-3 rounded-full px-3 py-2 cursor-text"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-violet)',
            boxShadow: '0 0 0 1px var(--surface-border)',
          }}
        >
          <div className="relative flex-shrink-0 rounded-full overflow-hidden" style={{ width: 28, height: 28 }}>
            <div className="absolute inset-0.5 rounded-full" style={{ background: 'linear-gradient(135deg, #A78BFA, #7C3AED)' }} />
            <div className="absolute rounded-full" style={{ inset: '28%', background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.3) 0%, transparent 55%)' }} />
          </div>
          <input
            ref={inputRef}
            type="text"
            aria-label={ASK[locale]}
            placeholder={PLACEHOLDER[locale]}
            maxLength={500}
            autoComplete="off"
            onFocus={() => { setPendingFocus(true); markHandover(); setReady(true) }}
            onChange={(e) => { setPendingInput(e.target.value); setPendingFocus(true) }}
            className="w-full flex-1 min-w-0 bg-transparent text-base md:text-sm text-text outline-none py-1.5 placeholder:text-text-muted"
          />
          <button
            type="submit"
            aria-label={ASK[locale]}
            className="flex-shrink-0 w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center rounded-full cursor-pointer opacity-40"
            style={{ background: 'var(--surface-border)' }}
          >
            <Send size={15} className="text-text-secondary" />
          </button>
        </form>
      </div>
    </div>
  )
}
