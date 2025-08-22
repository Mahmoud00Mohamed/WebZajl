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
  retryStrategy: (times) => {
    const delay = Math.min(times * 100, 5000); // Gradual increase in delay
    return delay;
  },
  reconnectOnError: (err) => {
    return true; // Attempt to reconnect on error
  },
  maxRetriesPerRequest: 3,
  lazyConnect: true, // Don't connect immediately, wait for first command
});

//  Log Redis events for improved monitoring
redisClient.on("connect", () => {});
redisClient.on("ready", () => {});
redisClient.on("reconnecting", (time) => {});
redisClient.on("error", (err) => {});
redisClient.on("end", () => {});

//  Export the client
export default redisClient;
