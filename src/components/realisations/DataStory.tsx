import { SectionReveal } from '@/components/ui/SectionReveal'
import { formatDateShort, formatSwissInt } from '@/lib/format'
import type { RealisationDataStory } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Courbe datee d'une realisation : une serie reelle (Search Console, GA4,
 * Ads...), sa source, sa date de releve et son tableau de donnees.
 *
 * Rendu serveur, sans librairie. Le trace est un SVG etire
 * (`preserveAspectRatio="none"`, trait a epaisseur constante) et les libelles
 * sont en HTML positionne en pourcentage : ils gardent leur taille de texte
 * sur mobile au lieu de retrecir avec le dessin. Le tableau replie sous la
 * courbe rend chaque point lisible par un moteur et par un lecteur d'ecran.
 *
 * Mouvement (v3) : la grille est posee, puis la courbe se trace de gauche a
 * droite en entrant a l'ecran (SectionReveal variant="wipe", un clip-path) et
 * les reperes apparaissent ensuite. Sans mouvement si le visiteur le demande.
 */
const W = 1000
const H = 300

function dayNumber(iso: string): number {
  return Math.round(Date.parse(`${iso}T12:00:00Z`) / 86_400_000)
}

/** Pas « rond » (1, 2 ou 5 x 10^k) pour environ trois graduations. */
function niceStep(max: number): number {
  const raw = Math.max(max, 1) / 3
  const pow = 10 ** Math.floor(Math.log10(raw))
  const unit = raw / pow
  return (unit <= 1 ? 1 : unit <= 2 ? 2 : unit <= 5 ? 5 : 10) * pow
}

export function DataStory({ story, lang = 'fr' }: { story: RealisationDataStory; lang?: Locale }) {
  const en = lang === 'en'
  const pts = story.series
  if (pts.length < 2) return null

  const d0 = dayNumber(pts[0].date)
  const d1 = dayNumber(pts[pts.length - 1].date)
  const span = Math.max(d1 - d0, 1)
  const max = Math.max(...pts.map((p) => p.value))
  const step = niceStep(max)
  const top = Math.ceil(max / step) * step || step
  const ticks = Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step)

  const xPct = (iso: string) => ((dayNumber(iso) - d0) / span) * 100
  const yPct = (v: number) => 100 - (v / top) * 100
  const x = (iso: string) => (xPct(iso) / 100) * W
  const y = (v: number) => (yPct(v) / 100) * H

  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.date).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ')
  const area = `${line} L${W},${H} L0,${H} Z`
  const first = pts[0]
  const last = pts[pts.length - 1]
  const peak = pts.reduce((a, b) => (b.value > a.value ? b : a))
  const titleId = `ds-title-${story.id}`
  const descId = `ds-desc-${story.id}`
  const desc = en
    ? `${story.title}: from ${formatSwissInt(first.value)} on ${formatDateShort(first.date)} to ${formatSwissInt(last.value)} on ${formatDateShort(last.date)}, peak of ${formatSwissInt(peak.value)} on ${formatDateShort(peak.date)}.`
    : `${story.title} : de ${formatSwissInt(first.value)} le ${formatDateShort(first.date)} à ${formatSwissInt(last.value)} le ${formatDateShort(last.date)}, sommet de ${formatSwissInt(peak.value)} le ${formatDateShort(peak.date)}.`

  return (
    <figure className="rounded-2xl border border-border bg-bg-card p-5 md:p-7">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span id={titleId} className="text-[17px] font-semibold text-text">
          {story.title}
        </span>
        <span className="text-sm text-text-muted">
          {en ? 'Latest value' : 'Dernière valeur'} : <b className="font-semibold text-text">{formatSwissInt(last.value)}</b> {story.unit}
        </span>
      </figcaption>

      <div className="relative mt-8 h-[220px] pl-12 md:h-[300px]">
        {/* Graduations : HTML, taille de texte constante */}
        {ticks.map((t) => (
          <span
            key={t}
            className="absolute left-0 w-10 -translate-y-1/2 text-right text-[11px] tabular-nums text-text-muted"
            style={{ top: `${yPct(t)}%` }}
            aria-hidden="true"
          >
            {formatSwissInt(t)}
          </span>
        ))}

        <div className="relative h-full w-full">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            {ticks.map((t) => (
              <line
                key={t}
                x1={0}
                x2={W}
                y1={y(t)}
                y2={y(t)}
                style={{ stroke: 'var(--border)' }}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {(story.annotations ?? []).map((a) => (
              <line
                key={a.date}
                x1={x(a.date)}
                x2={x(a.date)}
                y1={0}
                y2={H}
                style={{ stroke: 'var(--border-strong)' }}
                strokeWidth={1}
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          <SectionReveal variant="wipe" threshold={0.35} className="absolute inset-0">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
              role="img"
              aria-labelledby={`${titleId} ${descId}`}
            >
              <desc id={descId}>{desc}</desc>
              <path d={area} style={{ fill: 'var(--violet-bg)' }} />
              <path
                d={line}
                fill="none"
                style={{ stroke: 'var(--violet)' }}
                strokeWidth={2.5}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </SectionReveal>

          {(story.annotations ?? []).map((a, i) => {
            const left = xPct(a.date)
            const alignRight = left > 60
            // Une ligne par annotation : deux reperes proches ne se recouvrent jamais.
            const top = i * 28
            return (
              <div
                key={a.date}
                className="absolute max-w-[45%]"
                style={{
                  top,
                  ...(alignRight ? { right: `${100 - left}%`, marginRight: 6 } : { left: `${left}%`, marginLeft: 6 }),
                }}
              >
                <SectionReveal delay={0.9 + i * 0.25}>
                  <span className="block rounded-md border border-border bg-bg px-2 py-1 text-[11px] leading-tight text-text-secondary">
                    <b className="font-semibold text-text">{formatDateShort(a.date).slice(0, 5)}</b> {a.label}
                  </span>
                </SectionReveal>
              </div>
            )
          })}
        </div>

        <div className="absolute -bottom-6 left-12 right-0 flex justify-between text-[11px] tabular-nums text-text-muted" aria-hidden="true">
          <span>{formatDateShort(first.date)}</span>
          <span>{formatDateShort(last.date)}</span>
        </div>
      </div>

      <p className="mt-12 text-sm leading-[1.6] text-text-muted">
        {en ? 'Source' : 'Source'} : {story.source}, {en ? 'retrieved on' : 'relevé du'} {formatDateShort(story.capturedAt)}. {story.period}.
        {story.caption ? ` ${story.caption}` : ''}
      </p>

      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-text-secondary transition-colors hover:text-text">
          {en ? 'See the data' : 'Voir les données'}
        </summary>
        <div className="mt-3 max-h-72 overflow-auto rounded-xl border border-border">
          <table className="w-full text-left text-[13px] tabular-nums">
            <caption className="sr-only">{story.title}</caption>
            <thead className="sticky top-0 bg-bg-card">
              <tr className="border-b border-border text-text-muted">
                <th scope="col" className="px-4 py-2 font-medium">Date</th>
                <th scope="col" className="px-4 py-2 text-right font-medium">{story.unit}</th>
              </tr>
            </thead>
            <tbody>
              {pts.map((p) => (
                <tr key={p.date} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-1.5 text-text-secondary">{formatDateShort(p.date)}</td>
                  <td className="px-4 py-1.5 text-right text-text">{formatSwissInt(p.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  )
}

/** Section qui empile les courbes d'une realisation. */
export function DataStories({ stories, lang = 'fr' }: { stories: RealisationDataStory[]; lang?: Locale }) {
  if (stories.length === 0) return null
  const en = lang === 'en'
  return (
    <section id="courbes" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {en ? 'The numbers, over time' : 'Les chiffres dans le temps'}
        </h2>
        <p className="mt-3 max-w-[68ch] text-[17px] leading-[1.7] text-text-secondary">
          {en
            ? 'Every curve shows its source, its retrieval date and its raw data.'
            : 'Chaque courbe donne sa source, sa date de relevé et ses données brutes.'}
        </p>
        <div className="mt-10 grid gap-6">
          {stories.map((s) => (
            <DataStory key={s.id} story={s} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
