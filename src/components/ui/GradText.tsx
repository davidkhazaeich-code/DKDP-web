type GradTextTag = 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p'

interface GradTextProps {
  children: React.ReactNode
  as?: GradTextTag
  className?: string
}

export function GradText({ children, as: Tag = 'span', className = '' }: GradTextProps) {
  return <Tag className={`grad-text ${className}`}>{children}</Tag>
}
