import redis from "redis";

const RedisPort = process.env.REDIS_PORT;
const RedisHost = process.env.REDIS_HOST;

const redisClient = redis.createClient(RedisPort, RedisHost);

redisClient.on("connect", function () {
  console.log("Redis Client Connected.");
});

export { redisClient };
