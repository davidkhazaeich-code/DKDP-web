import { Check, Mail, FileText } from 'lucide-react'
import { chrome, violet, green } from '@/lib/tokens'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { dg } from '@/components/motion/dg'
import type { Locale } from '@/i18n/config'
import { CONTENT } from './content'

const CH = chrome.color
const V = violet.color
const VD = violet.border
const G = green.color

const TONE: Record<string, { c: string; bg: string; bd: string }> = {
  green: { c: G, bg: 'rgba(74,222,128,0.10)', bd: 'rgba(74,222,128,0.35)' },
  violet: { c: V, bg: 'rgba(167,139,250,0.12)', bd: 'rgba(167,139,250,0.35)' },
  chrome: { c: CH, bg: 'rgba(212,212,216,0.08)', bd: 'rgba(212,212,216,0.25)' },
  muted: { c: '#71717a', bg: 'rgba(255,255,255,0.03)', bd: 'rgba(255,255,255,0.08)' },
}

/**
 * 01/10/2026 : le premier outil de l'accompagnement montré au travail, un tri du
 * matin branché sur la messagerie (kit dg-*, docs/claude/22-diagrammes-animes.md).
 * Les emails arrivent un à un, chacun reçoit son étiquette, puis la synthèse part
 * vers la direction. Exemples génériques, aucun chiffre : seuls les faits de
 * l'offre (branché sur la messagerie, équipe pilote, sans prompt) figurent en bas.
 */
export function HeroVisual({ lang = 'fr' }: { lang?: Locale }) {
  const t = CONTENT[lang].visual
  return (
    <DiagramMotion mode="hero" className="relative flex flex-col gap-4" style={{ '--dg-loop-start': '2.6s' } as React.CSSProperties}>
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(212,212,216,0.18)', boxShadow: '0 0 60px rgba(212,212,216,0.08)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <span className="text-[10px] text-zinc-400 font-mono">{t.header}</span>
          <div className="dg-fade flex items-center gap-1.5" style={dg(0, 100)}>
            <span className="w-2 h-2 rounded-full" style={{ background: G }} />
            <span className="text-[9px] font-bold" style={{ color: G }}>{t.auto}</span>
            <span className="w-2 h-2 rounded-full ml-2" style={{ background: V }} />
            <span className="text-[9px] font-bold" style={{ color: V }}>{t.check}</span>
          </div>
        </div>

        <ul className="divide-y divide-white/5" style={{ '--dg-step': '260ms' } as React.CSSProperties}>
          {t.rows.map((r, i) => {
            const tone = TONE[r.tone]
            return (
              <li key={r.from} className="dg-slide flex items-center gap-3 px-4 py-3" style={dg(i, 250)}>
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Mail size={13} style={{ color: '#a1a1aa' }} aria-hidden="true" />
                </span>
                <span className="flex-1 min-w-0 text-[11.5px] text-zinc-300 truncate">{r.from}</span>
                <span
                  className="dg-pop flex-shrink-0 rounded-full px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider"
                  style={{ ...dg(i, 420, { '--dg-origin': 'right center' }), color: tone.c, background: tone.bg, border: `1px solid ${tone.bd}` }}
                >
                  {r.tag}
                </span>
              </li>
            )
          })}
        </ul>

        {/* Synthèse du matin : elle part quand toute la boîte est triée */}
        <div className="dg-rise flex items-center gap-3 px-4 py-3 border-t border-white/10" style={{ ...dg(0, 1850), background: 'rgba(167,139,250,0.05)' }}>
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md" style={{ background: 'rgba(167,139,250,0.12)', border: `1px solid ${VD}` }}>
            <FileText size={14} style={{ color: V }} aria-hidden="true" />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[11px] font-semibold text-text">{t.report}</span>
            <span className="block text-[9.5px] text-zinc-500">{t.reportSub}</span>
          </span>
          <span className="dg-pop flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ ...dg(0, 2150), background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.4)' }}>
            <Check size={11} style={{ color: G }} aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {t.mini.map((s, i) => (
          <div
            key={s.l}
            className="dg-rise text-center py-3 rounded-[10px]"
            style={{ ...dg(i, 2250), background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-[10px] text-text-muted mb-0.5">{s.l}</p>
            <p className="text-sm md:text-base font-bold" style={{ color: i === 1 ? V : i === 2 ? G : CH }}>{s.v}</p>
          </div>
        ))}
      </div>
    </DiagramMotion>
  )
}
