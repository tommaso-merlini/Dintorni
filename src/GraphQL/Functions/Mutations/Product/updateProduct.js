const Product = require("../../../../Schema/Product/Product.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");
const merge = require('merge');

const updateProduct = async (_, {id, input}, {user}) => {
    try {
        await Product.updateOne({_id: id}, input);
        //check if the product is cached
        const redisProduct = await useGet(`product/${id}`);

        //if the product already existed  update it
        if (redisProduct) {
            //merge the input with the product retured by redis
            const mergedProduct = merge(redisProduct, input);
            await useSet(`product/${id}`, mergedProduct);
        }
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}

module.exports = updateProduct;