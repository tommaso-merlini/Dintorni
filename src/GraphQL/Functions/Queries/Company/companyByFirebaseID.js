const { GraphQLError } = require("graphql");
const Company = require("../../../../Schema/Company/Company.model");

const companyByFirebaseID = async (_, { firebaseID }) => {
    try {
        //get the company from mongodb if not cached
        const company = await Company.findOne({firebaseID: firebaseID});

        //if the company does not exist
        if(!company) throw new Error("this company does not exist");

        //if the company is not active throw an error
        if(!company.isActive) throw new Error("this company is not active");

        //return company
        return company;
    } catch (e) {
        console.log("error while fetching the company by firebase id");
        throw new GraphQLError(e.message);
        return null
    }
};

module.exports = companyByFirebaseID;