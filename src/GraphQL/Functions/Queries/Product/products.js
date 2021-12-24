const Product = require("../../../../Schema/Product/Product.model");
const { GraphQLError } = require("graphql");
const MongoFilter = require("../../../MongoFilter/MongoFilter");

const products = async (_, { ids }, __, info) => {
    try {
        const returnedIDs = [];
        const unkownIDs = [];
        const filter = MongoFilter(info);
        const products = await Product.find({ _id: { $in: ids } }, filter);
        products.map((product) => {
            returnedIDs.push(JSON.stringify(product._id));
        });

        ids.map((id) => {
            if (!returnedIDs.includes(JSON.stringify(id))) {
                unkownIDs.push(id);
            }
        })

        //TODO: return the unkown ids as errors

        return products;

    } catch (e) {
        console.log("somthing went wrong while searching for products");
        throw new GraphQLError(e.message);
    }
}

module.exports = products;
