'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

interface SelectionCardProps {
  title: string
  description?: string
  price?: string
  priceColor?: string
  selected: boolean
  onClick: () => void
  children?: ReactNode
}

export function SelectionCard({
  title,
  description,
  price,
  priceColor,
  selected,
  onClick,
  children,
}: SelectionCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
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
      <div className="flex items-start justify-between gap-3 pr-6">
        <span className="text-sm font-medium text-zinc-100 leading-snug">{title}</span>
        {price && (
          <span
            className={['text-sm font-medium whitespace-nowrap', priceColor ?? 'text-zinc-400'].join(
              ' '
            )}
          >
            {price}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{description}</p>
      )}

      {/* Expanded content */}
      <AnimatePresence>
        {selected && children && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-white/[0.06]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
