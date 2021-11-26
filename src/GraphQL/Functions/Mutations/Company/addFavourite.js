const { GraphQLError } = require("graphql");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");

const addFavourite = async (_, { id }) => {
  try {
    await Shop.updateOne({ _id: id }, { $inc: { favourites: 1 } });
    var redisShop = await useGet(`shop/${id}`);
    if (redisShop) {
      redisShop.favourites = redisShop.favourites + 1;
      useSet(`shop/${id}`, redisShop);
      console.log(redisShop);
    }
    return true;
  } catch (e) {
    throw new GraphQLError(e.message);
    return false;
  }
};

module.exports = addFavourite;
