import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative hidden lg:flex flex-col gap-4">
      {/* Compliance Dashboard mockup */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-[10px] text-zinc-500 font-mono ml-2">Audit RGPD / revLPD · Conformite</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Compliance score */}
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke="#4ade80" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34 * 0.94} ${2 * Math.PI * 34 * 0.06}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-green-400">94%</span>
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Score de conformite</p>
              <p className="text-zinc-500 text-[10px] mt-0.5">RGPD + revLPD Suisse</p>
              <p className="text-green-400 text-[10px] font-bold mt-1">2 points restants</p>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            {[
              { item: 'Banniere cookies conforme', done: true },
              { item: 'Politique de confidentialite', done: true },
              { item: 'Registre des traitements', done: true },
              { item: 'Contrats sous-traitants (DPA)', done: true },
              { item: 'Formulaires avec consentement', done: true },
              { item: 'Procedure de violation', done: false },
            ].map((c) => (
              <div key={c.item} className="flex items-center gap-2.5 text-[11px]">
                <div
                  className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                  style={{
                    background: c.done ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.04)',
                    border: c.done ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {c.done && <span className="text-green-400 text-[8px]">&#10003;</span>}
                </div>
                <span className={c.done ? 'text-zinc-300' : 'text-zinc-500'}>{c.item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating shield badge */}
      <div className="absolute -right-3 top-14 rotate-2">
        <div
          className="rounded-lg px-3 py-2 flex items-center gap-2"
          style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-green-400/60 flex items-center justify-center">
            <span className="text-[10px]">&#128274;</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">revLPD Suisse</p>
            <p className="text-[8px] text-zinc-500">Conforme depuis sept. 2023</p>
          </div>
        </div>
      </div>

      {/* Floating RGPD badge */}
      <div className="absolute -left-4 bottom-20 -rotate-3">
        <div
          className="rounded-lg px-3 py-2 flex items-center gap-2"
          style={{ background: 'rgba(0,0,0,0.85)', border: `1px solid ${VD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'rgba(167,139,250,0.6)' }}>
            <span className="text-[9px] font-bold" style={{ color: V }}>EU</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">RGPD</p>
            <p className="text-[8px] text-zinc-500">Certification delivree</p>
          </div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '94%', l: 'Score conformite', c: '#4ade80' },
          { v: '48h', l: 'Delai de mise en place', c: V },
          { v: 'CHF 0', l: "D'amende risquee", c: '#FF8C00' },
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
