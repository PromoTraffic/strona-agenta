/**
 * Prosty rate limiter w pamięci — dla loginu.
 * Działa na pojedynczej instancji (Docker single-node).
 */

const store = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 min

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0]?.trim() || realIp || "unknown";
  return `login:${ip}`;
}

export function checkLoginRateLimit(request: Request): { ok: true } | { ok: false; retryAfter: number } {
  const key = getClientKey(request);
  const now = Date.now();
  const entry = store.get(key);

  if (!entry) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  entry.count += 1;
  if (entry.count > MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { ok: false, retryAfter };
  }
  return { ok: true };
}
