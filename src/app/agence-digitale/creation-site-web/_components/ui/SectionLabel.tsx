'use client'

import type { Locale } from '@/i18n/config'

interface SectionLabelProps {
  children: React.ReactNode
  required?: boolean
  optional?: boolean
  hint?: string
  lang?: Locale
}

export function SectionLabel({ children, required, optional, hint, lang = 'fr' }: SectionLabelProps) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <p className="text-[11px] sm:text-xs font-semibold text-text-secondary uppercase tracking-[0.12em]">
        {children}
        {required && <span className="ml-1.5 text-red-400">*</span>}
        {optional && (
          <span className="ml-1.5 font-normal normal-case tracking-normal text-[10px] sm:text-[11px] text-text-muted">
            {lang === 'en' ? '(optional)' : '(optionnel)'}
          </span>
        )}
      </p>
      {hint && (
        <p className="text-[10px] sm:text-[11px] text-text-muted shrink-0 italic">
          {hint}
        </p>
      )}
    </div>
  )
}
