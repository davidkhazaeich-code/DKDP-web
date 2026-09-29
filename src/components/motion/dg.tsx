import type { CSSProperties, ReactNode } from 'react'

/**
 * Helpers des diagrammes animés, utilisables dans un composant serveur (aucun hook).
 * Les classes et variables sont décrites dans diagram-motion.css.
 */

type Vars = Record<`--${string}`, string | number>

/**
 * Place d'un élément dans la séquence : `dg(2)` = 2e pas (2 × 90 ms), `dg(0, 400)` = à 400 ms,
 * `dg(1, 400)` = à 400 ms + 1 pas. Le troisième argument ajoute d'autres variables
 * (`{ '--dg-accent': '#4ade80' }`) ou styles.
 */
export function dg(i = 0, at?: number, extra?: Vars | CSSProperties): CSSProperties {
  const vars: Vars = { '--dg-i': i }
  if (at !== undefined) vars['--dg-at'] = `${at}ms`
  return { ...vars, ...extra } as CSSProperties
}

/**
 * Entier qui défile de `from` à `to`. Le texte rendu est la vraie valeur : c'est lui que lisent
 * Google et les lecteurs d'écran, et lui qui fixe la largeur (aucun décalage pendant le
 * défilement). Seul le nombre défile : unité et symbole restent en dehors (`<DgCount to={87} />%`).
 */
export function DgCount({
  to,
  from = 0,
  i,
  at,
  dur,
  align,
  className,
  style,
}: {
  to: number
  from?: number
  i?: number
  at?: number
  /** Durée en ms (1300 par défaut). */
  dur?: number
  /** Côté où le chiffre qui défile se cale : `end` (défaut, unité après : « 87 % »),
   *  `start` (symbole avant : « #3 »), `center` (chiffre seul centré, dans un anneau). */
  align?: 'start' | 'center' | 'end'
  className?: string
  style?: CSSProperties
}) {
  const vars: Vars = { '--dg-to': to, '--dg-from': from }
  if (align) vars['--dg-count-align'] = align
  if (i !== undefined) vars['--dg-i'] = i
  if (at !== undefined) vars['--dg-at'] = `${at}ms`
  if (dur !== undefined) vars['--dg-dur'] = `${dur}ms`
  return (
    <span className={className ? `dg-count ${className}` : 'dg-count'} style={{ ...vars, ...style } as CSSProperties}>
      {to}
    </span>
  )
}

/**
 * Infobulle d'un élément `.dg-tip-host` (qui porte tabIndex={0} et aria-describedby={id}).
 * Masquée des lecteurs d'écran en tant que contenu : ils la lisent comme description de l'hôte.
 */
export function DgTip({
  id,
  side,
  align,
  children,
}: {
  id: string
  /** Au-dessus (défaut) ou en dessous de l'hôte. */
  side?: 'top' | 'bottom'
  /** Centrée sur l'hôte (défaut) ou calée sur son bord gauche (hôte près d'un bord rogné). */
  align?: 'center' | 'start'
  children: ReactNode
}) {
  return (
    <span id={id} className="dg-tip" data-side={side} data-align={align} aria-hidden="true">
      {children}
    </span>
  )
}
