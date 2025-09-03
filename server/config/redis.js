import { createClient } from "redis";

const client = createClient({
    username: "default",
    password: process.env.REDIS_PASS,
    socket: {
        host: "redis-10966.c334.asia-southeast2-1.gce.redns.redis-cloud.com",
        port: 10966,
    },
});

client.on("error", (err) => console.log("Redis Client Error", err));

export async function connectRedis() {
    if (!client.isOpen) {
        await client.connect();
        console.log("Redis connected");
    }
    return client;
}

export { client };
