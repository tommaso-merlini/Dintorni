const { GraphQLError } = require("graphql");
const Company = require("../../../../Schema/Company/Company.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");

const removeFavourite = async (_, { id }) => {
    try {
        await Company.updateOne({ _id: id, favourites: { $gte: 1 } }, //favourites can't go negative
            { $inc: { favourites: -1 } });
        var companyRedis = await useGet(`company/${id}`);
        if(companyRedis && companyRedis.favourites >= 1) {
            companyRedis.favourites = companyRedis.favourites - 1;
            useSet(`company/${id}`, companyRedis);
        }
        return true;
    } catch(e) {
        throw new GraphQLError(e.message);
        return false;
    }
}

module.exports = removeFavourite;