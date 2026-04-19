'use client'

interface OptionChipProps {
  label: string
  selected: boolean
  onClick: () => void
}

export function OptionChip({ label, selected, onClick }: OptionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'px-3.5 py-2 rounded-lg border text-sm font-medium transition-all duration-150 cursor-pointer',
        'min-h-[40px] sm:min-h-[38px]',
        selected
          ? 'border-violet-500/60 bg-violet-500/[0.12] text-violet-200 shadow-[0_0_0_1px_rgba(139,92,246,0.15)]'
          : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200 hover:bg-white/[0.04]',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
