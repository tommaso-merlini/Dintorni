const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const { GraphQLError } = require("graphql");

const MongoFilter = require("../../../MongoFilter/MongoFilter");

const shopsByFirebaseCompanyID = async (_, { firebaseCompanyID }, __, info) => {
  try {
    const filter = MongoFilter(info);
    const shops = await Shop.find(
      { firebaseCompanyID: firebaseCompanyID },
      filter
    );
    return shops;
  } catch (e) {
    console.log(
      "something went wrong while searching for the shops by company firebase id"
    );
    console.log(e.message);
    throw new GraphQLError(e.message);
    return null;
  }
};
module.exports = shopsByFirebaseCompanyID;
