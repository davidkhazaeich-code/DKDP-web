# Blog : workflow de publication

> Section déplacée telle quelle depuis `CLAUDE.md` le 2026-09-19 (workflow `nettoyage-contexte-claude.md` du DEV SPACE). Référence lue à la demande : elle ne se charge plus à chaque session. La compléter ici, pas dans CLAUDE.md.

Quand David fournit du contenu (lien YouTube, transcript, topic, texte brut) pour un article :

1. **Redaction** : Reecrire/creer un article complet au ton DKDP, SEO-optimise, avec maillage interne vers les pages services et formation
2. **Image hero** : Generer avec Nanobanana (MCP tool `mcp__nanobanana__generate_image`), style dark/tech/pro, ratio 16:9
3. **Diagrammes et visuels inline** :
   - **Diagrammes HTML codes** : Inserer des blocs `<div>` directement dans le `content` markdown. Le renderer les passe tel quel (pass-through). Utiliser les design tokens du site (violet `#A78BFA`, orange `#FF8C00`, chrome `#D4D4D8`, vert `#4ade80`, rouge `#fca5a5`). Types utiles : grilles de cards, barres de progression, comparaisons avant/apres, timelines, heatmaps d'attention, etapes numerotees.
   - **Schemas Nanobanana** : Generer 1-3 images explicatives par article (courbes, infographies, diagrammes visuels). Les ajouter dans `images[]` avec alt + caption, et les placer dans le contenu via le marqueur `___IMG:filename.png___`.
   - **Regle** : chaque article doit avoir au minimum 1 diagramme HTML code ET 1 image Nanobanana, en plus de l'image hero.
   - **SEO images** :
     - **Noms de fichiers** : toujours descriptifs avec mots-cles, format `mot-cle-principal-description.png` (ex: `seo-local-geneve-funnel.png`, `formation-ia-roi-curve.png`). Jamais de noms generiques (`image1.png`, `hero.png`).
     - **Alt texts** : commencer par le mot-cle cible de l'article, inclure contexte geo (Geneve, Suisse, PME) et annee si pertinent. Format : `"Mot-cle principal : description concise et riche semantiquement"`. Ex: `"Formation IA entreprise Geneve 2026 : seance pratique avec collaborateurs sur outils IA"`.
4. **Publication** : Creer un nouveau fichier `src/lib/blog/<slug>.ts` (default export), ajouter l'import dans `src/lib/blog/index.ts`, placer les images dans `public/images/blog/`, mettre a jour `FEATURED_SLUG` dans index.ts si pertinent
5. **Deploy** : Commit + push sur `main` → auto-deploy Vercel
6. **Confirmation** : Donner l'URL live `https://dkdp.ch/blog/<slug>`

> **Effet de bord voulu** : la section « Veille et actualité » des pages `/formation-entreprise/claude-ai` et `/en/corporate-training/claude-ai` est alimentee par `getArticlesByTopic(CLAUDE_TOPIC, 12)`, recalcule a chaque rendu. Tout article touchant **un seul** des mots de `CLAUDE_TOPIC` (`claude`, `anthropic`, `opus`, `sonnet`, `haiku`, `mcp`, `agent ia`, `agentic`) dans son **slug, son titre ou ses tags** remonte automatiquement en tete du carrousel. Le compteur d'articles et la date de derniere publication se mettent a jour seuls. Rien a editer sur la page.
>
> **Les `tags` sont le levier de controle.** Un article Claude dont ni le slug ni le titre ne portent un mot du sujet doit avoir le tag qui va bien, sinon il reste invisible dans la section. Quand Anthropic sort un nom de produit ou de modele inedit, **elargir `CLAUDE_TOPIC` dans `src/lib/blog/topics.ts`**, pas les pages.
>
> **La page d'accueil aussi** : la section « Veille technologique » de `/` et `/en` (composant `TechWatch`, entre la methode et le bandeau de confiance) liste les **8 derniers articles tous sujets confondus** via `getLatestArticles()`. Toute publication y remonte en tete sans condition de mot-cle.
>
> Garde-fou : `src/lib/blog/__tests__/topic.test.ts` echoue si un article dont le slug ou le titre parle de Claude n'atterrit pas dans la section. Si ce test casse apres une publication, ajouter le mot manquant a `CLAUDE_TOPIC` plutot que d'ajuster le test.

**Fichiers blog cles :**

| Fichier | Role |
|---|---|
| `src/lib/blog/` | **1 fichier par article** (default export). Types dans `types.ts`, assemblage dans `index.ts` |
| `src/lib/blog/index.ts` | Re-exporte ARTICLES[], BLOG_CATEGORIES, FEATURED_SLUG, getArticle(), getRelatedArticles(). **Fichier d'assemblage : il bouge a chaque publication, ne pas y poser de logique de page** |
| `src/lib/blog/topics.ts` | Selections d'articles pour les sections de page : CLAUDE_TOPIC, getArticlesByTopic(), countArticlesByTopic(), getLatestArticles(). Volontairement separe de `index.ts` pour que redaction et developpement ne se marchent pas dessus |
| `src/app/blog/[slug]/page.tsx` | Page article individuelle, markdown custom avec marqueurs `___IMG:filename___` + blocs HTML pass-through (`<div>`) |
| `public/images/blog/` | Images hero, schemas et inline des articles |

**Structure d'un fichier article (`src/lib/blog/<slug>.ts`) :**
```ts
import type { Article } from './types'

const article: Article = {
  slug: 'mon-article',
  title: 'Titre SEO',
  excerpt: 'Description courte pour les cards et meta',
  date: '5 avril 2026',
  dateISO: '2026-04-05',
  readTime: '8 min',
  category: 'ia' | 'seo' | 'formation' | 'outils',
  heroImage: { src: '/images/blog/mon-article-hero.png', alt: '...' },
  images: [
    { src: '/images/blog/mon-article-schema.png', alt: '...', caption: '...' },
  ],
  // Optionnel mais recommande : reprise MOT POUR MOT des Q/R de la section
  // « Questions frequentes » du contenu. Declenche un schema FAQPage en plus
  // du BlogPosting (rich results Google + citabilite moteurs IA).
  faq: [{ question: '...', answer: '...' }],
  content: `...markdown + HTML diagrams + ___IMG:filename___ markers...`,
}

export default article
```
```

> **Champ `faq`** : Google exige que la reponse balisee soit **visible sur la page**. Ne jamais baliser une Q/R absente du corps de l'article, et repercuter toute reformulation du texte dans le champ. Sans `faq`, la page n'emet que BlogPosting et BreadcrumbList, comme avant.

**Conventions pour les diagrammes HTML :**
- Wrapper principal : `<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(...);background:rgba(...)">` 
- Titre du diagramme : `<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:...;margin-bottom:1rem">TITRE</div>`
- Utiliser `display:grid` ou `display:flex` pour les layouts
- Texte principal en `#e4e4e7`, secondaire en `#9CA3AF`, muted en `#71717a`
- Toujours dark theme, coherent avec le fond `#09090B` du site

---

