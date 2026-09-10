# Tracking des conversions DKDP (GA4 + Google Ads)

Mis en place le 2026-06-22. Source de verite cote code : [`src/lib/analytics.ts`](../src/lib/analytics.ts).

## Vue d'ensemble

Tous les evenements de conversion passent par une seule fonction, `trackEvent()`,
qui envoie chaque evenement **deux fois** :

1. `gtag('event', ...)`  → Google Analytics 4 (chemin fiable, GA4 le recoit toujours)
2. `dataLayer.push({ event, ... })` → Google Tag Manager (declenche les tags Ads / remarketing)

On n'ecrit AUCUN identifiant de conversion Google Ads en dur dans le code. On
marque les evenements GA4 comme **Key events** dans GA4, puis on les importe
comme actions de conversion dans Google Ads.

### Tags presents sur le site (constate le 2026-06-22 via trace reseau)

| Tag | Type | Charge par | Remarque |
|-----|------|-----------|----------|
| `G-SCXF5R826D` | GA4 | gtag direct (`layout.tsx`) | Charge par dkdp.ch |
| `G-65NPKH6CXN` | GA4 | linked tag + GTM | Charge par cours-informatique.ch |
| `AW-395809057` | Google Ads | linked tag | Enhanced conversions + remarketing |

> ## ⚠️ Donnees MELANGEES avec cours-informatique.ch (a corriger dans Google, hors code)
>
> Constate en live le 2026-06-22 (trace reseau des 2 sites) : les 3 IDs ci-dessus
> sont **lies entre eux** (connected / linked Google tags). Le config gtag de
> `G-SCXF5R826D` ET celui de `G-65NPKH6CXN` renvoient la MEME liste de destinations :
> `{G-SCXF5R826D, G-65NPKH6CXN, AW-395809057}`.
>
> Consequence : charger n'importe lequel des 3 envoie aux 3.
> - dkdp.ch charge `G-SCXF5R826D` → envoie aussi a G-65NPKH6CXN + AW-395809057.
> - cours-informatique.ch charge `G-65NPKH6CXN` → envoie AUSSI a **G-SCXF5R826D**
>   (GA4 "DKDP") **et a AW-395809057** (Google Ads "DKDP"). Verifie : cours-info
>   poste bien `tid=G-SCXF5R826D`, `tid=G-65NPKH6CXN` et `tids=AW-395809057`.
>
> Donc la GA4 "principale" DKDP et le compte Google Ads DKDP contiennent AUSSI le
> trafic de cours-informatique.ch (et inversement). **Le code des sites est correct** :
> le melange vient du parametrage Google tag (destinations liees), a corriger dans
> l'UI Google, pas dans le repo.
>
> **Fix (cote David, GA4 Admin / Google tag)** : pour CHAQUE flux de donnees,
> ouvrir Admin > Data Streams > le flux > **Configure tag settings > Configure your
> domains / Google tags lies / Connected site tags**, et **retirer les liens
> croises** pour que :
> - `G-SCXF5R826D` n'envoie qu'a lui-meme (+ AW-395809057 si on veut les conversions Ads DKDP),
> - `G-65NPKH6CXN` (cours-info) n'envoie qu'a lui-meme (+ son propre compte Ads),
> - decider si `AW-395809057` est commun aux 2 sites volontairement (sinon en creer un par marque).
>
> Tant que ce n'est pas fait, pour le reporting DKDP filtrer par hostname
> `dkdp.ch`, et pour Google Ads ne pas se fier aux totaux bruts (ils incluent cours-info).

### CSP : le blocage historique (corrige le 2026-06-22)

La `Content-Security-Policy` de [`next.config.ts`](../next.config.ts) n'autorisait
PAS les domaines Google. Resultat : `gtm.js` et `gtag/js` etaient **bloques par le
navigateur**, donc AUCUN evenement (ni page vue, ni lead) n'atteignait GA4.
Domaines ajoutes : `googletagmanager.com`, `google-analytics.com`
(+ `*.google-analytics.com`, `*.analytics.google.com`), `googleadservices.com`,
`*.doubleclick.net` (connect-src + frame-src, couvre `ad.`/`td.`/`googleads.g.`),
`www.google.com`. Toute nouvelle source de script/collecte Google devra etre ajoutee ici.

## Catalogue des evenements

| Evenement GA4 | Quand | Parametres | Conversion Ads ? |
|---------------|-------|-----------|------------------|
| `generate_lead` | Soumission d'un formulaire de demande | `form_type`, `form_location`, ... | **Oui (primaire)** |
| `book_appointment` | Reservation Cal.com **confirmee** | `cal_namespace` | **Oui (primaire)** |
| `phone_click` | Clic sur un lien `tel:` | `phone_number`, `link_location` | **Oui (primaire)** |
| `booking_start` | Clic sur un CTA de reservation (ouvre Cal) | `link_location`, `cal_link` | Secondaire (observer) |
| `whatsapp_click` | Clic sur un lien WhatsApp | `link_location` | Secondaire |
| `email_click` | Clic sur un lien `mailto:` | `email`, `link_location` | Secondaire |
| `newsletter_signup` | Inscription newsletter | `form_location`, `locale` | Secondaire |
| `chat_open` | Ouverture du chatbot | (aucun) | Engagement (non-conversion) |

### Detail de `generate_lead` (valeur de `form_type`)

| `form_type` | Formulaire | Fichier |
|-------------|-----------|---------|
| `contact` | Formulaire de contact principal | `components/sections/ContactForm.tsx` |
| `estimation_site_web` | Estimateur de site (etape finale) | `app/agence-digitale/creation-site-web/_components/steps/Step8Summary.tsx` |
| `audit_seo` | Audit SEO gratuit (3 emplacements) | `AuditHeroForm.tsx`, `AuditHeroFormEn.tsx`, `SiteAuditBlock.tsx` |
| `devis_formation_ia` | Landing Formation IA (FR + EN) | `formation-entreprise/ia/...`, `en/corporate-training/ai/...` |
| `devis_formation_claude_ai` | Landing Formation Claude IA (FR + EN) | `formation-entreprise/claude-ai/...`, `en/corporate-training/claude-ai/...` |

## Comment c'est cable cote code

- **Clics (tel, mailto, WhatsApp, CTA Cal)** : un seul ecouteur global delegue,
  `components/providers/ConversionTracker.tsx`, monte dans `layout.tsx`. Il capte
  tous les liens existants ET futurs sans instrumentation manuelle.
- **Reservation confirmee** : `components/providers/CalProvider.tsx` ecoute
  `bookingSuccessfulV2` sur le namespace Cal `planifier-un-appel` (branche une seule fois).
- **Formulaires** : chaque composant appelle `trackLead(...)` au moment du succes.
- **Chatbot** : `components/ui/ChatWidget.tsx` envoie `chat_open` une fois par chargement.

Pour ajouter un emplacement de section nommee dans la segmentation, poser
`data-track-section="nom"` sur un conteneur parent (sinon le helper renvoie
`header` / `footer` / `nav` / `page`).

---

## A FAIRE dans les interfaces Google (hors code)

Ces etapes se font dans GA4 et Google Ads, elles ne peuvent pas etre codees.

### 1. GA4 — marquer les Key events

GA4 > Admin > **Events / Key events** (proprietes `G-SCXF5R826D` et/ou la canonique) :

1. Declencher chaque conversion une fois sur le site en prod (ou via GA4 DebugView)
   pour que l'evenement apparaisse dans la liste.
2. Activer le bouton **Mark as key event** pour : `generate_lead`,
   `book_appointment`, `phone_click`. (Optionnel : `booking_start`,
   `newsletter_signup`, `whatsapp_click`.)

Verification rapide : GA4 > Admin > **DebugView**, naviguer sur le site avec
l'extension *Google Analytics Debugger* (ou `?_dbg=1`), et voir les evenements
arriver en temps reel avec leurs parametres.

### 2. Lier GA4 a Google Ads

GA4 > Admin > **Product links > Google Ads links** : lier le compte
Google Ads (`AW-395809057`). Activer la personnalisation des annonces.

### 3. Google Ads — importer les conversions

Google Ads > **Goals > Conversions > + New conversion action > Import >
Google Analytics 4 (GA4)** :

1. Importer `generate_lead`, `book_appointment`, `phone_click`.
2. Pour chaque action importee, definir :
   - **Goal category** : `Submit lead form` (leads), `Book appointment` (Cal),
     `Phone call lead` (tel).
   - **Value** : si pas de revenu reel, mettre une valeur indicative par type
     (ex. devis = 50, rdv = 30, appel = 20) pour aider le Smart Bidding, ou
     « Don't use a value ». A ajuster selon le taux de transformation reel.
   - **Count** : `One` pour les leads/rdv (un seul compte par clic publicitaire),
     `Every` possible pour les appels.
3. Choisir les 1-2 actions « Primary » (celles qui pilotent les encheres), mettre
   les autres en « Secondary ».

> Comme `AW-395809057` est deja dans GTM avec enhanced conversions, les
> `generate_lead` / `phone_click` arrivent deja cote Ads. L'import GA4 reste la
> methode recommandee et la plus lisible pour le reporting ; verifier qu'on ne
> compte pas la meme conversion deux fois (une via GTM-Ads, une via import GA4).

### 4. Enhanced conversions (deja actif via GTM)

Les appels `/ccm/form-data` observes prouvent que les enhanced conversions sont
deja en place cote Ads. Pour les fiabiliser, s'assurer que l'email du lead est
disponible au moment du `generate_lead` (actuellement non transmis dans l'event ;
amelioration possible : passer un email hashe en user_data).

### 5. Consentement (RGPD / nLPD)

Le site n'a pas de Consent Mode v2. En Suisse (nLPD) c'est tolere, mais pour le
trafic UE c'est a surveiller. Si une banniere de consentement est ajoutee plus
tard, brancher Google Consent Mode v2 pour ne pas perdre la mesure.

---

# OpenAI Ads (ChatGPT Ads) — pixel + API de conversion

Mis en place le 2026-09-10. Pixel **`MhbGMaod48Cuvp7YJVsNgA`**.
Code : [`src/lib/openai-ads.ts`](../src/lib/openai-ads.ts) (partage) et
[`src/lib/openai-ads-server.ts`](../src/lib/openai-ads-server.ts) (serveur).

## Les deux chemins

| Chemin | Fichier | Force | Faiblesse |
|---|---|---|---|
| Pixel navigateur | snippet inline dans `layout.tsx` (head) | Porte le contexte du clic publicitaire, donc l'attribution | Perdu si bloqueur de pub, reseau d'entreprise, onglet ferme trop vite |
| API de conversion (serveur) | `after()` dans les routes `/api/*` | Sait de facon certaine qu'un formulaire est arrive | Aucun contexte navigateur, s'appuie sur les identifiants hashes |

Les deux partent pour **le meme lead**, avec le **meme identifiant** :
le formulaire genere `newEventId()`, l'envoie dans le corps de la requete
(`eventId`) ET au pixel (`event_id`). Cote serveur il devient `events[0].id`.
OpenAI deduplique dessus, donc le lead n'est jamais compte deux fois.

> **Sans `eventId` dans la requete, la route n'envoie rien.** C'est volontaire :
> une page ouverte avant un deploiement poste sans identifiant, le pixel a deja
> compte le lead, et un envoi serveur sans identifiant serait un doublon
> impossible a rapprocher. Ca se resorbe tout seul au rechargement.

## Correspondance des evenements

| Evenement GA4 | Evenement OpenAI | `data.type` |
|---|---|---|
| `generate_lead` | `lead_created` | `customer_action` |
| `book_appointment` | `appointment_scheduled` | `customer_action` |
| `newsletter_signup` | `registration_completed` | `customer_action` |
| `phone_click` | `custom` (`phone_click`) | `custom` |
| `whatsapp_click` | `custom` (`whatsapp_click`) | `custom` |
| `email_click` | `custom` (`email_click`) | `custom` |
| `booking_start` | `custom` (`booking_start`) | `custom` |
| `chat_open` | `custom` (`chat_open`) | `custom` |
| (page affichee) | `page_viewed` | `contents` |

**`lead_created` est reserve aux vraies demandes entrantes.** Les clics
telephone, WhatsApp et email sont des signaux d'intention, pas des leads :
ils partent en evenements personnalises pour rester mesurables sans gonfler
le compte de leads sur lequel les campagnes s'optimisent. Les promouvoir se
fait dans Ads Manager, pas dans le code.

## Trois pieges verifies en reel le 2026-09-10

1. **Le couple (evenement, `data.type`) est impose.** `lead_created` avec
   `data.type: "contents"` est refuse en HTTP 400 (`event_type_data_mismatch`).
   La table `OPENAI_EVENT_DATA_TYPE` vient du SDK lui-meme, ne pas l'inventer.
2. **`data` n'accepte aucune cle libre.** Pour `customer_action` : `type`,
   `amount`, `currency`, rien d'autre. Pas de `form_type`, pas de
   `form_location`. La segmentation fine reste dans GA4.
3. **Le SDK n'envoie rien tout seul.** Pas de page vue automatique : c'est
   `components/providers/OpenAiPageView.tsx` qui emet `page_viewed` au
   chargement et a chaque navigation interne (App Router).

## CSP

Comme pour Google, **oublier la CSP = pixel silencieusement mort**. Deux
domaines, dans `next.config.ts` :

- `script-src` : `https://bzrcdn.openai.com` (le SDK `oaiq.min.js`)
- `connect-src` : `https://bzr.openai.com` (la collecte, `/v1/sdk/events`)

## Tester sans polluer les statistiques

L'API accepte `validate_only: true` : elle valide la charge utile et
**n'enregistre aucune conversion**. Reponse attendue `{"accepted_events":1}`.

```bash
TS=$(( $(date +%s) * 1000 ))
curl -s -X POST "https://bzr.openai.com/v1/events?pid=MhbGMaod48Cuvp7YJVsNgA" \
  -H "Authorization: Bearer $OPENAI_ADS_API_KEY" -H "Content-Type: application/json" \
  --data "{\"validate_only\":true,\"events\":[{\"id\":\"test-$TS\",\"type\":\"lead_created\",\"timestamp_ms\":$TS,\"source_url\":\"https://dkdp.ch/contact\",\"action_source\":\"web\",\"data\":{\"type\":\"customer_action\"}}]}"
```

Cote navigateur, le pixel est en `debug: true` hors production : la console
affiche `[oaiq] event queued` puis `[oaiq] queue flushed`. Un evenement qui
reste en `queued` sans flush = collecte bloquee (CSP ou bloqueur).

Garde-fous automatiques : `src/lib/__tests__/openai-ads.test.ts` et
`openai-ads-server.test.ts` (mapping, forme de la charge utile, hachage).

## Ce qui reste a faire hors code

1. **Poser `OPENAI_ADS_API_KEY` sur Vercel** (Settings > Environment Variables,
   Production + Preview). Sans elle, seul le pixel navigateur travaille et une
   ligne `[openai-ads] OPENAI_ADS_API_KEY absente` apparait dans les logs.
2. **Dans Ads Manager > Conversions** : verifier que le pixel recoit
   (`page_viewed` puis `lead_created`), et choisir `lead_created` comme
   objectif d'optimisation des campagnes.
3. **Valeur des leads** : `amount` / `currency` sont cables mais jamais envoyes.
   L'unite attendue par OpenAI (francs ou centimes) n'est pas documentee :
   la trancher avant d'activer une enchere a la valeur.
