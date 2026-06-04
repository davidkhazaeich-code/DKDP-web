/**
 * EN blog dark theme lock, mirrors the FR /blog layout.
 * Long-form reading stays in dark mode for visual consistency with diagrams
 * and dark-generated images. Forces data-theme="dark" on the /en/blog subtree.
 */
export default function BlogLayoutEN({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-theme="dark"
      className="min-h-screen"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {children}
    </div>
  )
}
