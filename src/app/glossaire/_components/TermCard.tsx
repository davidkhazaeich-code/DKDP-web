import { SectionReveal } from '@/components/ui/SectionReveal'
import type { Term } from '../_types'
import { CategoryBadge } from './CategoryBadge'

function termId(term: string) {
  return 'term-' + term
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function TermCard({ item, delay }: { item: Term; delay: number }) {
  return (
    <SectionReveal delay={delay}>
      <div
        id={termId(item.term)}
        className="group rounded-[14px] border p-5 flex flex-col gap-3 h-full transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5"
        style={{
          background: 'rgba(18,18,24,0.80)',
          borderColor: 'rgba(212,212,216,0.14)',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-bold text-lg leading-snug">{item.term}</h3>
          <CategoryBadge category={item.category} />
        </div>

        {/* Definition */}
        <p className="text-text-secondary text-sm leading-relaxed flex-1">
          {item.definition}
        </p>

        {/* Optional internal link */}
        {item.link && (
          <a
            href={item.link}
            className="inline-flex items-center gap-1 text-xs font-semibold mt-auto"
            style={{ color: '#A78BFA' }}
          >
            En savoir plus
            <span aria-hidden="true">&#8594;</span>
          </a>
        )}
      </div>
    </SectionReveal>
  )
}
