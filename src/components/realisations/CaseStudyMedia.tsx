import { ScreenVideo } from './ScreenVideo'
import { BeforeAfterSlider } from './BeforeAfterSlider'
import type { RealisationBeforeAfter, RealisationVideo } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * « En mouvement » : les videos d'interaction et les avant/apres d'une
 * realisation, dans une meme section. Rien ne s'affiche sans media.
 */
export function CaseStudyMedia({
  videos = [],
  beforeAfter = [],
  host,
  lang = 'fr',
}: {
  videos?: RealisationVideo[]
  beforeAfter?: RealisationBeforeAfter[]
  host?: string
  lang?: Locale
}) {
  if (videos.length === 0 && beforeAfter.length === 0) return null
  const en = lang === 'en'
  return (
    <section id="en-mouvement" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {en ? 'See it in action' : 'En mouvement'}
        </h2>
        <p className="mt-3 max-w-[68ch] text-[17px] leading-[1.7] text-text-secondary">
          {en
            ? 'Recorded on the live site, without editing.'
            : 'Enregistré sur le site en ligne, sans montage.'}
        </p>
        <div
          className={
            videos.length + beforeAfter.length > 1 ? 'mt-10 grid gap-10 lg:grid-cols-2' : 'mt-10 max-w-[960px]'
          }
        >
          {videos.map((v) => (
            <ScreenVideo key={v.src} video={v} host={host} lang={lang} />
          ))}
          {beforeAfter.map((b) => (
            <BeforeAfterSlider key={b.after.src} item={b} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
