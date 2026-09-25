# Nombres : jamais `toLocaleString` dans un composant rendu cote serveur

> Section déplacée telle quelle depuis `CLAUDE.md` le 2026-09-19 (workflow `nettoyage-contexte-claude.md` du DEV SPACE). Référence lue à la demande : elle ne se charge plus à chaque session. La compléter ici, pas dans CLAUDE.md.

**Source unique : `src/lib/format.ts`** (`formatSwissInt`, `formatSwissChf`).

Le separateur de milliers de `fr-CH` depend de la version d'ICU embarquee dans le moteur :

```
Node 24 local (ICU 78) et Chrome  ->  "1 050"  (U+202F, espace fine insecable)
runtime Node de Vercel            ->  "1'050"  (U+0027, apostrophe)
```

Le serveur et le client rendent donc deux textes differents pour le meme nombre. React leve
**l'erreur #418** a l'hydratation, abandonne, et re-rend la racine depuis le HTML serveur.
Effet de bord : **`data-theme` pose par le script anti-FOUC disparait de `<html>`** et la page
repasse en sombre alors que l'utilisateur a choisi le mode clair.

C'est ce qui bloquait le mode clair sur les 6 pages portant un calculateur ROI
(`/intelligence-artificielle`, `/formation-entreprise/ia`, `/formation-entreprise/claude-ai`
et leurs miroirs EN). **Non reproductible en local** : Node 24 et Chrome sont d'accord, il
faut le runtime de Vercel pour voir l'ecart. Diagnostic : ecouter `pageerror` sur la prod et
comparer `data-theme` juste apres `domcontentloaded` puis 4 s plus tard.

```ts
import { formatSwissInt } from '@/lib/format'
formatSwissInt(1050)   // "1'050", sans Intl, identique serveur et client
```

Regle : tout nombre affiche au rendu serveur passe par `src/lib/format.ts`. Test de
non-regression dans `src/lib/__tests__/format.test.ts`.

---

