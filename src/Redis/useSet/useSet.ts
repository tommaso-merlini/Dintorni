const useSet = async (key: string, value: string, client: any) => {
  try {
    await client.setAsync(key, JSON.stringify(value));
    // console.log(`SET cache | ${key}`);
    return "OK";
  } catch (e) {
    //throw new Error("something went wrong by setting the redis cache");
    return null;
  }
};

export default useSet;
