import React from 'react'

/**
 * Claude AI logo icon — matches the Lucide icon interface (size, style, className).
 * Renders the Claude sparkle/starburst shape as an inline SVG.
 */
export function ClaudeIcon({
  size = 24,
  style,
  className,
}: {
  size?: number
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
    >
      {/* Claude starburst — 6-point radial sparkle */}
      <path
        d="M12 2C12 2 13.2 7.2 14.5 9.5C15.8 11.8 21 12 21 12C21 12 15.8 12.2 14.5 14.5C13.2 16.8 12 22 12 22C12 22 10.8 16.8 9.5 14.5C8.2 12.2 3 12 3 12C3 12 8.2 11.8 9.5 9.5C10.8 7.2 12 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  )
}
