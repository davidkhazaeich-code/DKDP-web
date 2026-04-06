export function ColorSwatch({ colors, typography }: {
  colors: { primary: string; secondary: string; accent: string }
  typography: { heading: string; body: string }
}) {
  const swatches = [
    { label: 'Primaire', color: colors.primary },
    { label: 'Secondaire', color: colors.secondary },
    { label: 'Accent', color: colors.accent },
  ]

  return (
    <div className="rounded-[16px] border border-zinc-800 p-6 bg-zinc-900/40">
      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Palette & Typographie</p>
      <div className="flex gap-3 mb-5">
        {swatches.map(s => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <div
              className="w-12 h-12 rounded-full border border-zinc-700"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider">{s.label}</span>
            <span className="text-zinc-400 text-[11px] font-mono">{s.color}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-6 text-sm text-zinc-400">
        <div>
          <span className="text-zinc-500 text-xs">Titres : </span>
          <span className="font-semibold text-white">{typography.heading}</span>
        </div>
        <div>
          <span className="text-zinc-500 text-xs">Corps : </span>
          <span className="font-semibold text-white">{typography.body}</span>
        </div>
      </div>
    </div>
  )
}
