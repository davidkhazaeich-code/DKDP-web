interface ImagePlaceholderProps {
  title: string
  aspectRatio?: string
  className?: string
}

export function ImagePlaceholder({
  title,
  aspectRatio = '16/9',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      data-testid="image-placeholder"
      className={`bg-bg-card border border-dashed border-border rounded-[12px] flex items-center justify-center ${className}`}
      style={{ aspectRatio }}
    >
      <p className="text-text-muted text-xs text-center px-4 py-6">
        [Image : {title}]
      </p>
    </div>
  )
}
