import { Redis } from "ioredis";
const getRedisUrl = () => {
  if (process.env.UPSTASH_REDIS_URL) {
    return process.env.UPSTASH_REDIS_URL;
  }

  throw new Error("Redis URL is not set");
};

const redis = new Redis(getRedisUrl());
