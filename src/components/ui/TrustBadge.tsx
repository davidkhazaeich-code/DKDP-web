'use client'

import { useEffect, useRef, useState } from 'react'

const identityMatrix =
  '1, 0, 0, 0, ' +
  '0, 1, 0, 0, ' +
  '0, 0, 1, 0, ' +
  '0, 0, 0, 1'

const maxRotate = 0.25
const minRotate = -0.25
const maxScale = 1
const minScale = 0.97

// Original rainbow spectrum — overlay on light, screen on dark
const OVERLAY_COLORS = [
  'hsl(358, 100%, 62%)',
  'hsl(30, 100%, 50%)',
  'hsl(60, 100%, 50%)',
  'hsl(96, 100%, 50%)',
  'hsl(233, 85%, 47%)',
  'hsl(271, 85%, 47%)',
  'hsl(300, 20%, 35%)',
  'transparent',
  'transparent',
  'white',
]

const W = 248
const H = 54
const FONT = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"

type ME = { clientX: number; clientY: number }

interface TrustBadgeProps {
  variant?: 'light' | 'dark'
  scale?: number
}

function useBadgeInteraction() {
  const ref = useRef<HTMLDivElement>(null)
  const [firstOverlayPos, setFirstOverlayPos] = useState(0)
  const [matrix, setMatrix] = useState(identityMatrix)
  const [currentMatrix, setCurrentMatrix] = useState(identityMatrix)
  const [disableInOut, setDisableInOut] = useState(true)
  const [disableOverlay, setDisableOverlay] = useState(false)
  const [timeoutDone, setTimeoutDone] = useState(false)
  const enterTo = useRef<ReturnType<typeof setTimeout>>(null)
  const leaveTo1 = useRef<ReturnType<typeof setTimeout>>(null)
  const leaveTo2 = useRef<ReturnType<typeof setTimeout>>(null)
  const leaveTo3 = useRef<ReturnType<typeof setTimeout>>(null)

  const getDims = () => {
    const r = ref.current?.getBoundingClientRect()
    return { left: r?.left ?? 0, right: r?.right ?? 0, top: r?.top ?? 0, bottom: r?.bottom ?? 0 }
  }

  const calcMatrix = (clientX: number, clientY: number) => {
    const { left, right, top, bottom } = ref.current?.getBoundingClientRect() ?? { left: 0, right: 0, top: 0, bottom: 0 }
    const xC = (left + right) / 2
    const yC = (top + bottom) / 2
    const hw = xC - left
    const hh = yC - top
    const scale = [
      maxScale - (maxScale - minScale) * Math.abs(xC - clientX) / hw,
      maxScale - (maxScale - minScale) * Math.abs(yC - clientY) / hh,
      maxScale - (maxScale - minScale) * (Math.abs(xC - clientX) + Math.abs(yC - clientY)) / (hw + hh),
    ]
    const r = {
      x1: 0.25 * ((yC - clientY) / yC - (xC - clientX) / xC),
      x2: maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left),
      y2: maxRotate - (maxRotate - minRotate) * (top - clientY) / (top - bottom),
      z0: -(maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left)),
      z1: 0.2 - (0.2 + 0.6) * (top - clientY) / (top - bottom),
    }
    return `${scale[0]}, 0, ${r.z0}, 0, ${r.x1}, ${scale[1]}, ${r.z1}, 0, ${r.x2}, ${r.y2}, ${scale[2]}, 0, 0, 0, 0, 1`
  }

  const oppositeMatrix = (m: string, clientY: number, onEnter?: boolean) => {
    const { top, bottom } = getDims()
    const oppY = bottom - clientY + top
    const w = onEnter ? 0.7 : 4
    const mul = onEnter ? -1 : 1
    return m.split(', ').map((v, i) => {
      if (i === 2 || i === 4 || i === 8) return String(-parseFloat(v) * mul / w)
      if (i === 0 || i === 5 || i === 10) return '1'
      if (i === 6) return String(mul * (maxRotate - (maxRotate - minRotate) * (top - oppY) / (top - bottom)) / w)
      if (i === 9) return String((maxRotate - (maxRotate - minRotate) * (top - oppY) / (top - bottom)) / w)
      return v
    }).join(', ')
  }

  const handleEnter = (e: ME) => {
    if (leaveTo1.current) clearTimeout(leaveTo1.current)
    if (leaveTo2.current) clearTimeout(leaveTo2.current)
    if (leaveTo3.current) clearTimeout(leaveTo3.current)
    setDisableOverlay(true)
    const { left, right, top, bottom } = getDims()
    setDisableInOut(false)
    enterTo.current = setTimeout(() => setDisableInOut(true), 350)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setFirstOverlayPos((Math.abs((left + right) / 2 - e.clientX) + Math.abs((top + bottom) / 2 - e.clientY)) / 1.5)
    }))
    const m = calcMatrix(e.clientX, e.clientY)
    setMatrix(oppositeMatrix(m, e.clientY, true))
    setTimeoutDone(false)
    setTimeout(() => setTimeoutDone(true), 200)
  }

  const handleMove = (e: ME) => {
    const { left, right, top, bottom } = getDims()
    setTimeout(() => setFirstOverlayPos((Math.abs((left + right) / 2 - e.clientX) + Math.abs((top + bottom) / 2 - e.clientY)) / 1.5), 150)
    if (timeoutDone) setCurrentMatrix(calcMatrix(e.clientX, e.clientY))
  }

  const handleLeave = (e: ME) => {
    if (enterTo.current) clearTimeout(enterTo.current)
    const opp = oppositeMatrix(matrix, e.clientY)
    setCurrentMatrix(opp)
    setTimeout(() => setCurrentMatrix(identityMatrix), 200)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setDisableInOut(false)
      leaveTo1.current = setTimeout(() => setFirstOverlayPos(-firstOverlayPos / 4), 150)
      leaveTo2.current = setTimeout(() => setFirstOverlayPos(0), 300)
      leaveTo3.current = setTimeout(() => { setDisableOverlay(false); setDisableInOut(true) }, 500)
    }))
  }

  useEffect(() => {
    if (timeoutDone) setMatrix(currentMatrix)
  }, [currentMatrix, timeoutDone])

  return { ref, firstOverlayPos, matrix, disableInOut, disableOverlay, handleEnter, handleMove, handleLeave }
}

export function TrustBadge({ variant = 'light', scale = 1 }: TrustBadgeProps) {
  const id = variant // 'light' | 'dark' — used to namespace SVG filter/gradient IDs
  const { ref, firstOverlayPos, matrix, disableInOut, disableOverlay, handleEnter, handleMove, handleLeave } = useBadgeInteraction()

  const keyframes = OVERLAY_COLORS.map((_, i) => `
    @keyframes tb${id}Overlay${i + 1} {
      0%   { transform: rotate(${i * 10}deg); }
      50%  { transform: rotate(${(i + 1) * 10}deg); }
      100% { transform: rotate(${i * 10}deg); }
    }
  `).join('')

  const isLight = variant === 'light'

  // Light theme tokens
  const bg         = isLight ? '#ddd'                          : '#111214'
  const innerBorder= isLight ? '#bbb'                          : 'rgba(124,58,237,0.35)'
  const plateFrom  = isLight ? '#C8C8C8'                       : '#252530'
  const plateTo    = isLight ? '#B6B6B6'                       : '#1A1A24'
  const plateStroke= isLight ? 'rgba(255,255,255,0.45)'        : 'rgba(167,139,250,0.18)'
  const crossFill  = isLight ? '#999'                          : '#38384A'
  const crossHiW   = isLight ? 'rgba(255,255,255,0.85)'        : 'rgba(167,139,250,0.60)'
  const crossShadow= isLight ? 'rgba(0,0,0,0.40)'             : 'rgba(0,0,0,0.80)'
  const divider    = isLight ? '#bbb'                          : 'rgba(124,58,237,0.30)'
  const labelColor = isLight ? '#666'                          : '#A78BFA'
  const mainColor  = isLight ? '#555'                          : 'rgba(255,255,255,0.92)'
  const blendMode     = isLight ? 'overlay' : 'screen'
  const overlayOpacity = isLight ? '0.5'   : '0.07'

  return (
    <div
      ref={ref}
      className="inline-block select-none"
      onMouseEnter={handleEnter as React.MouseEventHandler<HTMLDivElement>}
      onMouseMove={handleMove as React.MouseEventHandler<HTMLDivElement>}
      onMouseLeave={handleLeave as React.MouseEventHandler<HTMLDivElement>}
    >
      <style>{keyframes}</style>
      <div
        style={{
          transform: `perspective(700px) matrix3d(${matrix})`,
          transformOrigin: 'center center',
          transition: 'transform 200ms ease-out',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${W} ${H}`}
          width={Math.round(W * scale)}
          height={Math.round(H * scale)}
          style={{ display: 'block' }}
        >
          <defs>
            <filter id={`tb-${id}-blur`}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
            <filter id={`tb-${id}-engrave`} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur" />
              <feOffset in="blur" dx="-1.2" dy="-1.2" result="h-off" />
              <feOffset in="blur" dx="1.2" dy="1.2" result="s-off" />
              <feFlood floodColor={crossHiW} result="white" />
              <feFlood floodColor={crossShadow} result="black" />
              <feComposite in="white" in2="h-off" operator="in" result="highlight" />
              <feComposite in="black" in2="s-off" operator="in" result="shadow" />
              <feMerge>
                <feMergeNode in="highlight" />
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <mask id={`tb-${id}-mask`}>
              <rect width={W} height={H} fill="white" rx="10" />
            </mask>
            <linearGradient id={`tb-${id}-plate`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={plateFrom} />
              <stop offset="100%" stopColor={plateTo} />
            </linearGradient>
          </defs>

          {/* Badge background */}
          <rect width={W} height={H} rx="10" fill={bg} />
          {/* Inner border */}
          <rect x="4" y="4" width={W - 8} height={H - 8} rx="8" fill="transparent" stroke={innerBorder} strokeWidth="1" />

          {/* Swiss cross — engraved metal plate */}
          <g transform="translate(10, 9)">
            <rect width="36" height="36" rx="5" fill={`url(#tb-${id}-plate)`} />
            <rect width="36" height="36" rx="5" fill="none" stroke={plateStroke} strokeWidth="0.8" />
            <g filter={`url(#tb-${id}-engrave)`}>
              <rect x="6" y="14" width="24" height="8" rx="1.5" fill={crossFill} />
              <rect x="14" y="6" width="8" height="24" rx="1.5" fill={crossFill} />
            </g>
          </g>

          {/* Vertical divider */}
          <line x1="54" y1="13" x2="54" y2="41" stroke={divider} strokeWidth="1" />

          {/* Top label */}
          <text fontFamily={FONT} fontSize="8" fontWeight="700" fill={labelColor} x="62" y="22" letterSpacing="0.10em">
            AGENCE DIGITALE · GENÈVE
          </text>

          {/* Main text */}
          <text fontFamily={FONT} fontSize="14.5" fontWeight="700" fill={mainColor} x="62" y="41" letterSpacing="-0.01em">
            Service 100% Suisse
          </text>

          {/* Holographic overlay */}
          <g style={{ mixBlendMode: blendMode as React.CSSProperties['mixBlendMode'] }} mask={`url(#tb-${id}-mask)`}>
            {OVERLAY_COLORS.map((color, i) => (
              <g
                key={i}
                style={{
                  transform: `rotate(${firstOverlayPos + i * 10}deg)`,
                  transformOrigin: 'center center',
                  transition: !disableInOut ? 'transform 200ms ease-out' : 'none',
                  animation: disableOverlay ? 'none' : `tb${id}Overlay${i + 1} 5s infinite`,
                  willChange: 'transform',
                }}
              >
                <polygon
                  points={`0,0 ${W},${H} ${W},0 0,${H}`}
                  fill={color}
                  filter={`url(#tb-${id}-blur)`}
                  opacity={overlayOpacity}
                />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}
