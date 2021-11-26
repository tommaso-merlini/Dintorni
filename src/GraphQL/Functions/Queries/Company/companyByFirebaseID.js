const { GraphQLError } = require("graphql");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");

const companyByFirebaseID = async (_, { firebaseID }) => {
  try {
    //get the shop from mongodb if not cached
    const shop = await Shop.findOne({ firebaseID: firebaseID });

    //if the shop does not exist
    if (!shop) throw new Error("this shop does not exist");

    //if the shop is not active throw an error
    if (!shop.isActive) throw new Error("this shop is not active");

    //return shop
    return shop;
  } catch (e) {
    console.log("error while fetching the shop by firebase id");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = companyByFirebaseID;
