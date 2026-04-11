import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative flex flex-col gap-4">
      {/* Services overview */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-[10px] text-zinc-500 font-mono ml-2">DKDP · Agence Digitale Geneve</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Service cards grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: '&#9678;', name: 'Creation web', kpi: '100+ sites', color: V },
              { icon: '&#9650;', name: 'SEO / GEO', kpi: 'Top 3 Google', color: '#4ade80' },
              { icon: '&#9670;', name: 'Google Ads', kpi: 'ROAS 8.2x', color: '#FF8C00' },
              { icon: '&#9733;', name: 'Reseaux sociaux', kpi: '+340% croissance', color: '#60a5fa' },
            ].map((s) => (
              <div
                key={s.name}
                className="rounded-lg p-3"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs" style={{ color: s.color }} dangerouslySetInnerHTML={{ __html: s.icon }} />
                  <span className="text-[11px] text-zinc-300 font-medium">{s.name}</span>
                </div>
                <p className="text-sm font-bold" style={{ color: s.color }}>{s.kpi}</p>
              </div>
            ))}
          </div>

          {/* Progress overview */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Performance client type</span>
            <div className="mt-2 space-y-2">
              {[
                { label: 'Trafic organique', before: '1.2K', after: '8.4K', pct: 85 },
                { label: 'Leads / mois', before: '12', after: '89', pct: 72 },
                { label: 'Taux de conversion', before: '1.2%', after: '4.8%', pct: 65 },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-zinc-400">{m.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-600 line-through">{m.before}</span>
                      <span className="font-bold text-green-400">{m.after}</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${m.pct}%`,
                        background: `linear-gradient(90deg, rgba(124,58,237,0.6), rgba(167,139,250,0.3))`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -right-3 top-12 rotate-2 hidden lg:block">
        <div
          className="rounded-lg px-3 py-2 flex items-center gap-2"
          style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-green-400/60 flex items-center justify-center">
            <span className="text-[10px] font-bold text-green-400">4.9</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">Satisfaction</p>
            <p className="text-[8px] text-zinc-500">Note client verifiee</p>
          </div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '100+', l: 'Sites livres', c: V },
          { v: '10+ ans', l: "D'experience", c: '#4ade80' },
          { v: 'Geneve', l: 'Base locale', c: '#FF8C00' },
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
