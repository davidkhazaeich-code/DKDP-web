import type { PortfolioProject } from './types'

const project: PortfolioProject = {
  slug: 'eclat-de-soi',
  name: 'Eclat de Soi',
  sector: 'sante',
  description: 'Spa et centre de bien-etre haut de gamme a Geneve, offrant soins du visage, massages et rituels de beaute.',
  brief: 'Eclat de Soi souhaitait un site qui transporte le visiteur dans un univers de douceur et de serenite. L\'ambiance devait refleter l\'experience sensorielle du spa : apaisante, feminine et luxueuse, avec des visuels immersifs.',
  designChoices: [
    'Palette rose pastel et tons doux pour une ambiance feminine',
    'Fond sombre avec accents rose pour le contraste elegant',
    'Typographie Lora (serif) pour l\'elegance, Nunito Sans pour le confort',
    'Animations douces et fluides, image reveals progressifs',
    'Photos lifestyle avec eclairage tamisé',
  ],
  features: [
    'Hero avec image zen plein ecran',
    'Carte des soins avec prix et descriptions',
    'Galerie avant/apres des traitements',
    'Section rituels signature du spa',
    'Temoignages clients avec photos',
    'Bouton reservation et carte du lieu',
  ],
  liveUrl: 'https://dkdp-eclat-de-soi.vercel.app',
  heroScreenshot: {
    src: '/images/portfolio/eclat-de-soi/hero.webp',
    alt: 'Site web Eclat de Soi spa bien-etre Geneve',
  },
  screenshots: [
    { src: '/images/portfolio/eclat-de-soi/desktop.webp', alt: 'Vue desktop Eclat de Soi' },
    { src: '/images/portfolio/eclat-de-soi/mobile.webp', alt: 'Vue mobile Eclat de Soi' },
  ],
  colors: { primary: '#f472b6', secondary: '#FFF1F2', accent: '#831843' },
  typography: { heading: 'Lora', body: 'Nunito Sans' },
  techStack: ['Astro 5', 'Tailwind CSS 4', 'Smooth Scroll', 'Pexels Media'],
}

export default project
