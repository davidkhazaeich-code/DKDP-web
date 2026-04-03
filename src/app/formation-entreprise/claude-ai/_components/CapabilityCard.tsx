import { SectionReveal } from '@/components/ui/SectionReveal'

export function CapabilityCard({
  icon: Icon,
  title,
  desc,
  color,
  bg,
  border,
}: {
  icon: React.ElementType
  title: string
  desc: string
  color: string
  bg: string
  border: string
}) {
  return (
    <SectionReveal>
      <div
        className="flex flex-col gap-3 p-5 rounded-[14px] h-full"
        style={{ background: bg, border: `1px solid ${border}` }}
      >
        <div
          className="w-10 h-10 rounded-[8px] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${border}` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <p className="text-white font-semibold text-sm leading-snug">{title}</p>
        <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
      </div>
    </SectionReveal>
  )
}
