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
        'px-4 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer',
        selected
          ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
          : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-300',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
