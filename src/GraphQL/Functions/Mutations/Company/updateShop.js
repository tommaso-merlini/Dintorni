const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const useDel = require("../../../../Redis/useDel/useDel");
const { GraphQLError } = require("graphql");

const updateShop = async (_, { id, input }, { client }) => {
  try {
    await Shop.updateOne({ _id: id }, input);
    //delete the shop from redis
    useDel(`company/${id}`, client);

    ////check if the company is cached
    //const redisCompany = await useGet(`company/${id}`);

    ////if the company is cached update it
    //if (redisCompany) {
    //    //merge the input with the company retured by redis
    //    const mergedProduct = merge(redisCompany, input);
    //   await useSet(`company/${id}`, company);
    //}
    return true;
  } catch (e) {
    console.log("error while updating the shop");
    throw new GraphQLError(e.message);
    return false;
  }
};

module.exports = updateShop;
