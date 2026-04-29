export type Theme = 'dark' | 'light'

/**
 * Applies a theme to the document root. Mutates :
 *   - <html data-theme="...">
 *   - <html style="color-scheme: ...">
 *   - <meta name="theme-color" content="..."> (if present)
 *
 * Pure DOM side effect, no React. Safe to call from inline scripts and event handlers.
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.style.colorScheme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#0A0A0A' : '#FAFAF7')
  }
}
