interface GradTagProps {
  children: React.ReactNode
  className?: string
}

export function GradTag({ children, className = '' }: GradTagProps) {
  return <span className={`grad-tag ${className}`}>{children}</span>
}
