export type SectorKey = 'restauration' | 'sante' | 'juridique' | 'artisanat' | 'tech'

export interface PortfolioScreenshot {
  src: string
  alt: string
  caption?: string
}

export interface PortfolioProject {
  slug: string
  name: string
  sector: SectorKey
  description: string
  brief: string
  designChoices: string[]
  features: string[]
  liveUrl: string
  heroScreenshot: PortfolioScreenshot
  screenshots: PortfolioScreenshot[]
  colors: { primary: string; secondary: string; accent: string }
  typography: { heading: string; body: string }
  techStack: string[]
}

export const PORTFOLIO_SECTORS: Record<SectorKey, { label: string; color: string; bg: string; border: string }> = {
  restauration: {
    label: 'Restauration & Hotellerie',
    color: '#FF8C00',
    bg: 'rgba(255,107,0,0.08)',
    border: 'rgba(255,107,0,0.20)',
  },
  sante: {
    label: 'Sante & Bien-etre',
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.08)',
    border: 'rgba(74,222,128,0.22)',
  },
  juridique: {
    label: 'Services Pro & Juridique',
    color: '#A78BFA',
    bg: 'rgba(124,58,237,0.10)',
    border: 'rgba(124,58,237,0.25)',
  },
  artisanat: {
    label: 'Commerce & Artisanat',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.07)',
    border: 'rgba(251,191,36,0.22)',
  },
  tech: {
    label: 'Tech & Creatif',
    color: '#2dd4bf',
    bg: 'rgba(45,212,191,0.08)',
    border: 'rgba(45,212,191,0.22)',
  },
}
