import { LRUCache } from 'lru-cache';

const ratelimit = new LRUCache({
  max: 500,
  ttl: 60_000, // 1 minute
});

export async function rateLimit(request) {
  const ip = request.ip ?? '127.0.0.1';
  const tokenCount = ratelimit.get(ip) ?? 0;
  
  if (tokenCount > 100) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  ratelimit.set(ip, tokenCount + 1);
  return null;
}