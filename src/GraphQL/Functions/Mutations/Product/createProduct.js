const Product = require("../../../../Schema/Product/Product.model");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const authenticateToken = require("../../../../JWT/AuthenticateToken");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const createProduct = async (_, { input, firebaseShopId }, { req, admin }) => {
  try {
    if (process.env.NODE_ENV === "production") {
      const token = await admin.auth().verifyIdToken(req.headers.authorization);
      authenticateToken(token.uid, firebaseShopId);
    }

    // const tokenID = token.uid;
    // let isCompany = token.company;
    // if(isCompany === undefined || isCompany === null) {
    //     isCompany = false;
    // }

    //if the user authenticates
    // authenticateToken(token.uid, firebaseCompanyId);

    //get the shop => it will be reusable for some details
    //TODO: add a filter to this request
    const shop = await Shop.findById(input.shopID);

    if (!shop)
      throw new Error(`the shop with id ${input.shopID} does not exist`);

    //if the user is logged in and the ids match
    const product = await new Product({
      ...input,
      location: shop.location,
      ShopName: shop.name,
      likes: 0,
      isActive: shop.isActive,
    });
    const savedProduct = await product.save();

    return savedProduct;
  } catch (e) {
    console.log("error while creating the product");
    console.log(e.message);
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = createProduct;
