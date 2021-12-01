const { GraphQLError } = require("graphql");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const Product = require("../../../../Schema/Product/Product.model");

const activateShop = async (_, { id }) => {
  try {
    await Shop.updateOne({ _id: id }, { isActive: true }, { upsert: false });
    await Product.updateMany(
      { shopID: id },
      { isActive: true },
      { upsert: false }
    );
    return true;
  } catch (e) {
    console.log("error while activating the shop");
    throw new GraphQLError(e.message);
    return false;
  }
};

module.exports = activateShop;
