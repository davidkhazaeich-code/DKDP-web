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
              │ (2) ajoute sessionId dans body de chaque request
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
              │     - insert chat_sessions
              │     - delete chat_messages (sauf calibration)
              │
              v
          Supabase
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
| `CHAT_LOG_VERBATIM` | `true` | Mode calibration 2 semaines |

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

Un cron `pg_cron` tourne tous les jours a 03:00 UTC dans Supabase et supprime tout ce qui a plus de 30 jours dans `chat_sessions` et `chat_messages`. Bon compromis entre :

- garder assez d'historique pour comparer "ce mois-ci vs le mois dernier"
- minimiser la donnee stockee (RGPD : ne garder que ce qui est utile au business)

Modifier la retention :
```sql
-- Lister les jobs
select * from cron.job;

-- Supprimer le job actuel
select cron.unschedule('purge-old-chat-data');

-- Recreer avec une retention differente (ex: 60 jours)
select cron.schedule(
  'purge-old-chat-data',
  '0 3 * * *',
  $$
    delete from public.chat_sessions where started_at < now() - interval '60 days';
    delete from public.chat_messages where ts < now() - interval '60 days';
  $$
);
```

## Limitations connues

- **sendBeacon best-effort** : sur certains mobiles ou navigateurs avec batterie faible, le beacon de cloture peut etre dropped. La session reste alors en "ouvert" indefiniment. Mitigation a venir : un cron Supabase qui clos automatiquement les sessions dont la derniere activite > 1h.
- **Cold start**: la 1ere session apres un cold start serverless paie ~200ms de plus pour init du client Supabase.
- **Pas de RLS public** : la table chat_sessions n'est lisible qu'avec la service role key. Si on voulait exposer un dashboard public, il faudrait creer une vue + policy.

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

- Haiku resume : ~250 tokens out + 500 tokens in par conversation = ~0.0008 CHF/session
- Supabase free tier : 500 MB DB + 2 GB transfer = largement suffisant pour < 1000 sessions/mois
- Vercel : compris dans le hobby plan actuel
- Resend free tier : 3000 emails/mois (largement assez pour les leads chauds)

A 50 sessions/jour (ce qui serait deja un succes) : ~1.20 CHF/mois de cout LLM.
