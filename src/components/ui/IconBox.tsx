interface IconBoxProps {
  children: React.ReactNode
  variant?: 'violet' | 'orange'
  size?: number
  className?: string
  'data-testid'?: string
}

export function IconBox({
  children,
  variant = 'violet',
  size = 52,
  className = '',
  'data-testid': testId,
}: IconBoxProps) {
  const bg = variant === 'violet' ? 'rgba(124,58,237,0.10)' : 'rgba(255,107,0,0.10)'

  return (
    <div
      data-testid={testId}
      className={`flex items-center justify-center rounded-[14px] flex-shrink-0 ${className}`}
      style={{ width: size, height: size, background: bg }}
    >
      {children}
    </div>
  )
}
