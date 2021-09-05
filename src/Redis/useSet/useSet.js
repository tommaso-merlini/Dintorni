const client = require("../redis");

const useSet = async (key, value, expireTime) => {
  try {
    if(!client) throw new Error("redis client is not activated ");
    if (expireTime === "permanent") {
      await client.setAsync(key, JSON.stringify(value));
    } else {
      const expireTime = 86400; //one day
      await client.setexAsync(key, expireTime, JSON.stringify(value));
    }
    console.log(`SET cache | ${key}`);
    return "OK";
  } catch (e) {
    //throw new Error("something went wrong by setting the redis cache");
    return null
  }
};

module.exports = useSet;
