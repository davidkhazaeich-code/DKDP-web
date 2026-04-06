import type { PortfolioProject } from './types'

const project: PortfolioProject = {
  slug: 'nexflow-analytics',
  name: 'NexFlow Analytics',
  sector: 'tech',
  description: 'Startup SaaS genevoise proposant une plateforme d\'analyse de donnees en temps reel pour les PME.',
  brief: 'NexFlow avait besoin d\'une landing page percutante pour convaincre les decideurs de tester leur plateforme. Le design devait etre futuriste et tech-forward, avec des visuels de dashboard et des metriques impressionnantes pour demontrer la valeur du produit.',
  designChoices: [
    'Fond sombre avec accents teal et violet pour le cote tech',
    'Gradient mesh et effets glassmorphism sur les cards',
    'Typographie Space Grotesk pour le look startup moderne',
    'Animations de particules et morphing de gradients',
    'Screenshots de dashboard comme preuves visuelles',
  ],
  features: [
    'Hero avec tagline percutante et CTA d\'essai gratuit',
    'Section fonctionnalites avec icones animees',
    'Dashboard preview interactif',
    'Pricing table avec 3 plans',
    'Logos de clients (fictifs) et social proof',
    'FAQ et support',
  ],
  liveUrl: 'https://startup.dkdp.ch',
  heroScreenshot: {
    src: '/images/portfolio/nexflow-analytics/hero.webp',
    alt: 'Site web NexFlow Analytics startup SaaS Geneve',
  },
  screenshots: [
    { src: '/images/portfolio/nexflow-analytics/desktop.webp', alt: 'Vue desktop NexFlow Analytics' },
    { src: '/images/portfolio/nexflow-analytics/mobile.webp', alt: 'Vue mobile NexFlow Analytics' },
  ],
  colors: { primary: '#2dd4bf', secondary: '#A78BFA', accent: '#F0FDFA' },
  typography: { heading: 'Space Grotesk', body: 'Inter' },
  techStack: ['Astro 5', 'Tailwind CSS 4', 'Canvas Particles', 'Pexels Media'],
}

export default project
