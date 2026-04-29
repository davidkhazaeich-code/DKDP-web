import { clsx } from 'clsx'
import type { RealisationStackChip, StackColor } from '@/lib/realisations/types'

// Theme-aware via project tokens. text uses --*-text vars (light shade on dark, dark shade on light).
const COLOR_CLASSES: Record<StackColor, string> = {
  violet: 'border-[color:var(--violet-border)] bg-[color:var(--violet-bg)] text-[color:var(--violet-text)]',
  orange: 'border-[color:var(--orange-border)] bg-[color:var(--orange-bg)] text-[color:var(--orange-text)]',
  chrome: 'border-[color:var(--chrome-border)] bg-[color:var(--chrome-bg)] text-text-secondary',
  green:  'border-[color:var(--green-border)] bg-[color:var(--green-bg)] text-[color:var(--green-text)]',
  blue:   'border-[color:var(--blue-border)] bg-[color:var(--blue-bg)] text-[color:var(--blue-text)]',
  pink:   'border-[color:var(--pink-border)] bg-[color:var(--pink-bg)] text-[color:var(--pink-text)]',
  teal:   'border-[color:var(--teal-border)] bg-[color:var(--teal-bg)] text-[color:var(--teal-text)]',
  amber:  'border-[color:var(--amber-border)] bg-[color:var(--amber-bg)] text-[color:var(--amber-text)]',
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
