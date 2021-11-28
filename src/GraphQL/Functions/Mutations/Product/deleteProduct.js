const Product = require("../../../../Schema/Product/Product.model");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const useDel = require("../../../../Redis/useDel/useDel");

const authenticateToken = require("../../../../JWT/AuthenticateToken");
const { GraphQLError } = require("graphql");

const deleteProduct = async (_, { id, shopID }, { user }) => {
  try {
    const shop = await Shop.findById(shopID);
    authenticateToken(user.id, shop.firebaseID);
    await Product.findByIdAndDelete(id);
    await useDel(`product/${id}`);
    return true;
  } catch (e) {
    console.log("error while trying to delete the product");
    throw new GraphQLError(e.message);
    return false;
  }
};

module.exports = deleteProduct;
