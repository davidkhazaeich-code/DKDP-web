import { describe, it, expect } from 'vitest'
import { estimateCampaign } from '../estimate'

/**
 * Le simulateur de budget de la page /agence-digitale/chatgpt-ads repose sur
 * cette fonction pure. Les bornes viennent de la recommandation OpenAI
 * (CPC de départ de 3 à 5 USD) convertie en CHF par l'utilisateur lui-même
 * via les curseurs : la fonction ne connaît aucun taux de change.
 */
describe('estimateCampaign', () => {
  it('borne les clics par le CPC haut et le CPC bas', () => {
    const r = estimateCampaign({ budgetChf: 1000, cpcLowChf: 2.5, cpcHighChf: 4, conversionRate: 0.03 })
    expect(r.clicksLow).toBe(250)
    expect(r.clicksHigh).toBe(400)
  })

  it('déduit les contacts et le coût par contact', () => {
    const r = estimateCampaign({ budgetChf: 1000, cpcLowChf: 2.5, cpcHighChf: 4, conversionRate: 0.03 })
    expect(r.leadsLow).toBe(7)
    expect(r.leadsHigh).toBe(12)
    expect(r.costPerLeadLow).toBe(83)
    expect(r.costPerLeadHigh).toBe(143)
  })

  it('rend des zéros sans planter quand le budget est nul ou négatif', () => {
    const zero = { clicksLow: 0, clicksHigh: 0, leadsLow: 0, leadsHigh: 0, costPerLeadLow: 0, costPerLeadHigh: 0 }
    expect(estimateCampaign({ budgetChf: 0, cpcLowChf: 2.5, cpcHighChf: 4, conversionRate: 0.03 })).toEqual(zero)
    expect(estimateCampaign({ budgetChf: -50, cpcLowChf: 2.5, cpcHighChf: 4, conversionRate: 0.03 })).toEqual(zero)
  })

  it('ne divise jamais par zéro quand aucun contact ne sort', () => {
    const r = estimateCampaign({ budgetChf: 50, cpcLowChf: 2.5, cpcHighChf: 4, conversionRate: 0.01 })
    expect(r.clicksLow).toBe(12)
    expect(r.leadsLow).toBe(0)
    expect(r.costPerLeadHigh).toBe(0)
  })

  it('tolère des curseurs inversés en remettant les CPC dans l ordre', () => {
    const r = estimateCampaign({ budgetChf: 1000, cpcLowChf: 4, cpcHighChf: 2.5, conversionRate: 0.03 })
    expect(r.clicksLow).toBe(250)
    expect(r.clicksHigh).toBe(400)
  })

  it('refuse un CPC nul ou négatif en rendant des zéros', () => {
    const r = estimateCampaign({ budgetChf: 1000, cpcLowChf: 0, cpcHighChf: 4, conversionRate: 0.03 })
    expect(r.clicksHigh).toBe(0)
    expect(r.clicksLow).toBe(0)
  })
})
