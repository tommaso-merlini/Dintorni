const Company = require("../../../../Schema/Company/Company.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");
const { GraphQLError } = require("graphql");

const companyProduct = async ({ companyID }) => {
    try {
        const redisQuery = `company/${companyID}`;
    
        // check if the companies are cached
        const redisCompany = await useGet(redisQuery);

        //if the company is cached return it
        if (redisCompany) return redisCompany;

        const company = await Company.findById(companyID);

        if(!company.isACtive) throw new Error("company is not active")

        await useSet(
            redisQuery,
            company,
        );
        return company;
    } catch (e) {
        console.log("error while fetching the company product");
        throw new GraphQLError(e.message);
        return null;
    }
}

module.exports = companyProduct;