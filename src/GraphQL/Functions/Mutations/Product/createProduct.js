const Product = require("../../../../Schema/Product/Product.model");
const Company = require("../../../../Schema/Company/Company.model");
const authenticateToken = require("../../../../JWT/AuthenticateToken");
const { GraphQLError } = require("graphql");

const createProduct = async (
  _,
  { input, firebaseCompanyId },
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

    authenticateToken(token.uid, firebaseCompanyId);

    //get the company location
    const company = await Company.findById(input.companyID);

    //if the user is logged in and the ids match
    const product = await new Product({
      ...input,
      location: company.location,
      companyName: company.name,
      likes: 0,
      isActive: company.isActive,
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
