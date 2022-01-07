import redis from "redis";
import bluebird from "bluebird";
import chalk from "chalk"; //console.log colors

const retry_strategy = function (options) {
  if (
    options.error &&
    (options.error.code === "ECONNREFUSED" ||
      options.error.code === "NR_CLOSED")
  ) {
    // Try reconnecting after 5 seconds
    console.log(
      chalk.bgRed.black(
        "The redis server refused the connection. Retrying connection..."
      )
    );
    return 5000;
  }
  if (options.total_retry_time > 1000 * 60 * 60) {
    // End reconnecting after a specific timeout and flush all commands with an individual error
    return new Error("Redis Retry time exhausted");
  }
  if (options.attempt > 50) {
    // End reconnecting with built in error
    return undefined;
  }
  // reconnect after
  return Math.min(options.attempt * 100, 3000);
};

const client = redis.createClient({
  port: 6379,
  host: "redis",
  //if the client crashes let the app knows => direct connection to mongodb
  retry_strategy: retry_strategy,
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on("error", (err: Error) => {
  console.log("redis error: " + err);
});

process.on("SIGINT", () => {
  client.quit();
});

client.on("connect", () => {
  console.log(chalk.bgGreen.black(`client connected to redis :D`));
});

process.on("exit", () => {
  client.quit();
});

module.exports = client;
