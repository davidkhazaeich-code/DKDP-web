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
                &quot;Analyse ce rapport trimestriel et donne-moi les 3 indicateurs clés avec recommandations pour le comite de direction&quot;
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green-400/10 text-green-400 font-bold">Contexte OK</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green-400/10 text-green-400 font-bold">Role OK</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green-400/10 text-green-400 font-bold">Format OK</span>
              </div>
            </div>
          </div>

          {/* AI tools being used */}
          {/* 25/09/2026 : niveaux « 95 % », « 90 % », « 85 % », « 1h30 gagnée par jour » et « +40 % de productivité » retirés, aucune source. */}
          <div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2">Outils abordés</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'ChatGPT', version: 'GPT-6 Astra', color: '#10B981' },
                { name: 'Claude', version: 'Fable 5.1', color: '#D4A574' },
                { name: 'Copilot', version: 'M365 · Astra', color: '#3B82F6' },
              ].map((tool) => (
                <div key={tool.name} className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-[10px] font-bold" style={{ color: tool.color }}>{tool.name}</p>
                  <p className="text-[8px] text-zinc-500 mt-0.5">{tool.version}</p>
                </div>
              ))}
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
          <p className="text-xl font-bold" style={{ color: O }}>5,0/5</p>
          <p className="text-[8px] text-zinc-500 mt-0.5">22 avis Google</p>
        </div>
      </div>

      {/* 25/09/2026 : carte « Progression J+1 » (92 %, 78 %, 85 %) retirée, aucune source. */}

      {/* Mini stats */}
      {/* 25/09/2026 : « 100 % appliquent dès J+1 » retiré, aucune source. */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '1 à 10', l: 'Personnes par session', c: '#4ade80' },
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
