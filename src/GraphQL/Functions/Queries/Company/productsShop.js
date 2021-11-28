const Product = require("../../../../Schema/Product/Product.model");
const MongoFilter = require("../../../MongoFilter/MongoFilter");
const { GraphQLError } = require("graphql");

const productsShop = async (company, { limit, offset }, _, info) => {
  try {
    if (limit < 0 || offset < 0) {
      throw new Error("limit and offset cannot be negative");
    }

    //filter the query
    const filter = MongoFilter(info);

    //get the products from mongodb if not cached
    const products = await Product.find({ companyID: company._id }, filter)
      .skip(offset)
      .limit(limit);

    //return product
    return products;
  } catch (e) {
    console.log("error while fetching the productsCompany");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = productsShop;
