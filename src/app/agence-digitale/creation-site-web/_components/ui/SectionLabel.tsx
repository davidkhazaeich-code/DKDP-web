'use client'

interface SectionLabelProps {
  children: React.ReactNode
  required?: boolean
  optional?: boolean
  hint?: string
}

export function SectionLabel({ children, required, optional, hint }: SectionLabelProps) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <p className="text-[11px] sm:text-xs font-semibold text-zinc-300 uppercase tracking-[0.12em]">
        {children}
        {required && <span className="ml-1.5 text-red-400">*</span>}
        {optional && (
          <span className="ml-1.5 font-normal normal-case tracking-normal text-[10px] sm:text-[11px] text-zinc-500">
            (optionnel)
          </span>
        )}
      </p>
      {hint && (
        <p className="text-[10px] sm:text-[11px] text-zinc-500 shrink-0 italic">
          {hint}
        </p>
      )}
    </div>
  )
}
