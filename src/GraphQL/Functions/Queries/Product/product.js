const Product = require("../../../../Schema/Product/Product.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");
const { GraphQLError } = require("graphql");

const product = async (_, { id }, { client }) => {
    try {
        //check if the product is cached
        const redisProducts = await useGet(`product/${id}`, client);

        //if the product is cached return it
        if (redisProducts) {
            if (redisProducts.isActive === "not_active") throw new Error("product is not active");
            return redisProducts;
        }

        //get the product from mongodb if not cached
        const product = await Product.findById(id);

        if (!product) throw new Error(`product with id ${id} does not exist`);
        if (product.isActive === "not_active") throw new Error("product is not active");

        if (product) {
            await useSet(`product/${id}`, product, client);
        }

        return product;
    } catch (e) {
        console.log("error by fetching the product");
        throw new GraphQLError(e.message);
    }
};

module.exports = product;
