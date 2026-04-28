interface TrustLineProps {
  items: string[]
  accentRgb?: string
  align?: 'start' | 'center'
  className?: string
}

export function TrustLine({
  items,
  accentRgb = '167, 139, 250',
  align = 'start',
  className = '',
}: TrustLineProps) {
  const justify = align === 'center' ? 'justify-center' : 'justify-start'
  return (
    <ul
      className={`mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted ${justify} ${className}`}
      aria-label="Garanties et engagements"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-1.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="flex-shrink-0"
            style={{ color: `rgb(${accentRgb})` }}
          >
            <path
              d="M11.5 4 5.75 9.75 2.5 6.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
