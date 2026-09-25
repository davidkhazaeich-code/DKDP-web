import { orange } from '@/lib/tokens'

const O = orange.color
const OD = orange.border

// 25/09/2026 : la « demande » par programme (95, 88, 76 et 72 %) n'avait aucune
// source, « 7 programmes » ne suivait plus le catalogue (compté désormais par la
// page) et « Personnes formées : 1 à 10 » décrivait en fait la taille d'une session.
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
    <div className="relative flex flex-col gap-4">
      {/* Training Programs Dashboard */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${OD}`, boxShadow: '0 0 60px rgba(255,140,0,0.12)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-orange-400">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] text-zinc-400 font-mono">{t.header}</span>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-400/10 text-orange-400">{t.programsBadge}</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Program cards grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {t.programs.map((prog) => (
              <div
                key={prog.name}
                className="rounded-lg p-2.5"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[12px]">{prog.icon}</span>
                  <span className="text-[10px] font-semibold text-zinc-300 truncate">{prog.name}</span>
                </div>
                {prog.badge && (
                  <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full mb-1.5 inline-block" style={{ background: `${prog.badgeColor}15`, color: prog.badgeColor, border: `1px solid ${prog.badgeColor}30` }}>
                    {prog.badge}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="h-px bg-white/5" />

          {/* Participant journey */}
          <div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2">{t.journeyLabel}</p>
            <div className="flex items-center gap-1">
              {t.journey.map((s, i) => (
                <div key={s.step} className="flex items-center gap-1 flex-1">
                  <div className="flex-1">
                    <div
                      className="h-6 rounded-md flex items-center justify-center"
                      style={{
                        background: s.done ? 'rgba(255,140,0,0.08)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${s.done ? 'rgba(255,140,0,0.2)' : 'rgba(255,255,255,0.05)'}`,
                      }}
                    >
                      <span className="text-[8px] font-semibold" style={{ color: s.done ? O : '#71717a' }}>
                        {s.step}
                      </span>
                    </div>
                  </div>
                  {i < 3 && <span className="text-[10px] text-zinc-600">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating participants counter */}
      <div className="absolute -right-2 top-8 rotate-1 hidden lg:block">
        <div
          className="rounded-lg p-3 text-center"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(255,140,0,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1">{t.trained}</p>
          <p className="text-xl font-bold" style={{ color: O }}>1 à 10</p>
          <p className="text-[8px] text-zinc-500 mt-0.5">{t.trainedSub}</p>
        </div>
      </div>

      {/* Floating formats */}
      <div className="absolute -left-3 bottom-16 -rotate-2 hidden lg:block">
        <div
          className="rounded-lg p-2.5"
          style={{ background: 'rgba(0,0,0,0.9)', border: `1px solid ${OD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1.5">{t.formatsLabel}</p>
          {t.formats.map((f) => (
            <div key={f.format} className="flex items-center gap-1.5 text-[9px] mb-0.5">
              <span>{f.icon}</span>
              <span className="text-zinc-400">{f.format}</span>
              <span className="text-green-400 ml-auto text-[8px]">&#10003;</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {t.stats.map((s) => (
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
