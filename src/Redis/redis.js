const redis = require("redis");
const bluebird = require("bluebird");

const client = redis.createClient({
  port      : 6379,
  host      : 'redis',
  //if the client crashes let the app knows => direct connection to mongodb
  retry_strategy: function (options) {
    return undefined;
  }
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on("error", (err) => {
  console.log("redis error: " + err);
});

process.on("SIGINT", () => {
    client.quit();
});

module.exports = client;