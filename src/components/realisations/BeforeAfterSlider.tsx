'use client'

import { useId, useState } from 'react'
import type { RealisationBeforeAfter } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Avant et apres d'une refonte : les deux captures superposees, un curseur
 * qui decouvre l'une ou l'autre. Le curseur est un vrai `input type="range"`
 * (clavier, lecteur d'ecran, doigt), pose sur toute la surface. Sans
 * JavaScript, la capture « apres » reste visible a moitie : rien n'est cache.
 *
 * Regle de ton : l'avant se montre date et sourcé, sans commentaire sur le
 * prestataire precedent.
 */
export function BeforeAfterSlider({ item, lang = 'fr' }: { item: RealisationBeforeAfter; lang?: Locale }) {
  const [pos, setPos] = useState(50)
  const id = useId()
  const en = lang === 'en'

  return (
    <figure>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-card select-none">
        <img src={item.before.src} alt={item.before.alt} className="block h-auto w-full" loading="lazy" />
        <img
          src={item.after.src}
          alt={item.after.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
          style={{ left: `${pos}%` }}
        />
        <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[11px] font-semibold text-white">
          {item.before.label}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[11px] font-semibold text-white">
          {item.after.label}
        </span>
        <label htmlFor={id} className="sr-only">
          {en ? 'Move to compare before and after' : 'Déplacer pour comparer avant et après'}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      {item.caption && <figcaption className="mt-3 text-sm leading-[1.6] text-text-muted">{item.caption}</figcaption>}
    </figure>
  )
}
