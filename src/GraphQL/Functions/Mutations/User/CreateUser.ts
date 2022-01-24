import User from "../../../../Schema/User/User.model";
import { MutationCreateUserArgs } from "../../../Types/types";
import { GraphQLError } from "graphql";

const createUser = async (_, { firebaseUserID }: MutationCreateUserArgs) => {
  try {
    //TODO: authenticate the jwt

    //create a new user related to the firebase user id
    const user = await new User({
      firebaseUserID: firebaseUserID,
      FCMs: [],
      cashback: 0,
    });
    await user.save();

    return true;
  } catch (e) {
    console.log("error while creating the user");
    throw new GraphQLError(e.message);
  }
};

export default createUser;
