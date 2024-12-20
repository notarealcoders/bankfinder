import { redis } from "./client";
import { CACHE_TTL } from "./config";
import { transformBankData } from "../utils/transformers";
import { logCache } from "../utils/logger";

export async function getCache(key) {
  try {
    const data = await redis.get(key);
    if (!data) {
      logCache("DEBUG", `Cache miss for key: ${key}`);
      return null;
    }

    const parsed = JSON.parse(data);
    const transformed = transformBankData(parsed);

    logCache("INFO", `Cache hit for key: ${key}`, {
      originalSize: data.length,
      transformedSize: JSON.stringify(transformed).length,
    });

    return transformed;
  } catch (error) {
    logCache("ERROR", `Cache get error for key ${key}:`, error);
    return null;
  }
}

export async function setCache(key, data, ttl = CACHE_TTL) {
  try {
    const transformedData = transformBankData(data);
    await redis.setex(key, ttl, JSON.stringify(transformedData));

    logCache("INFO", `Cache set for key: ${key}`, {
      ttl,
      dataSize: JSON.stringify(transformedData).length,
    });
  } catch (error) {
    logCache("ERROR", `Cache set error for key ${key}:`, error);
  }
}

export async function deleteCache(key) {
  try {
    await redis.del(key);
    logCache("INFO", `Cache deleted for key: ${key}`);
  } catch (error) {
    logCache("ERROR", `Cache delete error for key ${key}:`, error);
  }
}

export async function clearCache() {
  try {
    await redis.flushall();
    logCache("INFO", "Cache cleared completely");
  } catch (error) {
    logCache("ERROR", "Cache clear error:", error);
  }
}
