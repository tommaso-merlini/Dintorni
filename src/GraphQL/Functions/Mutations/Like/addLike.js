const { GraphQLError } = require("graphql");
const Company = require("../../../../Schema/Company/Company.model");
const Product = require("../../../../Schema/Product/Product.model");

const addLike = async (_, {id, type}) => {
    try {
        switch (type) {
            case "company": 
                await Company.updateOne({ _id: id },
                { $inc: { likes: 1 } });
                break;
            case "product": 
                await Product.updateOne({ _id: id },
                { $inc: { likes: 1 } })  
                break;
            default: 
                throw new Error(`type ${type} does not exists, try with company or product`)   
        }
        return true;
    } catch(e) {
        throw new GraphQLError(e.message);
        return false;
    }
}

module.exports = addLike;