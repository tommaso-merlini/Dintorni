const { GraphQLError } = require("graphql");
const Company = require("../../../../Schema/Company/Company.model");

const addFavourite = async (_, { id }) => {
    try {
        await Company.updateOne({ _id: id },
            { $inc: { favourites: 1 } });
        return true;
    } catch(e) {
        throw new GraphQLError(e.message);
        return false;
    }
}

module.exports = addFavourite;