# Diagrammes animés : kit dg-* (2026-09-29)

Les visuels dessinés en code (maquettes de hero, entonnoirs, piles, flux, barres) bougent
« de manière logique » : un rapport se remplit, un flux parcourt ses étapes, un chiffre
défile jusqu'à sa valeur. Demande de David le 29.09.2026 : plus moderne, sans casser les
performances ni le référencement.

## Principe : CSS pour le mouvement, 1 petit composant client pour le moment

| Fichier | Rôle |
|---|---|
| `src/components/motion/diagram-motion.css` | Tous les effets (keyframes, boucles, compteur, infobulle). Chargé seulement par les pages qui ont un diagramme |
| `src/components/motion/diagram-motion.ts` | Moteur : pose `data-dg-armed`, `data-dg-play`, `data-dg-live` sur la racine au bon moment (un IntersectionObserver par racine) |
| `src/components/motion/DiagramMotion.tsx` | Racine client (`<DiagramMotion mode="view" | "hero">`) ; les enfants restent des composants serveur |
| `src/components/motion/dg.tsx` | Helpers serveur : `dg(i, at, vars)`, `<DgCount>`, `<DgTip>` |
| `src/components/motion/StepConnector.tsx` | Ligne directrice des rangées d'étapes (30 pages FR et EN) |
| `tools/qa-diagrammes-animes.mjs` | QA image par image + comparaison de l'état final avec la prod |

Garanties, testées par le script de QA :
- **Le HTML servi est l'état final.** Sans JS, pour Google, un lecteur d'écran ou
  l'impression, tout est visible et juste (le compteur garde la vraie valeur dans le DOM).
- **Au repos, rendu identique à avant** (écart mesuré contre la prod : < 0,05 % de pixels).
- **Zéro CLS** : seuls transform, opacity et clip-path bougent ; le chiffre qui défile est
  un pseudo-élément posé sur le vrai nombre, qui garde sa largeur.
- **Rien ne tourne hors écran** : les boucles ne vivent que sous `data-dg-live`.
- **`prefers-reduced-motion`** : état final immédiat (règle `animation: none` dans le kit ;
  la règle globale de `globals.css` garde les délais, elle ne suffit pas).
- **Jamais de bloc masqué sans JS ni de bloc sauté invisible** : une racine armée joue dès
  qu'elle entre à l'écran OU qu'elle est déjà passée au-dessus (ancre, position restaurée).

## Modes de la racine

- `view` (défaut) : joue en arrivant à l'écran. Une racine déjà peinte à l'écran au moment de
  l'hydratation n'est pas armée : elle ne disparaît jamais sous les yeux du lecteur.
- `hero` : visuel de la colonne de droite du hero. Dès 1024 px il joue au premier affichage,
  en CSS pur (pas d'attente du JS). En dessous, il est empilé sous le texte : comme `view`.
  Ne jamais animer l'opacité d'un grand texte ou d'une image du hero (candidat LCP).

## Écrire une séquence

```tsx
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { DgCount, DgTip, dg } from '@/components/motion/dg'

<DiagramMotion className="…classes d'origine de la racine…" style={{ '--dg-loop-start': '2s' } as React.CSSProperties}>
  <p className="dg-fade …" style={dg(0, 100)}>Titre</p>                     {/* à 100 ms */}
  {rows.map((r, i) => (
    <div key={r.id} className="dg-rise …" style={dg(i, 200)}>…</div>      /* 200 ms + i × 90 ms */
  ))}
  <div className="dg-grow-x …" style={{ ...dg(i, 350, { '--dg-dur': '1000ms' }), width: '54%' }} />
  <span><DgCount to={87} i={i} at={400} />%</span>                          {/* l'unité reste dehors */}
</DiagramMotion>
```

- `dg(i, at, vars)` : `--dg-i` (rang), `--dg-at` (ms), autres variables (`--dg-dur`,
  `--dg-step` = pas entre rangs, 90 ms par défaut, `--dg-origin`, `--dg-y`, `--dg-x`).
  `--dg-at`, `--dg-i`, `--dg-step` et `--dg-dur` s'héritent : un groupe peut porter le décalage
  et le tempo, ses enfants leur rang. `--dg-origin`, `--dg-x` et `--dg-y` ne s'héritent pas
  (propriétés enregistrées) : l'origine d'une carte ne passe pas à ses barres.
- **Une seule classe d'entrée par élément** (elles posent toutes `animation`). Pour
  combiner une entrée et une boucle (carte qui apparaît puis flotte) : deux éléments
  imbriqués, `dg-float` sur l'enveloppe, `dg-pop` sur la carte.
- Ordre de lecture = ordre d'animation. Pas de 60 à 140 ms. Une séquence de hero se termine
  vers 2 à 2,5 s, un diagramme sous le pli vers 1,5 à 2 s.
- Pas de nouveau texte ni de nouveau chiffre : on anime ce qui existe (règle « aucun chiffre
  non sourcé », test `chiffres-non-sources`). Une infobulle explique un terme, sans chiffre.

## Effets

Entrées (une fois, `backwards` : après la fin, l'élément reprend ses styles, survol compris) :

| Classe | Effet | Défaut |
|---|---|---|
| `dg-rise` | fondu en montant de `--dg-y` (10 px) | 600 ms, `--ease-entry` |
| `dg-fade` | fondu | 500 ms |
| `dg-pop` | fondu + échelle 0,9 → 1, origine `--dg-origin` | 420 ms |
| `dg-slide` | fondu en glissant de `--dg-x` (-10 px) | 560 ms |
| `dg-grow-x` / `dg-grow-y` | barre qui se remplit depuis la gauche / le bas | 900 / 800 ms |
| `dg-wipe` | révélation de gauche à droite (clip-path), dégradé intact | 900 ms |
| `dg-type` | frappe au clavier, `--dg-steps` = nombre de caractères | 700 ms |
| `dg-draw` | trait SVG qui se dessine (l'élément porte `pathLength={1}`) | 1000 ms |
| `dg-strike` | valeur barrée : le trait se tire, puis le `line-through` réel reprend | 380 ms |
| `<DgCount to from align>` | entier qui défile ; `align` = `end` (unité après), `start` (« #3 »), `center` | 1300 ms |

Calques (se cumulent avec une entrée ; l'élément porte `relative`) :
- `dg-light` (::after) : éclat de bordure au passage du flux, décalé par `--dg-light-at`,
  couleur `--dg-accent`.

Boucles (seulement à l'écran ; délai = `--dg-loop-start` hérité + `--dg-loop-at` propre) :
- `dg-float` : carte flottante qui respire (6 s, 4 px). Déphaser avec `--dg-loop-at: -3s`.
- `dg-travel-x` / `dg-travel-y` : impulsion le long d'un trait. Le span est posé dans le
  trait (positionné) ; voyage pendant 45 % de `--dg-loop` puis se repose. `--dg-dot`,
  `--dg-trail` (+ classe `dg-trail` pour une traînée), `--dg-travel-ease: linear` pour caler
  des éclats dessus.
- `dg-beat` (::before) : éclat en boucle calé sur l'impulsion (même `--dg-loop`,
  `--dg-loop-at` = instant du passage moins 6 % du cycle).
- `dg-ping` (::after) : onde autour d'un point « en direct » (l'élément porte `relative`).
- Couleurs par pilier : classes `dg-tone-violet`, `dg-tone-orange`, `dg-tone-chrome`,
  `dg-tone-green` (point et halo lisibles en sombre et en clair).

Infobulle : hôte `className="dg-tip-host"` + `tabIndex={0}` + `aria-describedby={id}`,
enfant `<DgTip id={id} side? align?>`. Survol souris, focus clavier, tap au doigt (le moteur
pose `data-open`), Échap ou tap ailleurs referme. Hôte proche d'un bord `overflow-hidden` :
`align="start"`.

## QA avant de pousser

```bash
npm run dev -- --port 3107   # ou next start sur un build
node tools/qa-diagrammes-animes.mjs --base http://localhost:3107 --ref https://dkdp.ch \
  --out /tmp/qa-dg --pad 32 --times 0,200,450,700,1000,1400,1900,2600 [--loops 0,800,1600] \
  "/agence-digitale/seo@section.pt-28 .relative.flex.flex-col.gap-4"
```

Relire la planche (`…--planche.png`) : l'ordre raconte-t-il quelque chose ? Rien ne se
superpose en transparence ? L'état final doit rester sous 0,05 % d'écart avec la prod (au-delà,
ouvrir `…--diff.png`). Refaire en `--mobile` et `--light` pour un visuel de hero. Le script
défile à la molette : Lenis ramène un `scrollTo` programmé à sa position.

## Pièges rencontrés

- Safari interpole un `<integer>` enregistré en décimal, et `counter-reset: n 11.7` est
  invalide : le compteur affichait 0. Déclarer `--dg-n` en `<number>` et écrire
  `counter-reset: dg-n calc(var(--dg-n))` (calc arrondit dans un contexte entier).
- Le pseudo-élément du compteur hérite `color: transparent` de l'hôte : masquer le texte de
  l'hôte avec `-webkit-text-fill-color`, remis à `currentcolor` sur le pseudo.
- `content: … / ''` (texte alternatif vide, pour ne pas lire le chiffre deux fois) est refusé
  par Safari < 17.4 : garder la déclaration sans `/ ''` juste avant, sans `var()` dedans.
- Un visuel de hero sous le pli sur mobile aurait fini son entrée avant l'hydratation : d'où
  le mode `hero` (CSS au premier affichage dès 1024 px seulement).
- `getAnimations()` ne rend plus une animation `backwards` terminée : impossible de la
  rembobiner après coup, on ne la lance donc pas hors écran.
- Une infobulle centrée sous un conteneur `overflow-hidden` est rognée : `align="start"`.
- Une variable CSS non enregistrée s'hérite : `--dg-origin: right top` posé sur une carte
  faisait pousser ses barres depuis la droite. D'où les `@property … inherits: false`.
- `dg-draw` avec `stroke-dasharray: 1` laissait un point au départ de l'anneau avant le tracé
  (bord du tiret, capuchon rond) : trou de 2 et départ à 1,05.
- Un visuel de hero qui dépasse de 16 à 34 px sous le pli d'un téléphone comptait comme « vu » :
  jamais animé. Tolérance de 60 px (`EDGE_TOLERANCE`) avant de le considérer à l'écran.
- `clip-path` ne s'interpole pas de `inset()` vers `none` : un balayage sans borne `to` en
  `inset(0 0 0 0)` apparaît d'un coup à mi-course (trouvé à la QA, `dg-wipe` et `dg-type`).
- Un `dg-rise` dans un conteneur `overflow-x-auto` (tableau) le rend défilable en hauteur
  pendant 600 ms (barre de défilement sous Windows) : `dg-fade` dans ce cas.
- Le compilateur CSS (Lightning CSS, via Next et Tailwind 4) **supprime la propriété
  `translate` quand `transform` est déclaré dans la même règle** : l'infobulle n'était plus
  centrée. Tout déplacement passe par `transform` (avec une variable pour la part fixe).
