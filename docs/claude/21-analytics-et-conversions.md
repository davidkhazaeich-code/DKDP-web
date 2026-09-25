# Analytics et conversions (GA4 + Google Ads + ChatGPT Ads)

> Section déplacée telle quelle depuis `CLAUDE.md` le 2026-09-19 (workflow `nettoyage-contexte-claude.md` du DEV SPACE). Référence lue à la demande : elle ne se charge plus à chaque session. La compléter ici, pas dans CLAUDE.md.

**Source de verite : `src/lib/analytics.ts`.** Doc complete : `docs/analytics-conversions.md`.

- Tout evenement de conversion passe par `trackEvent()` (ou un helper `trackLead`,
  `trackPhoneClick`, `trackBookingComplete`...). Il envoie a la fois a GA4 (`gtag`)
  et au dataLayer GTM. **Ne jamais rappeler `window.gtag` / `dataLayer.push` en dur**
  dans un composant : importer le helper.
- Nouveau formulaire ? Appeler `trackLead({ form_type: '...', form_location: '...' })`
  au moment du succes (apres `res.ok`).
- Liens `tel:` / `mailto:` / WhatsApp et CTA Cal `[data-cal-link]` sont captes
  automatiquement par `components/providers/ConversionTracker.tsx` (monte dans le
  layout). Rien a faire pour un nouveau lien.
- Reservation Cal confirmee = `book_appointment`, branchee dans `CalProvider.tsx`
  via `bookingSuccessfulV2` (namespace `planifier-un-appel`).
- **CSP** : les domaines Google sont autorises dans `next.config.ts`
  (`script-src` + `connect-src` + `frame-src`). Toute nouvelle source Google
  (script ou collecte) doit y etre ajoutee, sinon le navigateur la bloque et
  l'evenement n'atteint jamais GA4.
- Tags en place : GA4 `G-SCXF5R826D` (gtag direct) + `G-65NPKH6CXN` (via GTM) +
  Google Ads `AW-395809057` (via GTM). Cote GA4/Ads, marquer les Key events et
  importer les conversions : voir `docs/analytics-conversions.md`.

### OpenAI Ads (ChatGPT Ads), depuis le 2026-09-10

Pixel `MhbGMaod48Cuvp7YJVsNgA`, branche **derriere le meme `trackEvent()`** :
tout evenement mappe dans `GA4_TO_OPENAI` (`src/lib/openai-ads.ts`) part aussi
au pixel. Un nouveau formulaire qui appelle `trackLead()` est donc traque des
deux cotes sans code supplementaire.

- **Un formulaire genere `newEventId()`** et l'envoie **aux deux** : dans le
  corps de la requete (`eventId`) et dans `trackLead({ event_id })`. C'est ce
  qui permet a OpenAI de dedupliquer le pixel et l'envoi serveur. Copier ce
  triplet (import, `const eventId`, les deux passages) sur tout nouveau
  formulaire, sinon le lead est compte deux fois ou pas du tout.
- **`lead_created` = vraie demande entrante uniquement.** Clic telephone,
  WhatsApp, email, ouverture du calendrier ou du chatbot partent en evenements
  personnalises : ce sont des intentions, pas des leads.
- **Le couple (evenement, `data.type`) est impose** par OpenAI et **`data`
  n'accepte aucun parametre libre** : pas de `form_type` cote pixel. Table de
  reference `OPENAI_EVENT_DATA_TYPE`, tests dans `src/lib/__tests__/openai-ads*`.
- **CSP** : `bzrcdn.openai.com` en `script-src`, `bzr.openai.com` en
  `connect-src`. Sans ca le pixel est mort sans le moindre message d'erreur.
- **Cle serveur** : `OPENAI_ADS_API_KEY` (jamais `NEXT_PUBLIC_`). Absente, le
  pixel navigateur travaille seul et les logs le disent.

Detail complet, mapping et procedure de test : `docs/analytics-conversions.md`.

---

