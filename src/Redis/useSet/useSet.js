const useSet = async (key, value, client) => {
  try {
    await client.setAsync(key, JSON.stringify(value));
    // console.log(`SET cache | ${key}`);
    return "OK";
  } catch (e) {
    //throw new Error("something went wrong by setting the redis cache");
    return null;
  }
};

module.exports = useSet;
