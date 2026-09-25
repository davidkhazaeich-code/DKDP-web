// tools/realisations/block-tracking.mjs
//
// Une capture ou une video d'etude de cas ne doit jamais compter comme une
// visite dans les statistiques du client (GA4, Ads, pixels). Ce module coupe
// les requetes de mesure avant qu'elles partent. A appliquer sur le contexte
// ou la page Playwright avant le premier `goto`.
const TRACKERS = [
  /google-analytics\.com/,
  /analytics\.google\.com/,
  /googletagmanager\.com/,
  /googleadservices\.com/,
  /doubleclick\.net/,
  /google\.[a-z.]+\/pagead\//,
  /google\.[a-z.]+\/ccm\/collect/,
  /connect\.facebook\.net/,
  /facebook\.com\/tr/,
  /clarity\.ms/,
  /hotjar\./,
  /plausible\.io/,
  /bzrcdn\./,
  /vercel-insights|\/_vercel\/insights|\/_vercel\/speed-insights/,
]

export async function blockTracking(target) {
  await target.route(
    (url) => TRACKERS.some((re) => re.test(url.href)),
    (route) => route.abort(),
  )
}

/** Defilement lent jusqu'en bas : les sections qui se revelent a l'intersection s'affichent vraiment. */
export async function slowScrollToBottom(page, step = 250, pause = 90) {
  await page.evaluate(
    async ({ step, pause }) => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, pause))
      }
    },
    { step, pause },
  )
  await page.waitForTimeout(700)
}
