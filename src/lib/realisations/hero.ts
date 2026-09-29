import type { Realisation, RealisationFlow, RealisationTraining } from './types'

/**
 * Hero d'une etude de cas (2026-09-29) : ce qui s'affiche a droite du titre,
 * et le titre coupe autour de ses mots en degrade. Logique pure, testee dans
 * `__tests__/hero.test.ts` ; le rendu vit dans `components/realisations/CaseStudyHero.tsx`.
 */

/** Le titre coupe autour de ses mots en degrade, ou `null` sans accent trouve (titre uni). */
export function splitTitle(
  title: string,
  accent: string | undefined,
): { before: string; accent: string; after: string } | null {
  if (!accent) return null
  const at = title.indexOf(accent)
  if (at < 0) return null
  return { before: title.slice(0, at), accent, after: title.slice(at + accent.length) }
}

export type HeroVisual =
  /** Site : premier ecran dans un navigateur, premier ecran mobile dans un telephone pose devant. */
  | { kind: 'devices'; desktop: string; phone?: string; browserUrl: string }
  /** Livrable : deux vraies pages posees l'une sur l'autre (rapport en portrait, slides en paysage). */
  | { kind: 'stack'; format: 'pages' | 'slides'; images: [{ src: string; alt: string }, { src: string; alt: string }] }
  /** Projet sans ecran : le flux, etape par etape. */
  | { kind: 'flow'; flow: RealisationFlow }
  /** Formation sans support publiable : le programme, seance par seance. */
  | { kind: 'training'; training: RealisationTraining }
  /** Dernier recours : la couverture de l'etude. */
  | { kind: 'cover'; src: string; alt: string }

/**
 * Le premier resultat de l'etude, pose en pastille sur le visuel du hero : il
 * est deja source et date (regles de `proof.ts`), et la pastille affiche sa date
 * de releve. `null` sans resultat : jamais de chiffre invente pour remplir.
 */
export function heroProof(r: Realisation): { value: string; metric: string; capturedAt: string } | null {
  const first = r.results?.[0]
  return first ? { value: first.value, metric: first.metric, capturedAt: first.capturedAt } : null
}

/**
 * Le visuel du hero, par ordre de preference : le site, les pages du livrable,
 * le flux, le programme de formation, la couverture. Toujours un vrai ecran ou
 * un vrai livrable, jamais une image generee.
 */
export function heroVisual(r: Realisation): HeroVisual | null {
  if (r.hero) {
    return {
      kind: 'devices',
      desktop: r.hero.desktopView ?? r.hero.desktopFull,
      phone: r.hero.mobileView,
      browserUrl: r.hero.browserUrl,
    }
  }
  if (r.heroStack) {
    const [a, b] = (r.gallery ?? []).filter((g) => g.document)
    if (a && b) {
      return {
        kind: 'stack',
        format: r.heroStack,
        images: [
          { src: a.src, alt: a.alt },
          { src: b.src, alt: b.alt },
        ],
      }
    }
  }
  if (r.flow) return { kind: 'flow', flow: r.flow }
  if (r.training) return { kind: 'training', training: r.training }
  if (r.cover) return { kind: 'cover', src: r.cover.src, alt: r.cover.alt }
  return null
}
