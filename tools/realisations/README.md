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

## Réalisations v3 (2026-09-25, soir) : mises en scène, vidéos, mouvement

| Outil | Rôle |
|---|---|
| `render-mockup.mjs --spec specs/<slug>-mockup.json` | Met de **vraies captures** en scène, jamais un écran inventé. Mises en page `laptop-phone` (ordinateur + téléphone), `laptop`, `documents` (pages A4 en éventail) et `slides` (slides 16:9 en pile, la première devant). Sortie `<name>.webp` 1600x1000 et, avec `"og": true`, `<name>-og.png` 1200x630 (renommé en `og.png` pour l'aperçu social) |
| `capture.mjs --css "<règles>" --only desktop,mobile` | Masque un widget tiers (bulle d'avis Trustindex : `.ti-widget{display:none!important}`) et ne réécrit que les sorties demandées (`desktop`, `og`, `sections`, `mobile`, `mobile-sections`) |
| `capture-sections.mjs` : champ `css` | Même masquage, capture par capture |
| `record-video.mjs` : actions `clickIfVisible`, `retype`, `scrollTo`, `css` | Fermer une fenêtre qui n'apparaît pas à chaque visite, retaper un champ, défiler en douceur jusqu'à un élément, injecter du CSS |

⚠️ `render-mockup.mjs` passe les images en data URI : une page créée par `setContent` n'a
pas le droit de lire des fichiers `file://`, et le mockup sortait vide.

Nouveaux champs du modèle : `hero.desktopView` et `hero.mobileView` (premiers écrans à la
taille de l'écran, pour la scène d'appareils), `mockup` (composition pour le hub et les
cartes), `cover.lead` (remplacé le 29.09.2026 par `heroStack`, voir plus bas), `showcase` (titre et intro
des sections phares), `highlights[].image.host`, `gallery[].document` (pages de livrable
posées comme des feuilles). `studyVisual()` (`src/lib/realisations/visual.ts`) choisit le
visuel d'une étude hors de sa page : mockup, sinon couverture, sinon premier écran.

Composants : `DeviceStage` (page entière qui défile dans le navigateur, téléphone devant,
parallaxe Motion), `CoverStage` (retiré le 29.09.2026), `HubHeroVisual` (mises en scène en fondu, pause au survol),
`CardMedia` (vidéo au survol à la souris), `CountUp` (chiffres qui défilent, valeur finale
au rendu serveur), grille bento `bentoLayout()` (rangées toujours pleines, testée),
`SectionReveal variant="wipe"` (courbe et frise qui se tracent). Tout s'arrête avec
`prefers-reduced-motion`.

⚠️ `SectionReveal variant="wipe"` : le clip-path vit sur un enfant (`.wipe-inner`). Un
élément rogné à 100 % par son propre clip-path n'intersecte jamais : IntersectionObserver ne
le voit pas entrer et la courbe restait invisible.

⚠️ Serveur de dev dans un worktree : après une modification de `globals.css`, le CSS servi
peut rester l'ancien, même après un redémarrage. Vérifier le CSS servi
(`curl -s localhost:<port>/_next/static/chunks/...css | grep <classe>`) et supprimer `.next`
du worktree s'il est périmé.

## Étude MKR Caucasian Camp (2026-09-29) : correctifs et options

| Outil | Ajout |
|---|---|
| `capture.mjs` | `--wait domcontentloaded --settle 5000` : un site qui diffuse une vidéo en fond n'atteint jamais `networkidle` (mkrcamp.com). Au-delà de 12 000 px de haut, la page entière se capture par tranches assemblées : d'un seul tenant, Chrome dépasse sa limite de texture (16 384 px) et laisse une bande vide à droite |
| `capture-sections.mjs` | Champs `hover`, `eval` (script dans la page, ex. placer une vidéo à une seconde précise) et `wait` ; options `--locale fr-CH` (langue et indicatif du navigateur), `--channel chrome` (Google Chrome installé : le Chromium de Playwright ne lit pas le H.264, une vidéo MP4 resterait sur son affiche) et `--only nom1,nom2` |
| `record-video.mjs` | Champs `locale` et `channel`, actions `hover`, `select` et `eval`. Avec `channel: "chrome"`, la fenêtre reçoit `--window-size` (sans lui, bande grise d'environ 90 px en bas de la vidéo). ⚠️ Filmer un formulaire avec le Chromium de Playwright : dans Chrome, la saisie peut se bloquer sur les suggestions de saisie automatique |

⚠️ Corrigé le 29.09.2026 : l'action `type` visait l'élément qui contient déjà `text` (le texte à taper) au lieu du champ `selector`, et attendait 30 secondes avant d'échouer. `type` et `retype` visent maintenant `selector`.

Nouveaux champs du modèle : `touchpoints` (bloc « La marque, hors du site », `BrandTouchpoints` : affiche, réseaux, couvertures vidéo, email, outil, en mosaïque sur 12 colonnes, `ratio` pour aligner une rangée, `device: "phone"` pour un email), `direction.theme` (couleurs de la tuile du logo), `direction.logoLight` (logo pour fond clair), `direction.ratio` (part de chaque couleur dans un écran type), `direction.type[].uppercase`, et `seo.serpNote` / `seo.schemasNote` (commentaires propres au site). Polices du spécimen MKR : Teko, Barlow et Barlow Condensed en sous-ensembles OFL dans `src/components/realisations/fonts/`.

Back-office d'un client : jamais de vraie fiche. Pour MKR, capture sur le faux backend du repo (`npm run admin:dev` dans un worktree, connexion par `POST /api/admin/login` avec le jeton de test du README du mock, `nextjs-portal{display:none!important}` pour masquer le badge de développement de Next). Email transactionnel : rendu par la fonction du repo (`buildVisioEmail`, lancée avec `node --experimental-strip-types --import ./scripts/_alias-hook.mjs`) avec un candidat fictif, puis capturé.

## Hero des études de cas (2026-09-29)

Retour de David : « beaucoup de texte, pas d'image, ça ne donne pas envie de voir la suite »,
et un titre entièrement en dégradé. Le premier écran d'une étude montre désormais le travail
livré, et le dégradé ne couvre plus que quelques mots.

| Élément | Où | Règle |
|---|---|---|
| Hero | `CaseStudyHero` | Client (logo ou nom, lieu), H1 en couleur du texte, accroche, trois prestations au plus, deux actions. Texte vers 57 %, visuel vers 43 % ; sur mobile, une image passe avant le texte, un schéma après |
| Mots en dégradé | `meta.titleAccent` + `.rz-accent` (`realisations-hero.css`) | Sous-chaîne exacte du titre, moins de la moitié de sa longueur (`proof.ts`). Teintes plus denses en mode clair. Le titre du hub suit la même règle |
| Accroche | `lead` | 30 mots au plus, rien qui ne figure déjà dans l'étude. La réponse directe (`answer`) et la fiche projet passent sous le hero (`CaseStudySummary`) |
| Visuel | `CaseStudyHeroVisual`, choix dans `src/lib/realisations/hero.ts` | Site : premier écran (`hero.desktopView`) dans un navigateur fixe et téléphone devant ; livrable : deux pages de la galerie (`heroStack: 'pages'` en A4, `'slides'` en 16:9), la première devant ; sinon le flux, le programme de formation, puis la couverture |
| Pastille de preuve | `heroProof()` | Premier résultat de l'étude, avec « au <date> ». Sur les images seulement, dès la tablette |
| Page entière du site | `SiteStage` (`#site`) | La scène d'appareils qui défile vient après l'approche, images chargées à l'approche de l'écran |

Mouvement : kit dg-* en mode `hero`. Le grand visuel (candidat LCP) est peint tout de suite ;
seuls le téléphone, la première page et la pastille entrent. Mesuré le 29.09.2026 sur le build
local : LCP = l'image du hero, CLS 0, hydratation propre.

⚠️ Une traduction anglaise porte aussi `lead` et `meta.titleAccent` : le test
`proof.test.ts` échoue sinon (un mot en dégradé absent du titre anglais serait ignoré, une
accroche française resterait sur la page anglaise).

⚠️ Serveur de dev de Next 16 : une étude déjà rendue peut revenir du cache de pré-rendu
(`x-nextjs-cache: HIT`) après une modification de composant serveur. Arrêter le serveur,
supprimer `.next`, relancer.

## Images de présentation (2026-09-30)

Demande de David : une image de présentation par projet, dans l'univers de la marque, avec
ordinateur et smartphone modernes (références concurrentes : scènes de produit avec le logo du
client). Chaque étude a `public/images/realisations/<slug>/presentation.webp` (1600x1000, WebP q84)
et un `og.png` (1200x630) tiré de la même scène, référencés par `mockup` : hub, cartes, études
liées et JSON-LD.

| Étape | Outil |
|---|---|
| Écrans en haute définition, PNG sans perte (ordinateur 1512x950 en 2x, téléphone 393x798 en 3x) | `capture-hd.mjs --spec shots.json --out <dossier>` |
| Scène générée, écrans en aplat de couleur d'incrustation (vert, magenta si le décor a du vert) | Gemini 3 Pro Image, MCP `nanobanana`, `model_tier: pro`, 4K, 16:9, deux variantes |
| Incrustation en perspective, barre d'état, reflets, retouches, vrai logo, exports | `tools/scene_presentation.py` du DEV SPACE |

Règle de preuve : le décor est une mise en scène générée, jamais un lieu réel du client ; les
écrans montrent de vraies captures ou de vrais livrables (jamais une interface inventée) ; le
logo est le vrai fichier, posé à l'export, jamais dessiné par le modèle. L'alt le dit (« vraies
captures mises en scène »). `mockup.focus` (CSS `object-position`) cadre la photo sur les
écrans dans la cellule large du hub, qui la rogne ; sans `focus`, la cellule garde l'ancien
rendu entier et fondu, fait pour les compositions sur fond sombre.

Procédure, gabarit de prompt, contrôle qualité et pièges : `workflows/image-presentation-realisation.md`
du DEV SPACE. Scènes 4K, captures, logos, polices et specs des huit premières images :
`clients Claude/DKDP/assets/presentations-realisations/` (recomposer sans régénérer).

## Survol du visuel tournant du hub (2026-09-30)

Demande de David : au survol des images qui défilent en tête de `/realisations`, quelques
informations qui donnent envie d'en savoir plus sur la mise en place, plutôt qu'un simple
« Lire ». Chaque étude porte `teaser` : deux ou trois points de ce qui a été mis en place,
60 caractères au plus chacun, sans chiffre qui ne figure pas déjà dans l'étude.

| Contexte | Rendu (`HubHeroVisual`) |
|---|---|
| Souris ou pavé tactile (`hover: hover`) | Panneau qui monte du bas de l'image au survol et au focus clavier : « Mis en place », les points, le premier résultat daté (`heroProof`), « Lire l'étude ». Rotation en pause |
| Écran tactile (`hover: none`) | Mêmes points et même résultat sous l'image, rotation ralentie à 7,5 s pour laisser lire |
| Lecteur d'écran | Le panneau sur l'image est masqué (`aria-hidden`) ; le lien est décrit par le bloc sous l'image (`aria-describedby`), qui porte le même texte |

`proof.ts` exige désormais, pour toute étude en ligne, l'image de présentation (`mockup`,
règle `presentation`) et le survol (`teaser`, règles `teaser` et `teaser-length`) ; une étude
traduite porte aussi son `teaser` anglais dans `en.ts` (test « traductions anglaises »).

## Liens vers le site livré (2026-10-01)

Demande de David : sur les pages de réalisation, des liens vers les sites réalisés, dans un
nouvel onglet, aux endroits utiles. Tout part de `liveUrl` (et de `image.path` des sections
phares), rien à écrire étude par étude :

| Endroit | Rendu |
|---|---|
| Hero | Bouton « Visiter le site » (existait) et fenêtre de navigateur cliquable, « Ouvrir le site » au survol |
| Fiche projet | Ligne « Site en ligne » avec le domaine |
| Le site, de haut en bas | « Parcourir le site en ligne » sous l'intro |
| Sections phares | « Voir la page en ligne » (ou « Voir sur la page d'accueil ») vers la page exacte de la capture ; l'adresse s'affiche dès la tablette |

`SiteLink` : `target="_blank"`, `rel="noopener"` sans `noreferrer` (le client voit les visites
venues de dkdp.ch dans ses statistiques), « nouvel onglet » pour les lecteurs d'écran.
`src/lib/realisations/links.ts` : jamais de lien pour une étude anonyme, ni vers un espace privé
(`/admin`, `/pro`, `/app`, connexion), même quand sa capture illustre l'étude (back-office MKR).
