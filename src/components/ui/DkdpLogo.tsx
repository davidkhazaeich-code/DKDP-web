import Image from 'next/image'

interface DkdpLogoProps {
  /** 'full' = wordmark with brand text, 'simple' = pictogram only */
  variant?: 'full' | 'simple'
  width?: number
  height?: number
  /** Pass true on the Header logo for LCP priority */
  priority?: boolean
  className?: string
  alt?: string
}

/**
 * Theme-aware DKDP logo. Renders both white (dark mode) and black
 * (light mode) variants in the DOM. CSS hides the inactive one via
 * `data-theme` attribute on <html>.
 *
 * Why both variants always rendered :
 *   - Zero flash at toggle (both already decoded)
 *   - No re-render at toggle (display:none flip via CSS)
 *   - Server Component compatible (no hooks)
 *
 * Bundle cost : ~5-10 KB extra PNG cached after first paint.
 */
export function DkdpLogo({
  variant = 'full',
  width = 108,
  height = 36,
  priority = false,
  className = '',
  alt = 'DKDP',
}: DkdpLogoProps) {
  const dark  = variant === 'simple' ? 'dkdp_simple_blanc.png' : 'dkdp_blanc-croped.png'
  const light = variant === 'simple' ? 'dkdp_simple_noir.png'  : 'dkdp_noir-croped.png'

  return (
    <>
      <Image
        src={`/images/logo/${dark}`}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`block dark-only ${className}`.trim()}
      />
      <Image
        src={`/images/logo/${light}`}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`block light-only ${className}`.trim()}
      />
    </>
  )
}
