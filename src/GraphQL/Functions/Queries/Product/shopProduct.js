const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");
const { GraphQLError } = require("graphql");

const shopProduct = async ({ shopID }, { client }) => {
  try {
    const redisQuery = `shop/${shopID}`;

    // check if the shop are cached
    const redisShop = await useGet(redisQuery, client);

    //if the shop is cached return it
    if (redisShop) {
      if (!redisShop) throw new Error(`shop with id ${shopID} does not exist`);
      if (!redisShop.isActive) throw new Error("shop is not active");
      return redisShop;
    }

    const shop = await Shop.findById(shopID);

    if (!shop) throw new Error(`shop with id ${shopID} does not exist`);
    if (!shop.isActive) throw new Error("shop is not active");

    //TODO: check if this this function can be used (all the elements are being used)
    //await useSet(redisQuery, shop, client);
    return shop;
  } catch (e) {
    console.log("error while fetching the shop product");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = shopProduct;
