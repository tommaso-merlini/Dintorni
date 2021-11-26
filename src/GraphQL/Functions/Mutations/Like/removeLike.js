const { GraphQLError } = require("graphql");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const Product = require("../../../../Schema/Product/Product.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");

const removeLike = async (_, { id, type }) => {
  try {
    switch (type) {
      case "shop":
        await Shop.updateOne(
          { _id: id, likes: { $gte: 1 } }, //likes can't go negative
          { $inc: { likes: -1 } }
        );
        var redisShop = await useGet(`shop/${id}`);
        if (redisShop && redisShop.likes >= 1) {
          redisShop.likes = redisShop.likes - 1;
          useSet(`shop/${id}`, redisShop);
        }
        break;
      case "product":
        await Product.updateOne(
          { _id: id, likes: { $gte: 1 } }, //likes can't go negative
          { $inc: { likes: -1 } }
        );
        var productRedis = await useGet(`product/${id}`);
        if (productRedis && productRedis.likes >= 1) {
          productRedis.likes = productRedis.likes - 1;
          useSet(`product/${id}`, productRedis);
        }
        break;
      default:
        throw new Error(
          `type ${type} does not exists, try with shop or product`
        );
    }
    return true;
  } catch (e) {
    throw new GraphQLError(e.message);
    return false;
  }
};

module.exports = removeLike;
