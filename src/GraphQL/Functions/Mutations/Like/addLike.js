const { GraphQLError } = require("graphql");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const Product = require("../../../../Schema/Product/Product.model");

const addLike = async (_, { id, type }) => {
  try {
    switch (type) {
      case "company":
        //like on mongodb
        await Company.updateOne({ _id: id }, { $inc: { likes: 1 } });

        /*
                check if the company is stored in redis,
                if it is then update it with like + 1 
                */
        var companyRedis = await useGet(`company/${id}`);
        if (companyRedis) {
          companyRedis.likes = companyRedis.likes + 1;
          useSet(`company/${id}`, companyRedis);
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
          `type ${type} does not exists, try with company or product`
        );
    }
    return true;
  } catch (e) {
    throw new GraphQLError(e.message);
    return false;
  }
};

module.exports = addLike;
