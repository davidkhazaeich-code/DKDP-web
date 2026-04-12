'use client'

import { Check } from 'lucide-react'

interface MultiSelectCardProps {
  title: string
  description?: string
  price?: string
  priceLabel?: string
  selected: boolean
  onToggle: () => void
  recommended?: boolean
}

export function MultiSelectCard({
  title,
  description,
  price,
  priceLabel,
  selected,
  onToggle,
  recommended,
}: MultiSelectCardProps) {
  return (
    <div
      onClick={onToggle}
      className={[
        'relative rounded-xl p-4 cursor-pointer transition-all duration-200',
        selected
          ? 'border border-violet-500/50 bg-violet-500/5'
          : 'border border-white/10 bg-white/[0.02] hover:border-white/20',
      ].join(' ')}
    >
      {/* Checkmark top-right */}
      {selected && (
        <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/20 border border-violet-500/40">
          <Check size={11} className="text-violet-300" strokeWidth={2.5} />
        </span>
      )}

      {/* Header */}
      <div className={selected ? 'pr-6' : ''}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-zinc-100 leading-snug">{title}</span>
          {recommended && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded border border-orange-500/20 bg-orange-500/10 text-orange-400">
              Recommande
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{description}</p>
        )}
        {price && (
          <p className="mt-1.5 text-xs font-medium text-zinc-400">
            {price}
            {priceLabel && (
              <span className="text-xs text-zinc-500 font-normal">{priceLabel}</span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
