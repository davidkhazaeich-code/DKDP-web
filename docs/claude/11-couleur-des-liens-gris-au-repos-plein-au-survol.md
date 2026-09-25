# Couleur des liens : gris au repos, plein au survol

> Section déplacée telle quelle depuis `CLAUDE.md` le 2026-09-19 (workflow `nettoyage-contexte-claude.md` du DEV SPACE). Référence lue à la demande : elle ne se charge plus à chaque session. La compléter ici, pas dans CLAUDE.md.

**Regle unique pour tout lien textuel du site** (listes de navigation, mega menu, footer, plan
du site, liens en ligne dans un paragraphe, navigation alphabetique du glossaire) :

```jsx
className="text-text-secondary hover:text-text transition-colors"   // liens de navigation
className="text-text-muted hover:text-text transition-colors"       // liens secondaires (footer, villes, legal)
className="underline hover:text-text transition-colors"             // lien en ligne dans un paragraphe
```

`--text` vaut `#FFFFFF` en sombre et `#1A1A18` en clair : la meme paire de classes donne
gris → blanc en mode sombre et gris → noir en mode clair. Rien a dupliquer par theme.

**Ne jamais** poser `text-text` ou `text-white` comme etat de repos d'un lien : c'est ce qui
faisait cohabiter des liens blancs et des liens gris sur la meme page (corrige le 2026-08-24).
`hover:text-white` est un bug de mode clair (blanc sur creme), toujours `hover:text-text`.

**Exceptions assumees** (ce ne sont pas des liens textuels, on n'y touche pas) :

| Cas | Pourquoi |
|---|---|
| Titre `h3` / `p` d'une carte cliquable (services, villes, tarifs, blog) | C'est un titre, pas un libelle de lien. Il reste en `text-text` |
| Bouton CTA a fond plein (`EstimationBanner`, boutons violets/oranges) | Texte blanc sur fond colore, cf. regle boutons colores |
| Valeurs de la carte contact (`GoogleMapSection`) | `tel:` et `mailto:` sont des valeurs de donnees alignees sur les lignes non cliquables |
| Icone LinkedIn des formateurs | `hover:text-[#0A66C2]` = couleur de marque, volontaire |

**Verification** : `node tools/audit-white-links.mjs` liste les liens qui violent la regle
(couleur pleine au repos, survol mort, survol vers autre chose que `--text`). Les cartes et
boutons sont masques par defaut, `--all` les affiche. `node tools/audit-link-colors.mjs [url]`
fait la meme chose en live sur les deux themes via Playwright.

> `text-text-primary` **n'existe pas** dans le systeme de tokens (`@theme` n'expose que
> `--color-text`, `--color-text-secondary`, `--color-text-muted`). Toute classe
> `text-text-primary` / `hover:text-text-primary` est silencieusement ignoree par Tailwind :
> c'est un survol mort. Utiliser `text-text`.

### Zones volontairement sombres dans les deux themes

Une section qui pose son propre fond sombre en dur ne doit **pas** utiliser les tokens de
texte : `--text` devient `#1A1A18` en mode clair, donc du texte quasi noir sur un fond noir.
Dans ces zones, utiliser l'echelle blanche (`text-white`, `text-white/70`, `text-white/45`)
et faire le survol vers `hover:text-white`.

| Zone | Fond en dur |
|---|---|
| `CinematicCTA` (bas des pages Realisations) | `bg-[#09090B]` |
| `BrowserFrame` (mockup de navigateur) | `bg-[#0E0E10]` et `bg-[#1B1B1F]` |
| Hero des pages villes | photo + voile sombre (`ImageHeroBg` / `VideoHeroBg`) |

Partout ailleurs dans `components/realisations/`, les tokens s'appliquent normalement : le
module a ete migre en mode clair le 2026-08-24 (titres, bordures de section, cartes).

---

