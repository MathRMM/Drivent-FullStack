import { createClient } from "redis";

async function connectRedis() {
  const redisClient = createClient();
  await redisClient.connect();

  return redisClient;
}

export default connectRedis;
