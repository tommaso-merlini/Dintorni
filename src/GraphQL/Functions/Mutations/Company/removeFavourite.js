const { GraphQLError } = require("graphql");
const Company = require("../../../../Schema/Company/Company.model");

const removeFavourite = async (_, { id }) => {
    try {
        await Company.updateOne({ _id: id, favourites: { $gte: 1 } }, //favourites can't go negative
            { $inc: { favourites: -1 } });
        return true;
    } catch(e) {
        throw new GraphQLError(e.message);
        return false;
    }
}

module.exports = removeFavourite;