const { GraphQLError } = require("graphql");
const MongoFilter = require("../../../MongoFilter/MongoFilter");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");

const favouriteShops = async (_, { ids }, __, info) => {
  try {
    //get the requested fields and store them in a filter const
    const filter = MongoFilter(info);

    var favouriteShops = await Shop.find({ _id: ids, isActive: true }, filter);

    favouriteShops.map((shop) => {
      if (!shop) {
        favouriteShops.splice(favouriteShops.indexOf(company), 1);
      }
    });

    if (favouriteShops.length === 0) {
      throw new Error(
        "all the favorite shops are either not active or non-existing"
      );
    }

    return favouriteShops;
  } catch (e) {
    console.log("error while fetching the favourite shops");
    throw new GraphQLError(e.message);
  }
};

module.exports = favouriteShops;
