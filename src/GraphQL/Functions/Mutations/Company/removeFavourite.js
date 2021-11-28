const { GraphQLError } = require("graphql");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");

const removeFavourite = async (_, { id }, { client }) => {
  try {
    await Shop.updateOne(
      { _id: id, favourites: { $gte: 1 } }, //favourites can't go negative
      { $inc: { favourites: -1 } }
    );
    var redisShop = await useGet(`shop/${id}`, client);
    if (redisShop && redisShop.favourites >= 1) {
      redisShop.favourites = redisShop.favourites - 1;
      useSet(`shop/${id}`, redisShop, client);
    }
    return true;
  } catch (e) {
    throw new GraphQLError(e.message);
    return false;
  }
};

module.exports = removeFavourite;
