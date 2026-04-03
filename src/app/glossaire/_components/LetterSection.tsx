import type { Term } from '../_types'
import { TermCard } from './TermCard'

export function LetterSection({ letter, terms }: { letter: string; terms: Term[] }) {
  return (
    <section id={`lettre-${letter}`} className="scroll-mt-32 md:scroll-mt-28">
      {/* Letter heading */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
        <div className="relative select-none">
          <span
            className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white/10 leading-none pointer-events-none"
            aria-hidden="true"
          >
            {letter}
          </span>
          <span
            className="relative text-4xl font-black leading-none"
            style={{ color: '#A78BFA' }}
          >
            {letter}
          </span>
        </div>
        <span className="text-text-muted text-sm">
          {terms.length} terme{terms.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {terms.map((item, i) => (
          <TermCard key={item.term} item={item} delay={i * 0.04} />
        ))}
      </div>
    </section>
  )
}
