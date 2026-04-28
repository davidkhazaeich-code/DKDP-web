import type { LucideIcon } from 'lucide-react'

interface HeroPillsProps {
  items: { label: string; Icon: LucideIcon }[]
  accentRgb?: string
  align?: 'start' | 'center'
  className?: string
}

export function HeroPills({
  items,
  accentRgb = '167, 139, 250',
  align = 'start',
  className = '',
}: HeroPillsProps) {
  const justify = align === 'center' ? 'justify-center' : 'justify-start'
  return (
    <div
      className={`flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8 ${justify} ${className}`}
    >
      {items.map(({ label, Icon }) => (
        <div
          key={label}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-text-secondary"
          style={{
            background: `rgba(${accentRgb}, 0.10)`,
            border: `1px solid rgba(${accentRgb}, 0.25)`,
          }}
        >
          <Icon size={12} style={{ color: `rgb(${accentRgb})` }} aria-hidden="true" />
          {label}
        </div>
      ))}
    </div>
  )
}
