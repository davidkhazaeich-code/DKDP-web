import type { PortfolioProject } from './types'

const project: PortfolioProject = {
  slug: 'la-mie-doree',
  name: 'La Mie Doree',
  sector: 'artisanat',
  description: 'Boulangerie artisanale a Carouge, pains au levain, viennoiseries maison et patisseries fines depuis 2018.',
  brief: 'La Mie Doree cherchait un site qui mette en valeur le savoir-faire artisanal et les produits maison. Le design devait evoquer la chaleur du fournil, l\'authenticite des ingredients et le soin apporte a chaque creation, tout en restant simple et appetissant.',
  designChoices: [
    'Palette chaude ambre et brun pour l\'artisanat et le pain',
    'Typographie Fraunces (variable serif) pour le caractere artisanal',
    'Textures naturelles et arriere-plans rappelant la farine',
    'Carousel horizontal pour les produits phares',
    'Photos macro des pains et viennoiseries (Pexels)',
  ],
  features: [
    'Hero avec photo de vitrine appetissante',
    'Catalogue des pains et viennoiseries avec photos',
    'Histoire de la boulangerie et du boulanger',
    'Horaires d\'ouverture et produits du jour',
    'Temoignages de clients fideles',
    'Plan d\'acces et commande par telephone',
  ],
  liveUrl: 'https://dkdp-la-mie-doree.vercel.app',
  heroScreenshot: {
    src: '/images/portfolio/la-mie-doree/hero.webp',
    alt: 'Site web La Mie Doree boulangerie artisanale Carouge Geneve',
  },
  screenshots: [
    { src: '/images/portfolio/la-mie-doree/desktop.webp', alt: 'Vue desktop La Mie Doree' },
    { src: '/images/portfolio/la-mie-doree/mobile.webp', alt: 'Vue mobile La Mie Doree' },
  ],
  colors: { primary: '#92400E', secondary: '#FEF3C7', accent: '#fbbf24' },
  typography: { heading: 'Fraunces', body: 'Work Sans' },
  techStack: ['Astro 5', 'Tailwind CSS 4', 'CSS Scroll Snap', 'Pexels Media'],
}

export default project
