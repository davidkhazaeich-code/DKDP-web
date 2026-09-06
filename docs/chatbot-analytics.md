# Chatbot DKDP : analytics legeres

Systeme d'observabilite minimal pour le chatbot dkdp.ch. Pas de stockage des conversations brutes en production : on garde uniquement metriques + resume IA + premiere question (200 char max).

## Pourquoi

Le chatbot tournait en aveugle : aucune visibilite sur le volume, les sujets demandes, les leads chauds qu'on rate. L'objectif est de pouvoir repondre a "qu'est-ce qui se passe sur ce chatbot cette semaine ?" en 30 secondes.

## Ce qui est stocke

Pour chaque conversation completee :

- `started_at`, `duration_sec`, `messages_count`
- `tokens_total`, `cost_chf`
- `summary` : 1-2 phrases generees par Haiku 4.5
- `intent` : `devis | question_service | support | hors_sujet | autre`
- `outcome` : `lead_chaud | lead_froid | resolu | abandon | court`
- `verbatim_question` : la 1ere question du visiteur, max 200 char (pour copy/FAQ)
- `referrer` : page d'ou la conversation a demarre
- `ip_country` : pays (header Vercel)

Ce qui n'est PAS stocke en production :
- Texte des messages
- IP, user-agent, cookies
- Aucune donnee identifiante

En **mode calibration** (`CHAT_LOG_VERBATIM=true`), le texte des messages est stocke 2 semaines pour valider que les resumes Haiku capturent bien la realite. Apres ces 2 semaines, basculer la variable a `false` et purger la table `chat_messages`.

## Architecture

```
Visiteur ──> ChatWidget.tsx
              │ (1) genere session_id (UUID v4) au 1er message
              │ (2) ajoute sessionId + referrer dans body de chaque request
              │
              v
         /api/chat (route.ts)
              │ (3) onFinish: log message + tokens dans chat_messages
              │
              v          (4) au unload / inactivite 5 min :
              │              navigator.sendBeacon vers
              │              /api/chat/close
              │
              v
        /api/chat/close (route.ts)
              │ (5) closeSession() :
              │     - fetch chat_messages de la session
              │     - genere resume via Haiku
              │     - upsert chat_sessions
              │     - delete chat_messages (sauf calibration)
              │
              v
          Supabase
              ^
              │ (6) FILET : cron Vercel /15 min ──> /api/chat/sweep
              │     sweepOpenSessions() rejoue closeSession() sur
              │     tout ce que la vue chat_sessions_pending liste
              │     (dernier message > 15 min). Le beacon se perd
              │     une fois sur deux, ce balayage rattrape.
              │
              v
       /admin/chat?token=XXX
       (page server component, lecture seule)
```

## Setup (premiere fois)

### 1. Creer le projet Supabase DKDP

1. Aller sur supabase.com -> New project
2. Nom : `dkdp-chatbot-analytics` (ou reutiliser un projet existant)
3. Region : `eu-central-1` (Frankfurt) pour la latence
4. Copier l'URL et la `service_role` key (Settings > API)

### 2. Creer le schema

SQL editor du projet Supabase, coller le contenu de `docs/supabase-chat-schema.sql`, executer. Idempotent (peut etre rejoue sans casser).

### 3. Variables d'env

Dans le dashboard Vercel du projet DKDP (Settings > Environment Variables) ajouter pour Production + Preview :

| Variable | Valeur | Note |
|----------|--------|------|
| `SUPABASE_URL` | `https://xxx.supabase.co` | Step 1 |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Step 1, secret |
| `ADMIN_TOKEN` | `openssl rand -hex 32` | Token URL admin |
| `CHAT_LOG_VERBATIM` | `true` | Requis pour avoir des resumes |
| `CRON_SECRET` | `openssl rand -hex 32` | Lu par le cron Vercel, protege /api/chat/sweep |

`ANTHROPIC_API_KEY` est deja configure pour le chatbot, le module analytics reutilise la meme cle.

Ajouter aussi en local dans `.env.local` (voir `.env.local.example`).

### 4. Installer la dep

```bash
npm install @supabase/supabase-js
```

### 5. Deployer

Push sur `main`. Vercel auto-deploy.

### 6. Bookmark l'URL admin

`https://dkdp.ch/admin/chat?token=<ADMIN_TOKEN>`

Sans le token : 404 (pas 401, on cache l'existence de la page).

## Apres 2 semaines de calibration

1. Aller sur `/admin/chat`, verifier que les resumes Haiku sont representatifs
2. Si oui : passer `CHAT_LOG_VERBATIM=false` dans Vercel + redeploy
3. Purger `chat_messages` dans Supabase :
   ```sql
   delete from public.chat_messages;
   ```
4. A partir de la, `chat_messages` est vide en permanence (les rows sont creees pendant la conversation puis supprimees apres resume).

Note : si `CHAT_LOG_VERBATIM=false`, la fonction `generateSummary` n'a plus de texte brut a passer a Haiku, donc le champ `summary` reste null. On garde uniquement intent (impossible a deduire) et metriques.

**Decision a prendre apres calibration** :
- **Option A (max RGPD)** : `CHAT_LOG_VERBATIM=false`, plus de resumes ni intent. On a juste les metriques quanti.
- **Option B (recommandee)** : laisser `CHAT_LOG_VERBATIM=true` mais purger `chat_messages` periodiquement (cron Supabase, daily delete des rows > 2h). On garde les resumes qualitatifs sans accumulation longue duree.

## Retention et auto-purge

Un cron `pg_cron` tourne tous les jours a 03:00 UTC dans Supabase et supprime tout ce qui a plus de 90 jours dans `chat_sessions` et `chat_messages`. Bon compromis entre :

- garder assez d'historique pour comparer "ce mois-ci vs le mois dernier"
- minimiser la donnee stockee (RGPD : ne garder que ce qui est utile au business)

Modifier la retention :
```sql
-- Lister les jobs
select * from cron.job;

-- Supprimer le job actuel
select cron.unschedule('purge-old-chat-data');

-- Recreer avec une retention differente (ex: 30 ou 180 jours)
select cron.schedule(
  'purge-old-chat-data',
  '0 3 * * *',
  $$
    delete from public.chat_sessions where started_at < now() - interval '180 days';
    delete from public.chat_messages where ts < now() - interval '180 days';
  $$
);
```

## Limitations connues

- **sendBeacon best-effort** : le beacon de cloture se perd regulierement (onglet tue, navigation soft Next.js, Safari mobile). Entre juin et septembre 2026, une session sur deux n'a jamais ete resumee. **Corrige le 2026-09-06** par le balayage serveur, voir la section dediee : le beacon reste le chemin rapide, le cron est le filet.
- **Cold start**: la 1ere session apres un cold start serverless paie ~200ms de plus pour init du client Supabase.
- **Pas de RLS public** : la table chat_sessions n'est lisible qu'avec la service role key. Si on voulait exposer un dashboard public, il faudrait creer une vue + policy.

## Balayage serveur des sessions non fermees

Ajoute le 2026-09-06. Le resume ne depend plus du navigateur.

**Vue `chat_sessions_pending`** (dans `docs/supabase-chat-schema.sql`) : liste les sessions qui ont des messages mais pas de ligne de resume, plus celles dont le nombre de messages a augmente depuis le dernier resume (visiteur qui reprend la conversation apres une pause).

**`sweepOpenSessions()`** dans `chat-analytics.ts` : prend les sessions de cette vue dont le dernier message date de plus de 15 min, et rejoue `closeSession()` dessus. Le seuil de 15 min laisse passer une conversation qui reprend sans la couper en deux, le timer d'inactivite du widget etant a 5 min.

**`/api/chat/sweep`** : appele par le cron Vercel toutes les 15 min (`vercel.json`), authentifie par `Authorization: Bearer $CRON_SECRET`. Repond 404 sans secret valable, comme `/admin/chat`.

Rattrapage manuel :

```bash
curl "https://dkdp.ch/api/chat/sweep?token=$ADMIN_TOKEN"
# -> {"swept":9,"sessionIds":[...]}
```

Le parametre `?stale=0` balaie tout, y compris une conversation en cours. A ne faire qu'en rattrapage ponctuel.

**Trois garde-fous** :
- `closeSession()` fait un `upsert` et compare `messages_count` : rejouer le balayage sur une session deja resumee ne fait rien.
- L'email lead chaud ne part que sur la bascule vers `lead_chaud`, jamais deux fois pour la meme session.
- `referrer` et `ip_country` sont desormais logges sur chaque message et plus seulement dans le beacon, sinon une session balayee perdrait sa page d'origine.

**Seuil de resume** : `SUMMARY_MIN_MESSAGES = 1`, et plus aucune condition de duree. L'ancien verrou (2 messages ET 30 s) n'a laisse passer aucune conversation en quatre mois : les visiteurs posent leur question et repartent en moins de 30 secondes.

## Notification email leads chauds

Quand un visiteur termine une conversation avec `outcome = 'lead_chaud'` (Haiku detecte qu'il a demande devis/RDV/contact), un mail est envoye automatiquement a `dk@dkdp.ch` via Resend (deja configure pour le formulaire de contact). Le mail contient :

- Question initiale du visiteur (verbatim)
- Resume genere par Haiku
- Pays + page d'origine
- Lien direct vers le dashboard

Pas de configuration supplementaire requise : tant que `RESEND_API_KEY` est presente, ca marche. Si elle est absente, la fonction skip silencieusement (le reste de l'analytics continue).

## Hierarchie du dashboard

`/admin/chat?token=XXX` est organise par criticite business :

1. **A rappeler maintenant** : leads chauds, en cards orange visuellement marquees
2. **Interets detectes** : leads froids, a recontacter quand possible
3. **Conversations recentes** : sessions resolues ou neutres, format compact
4. **Sessions courtes / abandons** : repliable, infos seulement

Chaque section ne s'affiche que si elle a du contenu.

## Cout

- **Conversation** : ~0.012 CHF par echange. Le system prompt embarque toute la base de connaissances du site (~130k tokens), mais il est relu du cache a chaque tour, et une lecture de cache est facturee 10 % d'un token d'entree.
- **Haiku resume** : ~250 tokens out + 500 tokens in par conversation = ~0.0008 CHF/session
- Supabase free tier : 500 MB DB + 2 GB transfer = largement suffisant pour < 1000 sessions/mois
- Vercel : plan **Pro** (necessaire pour un cron a la frequence de 15 min, le plan Hobby plafonne a un cron par jour)
- Resend free tier : 3000 emails/mois (largement assez pour les leads chauds)

A 50 sessions/jour : environ 20 CHF/mois, dont l'essentiel est la conversation elle-meme et non le resume.

⚠️ **Le champ `cost_chf` a longtemps surestime d'un facteur ~10.** Il facturait au tarif plein des tokens d'entree qui sont en grande majorite des lectures de cache. Corrige le 2026-09-06 : `chat_messages` porte desormais `cache_read_tokens` et `cache_write_tokens`, et `closeSession` applique les quatre tarifs Haiku (entree 1.00, sortie 5.00, ecriture de cache 1.25, lecture de cache 0.10 USD/M). Les sessions anterieures au correctif n'ont pas le detail et gardent leur cout surestime, on ne fabrique pas une repartition qu'on n'a pas mesuree.
