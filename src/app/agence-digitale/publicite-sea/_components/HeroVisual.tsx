import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative hidden lg:flex flex-col gap-4">
      {/* Google Ads Dashboard mockup */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-[10px] text-zinc-500 font-mono ml-2">Google Ads · Campagnes actives</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Campaign metrics */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Impressions', value: '24.8K', change: '+18%' },
              { label: 'Clics', value: '1,247', change: '+32%' },
              { label: 'CPC moyen', value: 'CHF 1.20', change: '-15%' },
              { label: 'Conversions', value: '89', change: '+45%' },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-[9px] text-zinc-500 mb-1">{m.label}</p>
                <p className="text-sm font-bold text-white">{m.value}</p>
                <p className="text-[9px] font-bold" style={{ color: m.change.startsWith('-') ? '#4ade80' : '#4ade80' }}>{m.change}</p>
              </div>
            ))}
          </div>

          <div className="h-px bg-white/5" />

          {/* Active campaigns */}
          <div className="space-y-2">
            {[
              { name: 'Search · Mots-cles marque', status: 'Active', roas: '8.2x', spend: 'CHF 450' },
              { name: 'Search · Generiques Geneve', status: 'Active', roas: '4.7x', spend: 'CHF 1,200' },
              { name: 'Remarketing · Visiteurs site', status: 'Active', roas: '12.1x', spend: 'CHF 320' },
            ].map((c) => (
              <div key={c.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-zinc-300">{c.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-500 text-[10px]">{c.spend}</span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{ background: 'rgba(124,58,237,0.15)', color: V }}
                  >
                    ROAS {c.roas}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating ROAS badge */}
      <div className="absolute -right-3 top-14 rotate-2">
        <div
          className="rounded-lg px-3 py-2 flex items-center gap-2"
          style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-green-400/60 flex items-center justify-center">
            <span className="text-[10px] font-bold text-green-400">8.2x</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">ROAS moyen</p>
            <p className="text-[8px] text-zinc-500">Retour sur investissement</p>
          </div>
        </div>
      </div>

      {/* Floating conversion badge */}
      <div className="absolute -left-4 bottom-20 -rotate-3">
        <div
          className="rounded-lg px-3 py-2 flex items-center gap-2"
          style={{ background: 'rgba(0,0,0,0.85)', border: `1px solid ${VD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'rgba(167,139,250,0.6)' }}>
            <span className="text-[9px] font-bold" style={{ color: V }}>+45%</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">Conversions</p>
            <p className="text-[8px] text-zinc-500">vs trimestre precedent</p>
          </div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '-15%', l: 'Cout par clic', c: '#4ade80' },
          { v: '8.2x', l: 'ROAS moyen', c: V },
          { v: 'CHF 0', l: 'Frais de gestion caches', c: '#FF8C00' },
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
