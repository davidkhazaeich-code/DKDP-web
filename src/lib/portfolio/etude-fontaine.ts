import type { PortfolioProject } from './types'

const project: PortfolioProject = {
  slug: 'etude-fontaine',
  name: 'Etude Fontaine & Associes',
  sector: 'juridique',
  description: 'Cabinet d\'avocats genevois specialise en droit des affaires, droit fiscal et contentieux commercial.',
  brief: 'L\'Etude Fontaine voulait un site qui reflete le serieux et l\'expertise de ses avocats, tout en restant accessible aux clients potentiels. Le design devait inspirer la confiance et le professionnalisme, avec une navigation claire vers les domaines de competence.',
  designChoices: [
    'Dark navy avec accents dores pour le prestige juridique',
    'Typographie EB Garamond (serif classique) pour l\'autorite',
    'Mise en page sobre et structuree, peu d\'effets visuels',
    'Animations minimales, transitions fade-in elegantes',
    'Photos professionnelles de l\'equipe en noir et blanc',
  ],
  features: [
    'Hero sobre avec message de confiance',
    'Domaines de competence avec icones juridiques',
    'Profils des avocats avec parcours et specialites',
    'Section publications et actualites juridiques',
    'Formulaire de premier contact',
    'Adresse et plan d\'acces au cabinet',
  ],
  liveUrl: 'https://dkdp-etude-fontaine.vercel.app',
  heroScreenshot: {
    src: '/images/portfolio/etude-fontaine/hero.webp',
    alt: 'Site web Etude Fontaine cabinet avocats Geneve',
  },
  screenshots: [
    { src: '/images/portfolio/etude-fontaine/desktop.webp', alt: 'Vue desktop Etude Fontaine' },
    { src: '/images/portfolio/etude-fontaine/mobile.webp', alt: 'Vue mobile Etude Fontaine' },
  ],
  colors: { primary: '#1E1B4B', secondary: '#C9A84C', accent: '#E2E8F0' },
  typography: { heading: 'EB Garamond', body: 'Inter' },
  techStack: ['Astro 5', 'Tailwind CSS 4', 'CSS Animations', 'Pexels Media'],
}

export default project
