interface BadgeProps {
  children: React.ReactNode
  variant?: 'violet' | 'orange' | 'chrome' | 'muted'
  className?: string
  'data-testid'?: string
}

const variantClasses = {
  violet: 'text-violet-light',
  orange: 'text-orange',
  chrome: 'text-[#D4D4D8]',
  muted: 'text-text-muted',
}

export function Badge({
  children,
  variant = 'violet',
  className = '',
  'data-testid': testId,
}: BadgeProps) {
  return (
    <span
      className={`inline-block text-[11px] font-semibold uppercase tracking-[0.12em] ${variantClasses[variant]} ${className}`}
      data-testid={testId}
    >
      {children}
    </span>
  )
}
