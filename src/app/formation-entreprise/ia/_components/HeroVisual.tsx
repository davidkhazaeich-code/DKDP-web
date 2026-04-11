import { orange } from '@/lib/tokens'

const O = orange.color
const OD = orange.border

export function HeroVisual() {
  return (
    <div className="relative hidden lg:flex flex-col gap-4">
      {/* AI Prompt Interface mockup */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${OD}`, boxShadow: '0 0 60px rgba(255,140,0,0.12)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-orange-400">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] text-zinc-400 font-mono">Atelier IA · Exercice pratique</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] text-green-400 font-bold">EN COURS</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Prompt input */}
          <div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2">Prompt du participant</p>
            <div className="rounded-lg p-3" style={{ background: 'rgba(255,140,0,0.04)', border: '1px solid rgba(255,140,0,0.12)' }}>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                &quot;Analyse ce rapport trimestriel et donne-moi les 3 indicateurs cles avec recommandations pour le comite de direction&quot;
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green-400/10 text-green-400 font-bold">Contexte OK</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green-400/10 text-green-400 font-bold">Role OK</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green-400/10 text-green-400 font-bold">Format OK</span>
              </div>
            </div>
          </div>

          {/* AI tools being used */}
          <div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2">Outils maitrises</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'ChatGPT', version: 'GPT-4o', level: 95, color: '#10B981' },
                { name: 'Claude', version: 'Opus', level: 90, color: '#D4A574' },
                { name: 'Copilot', version: 'M365', level: 85, color: '#3B82F6' },
              ].map((tool) => (
                <div key={tool.name} className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-white">{tool.name}</span>
                    <span className="text-[8px] text-zinc-500">{tool.version}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${tool.level}%`, background: tool.color }} />
                  </div>
                  <p className="text-[8px] text-right mt-1 font-bold" style={{ color: tool.color }}>{tool.level}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Time saved metric */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-zinc-500 uppercase">Temps gagne / jour</p>
              <div className="flex items-baseline gap-2">
                <span className="text-amber-400/50 text-sm line-through">0h</span>
                <span className="text-green-400 text-xl font-bold">1h30</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-zinc-500 uppercase">Productivite</p>
              <p className="text-xl font-bold" style={{ color: O }}>+40%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating satisfaction */}
      <div className="absolute -right-2 top-8 rotate-1">
        <div
          className="rounded-lg p-3 text-center"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(255,140,0,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1">Satisfaction</p>
          <p className="text-xl font-bold" style={{ color: O }}>4.9/5</p>
          <p className="text-[8px] text-zinc-500 mt-0.5">500+ participants</p>
        </div>
      </div>

      {/* Floating skill progress */}
      <div className="absolute -left-3 bottom-16 -rotate-2">
        <div
          className="rounded-lg p-2.5"
          style={{ background: 'rgba(0,0,0,0.9)', border: `1px solid ${OD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1.5">Progression J+1</p>
          {[
            { skill: 'Prompting', pct: 92 },
            { skill: 'Automatisation', pct: 78 },
            { skill: 'Analyse IA', pct: 85 },
          ].map((s) => (
            <div key={s.skill} className="flex items-center gap-2 mb-1">
              <span className="text-[8px] text-zinc-400 w-16">{s.skill}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: 'linear-gradient(90deg, #FF8C00, #FFB347)' }} />
              </div>
              <span className="text-[8px] font-bold" style={{ color: O }}>{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '91%', l: 'Appliquent dès J+1', c: '#4ade80' },
          { v: '1 jour', l: 'Format intensif', c: O },
          { v: '100%', l: 'Sur mesure', c: '#FF8C00' },
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
