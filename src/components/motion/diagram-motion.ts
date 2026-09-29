/**
 * Moteur des diagrammes animés (kit dg-*, styles dans diagram-motion.css).
 *
 * Tout le mouvement est en CSS ; ce moteur ne fait que poser trois attributs sur la racine
 * [data-dg] au bon moment :
 *   data-dg-armed  la racine est hors écran : ses entrées sont créées en pause, état de départ ;
 *   data-dg-play   elle arrive à l'écran : les entrées jouent, une fois ;
 *   data-dg-live   elle est à l'écran : les boucles tournent (retiré hors écran).
 *
 * Une racine déjà peinte à l'écran par le HTML serveur n'est jamais armée : elle ne
 * disparaît pas sous les yeux du lecteur pour rejouer son entrée. Un bloc sauté d'un coup
 * (touche Fin, ancre, position restaurée) passe de « dessous » à « dessus » sans croiser
 * l'écran : l'observateur ne dit rien. Un balayage au défilement (une mesure par image, tant
 * qu'il reste des racines en attente) joue alors tout bloc dont le haut a atteint l'écran.
 */

// Racines armées en attente, balayées au défilement (voir plus haut).
const pending = new Map<HTMLElement, () => void>()
let ticking = false

function sweep() {
  ticking = false
  const bottom = window.innerHeight || document.documentElement.clientHeight
  for (const [root, play] of pending) {
    if (root.getBoundingClientRect().top < bottom) play()
  }
}
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(sweep)
}
function watch(root: HTMLElement, play: () => void) {
  pending.set(root, play)
  if (pending.size === 1) window.addEventListener('scroll', onScroll, { passive: true })
}
function unwatch(root: HTMLElement) {
  if (!pending.delete(root)) return
  if (pending.size === 0) window.removeEventListener('scroll', onScroll)
}

/** Largeur à partir de laquelle un visuel de hero est à droite du texte, donc visible sans défiler. */
export const HERO_DESKTOP = '(min-width: 1024px)'

/** Une racine qui ne dépasse que de sa bordure au bas de l'écran (visuel de hero sur un téléphone,
 *  16 à 34 px mesurés) n'a pas vraiment été vue : on l'arme quand même. */
const EDGE_TOLERANCE = 60

type Options = {
  /** true si le DOM vient d'être créé côté client (navigation) : rien n'a encore été peint. */
  fresh?: boolean
}

export function initDiagramMotion(root: HTMLElement, { fresh = false }: Options = {}): () => void {
  if (typeof window === 'undefined') return () => {}

  const unbindTips = bindTips(root)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || typeof IntersectionObserver === 'undefined') return unbindTips

  // Visuel de hero sur grand écran : le CSS le joue dès le premier affichage, rien à armer.
  const heroPlaying = root.dataset.dg === 'hero' && window.matchMedia(HERO_DESKTOP).matches

  let played = true
  if (!heroPlaying) {
    const rect = root.getBoundingClientRect()
    const viewport = window.innerHeight || document.documentElement.clientHeight
    const below = rect.top >= viewport - EDGE_TOLERANCE
    if (fresh || below) {
      root.setAttribute('data-dg-armed', '')
      played = false
    }
  }

  const play = () => {
    if (played) return
    played = true
    root.setAttribute('data-dg-play', '')
    unwatch(root)
  }
  if (!played) watch(root, play)

  const io = new IntersectionObserver(
    (entries) => {
      const entry = entries[entries.length - 1]
      if (!entry) return
      if (entry.isIntersecting) root.setAttribute('data-dg-live', '')
      else root.removeAttribute('data-dg-live')
      // Joue à l'arrivée, ou tout de suite si le bloc est déjà passé au-dessus de l'écran.
      if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) play()
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  )
  io.observe(root)

  return () => {
    io.disconnect()
    unwatch(root)
    root.removeAttribute('data-dg-armed')
    root.removeAttribute('data-dg-play')
    root.removeAttribute('data-dg-live')
    unbindTips()
  }
}

/**
 * Infobulles .dg-tip-host : le survol et le focus clavier sont en CSS. Ici, le toucher :
 * un tap ouvre (data-open), un tap ailleurs ou Échap referme.
 */
function bindTips(root: HTMLElement): () => void {
  if (!root.querySelector('.dg-tip-host')) return () => {}
  let open: HTMLElement | null = null

  const close = () => {
    open?.removeAttribute('data-open')
    open = null
  }
  const onClick = (event: MouseEvent) => {
    const host = (event.target as Element | null)?.closest<HTMLElement>('.dg-tip-host')
    if (!host || !root.contains(host)) return
    if (open === host) {
      close()
      return
    }
    close()
    host.setAttribute('data-open', '')
    open = host
  }
  const onPointerDown = (event: PointerEvent) => {
    if (open && !open.contains(event.target as Node)) close()
  }
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return
    close()
    const active = document.activeElement
    if (active instanceof HTMLElement && root.contains(active) && active.classList.contains('dg-tip-host')) active.blur()
  }

  root.addEventListener('click', onClick)
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeyDown)
  return () => {
    close()
    root.removeEventListener('click', onClick)
    document.removeEventListener('pointerdown', onPointerDown)
    document.removeEventListener('keydown', onKeyDown)
  }
}
