import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative flex flex-col gap-4">
      {/* Social Feed mockup */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="flex gap-1.5">
            {[
              { name: 'IG', color: '#E4405F', active: true },
              { name: 'LI', color: '#0A66C2', active: false },
              { name: 'TK', color: '#fff', active: false },
              { name: 'YT', color: '#FF0000', active: false },
            ].map((p) => (
              <div
                key={p.name}
                className="px-2.5 py-1 rounded-full text-[9px] font-bold"
                style={{
                  background: p.active ? `${p.color}20` : 'rgba(255,255,255,0.03)',
                  color: p.active ? p.color : '#71717a',
                  border: `1px solid ${p.active ? `${p.color}40` : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                {p.name}
              </div>
            ))}
          </div>
          <span className="text-[9px] text-zinc-500 ml-auto">Calendrier editorial</span>
        </div>

        <div className="p-4 space-y-3">
          {/* Post preview cards */}
          {[
            {
              type: 'Carousel',
              caption: '5 erreurs SEO que font 90% des PME...',
              likes: '847',
              comments: '63',
              shares: '124',
              time: 'Publie il y a 2h',
              engagement: '8.7%',
            },
            {
              type: 'Reel',
              caption: 'Comment on a triple le trafic de ce client en 3 mois',
              likes: '2.1K',
              comments: '89',
              shares: '340',
              time: 'Publie hier',
              engagement: '12.4%',
            },
          ].map((post) => (
            <div
              key={post.caption}
              className="rounded-lg p-3 flex gap-3"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(255,107,0,0.15))' }}>
                <span className="text-[9px] font-bold text-zinc-400">{post.type}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-zinc-300 leading-tight line-clamp-2">{post.caption}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[9px] text-zinc-500">{post.likes} likes</span>
                  <span className="text-[9px] text-zinc-500">{post.comments} com.</span>
                  <span className="text-[9px] text-zinc-500">{post.shares} partages</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-[10px] font-bold text-green-400">{post.engagement}</span>
                <p className="text-[8px] text-zinc-600">{post.time}</p>
              </div>
            </div>
          ))}

          {/* Upcoming scheduled */}
          <div className="pt-1">
            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-2">A venir cette semaine</p>
            <div className="flex gap-2">
              {[
                { day: 'Mar', type: 'Story', color: '#E4405F' },
                { day: 'Mer', type: 'Article', color: '#0A66C2' },
                { day: 'Ven', type: 'Reel', color: '#E4405F' },
              ].map((s) => (
                <div key={s.day} className="flex-1 rounded-md p-2 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                  <p className="text-[8px] text-zinc-500">{s.day}</p>
                  <p className="text-[10px] font-bold" style={{ color: s.color }}>{s.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating growth chart */}
      <div className="absolute -right-2 top-6 rotate-1 hidden lg:block">
        <div
          className="rounded-lg p-2.5"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 mb-1">Followers 6 mois</p>
          <div className="flex items-end gap-[2px] h-8">
            {[25, 30, 35, 42, 55, 72].map((h, i) => (
              <div key={i} className="w-[6px] rounded-t-sm" style={{ height: `${h}%`, background: i === 5 ? '#4ade80' : 'rgba(124,58,237,0.3)' }} />
            ))}
          </div>
          <p className="text-[8px] font-bold text-green-400 mt-1">+340%</p>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '12.4%', l: 'Engagement moyen', c: '#4ade80' },
          { v: '4', l: 'Plateformes gerees', c: V },
          { v: '12/mois', l: 'Publications', c: '#FF8C00' },
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
