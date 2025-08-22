// config/redisClient.js
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

//  Check for the presence of `REDIS_URL`
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  console.warn("Warning: REDIS_URL not found, using default local Redis");
  // Use default local Redis URL
  const defaultRedisUrl = "redis://localhost:6379";
}

const finalRedisUrl = redisUrl || "redis://localhost:6379";

//  Create a Redis client with enhanced options
const redisClient = new Redis(finalRedisUrl, {
  tls: finalRedisUrl.startsWith("rediss://") ? {} : undefined, // Automatically enable TLS if the URL starts with rediss://
  connectTimeout: 5000, // 5 seconds timeout
  lazyConnect: true, // Don't connect immediately
  retryStrategy: (times) => {
    if (times > 3) {
      console.warn("Redis connection failed after 3 retries, disabling Redis");
      return null; // Stop retrying after 3 attempts
    }
    const delay = Math.min(times * 1000, 3000); // Gradual increase in delay
    return delay;
  },
  reconnectOnError: (err) => {
    console.warn("Redis reconnect on error:", err.message);
    return false; // Don't auto-reconnect on error
  },
  maxRetriesPerRequest: 1, // Reduce retries to fail fast
  enableOfflineQueue: false, // Don't queue commands when disconnected
});

//  Log Redis events for improved monitoring
redisClient.on("connect", () => {
  console.log("Redis connected successfully");
});
redisClient.on("ready", () => {
  console.log("Redis ready for commands");
});
redisClient.on("reconnecting", (time) => {
  console.log(`Redis reconnecting in ${time}ms`);
});
redisClient.on("error", (err) => {
  console.warn("Redis connection error:", err.message);
});
redisClient.on("end", () => {
  console.log("Redis connection ended");
});

//  Export the client
export default redisClient;
