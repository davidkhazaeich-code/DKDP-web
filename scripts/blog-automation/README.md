# Blog automation — DKDP

Génère un **brouillon d'article on-brand** dans le cloud, sans que ton ordinateur soit allumé, et l'ouvre en **Pull Request** pour relecture. Rien n'est publié automatiquement : tu relis la PR (+ son preview Vercel) puis tu merges pour publier.

## Le flux

```
Idée dans Notion ("À rédiger")
        │
        ▼
GitHub Action (cron hebdo, ou "Run workflow" depuis le mobile)
        │  1. pioche la prochaine idée
        │  2. génère l'article via l'API Anthropic (ton ton + tes règles)
        │  3. écrit src/lib/blog/<slug>.ts + l'enregistre dans index.ts
        │  4. ouvre une Pull Request
        ▼
Tu relis la PR + le preview Vercel (sur ton téléphone)
        │
        ▼
Merge  →  Vercel build prod  →  article en ligne sur dkdp.ch/blog
```

L'idée Notion passe automatiquement à **« En PR »** avec le lien de la PR.

---

## Setup (une seule fois)

### 1. Base Notion « Idées blog »

Crée une base de données avec ces propriétés (les noms comptent) :

| Propriété | Type | Rôle |
|---|---|---|
| **Titre** | Title | L'angle / titre de travail de l'article |
| **Statut** | Select (ou Status) | Valeurs : `À rédiger`, `En PR`, `Publié` |
| **Catégorie** | Select | Valeurs : `IA`, `SEO`, `Formation`, `Outils` |
| **Brief** | Text | Angle, points à couvrir, audience, exemples, chiffres |
| **Mot-clé principal** | Text | Cible SEO principale |
| **Mots-clés secondaires** | Text | (optionnel) |
| **Slug** | Text | (optionnel — sinon dérivé du titre) |
| **PR** | URL | (optionnel — rempli automatiquement) |

> Le script lit **la première idée `À rédiger`** par date de création. Une seule idée est traitée par exécution.

### 2. Intégration Notion → token

1. https://www.notion.so/my-integrations → **New integration** (interne).
2. Copie le **Internal Integration Token** (`secret_…` / `ntn_…`).
3. Sur la base « Idées blog » : menu `•••` → **Connections** → ajoute ton intégration (sinon l'API ne voit pas la base).
4. Récupère l'**ID de la base** : dans l'URL de la base, la chaîne de 32 caractères avant le `?v=`.

### 3. Secrets & variables GitHub

Repo `davidkhazaeich-code/DKDP-web` → **Settings → Secrets and variables → Actions**.

**Secrets** (onglet *Secrets*) :

| Nom | Valeur |
|---|---|
| `ANTHROPIC_API_KEY` | Ta clé console.anthropic.com |
| `NOTION_API_KEY` | Le token d'intégration de l'étape 2 |

**Variables** (onglet *Variables*) :

| Nom | Valeur |
|---|---|
| `NOTION_BLOG_IDEAS_DB_ID` | `c0319cbc9f124b34b5453f37c0976d9e` (déjà créée) |
| `BLOG_MODEL` | *(optionnel)* def. `claude-sonnet-4-6`. Mets `claude-opus-4-8` pour la qualité max. |
| `NOTION_BLOG_IDEAS_DATASOURCE_ID` | *(optionnel)* `a96b54bf-d249-4b92-8bc8-588322e2188c`. Si absent, le script le résout tout seul depuis l'ID de base. |

> La base **« Idées blog DKDP »** est déjà créée (sous la page Notion « Rédaction de contenu site DKDP ») et remplie de 10 idées au statut « À rédiger ». Il te reste juste à créer le **token d'intégration** et à **partager la base avec lui** (étape 2).

> `GITHUB_TOKEN` est fourni automatiquement par Actions — rien à configurer.

**Prérequis bloquant** — Settings → **Actions → General → Workflow permissions** :
- ✅ *Read and write permissions*
- ✅ *Allow GitHub Actions to create and approve pull requests*

Sans ces deux cases, l'ouverture de PR par le workflow échoue.

### 4. Ancres dans `index.ts`

Déjà posées dans `src/lib/blog/index.ts` :

```ts
// <blog-automation:imports>     ← les imports auto s'insèrent ici
// <blog-automation:articles>    ← les articles auto s'insèrent ici (en tête de liste)
```

Ne pas les supprimer.

---

## Utilisation

1. Ajoute une idée dans Notion, statut **`À rédiger`**, avec un **Brief** soigné (c'est ce qui détermine la qualité).
2. Lance le workflow :
   - **Automatique** : tous les lundis 6h UTC.
   - **À la demande** : GitHub → onglet **Actions** → *Blog draft (DKDP)* → **Run workflow** (possible depuis l'app mobile GitHub).
3. Une PR « 📝 Brouillon : … » s'ouvre. Ouvre-la, lis le rendu via le **preview Vercel** (lien posté par Vercel sur la PR).
4. **Relis et corrige** directement dans la PR si besoin. Coche la checklist (fond, ton, SEO, **visuel hero**).
5. **Merge** → publié.

---

## Limites connues (v1) — choix assumés

- **Pas de génération d'image.** Un placeholder est posé sur `public/images/blog/<slug>-hero.png` et la PR inclut un **prompt visuel suggéré**. Tu génères le vrai hero (Nanobanana) et remplaces le fichier avant merge. *(Activable en v2.)*
- **Premier jet, pas livrable brut.** L'objectif est de tuer la page blanche + le boilerplate (types, métadonnées, SEO, slug, câblage `index.ts`), pas de publier sans relecture. Le ton et les chiffres se vérifient à la main.
- **Pas de code inline** dans le contenu (non supporté par le renderer maison) : les noms d'outils sont en **gras**.
- **CTA mid-article** : la page l'injecte automatiquement. Sans image inline, il atterrit en fin d'article (cosmétique).

## Coût indicatif

~1 appel Anthropic par article (≈ 1 500 mots). Sonnet : quelques centimes. Opus : quelques dizaines de centimes. GitHub Actions : gratuit (repo privé, largement sous le quota).

## Fichiers

```
scripts/blog-automation/
├── system-prompt.md          # Ton + règles + contrat de format du renderer
├── generate-draft.mjs        # Notion → Anthropic → fichier article + index.ts
├── update-notion-status.mjs  # Idée Notion → "En PR" + lien
└── README.md                 # Ce fichier
.github/workflows/blog-draft.yml
```
