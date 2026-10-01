import { Check, FileText } from 'lucide-react'
import { chrome, violet, green } from '@/lib/tokens'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { dg } from '@/components/motion/dg'
import type { Locale } from '@/i18n/config'
import { CONTENT } from './content'

const CH = chrome.color
const V = violet.color
const VD = violet.border
const G = green.color

/**
 * 01/10/2026 : feuille de route d'exemple sur trois mois (kit dg-*,
 * docs/claude/22-diagrammes-animes.md). Chaque mois se pose, ses livrables se
 * cochent l'un après l'autre, la barre du mois se remplit, puis le compte rendu
 * mensuel arrive. Aucun chiffre de résultat : seuls les faits de l'offre (jours
 * par mois, démarrage, formations comprises) figurent en bas. Le compte rendu est la
 * dernière ligne de la carte (une carte flottante masquait les livrables).
 */
export function HeroVisual({ lang = 'fr' }: { lang?: Locale }) {
  const t = CONTENT[lang].visual
  return (
    <DiagramMotion mode="hero" className="relative flex flex-col gap-4" style={{ '--dg-loop-start': '2.8s' } as React.CSSProperties}>
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(212,212,216,0.18)', boxShadow: '0 0 60px rgba(212,212,216,0.08)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <span className="text-[10px] text-zinc-400 font-mono">{t.header}</span>
          <div className="dg-fade flex items-center gap-1.5" style={dg(0, 100)}>
            <span className="w-2 h-2 rounded-full" style={{ background: G }} />
            <span className="text-[9px] font-bold" style={{ color: G }}>{t.done}</span>
            <span className="w-2 h-2 rounded-full ml-2" style={{ background: V }} />
            <span className="text-[9px] font-bold" style={{ color: V }}>{t.validated}</span>
          </div>
        </div>

        <div className="p-5">
          <ol className="relative space-y-4">
            {/* Fil de la feuille de route : il se dessine de haut en bas */}
            <span aria-hidden="true" className="dg-grow-y absolute left-[11px] top-3 bottom-3 w-px" style={{ ...dg(0, 150, { '--dg-dur': '1600ms', '--dg-origin': 'center top' }), background: 'linear-gradient(to bottom, rgba(212,212,216,0.45), rgba(167,139,250,0.35))' }} />
            {t.rows.map((r, i) => (
              <li key={r.m} className="relative pl-9">
                <span
                  className="dg-pop absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ ...dg(i, 250, { '--dg-step': '420ms' }), background: 'rgba(10,10,10,0.95)', border: `1px solid ${i === 2 ? VD : 'rgba(212,212,216,0.35)'}`, color: i === 2 ? V : CH }}
                >
                  {i + 1}
                </span>
                <div className="dg-rise flex items-baseline justify-between gap-3" style={dg(i, 300, { '--dg-step': '420ms' })}>
                  <p className="text-[12px] font-semibold text-text">
                    <span className="text-zinc-500 font-mono text-[10px] mr-2">{r.m}</span>
                    {r.t}
                  </p>
                  <span className="dg-fade text-[9px] font-bold uppercase tracking-wider" style={{ ...dg(i, 700, { '--dg-step': '420ms' }), color: V }}>
                    {t.validated}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5" style={{ '--dg-at': `${400 + i * 420}ms`, '--dg-step': '90ms' } as React.CSSProperties}>
                  {r.items.map((it, k) => (
                    <span
                      key={it}
                      className="dg-slide flex items-center gap-1 rounded-md px-1.5 py-1 text-[9.5px] text-zinc-300"
                      style={{ '--dg-i': k, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' } as React.CSSProperties}
                    >
                      <Check size={10} style={{ color: G }} aria-hidden="true" />
                      <span className="whitespace-nowrap">{it}</span>
                    </span>
                  ))}
                </div>
                <div className="mt-2 relative h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="dg-grow-x absolute inset-y-0 left-0 rounded-full"
                    style={{ ...dg(i, 450, { '--dg-step': '420ms', '--dg-dur': '700ms' }), width: '100%', background: 'linear-gradient(90deg, rgba(74,222,128,0.65), rgba(74,222,128,0.2))' }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Compte rendu du mois : il arrive quand les trois mois sont posés */}
        <div className="dg-rise flex items-center gap-3 px-5 py-3 border-t border-white/5" style={dg(0, 1800)}>
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md" style={{ background: 'rgba(167,139,250,0.12)', border: `1px solid ${VD}` }}>
            <FileText size={14} style={{ color: V }} aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block text-[11px] font-semibold text-text">{t.report}</span>
            <span className="block text-[9.5px] text-zinc-500">{t.reportSub}</span>
          </span>
          <span className="dg-pop flex h-5 w-5 items-center justify-center rounded-full" style={{ ...dg(0, 2100), background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.4)' }}>
            <Check size={11} style={{ color: G }} aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {t.mini.map((s, i) => (
          <div
            key={s.l}
            className="dg-rise text-center py-3 rounded-[10px]"
            style={{ ...dg(i, 2200), background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-base md:text-lg font-bold" style={{ color: i === 1 ? V : i === 2 ? G : CH }}>{s.v}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
    </DiagramMotion>
  )
}
