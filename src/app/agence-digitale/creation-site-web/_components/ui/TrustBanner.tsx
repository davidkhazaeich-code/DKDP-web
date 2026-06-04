'use client'

import { Clock, ShieldCheck, Star } from 'lucide-react'
import { useEstimator } from '../EstimatorContext'

const ITEMS_FR = [
  { icon: Clock, label: 'Devis sous 48h' },
  { icon: ShieldCheck, label: 'Prix fixes, sans surprises' },
  { icon: Star, label: '+120 projets livrés' },
]

const ITEMS_EN = [
  { icon: Clock, label: 'Quote within 48h' },
  { icon: ShieldCheck, label: 'Fixed prices, no surprises' },
  { icon: Star, label: '+120 projects delivered' },
]

export function TrustBanner() {
  const { lang } = useEstimator()
  const ITEMS = lang === 'en' ? ITEMS_EN : ITEMS_FR
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap px-2">
      {ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-text-muted">
          <Icon size={13} className="flex-shrink-0 text-violet-400/70" strokeWidth={2} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
