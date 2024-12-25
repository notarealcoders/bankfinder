import { redis } from '../cache/redis';

export async function cacheData(key, data, ttl = 3600) {
  try {
    await redis.setex(key, ttl, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Cache error:', error);
    return false;
  }
}

export async function getCachedData(key) {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Cache error:', error);
    return null;
  }
}

export async function invalidateCache(pattern) {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
    return true;
  } catch (error) {
    console.error('Cache invalidation error:', error);
    return false;
  }
}