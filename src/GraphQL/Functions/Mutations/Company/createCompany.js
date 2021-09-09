const Company = require("../../../../Schema/Company/Company.model");
const { admin, firebase } = require("../../../../firebase/firebase");
const jwt = require('jsonwebtoken');
const { GraphQLError } = require("graphql");
require("dotenv").config();


const createCompany = async (_, { input }) => {
  try {
    //customize companyToken
    await admin.auth().updateUser(input.firebaseID, {displayName: 'company'});
    const prova = await admin.auth().setCustomUserClaims(input.firebaseID, {
      company: true
    });

    //create company and lightCompany in mongoDB
    const company = await new Company({...input, favourites: 0, likes: 0});
    const savedCompany = await company.save();

    //create the jwt
    const companyToken = { id: savedCompany.firebaseID, isCompany: true };
    const accessToken = jwt.sign(companyToken, process.env.SECRET_ACCESS_TOKEN);

    return accessToken;
  } catch(e) {
    console.log("error while creating the company");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = createCompany;