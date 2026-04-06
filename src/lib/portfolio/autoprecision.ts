import type { PortfolioProject } from './types'

const project: PortfolioProject = {
  slug: 'autoprecision',
  name: 'AutoPrecision Geneve',
  sector: 'artisanat',
  description: 'Garage automobile specialise en entretien, reparation et preparation de vehicules haut de gamme a Geneve.',
  brief: 'AutoPrecision voulait un site qui reflete la precision et le serieux de son travail mecanique, tout en attirant une clientele exigeante. Le design devait etre bold et masculin, avec un accent sur l\'expertise technique et les vehicules de prestige.',
  designChoices: [
    'Fond noir intense avec rouge vif pour l\'energie industrielle',
    'Typographie Bebas Neue (condensed) pour l\'impact visuel',
    'Photos de vehicules et d\'atelier en haute qualite',
    'Transitions bold et animations de compteurs',
    'Layout en blocs larges avec beaucoup de contraste',
  ],
  features: [
    'Hero avec photo d\'atelier et vehicule de luxe',
    'Services avec grille de prestations et tarifs',
    'Compteurs animes (vehicules traites, annees d\'experience)',
    'Galerie de realisations avant/apres',
    'Temoignages de proprietaires de vehicules',
    'Prise de rendez-vous et localisation',
  ],
  liveUrl: 'https://dkdp-autoprecision.vercel.app',
  heroScreenshot: {
    src: '/images/portfolio/autoprecision/hero.webp',
    alt: 'Site web AutoPrecision garage automobile Geneve',
  },
  screenshots: [
    { src: '/images/portfolio/autoprecision/desktop.webp', alt: 'Vue desktop AutoPrecision' },
    { src: '/images/portfolio/autoprecision/mobile.webp', alt: 'Vue mobile AutoPrecision' },
  ],
  colors: { primary: '#ef4444', secondary: '#374151', accent: '#F9FAFB' },
  typography: { heading: 'Bebas Neue', body: 'Roboto' },
  techStack: ['Astro 5', 'Tailwind CSS 4', 'Intersection Observer', 'Pexels Media'],
}

export default project
