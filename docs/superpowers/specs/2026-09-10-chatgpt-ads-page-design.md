# Page service « ChatGPT Ads » sur dkdp.ch : design validé

Date : 10 septembre 2026. Demande de David : une page très complète, visuels, images, graphiques, bien référencée, qui convertit, respecte le design du site tout en étant un peu novatrice, puis un article complet. Priorité absolue : être présent sur les requêtes « Suisse romande » et « Genève ».

Réponses de David aux questions du 10.09 : « fais un article à ce sujet aussi, bien complet, par la suite ; surtout cible bien toutes les demandes pour être présent en Suisse romande et Genève ». Les autres questions valent par défaut (proposition acceptée sans objection) :

| Décision | Valeur retenue |
|---|---|
| URL | `/agence-digitale/chatgpt-ads`, miroir `/en/digital-agency/chatgpt-ads` (pilier agence, violet) |
| Version EN | Oui, composants bilingues via une prop `lang` (pattern Figma / ChatGPT formation) |
| Article compagnon | Oui, après la page : `/blog/chatgpt-ads-suisse-romande-guide-2026` |
| Offre et prix | Pilote 30 jours CHF 1'200 (unique, mis en avant) · Gestion mensuelle CHF 450 / mois · Google Ads + ChatGPT Ads CHF 950 / mois. Budget média conseillé pour un pilote CHF 600 à 1'500, versé à OpenAI, zéro commission, compte au nom du client, sans engagement (préavis 30 jours) |
| Preuve | Aucun compte ni campagne ChatGPT Ads à citer : posture « premiers sur le canal en Suisse romande », chiffres de marché sourcés OpenAI, expérience Google Ads de DKDP. Aucun cas client inventé, aucun résultat chiffré promis |
| David sur la page | Oui, bloc « Qui pilote vos campagnes » avec son portrait |
| Secteurs illustrés | Commerce et e-commerce, services locaux, hôtellerie-restauration-tourisme, formation et produits numériques. Mise en garde B2B (décideurs souvent sur Plus, Business ou Enterprise, donc sans annonces) |
| Publication | Directement sur `main` après vérification locale (build, tests, captures, titles en pixels) |

## Faits produit

Source unique : `docs/chatgpt-ads-facts-2026-09-10.md` (pages OpenAI relues dans Chrome le 10.09.2026). Rien d'autre n'est affirmé sur la page. Les chiffres de marché non-OpenAI (CPM observés, taux de clic) restent hors page.

## Cible de requêtes (FR)

Primaire : `chatgpt ads`, `chatgpt ads genève`, `chatgpt ads suisse`, `chatgpt ads suisse romande`, `agence chatgpt ads`, `publicité chatgpt`, `publicité sur chatgpt`, `publicité dans chatgpt`.
Secondaire : `annonces chatgpt`, `ads manager chatgpt`, `openai ads manager`, `campagne chatgpt ads`, `prix chatgpt ads`, `coût publicité chatgpt`, `faire de la publicité sur chatgpt`, `chatgpt ads pme`, `publicité ia genève`, `chatgpt ads lausanne`.
EN : `chatgpt ads agency geneva`, `chatgpt ads switzerland`, `advertise on chatgpt switzerland`, `openai ads manager switzerland`.

Répartition : title, H1, description, intro du hero, H2 des sections, questions de la FAQ, alt des images, bloc « ChatGPT Ads à Genève, Lausanne et en Suisse romande » avec les 8 villes du site.

## Structure de la page (FR, miroir EN identique)

1. Hero : fil d'Ariane, H1 `grad-tag` « ChatGPT Ads Genève & Suisse romande », accroche, intro, 3 pills, CTA « Lancer un pilote ChatGPT Ads » vers `/contact?service=service-digital`, lien secondaire vers `#simulateur`. À droite : `ChatMockHero`, maquette codée et animée d'une conversation ChatGPT en français qui se termine par une carte « Sponsorisé » d'une PME genevoise fictive. Aucun logo OpenAI, interface générique.
2. Bandeau de 4 chiffres sourcés OpenAI.
3. `LogoBanner`.
4. `ScrollSpyNav` : Fonctionnement · Audience · Comparatif · Simulateur · Pour qui · Méthode · Tarifs · FAQ.
5. `#fonctionnement` : comment une annonce arrive sous une réponse (`HowItWorks`, schéma 3 temps codé) + composition de la carte + enchère au second prix pondérée par la pertinence + « context hints » ≠ mots-clés.
6. `#deploiement` : `RolloutTimeline` (9 février US, 26 mars CA/AU/NZ, 5 mai Ads Manager bêta et CPC, mai à août UK/MX/BR/JP/KR, 18 août annonce Europe, 24 août annonces en Suisse, 31 août libre-service dans les 31 marchés).
7. `#audience` : `PlanVisibilityGrid`, qui voit les annonces forfait par forfait (Free, Go : oui ; Plus, Pro, Business, Enterprise, Edu : jamais ; moins de 18 ans, chats temporaires, navigateur Atlas : jamais). Mise en garde B2B honnête.
8. `#comparatif` : `ChannelComparison`, Google Ads contre ChatGPT Ads (déclencheur, format, ciblage, enchères, mesure, personnalisation en Suisse, maturité, recommandation DKDP).
9. `#simulateur` : `BudgetSimulator` interactif (budget mensuel, CPC supposé, taux de conversion) → clics et contacts estimés, libellé « estimation indicative, pas une promesse ». Fonction pure testée `estimateCampaign`.
10. `#pour-qui` : `SectorsGrid`, secteurs qui marchent, secteurs interdits ou sur validation, cas B2B.
11. `#methode` : `MethodSteps`, 5 étapes (cadrage et éligibilité · compte et mesure · cartes et context hints · pilote 30 jours · décision et montée en charge).
12. `#tarifs` : `PricingGrid`, 3 formules, note budget média.
13. `#expert` : `ExpertBlock`, David, portrait `/images/team/david-khazaei.png`.
14. `#conformite` : `ComplianceTiles`, données et nLPD (conversation jamais transmise, pas d'annonces près des sujets sensibles, pixel = consentement, pas de personnalisation en Suisse au lancement).
15. `#zone` : `RomandieCoverage`, ChatGPT Ads à Genève, Lausanne, Nyon, Fribourg, Sion, Neuchâtel, Morges, Montreux, plus campagnes en allemand pour la Suisse alémanique. Explique honnêtement que le ciblage est national et que la localité se joue dans le message et la langue.
16. Veille : `ArticleCarousel` sur `getArticlesByTopic(CHATGPT_TOPIC)`.
17. `#faq` : `FAQSection`, 10 questions (schéma FAQPage).
18. Passerelles Google Ads et SEO/GEO, puis `CTAFinal`.

## SEO

- `metadata.title` mesuré sous 600 px, description sous 160 caractères et 920 px (`node tools/check-serp-width.mjs`).
- JSON-LD : `buildServiceWithLocalBusiness` (priceFrom 1200, serviceType « Publicité ChatGPT Ads »), `buildFAQPage`, `buildBreadcrumbList`.
- `ROUTES` (priority 0.85, weekly, lastModified 2026-09-10) et `FR_TO_EN`.
- Liens entrants : mega menu (nouvelle entrée « ChatGPT Ads »), footer, hub agence FR/EN (badge Nouveau), plan du site FR/EN, tarifs FR/EN, pages villes FR/EN (liste des services), page Google Ads FR/EN (passerelle), glossaire FR/EN (terme « ChatGPT Ads »), prompt système du chatbot, article compagnon.
- OG image via `tools/og-generator/generate.mjs chatgpt-ads.png`.

## Visuels

- Maquette de conversation codée (hero), schéma 3 temps, frise, grille forfaits, comparatif, simulateur, tuiles : tout en JSX + SVG avec les tokens de `src/lib/tokens.ts`.
- Images générées par `tools/gemini_image.py` (DEV SPACE) selon `dkdp-system-prompt-image-agent.md`, mode illustration, pilier agence : carte de service du hub (`public/images/services/dkdp-agence-chatgpt-ads.webp`), illustration « pour qui », illustration « zone romande ». Article : hero + 2 visuels. Toujours JPEG/WebP compressés, noms de fichiers SEO, alt commençant par le mot-clé.

## Hors périmètre

Pas de page cours-informatique.ch, pas de version DE, pas de nouveau formulaire dédié (le formulaire de contact existant suffit, `?service=service-digital`), pas de chiffres de performance non sourcés, pas de compte Ads Manager ouvert pour DKDP dans cette passe.
