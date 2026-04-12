'use client'

import { Clock, ShieldCheck, Star } from 'lucide-react'

const ITEMS = [
  { icon: Clock, label: 'Devis gratuit sous 48h' },
  { icon: ShieldCheck, label: 'Prix fixes, sans surprises' },
  { icon: Star, label: '+120 projets livrés' },
]

export function TrustBanner() {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
      {ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500">
          <Icon size={14} className="flex-shrink-0" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
