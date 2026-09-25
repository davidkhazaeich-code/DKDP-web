import type { Realisation, ResultSourceKind } from './types'

/**
 * Regles de preuve des realisations (2026-09-25).
 *
 * Une etude de cas vaut par ce qu'elle prouve. Ces regles sont celles que
 * David a validees : chaque client nomme a donne son accord, chaque chiffre a
 * une source et une date, et les donnees privees d'un client (Search Console,
 * GA4, Ads, CRM) ne sortent qu'avec son accord ecrit. Le test
 * `__tests__/proof.test.ts` applique ces regles a toutes les realisations :
 * une etude qui les enfreint fait echouer la suite.
 *
 * Pourquoi dans le code : un faux chiffre ou un faux avis est une indication
 * fallacieuse (art. 3 LCD), et un moteur generatif qui croise les sources cite
 * le chiffre verifiable, pas celui du site. Voir la memory
 * `feedback_chiffres_empruntes_entre_sites`.
 */

export interface ProofIssue {
  slug: string
  rule: string
  message: string
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const EM_DASH = '\u2014'
const ANSWER_MAX_WORDS = 60

/** Date du jour au format YYYY-MM-DD, en heure de Geneve. */
export function todayISO(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Zurich' }).format(now)
}

function isIsoDate(value: string | undefined): value is string {
  if (!value || !ISO_DATE.test(value)) return false
  return !Number.isNaN(new Date(`${value}T12:00:00Z`).getTime())
}

/** Toutes les chaines d'un objet, pour les controles de typographie. */
function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collectStrings(v, out))
  return out
}

/** Les chiffres prives d'un client exigent l'accord ecrit de publier ses chiffres. */
function clientDataAllowed(r: Realisation): boolean {
  if (r.consent.level === 'interne') return true
  return r.consent.level === 'nomme-chiffres' && r.consent.evidence?.kind === 'accord-ecrit'
}

export function proofIssues(r: Realisation, today: string = todayISO()): ProofIssue[] {
  const issues: ProofIssue[] = []
  const add = (rule: string, message: string) => issues.push({ slug: r.slug, rule, message })
  const { consent } = r

  // Accord client
  if (consent.level === 'nomme' || consent.level === 'nomme-chiffres') {
    if (!consent.evidence) {
      add('consent-evidence', "Un client nommé exige une preuve d'accord (accord écrit, clause du contrat ou demande en cours datée).")
    }
  }
  if (consent.evidence) {
    const ev = consent.evidence
    if (!isIsoDate(ev.date)) add('consent-date', `Date d'accord invalide : ${ev.date}`)
    if (!ev.reference.trim()) add('consent-reference', "L'accord doit dire où retrouver sa preuve.")
    if (ev.kind === 'a-confirmer') {
      if (!isIsoDate(ev.deadline)) {
        add('consent-deadline', 'Un accord à confirmer porte une date limite (YYYY-MM-DD).')
      } else if (today > ev.deadline) {
        add('consent-expired', `Accord demandé le ${ev.date}, toujours à confirmer après la date limite du ${ev.deadline} : l'obtenir, anonymiser ou retirer l'étude.`)
      }
    }
  }
  if (consent.level === 'nomme-chiffres' && consent.evidence?.kind !== 'accord-ecrit') {
    add('consent-numbers', 'Publier les chiffres d’un client exige son accord écrit.')
  }
  if (consent.level === 'anonyme') {
    if (r.liveUrl) add('anonyme-lien', 'Une étude anonyme ne renvoie pas vers le site du client.')
    if (r.client.logo) add('anonyme-logo', 'Une étude anonyme ne montre pas le logo du client.')
    if (!r.client.anonymized) add('anonyme-flag', 'Une étude anonyme se déclare `client.anonymized: true`.')
  }

  // Chiffres
  const checkSourced = (
    kind: 'result' | 'datastory',
    label: string,
    source: string,
    sourceKind: ResultSourceKind,
    capturedAt: string,
  ) => {
    if (!source.trim()) add(`${kind}-source`, `${label} : source manquante.`)
    if (!isIsoDate(capturedAt) || capturedAt > today) {
      add(`${kind}-date`, `${label} : date de relevé invalide ou future (${capturedAt}).`)
    }
    if (sourceKind === 'client' && !clientDataAllowed(r)) {
      add(`${kind}-client-data`, `${label} : donnée privée du client publiée sans son accord écrit pour les chiffres.`)
    }
  }
  for (const res of r.results ?? []) {
    checkSourced('result', `Résultat « ${res.metric} »`, res.source, res.sourceKind, res.capturedAt)
  }
  for (const ds of r.dataStories ?? []) {
    checkSourced('datastory', `Courbe « ${ds.title} »`, ds.source, ds.sourceKind, ds.capturedAt)
    const dates = ds.series.map((p) => p.date)
    if (dates.some((d) => !isIsoDate(d))) add('datastory-series', `Courbe « ${ds.title} » : date de point invalide.`)
    if (dates.some((d, i) => i > 0 && d <= dates[i - 1])) add('datastory-order', `Courbe « ${ds.title} » : points non triés par date.`)
    if (ds.series.some((p) => !Number.isFinite(p.value))) add('datastory-value', `Courbe « ${ds.title} » : valeur non numérique.`)
  }
  if (r.testimonial) {
    const t = r.testimonial
    if (!t.source.trim() || !isIsoDate(t.date)) {
      add('testimonial-source', 'Un témoignage cite sa source et sa date : jamais une citation sans provenance.')
    }
  }

  // Forme
  if (r.meta.status === 'live' && !r.hero && !r.cover) {
    add('visual', 'Une étude en ligne a un visuel : capture du site (`hero`) ou couverture (`cover`).')
  }
  if (r.answer) {
    const words = r.answer.trim().split(/\s+/).length
    if (words > ANSWER_MAX_WORDS) add('answer-length', `Réponse directe de ${words} mots, ${ANSWER_MAX_WORDS} au plus.`)
  }
  if (r.meta.seoDescription && r.meta.seoDescription.length > 160) {
    add('seo-description', `Description SEO de ${r.meta.seoDescription.length} caractères, 160 au plus (Google coupe vers 920 px).`)
  }
  if (r.domains.length === 0 || new Set(r.domains).size !== r.domains.length) {
    add('domains', 'Au moins un domaine, sans doublon.')
  }
  if (!isIsoDate(r.meta.dateISO)) add('date', `Date de publication invalide : ${r.meta.dateISO}`)
  if (r.meta.dateModifiedISO && (!isIsoDate(r.meta.dateModifiedISO) || r.meta.dateModifiedISO < r.meta.dateISO)) {
    add('date-modified', 'La date de révision suit la date de publication.')
  }
  if (collectStrings(r).some((s) => s.includes(EM_DASH))) {
    add('em-dash', 'Tiret cadratin interdit dans le texte visible (règle du site).')
  }
  return issues
}
