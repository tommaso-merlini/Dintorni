const { GraphQLError } = require("graphql");
const Company = require("../../../../Schema/Company/Company.model");

const removeLike = async (_, {id, type}) => {
    try {
        switch (type) {
            case "company": 
                await Company.updateOne({ _id: id, likes: { $gte: 1 } }, //likes can't go negative
                { $inc: { likes: -1 } });
                break;
            case "product": 
                await Product.updateOne({ _id: id, likes: { $gte: 1 } }, //likes can't go negative
                { $inc: { likes: -1 } })  
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

module.exports = removeLike;