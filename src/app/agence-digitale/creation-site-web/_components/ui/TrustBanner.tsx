'use client'

import { Clock, ShieldCheck, Star } from 'lucide-react'

const ITEMS = [
  { icon: Clock, label: 'Devis sous 48h' },
  { icon: ShieldCheck, label: 'Prix fixes, sans surprises' },
  { icon: Star, label: '+120 projets livrés' },
]

export function TrustBanner() {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap px-2">
      {ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-500">
          <Icon size={13} className="flex-shrink-0 text-violet-400/60" strokeWidth={2} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
