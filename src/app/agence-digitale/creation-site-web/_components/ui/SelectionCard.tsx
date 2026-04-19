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
  icon?: ReactNode
}

export function SelectionCard({
  title,
  description,
  price,
  priceColor,
  selected,
  onClick,
  children,
  icon,
}: SelectionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={[
        'group relative w-full rounded-xl p-3.5 sm:p-4 text-left transition-all duration-200 cursor-pointer',
        'min-h-[72px] sm:min-h-[80px]',
        selected
          ? 'border border-violet-500/60 bg-violet-500/[0.08] shadow-[0_0_0_1px_rgba(139,92,246,0.2)]'
          : 'border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]',
      ].join(' ')}
    >
      {/* Checkmark top-right */}
      <span
        className={[
          'absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200',
          selected
            ? 'bg-violet-500 border border-violet-400 opacity-100 scale-100'
            : 'bg-transparent border border-white/15 opacity-0 scale-75',
        ].join(' ')}
      >
        {selected && <Check size={12} className="text-white" strokeWidth={3} />}
      </span>

      {/* Content */}
      <div className="flex items-start gap-3 pr-8">
        {icon && (
          <span
            className={[
              'mt-0.5 flex-shrink-0 transition-colors duration-200',
              selected ? 'text-violet-400' : 'text-zinc-500 group-hover:text-zinc-400',
            ].join(' ')}
          >
            {icon}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <span className="text-sm font-semibold text-zinc-100 leading-snug">{title}</span>
            {price && (
              <span
                className={[
                  'text-xs font-medium shrink-0',
                  priceColor ?? (selected ? 'text-violet-300' : 'text-zinc-400'),
                ].join(' ')}
              >
                {price}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{description}</p>
          )}
        </div>
      </div>

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
            <div className="mt-3 pt-3 border-t border-violet-500/20">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
