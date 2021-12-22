const { GraphQLError } = require("graphql");
const useDel = require("../../../../Redis/useDel/useDel");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const Product = require("../../../../Schema/Product/Product.model");

const addLike = async (_, { id, type }, { client }) => {
    try {
        switch (type) {
            case "shop":
                const shop = await Shop.updateOne({ _id: id }, { $inc: { likes: 1 } });
                if (shop.n === 0) {
                    throw new Error(`shop with id ${id} does not exist`);
                }
                await useDel(`shop/${id}`, client);
                break;

            case "product":
                //like on mongodb
                const product = await Product.updateOne({ _id: id }, { $inc: { likes: 1 } });
                if (product.n === 0) {
                    throw new Error(`Product with id ${id} does not exist`);
                }
                await useDel(`product/${id}`, client);
                break;

            default:
                throw new Error(
                    `type ${type} does not exists, try with shop or product`
                );
        }
        return true;
    } catch (e) {
        throw new GraphQLError(e.message);
    }
};

module.exports = addLike;
