import { violet } from '@/lib/tokens'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { DgCount, DgTip, dg } from '@/components/motion/dg'

const V = violet.color
const VD = violet.border

// 25/09/2026 : maquette libellée « Exemple » dès l'en-tête (positions, scores GEO et
// sources de trafic sont illustratifs) ; « Top 3, positions Google » remplacé par le
// rapport mensuel de l'offre.
// 29/09/2026 : le rapport se remplit sous les yeux (kit dg-*, docs/claude/22-diagrammes-animes.md) :
// les positions remontent, le trafic monte, les scores défilent. Au repos, rendu identique.
export function HeroVisual() {
  return (
    <DiagramMotion mode="hero" className="relative flex flex-col gap-4" style={{ '--dg-loop-start': '2.4s' } as React.CSSProperties}>
      {/* SEO + GEO Performance Dashboard */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-violet-400">
              <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path className="dg-draw" pathLength={1} style={dg(0, 200, { '--dg-dur': '900ms' })} d="M7 14l4-4 4 4 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] text-zinc-400 font-mono">Rapport SEO et GEO · Exemple</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] text-green-400 font-bold">Actif</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Keyword rankings : la position barrée se raye, la nouvelle remonte jusqu'à sa place */}
          <div>
            <p className="dg-fade text-[9px] text-zinc-500 uppercase tracking-widest mb-2" style={dg(0, 80)}>Mots-clés en progression</p>
            <div className="space-y-2">
              {[
                { kw: 'votre service + Genève', before: 34, after: 3, change: '+31' },
                { kw: 'votre secteur + Suisse romande', before: 52, after: 7, change: '+45' },
                { kw: 'votre expertise + Genève', before: 28, after: 1, change: '+27' },
              ].map((k, i) => (
                <div key={k.kw} className="dg-rise flex items-center gap-3 text-[10px]" style={dg(i, 140)}>
                  <span className="text-zinc-400 flex-1 truncate">{k.kw}</span>
                  <span className="dg-strike text-zinc-600 line-through text-[9px]" style={dg(i, 420)}>#{k.before}</span>
                  <span className="text-green-400 font-bold">#<DgCount from={k.before} to={k.after} i={i} at={460} dur={1100} align="start" /></span>
                  <div className="dg-pop flex items-center gap-0.5 text-green-400 text-[8px] font-bold w-8" style={dg(i, 1300, { '--dg-origin': 'left center' })}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {k.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Traffic growth mini chart : les barres montent de gauche à droite */}
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <p className="dg-fade text-[9px] text-zinc-500 uppercase tracking-widest mb-2" style={dg(0, 300)}>Trafic organique (12 mois)</p>
              <div className="flex items-end gap-[3px] h-12">
                {[12, 14, 13, 18, 22, 20, 28, 35, 42, 52, 64, 82].map((h, i) => (
                  <div
                    key={i}
                    className="dg-grow-y flex-1 rounded-t-sm"
                    style={{
                      ...dg(i, 380, { '--dg-step': '45ms', '--dg-dur': '700ms' }),
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
              <p className="dg-pop text-xl font-bold text-green-400" style={dg(0, 1150, { '--dg-origin': 'right bottom' })}>Page 1</p>
              <p className="dg-fade text-[8px] text-zinc-500" style={dg(0, 1250)}>maquette illustrative</p>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* GEO visibility : les scores défilent */}
          <div>
            <div className="dg-fade flex items-center gap-2 mb-2" style={dg(0, 650)}>
              <p
                className="dg-tip-host text-[9px] text-zinc-500 uppercase tracking-widest cursor-help underline decoration-dotted decoration-zinc-600 underline-offset-2"
                tabIndex={0}
                aria-describedby="seo-hero-geo-tip"
              >
                Visibilité GEO (IA)
                <DgTip id="seo-hero-geo-tip" align="start">Part des réponses d&apos;IA (Google AI, ChatGPT, Perplexity) qui citent votre site. Valeurs d&apos;exemple.</DgTip>
              </p>
              <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">Nouveau</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { engine: 'Google AI', score: 87, color: '#4ade80' },
                { engine: 'ChatGPT', score: 72, color: V },
                { engine: 'Perplexity', score: 68, color: '#FF8C00' },
              ].map((e, i) => (
                <div key={e.engine} className="dg-rise rounded-lg p-2" style={{ ...dg(i, 720), background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-[8px] text-zinc-500 mb-1">{e.engine}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold" style={{ color: e.color }}><DgCount to={e.score} i={i} at={760} />%</span>
                    <span className="text-[7px] text-zinc-600">cité</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating traffic source */}
      <div className="dg-float hidden lg:block absolute -right-3 top-6 rotate-1">
        <div
          className="dg-pop rounded-lg p-3"
          style={{ ...dg(0, 250, { '--dg-origin': 'right top' }), background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1.5">Sources de trafic</p>
          {[
            { src: 'Google', pct: 68, color: '#4ade80' },
            { src: 'IA (GEO)', pct: 18, color: V },
            { src: 'Direct', pct: 14, color: '#FF8C00' },
          ].map((s, i) => (
            <div key={s.src} className="flex items-center gap-2 mb-1">
              <div className="dg-grow-x h-1.5 rounded-full" style={{ ...dg(i, 380, { '--dg-dur': '800ms' }), width: `${s.pct}px`, background: s.color }} />
              <span className="text-[8px] text-zinc-400">{s.src} <DgCount to={s.pct} i={i} at={380} dur={1000} />%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Lighthouse scores : les anneaux se tracent pendant que la note défile */}
      <div className="dg-float hidden lg:block absolute -left-3 bottom-16 -rotate-2" style={{ '--dg-loop-at': '-3s' } as React.CSSProperties}>
        <div
          className="dg-pop dg-tip-host rounded-lg p-2.5 grid grid-cols-3 gap-2 cursor-help"
          tabIndex={0}
          aria-describedby="seo-hero-lh-tip"
          style={{ ...dg(0, 1200, { '--dg-origin': 'left bottom' }), background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          {[
            { label: 'Perf', score: 99 },
            { label: 'SEO', score: 98 },
            { label: 'A11y', score: 100 },
          ].map((s, i) => (
            <div key={s.label} className="text-center">
              <div className="relative w-8 h-8 mx-auto flex items-center justify-center">
                <svg className="absolute inset-0 text-green-400/60" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle className="dg-draw" pathLength={1} style={dg(i, 1300, { '--dg-step': '110ms' })} cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" transform="rotate(-90 16 16)" />
                </svg>
                <span className="relative text-[9px] font-bold text-green-400"><DgCount to={s.score} i={i} at={1300} dur={1000} align="center" style={{ '--dg-step': '110ms' } as React.CSSProperties} /></span>
              </div>
              <span className="text-[7px] text-zinc-500 mt-0.5 block">{s.label}</span>
            </div>
          ))}
          <DgTip id="seo-hero-lh-tip">Notes Lighthouse de Google sur 100 : performance, SEO et accessibilité (A11y). Valeurs d&apos;exemple.</DgTip>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: 'Mensuel', l: 'Rapport de positions', c: '#4ade80' },
          { v: 'Page 1', l: 'Objectif local', c: V },
          { v: 'GEO Ready', l: 'IA + Google', c: '#FF8C00' },
        ].map((s, i) => (
          <div
            key={s.l}
            className="dg-rise text-center py-3 rounded-[10px]"
            style={{ ...dg(i, 1100), background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-lg font-bold" style={{ color: s.c }}>{s.v}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
    </DiagramMotion>
  )
}
