'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { localizedPath } from '@/i18n/slugs'

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

export function LazyChatWidget() {
  const pathname = usePathname()

  if (HIDDEN_PATHS.includes(pathname)) return null
  if (pathname?.startsWith('/admin')) return null

  // Le chatbot etait masque sur tout /en tant qu'il ne parlait que francais.
  // Il est desormais bilingue : textes du widget selon la langue de la page,
  // reponses dans la langue du visiteur, et liens convertis en /en/... via la
  // table de conversion en fin de system prompt. La garde n'a plus lieu d'etre.

  return <ChatWidget />
}
