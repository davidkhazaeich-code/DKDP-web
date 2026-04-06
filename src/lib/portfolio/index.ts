export type { SectorKey, PortfolioScreenshot, PortfolioProject } from './types'
export { PORTFOLIO_SECTORS } from './types'

import type { PortfolioProject, SectorKey } from './types'

import leComptoirDuLac from './le-comptoir-du-lac'
import hotelBeauRivage from './hotel-beau-rivage'
import drMoreauCabinet from './dr-moreau-cabinet'
import eclatDeSoi from './eclat-de-soi'
import etudeFontaine from './etude-fontaine'
import laMieDoree from './la-mie-doree'
import autoprecision from './autoprecision'
import nexflowAnalytics from './nexflow-analytics'
import atelierCapillaire from './atelier-capillaire'
import regieDuLeman from './regie-du-leman'

export const PROJECTS: PortfolioProject[] = [
  leComptoirDuLac,
  hotelBeauRivage,
  drMoreauCabinet,
  eclatDeSoi,
  etudeFontaine,
  laMieDoree,
  autoprecision,
  nexflowAnalytics,
  atelierCapillaire,
  regieDuLeman,
]

export function getProject(slug: string): PortfolioProject | undefined {
  return PROJECTS.find(p => p.slug === slug)
}

export function getProjectsBySector(sector: SectorKey): PortfolioProject[] {
  return PROJECTS.filter(p => p.sector === sector)
}
