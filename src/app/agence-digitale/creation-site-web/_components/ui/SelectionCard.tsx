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
      <div className="pr-6 flex items-start gap-2.5 sm:gap-3">
        {icon && (
          <span className={[
            'mt-0.5 flex-shrink-0 transition-colors duration-200 hidden sm:block',
            selected ? 'text-violet-400' : 'text-zinc-500',
          ].join(' ')}>
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <span className="text-sm font-medium text-zinc-100 leading-snug">{title}</span>
          {description && (
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{description}</p>
          )}
          {price && (
            <p
              className={['mt-1.5 text-xs font-medium', priceColor ?? 'text-zinc-400'].join(
                ' '
              )}
            >
              {price}
            </p>
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
            <div className="mt-3 pt-3 border-t border-white/[0.06]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
