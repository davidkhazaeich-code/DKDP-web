export function UseCaseCard({
  dept,
  icon: Icon,
  color,
  bg,
  border,
  cases,
}: {
  dept: string
  icon: React.ElementType
  color: string
  bg: string
  border: string
  cases: string[]
}) {
  return (
    <div
      className="flex flex-col gap-3 rounded-[14px] border p-5"
      style={{ background: bg, borderColor: border }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px]"
          style={{ background: 'rgba(0,0,0,0.25)', border: `1px solid ${border}` }}
        >
          <Icon size={15} style={{ color }} aria-hidden="true" />
        </div>
        <span className="text-sm font-bold" style={{ color }}>{dept}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {cases.map((c) => (
          <span
            key={c}
            className="text-[11px] px-2.5 py-1 rounded-full font-medium"
            style={{ background: 'rgba(0,0,0,0.20)', border: `1px solid ${border}`, color }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}
