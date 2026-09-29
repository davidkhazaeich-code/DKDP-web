import { clsx } from 'clsx'
import { Maximize2 } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { PhoneFrame } from './PhoneFrame'
import type { RealisationTouchpoints, RealisationTouchpoint } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * La marque en usage : les supports livres hors du site (affiche, reseaux,
 * couvertures de video, emails, outil interne), poses en mosaique sur une
 * grille de 12 colonnes. Chaque support est une vraie piece livree, jamais un
 * montage : l'image s'ouvre en grand dans un nouvel onglet.
 *
 * Un support a ratio fixe (`ratio`) tient en entier dans son cadre, centre,
 * ce qui aligne une affiche A3, une couverture 9:16 et un email sur une meme
 * rangee. Sans ratio, l'image garde le sien (bandeau large, capture d'ecran).
 */
const COLS: Record<NonNullable<RealisationTouchpoint['cols']>, string> = {
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  12: 'md:col-span-12',
}

const KIND: Record<RealisationTouchpoint['kind'], { fr: string; en: string }> = {
  imprime: { fr: 'Imprimé', en: 'Print' },
  reseaux: { fr: 'Réseaux sociaux', en: 'Social media' },
  video: { fr: 'Vidéo', en: 'Video' },
  email: { fr: 'Email', en: 'Email' },
  outil: { fr: 'Outil interne', en: 'Internal tool' },
  web: { fr: 'Site', en: 'Website' },
}

export function BrandTouchpoints({ t, lang = 'fr' }: { t: RealisationTouchpoints; lang?: Locale }) {
  const en = lang === 'en'
  return (
    <section id="supports" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-[68ch]">
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">{t.title}</h2>
          {t.intro && <p className="mt-4 text-[17px] leading-[1.7] text-text-secondary md:text-lg">{t.intro}</p>}
        </div>

        <ul className="mt-12 grid items-start gap-x-5 gap-y-10 md:grid-cols-12 md:gap-x-6">
          {t.items.map((it, i) => (
            <li key={it.src} className={clsx('min-w-0', COLS[it.cols ?? 6])}>
              <SectionReveal delay={Math.min(i % 3, 2) * 0.08}>
                <figure>
                  <a
                    href={it.src}
                    target="_blank"
                    rel="noopener"
                    className={clsx(
                      'group relative block overflow-hidden rounded-2xl border border-border',
                      it.ratio ? 'bg-[#0F0F0F] p-5 md:p-6' : 'bg-bg-card',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400',
                    )}
                    style={it.ratio ? { aspectRatio: it.ratio } : undefined}
                  >
                    {it.device === 'phone' ? (
                      <div className="flex h-full items-center justify-center">
                        <PhoneFrame
                          src={it.src}
                          alt={it.alt}
                          className="w-[46%] min-w-[150px] max-w-[230px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
                        />
                      </div>
                    ) : (
                      <img
                        src={it.src}
                        alt={it.alt}
                        loading="lazy"
                        decoding="async"
                        className={clsx(
                          'block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]',
                          it.ratio
                            ? 'h-full w-full object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]'
                            : 'h-auto w-full',
                        )}
                      />
                    )}
                    <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                      {KIND[it.kind][en ? 'en' : 'fr']}
                    </span>
                    <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Maximize2 className="h-3 w-3" aria-hidden="true" />
                      {en ? 'Open full size' : 'Ouvrir en grand'}
                    </span>
                  </a>
                  <figcaption className="mt-3 text-sm leading-[1.6] text-text-secondary">
                    <span className="font-semibold text-text">{it.label}.</span>
                    {it.caption && <> {it.caption}</>}
                    {it.credit && (
                      <span className="mt-1 block text-[12.5px] text-text-muted">
                        {en ? 'Footage: ' : 'Images : '}
                        {it.credit}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </SectionReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
