/**
 * Estimation indicative d'une campagne ChatGPT Ads facturée au clic.
 *
 * Fonction pure, sans taux de change ni benchmark caché : les bornes de CPC
 * viennent des curseurs de l'utilisateur (la page rappelle la recommandation
 * OpenAI de démarrer entre 3 et 5 USD par clic). Le résultat est une
 * fourchette, jamais une promesse : OpenAI ne publie aucun benchmark de
 * performance et le canal a moins d'un an en Suisse.
 */

export type EstimateInput = {
  /** Budget média mensuel, en francs suisses. */
  budgetChf: number
  /** Coût par clic supposé, borne basse, en francs. */
  cpcLowChf: number
  /** Coût par clic supposé, borne haute, en francs. */
  cpcHighChf: number
  /** Part des clics qui deviennent un contact (0.03 = 3 %). */
  conversionRate: number
}

export type EstimateResult = {
  clicksLow: number
  clicksHigh: number
  leadsLow: number
  leadsHigh: number
  /** Coût par contact dans le scénario favorable (beaucoup de contacts). */
  costPerLeadLow: number
  /** Coût par contact dans le scénario défavorable (peu de contacts). */
  costPerLeadHigh: number
}

const ZERO: EstimateResult = {
  clicksLow: 0,
  clicksHigh: 0,
  leadsLow: 0,
  leadsHigh: 0,
  costPerLeadLow: 0,
  costPerLeadHigh: 0,
}

export function estimateCampaign(input: EstimateInput): EstimateResult {
  const budget = Number.isFinite(input.budgetChf) ? input.budgetChf : 0
  const rate = Number.isFinite(input.conversionRate) ? Math.max(0, input.conversionRate) : 0
  const cpcA = Number.isFinite(input.cpcLowChf) ? input.cpcLowChf : 0
  const cpcB = Number.isFinite(input.cpcHighChf) ? input.cpcHighChf : 0
  const cpcLow = Math.min(cpcA, cpcB)
  const cpcHigh = Math.max(cpcA, cpcB)

  if (budget <= 0 || cpcLow <= 0 || cpcHigh <= 0) return ZERO

  // Un CPC élevé achète moins de clics : la borne basse des clics vient du CPC haut.
  const clicksLow = Math.floor(budget / cpcHigh)
  const clicksHigh = Math.floor(budget / cpcLow)
  const leadsLow = Math.floor(clicksLow * rate)
  const leadsHigh = Math.floor(clicksHigh * rate)

  // Plus de contacts pour le même budget = coût par contact plus bas.
  const costPerLeadLow = leadsHigh > 0 ? Math.round(budget / leadsHigh) : 0
  const costPerLeadHigh = leadsLow > 0 ? Math.round(budget / leadsLow) : 0

  return { clicksLow, clicksHigh, leadsLow, leadsHigh, costPerLeadLow, costPerLeadHigh }
}
