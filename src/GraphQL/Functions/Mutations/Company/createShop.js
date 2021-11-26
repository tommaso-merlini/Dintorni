const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const { admin, firebase } = require("../../../../firebase/firebase");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const createShop = async (_, { input }, { resolvers, stripe }) => {
  try {
    //TODO: check this commented code
    //customize companyToken
    // await admin.auth().updateUser(input.firebaseID, { displayName: "company" });
    // await admin.auth().setCustomUserClaims(input.firebaseID, {
    //   company: true,
    // });

    //create shop in mongoDB
    const shop = await new Shop({ ...input, favourites: 0, likes: 0 });
    const savedShop = await shop.save();

    //call the createStripeAccount to create the accountId via email
    const stripeId = await resolvers.Mutation.createStripeAccount(
      null,
      {
        email: input.email,
      },
      { stripe: stripe }
    );

    //create shop in firebase
    await db.collection("Impresa").doc(input.firebaseID).set(
      //TODO: create the shop db on firebase
      {
        email: input.email,
        stripeId: stripeId,
        mongoId: savedShop._id.toString(),
      },
      { merge: true }
    );

    return true;
  } catch (e) {
    console.log("error while creating the shop");
    throw new GraphQLError(e.message);
    return false;
  }
};

module.exports = createShop;
