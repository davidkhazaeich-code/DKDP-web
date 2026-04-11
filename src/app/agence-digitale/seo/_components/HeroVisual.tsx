import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative flex flex-col gap-4">
      {/* SEO + GEO Performance Dashboard */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-violet-400">
              <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7 14l4-4 4 4 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] text-zinc-400 font-mono">Rapport SEO &amp; GEO · Votre site</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] text-green-400 font-bold">Actif</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Keyword rankings */}
          <div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2">Mots-cles en progression</p>
            <div className="space-y-2">
              {[
                { kw: 'votre service + ville', before: 34, after: 3, change: '+31' },
                { kw: 'votre secteur + region', before: 52, after: 7, change: '+45' },
                { kw: 'votre expertise principale', before: 28, after: 1, change: '+27' },
              ].map((k) => (
                <div key={k.kw} className="flex items-center gap-3 text-[10px]">
                  <span className="text-zinc-400 flex-1 truncate">{k.kw}</span>
                  <span className="text-zinc-600 line-through text-[9px]">#{k.before}</span>
                  <span className="text-green-400 font-bold">#{k.after}</span>
                  <div className="flex items-center gap-0.5 text-green-400 text-[8px] font-bold w-8">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {k.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Traffic growth mini chart */}
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2">Trafic organique (12 mois)</p>
              <div className="flex items-end gap-[3px] h-12">
                {[12, 14, 13, 18, 22, 20, 28, 35, 42, 52, 64, 82].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${h}%`,
                      background: i >= 8
                        ? 'linear-gradient(180deg, #4ade80, rgba(74,222,128,0.3))'
                        : 'rgba(255,255,255,0.06)',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="text-right pb-1">
              <p className="text-xl font-bold text-green-400">+580%</p>
              <p className="text-[8px] text-zinc-500">vs. annee precedente</p>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* GEO visibility */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Visibilite GEO (IA)</p>
              <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">Nouveau</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { engine: 'Google AI', score: 87, color: '#4ade80' },
                { engine: 'ChatGPT', score: 72, color: V },
                { engine: 'Perplexity', score: 68, color: '#FF8C00' },
              ].map((e) => (
                <div key={e.engine} className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-[8px] text-zinc-500 mb-1">{e.engine}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold" style={{ color: e.color }}>{e.score}%</span>
                    <span className="text-[7px] text-zinc-600">cite</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating traffic source */}
      <div className="hidden lg:block absolute -right-3 top-6 rotate-1">
        <div
          className="rounded-lg p-3"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1.5">Sources de trafic</p>
          {[
            { src: 'Google', pct: 68, color: '#4ade80' },
            { src: 'IA (GEO)', pct: 18, color: V },
            { src: 'Direct', pct: 14, color: '#FF8C00' },
          ].map((s) => (
            <div key={s.src} className="flex items-center gap-2 mb-1">
              <div className="h-1.5 rounded-full" style={{ width: `${s.pct}px`, background: s.color }} />
              <span className="text-[8px] text-zinc-400">{s.src} {s.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Lighthouse scores */}
      <div className="hidden lg:block absolute -left-3 bottom-16 -rotate-2">
        <div
          className="rounded-lg p-2.5 grid grid-cols-3 gap-2"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          {[
            { label: 'Perf', score: 99 },
            { label: 'SEO', score: 98 },
            { label: 'A11y', score: 100 },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="w-8 h-8 mx-auto rounded-full border-2 border-green-400/60 flex items-center justify-center">
                <span className="text-[9px] font-bold text-green-400">{s.score}</span>
              </div>
              <span className="text-[7px] text-zinc-500 mt-0.5 block">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: 'Top 3', l: 'Positions Google', c: '#4ade80' },
          { v: '+580%', l: 'Trafic organique', c: V },
          { v: 'GEO Ready', l: 'IA + Google', c: '#FF8C00' },
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
