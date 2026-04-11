import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative hidden lg:flex flex-col gap-4">
      {/* Marketing Strategy mockup */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-[10px] text-zinc-500 font-mono ml-2">Audit Marketing · Strategie 360</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Funnel visualization */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Funnel de conversion</span>
            <div className="mt-3 space-y-1.5">
              {[
                { stage: 'Visiteurs', value: '12,400', width: '100%', color: 'rgba(124,58,237,0.2)' },
                { stage: 'Leads qualifies', value: '860', width: '70%', color: 'rgba(124,58,237,0.3)' },
                { stage: 'Opportunites', value: '210', width: '42%', color: 'rgba(124,58,237,0.45)' },
                { stage: 'Clients signes', value: '48', width: '22%', color: 'rgba(124,58,237,0.6)' },
              ].map((s) => (
                <div key={s.stage} className="flex items-center gap-3">
                  <div
                    className="h-6 rounded-md flex items-center px-2.5 transition-all"
                    style={{ width: s.width, background: s.color }}
                  >
                    <span className="text-[10px] text-zinc-300 whitespace-nowrap">{s.stage}</span>
                  </div>
                  <span className="text-[10px] font-bold text-white whitespace-nowrap">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Audit scores */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'SEO', score: 72, max: 100 },
              { label: 'Contenu', score: 45, max: 100 },
              { label: 'Conversion', score: 38, max: 100 },
            ].map((a) => (
              <div key={a.label} className="text-center">
                <p className="text-[9px] text-zinc-500 mb-1">{a.label}</p>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${a.score}%`,
                      background: a.score > 60
                        ? 'linear-gradient(90deg, rgba(74,222,128,0.6), rgba(74,222,128,0.3))'
                        : 'linear-gradient(90deg, rgba(255,107,0,0.6), rgba(255,107,0,0.3))',
                    }}
                  />
                </div>
                <p className="text-[10px] font-bold text-white mt-1">{a.score}/100</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating ROI badge */}
      <div className="absolute -right-3 top-14 rotate-2">
        <div
          className="rounded-lg px-3 py-2 flex items-center gap-2"
          style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-green-400/60 flex items-center justify-center">
            <span className="text-[9px] font-bold text-green-400">+65%</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">ROI Marketing</p>
            <p className="text-[8px] text-zinc-500">Apres 6 mois</p>
          </div>
        </div>
      </div>

      {/* Floating audit badge */}
      <div className="absolute -left-4 bottom-20 -rotate-3">
        <div
          className="rounded-lg px-3 py-2 flex items-center gap-2"
          style={{ background: 'rgba(0,0,0,0.85)', border: `1px solid ${VD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'rgba(167,139,250,0.6)' }}>
            <span className="text-[9px] font-bold" style={{ color: V }}>360</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">Audit complet</p>
            <p className="text-[8px] text-zinc-500">SEO + Ads + Contenu + UX</p>
          </div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '65%', l: 'ROI moyen', c: '#4ade80' },
          { v: '360°', l: 'Audit complet', c: V },
          { v: '3 mois', l: 'Premiers resultats', c: '#FF8C00' },
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
