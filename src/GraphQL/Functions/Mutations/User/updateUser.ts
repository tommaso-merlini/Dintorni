import { MutationUpdateUserArgs } from "../../../Types/types";
import canSee from "../../../../helpers/canSee";
import User from "../../../../Schema/User/User.model";
import { GraphQLError } from "graphql";

const updateUser = async (
  _,
  { firebaseUserID, input }: MutationUpdateUserArgs,
  { req }
) => {
  try {
    //authenticate the user the user
    await canSee(firebaseUserID, req.headers.authorization, "production");

    const response = await User.updateOne(
      { firebaseUserID: firebaseUserID },
      input
    );

    if (response.n === 0) {
      throw new Error(
        `user with firebaseUserID ${firebaseUserID} does not exist`
      );
    }
    if (response.nModified === 0) {
      throw new Error(`an error occured while updating the user`);
    }

    return true;
  } catch (e) {
    console.log("error while updating the user");
    throw new GraphQLError(e.message);
  }
};

export default updateUser;
