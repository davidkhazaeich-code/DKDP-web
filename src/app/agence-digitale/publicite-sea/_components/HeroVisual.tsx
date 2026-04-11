import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative hidden lg:flex flex-col gap-4">
      {/* Google Ads Live Campaign */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-zinc-400 font-mono">Campagne active</span>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-400/10 text-green-400">LIVE</span>
        </div>

        <div className="p-5 space-y-5">
          {/* Budget dial */}
          <div className="flex items-start gap-5">
            <div className="flex-1">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Budget mensuel</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">CHF 2,400</span>
                <span className="text-[10px] text-zinc-500">/ mois</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full w-[68%]" style={{ background: 'linear-gradient(90deg, #7C3AED, #A78BFA)' }} />
              </div>
              <p className="text-[9px] text-zinc-500 mt-1">68% consomme · 12 jours restants</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Revenue genere</p>
              <p className="text-2xl font-bold text-green-400">CHF 19,680</p>
              <p className="text-[9px] text-green-400 font-bold">ROAS 8.2x</p>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Live metrics ticker */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Clics auj.', value: '47', trend: '+12' },
              { label: 'CPC moyen', value: '1.18', trend: '-0.22' },
              { label: 'Conv. auj.', value: '6', trend: '+3' },
              { label: 'Cout/conv.', value: '18.40', trend: '-4.60' },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-[8px] text-zinc-600 uppercase">{m.label}</p>
                <p className="text-sm font-bold text-white">{m.label.includes('CPC') || m.label.includes('Cout') ? `CHF ${m.value}` : m.value}</p>
                <p className="text-[9px] font-bold" style={{ color: m.trend.startsWith('-') ? '#4ade80' : '#4ade80' }}>{m.trend}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating conversion funnel */}
      <div className="absolute -right-2 top-8 rotate-1">
        <div
          className="rounded-lg p-3"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-2">Funnel du jour</p>
          {[
            { step: 'Impressions', val: '1,842', w: '100%' },
            { step: 'Clics', val: '47', w: '60%' },
            { step: 'Conversions', val: '6', w: '25%' },
          ].map((f) => (
            <div key={f.step} className="flex items-center gap-2 mb-1">
              <div className="h-3 rounded-sm" style={{ width: f.w, minWidth: '20px', background: 'linear-gradient(90deg, rgba(124,58,237,0.4), rgba(124,58,237,0.15))' }} />
              <span className="text-[8px] text-zinc-400 whitespace-nowrap">{f.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Lighthouse */}
      <div className="absolute -left-3 bottom-16 -rotate-2">
        <div
          className="rounded-lg p-2.5 grid grid-cols-3 gap-2"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          {[
            { label: 'Perf', score: 99 },
            { label: 'SEO', score: 98 },
            { label: 'A11y', score: 100 },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="w-8 h-8 mx-auto rounded-full border-2 border-green-400/60 flex items-center justify-center">
                <span className="text-[9px] font-bold text-green-400">{s.score}</span>
              </div>
              <span className="text-[7px] text-zinc-500 mt-0.5 block">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '8.2x', l: 'ROAS moyen', c: '#4ade80' },
          { v: '-22%', l: 'Cout par clic', c: V },
          { v: 'CHF 0', l: 'Frais caches', c: '#FF8C00' },
        ].map((s) => (
          <div
            key={s.l}
            className="text-center py-3 rounded-[10px]"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-lg font-bold" style={{ color: s.c }}>{s.v}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
