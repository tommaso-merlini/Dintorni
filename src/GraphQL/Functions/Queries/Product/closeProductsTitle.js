const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");
const Product = require("../../../../Schema/Product/Product.model");
const { GraphQLError } = require("graphql");

const closeProductsTitle = async (_, { name, location, range }) => {
  try{
    const redisQuery = `closeProducts/latitude:${location.coordinates[0]}/longitude:${location.coordinates[1]}/name:${name}/range:${range}`;
    
    // check if the companies are cached
    const redisCloseProducts = await useGet(redisQuery);
  
    //if the company is cached return it
    if (redisCloseProducts) return redisCloseProducts;
  
    const closeProducts = await Product.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [location.coordinates[0], location.coordinates[1]],
          },
          $minDistance: 0,
          $maxDistance: range,
        },
      },
      name: {$regex: name},
      isActive: true
    });
  
    await useSet(
      redisQuery,
      closeProducts,
    );
    
    return closeProducts;
  } catch(e) {
    console.log("error while fetching the close products by title");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = closeProductsTitle;
