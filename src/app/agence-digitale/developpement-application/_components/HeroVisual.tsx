import { violet } from '@/lib/tokens'

const V = violet.color
const VD = violet.border

export function HeroVisual() {
  return (
    <div className="relative flex gap-4 items-end">

      {/* ── Phone mockup (iOS style) ── */}
      <div className="relative flex-shrink-0">
        <div
          className="w-[120px] rounded-[24px] overflow-hidden"
          style={{
            background: '#0d0d0d',
            border: `1px solid ${VD}`,
            boxShadow: '0 0 40px rgba(124,58,237,0.18)',
          }}
        >
          {/* Notch */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-16 h-4 rounded-full bg-black/80 border border-white/5" />
          </div>

          {/* App screen */}
          <div className="px-2.5 pb-4 space-y-2.5">
            {/* App header */}
            <div className="flex items-center justify-between">
              <div className="w-14 h-2.5 rounded bg-white/15" />
              <div className="w-5 h-5 rounded-full" style={{ background: 'rgba(124,58,237,0.3)', border: `1px solid ${VD}` }} />
            </div>

            {/* KPI card */}
            <div
              className="rounded-[10px] p-2.5"
              style={{ background: 'rgba(124,58,237,0.12)', border: `1px solid ${VD}` }}
            >
              <div className="w-10 h-1.5 rounded bg-white/20 mb-2" />
              <div className="text-[14px] font-bold leading-none" style={{ color: V }}>+38%</div>
              <div className="w-8 h-1 rounded bg-white/10 mt-1" />
            </div>

            {/* List items */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-lg flex-shrink-0"
                  style={{ background: i === 1 ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
                <div className="space-y-1 flex-1">
                  <div className="h-1.5 rounded bg-white/15" style={{ width: `${75 - i * 10}%` }} />
                  <div className="h-1 rounded bg-white/6" style={{ width: `${55 - i * 8}%` }} />
                </div>
              </div>
            ))}

            {/* Bottom nav */}
            <div className="flex justify-around pt-1">
              {[true, false, false, false].map((active, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-lg"
                  style={{ background: active ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.04)', border: `1px solid ${active ? VD : 'transparent'}` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Badge iOS/Android */}
        <div
          className="absolute -top-2 -right-3 rounded-full px-2.5 py-1 text-[9px] font-bold whitespace-nowrap"
          style={{ background: 'rgba(124,58,237,0.9)', color: '#fff', boxShadow: '0 4px 12px rgba(124,58,237,0.4)' }}
        >
          iOS &amp; Android
        </div>
      </div>

      {/* ── Web / SaaS mockup (browser) ── */}
      <div className="relative flex-1">
        <div
          className="rounded-[14px] overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.12)' }}
        >
          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
            <div className="flex-1 mx-2 h-5 rounded-md bg-white/5 flex items-center px-2.5">
              <span className="text-[9px] text-zinc-500 font-mono">app.votre-entreprise.ch</span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-4 space-y-3">
            {/* Top nav */}
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {['Dashboard', 'Clients', 'Stats'].map((label, i) => (
                  <span
                    key={label}
                    className="text-[9px] px-2 py-0.5 rounded"
                    style={{
                      color: i === 0 ? V : '#666',
                      background: i === 0 ? 'rgba(124,58,237,0.12)' : 'transparent',
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="w-5 h-5 rounded-full bg-white/8" />
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Commandes', val: '1 284', c: V },
                { label: 'Revenus', val: 'CHF 48k', c: '#FF8C00' },
                { label: 'Clients', val: '342', c: '#4ade80' },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-[8px] p-2"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="text-[8px] text-zinc-500 mb-0.5">{k.label}</p>
                  <p className="text-[11px] font-bold" style={{ color: k.c }}>{k.val}</p>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div
              className="rounded-[10px] p-3 h-16 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-[8px] text-zinc-600 mb-1">Activité 30 jours</p>
              <svg viewBox="0 0 200 30" className="w-full" preserveAspectRatio="none" style={{ height: 28 }}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 25 L20 20 L40 22 L60 15 L80 18 L100 10 L120 12 L140 8 L160 5 L180 3 L200 1 L200 30 L0 30 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M0 25 L20 20 L40 22 L60 15 L80 18 L100 10 L120 12 L140 8 L160 5 L180 3 L200 1"
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Table rows */}
            <div className="space-y-1.5">
              {[80, 65, 50].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-white/5 flex-shrink-0" />
                  <div className="h-1.5 rounded bg-white/10 flex-1" style={{ maxWidth: `${w}%` }} />
                  <div className="h-1.5 w-8 rounded" style={{ background: 'rgba(124,58,237,0.25)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badge Web App */}
        <div
          className="absolute -bottom-2 -left-3 rounded-full px-2.5 py-1 text-[9px] font-bold whitespace-nowrap"
          style={{ background: 'rgba(255,140,0,0.85)', color: '#fff', boxShadow: '0 4px 12px rgba(255,140,0,0.35)' }}
        >
          Web App / PWA
        </div>
      </div>

      {/* Floating code snippet */}
      <div className="hidden lg:block absolute -right-4 top-4 rotate-2">
        <div
          className="rounded-lg p-2.5 font-mono text-[9px] leading-relaxed"
          style={{ background: 'rgba(0,0,0,0.88)', border: `1px solid ${VD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <p><span className="text-violet-400">const</span> <span className="text-zinc-300">app</span> = {'{'}</p>
          <p className="pl-3"><span className="text-zinc-500">platform:</span> <span className="text-orange-400">&apos;iOS/Android&apos;</span>,</p>
          <p className="pl-3"><span className="text-zinc-500">stack:</span> <span className="text-green-400">&apos;React Native&apos;</span>,</p>
          <p className="pl-3"><span className="text-zinc-500">deploy:</span> <span className="text-violet-400">&apos;App Store&apos;</span></p>
          <p>{'}'}</p>
        </div>
      </div>
    </div>
  )
}
