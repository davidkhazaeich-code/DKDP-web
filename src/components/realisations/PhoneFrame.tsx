import { clsx } from 'clsx'

/**
 * Cadre de telephone pour une capture mobile (390 px de large a l'origine).
 * Bezel sombre dans les deux themes, ratio de l'image conserve : l'image
 * fait la hauteur, jamais le cadre.
 */
export function PhoneFrame({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <figure
      className={clsx(
        'overflow-hidden rounded-[1.5rem] border-[5px] border-[#1B1B1F] bg-[#0E0E10] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)]',
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block w-full select-none"
      />
    </figure>
  )
}
