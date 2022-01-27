import User from "../../../../Schema/User/User.model";
import { MutationCreateUserArgs } from "../../../Types/types";
import { GraphQLError } from "graphql";
import canSee from "../../../../helpers/canSee";

const createUser = async (
  _,
  { firebaseUserID }: MutationCreateUserArgs,
  { admin, req }
) => {
  try {
    //authenticate the user the user
    const token = await admin.auth().verifyIdToken(req.headers.authorization);
    canSee(firebaseUserID, token.uid, "production");

    //check if exists an account with the same firebaseUserID
    const user = await User.findOne({ firebaseUserID: firebaseUserID });

    if (user != null) {
      throw new Error(
        `an user with firebaseUserID ${firebaseUserID} already exists`
      );
    }

    //create a new user related to the firebase user id
    const newUser = await new User({
      firebaseUserID: firebaseUserID,
      FCMs: [],
      cashback: 0,
      likes: [],
      favourites: [],
    });
    await newUser.save();

    return true;
  } catch (e) {
    console.log("error while creating the user");
    throw new GraphQLError(e.message);
  }
};

export default createUser;
