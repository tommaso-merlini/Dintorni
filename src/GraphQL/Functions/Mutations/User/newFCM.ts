import { GraphQLError } from "graphql";
import User from "../../../../Schema/User/User.model";
import { MutationNewFcmArgs } from "../../../Types/types";

const newFCM = async (_, { firebaseUserID, FCM }: MutationNewFcmArgs) => {
  try {
    //TODO: authenticate user
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
