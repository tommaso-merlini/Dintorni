const Product = require("../../../../Schema/Product/Product.model");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const authenticateToken = require("../../../../JWT/AuthenticateToken");
const { GraphQLError } = require("graphql");

const createProduct = async (
  _,
  { input, firebaseShopId },
  { header, admin }
) => {
  try {
    const token = await admin.auth().verifyIdToken(header);

    // const tokenID = token.uid;
    // let isCompany = token.company;
    // if(isCompany === undefined || isCompany === null) {
    //     isCompany = false;
    // }

    //if the user authenticates
    // authenticateToken(token.uid, firebaseCompanyId);

    authenticateToken(token.uid, firebaseShopId);

    //get the shop => it will be reusable for some details
    //TODO: add a filter to this request
    const shop = await Shop.findById(input.shopID);

    //if the user is logged in and the ids match
    const product = await new Product({
      ...input,
      location: shop.location,
      ShopName: shop.name,
      likes: 0,
      isActive: shop.isActive,
    });
    const savedProduct = await product.save();

    return savedProduct._id;
  } catch (e) {
    console.log("error while creating the product");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = createProduct;
