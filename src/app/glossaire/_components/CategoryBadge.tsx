import type { Category } from '../_types'

const CATEGORY_STYLES: Record<Category, { color: string; border: string; label: string }> = {
  IA:        { color: '#C4B5FD', border: 'rgba(124,58,237,0.65)',   label: 'IA' },
  SEO:       { color: '#D4D4D8', border: 'rgba(212,212,216,0.50)',  label: 'SEO' },
  Web:       { color: '#86efac', border: 'rgba(74,222,128,0.55)',   label: 'Web' },
  Formation: { color: '#FDBA74', border: 'rgba(255,107,0,0.55)',    label: 'Formation' },
  General:   { color: '#9CA3AF', border: 'rgba(156,163,175,0.45)', label: 'Général' },
}

export function CategoryBadge({ category }: { category: Category }) {
  const { color, border, label } = CATEGORY_STYLES[category]
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
      style={{
        color,
        border: `1px solid ${border}`,
        background: 'rgba(10,10,10,0.84)',
      }}
    >
      {label}
    </span>
  )
}
