const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");
const { GraphQLError } = require("graphql");

const company = async (_, { id }) => {
  try {
    //check if the company is cached
    const redisCompany = await useGet(`company/${id}`);

    //if the company is cached return it
    if (redisCompany) return redisCompany;

    //get the company from mongodb if not cached
    const company = await Company.findById(id);

    if (!company) throw new Error("this company does not exist");

    //if the company is not active throw an error
    if (!company.isActive) throw new Error("company is not active");

    //set company in the cache
    await useSet(`company/${id}`, company);

    //return company
    return company;
  } catch (e) {
    console.log("error while fetching the company");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = company;
