import type { PortfolioProject } from './types'

const project: PortfolioProject = {
  slug: 'hotel-beau-rivage',
  name: 'Hotel Beau-Rivage',
  sector: 'restauration',
  description: 'Hotel de luxe 5 etoiles sur les quais de Geneve, alliant tradition helvetique et elegance contemporaine.',
  brief: 'L\'Hotel Beau-Rivage cherchait a moderniser sa presence digitale tout en preservant l\'heritage et le prestige de l\'etablissement. Le site devait transmettre le luxe et l\'exclusivite, avec une navigation fluide pour les reservations.',
  designChoices: [
    'Palette bleu nuit et or pour le prestige et le luxe',
    'Typographie Cormorant Garamond pour l\'elegance classique',
    'Video hero plein ecran de la facade et du lac',
    'Animations fade-in elegantes et transitions douces',
    'Mise en page editoriale avec beaucoup d\'espace blanc',
  ],
  features: [
    'Hero video cinematique plein ecran',
    'Presentation des suites avec slider interactif',
    'Section spa et restaurant avec galerie',
    'Temoignages de clients internationaux',
    'Bouton reservation proéminent',
    'Carte de localisation premium',
  ],
  liveUrl: 'https://dkdp-hotel-beau-rivage.vercel.app',
  heroScreenshot: {
    src: '/images/portfolio/hotel-beau-rivage/hero.webp',
    alt: 'Site web Hotel Beau-Rivage hotel luxe 5 etoiles Geneve',
  },
  screenshots: [
    { src: '/images/portfolio/hotel-beau-rivage/desktop.webp', alt: 'Vue desktop Hotel Beau-Rivage' },
    { src: '/images/portfolio/hotel-beau-rivage/mobile.webp', alt: 'Vue mobile Hotel Beau-Rivage' },
  ],
  colors: { primary: '#1a2a4a', secondary: '#C9A84C', accent: '#60a5fa' },
  typography: { heading: 'Cormorant Garamond', body: 'DM Sans' },
  techStack: ['Astro 5', 'Tailwind CSS 4', 'View Transitions', 'Pexels Media'],
}

export default project
