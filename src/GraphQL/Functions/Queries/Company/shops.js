const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const { GraphQLError } = require("graphql");

const MongoFilter = require("../../../MongoFilter/MongoFilter");

const shops = async (_, { ids }, __, info) => {
  try {
    //filter the query
    const filter = MongoFilter(info);
    const shops = await Shop.find({ _id: { $in: ids } }, filter);
    return shops;
  } catch (e) {
    console.log("something went wrong while searching for the shops");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = shops;
