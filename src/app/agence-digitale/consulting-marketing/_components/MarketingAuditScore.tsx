import { violet } from '@/lib/tokens'

export function MarketingAuditScore() {
  const pillars = [
    { label: 'Acquisition', before: 25, after: 78 },
    { label: 'Conversion', before: 20, after: 72 },
    { label: 'Fidélisation', before: 30, after: 85 },
    { label: 'Branding', before: 35, after: 80 },
    { label: 'Analytics', before: 15, after: 90 },
  ]
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
        <span style={{ color: 'rgba(239,68,68,0.85)' }}>Score moyen PME sans accompagnement</span>
        <span style={{ color: violet.color }}>Objectif 6 mois DKDP</span>
      </div>
      {pillars.map((p) => (
        <div key={p.label} className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-white text-xs font-semibold">{p.label}</span>
            <span className="text-[11px] font-bold" style={{ color: violet.color }}>+{p.after - p.before}pts</span>
          </div>
          <div className="relative h-2 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ width: `${p.before}%`, background: 'rgba(239,68,68,0.55)' }}
            />
          </div>
          <div className="relative h-2 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ width: `${p.after}%`, background: 'linear-gradient(90deg, #7C3AED, #A78BFA)' }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-text-muted">
            <span>{p.before}%</span>
            <span style={{ color: violet.color }}>{p.after}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}
