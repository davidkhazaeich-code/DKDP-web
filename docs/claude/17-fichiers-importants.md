# Fichiers importants

> Section déplacée telle quelle depuis `CLAUDE.md` le 2026-09-19 (workflow `nettoyage-contexte-claude.md` du DEV SPACE). Référence lue à la demande : elle ne se charge plus à chaque session. La compléter ici, pas dans CLAUDE.md.

| Fichier | Role |
|---|---|
| `src/lib/tokens.ts` | Palette couleurs et tokens |
| `src/lib/routes.ts` | Source de verite URLs, sitemap, redirections |
| `src/lib/schema.ts` | Builders JSON-LD (buildService, buildCourse, buildFAQPage, buildBreadcrumbList) |
| `src/lib/blog/` | Articles blog (1 fichier par article, index.ts pour l'assemblage) |
| `src/lib/realisations/` | Études de cas (1 fichier par réalisation, `index.ts` pour l'assemblage, `en.ts` overlay EN par slug). Captures par `node tools/realisations/capture.mjs --url <site> --slug <slug>`. Deux en ligne au 2026-09-08 : `goldencash-refonte`, `sos-relevage` (⚠️ présentation neutre, sans le mot client ni nom de personne). L'onglet « Réalisations » du mega menu et le plan du site pointent vers `/realisations` depuis le 08.09 (avant : `/a-propos`, page orpheline). **Trois blocs optionnels depuis le 08.09** : `highlights[]` (sections phare, `HighlightsShowcase` + `ScreenFrame` + `PhoneFrame`, numérotées dans l'ordre du parcours visiteur), `direction` (`VisualDirection`, logo, palette, spécimen dans la vraie police via `next/font/local`, polices dans `components/realisations/fonts/`), `seo` (`SeoDirection`, aperçu Google, schémas, une tuile-lien par intention, GEO) + `CaseStudyNav` (ScrollSpyNav). Captures de sections : `tools/realisations/capture-sections.mjs`. ⚠️ `SectionReveal.delay` est en **secondes** (`0.08`), pas en millisecondes : `delay={80}` rend la carte invisible sans erreur. **Contexte et approche sur la même grille** (08.09, retour David « mal mis en page ») : titre et sous-titre en colonne gauche collante (`md:col-span-4`), récit à droite en paragraphes (`body` accepte `\n\n`, le premier paragraphe est l'accroche), `problem.facts[]` = fiche métier/public/territoire/départ, `approach.bullets` rendus en grille « Ce qui a été livré » avec une coche. Plus de colonne `max-w-[68ch]` centrée |
| `src/components/layout/Header.tsx` | Mega menu complet, donnees nav dans les consts en haut du fichier |
| `src/components/providers/SmoothScrollProvider.tsx` | Lenis config |
| `src/components/ui/SectionReveal.tsx` | Animation + `RevealDisabledProvider` |
| `src/app/page.tsx` | Homepage (57 lignes, wrappee dans `RevealDisabledProvider`) |

---

