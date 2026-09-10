import { Check, Minus } from 'lucide-react'
import { green, violet } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

/**
 * Qui voit les annonces dans ChatGPT, forfait par forfait. Source : centre
 * d'aide OpenAI « Ads in ChatGPT » et « The Basics », relus le 10.09.2026.
 * C'est l'argument le plus concret de la page pour décider si le canal vaut
 * un pilote : une offre grand public parle à Free et Go, un décideur B2B est
 * souvent sur un forfait payant, donc hors de portée.
 */

type Row = { plan: string; price: string; shows: boolean; note: string }

const ROWS: Record<Locale, Row[]> = {
  fr: [
    { plan: 'Free', price: 'Gratuit', shows: true, note: 'Sauf si l\'utilisateur choisit l\'option « sans publicité », qui réduit ses limites d\'usage.' },
    { plan: 'Go', price: '8 USD par mois', shows: true, note: 'Forfait d\'entrée payant, avec annonces.' },
    { plan: 'Plus', price: 'CHF 20 par mois', shows: false, note: 'Aucune annonce.' },
    { plan: 'Pro', price: '100 ou 200 USD par mois', shows: false, note: 'Aucune annonce.' },
    { plan: 'Business, Enterprise, Edu', price: 'Par siège ou sur devis', shows: false, note: 'Aucune annonce : la plupart des équipes en entreprise n\'en verront jamais.' },
    { plan: 'Moins de 18 ans, chats temporaires, navigateur Atlas', price: '', shows: false, note: 'Exclus quel que soit le forfait.' },
  ],
  en: [
    { plan: 'Free', price: 'Free', shows: true, note: 'Unless the user picks the "ads-free" option, which lowers their usage limits.' },
    { plan: 'Go', price: '8 USD per month', shows: true, note: 'Entry-level paid plan, with ads.' },
    { plan: 'Plus', price: 'CHF 20 per month', shows: false, note: 'No ads.' },
    { plan: 'Pro', price: '100 or 200 USD per month', shows: false, note: 'No ads.' },
    { plan: 'Business, Enterprise, Edu', price: 'Per seat or on quote', shows: false, note: 'No ads: most teams inside companies will never see one.' },
    { plan: 'Under 18, temporary chats, Atlas browser', price: '', shows: false, note: 'Excluded whatever the plan.' },
  ],
}

const HEAD: Record<Locale, { plan: string; ads: string; yes: string; no: string; caption: string }> = {
  fr: { plan: 'Forfait', ads: 'Annonces ?', yes: 'Oui', no: 'Jamais', caption: 'État au 10 septembre 2026, selon les pages officielles d\'OpenAI. Les prix des forfaits sont ceux affichés par OpenAI, en dollars sauf Plus facturé CHF 20 en Suisse.' },
  en: { plan: 'Plan', ads: 'Ads?', yes: 'Yes', no: 'Never', caption: 'As of 10 September 2026, from OpenAI\'s official pages. Plan prices are OpenAI\'s, in dollars except Plus billed CHF 20 in Switzerland.' },
}

export function PlanVisibilityGrid({ lang = 'fr' }: { lang?: Locale }) {
  const rows = ROWS[lang]
  const h = HEAD[lang]
  return (
    <div className="rounded-[16px] border border-border overflow-hidden bg-bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="text-left px-4 md:px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-text-muted">{h.plan}</th>
            <th scope="col" className="text-left px-4 md:px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-text-muted w-[120px]">{h.ads}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.plan} className="border-b border-border last:border-b-0 align-top">
              <td className="px-4 md:px-5 py-4">
                <p className="text-text font-semibold leading-snug">{r.plan}</p>
                {r.price && <p className="text-text-muted text-xs mt-0.5">{r.price}</p>}
                <p className="text-text-secondary text-xs leading-relaxed mt-1.5">{r.note}</p>
              </td>
              <td className="px-4 md:px-5 py-4">
                {r.shows ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: green.bg, color: green.color, border: `1px solid ${green.border}` }}
                  >
                    <Check size={12} aria-hidden="true" /> {h.yes}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border border-border text-text-muted">
                    <Minus size={12} aria-hidden="true" /> {h.no}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 md:px-5 py-3 text-[11px] text-text-muted border-t border-border" style={{ background: violet.bg }}>
        {h.caption}
      </p>
    </div>
  )
}
