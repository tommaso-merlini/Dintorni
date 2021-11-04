const Company = require("../../../../Schema/Company/Company.model");
const { GraphQLError } = require("graphql");

const MongoFilter = require("../../../MongoFilter/MongoFilter");

const companies = async (_ ,{ ids }, __, info) => {

    try {
        const filter = MongoFilter(info);
        const companies = await Company.find({ _id : { $in : ids } }, filter);
        return companies;
    } catch (e) {
        console.log("something went wrong while searching for the companies");
        throw new GraphQLError(e.message);
        return null;
    }
}

module.exports = companies;