import { violet } from '@/lib/tokens'
import { PRIX, chf, chfMois } from '@/data/pricing'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { dg } from '@/components/motion/dg'

const V = violet.color
const VD = violet.border

// 25/09/2026 : « 100+ sites », « Top 3 Google », « ROAS 8.2x », la « performance
// client type » (trafic 1.2K → 8.4K, leads 12 → 89, conversion 1.2 % → 4.8 %)
// et la note « 4.9 » n'avaient aucune source. La maquette montre désormais les
// prix d'entrée (PRIX), les indicateurs suivis chaque mois et la fiche Google.
// 29/09/2026 : la vue d'ensemble s'ouvre (kit dg-*, docs/claude/22-diagrammes-animes.md) :
// les services et leurs prix d'entrée, puis les indicateurs suivis, dont le point vert bat en
// continu comme un suivi en direct. Au repos, rendu identique.
export function HeroVisual({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = lang === 'en'
    ? {
        header: 'DKDP · Digital Agency Geneva',
        services: [
          { icon: '&#9678;', name: 'Web design', kpi: `from ${chf(PRIX.siteFrom)}`, color: V },
          { icon: '&#9650;', name: 'SEO / GEO', kpi: `${chf(PRIX.seoMonthly)}/mo`, color: '#4ade80' },
          { icon: '&#9670;', name: 'Google Ads', kpi: `from ${chf(PRIX.adsManagementFrom)}/mo`, color: '#FF8C00' },
          { icon: '&#9733;', name: 'Social media', kpi: `from ${chf(PRIX.socialFrom)}/mo`, color: '#60a5fa' },
        ],
        perfLabel: 'What we track every month',
        metrics: ['Organic traffic', 'Inbound leads', 'Conversion rate'],
        tracked: 'Tracked',
        rating: '5.0', ratingLabel: 'Google rating', ratingSub: '22 reviews',
        stats: [
          { v: '48h', l: 'Fixed quote', c: V },
          { v: '10+ yrs', l: 'Of experience', c: '#4ade80' },
          { v: 'Geneva', l: 'Local base', c: '#FF8C00' },
        ],
      }
    : {
        header: 'DKDP · Agence Digitale Genève',
        services: [
          { icon: '&#9678;', name: 'Création web', kpi: `dès ${chf(PRIX.siteFrom)}`, color: V },
          { icon: '&#9650;', name: 'SEO / GEO', kpi: chfMois(PRIX.seoMonthly), color: '#4ade80' },
          { icon: '&#9670;', name: 'Google Ads', kpi: `dès ${chfMois(PRIX.adsManagementFrom)}`, color: '#FF8C00' },
          { icon: '&#9733;', name: 'Réseaux sociaux', kpi: `dès ${chfMois(PRIX.socialFrom)}`, color: '#60a5fa' },
        ],
        perfLabel: 'Ce que nous suivons chaque mois',
        metrics: ['Trafic organique', 'Leads entrants', 'Taux de conversion'],
        tracked: 'Suivi',
        rating: '5,0', ratingLabel: 'Note Google', ratingSub: '22 avis',
        stats: [
          { v: '48h', l: 'Devis fixe', c: V },
          { v: '2019', l: 'Fondée à Genève', c: '#4ade80' },
          { v: 'Genève', l: 'Base locale', c: '#FF8C00' },
        ],
      }
  return (
    <DiagramMotion mode="hero" className="relative flex flex-col gap-4" style={{ '--dg-loop-start': '2.2s' } as React.CSSProperties}>
      {/* Services overview */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="dg-pop w-2.5 h-2.5 rounded-full bg-red-500/60" style={dg(0, 60)} />
          <div className="dg-pop w-2.5 h-2.5 rounded-full bg-yellow-500/60" style={dg(0, 120)} />
          <div className="dg-pop w-2.5 h-2.5 rounded-full bg-green-500/60" style={dg(0, 180)} />
          <span className="dg-fade text-[10px] text-zinc-500 font-mono ml-2" style={dg(0, 200)}>{t.header}</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Service cards grid : chaque carte arrive, puis son prix d'entrée */}
          <div className="grid grid-cols-2 gap-2.5" style={{ '--dg-step': '100ms' } as React.CSSProperties}>
            {t.services.map((s, i) => (
              <div
                key={s.name}
                className="dg-rise rounded-lg p-3"
                style={{ ...dg(i, 250), background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs" style={{ color: s.color }} dangerouslySetInnerHTML={{ __html: s.icon }} />
                  <span className="text-[11px] text-zinc-300 font-medium">{s.name}</span>
                </div>
                <p className="dg-pop text-sm font-bold" style={{ ...dg(i, 450, { '--dg-origin': 'left center' }), color: s.color }}>{s.kpi}</p>
              </div>
            ))}
          </div>

          {/* Indicateurs suivis (25/09/2026 : plus de chiffres avant/après ni de barres de progression).
              29/09/2026 : les lignes glissent, « Suivi » se pose, le point vert bat en boucle. */}
          <div>
            <span className="dg-fade text-[10px] font-bold uppercase tracking-widest text-zinc-500" style={dg(0, 700)}>{t.perfLabel}</span>
            <div className="mt-2" style={{ '--dg-step': '110ms' } as React.CSSProperties}>
              {t.metrics.map((m, i) => (
                <div key={m} className="dg-slide flex items-center justify-between text-[10px] py-1.5 border-b border-white/5 last:border-b-0" style={dg(i, 780)}>
                  <span className="text-zinc-400">{m}</span>
                  <span className="dg-pop flex items-center gap-1.5 font-bold text-green-400" style={dg(i, 900, { '--dg-origin': 'right center' })}>
                    <span className="dg-ping relative w-1.5 h-1.5 rounded-full bg-green-400" style={{ '--dg-loop-at': `${i * 400}ms` } as React.CSSProperties} aria-hidden="true" />
                    {t.tracked}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge : la note se pose, son anneau se trace */}
      <div className="dg-float absolute -right-3 top-12 rotate-2 hidden lg:block">
        <div
          className="dg-pop rounded-lg px-3 py-2 flex items-center gap-2"
          style={{ ...dg(0, 600, { '--dg-origin': 'right top' }), background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg className="absolute inset-0 text-green-400/60" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle className="dg-draw" pathLength={1} style={dg(0, 750)} cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" transform="rotate(-90 16 16)" />
            </svg>
            <span className="dg-pop relative text-[10px] font-bold text-green-400" style={dg(0, 800, { '--dg-origin': 'center' })}>{t.rating}</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">{t.ratingLabel}</p>
            <p className="text-[8px] text-zinc-500">{t.ratingSub}</p>
          </div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {t.stats.map((s, i) => (
          <div
            key={s.l}
            className="dg-rise text-center py-3 rounded-[10px]"
            style={{ ...dg(i, 1150), background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-lg font-bold" style={{ color: s.c }}>{s.v}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
    </DiagramMotion>
  )
}
