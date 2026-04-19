# Estimateur de site web DKDP

Composant wizard multi-etapes integre sur la page `/agence-digitale/creation-site-web` permettant aux prospects d'obtenir une estimation indicative du cout de leur projet web. Le resultat est envoye par email (Resend) et stocke dans Notion.

---

## Architecture

### Emplacement

- **Route** : pas de nouvelle route. Le composant s'integre comme section sur `/agence-digitale/creation-site-web`, entre le ProcessTimeline et les Testimonials.
- **Lien supplementaire** : une mention/CTA sur la page `/agence-digitale` qui pointe vers l'ancre `#estimation` sur la page creation-site-web.
- **Composant principal** : `src/app/agence-digitale/creation-site-web/_components/Estimator.tsx` (client component, `'use client'`).

### Stack technique

- **State** : `useReducer` pour gerer l'etat du wizard (etape courante, selections, prix calcule).
- **Animations** : Framer Motion (`AnimatePresence`, `motion.div`) pour les transitions entre etapes, expand/collapse des cards, counter anime.
- **Formulaire** : champs controles React, validation cote client avant soumission.
- **API Route** : `src/app/api/estimation/route.ts` (POST). Recoit les donnees, envoie l'email via Resend, cree l'entree Notion, retourne un statut.
- **Email** : template React Email pour l'email de confirmation (au client) et l'email de notification (a David).
- **Notion** : SDK `@notionhq/client` pour creer une page dans une database dediee.

---

## Flow : 8 etapes

### Etape 1 : Votre projet

3 questions sur un seul ecran.

**Situation actuelle (exclusif, obligatoire) :**

| Option | Prix |
|--------|------|
| Je pars de zero | Inclus |
| Refonte d'un site existant (migration contenu, redirections SEO, recuperation donnees) | + CHF 300 - 800 |

**Type de site (exclusif, obligatoire) :**

| Option | Prix de base |
|--------|-------------|
| Site vitrine | des CHF 2'500 |
| E-commerce | des CHF 5'000 |
| Landing page | des CHF 1'000 |
| Application web | des CHF 8'000 |

**Secteur d'activite (exclusif, obligatoire) :**
Restaurant/Hotel, Sante/Medical, Juridique/Fiduciaire, Immobilier, Commerce/Retail, Services/Consulting, Tech/SaaS, Artisan/BTP, Formation/Coaching, Autre.

Le secteur alimente les pre-suggestions de l'etape 5 (ex: Restaurant → Reservation pre-cochee).

---

### Etape 2 : Branding & strategie

Bouton "Pas pour l'instant" visible en bas de l'etape (skip).

**Logo (exclusif) :**

| Option | Prix | Livrables |
|--------|------|-----------|
| J'ai deja mon logo | Inclus | - |
| Logo a creer | + CHF 800 - 1'500 | 3 propositions, 2 cycles revisions, declinaisons (horizontal, vertical, favicon, monochrome), fichiers source (AI, SVG, PNG) |
| Logo a moderniser | + CHF 500 - 1'000 | 2 propositions, 1 cycle revision, fichiers source mis a jour |

**Branding / identite visuelle (exclusif) :**

| Option | Prix | Livrables |
|--------|------|-----------|
| J'ai deja mon branding | Inclus | - |
| Branding a creer | + CHF 1'000 - 2'000 | Palette couleurs (HEX, RGB, CMJN), typographie (titres, corps, hierarchie), charte graphique complete, signature email HTML responsive, declinaisons reseaux sociaux |
| Branding a moderniser | + CHF 600 - 1'200 | Mise a jour palette, typographie, charte, signature email |

**Strategie marketing (multi-select, optionnel) :**

| Option | Prix |
|--------|------|
| Positionnement & messaging | + CHF 800 |
| Etude de marche & concurrence | + CHF 600 |
| Strategie de contenu | + CHF 1'200 |

---

### Etape 3 : Envergure & design

**Nombre de pages (exclusif, obligatoire) :**
1-5 / 6-10 / 11-20 / 20+

Chaque tranche a un multiplicateur sur le prix de base :
- 1-5 : x1 (inclus dans le prix de base)
- 6-10 : x1.3
- 11-20 : x1.6
- 20+ : x2 (+ champ libre pour preciser)

**Langues (exclusif, obligatoire) :**

| Option | Impact |
|--------|--------|
| 1 langue | x1 |
| 2 langues | x1.3 sur le prix de base |
| 3+ langues | x1.5 sur le prix de base |

**Niveau de design (exclusif, obligatoire) :**

| Option | Multiplicateur | Description |
|--------|---------------|-------------|
| Template adapte | x1 (base) | Theme professionnel personnalise a votre image |
| Design sur mesure | x1.4 | Maquettes Figma 100% custom, UX dedie |
| Premium + animations | x1.7 | Haut de gamme, micro-interactions, effets avances |

Le multiplicateur s'applique sur le prix de base du type de site. Exemple affiche en temps reel :
"Site vitrine (CHF 2'500) x Design sur mesure (x1.4) = CHF 3'500"

**Logique de cumul des multiplicateurs :**
Les multiplicateurs pages, langues et design s'appliquent tous sur le prix de base et sont **additifs** :
- Formule : `prixBase * (1 + (multPages - 1) + (multLangues - 1) + (multDesign - 1))`
- Exemple : Site vitrine (2'500) + 6-10 pages (+0.3) + 2 langues (+0.3) + sur mesure (+0.4) = 2'500 * (1 + 0.3 + 0.3 + 0.4) = 2'500 * 2.0 = CHF 5'000
- Cette approche evite l'explosion multiplicative (x1.3 x 1.3 x 1.4 = x2.37 serait trop agressif).

---

### Etape 4 : Contenu & medias

Bouton "Pas pour l'instant" visible.

**Redaction & copywriting (exclusif) :**

| Option | Prix |
|--------|------|
| Je fournis tout le contenu | Inclus |
| Redaction basique (mise en forme, structuration) | + CHF 80/page |
| Copywriting professionnel (textes persuasifs, UX writing, ton de marque, CTAs) | + CHF 200/page |

Le prix est calcule automatiquement selon le nombre de pages choisi a l'etape 3 (midpoint de la tranche : 1-5 → 3, 6-10 → 8, 11-20 → 15, 20+ → 25).

**Photos & visuels (exclusif) :**

| Option | Prix |
|--------|------|
| Je fournis mes visuels | Inclus |
| Banque d'images + retouches | + CHF 300 - 600 |
| Visuels generes par IA (illustrations, hero images, visuels de marque) | + CHF 400 - 800 |
| Shooting photo professionnel (photographe sur site, portraits, locaux, produits) | + CHF 800 - 2'500 |

---

### Etape 5 : Fonctionnalites

Multi-select. Pre-suggestions intelligentes selon le secteur (etape 1) affichees avec un badge "Recommande" et pre-cochees (desactivables).

| Secteur | Pre-suggestions |
|---------|----------------|
| Restaurant/Hotel | Reservation, Galerie |
| E-commerce (type) | Paiement en ligne, Newsletter |
| Sante/Medical | Formulaire avance, Reservation |
| Services/Consulting | Blog, Newsletter |
| Tech/SaaS | Espace membre, Chatbot IA |

**Options disponibles :**

| Fonctionnalite | Type | Prix |
|----------------|------|------|
| Blog (setup) | Unique | + CHF 800 |
| Gestion blog (redaction, publication, SEO) | Recurrent | + CHF 300/mois |
| Formulaire avance (multi-etapes, fichiers, conditions) | Unique | + CHF 400 |
| Reservation / booking (Cal.com ou custom) | Unique | + CHF 1'200 |
| Espace membre (auth, profils, contenu reserve) | Unique | + CHF 2'000 |
| Chatbot IA (assistant intelligent integre) | Unique | + CHF 1'500 |
| Paiement en ligne (Stripe, Twint) | Unique | + CHF 1'800 |
| Newsletter (signup, integration Mailchimp/Resend) | Unique | + CHF 300 |
| Galerie / portfolio (grille, lightbox, filtres) | Unique | + CHF 500 |
| Pages supplementaires (au-dela du forfait) | Unique | + CHF 200/page |

---

### Etape 6 : Acquisition, SEO & automatisation

Sous-sections repliables. Chaque sous-section a un titre cliquable qui expand/collapse le contenu. Par defaut, seuls les titres sont visibles. Bouton "Pas pour l'instant" visible.

**SEO :**

| Option | Type | Prix |
|--------|------|------|
| SEO technique de base (balises, sitemap, Core Web Vitals, Schema.org) | Inclus | Toujours inclus |
| SEO avance one-shot (audit, strategie mots-cles, contenu, SEO local) | Unique | + CHF 1'500 |
| SEO mensuel continu (suivi positions, contenus, netlinking, rapports) | Recurrent | + CHF 600/mois |

**Acquisition (multi-select) :**

| Option | Type | Prix |
|--------|------|------|
| Google Ads / SEA (setup, landing pages, tracking) | Recurrent | + CHF 400/mois |
| Reseaux sociaux (strategie, calendrier, gestion) | Recurrent | + CHF 600/mois |
| Funnel de conversion (pages capture, sequences email, lead magnets) | Unique | + CHF 2'000 - 4'000 |

**Automatisation & CRM (multi-select) :**

| Option | Type | Prix |
|--------|------|------|
| Integration CRM (HubSpot, Pipedrive, Notion) | Unique | + CHF 800 - 1'500 |
| Email marketing automatise (sequences bienvenue, relance, nurturing) | Unique | + CHF 1'200 - 2'500 |
| Workflows n8n / Zapier (automatisations sur mesure) | Unique | + CHF 500 - 2'000 |
| Dashboard & reporting (KPIs, rapports automatiques) | Unique | + CHF 600 - 1'200 |

---

### Etape 7 : Services complementaires & conformite

Bouton "Pas pour l'instant" visible.

| Option | Type | Prix |
|--------|------|------|
| Maintenance mensuelle (MAJ, securite, modifications mineures incluses) | Recurrent | CHF 150/mois |
| Formation admin (prise en main back-office) | Unique | + CHF 200 |
| Conformite RGPD / nLPD (cookies, confidentialite, mentions legales, CGV) | Unique | + CHF 500 |
| Video promotionnelle (tournage, montage, format web) | Unique | + CHF 1'500 - 4'000 |
| Livraison urgente (delai reduit 30-50%, equipe dediee) | Multiplicateur | + 30% sur le total unique |

---

### Etape 8 : Resume & demande de devis

**Recapitulatif visuel :**
- Groupe par categorie (Projet, Branding, Design, Contenu, Fonctionnalites, Acquisition, Services).
- Chaque ligne affiche le choix + le prix. Chaque categorie est cliquable pour revenir a l'etape concernee et modifier.
- Les lignes "Inclus" et "Toujours inclus" sont affichees en vert pour renforcer la perception de valeur.

**Totaux :**
- **Investissement unique** : fourchette min-max, grande typo, bien visible.
- **Couts recurrents** : separes clairement, en violet, sous le total unique.
- **Delai estime** : calcule dynamiquement selon les selections (base + branding + complexite). Affiche en vert.
- **Note** : "Estimation indicative. Devis personnalise et detaille sous 48h. Hebergement et nom de domaine non inclus (des CHF 10/mois)."

**Formulaire adaptatif :**

Champs fixes :
- Nom & prenom (requis)
- Entreprise (requis)
- Email (requis)
- Telephone (requis)
- Message (optionnel, textarea)

Champs dynamiques selon les selections :

| Condition | Champ ajoute |
|-----------|-------------|
| Refonte selectionnee | URL du site actuel (requis) |
| E-commerce selectionne | Nombre de produits estime (select : 1-50 / 51-200 / 201-1000 / 1000+) |
| Branding a creer | Decrivez votre activite en quelques mots (textarea) |
| Livraison urgente | Date de lancement souhaitee (date picker) |
| Restaurant/Hotel | Nombre d'etablissements (number) |
| Application web | Description des fonctionnalites principales (textarea) |

Champs optionnels toujours presents :
- Budget envisage (select : < 5k / 5-10k / 10-20k / 20-50k / 50k+ / Pas encore defini)
- Delai souhaite (select : Urgent < 4 sem / Normal 4-8 sem / Flexible 8-12 sem / Pas de contrainte)

**CTA** : "Recevoir mon estimation detaillee" → envoie via API route.

---

## UX & interactions

### Compteur flottant

- **Desktop** : sidebar sticky a droite, visible des l'etape 1. Affiche en permanence :
  - Total unique (fourchette min-max, anime avec easing a chaque changement)
  - Total recurrent (separe, en violet, plus petit)
  - Etape courante / total (ex: "3/8")
- **Mobile** : bottom bar fixe, compacte (une ligne : total unique + etape). Tap pour expand et voir le detail recurrent.
- **Animation du compteur** : `countUp` avec easing (300ms) a chaque modification du total. Les chiffres qui changent ont un flash subtil violet.

### Progress bar

- Barre horizontale en haut du composant, gradient violet.
- 8 segments avec labels cliquables (retour aux etapes precedentes uniquement, pas de saut en avant).
- Segment actif : plein. Segments completes : plein + check. Segments futurs : outline.
- Animation de remplissage fluide (Framer Motion, 400ms).

### Transitions entre etapes

- `AnimatePresence` avec `mode="wait"`.
- Sortie : slide left + fade out (200ms).
- Entree : slide right + fade in (300ms, 50ms delay).
- Direction inversee quand on revient en arriere.

### Cards de selection

- **Hover** : border glow violet subtil + legere elevation (`translateY(-2px)`).
- **Selection** : border violet plein + background violet 10% + scale pulse (1.02 → 1, 200ms) + checkmark anime.
- **Deselection** (multi-select) : retour smooth aux styles par defaut.
- **Expand/collapse** (branding detail) : `layoutId` Framer Motion, les autres cards se reduisent.

### Bouton "Pas pour l'instant"

- Style ghost, discret mais visible, en bas a gauche de l'etape.
- Texte : "Pas pour l'instant" (pas "Passer" qui sonne negatif).
- Au clic : passe a l'etape suivante sans rien selectionner dans cette etape.

### Element de confiance

- Bandeau discret sous le titre du composant : icones + textes.
- 3 trust signals : "Devis gratuit sous 48h" + "Prix fixes, sans surprises" + "+120 projets livres".
- Style : petite typo, gris clair, icones Lucide.

### Sous-sections repliables (etape 6)

- Chaque sous-section (SEO, Acquisition, Automatisation) a un titre avec chevron.
- Par defaut : fermees (sauf SEO qui montre le "Toujours inclus" pour la valeur percue).
- Au clic : expand smooth avec Framer Motion.
- Badge compteur sur le titre quand des options sont selectionnees (ex: "Acquisition (2)").

---

## Responsive

5 breakpoints comme le site DKDP :

| Breakpoint | Layout |
|-----------|--------|
| Mobile (< 640px) | Cards en colonne, bottom bar compteur, progress bar compacte (dots), labels caches |
| Tablet portrait (640-768px) | Cards 2 colonnes, bottom bar |
| Tablet landscape (768-1024px) | Cards 2 colonnes, sidebar compteur |
| Desktop (1024-1200px) | Cards 2 colonnes (fonctionnalites), sidebar compteur |
| Large (> 1200px) | Layout optimal, sidebar large avec detail |

Le composant principal utilise un grid `lg:grid-cols-[1fr_320px]` (contenu + sidebar).

---

## API Route : `POST /api/estimation`

### Request body

```typescript
interface EstimationRequest {
  // Etape 1
  situation: 'new' | 'redesign'
  siteType: 'vitrine' | 'ecommerce' | 'landing' | 'webapp'
  sector: string

  // Etape 2
  logo: 'existing' | 'create' | 'modernize' | null
  branding: 'existing' | 'create' | 'modernize' | null
  strategy: ('positioning' | 'market-study' | 'content-strategy')[]

  // Etape 3
  pages: '1-5' | '6-10' | '11-20' | '20+'
  languages: '1' | '2' | '3+'
  designLevel: 'template' | 'custom' | 'premium'

  // Etape 4
  copywriting: 'provided' | 'basic' | 'professional' | null
  visuals: 'provided' | 'stock' | 'ai' | 'shooting' | null

  // Etape 5
  features: string[] // ['blog-setup', 'blog-management', 'form', 'booking', ...]

  // Etape 6
  seo: ('advanced-oneshot' | 'monthly')[]
  acquisition: ('sea' | 'social' | 'funnel')[]
  automation: ('crm' | 'email-marketing' | 'workflows' | 'dashboard')[]

  // Etape 7
  services: ('maintenance' | 'training' | 'rgpd' | 'video' | 'rush')[]

  // Etape 8 - formulaire
  contact: {
    firstName: string
    lastName: string
    company: string
    email: string
    phone: string
    message?: string
    budget?: string
    timeline?: string
    // Champs dynamiques
    currentSiteUrl?: string
    productCount?: string
    businessDescription?: string
    launchDate?: string
    locationCount?: number
    appDescription?: string
  }

  // Calcule cote client
  estimatedTotal: { min: number; max: number }
  estimatedMonthly: { min: number; max: number }
  estimatedWeeks: { min: number; max: number }
}
```

### Logique serveur

1. Valider les donnees (zod schema).
2. Recalculer le prix cote serveur (ne jamais faire confiance au calcul client).
3. Envoyer email de confirmation au prospect via Resend (template: resume de leur estimation).
4. Envoyer email de notification a David via Resend (template: toutes les donnees + prix recalcule).
5. Creer une page dans la database Notion "Estimations" avec toutes les proprietes.
6. Retourner `{ success: true }`.

---

## Calcul du prix

### Constantes

```typescript
const BASE_PRICES = {
  vitrine: { min: 2500, max: 4000 },
  ecommerce: { min: 5000, max: 8000 },
  landing: { min: 1000, max: 2000 },
  webapp: { min: 8000, max: 15000 },
}

const REDESIGN_SURCHARGE = { min: 300, max: 800 }

const PAGE_MULTIPLIERS = { '1-5': 1, '6-10': 1.3, '11-20': 1.6, '20+': 2 }
const LANG_MULTIPLIERS = { '1': 1, '2': 1.3, '3+': 1.5 }
const DESIGN_MULTIPLIERS = { template: 1, custom: 1.4, premium: 1.7 }

const PAGE_MIDPOINTS = { '1-5': 3, '6-10': 8, '11-20': 15, '20+': 25 }
```

### Formule

```
prixBase = BASE_PRICES[siteType]

// Multiplicateurs additifs sur le prix de base
totalMultiplier = 1 + (pagesMult - 1) + (langMult - 1) + (designMult - 1)
prixAjuste = prixBase * totalMultiplier

// Ajouts fixes
prixTotal = prixAjuste
           + redesign (si applicable)
           + logo + branding + strategie
           + copywriting (prix/page * midpoint)
           + visuels
           + fonctionnalites (somme des uniques)
           + SEO oneshot + acquisition unique + automatisation
           + services uniques
           + rush (si applicable : prixTotal * 0.3)

// Recurrents (separes)
mensuel = maintenance + gestion blog + SEO mensuel + SEA + reseaux sociaux
```

### Delai estime

```
delaiBase = { vitrine: [3,5], ecommerce: [6,10], landing: [1,2], webapp: [8,14] }
+ branding a creer : +2-3 semaines
+ logo a creer : +1-2 semaines
+ pages 20+ : +2 semaines
+ design premium : +2 semaines
+ rush : delai * 0.6
```

---

## Structure des fichiers

```
src/app/agence-digitale/creation-site-web/
  _components/
    Estimator.tsx              # Composant principal (orchestrateur)
    EstimatorContext.tsx        # useReducer + context
    EstimatorProgress.tsx       # Barre de progression
    EstimatorCounter.tsx        # Compteur flottant (sidebar/bottom bar)
    EstimatorNav.tsx            # Boutons Suivant / Retour / Skip
    steps/
      Step1Project.tsx          # Situation + type + secteur
      Step2Branding.tsx         # Logo + branding + strategie
      Step3Scope.tsx            # Pages + langues + design
      Step4Content.tsx          # Copywriting + visuels
      Step5Features.tsx         # Fonctionnalites multi-select
      Step6Acquisition.tsx      # SEO + acquisition + automatisation
      Step7Services.tsx         # Services complementaires
      Step8Summary.tsx          # Resume + formulaire
    ui/
      SelectionCard.tsx         # Card cliquable (exclusive)
      MultiSelectCard.tsx       # Card multi-select
      OptionChip.tsx            # Chip cliquable (secteur, pages, langues)
      CollapsibleSection.tsx    # Section repliable (etape 6)
      AnimatedCounter.tsx       # Compteur anime avec easing
      TrustBanner.tsx           # Bandeau confiance

src/app/api/estimation/
  route.ts                      # API POST handler

src/lib/
  estimation/
    pricing.ts                  # Constantes prix + fonction de calcul
    types.ts                    # Types TypeScript
    validation.ts               # Schema Zod

src/emails/
  EstimationConfirmation.tsx    # Email au prospect (React Email)
  EstimationNotification.tsx    # Email a David (React Email)
```

---

## Integration sur la page

Dans `page.tsx` de creation-site-web :

```tsx
// Import dynamique (client component lourd)
const Estimator = dynamic(
  () => import('./_components/Estimator').then(m => ({ default: m.Estimator })),
  { ssr: false }
)

// Dans le JSX, entre ProcessTimeline et Testimonials :
<section id="estimation" className="scroll-mt-[124px]">
  <Estimator />
</section>
```

Le subnav sticky de la page ajoute un lien "Estimation" pointant vers `#estimation`.

---

## Schema JSON-LD

Pas de schema specifique pour l'estimateur. Le schema `Service` existant sur la page couvre deja le service de creation de site web.

---

## Tests

- Tests unitaires (Vitest) pour la logique de calcul de prix (`pricing.ts`).
- Tests unitaires pour la validation Zod (`validation.ts`).
- Tests composants pour chaque etape (rendu, selection, navigation).
- Test E2E (Playwright) : parcours complet etapes 1 → 8, verification du resume, soumission du formulaire.

---

## Hors scope

- Pas de sauvegarde/reprise de session (overkill pour 8 etapes rapides).
- Pas de compte utilisateur ou historique des estimations.
- Pas de paiement en ligne a ce stade.
- Pas de PDF genere (le devis detaille est fait manuellement apres reception).
