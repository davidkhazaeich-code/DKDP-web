import type { PortfolioProject } from './types'

const project: PortfolioProject = {
  slug: 'regie-du-leman',
  name: 'Regie du Leman',
  sector: 'tech',
  description: 'Regie immobiliere de prestige a Geneve, specialisee dans les biens d\'exception et la gestion locative haut de gamme.',
  brief: 'La Regie du Leman cherchait un site qui mette en valeur ses biens d\'exception avec des visuels grand format et une navigation premium. Le design devait respirer le luxe immobilier et faciliter la decouverte des proprietes disponibles.',
  designChoices: [
    'Style editorial premium avec grands visuels photographiques',
    'Noir et or pour le luxe immobilier genevois',
    'Typographie Libre Baskerville (serif elegant) pour les titres',
    'Slider plein ecran pour les biens en vedette',
    'Animations reveal au scroll, progression douce',
  ],
  features: [
    'Hero avec slider de biens d\'exception',
    'Catalogue de proprietes avec filtres',
    'Fiches detaillees avec galerie photo',
    'Estimation en ligne (decoratif)',
    'Presentation de l\'equipe et expertise',
    'Contact et localisation du bureau',
  ],
  liveUrl: 'https://dkdp-regie-du-leman.vercel.app',
  heroScreenshot: {
    src: '/images/portfolio/regie-du-leman/hero.webp',
    alt: 'Site web Regie du Leman immobilier prestige Geneve',
  },
  screenshots: [
    { src: '/images/portfolio/regie-du-leman/desktop.webp', alt: 'Vue desktop Regie du Leman' },
    { src: '/images/portfolio/regie-du-leman/mobile.webp', alt: 'Vue mobile Regie du Leman' },
  ],
  colors: { primary: '#1C1917', secondary: '#C9A84C', accent: '#FAFAF9' },
  typography: { heading: 'Libre Baskerville', body: 'Poppins' },
  techStack: ['Astro 5', 'Tailwind CSS 4', 'Image Slider', 'Pexels Media'],
}

export default project
