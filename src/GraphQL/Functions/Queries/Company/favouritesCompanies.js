const { GraphQLError } = require("graphql");
const useSet = require("../../../../Redis/useSet/useSet");
const useGet = require("../../../../Redis/useGet/useGet");
const Company = require("../../../../Schema/Company/Company.model");

const favouritesCompanies = async (_, {ids, userID}) => {
    try {
        var favouritesCompanies = await Company.find({_id: ids, isActive: true});

        favouritesCompanies.map(company => {
            if(!company.isActive || !company) {
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