import { BadgeCheck, Star, UserRound, MessagesSquare } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { SectionReveal } from '@/components/ui/SectionReveal'
import type { Locale } from '@/i18n/config'

/**
 * Bloc « Votre formateur » propre à la page Figma.
 *
 * Remplace ici le composant partagé FormationTrainer, qui présente l'équipe
 * DKDP autour de l'IA, du SEO et du développement. Aucun des trois profils
 * n'est praticien de Figma : les afficher sous une promesse « formés par des
 * praticiens » aurait été un faux signal, et c'est précisément le point qu'un
 * prospect exigeant vérifie.
 *
 * On décrit donc le profil requis, et on nomme le formateur au moment de caler
 * les dates, pas avant.
 */

const CONTENT: Record<
  Locale,
  {
    tag: string
    headingA: string
    headingB: string
    intro: string
    criteria: { Icon: typeof UserRound; title: string; body: string }[]
    ratingPre: string
    ratingCount: string
    ratingPost: string
  }
> = {
  fr: {
    tag: 'Votre formateur',
    headingA: 'Un praticien de Figma,',
    headingB: 'pas un formateur généraliste.',
    intro:
      "Nous ne mettons pas un formateur bureautique devant un fichier Figma. Les sessions Figma sont animées par un designer d'interface en exercice, dont le profil détaillé vous est transmis avant la première séance, avec ses réalisations.",
    criteria: [
      {
        Icon: UserRound,
        title: 'Il conçoit des interfaces livrées',
        body: "Pas seulement enseignées. Il travaille sur des projets réels, avec des contraintes de délai et des arbitrages, et c'est ce qu'il transmet.",
      },
      {
        Icon: MessagesSquare,
        title: 'Il parle aux développeurs',
        body: "La partie transmission compte autant que le dessin. Le formateur a l'habitude des échanges avec des équipes techniques, y compris non-web.",
      },
      {
        Icon: BadgeCheck,
        title: 'Vous validez avant de vous engager',
        body: 'Son profil, son parcours et des exemples de son travail vous parviennent au moment de fixer les dates. Rien ne se décide à l’aveugle.',
      },
    ],
    ratingPre: 'Satisfaction moyenne sur',
    ratingCount: '500+ participants',
    ratingPost: 'formés depuis 2015',
  },
  en: {
    tag: 'Your trainer',
    headingA: 'A working Figma practitioner,',
    headingB: 'not a generalist trainer.',
    intro:
      'We do not put an office-software trainer in front of a Figma file. Figma sessions are led by a practising interface designer, whose full profile is sent to you before the first session, along with their work.',
    criteria: [
      {
        Icon: UserRound,
        title: 'They design interfaces that ship',
        body: 'Not only ones they teach. They work on real projects, with real deadlines and real trade-offs, and that is what they pass on.',
      },
      {
        Icon: MessagesSquare,
        title: 'They speak to developers',
        body: 'Handover matters as much as drawing. The trainer is used to working with technical teams, including outside the web.',
      },
      {
        Icon: BadgeCheck,
        title: 'You approve before committing',
        body: 'Their profile, background and sample work reach you when the dates are set. Nothing is decided sight unseen.',
      },
    ],
    ratingPre: 'Average satisfaction across',
    ratingCount: '500+ participants',
    ratingPost: 'trained since 2015',
  },
}

export function FigmaTrainer({ lang = 'fr', accent = '#FF8C00' }: { lang?: Locale; accent?: string }) {
  const t = CONTENT[lang]

  return (
    <section className="py-24 bg-bg-card border-y border-border">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-start">
          <SectionReveal>
            <GradTag className="mb-4">{t.tag}</GradTag>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6 leading-tight">
              {t.headingA}
              <br />
              <span className="text-text-secondary">{t.headingB}</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">{t.intro}</p>

            <div
              className="inline-flex items-center gap-3 rounded-[12px] border px-4 py-3"
              style={{ background: 'rgba(255,140,0,0.06)', borderColor: 'rgba(255,140,0,0.22)' }}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} style={{ color: accent }} fill="currentColor" />
                ))}
              </div>
              <p className="text-text-secondary text-[12.5px]">
                {t.ratingPre}{' '}
                <span className="text-text font-semibold">{t.ratingCount}</span> {t.ratingPost}
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <div className="space-y-3">
              {t.criteria.map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-[14px] border border-border bg-bg p-5"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] flex-shrink-0"
                    style={{ background: 'rgba(255,140,0,0.10)', border: '1px solid rgba(255,140,0,0.25)' }}
                  >
                    <Icon size={18} style={{ color: accent }} />
                  </div>
                  <div>
                    <p className="text-text font-semibold text-sm mb-1">{title}</p>
                    <p className="text-text-muted text-[13px] leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
