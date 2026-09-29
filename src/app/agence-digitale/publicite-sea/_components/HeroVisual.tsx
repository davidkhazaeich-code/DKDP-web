import { violet } from '@/lib/tokens'
import { PRIX, chf } from '@/data/pricing'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { dg } from '@/components/motion/dg'

const V = violet.color
const VD = violet.border

// 25/09/2026 : tableau de bord fictif retiré (budget « CHF 2,400 », revenu
// « CHF 19,680 », « ROAS 8.2x », clics, CPC et coût par conversion du jour,
// entonnoir chiffré, scores Lighthouse 99/98/100, « -22 % » de CPC), aucune
// source. La maquette montre les faits de l'offre (PRIX) et les contrôles
// hebdomadaires décrits sur la page.
// 29/09/2026 : le compte s'ouvre sous les yeux (kit dg-*, docs/claude/22-diagrammes-animes.md) :
// le budget se remplit, les frais s'affichent, les contrôles de la semaine se valident un à un,
// l'entonnoir se trace. Au repos, rendu identique.
export function HeroVisual() {
  return (
    <DiagramMotion mode="hero" className="relative flex flex-col gap-4" style={{ '--dg-loop-start': '2.2s' } as React.CSSProperties}>
      {/* Compte Google Ads du client */}
      <div
        className="rounded-[14px] overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-zinc-400 font-mono">Votre compte Google Ads</span>
          </div>
          <span className="dg-pop text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-400/10 text-green-400" style={dg(0, 200, { '--dg-origin': 'right center' })}>ACCÈS COMPLET</span>
        </div>

        <div className="p-5 space-y-5">
          {/* Budget et frais : le budget se remplit, puis les frais de gestion s'affichent */}
          <div className="flex items-start gap-5">
            <div className="flex-1">
              <p className="dg-fade text-[10px] text-zinc-500 uppercase tracking-widest mb-2" style={dg(0, 80)}>Budget média</p>
              <div className="dg-rise flex items-baseline gap-1" style={dg(0, 140)}>
                <span className="text-2xl font-bold text-white">dès {chf(PRIX.adsBudgetMin)}</span>
                <span className="text-[10px] text-zinc-500">/ mois</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="dg-wipe h-full rounded-full w-full" style={{ ...dg(0, 250, { '--dg-dur': '1000ms' }), background: 'linear-gradient(90deg, #7C3AED, #A78BFA)' }} />
              </div>
              <p className="dg-fade text-[9px] text-zinc-500 mt-1" style={dg(0, 700)}>Versé à Google, sans commission</p>
            </div>
            <div className="text-right">
              <p className="dg-fade text-[10px] text-zinc-500 uppercase tracking-widest mb-2" style={dg(0, 150)}>Gestion DKDP</p>
              <p className="dg-pop text-2xl font-bold text-green-400" style={dg(0, 300, { '--dg-origin': 'right center' })}>dès {chf(PRIX.adsManagementFrom)}</p>
              <p className="dg-fade text-[9px] text-green-400 font-bold" style={dg(0, 450)}>par mois</p>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Contrôles hebdomadaires : chaque colonne arrive, puis sa note se valide */}
          <div className="grid grid-cols-4 gap-3" style={{ '--dg-step': '110ms' } as React.CSSProperties}>
            {[
              { label: 'Termes', value: 'Relus', note: 'chaque semaine' },
              { label: 'Enchères', value: 'Ajustées', note: 'chaque semaine' },
              { label: 'Annonces', value: 'Testées', note: 'en A/B' },
              { label: 'Conversions', value: 'Suivies', note: 'dès le départ' },
            ].map((m, i) => (
              <div key={m.label} className="dg-rise" style={dg(i, 500)}>
                <p className="text-[8px] text-zinc-600 uppercase">{m.label}</p>
                <p className="text-sm font-bold text-white">{m.value}</p>
                <p className="dg-pop text-[9px] font-bold text-green-400" style={dg(i, 750, { '--dg-origin': 'left center' })}>{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating conversion funnel (étapes suivies, sans chiffres) : les étapes se tracent.
          La carte couvre le prix de gestion : elle se pose une fois ce prix affiché. */}
      {/* La carte se pose en premier : au repos elle couvre le tarif de gestion (mise en page de
          la prod), le tarif ne doit donc pas apparaître puis disparaître dessous. */}
      <div className="dg-float absolute -right-2 top-8 rotate-1 hidden lg:block">
        <div
          className="dg-pop rounded-lg p-3"
          style={{ ...dg(0, 120, { '--dg-origin': 'right top' }), background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-2">Entonnoir suivi</p>
          {[
            { step: 'Visibilité', w: '100%' },
            { step: 'Clics qualifiés', w: '60%' },
            { step: 'Leads', w: '25%' },
          ].map((f, i) => (
            <div key={f.step} className="flex items-center gap-2 mb-1">
              <div className="dg-grow-x h-3 rounded-sm" style={{ ...dg(i, 250, { '--dg-step': '120ms', '--dg-dur': '800ms', '--dg-origin': 'left center' }), width: f.w, minWidth: '20px', background: 'linear-gradient(90deg, rgba(124,58,237,0.4), rgba(124,58,237,0.15))' }} />
              <span className="text-[8px] text-zinc-400 whitespace-nowrap">{f.step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini stats : engagements de l'offre */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: '48h', l: 'Campagnes actives', c: '#4ade80' },
          { v: 'CHF 0', l: 'Frais cachés', c: V },
          { v: 'Hebdo', l: 'Optimisation', c: '#FF8C00' },
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
