import connectRedis from "connect-redis";
import session from "express-session";
import Redis from 'ioredis'

const RedisStore = connectRedis(session);
const redisClient = new Redis({
    host: 'localhost',
    port: 6379
})

export const store = new RedisStore({
    // client: redisClient,
    // ttl: 3600,
    url: `${process.env.REDIS_URL}`
})