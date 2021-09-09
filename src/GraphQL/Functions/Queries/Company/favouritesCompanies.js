const { GraphQLError } = require("graphql");
const MongoFilter = require("../../../MongoFilter/MongoFilter");
const Company = require("../../../../Schema/Company/Company.model");

const favouritesCompanies = async (_, {ids}, __, info) => {
    try {
        //get the requested fields and store them in a filter const
        const filter = MongoFilter(info);

        var favouritesCompanies = await Company.find({_id: ids, isActive: true}, filter);

        favouritesCompanies.map(company => {
            if(!company) {
                favouritesCompanies.splice(favouritesCompanies.indexOf(company), 1);
            }
        })

        if(favouritesCompanies.length === 0) {
            throw new Error("all the favorites companies are either not active or non-existing");
        }

        return favouritesCompanies;

    } catch(e) {
        console.log("error while fetching the favourites companies");
        throw new GraphQLError(e.message);
    }
}

module.exports = favouritesCompanies;