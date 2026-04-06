import type { PortfolioProject } from './types'

const project: PortfolioProject = {
  slug: 'atelier-capillaire',
  name: 'Atelier Capillaire',
  sector: 'sante',
  description: 'Salon de coiffure haut de gamme aux Eaux-Vives, specialise en colorations naturelles et coupes creatives.',
  brief: 'L\'Atelier Capillaire voulait un site qui reflete son positionnement premium et sa creativite. Le design devait etre moderne et sophistique, avec un accent sur le portfolio de coiffures et l\'ambiance chic du salon.',
  designChoices: [
    'Noir et dore pour le luxe et la sophistication',
    'Typographie Outfit (geometric sans) pour la modernite',
    'Galerie de coiffures en format portrait vertical',
    'Animations smooth et transitions elegantes',
    'Photos lifestyle du salon et de l\'equipe styliste',
  ],
  features: [
    'Hero avec video d\'ambiance du salon',
    'Portfolio de creations capillaires',
    'Carte des prestations avec tarifs',
    'Presentation de l\'equipe de coiffeurs',
    'Avis clients avec notes',
    'Reservation en ligne et adresse',
  ],
  liveUrl: 'https://dkdp-atelier-capillaire.vercel.app',
  heroScreenshot: {
    src: '/images/portfolio/atelier-capillaire/hero.webp',
    alt: 'Site web Atelier Capillaire salon coiffure Geneve',
  },
  screenshots: [
    { src: '/images/portfolio/atelier-capillaire/desktop.webp', alt: 'Vue desktop Atelier Capillaire' },
    { src: '/images/portfolio/atelier-capillaire/mobile.webp', alt: 'Vue mobile Atelier Capillaire' },
  ],
  colors: { primary: '#1C1917', secondary: '#C9A84C', accent: '#FAFAF9' },
  typography: { heading: 'Outfit', body: 'Space Grotesk' },
  techStack: ['Astro 5', 'Tailwind CSS 4', 'View Transitions', 'Pexels Media'],
}

export default project
