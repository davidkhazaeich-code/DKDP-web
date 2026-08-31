import { X, Check } from 'lucide-react'
import type { Locale } from '@/i18n/config'

/**
 * Formation en salle sur catalogue contre formation dans votre entreprise.
 *
 * C'est le vrai différenciateur face aux organismes romands, qui vendent tous
 * des sessions à dates fixes en salle. On décrit le modèle, jamais un
 * concurrent nommé : la comparaison porte sur le format, pas sur des personnes.
 */

type Row = { catalogue: string; intra: string }

const CONTENT: Record<
  Locale,
  { catalogueTitle: string; catalogueSub: string; intraTitle: string; intraSub: string; rows: Row[] }
> = {
  fr: {
    catalogueTitle: 'Une session en salle sur catalogue',
    catalogueSub: 'Le format le plus répandu en Suisse romande',
    intraTitle: 'Une session DKDP dans votre entreprise',
    intraSub: 'Le format sur lequel on travaille',
    rows: [
      {
        catalogue: "Une date fixe, décidée des mois à l'avance",
        intra: 'Des dates calées sur votre calendrier et vos périodes creuses',
      },
      {
        catalogue: 'Un exercice fictif : refaire la maquette d’une application inventée',
        intra: 'Vos vrais écrans, votre vraie charte, vos vrais contenus',
      },
      {
        catalogue: 'Dix participants venus de dix entreprises différentes',
        intra: 'Votre équipe seule, qui repart avec un vocabulaire commun',
      },
      {
        catalogue: 'Un rythme unique, imposé au groupe entier',
        intra: 'Le rythme de votre équipe, avec des passages individuels',
      },
      {
        catalogue: 'Un fichier d’exercice qui ne resservira jamais',
        intra: 'Une bibliothèque Figma à votre marque, utilisable dès le lendemain',
      },
      {
        catalogue: 'Le déplacement de chaque collaborateur, sur son temps de travail',
        intra: 'On se déplace, dans vos locaux à Genève ou en Suisse romande',
      },
    ],
  },
  en: {
    catalogueTitle: 'An off-the-shelf classroom session',
    catalogueSub: 'The most common format in French-speaking Switzerland',
    intraTitle: 'A DKDP session inside your company',
    intraSub: 'The format we work in',
    rows: [
      {
        catalogue: 'A fixed date, set months in advance',
        intra: 'Dates that fit your calendar and your quieter weeks',
      },
      {
        catalogue: 'A made-up exercise: rebuilding the screens of an invented app',
        intra: 'Your real screens, your real brand, your real content',
      },
      {
        catalogue: 'Ten participants from ten different companies',
        intra: 'Your team alone, leaving with shared vocabulary',
      },
      {
        catalogue: 'One pace, imposed on the whole room',
        intra: 'Your team’s pace, with one-to-one time along the way',
      },
      {
        catalogue: 'An exercise file nobody will ever open again',
        intra: 'A Figma library in your own brand, usable the next morning',
      },
      {
        catalogue: 'Every colleague travelling there, on company time',
        intra: 'We travel, to your offices in Geneva or anywhere in the region',
      },
    ],
  },
}

export function IntraVsCatalogue({ lang = 'fr', accent = '#FF8C00' }: { lang?: Locale; accent?: string }) {
  const t = CONTENT[lang]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Catalogue */}
      <div className="rounded-[16px] border border-border bg-bg-card p-6">
        <p className="text-text font-bold text-[15px] mb-0.5">{t.catalogueTitle}</p>
        <p className="text-text-muted text-[11.5px] mb-5">{t.catalogueSub}</p>
        <ul className="space-y-3">
          {t.rows.map((r) => (
            <li key={r.catalogue} className="flex items-start gap-2.5">
              <X size={14} className="mt-0.5 flex-shrink-0 text-text-muted" />
              <span className="text-text-muted text-[13px] leading-snug">{r.catalogue}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Intra DKDP */}
      <div
        className="rounded-[16px] border p-6"
        style={{ borderColor: 'rgba(255,140,0,0.30)', background: 'rgba(255,140,0,0.05)' }}
      >
        <p className="text-text font-bold text-[15px] mb-0.5">{t.intraTitle}</p>
        <p className="text-[11.5px] mb-5" style={{ color: accent }}>
          {t.intraSub}
        </p>
        <ul className="space-y-3">
          {t.rows.map((r) => (
            <li key={r.intra} className="flex items-start gap-2.5">
              <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
              <span className="text-text-secondary text-[13px] leading-snug">{r.intra}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
