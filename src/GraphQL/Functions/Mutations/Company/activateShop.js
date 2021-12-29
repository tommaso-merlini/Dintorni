const { GraphQLError } = require("graphql");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const Product = require("../../../../Schema/Product/Product.model");

/**
 * @title Active Shop
 * @author Tommaso Merlini
 *
 * @param id the id of the shop
 *
 * @return Boolean!
 * @example
 * return true if everything was ok
 * return false if there was an error
*/

const activateShop = async (_, { id }) => {
    try {
        //update the shop
        await Shop.updateOne({ _id: id }, { isActive: true }, { upsert: false });

        //update the products of the shop
        await Product.updateMany(
            { shopID: id },
            { isActive: true },
            { upsert: false }
        );
        return true;
    } catch (e) {
        console.log("error while activating the shop");
        throw new GraphQLError(e.message);
        return false;
    }
};

module.exports = activateShop;
