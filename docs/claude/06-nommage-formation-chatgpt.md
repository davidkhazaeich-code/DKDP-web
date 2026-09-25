# Nommage : Formation ChatGPT (ajoutee le 2026-09-10)

> Section déplacée telle quelle depuis `CLAUDE.md` le 2026-09-19 (workflow `nettoyage-contexte-claude.md` du DEV SPACE). Référence lue à la demande : elle ne se charge plus à chaque session. La compléter ici, pas dans CLAUDE.md.

Page `/formation-entreprise/chatgpt` (miroir `/en/corporate-training/chatgpt`),
creee le 10.09.2026 a la sortie de GPT-6 Astra (3 septembre 2026). Clone de la
page Claude, accent orange formation, 1230 lignes + `_components/`.

| Contexte | Nom exact FR | Nom exact EN |
|---|---|---|
| Page, H1 (grad-tag), breadcrumb | **Formation ChatGPT Genève & Suisse romande** | **ChatGPT training Geneva & French-speaking Switzerland** |
| `metadata.title` | Formation ChatGPT Astra Genève & Suisse romande \| DKDP | ChatGPT Astra training Geneva & Switzerland \| DKDP |
| Mega menu (`FORMATION_MAIN[2]`, `IA_SECONDARY[3]`), footer (`formationLinks[2]`), hub, plan du site | **Formation ChatGPT** | **ChatGPT training** |

- Les composants vivent dans `src/app/formation-entreprise/chatgpt/_components/`
  et sont **bilingues via une prop `lang`** (pattern Figma) : la page EN les
  importe, il n'y a pas de `_components` cote EN.
- `src/i18n/slugs.ts` porte la paire FR/EN. Sans elle, `localizedPath()` rend
  `/en/formation-entreprise/chatgpt` et le sitemap EN ignore la page. Toute
  nouvelle page a un miroir EN passe par cette table, pas seulement par `ROUTES`.
- Section « Veille » alimentee par `CHATGPT_TOPIC` (`src/lib/blog/topics.ts` :
  chatgpt, openai, gpt, astra, codex), meme mecanique que `CLAUDE_TOPIC`. Un
  article sur OpenAI doit porter un de ces mots dans son slug, son titre ou ses
  tags pour y remonter.
- Positionnement (arbitrage David, 10.09.2026) : formation multi-outils, **Claude
  reste la recommandation DKDP** (analyse, profondeur, confidentialite), ChatGPT
  Astra pour automatiser un poste de travail et les images, Copilot si Microsoft
  365. La note de bas de comparatif le dit sur les pages Claude et ChatGPT : ne
  pas la retirer.
- La grille « Ou Astra est disponible, forfait par forfait »
  (`AstraAvailability.tsx`) est le contenu le plus perissable de la page : au
  10.09.2026, Plus n'a Astra que dans ChatGPT Work et Codex, pas dans le chat.
  Si OpenAI change la repartition, relire aussi la FAQ de la page, celle de la
  formation IA, et l'article `chatgpt-astra-gpt-6-pme-romandes-2026`.
- Statistiques affichees = celles du hub formation (500+, 4.9/5, 100 % sur
  mesure). Aucune reference client ChatGPT ni chiffre de gain invente.

---

