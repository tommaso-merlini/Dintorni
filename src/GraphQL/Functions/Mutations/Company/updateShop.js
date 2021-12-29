const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const useDel = require("../../../../Redis/useDel/useDel");
const { GraphQLError } = require("graphql");

/**
 * @title Update A Shop
 * @author Tommaso Merlini
 *
 * @param id the id of the shop
 *
 * @param input the updated fields
 *
 * @return Boolean!
 * @example
 * return true if everything was ok
 * return false if there was an error

*/

const updateShop = async (_, { id, input }, { client }) => {
    try {
        //update the shop
        await Shop.updateOne({ _id: id }, input);

        //delete the shop from redis
        useDel(`company/${id}`, client);

        return true;
    } catch (e) {
        console.log("error while updating the shop");
        throw new GraphQLError(e.message);
        return false;
    }
};

module.exports = updateShop;
