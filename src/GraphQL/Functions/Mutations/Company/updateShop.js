const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const useDel = require("../../../../Redis/useDel/useDel");
const { GraphQLError } = require("graphql");

const updateShop = async (_, { id, input }, { client }) => {
  try {
    await Shop.updateOne({ _id: id }, input);
    useDel(`company/${id}`, client);
    return true;
  } catch (e) {
    console.log("error while updating the shop");
    throw new GraphQLError(e.message);
    return false;
  }
};

module.exports = updateShop;
