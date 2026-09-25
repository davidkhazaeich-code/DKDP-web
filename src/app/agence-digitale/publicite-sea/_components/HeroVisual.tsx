import { violet } from '@/lib/tokens'
import { PRIX, chf } from '@/data/pricing'

const V = violet.color
const VD = violet.border

// 25/09/2026 : tableau de bord fictif retiré (budget « CHF 2,400 », revenu
// « CHF 19,680 », « ROAS 8.2x », clics, CPC et coût par conversion du jour,
// entonnoir chiffré, scores Lighthouse 99/98/100, « -22 % » de CPC), aucune
// source. La maquette montre les faits de l'offre (PRIX) et les contrôles
// hebdomadaires décrits sur la page.
export function HeroVisual() {
  return (
    <div className="relative flex flex-col gap-4">
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
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-400/10 text-green-400">ACCÈS COMPLET</span>
        </div>

        <div className="p-5 space-y-5">
          {/* Budget et frais */}
          <div className="flex items-start gap-5">
            <div className="flex-1">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Budget média</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">dès {chf(PRIX.adsBudgetMin)}</span>
                <span className="text-[10px] text-zinc-500">/ mois</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full w-full" style={{ background: 'linear-gradient(90deg, #7C3AED, #A78BFA)' }} />
              </div>
              <p className="text-[9px] text-zinc-500 mt-1">Versé à Google, sans commission</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Gestion DKDP</p>
              <p className="text-2xl font-bold text-green-400">dès {chf(PRIX.adsManagementFrom)}</p>
              <p className="text-[9px] text-green-400 font-bold">par mois</p>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Contrôles hebdomadaires */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Termes', value: 'Relus', note: 'chaque semaine' },
              { label: 'Enchères', value: 'Ajustées', note: 'chaque semaine' },
              { label: 'Annonces', value: 'Testées', note: 'en A/B' },
              { label: 'Conversions', value: 'Suivies', note: 'dès le départ' },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-[8px] text-zinc-600 uppercase">{m.label}</p>
                <p className="text-sm font-bold text-white">{m.value}</p>
                <p className="text-[9px] font-bold text-green-400">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating conversion funnel (étapes suivies, sans chiffres) */}
      <div className="absolute -right-2 top-8 rotate-1 hidden lg:block">
        <div
          className="rounded-lg p-3"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-2">Entonnoir suivi</p>
          {[
            { step: 'Visibilité', w: '100%' },
            { step: 'Clics qualifiés', w: '60%' },
            { step: 'Leads', w: '25%' },
          ].map((f) => (
            <div key={f.step} className="flex items-center gap-2 mb-1">
              <div className="h-3 rounded-sm" style={{ width: f.w, minWidth: '20px', background: 'linear-gradient(90deg, rgba(124,58,237,0.4), rgba(124,58,237,0.15))' }} />
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
