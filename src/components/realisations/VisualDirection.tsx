import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'
import { clsx } from 'clsx'
import { SectionReveal } from '@/components/ui/SectionReveal'
import type { RealisationDirection } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Direction visuelle d'une realisation : logo sur sa couleur, palette
 * mesuree, specimen typographique dans la vraie police, principes.
 *
 * Les polices du specimen sont chargees ici et nulle part ailleurs : deux
 * graisses statiques de Hubot Sans (sous-ensembles de 15 Ko chacun, licence
 * SIL OFL, `fonts/LICENSE-HubotSans.txt`) et JetBrains Mono via next/font.
 * `preload: false` : elles ne servent qu'a ce bloc. Une famille absente de
 * `FAMILY_TO_VAR` retombe sur la police du site, le specimen reste lisible.
 */
const hubot = localFont({
  src: [
    { path: './fonts/HubotSans-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: './fonts/HubotSans-Medium.ttf', weight: '500', style: 'normal' },
  ],
  display: 'swap',
  preload: false,
  variable: '--font-sos-display',
  fallback: ['system-ui', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

const jet = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
  preload: false,
  variable: '--font-sos-mono',
})

const FAMILY_TO_VAR: Record<string, string> = {
  'Hubot Sans': 'var(--font-sos-display), system-ui, sans-serif',
  'JetBrains Mono': 'var(--font-sos-mono), ui-monospace, Menlo, monospace',
}

export function VisualDirection({
  d,
  clientName,
  lang = 'fr',
}: {
  d: RealisationDirection
  clientName: string
  lang?: Locale
}) {
  const en = lang === 'en'
  const t = {
    h2: en ? 'Visual direction' : 'Direction visuelle',
    logo: en ? 'Brand' : 'Marque',
    palette: en ? 'Palette' : 'Palette',
    type: en ? 'Typography' : 'Typographie',
    principles: en ? 'Rules the site never breaks' : 'Les règles que le site ne casse jamais',
  }

  return (
    <section
      id="direction"
      className={clsx('scroll-mt-[124px] border-t border-border py-20 md:py-28', hubot.variable, jet.variable)}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-[68ch]">
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">{t.h2}</h2>
          {d.intro && (
            <p className="mt-4 text-[17px] leading-[1.7] text-text-secondary md:text-lg">{d.intro}</p>
          )}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-12 md:gap-6">
          {/* Logo sur sa couleur : zone volontairement sombre, echelle blanche */}
          <SectionReveal className="md:col-span-5">
            <div className="flex h-full min-h-[280px] flex-col justify-between rounded-2xl bg-[#06223e] p-7 md:p-8">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#46b0d6]">{t.logo}</span>
              {d.logo && (
                <img
                  src={d.logo.src}
                  alt={d.logo.alt}
                  loading="lazy"
                  decoding="async"
                  className="my-6 w-[180px] max-w-[60%] select-none"
                />
              )}
              {d.tagline && (
                <p
                  className="text-[22px] font-extrabold italic leading-[1.2] text-white/90"
                  style={{ fontFamily: FAMILY_TO_VAR['Hubot Sans'] }}
                >
                  {d.tagline}
                </p>
              )}
            </div>
          </SectionReveal>

          {/* Palette */}
          <SectionReveal className="md:col-span-7" delay={0.08}>
            <div className="h-full rounded-2xl border border-border bg-bg-card p-6 md:p-7">
              <span className="text-xs uppercase tracking-wide text-text-muted">{t.palette}</span>
              <ul className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-7">
                {d.palette.map((c) => (
                  <li key={c.hex} className="min-w-0">
                    <span
                      aria-hidden="true"
                      className="block h-20 rounded-lg border border-black/10 sm:h-24"
                      style={{ background: c.hex }}
                    />
                    <span className="mt-2 block text-[12px] font-semibold leading-tight text-text">{c.name}</span>
                    <span className="block font-mono text-[10.5px] text-text-muted">{c.hex}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-text-secondary">{c.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          {/* Specimen typographique */}
          <SectionReveal className="md:col-span-12" delay={0.12}>
            <div className="rounded-2xl border border-border bg-bg-card p-6 md:p-8">
              <span className="text-xs uppercase tracking-wide text-text-muted">{t.type}</span>
              <div className="mt-6 grid gap-8 md:grid-cols-12">
                {d.type.map((tp, i) => {
                  const primary = i === 0
                  return (
                    <div
                      key={tp.family}
                      className={clsx(
                        primary ? 'md:col-span-8' : 'md:col-span-4 md:border-l md:border-border md:pl-8',
                      )}
                    >
                      <p
                        className="text-text"
                        style={{
                          fontFamily: FAMILY_TO_VAR[tp.family] ?? (tp.mono ? 'ui-monospace, Menlo, monospace' : 'inherit'),
                          fontSize: primary ? 'clamp(28px, 4vw, 48px)' : '14px',
                          fontWeight: primary ? 800 : 500,
                          letterSpacing: primary ? '-0.02em' : '0.14em',
                          textTransform: tp.mono ? 'uppercase' : 'none',
                          lineHeight: primary ? 1.08 : 1.6,
                          textWrap: 'balance',
                        }}
                      >
                        {tp.sample}
                      </p>
                      <p className="mt-4 text-sm leading-[1.6] text-text-secondary">
                        <span className="font-semibold text-text">{tp.family}</span> · {tp.role}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </SectionReveal>

          {/* Principes */}
          <div className="md:col-span-12">
            <h3 className="text-xs uppercase tracking-wide text-text-muted">
              {t.principles}
              <span className="sr-only"> ({clientName})</span>
            </h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {d.principles.map((p) => (
                <li key={p.title} className="rounded-2xl border border-border bg-bg-card p-5">
                  <p className="text-[15px] font-semibold text-text">{p.title}</p>
                  <p className="mt-2 text-sm leading-[1.6] text-text-secondary">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
