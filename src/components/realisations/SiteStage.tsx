import { DeviceStage } from './DeviceStage'
import type { RealisationHero } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * « Le site, de haut en bas » (2026-09-29) : la scene d'appareils en grand,
 * page d'accueil entiere dans le navigateur et premier ecran mobile devant.
 * Elle ouvrait la page en v3 ; le hero montre desormais le premier ecran, et
 * cette scene vient apres l'approche pour qui veut parcourir toute la page.
 */
export function SiteStage({
  hero,
  clientName,
  lang = 'fr',
}: {
  hero: RealisationHero
  clientName: string
  lang?: Locale
}) {
  const en = lang === 'en'
  return (
    <section id="site" className="scroll-mt-[124px] border-t border-border pb-8 pt-20 md:pb-12 md:pt-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {en ? 'The site, top to bottom' : 'Le site, de haut en bas'}
        </h2>
        <p className="mt-3 max-w-[68ch] text-[17px] leading-[1.7] text-text-secondary">
          <span className="[@media(hover:none)]:hidden">
            {en
              ? 'The whole home page as it appears on a computer: hover over the window to scroll through it.'
              : "Toute la page d'accueil, telle qu'elle s'affiche sur un ordinateur : survolez la fenêtre pour la faire défiler."}
          </span>
          <span className="hidden [@media(hover:none)]:inline">
            {en
              ? 'The whole home page as it appears on a computer: it scrolls by itself once on screen.'
              : "Toute la page d'accueil, telle qu'elle s'affiche sur un ordinateur : elle défile d'elle-même une fois à l'écran."}
          </span>
        </p>
      </div>
      <DeviceStage
        desktop={hero.desktopFull}
        browserUrl={hero.browserUrl}
        alt={en ? `${clientName}: the whole home page` : `${clientName} : la page d'accueil entière`}
        phone={
          hero.mobileView
            ? {
                src: hero.mobileView,
                alt: en ? `${clientName} on a phone: first screen` : `${clientName} sur téléphone : premier écran`,
              }
            : undefined
        }
      />
    </section>
  )
}
