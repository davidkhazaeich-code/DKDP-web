import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { CircularTestimonials } from '@/components/ui/circular-testimonials'

const TEAM = [
  {
    name: 'David Khazaei',
    designation: 'Développeur · Stratège · Créatif',
    quote:
      "15 ans à construire des sites et des outils qui fonctionnent vraiment. Développeur dans l'âme, stratège dans l'approche, créatif dans les solutions. Pas de grande agence anonyme : vous parlez directement à celui qui conçoit, code et pilote votre projet.",
    src: '/images/team/david-khazaei.png',
    cardBg: 'linear-gradient(160deg, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0.06) 100%)',
    cardBorder: 'rgba(124,58,237,0.3)',
    imageScale: 1,
  },
  {
    name: 'Romane',
    designation: 'Experte IA, SEO/GEO & UX · Formatrice',
    quote:
      "Spécialiste en intelligence artificielle, SEO/GEO et expérience utilisateur. J'optimise la visibilité et la performance digitale de nos clients, et je forme les équipes pour qu'elles maîtrisent ces outils au quotidien.",
    src: '/images/team/romane.png',
    cardBg: 'linear-gradient(160deg, rgba(255,107,0,0.20) 0%, rgba(255,107,0,0.05) 100%)',
    cardBorder: 'rgba(255,107,0,0.28)',
    imageScale: 1.38,
    imageOffsetX: 80,
    linkedin: 'https://www.linkedin.com/in/romane-degeorges/',
  },
  {
    name: 'Ali Khazaei',
    designation: 'Formateur · Développeur & Informatique',
    quote:
      "Développeur et formateur passionné, j'interviens sur les modules informatique et développement web. Pédagogue avant tout, je m'assure que chaque participant repart avec des bases solides et des compétences immédiatement applicables.",
    src: '/images/team/ali-khazaei.png',
    cardBg: 'linear-gradient(160deg, rgba(96,165,250,0.18) 0%, rgba(96,165,250,0.04) 100%)',
    cardBorder: 'rgba(96,165,250,0.25)',
    imageScale: 1,
  },
  {
    name: 'Claude',
    designation: 'Développeur Indépendant · Formateur Informatique',
    quote:
      "Développeur et formateur indépendant, j'apporte mon expertise technique en programmation et en informatique aux projets DKDP. Je rends les sujets complexes accessibles et directement applicables sur le terrain.",
    src: '/images/team/claude-formation.png',
    cardBg: 'linear-gradient(160deg, rgba(212,212,216,0.15) 0%, rgba(212,212,216,0.04) 100%)',
    cardBorder: 'rgba(212,212,216,0.22)',
    imageScale: 1,
  },
]

export function TeamSection() {
  return (
    <section aria-labelledby="team-heading" className="py-14 sm:py-20 md:py-24 bg-bg-card border-y border-border">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <SectionReveal>
          <div className="text-center mb-10 sm:mb-16">
            <GradTag className="mb-4 sm:mb-6">L&apos;équipe</GradTag>
            <h2 id="team-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              Quatre experts, une seule équipe.
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <CircularTestimonials
            items={TEAM}
            autoplay={true}
            colors={{
              name: '#ffffff',
              designation: '#A78BFA',
              quote: '#9CA3AF',
              arrowBackground: '#1E1E1E',
              arrowForeground: '#ffffff',
              arrowHoverBackground: '#7C3AED',
            }}
            fontSizes={{
              name: '1.6rem',
              designation: '0.75rem',
              quote: '1rem',
            }}
          />
        </SectionReveal>
      </div>
    </section>
  )
}
