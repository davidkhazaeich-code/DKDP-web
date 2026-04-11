import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative hidden lg:flex flex-col gap-4">
      {/* SEO Dashboard mockup */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-[10px] text-zinc-500 font-mono ml-2">SEO Dashboard · dkdp.ch</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Traffic chart */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Trafic organique</span>
              <span className="text-[10px] font-bold" style={{ color: '#4ade80' }}>+147% YoY</span>
            </div>
            <div className="flex items-end gap-1 h-16">
              {[18, 22, 20, 28, 35, 32, 40, 45, 42, 55, 62, 78].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all"
                  style={{
                    height: `${h}%`,
                    background: i >= 9
                      ? 'linear-gradient(to top, rgba(124,58,237,0.6), rgba(124,58,237,0.2))'
                      : 'rgba(255,255,255,0.06)',
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[8px] text-zinc-600">Jan</span>
              <span className="text-[8px] text-zinc-600">Dec</span>
            </div>
          </div>

          {/* Keyword rankings */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Positions mots-cles</span>
            {[
              { kw: 'agence digitale geneve', pos: 1, change: '+2' },
              { kw: 'creation site web geneve', pos: 2, change: '+5' },
              { kw: 'seo geneve', pos: 3, change: '+8' },
            ].map((k) => (
              <div key={k.kw} className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-400">{k.kw}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold" style={{ color: '#4ade80' }}>{k.change}</span>
                  <span
                    className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold"
                    style={{ background: 'rgba(124,58,237,0.2)', color: V }}
                  >
                    #{k.pos}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Core Web Vitals */}
      <div className="absolute -right-3 top-12 rotate-2">
        <div
          className="rounded-lg p-3"
          style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Core Web Vitals</p>
          {[
            { label: 'LCP', value: '1.2s', ok: true },
            { label: 'FID', value: '8ms', ok: true },
            { label: 'CLS', value: '0.02', ok: true },
          ].map((m) => (
            <div key={m.label} className="flex items-center justify-between gap-4 text-[10px]">
              <span className="text-zinc-400">{m.label}</span>
              <span className="text-green-400 font-bold">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating GEO badge */}
      <div className="absolute -left-4 bottom-20 -rotate-3">
        <div
          className="rounded-lg px-3 py-2 flex items-center gap-2"
          style={{ background: 'rgba(0,0,0,0.85)', border: `1px solid ${VD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'rgba(167,139,250,0.6)' }}>
            <span className="text-[9px] font-bold" style={{ color: V }}>GEO</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">AI Search Ready</p>
            <p className="text-[8px] text-zinc-500">ChatGPT, Perplexity, Gemini</p>
          </div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: 'Top 3', l: 'Google Geneve', c: V },
          { v: '+147%', l: 'Trafic organique', c: '#4ade80' },
          { v: '98/100', l: 'PageSpeed', c: '#FF8C00' },
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
