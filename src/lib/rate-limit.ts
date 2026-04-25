/**
 * In-memory rate limiter per IP with per-minute and per-day caps.
 * Resets per serverless instance cold start — sufficient for dkdp.ch traffic.
 * For high-volume production, replace with Upstash Redis.
 */

const minuteStore = new Map<string, { count: number; resetAt: number }>()
const dailyStore = new Map<string, { count: number; resetAt: number }>()

// Clean up stale entries every 10 minutes to avoid memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of minuteStore) {
    if (now > entry.resetAt) minuteStore.delete(key)
  }
  for (const [key, entry] of dailyStore) {
    if (now > entry.resetAt) dailyStore.delete(key)
  }
}, 10 * 60 * 1000)

interface RateLimitOptions {
  /** Max requests in the window */
  limit: number
  /** Window in milliseconds */
  windowMs: number
  /** Namespace key (e.g. route name) so each route has its own counter per IP */
  scope?: string
}

export function rateLimit(ip: string, opts: RateLimitOptions): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const key = opts.scope ? `${opts.scope}:${ip}` : ip
  const entry = minuteStore.get(key)

  if (!entry || now > entry.resetAt) {
    minuteStore.set(key, { count: 1, resetAt: now + opts.windowMs })
    return { allowed: true, remaining: opts.limit - 1 }
  }

  entry.count += 1

  if (entry.count > opts.limit) {
    return { allowed: false, remaining: 0 }
  }

  return { allowed: true, remaining: opts.limit - entry.count }
}

/** Daily rate limit: cap total messages per IP per day */
export function rateLimitDaily(ip: string, dailyLimit: number): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const DAY_MS = 24 * 60 * 60 * 1000
  const entry = dailyStore.get(ip)

  if (!entry || now > entry.resetAt) {
    dailyStore.set(ip, { count: 1, resetAt: now + DAY_MS })
    return { allowed: true, remaining: dailyLimit - 1 }
  }

  entry.count += 1

  if (entry.count > dailyLimit) {
    return { allowed: false, remaining: 0 }
  }

  return { allowed: true, remaining: dailyLimit - entry.count }
}

/** Extract a best-effort IP from Next.js request headers */
export function getIp(req: Request): string {
  const headers = req.headers
  return (
    headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}
