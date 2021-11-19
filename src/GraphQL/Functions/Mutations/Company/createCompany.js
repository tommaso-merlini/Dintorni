const Company = require("../../../../Schema/Company/Company.model");
const { admin, firebase } = require("../../../../firebase/firebase");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
const { db } = require("../../../../Schema/Company/Company.model");
require("dotenv").config();

const createCompany = async (_, { input }, { resolvers, stripe, db }) => {
  try {
    //customize companyToken
    await admin.auth().updateUser(input.firebaseID, { displayName: "company" });
    const prova = await admin.auth().setCustomUserClaims(input.firebaseID, {
      company: true,
    });

    //create company in mongoDB
    const company = await new Company({ ...input, favourites: 0, likes: 0 });
    const savedCompany = await company.save();

    //call the createStripeAccount to create the accountId via email
    const stripeId = await resolvers.Mutation.createStripeAccount(
      null,
      {
        email: input.email,
      },
      { stripe: stripe }
    );

    console.log(savedCompany._id);

    //create company in firebase
    await db.collection("Impresa").doc(input.firebaseID).set(
      {
        email: input.email,
        stripeId: stripeId,
        mongoId: savedCompany._id.toString(),
      },
      { merge: true }
    );

    // await db.document(`Impresa/${input.firebaseID}`).set({
    //   email: input.email,
    //   stripeId: stripeId,
    //   mongoId: savedCompany._id,
    // });

    //create the jwt
    const companyToken = { id: savedCompany.firebaseID, isCompany: true };
    const accessToken = jwt.sign(companyToken, process.env.SECRET_ACCESS_TOKEN);

    //!TODO
    return accessToken; // * and stripeAccountId
  } catch (e) {
    console.log("error while creating the company");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = createCompany;
