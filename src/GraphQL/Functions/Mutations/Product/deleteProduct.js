const Product = require("../../../../Schema/Product/Product.model");
const Company = require("../../../../Schema/Company/Company.model");
const useDel = require("../../../../Redis/useDel/useDel");

const authenticateToken = require("../../../../JWT/AuthenticateToken");

const deleteProduct = async (_, { id, companyID }, {user}) => {
  try {
    const company = await Company.findById(companyID);
    authenticateToken(user.id, company.firebaseID);
    await Product.findByIdAndDelete(id);
    await useDel(`product/${id}`);
    return true;
  } catch(e) {
    console.log("error while trying to delete the product");
    console.log(e);
    return false;
  }
};

module.exports = deleteProduct;
