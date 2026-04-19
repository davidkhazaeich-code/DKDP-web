import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative flex flex-col gap-4">
      {/* Audit Radar + Before/After */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <span className="text-[10px] text-zinc-400 font-mono">Audit Marketing 360 · Resultat</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[9px] text-amber-400 font-bold">Avant DKDP</span>
            <div className="w-2 h-2 rounded-full bg-green-400 ml-2" />
            <span className="text-[9px] text-green-400 font-bold">Apres 6 mois</span>
          </div>
        </div>

        <div className="p-5">
          {/* Radar-style bars */}
          <div className="space-y-3">
            {[
              { axis: 'stratégie digitale', before: 25, after: 85 },
              { axis: 'SEO technique', before: 18, after: 92 },
              { axis: 'Contenu & copywriting', before: 35, after: 78 },
              { axis: 'Conversion (UX/CRO)', before: 22, after: 71 },
              { axis: 'Analytics & tracking', before: 12, after: 88 },
              { axis: 'Publicite payante', before: 40, after: 82 },
            ].map((a) => (
              <div key={a.axis}>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-zinc-400">{a.axis}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400/60 text-[9px] line-through">{a.before}%</span>
                    <span className="text-green-400 font-bold text-[9px]">{a.after}%</span>
                  </div>
                </div>
                <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
                  {/* Before bar (faded) */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full opacity-30"
                    style={{ width: `${a.before}%`, background: '#fbbf24' }}
                  />
                  {/* After bar */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${a.after}%`, background: 'linear-gradient(90deg, rgba(74,222,128,0.7), rgba(74,222,128,0.3))' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-zinc-500 uppercase">Score global</p>
              <div className="flex items-baseline gap-2">
                <span className="text-amber-400/50 text-sm line-through">25/100</span>
                <span className="text-green-400 text-xl font-bold">83/100</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-zinc-500 uppercase">Amelioration</p>
              <p className="text-xl font-bold" style={{ color: V }}>+232%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating ROI card */}
      <div className="absolute -right-2 top-8 rotate-1 hidden lg:block">
        <div
          className="rounded-lg p-3"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1">ROI a 6 mois</p>
          <p className="text-xl font-bold text-green-400">+340%</p>
          <p className="text-[8px] text-zinc-500">sur le budget marketing</p>
        </div>
      </div>

      {/* Floating quick wins */}
      <div className="absolute -left-3 bottom-16 -rotate-2 hidden lg:block">
        <div
          className="rounded-lg p-2.5"
          style={{ background: 'rgba(0,0,0,0.9)', border: `1px solid ${VD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1.5">Quick wins identifies</p>
          {['SEO technique', 'Tracking GA4', 'Landing pages'].map((w) => (
            <div key={w} className="flex items-center gap-1.5 text-[9px]">
              <span className="text-green-400">&#10003;</span>
              <span className="text-zinc-400">{w}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '+232%', l: 'Score marketing', c: '#4ade80' },
          { v: '360°', l: 'Audit complet', c: V },
          { v: '3 mois', l: 'Premiers résultats', c: '#FF8C00' },
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
