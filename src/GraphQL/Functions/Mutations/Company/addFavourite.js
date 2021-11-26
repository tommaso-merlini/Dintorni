const { GraphQLError } = require("graphql");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");

const addFavourite = async (_, { id }) => {
  try {
    await Company.updateOne({ _id: id }, { $inc: { favourites: 1 } });
    var companyRedis = await useGet(`company/${id}`);
    if (companyRedis) {
      companyRedis.favourites = companyRedis.favourites + 1;
      useSet(`company/${id}`, companyRedis);
      console.log(companyRedis);
    }
    return true;
  } catch (e) {
    throw new GraphQLError(e.message);
    return false;
  }
};

module.exports = addFavourite;
