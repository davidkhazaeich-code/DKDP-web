import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative flex flex-col gap-4">
      {/* Google Search Results mockup */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        {/* Search bar */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-3 rounded-full px-4 py-2.5 bg-white/[0.06] border border-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-zinc-400 flex-shrink-0">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[12px] text-zinc-300">agence digitale geneve</span>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-px h-4 bg-white/10" />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-zinc-500">
                <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12V10C18.5 6.41015 15.5899 3.5 12 3.5C8.41015 3.5 5.5 6.41015 5.5 10V12C5.5 15.5899 8.41015 18.5 12 18.5Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 space-y-4">
          {/* Result 1 - #1 position */}
          <div className="rounded-lg p-3" style={{ background: 'rgba(124,58,237,0.06)', border: `1px solid rgba(124,58,237,0.15)` }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded-full bg-violet-500/20 flex items-center justify-center">
                <span className="text-[7px] font-bold" style={{ color: V }}>D</span>
              </div>
              <span className="text-[10px] text-zinc-500">dkdp.ch</span>
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-green-400/10 text-green-400 ml-auto">#1</span>
            </div>
            <p className="text-[13px] font-semibold" style={{ color: '#8AB4F8' }}>DKDP · Agence Digitale Geneve · Site web, SEO, IA</p>
            <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">Creation de site web, referencement SEO, Google Ads et reseaux sociaux pour entreprises a Geneve. Resultats mesurables, devis gratuit.</p>
            <div className="flex gap-2 mt-2">
              {['Creation web', 'SEO', 'Google Ads', 'Contact'].map((l) => (
                <span key={l} className="text-[9px] px-2 py-0.5 rounded border border-white/5 text-zinc-500">{l}</span>
              ))}
            </div>
          </div>

          {/* Result 2 */}
          <div className="opacity-40">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded bg-white/5" />
              <div className="w-24 h-2.5 rounded bg-white/5" />
              <span className="text-[8px] text-zinc-600 ml-auto">#2</span>
            </div>
            <div className="w-full h-3 rounded bg-white/4 mb-1" />
            <div className="w-4/5 h-2 rounded bg-white/3" />
          </div>

          {/* Result 3 */}
          <div className="opacity-25">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded bg-white/5" />
              <div className="w-20 h-2.5 rounded bg-white/5" />
              <span className="text-[8px] text-zinc-600 ml-auto">#3</span>
            </div>
            <div className="w-full h-3 rounded bg-white/4 mb-1" />
            <div className="w-3/5 h-2 rounded bg-white/3" />
          </div>
        </div>
      </div>

      {/* Floating traffic chart */}
      <div className="absolute -right-3 top-6 rotate-1 hidden lg:block">
        <div
          className="rounded-lg p-3"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[9px] font-bold text-zinc-500 mb-1.5">Trafic organique</p>
          <div className="flex items-end gap-[3px] h-10">
            {[15, 18, 16, 22, 28, 25, 35, 42, 48, 55, 68, 82].map((h, i) => (
              <div
                key={i}
                className="w-[5px] rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background: i >= 8 ? '#4ade80' : 'rgba(255,255,255,0.08)',
                }}
              />
            ))}
          </div>
          <p className="text-[9px] font-bold text-green-400 mt-1">+447% en 12 mois</p>
        </div>
      </div>

      {/* Floating Lighthouse scores */}
      <div className="absolute -left-3 bottom-16 -rotate-2 hidden lg:block">
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
          { v: '#1', l: 'Position Google', c: V },
          { v: '+447%', l: 'Trafic organique', c: '#4ade80' },
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
