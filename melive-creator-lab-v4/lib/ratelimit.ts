const store = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

export function checkRateLimit(ip: string): { allowed: boolean; resetAt: number } {
  const now = Date.now();
  const key = `rl:${ip}`;
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, resetAt: now + WINDOW_MS };
  }
  if (entry.count >= LIMIT) return { allowed: false, resetAt: entry.resetAt };
  entry.count += 1;
  return { allowed: true, resetAt: entry.resetAt };
}
