const Product = require("../../../../Schema/Product/Product.model");
const { GraphQLError } = require("graphql");

const MongoFilter = require("../../../MongoFilter/MongoFilter");


const products = async (_, {ids}, __, info) => {
    try {
        const filter = MongoFilter(info);
        const products = await Product.find({ _id : { $in : ids } }, filter);
        return products;
    } catch (e) {
        console.log("somthing went wrong while searching for products");
        throw new GraphQLError(e.message);
        return null;
    }
}

module.exports = products;