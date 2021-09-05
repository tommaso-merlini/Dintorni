const Product = require("../../../../Schema/Product/Product.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");
const { GraphQLError } = require("graphql");

const product = async (_, { id }) => {
  try {
    //check if the product is cached
    const redisProducts = await useGet(`product/${id}`);
  
    //if the product is cached return it
    if (redisProducts) return redisProducts;
  
    //get the product from mongodb if not cached
    const product = await Product.findById(id);

    if(!product.isActive) throw new Error("product is not active");

    if(product) {
      await useSet(`product/${id}`, product);
    }
  
    return product;
  } catch(e) {
    console.log("error by fetching the product");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = product;
