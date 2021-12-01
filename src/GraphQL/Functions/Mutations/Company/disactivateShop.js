const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const Product = require("../../../../Schema/Product/Product.model");
const useDel = require("../../../../Redis/useDel/useDel");
const { GraphQLError } = require("graphql");

const disactivateShop = async (_, { id }) => {
  try {
    await Shop.updateOne({ _id: id }, { isActive: false }, { upsert: false });
    await Product.updateMany(
      { shopID: id },
      { isActive: false },
      { upsert: false }
    );

    const products = await Product.find({ shopID: id });

    //delete all the products form the cache where the shopID is equal to the id
    for (i = 0; i < products.length; i++) {
      useDel(`product/${products[i]._id}`);
    }
    //delete the shop form the cache
    useDel(`shop/${id}`);
    return true;
  } catch (e) {
    console.log("error while disactivating the shop");
    throw new GraphQLError(e.message);
    return false;
  }
};

module.exports = disactivateShop;
