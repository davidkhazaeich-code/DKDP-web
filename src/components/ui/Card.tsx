interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'grad'
  hoverable?: boolean
  padding?: 'sm' | 'md' | 'lg'
  className?: string
  'data-testid'?: string
}

const paddingClasses = { sm: 'p-4', md: 'p-6', lg: 'p-8' }

export function Card({
  children,
  variant = 'default',
  hoverable = false,
  padding = 'md',
  className = '',
  'data-testid': testId,
}: CardProps) {
  if (hoverable) {
    return (
      <div className={`hover-grad ${paddingClasses[padding]} ${className}`} data-testid={testId}>
        {children}
      </div>
    )
  }

  if (variant === 'grad') {
    return (
      <div className={`grad-border ${paddingClasses[padding]} ${className}`} data-testid={testId}>
        {children}
      </div>
    )
  }

  return (
    <div
      className={`bg-bg-card border border-[rgba(124,58,237,0.12)] rounded-[12px] transition-all duration-200 ease-out ${paddingClasses[padding]} ${className}`}
      data-testid={testId}
    >
      {children}
    </div>
  )
}
