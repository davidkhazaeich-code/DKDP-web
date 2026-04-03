import { CheckCircle2 } from 'lucide-react'

export function ClaudeProductCard({
  title,
  subtitle,
  color,
  bg,
  border,
  icon: Icon,
  features,
  badge,
}: {
  title: string
  subtitle: string
  color: string
  bg: string
  border: string
  icon: React.ElementType
  features: string[]
  badge?: string
}) {
  return (
    <div
      className="flex flex-col gap-5 p-6 rounded-[16px] h-full"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${border}` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        {badge && (
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ color, background: bg, border: `1px solid ${border}` }}
          >
            {badge}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-white font-bold text-lg leading-tight mb-1">{title}</h3>
        <p className="text-text-muted text-sm leading-relaxed">{subtitle}</p>
      </div>
      <ul className="space-y-2 mt-auto">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-text-secondary">
            <CheckCircle2 size={14} style={{ color }} className="flex-shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}
