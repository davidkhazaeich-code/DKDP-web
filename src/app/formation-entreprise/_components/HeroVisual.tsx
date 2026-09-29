import { orange } from '@/lib/tokens'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { dg } from '@/components/motion/dg'

const O = orange.color
const OD = orange.border

// 25/09/2026 : la « demande » par programme (95, 88, 76 et 72 %) n'avait aucune
// source, « 7 programmes » ne suivait plus le catalogue (compté désormais par la
// page) et « Personnes formées : 1 à 10 » décrivait en fait la taille d'une session.
// 29/09/2026 : le catalogue s'ouvre (kit dg-*, docs/claude/22-diagrammes-animes.md) :
// les programmes, puis le parcours type étape par étape, qui se rallume ensuite toutes les
// 5 s environ. Au repos, rendu identique.
export function HeroVisual({ lang = 'fr', programCount }: { lang?: 'fr' | 'en'; programCount: number }) {
  const t = lang === 'en'
    ? {
        header: 'DKDP Training · Catalogue', programsBadge: `${programCount} programmes`,
        programs: [
          { name: 'Artificial Intelligence', icon: '🧠', badge: 'Trending', badgeColor: '#FCD34D' },
          { name: 'Claude AI', icon: '✦', badge: 'New', badgeColor: '#D4A574' },
          { name: 'Office tools and Excel', icon: '📊', badge: null, badgeColor: '' },
          { name: 'Cybersecurity', icon: '🛡️', badge: null, badgeColor: '' },
        ],
        journeyLabel: 'Typical journey',
        journey: [{ step: 'Needs audit', done: true }, { step: 'Tailored programme', done: true }, { step: 'Training', done: true }, { step: 'Day 30 follow-up', done: false }],
        trained: 'People per session', trainedSub: 'groups on quote from 3',
        formatsLabel: 'Available formats',
        formats: [{ format: 'On-site', icon: '🏢' }, { format: 'Online', icon: '💻' }, { format: 'Hybrid', icon: '🔄' }],
        stats: [{ v: '5.0/5', l: 'Google rating', c: '#4ade80' }, { v: '100%', l: 'Tailored', c: O }, { v: String(programCount), l: 'Programmes', c: '#FF8C00' }],
      }
    : {
        header: 'DKDP Formation · Catalogue', programsBadge: `${programCount} programmes`,
        programs: [
          { name: 'Intelligence artificielle', icon: '🧠', badge: 'Tendance', badgeColor: '#FCD34D' },
          { name: 'Claude IA', icon: '✦', badge: 'Nouveau', badgeColor: '#D4A574' },
          { name: 'Bureautique et Excel', icon: '📊', badge: null, badgeColor: '' },
          { name: 'Cybersécurité', icon: '🛡️', badge: null, badgeColor: '' },
        ],
        journeyLabel: 'Parcours type',
        journey: [{ step: 'Audit besoins', done: true }, { step: 'Programme sur mesure', done: true }, { step: 'Formation', done: true }, { step: 'Suivi J+30', done: false }],
        trained: 'Personnes par session', trainedSub: 'groupe sur devis dès 3',
        formatsLabel: 'Formats disponibles',
        formats: [{ format: 'Présentiel', icon: '🏢' }, { format: 'En ligne', icon: '💻' }, { format: 'Hybride', icon: '🔄' }],
        stats: [{ v: '5,0/5', l: 'Note Google', c: '#4ade80' }, { v: '100%', l: 'Sur mesure', c: O }, { v: String(programCount), l: 'Programmes', c: '#FF8C00' }],
      }
  return (
    <DiagramMotion mode="hero" className="relative flex flex-col gap-4" style={{ '--dg-loop-start': '2.4s' } as React.CSSProperties}>
      {/* Training Programs Dashboard */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${OD}`, boxShadow: '0 0 60px rgba(255,140,0,0.12)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-orange-400">
              <path className="dg-draw" pathLength={1} style={dg(0, 150)} d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path className="dg-draw" pathLength={1} style={dg(0, 300)} d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] text-zinc-400 font-mono">{t.header}</span>
          </div>
          <span className="dg-pop text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-400/10 text-orange-400" style={dg(0, 250, { '--dg-origin': 'right center' })}>{t.programsBadge}</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Program cards grid : les programmes arrivent, puis leurs badges */}
          <div className="grid grid-cols-2 gap-2.5">
            {t.programs.map((prog, i) => (
              <div
                key={prog.name}
                className="dg-rise rounded-lg p-2.5"
                style={{ ...dg(i, 250), background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[12px]">{prog.icon}</span>
                  <span className="text-[10px] font-semibold text-zinc-300 truncate">{prog.name}</span>
                </div>
                {prog.badge && (
                  <span className="dg-pop text-[7px] font-bold px-1.5 py-0.5 rounded-full mb-1.5 inline-block" style={{ ...dg(i, 550, { '--dg-origin': 'left center' }), background: `${prog.badgeColor}15`, color: prog.badgeColor, border: `1px solid ${prog.badgeColor}30` }}>
                    {prog.badge}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="h-px bg-white/5" />

          {/* Participant journey : les étapes s'enchaînent, puis se rallument l'une après l'autre (dg-beat) */}
          <div>
            <p className="dg-fade text-[9px] text-zinc-500 uppercase tracking-widest mb-2" style={dg(0, 650)}>{t.journeyLabel}</p>
            <div className="flex items-center gap-1" style={{ '--dg-step': '160ms', '--dg-loop': '4.8s' } as React.CSSProperties}>
              {t.journey.map((s, i) => (
                <div key={s.step} className="flex items-center gap-1 flex-1">
                  <div className="flex-1">
                    <div
                      className="dg-pop dg-beat relative h-6 rounded-md flex items-center justify-center"
                      style={{
                        ...dg(i, 750, { '--dg-accent': O, '--dg-loop-at': `${i * 450}ms` }),
                        background: s.done ? 'rgba(255,140,0,0.08)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${s.done ? 'rgba(255,140,0,0.2)' : 'rgba(255,255,255,0.05)'}`,
                      }}
                    >
                      <span className="text-[8px] font-semibold" style={{ color: s.done ? O : '#71717a' }}>
                        {s.step}
                      </span>
                    </div>
                  </div>
                  {i < 3 && <span className="dg-fade text-[10px] text-zinc-600" style={dg(i, 830)}>→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating participants counter */}
      <div className="dg-float absolute -right-2 top-8 rotate-1 hidden lg:block">
        <div
          className="dg-pop rounded-lg p-3 text-center"
          style={{ ...dg(0, 500, { '--dg-origin': 'right top' }), background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(255,140,0,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1">{t.trained}</p>
          <p className="text-xl font-bold" style={{ color: O }}>1 à 10</p>
          <p className="text-[8px] text-zinc-500 mt-0.5">{t.trainedSub}</p>
        </div>
      </div>

      {/* Floating formats : la carte se pose, les formats s'alignent */}
      <div className="dg-float absolute -left-3 bottom-16 -rotate-2 hidden lg:block" style={{ '--dg-loop-at': '-3s' } as React.CSSProperties}>
        <div
          className="dg-pop rounded-lg p-2.5"
          style={{ ...dg(0, 1000, { '--dg-origin': 'left bottom' }), background: 'rgba(0,0,0,0.9)', border: `1px solid ${OD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1.5">{t.formatsLabel}</p>
          {t.formats.map((f, i) => (
            <div key={f.format} className="dg-slide flex items-center gap-1.5 text-[9px] mb-0.5" style={dg(i, 1100, { '--dg-step': '110ms' })}>
              <span>{f.icon}</span>
              <span className="text-zinc-400">{f.format}</span>
              <span className="text-green-400 ml-auto text-[8px]">&#10003;</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {t.stats.map((s, i) => (
          <div
            key={s.l}
            className="dg-rise text-center py-3 rounded-[10px]"
            style={{ ...dg(i, 1300), background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-lg font-bold" style={{ color: s.c }}>{s.v}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
    </DiagramMotion>
  )
}
