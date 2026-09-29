import { violet } from '@/lib/tokens'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { DgCount, dg } from '@/components/motion/dg'

const V = violet.color
const VD = violet.border

/**
 * 25/09/2026 : la maquette annonçait « Avant DKDP / Après 6 mois », « +232 % », « 3 mois,
 * premiers résultats » et « ROI à 6 mois », sans aucune mesure derrière. Elle devient un
 * exemple de rapport d'audit : situation actuelle contre objectif, valeurs illustratives.
 * 29/09/2026 : l'audit se déroule sous les yeux (kit dg-*, docs/claude/22-diagrammes-animes.md) :
 * chaque axe pose sa situation actuelle, l'objectif la dépasse, l'ancienne valeur se raye et le
 * score global passe de 25 à 83. Au repos, rendu identique.
 */
export function HeroVisual() {
  return (
    <DiagramMotion mode="hero" className="relative flex flex-col gap-4" style={{ '--dg-loop-start': '2.7s' } as React.CSSProperties}>
      {/* Audit Radar : exemple, aujourd'hui contre objectif */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <span className="text-[10px] text-zinc-400 font-mono">Audit Marketing 360 · Exemple</span>
          <div className="dg-fade flex items-center gap-1.5" style={dg(0, 100)}>
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[9px] text-amber-400 font-bold">Aujourd&apos;hui</span>
            <div className="w-2 h-2 rounded-full bg-green-400 ml-2" />
            <span className="text-[9px] text-green-400 font-bold">Objectif</span>
          </div>
        </div>

        <div className="p-5">
          {/* Radar-style bars : la situation actuelle se pose, l'objectif la dépasse, le % défile */}
          <div className="space-y-3" style={{ '--dg-step': '80ms' } as React.CSSProperties}>
            {[
              { axis: 'stratégie digitale', before: 25, after: 85 },
              { axis: 'SEO technique', before: 18, after: 92 },
              { axis: 'Contenu & copywriting', before: 35, after: 78 },
              { axis: 'Conversion (UX/CRO)', before: 22, after: 71 },
              { axis: 'Analytics & tracking', before: 12, after: 88 },
              { axis: 'Publicite payante', before: 40, after: 82 },
            ].map((a, i) => (
              <div key={a.axis}>
                <div className="dg-rise flex justify-between text-[10px] mb-1" style={dg(i, 120)}>
                  <span className="text-zinc-400">{a.axis}</span>
                  <div className="flex items-center gap-2">
                    <span className="dg-strike text-amber-400/60 text-[9px] line-through" style={dg(i, 650)}>{a.before}%</span>
                    <span className="text-green-400 font-bold text-[9px]"><DgCount to={a.after} i={i} at={550} dur={1000} align="end" />%</span>
                  </div>
                </div>
                <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
                  {/* Before bar (faded) */}
                  <div
                    className="dg-grow-x absolute inset-y-0 left-0 rounded-full opacity-30"
                    style={{ ...dg(i, 250, { '--dg-dur': '700ms' }), width: `${a.before}%`, background: '#fbbf24' }}
                  />
                  {/* After bar */}
                  <div
                    className="dg-grow-x absolute inset-y-0 left-0 rounded-full"
                    style={{ ...dg(i, 550, { '--dg-dur': '1000ms' }), width: `${a.after}%`, background: 'linear-gradient(90deg, rgba(74,222,128,0.7), rgba(74,222,128,0.3))' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Summary : l'ancien score se raye, le nouveau apparaît et monte de 25 à 83 (il n'est
              pas affiché avant, sinon on lirait « 25/100 25/100 ») */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-zinc-500 uppercase">Score global</p>
              <div className="flex items-baseline gap-2">
                <span className="dg-strike text-amber-400/50 text-sm line-through" style={dg(0, 1250)}>25/100</span>
                <span className="dg-fade text-green-400 text-xl font-bold" style={dg(0, 1200)}><DgCount from={25} to={83} i={0} at={1300} dur={1100} align="end" />/100</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-zinc-500 uppercase">Plan d&apos;actions</p>
              <p className="dg-pop text-xl font-bold" style={{ ...dg(0, 1550, { '--dg-origin': 'right center' }), color: V }}>Priorisé</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating quick wins : la carte se pose, les gains rapides s'alignent */}
      <div className="dg-float absolute -left-3 bottom-16 -rotate-2 hidden lg:block" style={{ '--dg-loop-at': '-3s' } as React.CSSProperties}>
        <div
          className="dg-pop rounded-lg p-2.5"
          style={{ ...dg(0, 900, { '--dg-origin': 'left bottom' }), background: 'rgba(0,0,0,0.9)', border: `1px solid ${VD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1.5">Quick wins identifies</p>
          {['SEO technique', 'Tracking GA4', 'Landing pages'].map((w, i) => (
            <div key={w} className="dg-slide flex items-center gap-1.5 text-[9px]" style={dg(i, 1000, { '--dg-step': '120ms' })}>
              <span className="text-green-400">&#10003;</span>
              <span className="text-zinc-400">{w}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini stats : faits de l'offre (appel gratuit, audit 360°, feuille de route de l'audit) */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: 'Gratuit', l: 'Appel découverte', c: '#4ade80' },
          { v: '360°', l: 'Audit complet', c: V },
          { v: '12 mois', l: 'Feuille de route', c: '#FF8C00' },
        ].map((s, i) => (
          <div
            key={s.l}
            className="dg-rise text-center py-3 rounded-[10px]"
            style={{ ...dg(i, 1350), background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-lg font-bold" style={{ color: s.c }}>{s.v}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
    </DiagramMotion>
  )
}
