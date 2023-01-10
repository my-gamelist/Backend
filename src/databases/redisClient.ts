import { createClient } from "@redis/client";

const host = process.env.REDIS_HOST || "localhost";
const port =  6379;

console.log(`Connecting to Redis client at ${host}:${port}`);

const redisClient = createClient({
    legacyMode: true,
    socket: {
        host,
        port,
    },
});

redisClient.on("error", (error) => {
    console.error(error);
});

redisClient.on("connect", () => {
    console.log(`Redis client connected to ${host}:${port}`);
});

process.on("exit", () => {
    console.log("Closing Redis client");
    redisClient.quit();
});

redisClient.connect();

export default redisClient;