const Product = require("../../../../Schema/Product/Product.model");
const Company = require("../../../../Schema/Company/Company.model");
const authenticateToken = require("../../../../JWT/AuthenticateToken");

const createProduct = async (_, { input }, {user}) => {
  try {
    //get the company location
    const company = await Company.findById(input.companyID);
    authenticateToken(user.id, company.firebaseID);
    //if the user is logged in and the ids match
    const product = await new Product({...input, location: company.location, companyName: company.name, likes: 0, isActive: company.isActive});
    const savedProduct = await product.save();
    return savedProduct._id;
  } catch(e) {
    console.log("error while creating the product");
    console.log(e);
    return null
  }
};

module.exports = createProduct;
