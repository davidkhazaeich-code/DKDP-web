import { green } from '@/lib/tokens'

export function AdComparison() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="p-4 rounded-[12px]" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}>
        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4 text-center">Compte non optimisé</p>
        <div className="space-y-2">
          {[
            { label: 'CPC moyen', val: '4.80 CHF' },
            { label: 'CTR annonces', val: '1.2%' },
            { label: 'Coût par lead', val: '185 CHF' },
          ].map((m) => (
            <div key={m.label} className="flex justify-between items-center">
              <span className="text-text-muted text-[11px]">{m.label}</span>
              <span className="text-red-400 text-[11px] font-bold">{m.val}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="h-1.5 rounded-full bg-red-500/60 w-full" />
          <div className="h-1.5 rounded-full bg-red-500/40 w-3/4" />
        </div>
        <p className="text-red-400 text-[10px] text-center mt-2 font-semibold">Budget gaspillé</p>
      </div>
      <div className="p-4 rounded-[12px]" style={{ background: green.bg, border: `1px solid ${green.border}` }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: green.color }}>Compte DKDP</p>
        <div className="space-y-2">
          {[
            { label: 'CPC moyen', val: '2.10 CHF' },
            { label: 'CTR annonces', val: '4.8%' },
            { label: 'Coût par lead', val: '62 CHF' },
          ].map((m) => (
            <div key={m.label} className="flex justify-between items-center">
              <span className="text-text-muted text-[11px]">{m.label}</span>
              <span className="text-[11px] font-bold" style={{ color: green.color }}>{m.val}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="h-1.5 rounded-full w-full" style={{ background: 'linear-gradient(90deg, #22c55e55, #4ade80)' }} />
          <div className="h-1.5 rounded-full w-1/4" style={{ background: 'rgba(74,222,128,0.3)' }} />
        </div>
        <p className="text-[10px] text-center mt-2 font-semibold" style={{ color: green.color }}>Budget optimisé</p>
      </div>
    </div>
  )
}
