const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");
const { GraphQLError } = require("graphql");

const shop = async (_, { id }, { client }) => {
  try {
    //check if the shop is cached
    const redisShop = await useGet(`shop/${id}`, client);

    //if the shop is cached return it
    if (redisShop) return redisShop;

    //get the shop from mongodb if not cached
    const shop = await Shop.findById(id);

    if (!shop) throw new Error("this shop does not exist");

    //if the shop is not active throw an error
    if (!shop.isActive) throw new Error("v is not active");

    //set shop in the cache
    await useSet(`shop/${id}`, shop, client);

    return shop;
  } catch (e) {
    console.log("error while fetching the shop");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = shop;
