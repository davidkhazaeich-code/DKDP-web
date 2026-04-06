# Portfolio Showcase System : Sites Demo par Secteur

**Date** : 6 avril 2026
**Projet** : DKDP.ch - Realisations portfolio + 10 landing pages demo

---

## Contexte

DKDP.ch est une agence digitale a Geneve. Pour demontrer ses competences en creation de sites web, David veut creer 10 landing pages fictives pour des entreprises inventees (mais realistes, ancrees en Suisse romande), deployees en sous-domaines de dkdp.ch. Ces sites servent de portfolio vivant, presentable sur la page /realisations du site principal.

La page /realisations existe deja dans routes.ts (priorite 0.65) mais redirige actuellement vers /.

---

## Architecture globale

### Deux systemes independants

1. **Site DKDP (Next.js)** : pages /realisations (galerie) et /realisations/[slug] (case studies)
2. **Monorepo dkdp-demos (Astro SSG)** : 10 landing pages deployees sur des sous-domaines Vercel

Les deux sont connectes par :
- `liveUrl` dans les donnees portfolio (DKDP → demo)
- Badge "Site cree par DKDP" sur chaque demo (demo → DKDP)

---

## Partie 1 : Site DKDP (Next.js)

### 1.1 Data layer : `src/lib/portfolio/`

Suit le pattern exact de `src/lib/blog/` (1 fichier par projet, barrel export dans index.ts).

**`src/lib/portfolio/types.ts`**

```ts
export type SectorKey = 'restauration' | 'sante' | 'juridique' | 'artisanat' | 'tech'

export interface PortfolioScreenshot {
  src: string
  alt: string
  caption?: string
}

export interface PortfolioProject {
  slug: string
  name: string
  sector: SectorKey
  description: string          // ~120 chars, pour les cards
  brief: string                // le brief client fictif (1-2 paragraphes)
  designChoices: string[]      // 4-6 points
  features: string[]           // 4-8 fonctionnalites cles
  liveUrl: string              // ex: "https://restaurant.dkdp.ch"
  heroScreenshot: PortfolioScreenshot
  screenshots: PortfolioScreenshot[]
  colors: { primary: string; secondary: string; accent: string }
  typography: { heading: string; body: string }
  techStack: string[]
}
```

**`PORTFOLIO_SECTORS`** : meme shape que `BLOG_CATEGORIES` (`label`, `color`, `bg`, `border`).

| SectorKey | Label | Couleur |
|-----------|-------|---------|
| restauration | Restauration & Hotellerie | #FF8C00 |
| sante | Sante & Bien-etre | #4ade80 |
| juridique | Services Pro & Juridique | #A78BFA |
| artisanat | Commerce & Artisanat | #fbbf24 |
| tech | Tech & Creatif | #2dd4bf |

**`src/lib/portfolio/index.ts`** : exporte `PROJECTS[]`, `getProject(slug)`, `getProjectsBySector(sector)`.

**Screenshots** : `public/images/portfolio/[slug]/hero.webp`, `desktop.webp`, `mobile.webp`.

### 1.2 Page galerie : `/realisations`

Remplace le redirect actuel. Structure :

1. **Hero** : `<HeroBg>` + `<GradTag>Realisations</GradTag>` + H1 avec `<GradText>` + sous-titre + CTA
2. **Barre de filtres sticky** (top-14, z-30, backdrop-blur) : pills par secteur + "Tous"
3. **Grille** : `grid grid-cols-1 md:grid-cols-2 gap-6`, groupee par secteur
4. **CTAFinal** en bas

**ProjectCard** (`_components/ProjectCard.tsx`) :
- `<SectionReveal>` wrapper
- Link vers `/realisations/${slug}`
- Screenshot 16:9 avec hover scale
- Badge secteur (bottom-left)
- Nom, description, lien "Voir le projet"
- Border couleur du secteur

### 1.3 Page case study : `/realisations/[slug]`

`generateStaticParams()` genere toutes les pages.

Sections :
1. **Hero** : screenshot dans un frame navigateur, H1, badge secteur
2. **Stats bar** : secteur, stack, delai fictif
3. **Subnav sticky** : ancres vers les sections
4. **Le brief** : blockquote avec bordure couleur secteur
5. **Choix de design** : grille 2 cols, palettes + typo + decisions
6. **Fonctionnalites** : liste avec checkmarks
7. **Screenshots** : galerie responsive desktop + mobile
8. **CTA** : lien vers le site demo + retour galerie
9. **CTAFinal**

**SEO** : `generateMetadata()`, canonical, OG image, `buildBreadcrumbList` + `buildCreativeWork` (nouveau builder dans schema.ts).

### 1.4 Modifications au site existant

| Fichier | Modification |
|---------|-------------|
| `src/lib/routes.ts` | Augmenter priorite /realisations de 0.65 a 0.75 |
| `src/lib/schema.ts` | Ajouter `buildCreativeWork()` |
| `src/components/layout/Header.tsx` | Ajouter "Realisations" dans AGENCE_SECONDARY |
| `src/app/realisations/page.tsx` | Remplacer le redirect par la page galerie |

---

## Partie 2 : Monorepo Demo Sites (Astro SSG)

### 2.1 Structure monorepo

```
dkdp-demos/
  pnpm-workspace.yaml
  package.json
  packages/
    shared/                     # @dkdp/shared
      src/
        components/
          DKDPBadge.astro       # Badge "Site cree par DKDP"
          Hero.astro            # Hero avec video/image
          About.astro
          Services.astro
          Testimonials.astro
          Gallery.astro
          ContactCTA.astro
          Footer.astro
          BaseHead.astro        # <head> boilerplate
        layouts/
          LandingLayout.astro
        utils/
          breakpoints.ts
    sites/
      le-comptoir-du-lac/       # restaurant
      hotel-beau-rivage/        # hotel
      dr-moreau-cabinet/        # dentiste
      eclat-de-soi/             # spa
      etude-fontaine/           # avocat
      la-mie-doree/             # boulangerie
      autoprecision/            # garage
      nexflow-analytics/        # startup
      atelier-capillaire/       # coiffure
      regie-du-leman/           # immobilier
```

### 2.2 Composants partages (`@dkdp/shared`)

Chaque composant accepte des props de personnalisation (couleurs, contenu, images). Le `LandingLayout.astro` orchestre l'ordre des sections.

**DKDPBadge.astro** : badge fixe bottom-right, lien vers `dkdp.ch/realisations?ref={siteSlug}`, style glassmorphism discret.

### 2.3 Config par site

Chaque site a :
- `data/content.ts` : tout le contenu (textes, images, couleurs, typo)
- `styles/theme.css` : overrides Tailwind v4 (`@theme { --color-primary: ...; }`)
- `astro.config.mjs` : `site: 'https://[subdomain].dkdp.ch'`, `output: 'static'`

### 2.4 Les 10 sites

| # | Sous-domaine | Nom fictif | Secteur | Style |
|---|-------------|------------|---------|-------|
| 1 | restaurant.dkdp.ch | Le Comptoir du Lac | Restauration | Warm, terreux, Playfair Display + Inter |
| 2 | hotel.dkdp.ch | Hotel Beau-Rivage | Hotellerie | Luxe, bleu nuit + or, Cormorant Garamond + DM Sans |
| 3 | dentiste.dkdp.ch | Dr. Moreau Cabinet | Sante | Clean, medical, fond clair, Plus Jakarta Sans |
| 4 | spa.dkdp.ch | Eclat de Soi | Bien-etre | Doux, rose pastel, Lora + Nunito Sans |
| 5 | avocat.dkdp.ch | Etude Fontaine & Associes | Juridique | Elegant, dark navy + or, EB Garamond + Inter |
| 6 | boulangerie.dkdp.ch | La Mie Doree | Artisanat | Artisanal, chaleureux, Fraunces + Work Sans |
| 7 | garage.dkdp.ch | AutoPrecision Geneve | Artisanat | Industriel, bold, noir + rouge, Bebas Neue + Roboto |
| 8 | startup.dkdp.ch | NexFlow Analytics | Tech | Futuriste, gradient mesh, Space Grotesk + Inter |
| 9 | coiffure.dkdp.ch | Atelier Capillaire | Sante | Moderne, noir + dore, Outfit + Space Grotesk |
| 10 | immobilier.dkdp.ch | Regie du Leman | Tech | Premium, editorial, Libre Baskerville + Poppins |

**Identites fictives** : noms francophones, adresses genevoises, numeros +41 22 xxx xx xx, horaires realistes. Tout est 100% fictif.

**Visuels** : priorite a Pexels (photos/videos HD gratuites), Nanobanana en complement si besoin.

### 2.5 Sections type d'une landing page

1. **Hero** : titre + sous-titre + CTA + image/video plein ecran (Pexels)
2. **A propos** : histoire fictive + stats (annees, clients, etc.)
3. **Services** : grille 3 cols avec icones
4. **Galerie** : photos Pexels du secteur
5. **Temoignages** : 3 avis fictifs
6. **Contact/CTA** : formulaire decoratif (non fonctionnel) + carte Google Geneve
7. **Footer** : coordonnees fictives + DKDPBadge

---

## Partie 3 : Deploiement

### 3.1 DNS (domaine dkdp.ch)

10 enregistrements CNAME :
```
[subdomain].dkdp.ch  CNAME  cname.vercel-dns.com
```

### 3.2 Vercel

- Monorepo `dkdp-demos` sur GitHub
- 10 projets Vercel, chacun avec root directory `packages/sites/[site-name]`
- Chaque projet a son sous-domaine comme custom domain
- SSL automatique via Vercel

### 3.3 Repo GitHub

- `dkdp-demos` : nouveau repo pour le monorepo Astro
- `DKDP-web` : repo existant, modifications sur /realisations

---

## Partie 4 : Sequence d'implementation

### Phase 1 : Fondations DKDP (Next.js)
1. Creer `src/lib/portfolio/types.ts` et `index.ts`
2. Ajouter `buildCreativeWork` dans `schema.ts`
3. Mettre a jour routes.ts (priorite /realisations)
4. Creer la page galerie /realisations
5. Creer les composants ProjectCard
6. Ajouter le lien dans le Header

### Phase 2 : Template case study
7. Creer `/realisations/[slug]/page.tsx`
8. Creer les sous-composants dans `_components/`

### Phase 3 : Monorepo Astro
9. Initialiser `dkdp-demos` avec pnpm workspace
10. Creer `packages/shared` (composants partages)
11. Creer le premier site template (restaurant)

### Phase 4 : Les 10 sites
12. Construire les 9 sites restants
13. Sourcer les photos/videos Pexels
14. Prendre les screenshots pour le portfolio

### Phase 5 : Deploy et connexion
15. Creer les projets Vercel + DNS
16. Remplir les donnees portfolio avec les URLs et screenshots reels
17. Deploy final du site DKDP

---

## Verification

- [ ] Page /realisations affiche tous les projets avec filtres
- [ ] Page /realisations/[slug] affiche le case study complet
- [ ] Chaque sous-domaine sert une landing page Astro fonctionnelle
- [ ] DKDPBadge present sur chaque site demo
- [ ] Liens bidirectionnels fonctionnent (portfolio → demo, demo → portfolio)
- [ ] Responsive sur 5 breakpoints (mobile 480, mobile 640, tablet 1024, desktop 1440, wide)
- [ ] Lighthouse score > 90 sur chaque site demo (SSG = facile)
- [ ] SEO : metadata, canonical, OG, schema JSON-LD sur /realisations
