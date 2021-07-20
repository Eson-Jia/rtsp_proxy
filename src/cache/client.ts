import { promisifyAll } from "bluebird";
import config from "config";
import { createClient, RedisClient } from "redis";

promisifyAll(RedisClient.prototype);
const client = createClient(config.get('redis'));

client.on('error', (err) => {
    throw new Error(`redis ${err.message}`);
});

export default client;