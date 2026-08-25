/**
 * Formatage de nombres deterministe, sans dependance a ICU.
 *
 * ⚠️ Ne JAMAIS utiliser `toLocaleString('fr-CH')` dans un composant rendu cote
 * serveur. Le separateur de milliers de `fr-CH` depend de la version d'ICU
 * embarquee dans le moteur :
 *
 *   Node 24 local (ICU 78) et Chrome  ->  "1 050"  (U+202F, espace fine insecable)
 *   runtime Node de Vercel            ->  "1'050"  (U+0027, apostrophe)
 *
 * Le serveur et le client produisent alors deux textes differents pour le meme
 * nombre. React detecte l'ecart a l'hydratation, leve l'erreur #418, abandonne
 * l'hydratation et re-rend la racine depuis le HTML serveur. Effet de bord
 * vicieux : `data-theme` que le script anti-FOUC avait pose sur `<html>`
 * disparait, et la page repasse en sombre alors que l'utilisateur a choisi le
 * mode clair. Constate le 2026-08-24 sur les 6 pages portant un calculateur ROI.
 *
 * `de-CH` rend l'apostrophe des deux cotes et se trouve donc stable en pratique,
 * mais on ne parie pas dessus : tout nombre affiche au rendu serveur passe ici.
 */

/** Separateur de milliers suisse, aligne sur le reste du site (U+0027). */
const GROUP_SEPARATOR = "'"

/**
 * Groupe les milliers a la suisse, sans passer par Intl.
 *
 *   formatSwissInt(1050)    -> "1'050"
 *   formatSwissInt(1234567) -> "1'234'567"
 *   formatSwissInt(-2500)   -> "-2'500"
 */
export function formatSwissInt(n: number): string {
  const rounded = Math.round(n)
  const sign = rounded < 0 ? '-' : ''
  const digits = String(Math.abs(rounded))
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, GROUP_SEPARATOR)
}

/** Montant en francs, groupe a la suisse : `CHF 1'050`. */
export function formatSwissChf(n: number): string {
  return `CHF ${formatSwissInt(n)}`
}
