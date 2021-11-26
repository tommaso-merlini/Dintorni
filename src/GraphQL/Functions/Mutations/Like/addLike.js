const { GraphQLError } = require("graphql");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const Product = require("../../../../Schema/Product/Product.model");

const addLike = async (_, { id, type }) => {
  try {
    switch (type) {
      case "shop":
        //like on mongodb
        await Shop.updateOne({ _id: id }, { $inc: { likes: 1 } });

        /*
                check if the shop is stored in redis,
                if it is then update it with like + 1 
                */
        var redisShop = await useGet(`shop/${id}`);
        if (redisShop) {
          redisShop.likes = redisShop.likes + 1;
          useSet(`shop/${id}`, redisShop);
        }
        break;

      case "product":
        //like on mongodb
        await Product.updateOne({ _id: id }, { $inc: { likes: 1 } });

        /*
                check if the product is stored in redis,
                if it is then update it with like + 1 
                */
        var productRedis = await useGet(`product/${id}`);
        if (productRedis) {
          productRedis.likes = productRedis.likes + 1;
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

module.exports = addLike;
