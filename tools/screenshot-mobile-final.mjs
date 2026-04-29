// Usage: node tools/screenshot-mobile-final.mjs
// Mobile (375x812) light-mode polish audit. Captures key flows + drawer + 404 + chat.
import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const BASE = 'http://localhost:3000'
const OUT = 'tools/screenshots-mobile-final'

const PAGES = [
  ['/',                                               'home-fold',      0],
  ['/',                                               'home-scroll1',   900],
  ['/',                                               'home-scroll2',   2200],
  ['/agence-digitale',                                'agd-fold',       0],
  ['/agence-digitale',                                'agd-scroll1',    900],
  ['/agence-digitale/creation-site-web',              'agd-csw-fold',   0],
  ['/agence-digitale/creation-site-web',              'agd-csw-faq',    4200],
  ['/intelligence-artificielle',                      'ia-fold',        0],
  ['/formation-entreprise',                           'forma-fold',     0],
  ['/formation-entreprise/claude-ai',                 'forma-claude-fold', 0],
  ['/formation-entreprise/claude-ai',                 'forma-claude-lead', 5500],
  ['/contact',                                        'contact-fold',   0],
  ['/contact',                                        'contact-direct', 1100],
  ['/tarifs',                                         'tarifs-fold',    0],
  ['/tarifs',                                         'tarifs-faq',     3800],
  ['/blog',                                           'blog-fold',      0],
  ['/glossaire',                                      'glossaire-fold', 0],
  ['/realisations',                                   'realisations-fold', 0],
  ['/this-route-does-not-exist',                      '404-fold',       0],
]

async function main() {
  await mkdir(OUT, { recursive: true })
  const browser = await chromium.launch()
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
  })
  await ctx.addInitScript(() => {
    try { localStorage.setItem('dkdp-theme', 'light') } catch {}
  })

  for (const [path, name, scrollY] of PAGES) {
    const page = await ctx.newPage()
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 45000 })
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
      await page.waitForTimeout(700)
      if (scrollY > 0) {
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY)
        await page.waitForTimeout(500)
      }
      await page.screenshot({
        path: `${OUT}/${name}.png`,
        fullPage: false,
      })
      console.log(`OK  ${name}  ${path} y=${scrollY}`)
    } catch (e) {
      console.error(`ERR ${name}: ${e.message}`)
    }
    await page.close()
  }

  // ─────────────────── Drawer open state (mobile burger) ───────────────────
  {
    const page = await ctx.newPage()
    try {
      await page.goto(BASE + '/', { waitUntil: 'networkidle' })
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
      await page.waitForTimeout(500)
      // Find burger button. Selectors: aria-label "Menu", or class with hamburger
      const burgerSelectors = [
        'button[aria-label*="Menu" i]',
        'button[aria-label*="menu" i]',
        'header button[aria-controls]',
        'header button:has(svg)',
      ]
      let opened = false
      for (const sel of burgerSelectors) {
        const btn = await page.$(sel)
        if (btn) {
          // check it's only visible on mobile (last one usually)
          const all = await page.$$(sel)
          for (const b of all) {
            try {
              const visible = await b.isVisible()
              if (visible) {
                await b.click()
                opened = true
                console.log(`Burger via ${sel}`)
                break
              }
            } catch {}
          }
          if (opened) break
        }
      }
      if (!opened) {
        console.error('Burger not found')
      } else {
        await page.waitForTimeout(700)
        await page.screenshot({ path: `${OUT}/drawer-open.png`, fullPage: false })
        console.log('OK drawer-open')
      }
    } catch (e) {
      console.error(`drawer ERR: ${e.message}`)
    }
    await page.close()
  }

  // ─────────────────── ChatWidget flow ───────────────────
  {
    const page = await ctx.newPage()
    try {
      await page.goto(BASE + '/', { waitUntil: 'networkidle' })
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
      await page.waitForTimeout(900)

      // 1. Closed bottom bar (with rotating placeholder)
      await page.screenshot({ path: `${OUT}/chat-1-bar-closed.png`, fullPage: false })
      console.log('OK chat-1-bar-closed')

      // 2. Type into bar -> activates send btn (violet)
      const barInput = await page.$('.chat-bottom-bar-wrapper input[type="text"]:not([name="website"])')
      if (barInput) {
        await barInput.click()
        await page.waitForTimeout(300)
        await page.keyboard.type('Combien coute un site', { delay: 30 })
        await page.waitForTimeout(400)
        await page.screenshot({ path: `${OUT}/chat-2-bar-typed.png`, fullPage: false })
        console.log('OK chat-2-bar-typed')

        // Clear input then click bar to open chat with suggestions
        await page.keyboard.press('Meta+A')
        await page.keyboard.press('Backspace')
        await page.waitForTimeout(200)
      } else {
        console.error('chat bar input not found')
      }

      // 3. Open chat with no messages → suggestion pills
      // Click on bar input area (not submit) to focus and trigger open if has conversation
      // For fresh state we use a click on AnimatedOrb area or just click inside bar
      // Simpler: clear localStorage chat then reload, then click bar input which only opens if msg exist.
      // Trick: send a synthetic fast message via the input, intercept assistant response with route mock
      // Easier: just open via the welcome flow — type+submit triggers open
      await page.evaluate(() => { try { localStorage.removeItem('dkdp-chat') } catch {} })
      await page.reload({ waitUntil: 'networkidle' })
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
      await page.waitForTimeout(800)

      // Click the AnimatedOrb area in bar to open without a query? No - open requires a message.
      // Workaround: programmatically dispatch — but cleanest is to send a real message via API mock.
      // We'll mock /api/chat to return a streaming text response.
      await page.route('**/api/chat', async (route) => {
        // Return a minimal SSE stream that ai-sdk understands
        const stream = [
          'data: {"type":"start","messageId":"m1"}\n\n',
          'data: {"type":"start-step"}\n\n',
          'data: {"type":"text-start","id":"t1"}\n\n',
          'data: {"type":"text-delta","id":"t1","delta":"Pour un **site vitrine** Geneve, comptez environ **CHF 5\'000 a 12\'000** selon la complexite. Decouvrez nos [services](/agence-digitale) ou nos [tarifs](/tarifs) en detail. [BOOK]"}\n\n',
          'data: {"type":"text-end","id":"t1"}\n\n',
          'data: {"type":"finish-step"}\n\n',
          'data: {"type":"finish"}\n\n',
          'data: [DONE]\n\n',
        ].join('')
        await route.fulfill({
          status: 200,
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
          body: stream,
        })
      })

      // type + submit to open chat
      const inp2 = await page.$('.chat-bottom-bar-wrapper input[type="text"]:not([name="website"])')
      if (inp2) {
        await inp2.click()
        await page.keyboard.type('Bonjour, parlez-moi du site', { delay: 25 })
        await page.waitForTimeout(300)
        await page.keyboard.press('Enter')
        await page.waitForTimeout(1500)

        // 4. After response: assistant bubble + CTA bar + smart CTAs
        await page.screenshot({ path: `${OUT}/chat-3-after-response.png`, fullPage: false })
        console.log('OK chat-3-after-response')

        // 5. Trigger error: send another message but block route
        await page.unroute('**/api/chat')
        await page.route('**/api/chat', async (r) => r.abort())
        const ta = await page.$('.chat-window textarea')
        if (ta) {
          await ta.click()
          await page.keyboard.type('Test erreur', { delay: 20 })
          await page.keyboard.press('Enter')
          await page.waitForTimeout(2000)
          await page.screenshot({ path: `${OUT}/chat-4-error.png`, fullPage: false })
          console.log('OK chat-4-error')
        }
      } else {
        console.error('chat bar inp2 missing')
      }
    } catch (e) {
      console.error(`chat flow ERR: ${e.message}`)
    }
    await page.close()
  }

  await browser.close()
  console.log('Done')
}

main().catch(e => { console.error(e); process.exit(1) })
