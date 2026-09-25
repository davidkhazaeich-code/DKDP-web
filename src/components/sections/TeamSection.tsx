import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { CircularTestimonials } from '@/components/ui/circular-testimonials'
import type { Locale } from '@/i18n/config'

// 25/09/2026 : David ne se présente plus avec « 15 ans » (actif depuis 2015,
// DKDP fondée en 2019, aucun chiffre non sourcé) et sa carte parle du cadrage
// des formations, qu'il n'anime pas ; Romane passe « formatrice IA » en premier.
const TEAM = [
  {
    name: 'David Khazaei',
    designation: 'Fondateur · Stratégie IA et web',
    quote:
      "Je cadre chaque projet et chaque formation avec vous : ce que vos équipes doivent savoir faire, sur quels outils et avec quelles données. Pas de grande agence anonyme : vous parlez directement à celui qui pilote votre projet.",
    src: '/images/team/david-khazaei.png',
    cardBg: 'linear-gradient(160deg, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0.06) 100%)',
    cardBorder: 'rgba(124,58,237,0.3)',
  },
  {
    name: 'Romane',
    designation: 'Formatrice IA · Experte SEO/GEO et UX',
    quote:
      "Je forme les équipes à l'intelligence artificielle pour qu'elles s'en servent vraiment au quotidien, sur leurs propres dossiers. En parallèle, j'optimise la visibilité de nos clients sur Google et dans les assistants IA.",
    src: '/images/team/romane.png',
    cardBg: 'linear-gradient(160deg, rgba(255,107,0,0.20) 0%, rgba(255,107,0,0.05) 100%)',
    cardBorder: 'rgba(255,107,0,0.28)',
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

// English overlay (same order; name/images/colours shared, designation + quote translated)
const TEAM_EN: { designation: string; quote: string }[] = [
  {
    designation: 'Founder · AI and web strategy',
    quote:
      'I frame every project and every training with you: what your teams need to master, on which tools and with which data. No anonymous big agency: you talk directly to the person who runs your project.',
  },
  {
    designation: 'AI trainer · SEO/GEO and UX expert',
    quote:
      "I train teams in artificial intelligence so they actually use it every day, on their own work. Alongside that, I improve our clients' visibility on Google and in AI assistants.",
  },
  {
    designation: 'Trainer · Developer & IT',
    quote:
      "A passionate developer and trainer, I lead the IT and web development modules. An educator above all, I make sure every participant leaves with solid foundations and immediately applicable skills.",
  },
  {
    designation: 'Independent Developer · IT Trainer',
    quote:
      "An independent developer and trainer, I bring my technical expertise in programming and IT to DKDP projects. I make complex topics accessible and directly applicable in the field.",
  },
]

const CONTENT = {
  fr: { tag: "L'équipe", heading: 'Quatre experts, une seule équipe.' },
  en: { tag: 'The team', heading: 'Four experts, one single team.' },
} as const

export function TeamSection({ lang = 'fr' }: { lang?: Locale } = {}) {
  const t = CONTENT[lang]
  const items = lang === 'en'
    ? TEAM.map((m, i) => ({ ...m, designation: TEAM_EN[i].designation, quote: TEAM_EN[i].quote }))
    : TEAM
  return (
    <section aria-labelledby="team-heading" className="py-14 sm:py-20 md:py-24 bg-bg-card border-y border-border">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <SectionReveal>
          <div className="text-center mb-10 sm:mb-16">
            <GradTag className="mb-4 sm:mb-6">{t.tag}</GradTag>
            <h2 id="team-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              {t.heading}
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <CircularTestimonials
            items={items}
            autoplay={true}
            colors={{
              name: 'var(--text)',
              designation: '#A78BFA',
              quote: 'var(--text-secondary)',
              arrowBackground: 'var(--bg-card-hover)',
              arrowForeground: 'var(--text)',
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
