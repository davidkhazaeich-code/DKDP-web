/**
 * Blog dark theme lock
 *
 * Le blog reste exclusivement en dark mode (decision produit) : la lecture
 * d'articles longs sur fond clair pose des problemes de fatigue oculaire et
 * casse la coherence visuelle du contenu (diagrammes, codes, images sombres
 * generes pour fond noir). On force `data-theme="dark"` sur le wrapper de
 * toutes les routes /blog/*, independamment du toggle global.
 *
 * Note : Header et Footer sont rendus dans le root layout, hors de ce
 * subtree, et conservent donc le theme global. C'est volontaire : le
 * "chrome" autour du contenu blog peut suivre la preference utilisateur,
 * seul le contenu blog est verrouille.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
