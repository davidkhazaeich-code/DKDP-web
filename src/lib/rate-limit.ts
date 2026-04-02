/**
 * Simple in-memory rate limiter per IP.
 * Resets per serverless instance cold start — sufficient for dkdp.ch traffic.
 * For high-volume production, replace with Upstash Redis.
 */

const store = new Map<string, { count: number; resetAt: number }>()

interface RateLimitOptions {
  /** Max requests in the window */
  limit: number
  /** Window in milliseconds */
  windowMs: number
}

export function rateLimit(ip: string, opts: RateLimitOptions): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + opts.windowMs })
    return { allowed: true, remaining: opts.limit - 1 }
  }

  entry.count += 1

  if (entry.count > opts.limit) {
    return { allowed: false, remaining: 0 }
  }

  return { allowed: true, remaining: opts.limit - entry.count }
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
