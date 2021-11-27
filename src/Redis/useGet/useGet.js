//const client = require("../redis");

const useGet = async (key) => {
  try {
    if (!client) throw new Error("redis client is not activated ");
    //check if the request is cached
    const request = await client.getAsync(key);
    //if the request is already cached return it
    if (request) {
      // console.log(`GET cache | ${key}`);
      return JSON.parse(request);
    } else {
      //throw new Error("something went wrong by getting the redis cache");
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = useGet;
