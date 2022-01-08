const useDel = async (key: string, client: any) => {
  try {
    if (!client) throw new Error("redis client is not activated ");
    await client.delAsync(key);
    //console.log(`DEL cache | ${key}`);
    return "OK";
  } catch (e) {
    //throw new Error("something went wrong by setting the redis cache");
  }
};

export default useDel;
