# Capture screenshots pour realisations

Script Playwright + sharp qui produit le budget d'images standard pour une realisation DKDP.

## Usage

```bash
node tools/realisations/capture.mjs --url https://goldencash.ch --slug goldencash-refonte
```

### Options

- `--sections 0.25,0.50,0.75` : positions de scroll (en pourcentage de la hauteur fullpage) pour les captures desktop. Defaut : `0.33,0.66,0.90`.
- `--mobile-sections 0.50` : idem pour mobile. Defaut : `0.50`.

## Sortie

```
public/images/realisations/<slug>/
  desktop.webp           # fullpage 1440x900 viewport
  mobile.webp            # fullpage 390x844 viewport
  og.png                 # 1200x630 OG image
  section-1.webp         # viewport @ scroll 33%
  section-2.webp         # viewport @ scroll 66%
  section-3.webp         # viewport @ scroll 90%
  mobile-section-1.webp  # viewport mobile @ scroll 50%
```

Toutes les images WebP en qualite 85, target 300 KB max (degradation par paliers de 5 jusqu'a quality 65).

## Pre-requis

- `sharp` installe via `npm install --save-dev sharp`
- Playwright deja present (dependance racine)
- Acces internet pour atteindre l'URL cible

## Captures de sections : `capture-sections.mjs`

`capture.mjs` produit les pages entieres (hero, mobile, OG). Les blocs **sections phare**
(`HighlightsShowcase`, `ScreenFrame`, `PhoneFrame`) attendent des vues **a la taille de
l'ecran**, une par section, avec parfois une action avant la capture (ouvrir le tunnel de
demande, defiler jusqu'a un bloc).

```bash
node tools/realisations/capture-sections.mjs --base https://sos-relevage.ch --slug sos-relevage --spec /tmp/shots.json
```

`shots.json` : `[{ "name", "url", "mobile"?, "scroll"?, "scrollTo"?, "offset"?, "click"?, "waitFor"? }]`.
Sortie WebP q82 dans `public/images/realisations/<slug>/`, 1440 px de large en desktop,
780 px en mobile. Le defilement est lent par construction : une section qui se revele a
l'intersection reste grise apres un saut direct.

Les captures du 2026-09-08 pour `sos-relevage` (hero, tunnel ouvert desktop et mobile,
urgence, qui appeler, references, blog, depannage, symptomes mobile) ont ete produites
avec ce protocole.

## Blocs optionnels d'une realisation (2026-09-08)

| Bloc | Champ | Composant |
|---|---|---|
| Sections phare (capture + mobile + texte, alternees, numerotees dans l'ordre du parcours) | `highlights[]` | `HighlightsShowcase` |
| Direction visuelle (logo sur sa couleur, palette, specimen dans la vraie police, principes) | `direction` | `VisualDirection` (charge Hubot Sans et JetBrains Mono, `fonts/`) |
| SEO et moteurs generatifs (apercu Google, donnees structurees, une page par intention, GEO) | `seo` | `SeoDirection` |
| Navigation collante entre les blocs presents | (derive) | `CaseStudyNav` |

Les trois blocs sont facultatifs : une realisation sans `highlights` garde le gabarit
d'origine. L'overlay EN (`en.ts`) les traduit bloc par bloc.

## Réalisations v2 (2026-09-25) : tous les domaines, preuves obligatoires

Le modèle (`src/lib/realisations/types.ts`) couvre désormais n'importe quel domaine
(`domains`, alignés sur les pages service dans `taxonomy.ts`), un secteur normalisé,
un niveau d'accord client (`consent`) et des résultats qui portent tous `source`,
`sourceKind` et `capturedAt`. Les règles sont vérifiées par
`src/lib/realisations/__tests__/proof.test.ts` : une étude en ligne qui les enfreint fait
échouer la suite (client nommé sans preuve d'accord, chiffre privé d'un client sans accord
écrit, relevé non daté, image manquante, tiret cadratin, étude absente du `llms.txt`,
accord « à confirmer » dont la date limite est passée).

Nouveaux blocs optionnels : `answer` et `facts` (en-tête), `flow` (`FlowDiagram`),
`videos` et `beforeAfter` (`CaseStudyMedia`), `dataStories` (`DataStory`, SVG statique +
tableau), `conversation` (`ChatReplay`), `training` (`TrainingBlock`), `lessons`, `faq`,
`relatedArticles`. Une étude sans site à capturer utilise `cover` et son `flow` prend la
place de la capture. La page anglaise n'existe que si l'étude a une entrée dans `en.ts`.

## Outils ajoutés le 2026-09-25

| Outil | Rôle |
|---|---|
| `block-tracking.mjs` | Coupe GA4, Ads, pixels et Vercel Insights pendant une capture ou une vidéo (une capture ne compte jamais comme une visite chez le client), et défile lentement pour révéler les sections |
| `render-flow-cover.mjs --spec specs/<slug>-cover.json` | Couverture 16:10 (`cover.webp`) et image de partage (`og.png`) d'une étude sans site, rendues depuis son flux dans la charte sombre |
| `record-video.mjs --spec specs/<slug>-<nom>.json` | Vidéo d'interaction scénarisée (Playwright), sortie MP4 H.264 + WebM VP9 + affiche WebP. Le champ `block` coupe les envois de formulaire : **jamais d'envoi réel** |

`capture.mjs` et `capture-sections.mjs` bloquent désormais les traceurs, et `capture.mjs`
défile lentement toute la page avant la capture pleine page (les sections révélées à
l'intersection restaient grises après un saut).

⚠️ Wayback Machine : l'archive du 15.03.2026 de goldencash.ch s'affiche sans feuille de
style. Ne jamais publier ce rendu comme « l'ancien site » ; capturer l'avant d'une refonte
AVANT la bascule du domaine (Integrali : site Tilda à capturer avant le 17.11.2026).
