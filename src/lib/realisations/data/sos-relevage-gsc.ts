/**
 * Search Console de sos-relevage.ch, propriété de domaine, recherche web,
 * par jour, du 2026-07-25 au 2026-09-23 (données consolidées à J-2).
 * Relevé le 2026-09-25 par le MCP search-console (`gsc_performances`,
 * dimension `date`). Totaux : 44 clics, 1'802 impressions.
 *
 * Données brutes gardées telles quelles pour que la courbe se vérifie ; la
 * page n'affiche que leur somme glissante (voir `rollingSum`).
 */
export interface GscDay {
  date: string
  clicks: number
  impressions: number
}

export const SOS_GSC_DAILY: GscDay[] = [
  { date: '2026-07-25', clicks: 0, impressions: 0 },
  { date: '2026-07-26', clicks: 2, impressions: 8 },
  { date: '2026-07-27', clicks: 2, impressions: 6 },
  { date: '2026-07-28', clicks: 0, impressions: 3 },
  { date: '2026-07-29', clicks: 1, impressions: 3 },
  { date: '2026-07-30', clicks: 0, impressions: 1 },
  { date: '2026-07-31', clicks: 0, impressions: 3 },
  { date: '2026-08-01', clicks: 0, impressions: 2 },
  { date: '2026-08-02', clicks: 0, impressions: 2 },
  { date: '2026-08-03', clicks: 1, impressions: 7 },
  { date: '2026-08-04', clicks: 0, impressions: 1 },
  { date: '2026-08-05', clicks: 0, impressions: 4 },
  { date: '2026-08-06', clicks: 0, impressions: 3 },
  { date: '2026-08-07', clicks: 0, impressions: 3 },
  { date: '2026-08-08', clicks: 0, impressions: 2 },
  { date: '2026-08-09', clicks: 0, impressions: 1 },
  { date: '2026-08-10', clicks: 0, impressions: 3 },
  { date: '2026-08-11', clicks: 0, impressions: 2 },
  { date: '2026-08-12', clicks: 0, impressions: 9 },
  { date: '2026-08-13', clicks: 0, impressions: 1 },
  { date: '2026-08-14', clicks: 0, impressions: 6 },
  { date: '2026-08-15', clicks: 0, impressions: 2 },
  { date: '2026-08-16', clicks: 0, impressions: 6 },
  { date: '2026-08-17', clicks: 0, impressions: 1 },
  { date: '2026-08-18', clicks: 0, impressions: 2 },
  { date: '2026-08-19', clicks: 1, impressions: 7 },
  { date: '2026-08-20', clicks: 2, impressions: 6 },
  { date: '2026-08-21', clicks: 0, impressions: 12 },
  { date: '2026-08-22', clicks: 0, impressions: 15 },
  { date: '2026-08-23', clicks: 0, impressions: 28 },
  { date: '2026-08-24', clicks: 0, impressions: 24 },
  { date: '2026-08-25', clicks: 1, impressions: 32 },
  { date: '2026-08-26', clicks: 0, impressions: 25 },
  { date: '2026-08-27', clicks: 0, impressions: 32 },
  { date: '2026-08-28', clicks: 0, impressions: 34 },
  { date: '2026-08-29', clicks: 1, impressions: 28 },
  { date: '2026-08-30', clicks: 1, impressions: 26 },
  { date: '2026-08-31', clicks: 0, impressions: 46 },
  { date: '2026-09-01', clicks: 2, impressions: 49 },
  { date: '2026-09-02', clicks: 2, impressions: 50 },
  { date: '2026-09-03', clicks: 1, impressions: 28 },
  { date: '2026-09-04', clicks: 1, impressions: 28 },
  { date: '2026-09-05', clicks: 3, impressions: 18 },
  { date: '2026-09-06', clicks: 0, impressions: 24 },
  { date: '2026-09-07', clicks: 0, impressions: 45 },
  { date: '2026-09-08', clicks: 0, impressions: 92 },
  { date: '2026-09-09', clicks: 2, impressions: 87 },
  { date: '2026-09-10', clicks: 3, impressions: 53 },
  { date: '2026-09-11', clicks: 6, impressions: 69 },
  { date: '2026-09-12', clicks: 0, impressions: 37 },
  { date: '2026-09-13', clicks: 0, impressions: 56 },
  { date: '2026-09-14', clicks: 1, impressions: 61 },
  { date: '2026-09-15', clicks: 1, impressions: 69 },
  { date: '2026-09-16', clicks: 3, impressions: 100 },
  { date: '2026-09-17', clicks: 0, impressions: 57 },
  { date: '2026-09-18', clicks: 0, impressions: 65 },
  { date: '2026-09-19', clicks: 0, impressions: 52 },
  { date: '2026-09-20', clicks: 0, impressions: 68 },
  { date: '2026-09-21', clicks: 3, impressions: 100 },
  { date: '2026-09-22', clicks: 3, impressions: 114 },
  { date: '2026-09-23', clicks: 1, impressions: 84 },
]

/**
 * Somme glissante sur `window` jours d'une série journalière contiguë : chaque
 * point additionne le jour et les `window - 1` jours précédents. Lisse le bruit
 * journalier sans inventer de semaines partielles.
 */
export function rollingSum(
  daily: { date: string; value: number }[],
  window: number,
): { date: string; value: number }[] {
  return daily.map((d, i) => ({
    date: d.date,
    value: daily.slice(Math.max(0, i - window + 1), i + 1).reduce((s, x) => s + x.value, 0),
  }))
}
