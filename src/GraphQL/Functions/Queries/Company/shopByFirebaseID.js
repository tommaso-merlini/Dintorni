const { GraphQLError } = require("graphql");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");

const shopByFirebaseID = async (_, { firebaseID }) => {
  try {
    //get the shop from mongodb if not cached
    const shop = await Shop.findOne({ firebaseID: firebaseID });

    if (!shop) throw new Error("this shop does not exist");
    if (!shop.isActive) throw new Error("this shop is not active");

    //return shop
    return shop;
  } catch (e) {
    console.log("error while fetching the shop by firebase id");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = shopByFirebaseID;
