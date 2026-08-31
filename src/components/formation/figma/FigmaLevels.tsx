import { CheckCircle2, Clock } from 'lucide-react'
import type { Locale } from '@/i18n/config'

/**
 * Programme en trois niveaux : découverte, maîtrise, avancé.
 *
 * Remplace la liste de modules à plat de l'ancienne page. Structurer par niveau
 * sert deux choses : le prospect se situe tout de suite, et la page couvre les
 * requêtes de niveau (« figma débutant », « figma avancé », « figma deux jours »)
 * qu'une liste unique ne captait pas.
 *
 * Aucun prix ici : la grille tarifaire vit dans FormationPricing, un seul endroit.
 */

type Level = {
  key: string
  name: string
  duration: string
  audience: string
  modules: string[]
  recommended?: boolean
}

const CONTENT: Record<Locale, { levels: Level[]; audienceLabel: string; badge: string }> = {
  fr: {
    audienceLabel: 'Pour qui',
    badge: 'Le plus demandé',
    levels: [
      {
        key: 'decouverte',
        name: 'Découverte',
        duration: 'Demi-journée, 4 heures',
        audience: "Une équipe qui n'a jamais ouvert Figma et doit pouvoir lire et commenter un fichier.",
        modules: [
          'Principes UI/UX : grille, hiérarchie, contraste, lisibilité',
          "L'interface de Figma : fichiers, pages, frames, calques",
          'Wireframes basse fidélité et parcours utilisateur',
          'Première maquette sur un écran réel de votre activité',
          'Commenter, partager et valider à plusieurs',
        ],
      },
      {
        key: 'maitrise',
        name: 'Maîtrise',
        duration: 'Journée entière, 8 heures',
        recommended: true,
        audience: 'Une équipe qui doit produire ses propres écrans et les transmettre proprement.',
        modules: [
          'Tout le niveau Découverte, en plus dense',
          'Auto Layout : mobile, tablette et ordinateur en parallèle',
          'Composants et variantes réutilisables',
          'Design system minimal : couleurs, typographie, espacements',
          'Prototype cliquable, testable sur téléphone',
          'Dev Mode : transmission aux développeurs sans allers-retours',
        ],
      },
      {
        key: 'avance',
        name: 'Avancé',
        duration: 'Deux journées, 16 heures',
        audience: "Une équipe produit qui fait vivre une interface dans la durée, pas un projet ponctuel.",
        modules: [
          'Tout le niveau Maîtrise, appliqué à votre produit existant',
          'Bibliothèque partagée entre plusieurs fichiers et équipes',
          'Variables et modes : thème clair et sombre depuis une source unique',
          'Conventions de nommage et gouvernance du fichier',
          'Accessibilité : contrastes, tailles de cible, ordre de lecture',
          'Organisation du travail entre design, contenu et développement',
        ],
      },
    ],
  },
  en: {
    audienceLabel: 'Who it is for',
    badge: 'Most requested',
    levels: [
      {
        key: 'decouverte',
        name: 'Discovery',
        duration: 'Half day, 4 hours',
        audience: 'A team that has never opened Figma and needs to read and comment on a file.',
        modules: [
          'UI/UX principles: grid, hierarchy, contrast, legibility',
          'The Figma interface: files, pages, frames, layers',
          'Low-fidelity wireframes and user flows',
          'A first mockup built on a real screen from your business',
          'Commenting, sharing and signing off as a group',
        ],
      },
      {
        key: 'maitrise',
        name: 'Working level',
        duration: 'Full day, 8 hours',
        recommended: true,
        audience: 'A team that has to produce its own screens and hand them over cleanly.',
        modules: [
          'Everything in Discovery, at a faster pace',
          'Auto Layout: mobile, tablet and desktop in parallel',
          'Reusable components and variants',
          'A minimal design system: colours, typography, spacing',
          'A clickable prototype you can test on a phone',
          'Dev Mode: handover to developers without back-and-forth',
        ],
      },
      {
        key: 'avance',
        name: 'Advanced',
        duration: 'Two days, 16 hours',
        audience: 'A product team maintaining an interface over time, not running a one-off project.',
        modules: [
          'Everything in Working level, applied to your existing product',
          'A shared library across several files and teams',
          'Variables and modes: light and dark themes from a single source',
          'Naming conventions and file governance',
          'Accessibility: contrast, target sizes, reading order',
          'How design, content and development work together',
        ],
      },
    ],
  },
}

export function FigmaLevels({ lang = 'fr', accent = '#FF8C00' }: { lang?: Locale; accent?: string }) {
  const t = CONTENT[lang]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {t.levels.map((level) => (
        <div
          key={level.key}
          className="relative flex flex-col rounded-[16px] border p-6 h-full"
          style={{
            borderColor: level.recommended ? 'rgba(255,140,0,0.30)' : 'var(--color-border)',
            background: level.recommended ? 'rgba(255,140,0,0.05)' : 'var(--color-bg-card)',
          }}
        >
          {level.recommended && (
            <span
              className="absolute -top-2.5 left-6 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: accent, color: '#0A0A0A' }}
            >
              {t.badge}
            </span>
          )}

          <h3 className="text-text font-bold text-xl mb-2">{level.name}</h3>

          <div className="flex items-center gap-1.5 mb-4">
            <Clock size={13} style={{ color: accent }} />
            <span className="text-[12px] font-semibold" style={{ color: accent }}>
              {level.duration}
            </span>
          </div>

          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-wide mb-1">
            {t.audienceLabel}
          </p>
          <p className="text-text-secondary text-[13px] leading-relaxed mb-5">{level.audience}</p>

          {/* Pas de `mt-auto` ici : les trois niveaux n'ont pas le même nombre de
              modules, et pousser les listes en bas de carte plaçait les trois
              séparateurs à trois hauteurs différentes. On aligne les séparateurs
              et on laisse le vide en bas de la carte la plus courte. */}
          <div className="space-y-2.5 pt-4 border-t border-border">
            {level.modules.map((m) => (
              <div key={m} className="flex items-start gap-2.5">
                <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
                <span className="text-text-secondary text-[13px] leading-snug">{m}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
