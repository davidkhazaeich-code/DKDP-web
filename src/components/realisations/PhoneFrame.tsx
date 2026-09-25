import { clsx } from 'clsx'

/**
 * Cadre de telephone pour une capture mobile (390 px de large a l'origine).
 * Bezel sombre dans les deux themes, ratio de l'image conserve : l'image
 * fait la hauteur, jamais le cadre. Une barre d'etat sombre porte l'ilot au
 * dessus de la capture, qui reste entiere : rien du site n'est masque.
 */
export function PhoneFrame({
  src,
  alt,
  className,
  eager = false,
}: {
  src: string
  alt: string
  className?: string
  eager?: boolean
}) {
  return (
    <figure
      className={clsx(
        'overflow-hidden rounded-[1.9rem] border-[6px] border-[#18181B] bg-[#0E0E10] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10',
        className,
      )}
    >
      <div aria-hidden="true" className="relative pt-[9%]">
        <span className="absolute inset-x-0 top-1/2 mx-auto h-[52%] w-[30%] -translate-y-1/2 rounded-full bg-black" />
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
