import { MutationStep1Args } from "../../../../Types/types";
import { GraphQLError } from "graphql";
import Shop from "../../../../../Schema/Company/Shop/Shop.model";
require("dotenv").config();

/**
 * @title step 1 of creating the shop
 * @author Tommaso Merlini
 */

const step1 = async (_, input: MutationStep1Args, { req, admin }: any) => {
  try {
    //TODO: check this commented code
    //customize companyToken
    // await admin.auth().updateUser(input.firebaseID, { displayName: "company" });
    // await admin.auth().setCustomUserClaims(input.firebaseID, {
    //   company: true,
    // });

    //check the firebaseJWT
    if (process.env.NODE_ENV != "development") {
      const token = await admin.auth().verifyIdToken(req.headers.authorization);
    }

    //TODO get firebase company id from firebase

    const shop = await new Shop({
      ...input,
      favourites: 0,
      likes: 0,
      isActive: false,
      firebaseShopID: "prova",
      stepsCompleted: 1,
    });
    const savedShop = await shop.save();

    return true;
  } catch (e: any) {
    console.log("error by creating the first step of sign in");
    throw new GraphQLError(e.message);
  }
};

export default step1;
