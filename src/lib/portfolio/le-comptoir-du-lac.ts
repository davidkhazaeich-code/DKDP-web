import type { PortfolioProject } from './types'

const project: PortfolioProject = {
  slug: 'le-comptoir-du-lac',
  name: 'Le Comptoir du Lac',
  sector: 'restauration',
  description: 'Restaurant gastronomique au bord du lac Leman, cuisine locale et saisonniere dans un cadre elegant.',
  brief: 'Le Comptoir du Lac souhaitait un site a la hauteur de son experience culinaire : chaleureux, raffine, avec une mise en valeur de ses plats et de son cadre unique face au lac. Le chef voulait que le visiteur ressente l\'atmosphere du lieu avant meme d\'y mettre les pieds.',
  designChoices: [
    'Palette chaude et terreuse pour evoquer la cuisine authentique',
    'Typographie Playfair Display pour le prestige, Inter pour la lisibilite',
    'Photos plein ecran des plats et de la terrasse (Pexels)',
    'Animations parallax subtiles sur les images de nourriture',
    'Navigation minimale pour garder le focus sur l\'experience visuelle',
  ],
  features: [
    'Hero video immersif avec vue sur le lac',
    'Menu du jour interactif avec animations',
    'Galerie photo responsive en grille masonry',
    'Section temoignages avec etoiles',
    'Formulaire de reservation (decoratif)',
    'Carte Google Maps integree',
  ],
  liveUrl: 'https://dkdp-le-comptoir-du-lac.vercel.app',
  heroScreenshot: {
    src: '/images/portfolio/le-comptoir-du-lac/hero.webp',
    alt: 'Site web Le Comptoir du Lac restaurant gastronomique Geneve',
  },
  screenshots: [
    { src: '/images/portfolio/le-comptoir-du-lac/desktop.webp', alt: 'Vue desktop Le Comptoir du Lac' },
    { src: '/images/portfolio/le-comptoir-du-lac/mobile.webp', alt: 'Vue mobile Le Comptoir du Lac' },
  ],
  colors: { primary: '#2C1810', secondary: '#D4A574', accent: '#FF8C00' },
  typography: { heading: 'Playfair Display', body: 'Inter' },
  techStack: ['Astro 5', 'Tailwind CSS 4', 'View Transitions', 'Pexels Media'],
}

export default project
