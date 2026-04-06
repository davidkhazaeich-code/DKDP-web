import type { PortfolioProject } from './types'

const project: PortfolioProject = {
  slug: 'dr-moreau-cabinet',
  name: 'Dr. Moreau Cabinet',
  sector: 'sante',
  description: 'Cabinet dentaire moderne a Geneve, specialise en soins esthetiques et implantologie de pointe.',
  brief: 'Le Dr. Moreau avait besoin d\'un site qui inspire confiance et professionnalisme, tout en restant accessible et chaleureux. L\'objectif : rassurer les patients anxieux et mettre en avant l\'expertise du cabinet avec un design clean et medical.',
  designChoices: [
    'Fond clair et clean pour inspirer la confiance medicale',
    'Vert emeraude comme couleur d\'accent, associe a la sante',
    'Typographie Plus Jakarta Sans pour un look moderne et pro',
    'Micro-interactions subtiles pour une experience douce',
    'Photos lumineuses du cabinet et de l\'equipe',
  ],
  features: [
    'Hero avec photo du cabinet et message rassurant',
    'Liste des soins avec icones explicatives',
    'Presentation de l\'equipe avec photos pro',
    'Section avant/apres (traitements esthetiques)',
    'Temoignages patients avec etoiles Google',
    'Prise de rendez-vous en ligne (decoratif)',
  ],
  liveUrl: 'https://dentiste.dkdp.ch',
  heroScreenshot: {
    src: '/images/portfolio/dr-moreau-cabinet/hero.webp',
    alt: 'Site web Dr Moreau cabinet dentaire Geneve',
  },
  screenshots: [
    { src: '/images/portfolio/dr-moreau-cabinet/desktop.webp', alt: 'Vue desktop Dr Moreau Cabinet' },
    { src: '/images/portfolio/dr-moreau-cabinet/mobile.webp', alt: 'Vue mobile Dr Moreau Cabinet' },
  ],
  colors: { primary: '#059669', secondary: '#E0F2FE', accent: '#1E293B' },
  typography: { heading: 'Plus Jakarta Sans', body: 'Plus Jakarta Sans' },
  techStack: ['Astro 5', 'Tailwind CSS 4', 'CSS Animations', 'Pexels Media'],
}

export default project
