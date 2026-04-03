import { violet } from '@/lib/tokens'

export function SEOFunnel() {
  const positions = [
    { pos: 'Position 1', pct: 28, color: '#A78BFA' },
    { pos: 'Position 2–3', pct: 15, color: '#8B5CF6' },
    { pos: 'Position 4–10', pct: 4, color: 'rgba(139,92,246,0.60)' },
    { pos: 'Page 2+', pct: 1, color: 'rgba(139,92,246,0.30)' },
  ]
  return (
    <div className="space-y-3 w-full">
      <p className="text-[11px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: violet.color }}>
        Part de clics par position Google
      </p>
      {positions.map((p) => (
        <div key={p.pos} className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-white text-sm font-semibold">{p.pos}</span>
            <span className="font-bold text-sm" style={{ color: violet.color }}>{p.pct}% des clics</span>
          </div>
          <div className="h-2.5 rounded-full" style={{ background: violet.bg }}>
            <div className="h-full rounded-full" style={{ width: `${(p.pct / 28) * 100}%`, background: p.color }} />
          </div>
        </div>
      ))}
      <p className="text-text-muted text-[10px] text-center mt-2">Source : Advanced Web Ranking 2024</p>
    </div>
  )
}
