//const client = require("../redis");

const useDel = async (key) => {
  try {
    if (!client) throw new Error("redis client is not activated ");
    await client.delAsync(key);
    console.log(`DEL cache | ${key}`);
    return "OK";
  } catch (e) {
    //throw new Error("something went wrong by setting the redis cache");
  }
};

module.exports = useDel;
