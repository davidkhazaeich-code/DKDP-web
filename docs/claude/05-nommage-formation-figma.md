# Nommage : Formation Figma

> Section déplacée telle quelle depuis `CLAUDE.md` le 2026-09-19 (workflow `nettoyage-contexte-claude.md` du DEV SPACE). Référence lue à la demande : elle ne se charge plus à chaque session. La compléter ici, pas dans CLAUDE.md.

`/formation-entreprise/web-design` a ete renommee `/formation-entreprise/figma`
le 2026-08-31 (miroir EN `/en/corporate-training/figma`), avec 301 dans
`REDIRECTS`. La page portait deja Figma du title jusqu'a la FAQ et ressortait sur
les requetes Figma, mais son URL disait « web design ». Une seconde page aurait
cannibalise la premiere sur un marche romand trop etroit pour deux : on a
renomme, pas duplique.

| Contexte | Nom exact |
|---|---|
| Page, H1, metadata, breadcrumb | **Formation Figma** |
| Mega menu, footer, hub, plan du site | **Formation Figma** (EN : **Figma training**) |
| Nom du formateur | **Aucun.** Le bloc `FigmaTrainer` decrit le profil requis et annonce que le profil detaille est transmis au calage des dates |

Le web design, l'UX/UI et la conception de maquettes n'ont pas disparu : ils sont
devenus des sections de cette page (vocabulaire wireframe / maquette / prototype /
design system, comparatif d'outils, cas d'usage). Ne pas recreer de page web design.

**Composants partages** dans `src/components/formation/figma/`, tous bilingues via
une prop `lang` (pattern `FormationTrainer`, pas de duplication FR/EN comme sur les
pages `ia` et `canva`) : `FigmaPillars`, `DesignVocabulary`, `FigmaToolComparison`,
`FigmaLevels`, `FigmaUseCases`, `IntraVsCatalogue`, `FigmaTrainer`.

> **Le bloc `FormationTrainer` partage n'est volontairement PAS monte sur cette
> page.** Il presente David, Romane et Ali, dont les competences affichees sont
> l'IA, le SEO, le developpement et la bureautique. Aucun n'est praticien de Figma,
> et les afficher sous la promesse « formes par des praticiens » serait un faux
> signal, precisement ce qu'un prospect exigeant verifie.

**Faits produit verifies le 2026-08-31**, a re-verifier avant de les reecrire :
plan gratuit Figma = fichiers illimites en brouillon personnel mais **3 fichiers
partages de 3 pages**, historique 30 jours ; **interface en francais depuis le
15 octobre 2025** ; Adobe XD en maintenance, plus vendu separement. Les anciens
chiffres non sources de la page (« 70% de temps gagne », « handoff divise par 3 »)
ont ete retires : depuis la mise a jour E-E-A-T de decembre 2025, un chiffre rond
sans source est un signal negatif et n'est pas repris par les moteurs IA.

---

