import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative hidden lg:flex flex-col gap-4">
      {/* Social Dashboard mockup */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-[10px] text-zinc-500 font-mono ml-2">Social Media · Vue d&apos;ensemble</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Platform cards */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { name: 'Instagram', followers: '12.4K', growth: '+340', color: '#E4405F' },
              { name: 'LinkedIn', followers: '8.1K', growth: '+180', color: '#0A66C2' },
              { name: 'TikTok', followers: '5.6K', growth: '+890', color: '#ffffff' },
              { name: 'YouTube', followers: '2.3K', growth: '+120', color: '#FF0000' },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-lg p-2.5 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="w-5 h-5 rounded-md mx-auto mb-1.5 flex items-center justify-center" style={{ background: `${p.color}20` }}>
                  <div className="w-2 h-2 rounded-sm" style={{ background: p.color }} />
                </div>
                <p className="text-[10px] text-zinc-500">{p.name}</p>
                <p className="text-xs font-bold text-white">{p.followers}</p>
                <p className="text-[9px] font-bold text-green-400">{p.growth}/mois</p>
              </div>
            ))}
          </div>

          {/* Engagement preview */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Derniers posts</span>
            {[
              { type: 'Carousel', platform: 'IG', reach: '4.2K', engagement: '8.3%' },
              { type: 'Article thought leadership', platform: 'LI', reach: '12.1K', engagement: '5.7%' },
              { type: 'Reel behind the scenes', platform: 'TK', reach: '18.5K', engagement: '12.1%' },
            ].map((p) => (
              <div key={p.type} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[8px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(124,58,237,0.15)', color: V }}
                  >
                    {p.platform}
                  </span>
                  <span className="text-zinc-400">{p.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 text-[10px]">{p.reach} reach</span>
                  <span className="text-[10px] font-bold text-green-400">{p.engagement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating engagement badge */}
      <div className="absolute -right-3 top-14 rotate-2">
        <div
          className="rounded-lg px-3 py-2 flex items-center gap-2"
          style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-green-400/60 flex items-center justify-center">
            <span className="text-[9px] font-bold text-green-400">8.3%</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">Engagement</p>
            <p className="text-[8px] text-zinc-500">3x la moyenne secteur</p>
          </div>
        </div>
      </div>

      {/* Floating content calendar */}
      <div className="absolute -left-4 bottom-20 -rotate-3">
        <div
          className="rounded-lg px-3 py-2"
          style={{ background: 'rgba(0,0,0,0.85)', border: `1px solid ${VD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">Calendrier</p>
          <div className="grid grid-cols-5 gap-1">
            {['L', 'M', 'M', 'J', 'V'].map((d, i) => (
              <div key={`${d}-${i}`} className="text-center">
                <span className="text-[7px] text-zinc-600">{d}</span>
                <div
                  className="w-4 h-4 rounded-sm mx-auto mt-0.5"
                  style={{
                    background: [0, 2, 4].includes(i)
                      ? 'rgba(124,58,237,0.35)'
                      : 'rgba(255,255,255,0.04)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '4 plateformes', l: 'Gerees', c: V },
          { v: '+340%', l: 'Croissance annuelle', c: '#4ade80' },
          { v: '12 posts', l: 'Par mois', c: '#FF8C00' },
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
