import { Redis } from "ioredis";

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }

  throw new Error("Redis URL is not set");
};

export const redis = new Redis(getRedisUrl());

// Cache TTL in seconds (24 hours)
export const CACHE_TTL = 24 * 60 * 60;

// Cache keys
export const CACHE_KEYS = {
  BANKS: "banks",
  BANK_DETAILS: (bank) => `bank:${bank}`,
  STATES: (bank) => `states:${bank}`,
  CITIES: (bank, state) => `cities:${bank}:${state}`,
  BRANCHES: (bank, state, city) => `branches:${bank}:${state}:${city}`,
  STATS: "stats",
};

// Helper functions for caching
export async function getCache(key) {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Cache get error for key ${key}:`, error);
    return null;
  }
}

export async function setCache(key, data, ttl = CACHE_TTL) {
  try {
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.error(`Cache set error for key ${key}:`, error);
  }
}

export async function deleteCache(key) {
  try {
    await redis.del(key);
  } catch (error) {
    console.error(`Cache delete error for key ${key}:`, error);
  }
}

export async function clearCache() {
  try {
    await redis.flushall();
  } catch (error) {
    console.error("Cache clear error:", error);
  }
}
