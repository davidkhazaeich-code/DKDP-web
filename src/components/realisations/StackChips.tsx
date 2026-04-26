import { clsx } from 'clsx'
import type { RealisationStackChip, StackColor } from '@/lib/realisations/types'

const COLOR_CLASSES: Record<StackColor, string> = {
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-200',
  orange: 'border-orange-500/40 bg-orange-500/10 text-orange-200',
  chrome: 'border-zinc-500/40 bg-zinc-500/10 text-zinc-200',
  green:  'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
  blue:   'border-sky-500/40 bg-sky-500/10 text-sky-200',
  pink:   'border-pink-500/40 bg-pink-500/10 text-pink-200',
  teal:   'border-teal-500/40 bg-teal-500/10 text-teal-200',
  amber:  'border-amber-500/40 bg-amber-500/10 text-amber-200',
}

export function StackChips({ chips }: { chips: RealisationStackChip[] }) {
  return (
    <section id="stack" className="scroll-mt-[124px] py-12">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-sm uppercase tracking-wide text-text-muted">Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <span
              key={i}
              className={clsx(
                'rounded-full border px-3 py-1 text-sm',
                COLOR_CLASSES[c.color],
              )}
            >
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
