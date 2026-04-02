type GradTextTag = 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p'

interface GradTextProps {
  children: React.ReactNode
  as?: GradTextTag
  className?: string
  style?: React.CSSProperties
}

export function GradText({ children, as: Tag = 'span', className = '', style }: GradTextProps) {
  return <Tag className={`grad-text ${className}`} style={style}>{children}</Tag>
}
