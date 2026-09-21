/**
 * Passage de relais entre la barre statique (LazyChatWidget) et le vrai
 * ChatWidget, charge au premier geste (21/09/2026, plan SEO, action D21).
 *
 * La barre statique est du HTML sans framer-motion ni react-markdown : elle
 * tient dans le bundle principal. Le visiteur peut y taper avant que le chunk
 * ChatWidget (226 Ko) soit arrive : ce module garde ce qu'il a saisi et si le
 * champ avait le focus, pour que le widget reprenne exactement la ou il en
 * etait, sans rejouer l'animation d'entree de la barre.
 */
let pendingInput = ''
let pendingFocus = false
let handedOver = false

export function setPendingInput(value: string): void {
  pendingInput = value
}

export function setPendingFocus(focused: boolean): void {
  pendingFocus = focused
}

/** Marque que le widget remplace une barre deja affichee : pas d'animation d'entree. */
export function markHandover(): void {
  handedOver = true
}

/** Lu une seule fois par ChatWidget au montage. */
export function consumeHandover(): { input: string; focus: boolean; skipIntro: boolean } {
  const state = { input: pendingInput, focus: pendingFocus, skipIntro: handedOver }
  pendingInput = ''
  pendingFocus = false
  handedOver = false
  return state
}
