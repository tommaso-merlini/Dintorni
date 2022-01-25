import { GraphQLError } from "graphql";
import User from "../../../../Schema/User/User.model";
import { MutationNewFcmArgs } from "../../../Types/types";
import canSee from "../../../../helpers/canSee";
require("dotenv").config();

const newFCM = async (
  _,
  { firebaseUserID, FCM }: MutationNewFcmArgs,
  { admin, req }
) => {
  try {
    //authenticate the user the user
    const token = await admin.auth().verifyIdToken(req.headers.authorization);
    canSee(firebaseUserID, token.uid, "production");

    //get the fcms of the user
    await User.updateOne(
      { firebaseUserID: firebaseUserID },
      {
        $push: {
          FCMs: {
            $each: [FCM],
            $position: -1,
          },
        },
      }
    );

    return true;
  } catch (e) {
    console.log("error while creating a new fcm");
    throw new GraphQLError(e.message);
  }
};

export default newFCM;
