import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative flex flex-col gap-4">
      {/* Browser mockup */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <div className="flex-1 mx-3 h-6 rounded-md bg-white/5 flex items-center px-3">
            <span className="text-[10px] text-zinc-500 font-mono">https://votre-entreprise.ch</span>
          </div>
        </div>

        {/* Website content mockup */}
        <div className="p-5 space-y-4">
          {/* Nav skeleton */}
          <div className="flex items-center justify-between">
            <div className="w-20 h-5 rounded bg-white/10" />
            <div className="flex gap-3">
              <div className="w-12 h-3 rounded bg-white/5" />
              <div className="w-12 h-3 rounded bg-white/5" />
              <div className="w-12 h-3 rounded bg-white/5" />
              <div className="w-16 h-5 rounded-md" style={{ background: 'rgba(124,58,237,0.35)' }} />
            </div>
          </div>

          {/* Hero section skeleton */}
          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="space-y-3">
              <div className="w-14 h-4 rounded-full" style={{ background: 'rgba(124,58,237,0.2)', border: `1px solid ${VD}` }} />
              <div className="space-y-1.5">
                <div className="w-full h-4 rounded bg-white/12" />
                <div className="w-4/5 h-4 rounded bg-white/12" />
                <div className="w-3/5 h-4 rounded" style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.3), rgba(167,139,250,0.2))' }} />
              </div>
              <div className="space-y-1">
                <div className="w-full h-2 rounded bg-white/5" />
                <div className="w-5/6 h-2 rounded bg-white/5" />
              </div>
              <div className="w-24 h-7 rounded-lg" style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }} />
            </div>
            <div className="rounded-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(255,107,0,0.08))' }}>
              <div className="w-full h-full min-h-[120px] flex items-center justify-center">
                <div className="w-16 h-16 rounded-xl border border-white/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/20">
                    <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Cards row */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { accent: '#A78BFA', label: 'Performance' },
              { accent: '#FF8C00', label: 'SEO' },
              { accent: '#4ade80', label: 'Responsive' },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-lg p-3"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="w-6 h-6 rounded-md mb-2 flex items-center justify-center" style={{ background: `${c.accent}15` }}>
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: c.accent }} />
                </div>
                <div className="w-16 h-2 rounded bg-white/10 mb-1" />
                <div className="w-10 h-1.5 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating code snippet */}
      <div className="hidden lg:block absolute -right-3 top-16 rotate-2">
        <div
          className="rounded-lg p-3 font-mono text-[10px] leading-relaxed"
          style={{ background: 'rgba(0,0,0,0.85)', border: `1px solid ${VD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <p><span className="text-violet-400">const</span> <span className="text-zinc-300">site</span> <span className="text-violet-400">=</span> {'{'}</p>
          <p className="pl-3"><span className="text-zinc-500">speed:</span> <span className="text-green-400">&apos;0.8s&apos;</span>,</p>
          <p className="pl-3"><span className="text-zinc-500">seo:</span> <span className="text-green-400">&apos;100/100&apos;</span>,</p>
          <p className="pl-3"><span className="text-zinc-500">stack:</span> <span className="text-orange-400">&apos;Next.js&apos;</span></p>
          <p>{'}'}</p>
        </div>
      </div>

      {/* Floating badges stack */}
      <div className="hidden lg:flex absolute -left-4 top-8 flex-col gap-2.5">
        {/* PageSpeed */}
        <div className="-rotate-3">
          <div
            className="rounded-lg px-3 py-2 flex items-center gap-2"
            style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
          >
            <div className="w-8 h-8 rounded-full border-2 border-green-400/60 flex items-center justify-center">
              <span className="text-[10px] font-bold text-green-400">99</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-white">PageSpeed</p>
              <p className="text-[8px] text-zinc-500">Core Web Vitals vert</p>
            </div>
          </div>
        </div>
        {/* SEO */}
        <div className="-rotate-2">
          <div
            className="rounded-lg px-3 py-2 flex items-center gap-2"
            style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
          >
            <div className="w-8 h-8 rounded-full border-2 border-green-400/60 flex items-center justify-center">
              <span className="text-[10px] font-bold text-green-400">98</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-white">SEO</p>
              <p className="text-[8px] text-zinc-500">Score Lighthouse</p>
            </div>
          </div>
        </div>
        {/* Lisibilite */}
        <div className="-rotate-1">
          <div
            className="rounded-lg px-3 py-2 flex items-center gap-2"
            style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
          >
            <div className="w-8 h-8 rounded-full border-2 border-green-400/60 flex items-center justify-center">
              <span className="text-[10px] font-bold text-green-400">100</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-white">Lisibilite</p>
              <p className="text-[8px] text-zinc-500">Accessibilite A+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: 'Next.js', l: 'Framework', c: V },
          { v: '< 1.5s', l: 'Chargement', c: '#4ade80' },
          { v: '100%', l: 'Responsive', c: '#FF8C00' },
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
