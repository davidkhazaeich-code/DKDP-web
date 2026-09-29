import { violet } from '@/lib/tokens'
import { PRIX, chf } from '@/data/pricing'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { dg } from '@/components/motion/dg'

const V = violet.color
const VD = violet.border

const TYPE_AT = 650
const TYPE_STAGGER = 170
const MS_PER_CHAR = 22

// Frappe d'une ligne du code (dg-type) : la ligne prend la largeur de son texte (w-fit, rendu
// identique) pour qu'un pas découvre un caractère ; l'indentation pl-3 compte pour deux caractères.
function typing(at: number, steps: number): React.CSSProperties {
  return dg(0, at, { '--dg-steps': steps, '--dg-dur': `${steps * MS_PER_CHAR}ms` })
}

// 25/09/2026 : chargement « < 1.5s », code « speed: 0.8s, seo: 100/100 » et
// scores PageSpeed 99, SEO 98, lisibilité 100 et « A+ » retirés, aucune source.
// Les badges gardent leur libellé avec une coche, la mini-stat donne le prix (PRIX).
// 29/09/2026 : le site se construit sous les yeux (kit dg-*, docs/claude/22-diagrammes-animes.md) :
// barre d'adresse, navigation, titre, texte, bouton puis cartes ; le code se tape ligne à ligne,
// les badges se cochent. Au repos, rendu identique.
export function HeroVisual({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = lang === 'en'
    ? {
        cwv: 'Core Web Vitals green', seoSub: 'Fundamentals built in',
        readability: 'Readability', accessibility: 'Accessibility built in',
        codeDesign: 'custom', codeSeo: 'built-in',
        cards: [{ accent: '#A78BFA', label: 'Performance' }, { accent: '#FF8C00', label: 'SEO' }, { accent: '#4ade80', label: 'Responsive' }],
        stats: [{ v: 'Next.js', l: 'Framework', c: V }, { v: chf(PRIX.siteFrom), l: 'Starting price', c: '#4ade80' }, { v: '100%', l: 'Responsive', c: '#FF8C00' }],
      }
    : {
        cwv: 'Core Web Vitals vert', seoSub: 'Fondamentaux intégrés',
        readability: 'Lisibilité', accessibility: 'Accessibilité soignée',
        codeDesign: 'sur mesure', codeSeo: 'intégré',
        cards: [{ accent: '#A78BFA', label: 'Performance' }, { accent: '#FF8C00', label: 'SEO' }, { accent: '#4ade80', label: 'Responsive' }],
        stats: [{ v: 'Next.js', l: 'Framework', c: V }, { v: chf(PRIX.siteFrom), l: 'Prix de départ', c: '#4ade80' }, { v: '100%', l: 'Responsive', c: '#FF8C00' }],
      }
  // Nombre de pas de chaque ligne du code (caractères, + 2 pour l'indentation pl-3).
  const typeSteps = [
    'const site = {'.length,
    `design: '${t.codeDesign}',`.length + 2,
    `seo: '${t.codeSeo}',`.length + 2,
    "stack: 'Next.js'".length + 2,
  ]
  // L'accolade fermante se tape quand la dernière propriété est finie.
  const closeAt = TYPE_AT + 3 * TYPE_STAGGER + typeSteps[3] * MS_PER_CHAR
  return (
    <DiagramMotion mode="hero" className="relative flex flex-col gap-4" style={{ '--dg-loop-start': '2.7s' } as React.CSSProperties}>
      {/* Browser mockup */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        {/* Browser bar : les pastilles s'allument, l'adresse se déroule */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="dg-pop w-2.5 h-2.5 rounded-full bg-red-500/60" style={dg(0, 60)} />
          <div className="dg-pop w-2.5 h-2.5 rounded-full bg-yellow-500/60" style={dg(0, 120)} />
          <div className="dg-pop w-2.5 h-2.5 rounded-full bg-green-500/60" style={dg(0, 180)} />
          <div className="dg-wipe flex-1 mx-3 h-6 rounded-md bg-white/5 flex items-center px-3" style={dg(0, 150, { '--dg-dur': '600ms' })}>
            <span className="text-[10px] text-zinc-500 font-mono">https://votre-entreprise.ch</span>
          </div>
        </div>

        {/* Website content mockup : la page se construit de haut en bas */}
        <div className="p-5 space-y-4">
          {/* Nav skeleton */}
          <div className="flex items-center justify-between">
            <div className="dg-grow-x w-20 h-5 rounded bg-white/10" style={dg(0, 300)} />
            <div className="flex gap-3">
              <div className="dg-grow-x w-12 h-3 rounded bg-white/5" style={dg(0, 380)} />
              <div className="dg-grow-x w-12 h-3 rounded bg-white/5" style={dg(0, 440)} />
              <div className="dg-grow-x w-12 h-3 rounded bg-white/5" style={dg(0, 500)} />
              <div className="dg-pop w-16 h-5 rounded-md" style={{ ...dg(0, 560), background: 'rgba(124,58,237,0.35)' }} />
            </div>
          </div>

          {/* Hero section skeleton */}
          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="space-y-3">
              <div className="dg-pop w-14 h-4 rounded-full" style={{ ...dg(0, 520, { '--dg-origin': 'left center' }), background: 'rgba(124,58,237,0.2)', border: `1px solid ${VD}` }} />
              <div className="space-y-1.5">
                <div className="dg-grow-x w-full h-4 rounded bg-white/12" style={dg(0, 600, { '--dg-dur': '700ms' })} />
                <div className="dg-grow-x w-4/5 h-4 rounded bg-white/12" style={dg(0, 710, { '--dg-dur': '700ms' })} />
                <div className="dg-wipe w-3/5 h-4 rounded" style={{ ...dg(0, 820, { '--dg-dur': '700ms' }), background: 'linear-gradient(90deg, rgba(124,58,237,0.3), rgba(167,139,250,0.2))' }} />
              </div>
              <div className="space-y-1">
                <div className="dg-grow-x w-full h-2 rounded bg-white/5" style={dg(0, 900)} />
                <div className="dg-grow-x w-5/6 h-2 rounded bg-white/5" style={dg(0, 980)} />
              </div>
              <div className="dg-pop w-24 h-7 rounded-lg" style={{ ...dg(0, 1080, { '--dg-origin': 'left center' }), background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }} />
            </div>
            <div className="dg-fade rounded-lg overflow-hidden" style={{ ...dg(0, 700), background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(255,107,0,0.08))' }}>
              <div className="w-full h-full min-h-[120px] flex items-center justify-center">
                <div className="dg-pop w-16 h-16 rounded-xl border border-white/10 flex items-center justify-center" style={dg(0, 1000)}>
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
            {t.cards.map((c, i) => (
              <div
                key={c.label}
                className="dg-rise rounded-lg p-3"
                style={{ ...dg(i, 1150, { '--dg-step': '100ms' }), background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
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

      {/* Floating code snippet : la carte se pose, le code se tape ligne à ligne */}
      <div className="dg-float hidden lg:block absolute -right-3 top-16 rotate-2">
        <div
          className="dg-pop rounded-lg p-3 font-mono text-[10px] leading-relaxed"
          style={{ ...dg(0, 500, { '--dg-origin': 'right top' }), background: 'rgba(0,0,0,0.85)', border: `1px solid ${VD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <p className="dg-type w-fit" style={typing(TYPE_AT, typeSteps[0])}><span className="text-violet-400">const</span> <span className="text-zinc-300">site</span> <span className="text-violet-400">=</span> {'{'}</p>
          <p className="dg-type w-fit pl-3" style={typing(TYPE_AT + TYPE_STAGGER, typeSteps[1])}><span className="text-zinc-500">design:</span> <span className="text-green-400">&apos;{t.codeDesign}&apos;</span>,</p>
          <p className="dg-type w-fit pl-3" style={typing(TYPE_AT + 2 * TYPE_STAGGER, typeSteps[2])}><span className="text-zinc-500">seo:</span> <span className="text-green-400">&apos;{t.codeSeo}&apos;</span>,</p>
          <p className="dg-type w-fit pl-3" style={typing(TYPE_AT + 3 * TYPE_STAGGER, typeSteps[3])}><span className="text-zinc-500">stack:</span> <span className="text-orange-400">&apos;Next.js&apos;</span></p>
          <p className="dg-type w-fit" style={typing(closeAt, 1)}>{'}'}</p>
        </div>
      </div>

      {/* Floating badges stack : chaque badge se pose, son anneau se trace, la coche apparaît */}
      <div className="dg-float hidden lg:flex absolute -left-4 top-8 flex-col gap-2.5" style={{ '--dg-loop-at': '-2s' } as React.CSSProperties}>
        {/* PageSpeed */}
        <div className="-rotate-3">
          <div
            className="dg-pop rounded-lg px-3 py-2 flex items-center gap-2"
            style={{ ...dg(0, 800, { '--dg-origin': 'left center' }), background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="absolute inset-0 text-green-400/60" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle className="dg-draw" pathLength={1} style={dg(0, 900)} cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" transform="rotate(-90 16 16)" />
              </svg>
              <span className="dg-pop relative text-[10px] font-bold text-green-400" style={dg(0, 1000, { '--dg-origin': 'center' })} aria-hidden="true">✓</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-white">PageSpeed</p>
              <p className="text-[8px] text-zinc-500">{t.cwv}</p>
            </div>
          </div>
        </div>
        {/* SEO */}
        <div className="-rotate-2">
          <div
            className="dg-pop rounded-lg px-3 py-2 flex items-center gap-2"
            style={{ ...dg(0, 950, { '--dg-origin': 'left center' }), background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="absolute inset-0 text-green-400/60" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle className="dg-draw" pathLength={1} style={dg(0, 1050)} cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" transform="rotate(-90 16 16)" />
              </svg>
              <span className="dg-pop relative text-[10px] font-bold text-green-400" style={dg(0, 1150, { '--dg-origin': 'center' })} aria-hidden="true">✓</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-white">SEO</p>
              <p className="text-[8px] text-zinc-500">{t.seoSub}</p>
            </div>
          </div>
        </div>
        {/* Lisibilité */}
        <div className="-rotate-1">
          <div
            className="dg-pop rounded-lg px-3 py-2 flex items-center gap-2"
            style={{ ...dg(0, 1100, { '--dg-origin': 'left center' }), background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="absolute inset-0 text-green-400/60" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle className="dg-draw" pathLength={1} style={dg(0, 1200)} cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" transform="rotate(-90 16 16)" />
              </svg>
              <span className="dg-pop relative text-[10px] font-bold text-green-400" style={dg(0, 1300, { '--dg-origin': 'center' })} aria-hidden="true">✓</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-white">{t.readability}</p>
              <p className="text-[8px] text-zinc-500">{t.accessibility}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {t.stats.map((s, i) => (
          <div
            key={s.l}
            className="dg-rise text-center py-3 rounded-[10px]"
            style={{ ...dg(i, 1350), background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-lg font-bold" style={{ color: s.c }}>{s.v}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
    </DiagramMotion>
  )
}
