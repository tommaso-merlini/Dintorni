const { GraphQLError } = require("graphql");
const Company = require("../../../../Schema/Company/Company.model");
const Product = require("../../../../Schema/Product/Product.model");

const activateCompany = async (_, { id }) => {
    try {
        await Company.updateOne({_id: id}, {isActive: true}, {upsert:true});
        await Product.updateMany({companyID: id}, {isActive: true}, {upsert: true});
        return true;
    } catch(e) {
        console.log("error while activating the company");
        throw new GraphQLError(e.message);
        return false;
    }
}

module.exports = activateCompany;