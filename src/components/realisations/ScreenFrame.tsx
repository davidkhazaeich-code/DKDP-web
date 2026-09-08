import { clsx } from 'clsx'

/**
 * Cadre de navigateur statique pour une capture d'écran de section.
 *
 * Contrairement a `BrowserFrame`, aucune animation de defilement : les
 * captures sont des vues a la taille de l'ecran, pas des pages entieres, et
 * un decalage automatique sur une image courte produirait un vide sous
 * l'image. Zone volontairement sombre dans les deux themes (echelle blanche,
 * pas de tokens de texte), comme `BrowserFrame`.
 */
export function ScreenFrame({
  src,
  alt,
  host,
  path,
  className,
  eager = false,
}: {
  src: string
  alt: string
  /** Domaine affiche dans la barre d'adresse, sans protocole. */
  host?: string
  /** Chemin affiche apres le domaine, par exemple `/urgence-inondation-geneve`. */
  path?: string
  className?: string
  eager?: boolean
}) {
  const url = host ? `${host}${path ?? ''}` : (path ?? '')
  return (
    <figure
      className={clsx(
        'overflow-hidden rounded-xl border border-white/10 bg-[#0E0E10] shadow-[0_30px_80px_-44px_rgba(0,0,0,0.75)]',
        className,
      )}
    >
      <div className="flex h-8 items-center gap-2 border-b border-white/10 bg-[#1B1B1F] px-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <i className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <i className="h-2 w-2 rounded-full bg-[#28C840]" />
        </span>
        {url && (
          <span className="ml-1 min-w-0 flex-1 truncate rounded-md bg-[#0E0E10]/60 px-2.5 py-0.5 font-mono text-[10.5px] text-white/55">
            {url}
          </span>
        )}
      </div>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="block w-full select-none"
      />
    </figure>
  )
}
