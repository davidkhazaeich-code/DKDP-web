import { violet } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

/**
 * Google Ads face à ChatGPT Ads, critère par critère. Les faits ChatGPT Ads
 * viennent de la fiche du 10.09.2026 ; la colonne Google Ads décrit le canal
 * tel que DKDP le gère sur la page /agence-digitale/publicite-sea.
 *
 * Deux rendus : un tableau à partir de `md`, et une liste de cartes empilées
 * en dessous. Sans ça, la colonne ChatGPT Ads (la plus importante) partait
 * hors écran sur mobile dans un tableau à défilement horizontal.
 */

type Row = { label: string; google: string; chatgpt: string }

const ROWS: Record<Locale, Row[]> = {
  fr: [
    { label: 'Ce qui déclenche l\'annonce', google: 'Des mots-clés tapés dans une barre de recherche.', chatgpt: 'Une conversation : le besoin, le contexte, les contraintes, décrits en phrases.' },
    { label: 'Format', google: 'Annonces texte, Shopping, Display, YouTube, Performance Max.', chatgpt: 'Une carte sponsorisée sous la réponse : nom, favicon, titre, texte, image, lien.' },
    { label: 'Ciblage', google: 'Mots-clés, audiences, ville ou rayon, appareil, horaires.', chatgpt: 'Pays, plateforme, indications de contexte, listes clients dès 25\'000 contacts. Ciblage par ville non garanti en Suisse.' },
    { label: 'Enchères', google: 'CPC, CPA cible, ROAS cible, maximiser les conversions.', chatgpt: 'Reach (CPM), Clicks (CPC), optimisation des conversions. CPC de départ recommandé : 3 à 5 USD.' },
    { label: 'Mesure', google: 'Conversions Google, GA4, appels, import hors ligne.', chatgpt: 'Rapports Ads Manager, OpenAI Pixel, Conversions API, paramètres UTM.' },
    { label: 'Personnalisation en Suisse', google: 'Historique et signaux Google, selon le consentement.', chatgpt: 'Aucune au lancement : seule la conversation en cours compte.' },
    { label: 'Maturité', google: 'Plus de vingt ans, benchmarks par secteur.', chatgpt: 'Sept mois de test, aucun benchmark publié par OpenAI.' },
    { label: 'Quand DKDP le recommande', google: 'La demande exprimée : quelqu\'un cherche déjà votre service.', chatgpt: 'La demande qui se construit : quelqu\'un compare, hésite, explore.' },
  ],
  en: [
    { label: 'What triggers the ad', google: 'Keywords typed into a search bar.', chatgpt: 'A conversation: the need, the context, the constraints, written in sentences.' },
    { label: 'Format', google: 'Text ads, Shopping, Display, YouTube, Performance Max.', chatgpt: 'One sponsored card below the answer: name, favicon, title, copy, image, link.' },
    { label: 'Targeting', google: 'Keywords, audiences, city or radius, device, schedule.', chatgpt: 'Country, platform, context hints, customer lists from 25\'000 contacts. City targeting not guaranteed in Switzerland.' },
    { label: 'Bidding', google: 'CPC, target CPA, target ROAS, maximise conversions.', chatgpt: 'Reach (CPM), Clicks (CPC), conversion optimisation. Recommended starting CPC: 3 to 5 USD.' },
    { label: 'Measurement', google: 'Google conversions, GA4, calls, offline import.', chatgpt: 'Ads Manager reports, OpenAI Pixel, Conversions API, UTM parameters.' },
    { label: 'Personalisation in Switzerland', google: 'Google history and signals, subject to consent.', chatgpt: 'None at launch: only the current conversation counts.' },
    { label: 'Maturity', google: 'Over twenty years, benchmarks per industry.', chatgpt: 'Seven months of testing, no benchmark published by OpenAI.' },
    { label: 'When DKDP recommends it', google: 'Expressed demand: someone is already looking for your service.', chatgpt: 'Demand taking shape: someone compares, hesitates, explores.' },
  ],
}

const HEAD: Record<Locale, { crit: string; google: string; chatgpt: string; foot: string }> = {
  fr: {
    crit: 'Critère',
    google: 'Google Ads',
    chatgpt: 'ChatGPT Ads',
    foot: 'Les deux ensemble, un seul rapport : c\'est la formule Google Ads + ChatGPT Ads, plus bas sur cette page.',
  },
  en: {
    crit: 'Criterion',
    google: 'Google Ads',
    chatgpt: 'ChatGPT Ads',
    foot: 'Both together, one report: that is the Google Ads + ChatGPT Ads plan, further down this page.',
  },
}

export function ChannelComparison({ lang = 'fr' }: { lang?: Locale }) {
  const rows = ROWS[lang]
  const h = HEAD[lang]
  return (
    <div className="rounded-[16px] border border-border bg-bg-card overflow-hidden">
      {/* Tableau (md et plus) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="text-left px-4 md:px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-text-muted w-[26%]">{h.crit}</th>
              <th scope="col" className="text-left px-4 md:px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-text-secondary w-[37%]">{h.google}</th>
              <th scope="col" className="text-left px-4 md:px-5 py-3 text-[11px] font-bold uppercase tracking-widest w-[37%]" style={{ color: violet.color, background: violet.bg }}>{h.chatgpt}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-border last:border-b-0 align-top">
                <th scope="row" className="text-left px-4 md:px-5 py-4 text-text font-semibold leading-snug">{r.label}</th>
                <td className="px-4 md:px-5 py-4 text-text-secondary leading-relaxed">{r.google}</td>
                <td className="px-4 md:px-5 py-4 text-text leading-relaxed" style={{ background: violet.bg }}>{r.chatgpt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cartes empilées (mobile) */}
      <dl className="md:hidden divide-y divide-border m-0">
        {rows.map((r) => (
          <div key={r.label} className="px-4 py-4">
            <dt className="text-text font-semibold text-sm leading-snug mb-2.5">{r.label}</dt>
            <dd className="m-0 mb-2 rounded-[10px] px-3 py-2.5 border border-border">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">{h.google}</span>
              <span className="text-text-secondary text-sm leading-relaxed">{r.google}</span>
            </dd>
            <dd className="m-0 rounded-[10px] px-3 py-2.5" style={{ background: violet.bg, border: `1px solid ${violet.border}` }}>
              <span className="block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: violet.color }}>{h.chatgpt}</span>
              <span className="text-text text-sm leading-relaxed">{r.chatgpt}</span>
            </dd>
          </div>
        ))}
      </dl>

      <p className="px-4 md:px-5 py-3 text-xs text-text-secondary border-t border-border">{h.foot}</p>
    </div>
  )
}
