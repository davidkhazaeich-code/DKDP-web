# Nommage : ChatGPT Ads (page service ajoutee le 2026-09-10)

> Section déplacée telle quelle depuis `CLAUDE.md` le 2026-09-19 (workflow `nettoyage-contexte-claude.md` du DEV SPACE). Référence lue à la demande : elle ne se charge plus à chaque session. La compléter ici, pas dans CLAUDE.md.

Page `/agence-digitale/chatgpt-ads` (miroir `/en/digital-agency/chatgpt-ads`),
pilier agence (violet), creee le 10.09.2026, dix jours apres l'ouverture de
l'Ads Manager d'OpenAI aux entreprises suisses (31.08.2026). Article compagnon
`/blog/chatgpt-ads-suisse-romande-guide-2026` (category `seo`, tags `ChatGPT
Ads`, `OpenAI`, donc remonte dans la veille `CHATGPT_TOPIC`).

| Contexte | Nom exact FR | Nom exact EN |
|---|---|---|
| H1 (grad-tag), breadcrumb | **ChatGPT Ads Genève & Suisse romande** | **ChatGPT Ads Geneva & French-speaking Switzerland** |
| `metadata.title` | Agence ChatGPT Ads Genève & Suisse romande \| DKDP | ChatGPT Ads agency Geneva & Switzerland \| DKDP |
| Mega menu (`AGENCE_MAIN[5]`), footer (`agenceLinks[6]`), tarifs, glossaire, sitemap EN | **ChatGPT Ads** | **ChatGPT Ads** |
| Hub agence, plan du site FR, pages villes FR | **Publicité ChatGPT Ads** | **ChatGPT Ads** |

- **Fiche de faits unique** : `docs/chatgpt-ads-facts-2026-09-10.md` (pages
  OpenAI relues dans Chrome ; openai.com et help.openai.com bloquent WebFetch
  et curl, passer par un vrai navigateur). Rien d'autre n'est affirme sur la
  page, l'article, la FAQ, le glossaire ou le prompt du chatbot.
- Composants bilingues (`lang`) dans `src/app/agence-digitale/chatgpt-ads/_components/`,
  importes par la page EN. Calcul du simulateur dans `src/lib/chatgpt-ads/estimate.ts`
  (fonction pure, testee). FAQ FR/EN dans `_components/copy.ts`, balisee FAQPage :
  texte affiche = texte balise.
- **Contenu perissable, a relire quand OpenAI bouge** : la frise du deploiement
  (`RolloutTimeline`), la grille des forfaits (`PlanVisibilityGrid`), les secteurs
  acceptes (politiques v1.5 du 31.08.2026, `SectorsGrid`), le budget quotidien
  minimum de CHF 20, la recommandation « CPC de depart 3 a 5 USD », et l'absence
  de personnalisation en Suisse. Meme fiche, meme jour : relire aussi l'article.
- **Ce qu'on ne dit jamais** : un CPM ou CTR « observe », un resultat de campagne
  DKDP, « cibler uniquement Geneve » (ciblage par pays, zones fines documentees
  pour les Etats-Unis seulement), « l'agence ouvre le compte pour vous » (OpenAI
  l'interdit : le client cree le compte, DKDP est invite).
- Seule preuve citable : DKDP a ouvert son propre compte Ads Manager et pose le
  pixel OpenAI + Conversions API sur dkdp.ch le 10.09.2026 (section OpenAI Ads
  ci-dessous). Pas de campagne DKDP a citer tant qu'aucune ne tourne.
- Prix (decision David du 10.09.2026) : Pilote 30 jours CHF 1'200 · Gestion
  CHF 450 / mois · Google Ads + ChatGPT Ads CHF 950 / mois, zero commission,
  budget media conseille CHF 600 a 1'500 pour le pilote. Aussi sur `/tarifs`.
- QA visuelle : `node tools/qa-page-screenshots.mjs --base http://localhost:3105
  --out /tmp/qa --sections fonctionnement,audience,faq /agence-digitale/chatgpt-ads`
  (pleine page sombre et clair, desktop et mobile, sections, erreurs console,
  debordement horizontal). Le Browser pane masque ne rend pas les captures apres
  defilement : Playwright est la voie fiable.

---

