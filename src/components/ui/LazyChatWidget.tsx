'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const ChatWidget = dynamic(
  () => import('@/components/ui/ChatWidget').then(m => ({ default: m.ChatWidget })),
  { ssr: false },
)

export const HIDDEN_PATHS = ['/agence-digitale/creation-site-web/estimation']

export function LazyChatWidget() {
  const pathname = usePathname()

  if (HIDDEN_PATHS.includes(pathname)) return null
  if (pathname?.startsWith('/admin')) return null
  // Chatbot reste FR pour l'instant ; on le masque sur les pages EN.
  if (pathname?.startsWith('/en')) return null

  return <ChatWidget />
}
