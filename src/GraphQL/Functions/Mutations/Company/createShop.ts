import { GraphQLError } from "graphql";
import Shop from "../../../../Schema/Company/Shop/Shop.model";
import { MutationCreateShopArgs } from "../../../Types/types";
require("dotenv").config();

/**
 * @title Create A Shop
 * @author Tommaso Merlini
 *
 * @param input all the shop fields
 *
 *
 */

const createShop = async (
  _: any,
  { input }: MutationCreateShopArgs,
  { resolvers, stripe, req, admin }
) => {
  try {
    //TODO: check this commented code
    //customize companyToken
    // await admin.auth().updateUser(input.firebaseID, { displayName: "company" });
    // await admin.auth().setCustomUserClaims(input.firebaseID, {
    //   company: true,
    // });

    //dummy email if the env is not in production
    //TODO: authorize user
    var email = "";
    if (process.env.NODE_ENV != "production") {
      email = "prova@gmail.com";
    } else {
      const token = await admin.auth().verifyIdToken(req.headers.authorization);
      email = token.email;
    }

    const shop = await new Shop({
      ...input,
      favourites: 0,
      likes: 0,
      email: email,
    });
    const savedShop = await shop.save();

    //TODO: call the createStripeAccount to create the accountId via email
    //const stripeId = await resolvers.Mutation.createStripeAccount(
    //  null,
    //  {
    //    email: input.email,
    // },
    //  { stripe: stripe }
    //);

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
  } catch (e: any) {
    console.log("error while creating the shop");
    console.log(e.message);
    throw new GraphQLError(e.message);
    return null;
  }
};

export default createShop;
