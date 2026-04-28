/**
 * AppLogos — composants reutilisables pour afficher des logos d'apps/outils
 *
 * 3 variantes selon le besoin :
 *   - <AppLogoBadge />    : icone seule dans une card carre/circulaire
 *   - <AppLogoPill />     : icone + nom inline (pill arrondi)
 *   - <AppLogoMarquee />  : bandeau defilant infini de pills
 *   - <AppLogoGrid />     : grille statique responsive (idem pour SEO sans defile)
 *
 * Toutes les variantes respectent le dark theme DKDP : fond `rgba(255,255,255,0.04)`,
 * border `rgba(255,255,255,0.10)`, hover subtil. Compatible serveur (Server Components).
 */

import Image from 'next/image'

export interface AppLogo {
  /** Chemin SVG dans public/images/logos/ (ex: 'logo-chatgpt.svg') */
  file: string
  /** Nom affiche a cote / en aria-label (ex: 'ChatGPT') */
  name: string
}

// ─── Catalogues pretes a l'emploi ─────────────────────────────────────────

export const IA_LOGOS: AppLogo[] = [
  { file: 'logo-chatgpt.svg', name: 'ChatGPT' },
  { file: 'logo-claude.svg', name: 'Claude' },
  { file: 'logo-gemini.svg', name: 'Gemini' },
  { file: 'logo-copilot.svg', name: 'Copilot' },
  { file: 'logo-perplexity.svg', name: 'Perplexity' },
  { file: 'logo-midjourney.svg', name: 'Midjourney' },
  { file: 'logo-grok.svg', name: 'Grok' },
  { file: 'logo-meta-ai.svg', name: 'Meta AI' },
  { file: 'logo-deepseek.svg', name: 'DeepSeek' },
  { file: 'logo-gamma.svg', name: 'Gamma' },
  { file: 'logo-nano-banana.svg', name: 'Nano Banana' },
]

export const PRODUCTIVITE_LOGOS: AppLogo[] = [
  { file: 'logo-notion.svg', name: 'Notion' },
  { file: 'logo-slack.svg', name: 'Slack' },
  { file: 'logo-zoom.svg', name: 'Zoom' },
  { file: 'logo-teams.svg', name: 'Teams' },
  { file: 'logo-google-meet.svg', name: 'Google Meet' },
  { file: 'logo-gmail.svg', name: 'Gmail' },
  { file: 'logo-google-drive.svg', name: 'Google Drive' },
  { file: 'logo-google-docs.svg', name: 'Google Docs' },
  { file: 'logo-google-sheets.svg', name: 'Google Sheets' },
  { file: 'logo-google-slides.svg', name: 'Google Slides' },
  { file: 'logo-dropbox.svg', name: 'Dropbox' },
  { file: 'logo-icloud.svg', name: 'iCloud' },
  { file: 'logo-onedrive.svg', name: 'OneDrive' },
]

export const BUREAUTIQUE_LOGOS: AppLogo[] = [
  { file: 'logo-word.svg', name: 'Word' },
  { file: 'logo-excel.svg', name: 'Excel' },
  { file: 'logo-powerpoint.svg', name: 'PowerPoint' },
  { file: 'logo-outlook.svg', name: 'Outlook' },
]

export const DESIGN_WEB_LOGOS: AppLogo[] = [
  { file: 'logo-canva.svg', name: 'Canva' },
  { file: 'logo-figma.svg', name: 'Figma' },
  { file: 'logo-wordpress.svg', name: 'WordPress' },
  { file: 'logo-elementor.svg', name: 'Elementor' },
]

export const SOCIAL_LOGOS: AppLogo[] = [
  { file: 'logo-linkedin.svg', name: 'LinkedIn' },
  { file: 'logo-instagram.svg', name: 'Instagram' },
  { file: 'logo-facebook.svg', name: 'Facebook' },
  { file: 'logo-tiktok.svg', name: 'TikTok' },
  { file: 'logo-youtube.svg', name: 'YouTube' },
  { file: 'logo-x.svg', name: 'X' },
]

/** Catalogue large pour marquee multi-categories (agence, formation tous publics) */
export const ALL_TOOLS_LOGOS: AppLogo[] = [
  ...IA_LOGOS,
  ...PRODUCTIVITE_LOGOS,
  ...BUREAUTIQUE_LOGOS,
  ...DESIGN_WEB_LOGOS,
  ...SOCIAL_LOGOS,
]

// ─── Composants ────────────────────────────────────────────────────────────

interface BadgeProps {
  logo: AppLogo
  size?: number
  className?: string
}

/** Petite card carree avec juste l'icone, hover subtil. */
export function AppLogoBadge({ logo, size = 56, className = '' }: BadgeProps) {
  const inner = Math.round(size * 0.55)
  return (
    <div
      className={`inline-flex items-center justify-center rounded-2xl border transition-colors ${className}`}
      style={{
        width: size,
        height: size,
        background: 'rgba(255,255,255,0.04)',
        borderColor: 'rgba(255,255,255,0.10)',
      }}
      title={logo.name}
    >
      <Image
        src={`/images/logos/${logo.file}`}
        alt={logo.name}
        width={inner}
        height={inner}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

interface PillProps {
  logo: AppLogo
  size?: 'sm' | 'md' | 'lg'
  className?: string
  ariaHidden?: boolean
}

const PILL_SIZES = {
  sm: { h: 38, icon: 18, font: '0.8125rem', px: 10, gap: 6 },
  md: { h: 46, icon: 22, font: '0.875rem', px: 14, gap: 8 },
  lg: { h: 54, icon: 28, font: '0.95rem', px: 18, gap: 10 },
} as const

/** Pill arrondi avec icone a gauche et nom a droite. */
export function AppLogoPill({ logo, size = 'md', className = '', ariaHidden = false }: PillProps) {
  const s = PILL_SIZES[size]
  return (
    <div
      className={`inline-flex items-center rounded-full border transition-colors ${className}`}
      style={{
        height: s.h,
        paddingLeft: s.px - 4,
        paddingRight: s.px,
        gap: s.gap,
        background: 'rgba(255,255,255,0.04)',
        borderColor: 'rgba(255,255,255,0.10)',
      }}
      aria-hidden={ariaHidden || undefined}
    >
      <Image
        src={`/images/logos/${logo.file}`}
        alt={ariaHidden ? '' : logo.name}
        width={s.icon}
        height={s.icon}
        loading="lazy"
        decoding="async"
        style={{ flexShrink: 0 }}
      />
      <span
        style={{
          fontSize: s.font,
          fontWeight: 500,
          color: '#e4e4e7',
          whiteSpace: 'nowrap',
          letterSpacing: '0.005em',
        }}
      >
        {logo.name}
      </span>
    </div>
  )
}

interface MarqueeProps {
  logos: AppLogo[]
  /** Duree d'un cycle complet en secondes. Plus haut = plus lent. */
  durationSeconds?: number
  /** Taille des pills */
  size?: 'sm' | 'md' | 'lg'
  /** Eyebrow optionnel au-dessus du marquee */
  eyebrow?: string
  className?: string
}

/**
 * Marquee defilant infini de pills "icone + nom".
 * - Le 1er passage est SEO-indexable (alt + name visibles)
 * - Le 2e passage est duplique pour le defile (aria-hidden)
 * - Pause au hover, mask fade aux bords
 * - Respecte prefers-reduced-motion (overflow auto, pas d'animation)
 */
export function AppLogoMarquee({
  logos,
  durationSeconds = 90,
  size = 'md',
  eyebrow,
  className = '',
}: MarqueeProps) {
  // Repetition adaptative : si peu de logos, on multiplie la liste pour
  // s'assurer qu'une "moitie" du track est plus large que l'ecran (sinon
  // le translateX(-50%) laisse apparaitre du vide entre les cycles).
  // Cible : au moins 18 elements par moitie de boucle.
  const minPerHalf = 18
  const baseRepeat = Math.max(1, Math.ceil(minPerHalf / logos.length))
  const visible = Array.from({ length: baseRepeat }, () => logos).flat()
  // 1ere demi-boucle = "visible" (premier passage : seul logos.length premiers
  // ont alt visible pour SEO). 2eme demi-boucle = duplicat aria-hidden pour
  // le defile sans couture.
  const doubled = [...visible, ...visible]
  return (
    <div className={`app-logos-marquee ${className}`}>
      {eyebrow && (
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#71717a',
            margin: '0 0 1.75rem',
          }}
        >
          {eyebrow}
        </p>
      )}
      <div className="app-logos-marquee__track">
        <div
          className="app-logos-marquee__row"
          style={{ animationDuration: `${durationSeconds}s` }}
        >
          {doubled.map((logo, i) => (
            <AppLogoPill
              key={`${logo.file}-${i}`}
              logo={logo}
              size={size}
              ariaHidden={i >= logos.length}
            />
          ))}
        </div>
      </div>
      <style>{`
        .app-logos-marquee {
          width: 100%;
        }
        .app-logos-marquee__track {
          position: relative;
          width: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
                  mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
        }
        .app-logos-marquee__row {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: app-logos-marquee-scroll linear infinite;
          will-change: transform;
        }
        .app-logos-marquee:hover .app-logos-marquee__row {
          animation-play-state: paused;
        }
        @keyframes app-logos-marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .app-logos-marquee__row { animation: none; }
          .app-logos-marquee__track { overflow-x: auto; }
        }
        @media (max-width: 700px) {
          .app-logos-marquee__row { gap: 8px; }
        }
      `}</style>
    </div>
  )
}

interface GridProps {
  logos: AppLogo[]
  /** Nb min de colonnes (grid-template-columns: repeat(auto-fit, minmax(...))) */
  minColPx?: number
  className?: string
}

/** Grille statique responsive (auto-fit), aucune animation. */
export function AppLogoGrid({ logos, minColPx = 130, className = '' }: GridProps) {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minColPx}px, 1fr))`,
        gap: '12px',
      }}
    >
      {logos.map((logo) => (
        <AppLogoPill key={logo.file} logo={logo} size="md" className="app-logos-grid__pill" />
      ))}
      <style>{`
        .app-logos-grid__pill {
          justify-content: center;
        }
      `}</style>
    </div>
  )
}
