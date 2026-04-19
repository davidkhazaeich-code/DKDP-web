'use client'

import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface CollapsibleSectionProps {
  title: string
  defaultOpen?: boolean
  selectedCount?: number
  children: ReactNode
}

export function CollapsibleSection({
  title,
  defaultOpen = false,
  selectedCount,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="w-full">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 py-3.5 text-left cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] sm:text-xs font-semibold text-zinc-300 uppercase tracking-[0.12em]">
            {title}
          </span>
          {selectedCount !== undefined && selectedCount > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-violet-500/20 border border-violet-500/40 px-1.5 text-[10px] font-semibold text-violet-300 tabular-nums">
              {selectedCount}
            </span>
          )}
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex-shrink-0 text-zinc-500"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-1 pb-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
