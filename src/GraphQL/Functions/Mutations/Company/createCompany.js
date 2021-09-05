const Company = require("../../../../Schema/Company/Company.model");
const { admin, firebase } = require("../../../../firebase/firebase");
const jwt = require('jsonwebtoken');
require("dotenv").config();


const createCompany = async (_, { input }) => {
  try {
    //customize companyToken
    await admin.auth().updateUser(input.firebaseID, {displayName: 'company'});
    const prova = await admin.auth().setCustomUserClaims(input.firebaseID, {
      company: true
    });

    //create company and lightCompany in mongoDB
    const company = await new Company({...input, favourites: 0});
    const savedCompany = await company.save();

    //get the id of the just saved company
    const id = savedCompany._id;

    //create the jwt
    const companyToken = { id: id, isCompany: true };
    const accessToken = jwt.sign(companyToken, process.env.SECRET_ACCESS_TOKEN);

    return accessToken;
  } catch(e) {
    console.log("error while creating the company");
    console.log(e);
    return null;
  }
};

module.exports = createCompany;