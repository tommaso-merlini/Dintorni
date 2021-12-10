const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const createShop = async (
    _,
    { input },
    { resolvers, stripe, req, admin }
) => {
    try {
        //TODO: check this commented code
        //customize companyToken
        // await admin.auth().updateUser(input.firebaseID, { displayName: "company" });
        // await admin.auth().setCustomUserClaims(input.firebaseID, {
        //   company: true,
        // });

        var email = "";

        if (process.env.NODE_ENV != "production") {
            email = "prova@gmail.com";
        } else {
            const token = await admin.auth().verifyIdToken(req.headers.authorization);
            email = token.email;
        }

        //create shop in mongoDB
        const shop = await new Shop({
            ...input,
            favourites: 0,
            likes: 0,
            email: email,
        });
        const savedShop = await shop.save();

        //call the createStripeAccount to create the accountId via email
        const stripeId = await resolvers.Mutation.createStripeAccount(
            null,
            {
                email: input.email,
            },
            { stripe: stripe }
        );

        //TODO: create the shop db on firebase
        // await db.collection("Impresa").doc(input.firebaseID).set(
        //   {
        //     email: input.email,
        //     stripeId: stripeId,
        //     mongoId: savedShop._id.toString(),
        //   },
        //   { merge: true }
        // );

        return savedShop._id;
    } catch (e) {
        console.log("error while creating the shop");
        console.log(e.message);
        throw new GraphQLError(e.message);
        return null;
    }
};

module.exports = createShop;
