const Company = require("../../../../Schema/Company/Company.model");
const Product = require("../../../../Schema/Product/Product.model");
const useDel = require("../../../../Redis/useDel/useDel");
const { GraphQLError } = require("graphql");

const disactivateCompany = async (_, {id}) => {
    try {
        await Company.updateOne({_id:id}, {isActive: false}, {upsert:true});
        await Product.updateMany({companyID: id}, {isActive: false}, {upsert:true});

        const products = await Product.find({companyID: id});

        //delete all the products form the cache where the companyID is equal to the id
        for(i = 0; i < products.length; i++) {
            useDel(`product/${products[i]._id}`); 
        }
        //delete the company form the cache
        useDel(`company/${id}`);
        return true;
    } catch(e) {
        console.log("error while disactivating the company");
        throw new GraphQLError(e.message);
        return false;
    }
}

module.exports = disactivateCompany;