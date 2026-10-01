import localFont from 'next/font/local'
import { JetBrains_Mono, Roboto, Caveat } from 'next/font/google'
import { clsx } from 'clsx'
import { SectionReveal } from '@/components/ui/SectionReveal'
import type { RealisationDirection } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Direction visuelle d'une realisation : logo sur sa couleur, palette
 * mesuree, specimen typographique dans la vraie police, principes.
 *
 * Les polices du specimen sont chargees ici et nulle part ailleurs, en
 * sous-ensembles latins sous licence SIL OFL (`fonts/LICENSE-*.txt`) :
 * Hubot Sans (SOS Relevage), Teko, Barlow et Barlow Condensed (MKR Caucasian
 * Camp), plus JetBrains Mono, Roboto et Caveat (cours-informatique.ch) via
 * next/font. `preload: false` : un navigateur
 * ne telecharge que les fichiers dont la page affiche vraiment le texte.
 * Une famille absente de `FAMILY_TO_VAR` retombe sur la police du site, le
 * specimen reste lisible.
 *
 * `theme` porte les couleurs de la tuile du logo (charte du client) ; sans
 * lui, la tuile garde le bleu nuit et le bleu clair de SOS Relevage.
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

const teko = localFont({
  src: [{ path: './fonts/Teko-Bold.ttf', weight: '700', style: 'normal' }],
  display: 'swap',
  preload: false,
  variable: '--font-mkr-display',
  fallback: ['Impact', 'Arial Narrow', 'sans-serif'],
})

const barlow = localFont({
  src: [{ path: './fonts/Barlow-Medium.ttf', weight: '500', style: 'normal' }],
  display: 'swap',
  preload: false,
  variable: '--font-mkr-body',
  fallback: ['system-ui', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

const barlowCondensed = localFont({
  src: [{ path: './fonts/BarlowCondensed-SemiBold.ttf', weight: '600', style: 'normal' }],
  display: 'swap',
  preload: false,
  variable: '--font-mkr-label',
  fallback: ['Arial Narrow', 'system-ui', 'sans-serif'],
})

const jet = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
  preload: false,
  variable: '--font-sos-mono',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
  variable: '--font-ci-body',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
  preload: false,
  variable: '--font-ci-hand',
})

const FAMILY_TO_VAR: Record<string, string> = {
  'Hubot Sans': 'var(--font-sos-display), system-ui, sans-serif',
  'JetBrains Mono': 'var(--font-sos-mono), ui-monospace, Menlo, monospace',
  Teko: 'var(--font-mkr-display), Impact, sans-serif',
  Barlow: 'var(--font-mkr-body), system-ui, sans-serif',
  'Barlow Condensed': 'var(--font-mkr-label), system-ui, sans-serif',
  Roboto: 'var(--font-ci-body), system-ui, sans-serif',
  Caveat: 'var(--font-ci-hand), cursive',
}

/** Graisse du fichier charge pour chaque famille : le specimen ne simule jamais un gras. */
const FAMILY_WEIGHT: Record<string, { display: number; text: number }> = {
  'Hubot Sans': { display: 800, text: 500 },
  'JetBrains Mono': { display: 500, text: 500 },
  Teko: { display: 700, text: 700 },
  Barlow: { display: 500, text: 500 },
  'Barlow Condensed': { display: 600, text: 600 },
  Roboto: { display: 800, text: 400 },
  Caveat: { display: 500, text: 500 },
}

/** Arete d'un echantillon, lisible sur les deux themes : `--text` est blanc en sombre,
 *  presque noir en clair (le site n'utilise jamais le variant `dark:` de Tailwind). */
const EDGE = 'color-mix(in srgb, var(--text) 14%, transparent)'

/** Encre lisible sur une couleur : noir sur fond clair, blanc sur fond sombre (luminance relative). */
function inkOn(hex: string): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? '#141414' : '#FFFFFF'
}

/** Tuile du logo par defaut : bleu nuit et bleu clair de SOS Relevage. */
const DEFAULT_THEME = { tile: '#06223e', accent: '#46b0d6', lightTile: '#f2f0ec', taglineUppercase: false }

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
    logoLight: en ? 'On a light background' : 'Sur fond clair',
    palette: en ? 'Palette' : 'Palette',
    ratio: en ? 'Share of a typical screen' : "Part de chaque couleur dans un écran type",
    type: en ? 'Typography' : 'Typographie',
    principles: en ? 'Rules the site never breaks' : 'Les règles que le site ne casse jamais',
  }
  const theme = { ...DEFAULT_THEME, ...d.theme }
  const display = d.type[0]
  const taglineFamily = FAMILY_TO_VAR[display?.family ?? 'Hubot Sans'] ?? FAMILY_TO_VAR['Hubot Sans']
  const threeFamilies = d.type.length >= 3

  return (
    <section
      id="direction"
      className={clsx(
        'scroll-mt-[124px] border-t border-border py-20 md:py-28',
        hubot.variable,
        teko.variable,
        barlow.variable,
        barlowCondensed.variable,
        jet.variable,
        roboto.variable,
        caveat.variable,
      )}
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
            <div
              className="flex h-full min-h-[280px] flex-col justify-between rounded-2xl p-7 md:p-8"
              style={{ background: theme.tile }}
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: theme.accent }}>
                {t.logo}
              </span>
              {d.logo && (
                <img
                  src={d.logo.src}
                  alt={d.logo.alt}
                  loading="lazy"
                  decoding="async"
                  className="my-6 max-w-[60%] select-none"
                  style={{ width: theme.logoWidth ?? 180, maxWidth: theme.logoWidth ? '90%' : undefined }}
                />
              )}
              {d.tagline && (
                <p
                  className={clsx(
                    'text-white/90',
                    theme.taglineUppercase
                      ? 'text-[32px] uppercase leading-[1.05] tracking-[0.02em]'
                      : 'text-[22px] font-extrabold italic leading-[1.2]',
                  )}
                  style={{
                    fontFamily: taglineFamily,
                    fontWeight: theme.taglineUppercase ? FAMILY_WEIGHT[display?.family ?? '']?.display ?? 700 : undefined,
                  }}
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
                      className="block h-20 rounded-lg border sm:h-24"
                      style={{ background: c.hex, borderColor: EDGE }}
                    />
                    <span className="mt-2 block text-[12px] font-semibold leading-tight text-text">{c.name}</span>
                    <span className="block font-mono text-[10.5px] text-text-muted">{c.hex}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-text-secondary">{c.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          {/* Version claire du logo */}
          {d.logoLight && (
            <SectionReveal className={d.ratio ? 'md:col-span-5' : 'md:col-span-12'} delay={0.1}>
              <div
                className="flex h-full min-h-[200px] flex-col justify-between rounded-2xl border border-black/10 p-7 md:p-8"
                style={{ background: theme.lightTile }}
              >
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#5b5b57]">{t.logoLight}</span>
                <img
                  src={d.logoLight.src}
                  alt={d.logoLight.alt}
                  loading="lazy"
                  decoding="async"
                  className="mt-6 max-w-[60%] select-none"
                  style={{ width: theme.logoWidth ?? 180, maxWidth: theme.logoWidth ? '90%' : undefined }}
                />
              </div>
            </SectionReveal>
          )}

          {/* Proportions : combien d'ecran chaque famille de couleurs occupe */}
          {d.ratio && d.ratio.length > 0 && (
            <SectionReveal className={d.logoLight ? 'md:col-span-7' : 'md:col-span-12'} delay={0.12}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-6 md:p-7">
                <span className="text-xs uppercase tracking-wide text-text-muted">{t.ratio}</span>
                <div
                  className="mt-6 flex h-14 w-full overflow-hidden rounded-lg border"
                  style={{ borderColor: EDGE }}
                  role="img"
                  aria-label={d.ratio.map((r) => `${r.label} ${r.share} %`).join(', ')}
                >
                  {d.ratio.map((r) => (
                    <span
                      key={r.label}
                      className="flex h-full items-end whitespace-nowrap px-1.5 pb-2 font-mono text-[11px] font-semibold sm:px-2.5"
                      style={{ width: `${r.share}%`, background: r.hex, color: inkOn(r.hex) }}
                    >
                      {r.share >= 10 && <span aria-hidden="true">{r.share} %</span>}
                    </span>
                  ))}
                </div>
                <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                  {d.ratio.map((r) => (
                    <li key={r.label} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1 h-3 w-3 flex-shrink-0 rounded-sm border"
                        style={{ background: r.hex, borderColor: EDGE }}
                      />
                      <span className="text-[13px] leading-snug text-text-secondary">
                        <span className="font-mono text-[12px] font-semibold text-text">{r.share} %</span> {r.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          )}

          {/* Specimen typographique */}
          <SectionReveal className="md:col-span-12" delay={0.12}>
            <div className="rounded-2xl border border-border bg-bg-card p-6 md:p-8">
              <span className="text-xs uppercase tracking-wide text-text-muted">{t.type}</span>
              <div className="mt-6 grid gap-8 md:grid-cols-12">
                {d.type.map((tp, i) => {
                  const primary = i === 0
                  const caps = Boolean(tp.uppercase || tp.mono)
                  const weights = FAMILY_WEIGHT[tp.family]
                  return (
                    <div
                      key={tp.family}
                      className={clsx(
                        primary
                          ? threeFamilies
                            ? 'md:col-span-6'
                            : 'md:col-span-8'
                          : clsx(threeFamilies ? 'md:col-span-3' : 'md:col-span-4', 'md:border-l md:border-border md:pl-8'),
                      )}
                    >
                      <p
                        className="text-text"
                        style={{
                          fontFamily: FAMILY_TO_VAR[tp.family] ?? (tp.mono ? 'ui-monospace, Menlo, monospace' : 'inherit'),
                          fontSize: primary
                            ? tp.uppercase
                              ? 'clamp(40px, 5.6vw, 72px)'
                              : 'clamp(28px, 4vw, 48px)'
                            : caps
                              ? '14px'
                              : '19px',
                          fontWeight: primary ? weights?.display ?? 800 : weights?.text ?? 500,
                          letterSpacing: primary
                            ? tp.uppercase
                              ? '0.01em'
                              : '-0.02em'
                            : tp.mono
                              ? '0.14em'
                              : tp.uppercase
                                ? '0.2em'
                                : '0',
                          textTransform: caps ? 'uppercase' : 'none',
                          lineHeight: primary ? (tp.uppercase ? 0.95 : 1.08) : caps ? 1.6 : 1.45,
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
