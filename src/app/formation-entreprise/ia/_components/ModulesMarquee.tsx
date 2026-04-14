'use client'

import { CheckCircle2 } from 'lucide-react'
import { orange } from '@/lib/tokens'

const MODULES = [
  'Les bases de l\'IA générative : comment ça fonctionne vraiment',
  'Prompting efficace : les techniques qui font la différence',
  'ChatGPT en pratique : rédaction, synthèse, analyse',
  'Claude pour les tâches longues et sensibles',
  'Microsoft Copilot dans Word, Excel et Outlook',
  'Automatisations simples avec Make ou Zapier',
  'Sécurité, confidentialité et limites des outils IA',
]

function Item({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 px-5">
      <CheckCircle2
        size={14}
        className="flex-shrink-0"
        style={{ color: orange.color }}
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
        {text}
      </span>
    </span>
  )
}

function Separator() {
  return (
    <span
      className="inline-block w-1 h-1 rounded-full flex-shrink-0 mx-1"
      style={{ background: orange.border }}
      aria-hidden="true"
    />
  )
}

export function ModulesMarquee() {
  // Duplicate items for seamless loop
  const items = [...MODULES, ...MODULES]

  return (
    <div className="relative w-full overflow-hidden rounded-[12px] border py-4"
      style={{
        background: 'rgba(255,255,255,0.025)',
        borderColor: 'rgba(255,255,255,0.07)',
      }}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0D0D0D, transparent)' }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0D0D0D, transparent)' }}
      />

      {/* Scrolling track */}
      <div
        className="flex items-center"
        style={{
          animation: 'marquee-scroll 28s linear infinite',
          width: 'max-content',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = 'running'
        }}
      >
        {items.map((text, i) => (
          <span key={i} className="inline-flex items-center">
            <Item text={text} />
            {i < items.length - 1 && <Separator />}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
