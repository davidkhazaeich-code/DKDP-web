import { violet } from '@/lib/tokens'

const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative flex flex-col gap-4">
      {/* Compliance Scanner */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green-400">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] text-zinc-400 font-mono">Audit de conformite</span>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-400/10 text-green-400">Conforme</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Big score */}
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
                <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
                <circle
                  cx="48" cy="48" r="40" fill="none"
                  stroke="#4ade80" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.97} ${2 * Math.PI * 40 * 0.03}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-green-400">97%</span>
                <span className="text-[8px] text-zinc-500">conforme</span>
              </div>
            </div>
            <div className="space-y-1.5 flex-1">
              {[
                { cat: 'RGPD (UE)', score: 100, color: '#4ade80' },
                { cat: 'revLPD (Suisse)', score: 100, color: '#4ade80' },
                { cat: 'Cookies (ePrivacy)', score: 92, color: '#fbbf24' },
              ].map((c) => (
                <div key={c.cat}>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-zinc-400">{c.cat}</span>
                    <span className="font-bold" style={{ color: c.color }}>{c.score}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: c.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Checklist items */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {[
              { item: 'Banniere cookies', done: true },
              { item: 'Politique confidentialite', done: true },
              { item: 'Registre traitements', done: true },
              { item: 'Contrats DPA', done: true },
              { item: 'Consentement formulaires', done: true },
              { item: 'Procedure violation', done: false },
            ].map((c) => (
              <div key={c.item} className="flex items-center gap-1.5 text-[10px]">
                {c.done ? (
                  <span className="text-green-400 text-[8px]">&#10003;</span>
                ) : (
                  <span className="text-amber-400 text-[8px]">&#9679;</span>
                )}
                <span className={c.done ? 'text-zinc-400' : 'text-amber-300'}>{c.item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating risk meter */}
      <div className="absolute -right-2 top-8 rotate-1 hidden lg:block">
        <div
          className="rounded-lg p-3 text-center"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1">Risque amende</p>
          <p className="text-xl font-bold text-green-400">Faible</p>
          <p className="text-[8px] text-zinc-500 mt-0.5">Apres mise en conformite</p>
        </div>
      </div>

      {/* Floating before/after */}
      <div className="absolute -left-3 bottom-16 -rotate-2 hidden lg:block">
        <div
          className="rounded-lg p-2.5"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(252,165,165,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <div className="flex gap-3">
            <div className="text-center">
              <p className="text-[7px] text-zinc-600 uppercase">Avant</p>
              <p className="text-sm font-bold text-red-400">23%</p>
            </div>
            <div className="text-zinc-600 self-center">&#8594;</div>
            <div className="text-center">
              <p className="text-[7px] text-zinc-600 uppercase">Apres</p>
              <p className="text-sm font-bold text-green-400">97%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '97%', l: 'Score conformite', c: '#4ade80' },
          { v: '48h', l: 'Mise en place', c: violet.color },
          { v: 'Inclus', l: 'Certificat delivre', c: '#FF8C00' },
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
