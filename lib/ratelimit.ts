/**
 * In-memory rate limiter — MVP implementation
 * Limits submissions to 5 per IP per hour.
 * Note: resets on server restart. Upgrade to Upstash Redis for production persistence.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number; // Unix timestamp ms
}

const store = new Map<string, RateLimitEntry>();

const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000); // every 5 minutes

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const key = `submit:${ip}`;
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // First request in this window
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: LIMIT - 1, resetAt: now + WINDOW_MS };
  }

  if (entry.count >= LIMIT) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: LIMIT - entry.count,
    resetAt: entry.resetAt,
  };
}
