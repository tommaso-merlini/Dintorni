import { GraphQLError } from "graphql";
import User from "../../../../Schema/User/User.model";
import { MutationFcmArgs } from "../../../Types/types";
import canSee from "../../../../helpers/canSee";
import { Types } from "mongoose";
require("dotenv").config();

const newFCM = async (
  _,
  { id, FCM, action }: MutationFcmArgs,
  { admin, req }
) => {
  try {
    //authenticate the user the user
    canSee(id, req.headers.authorization, "production");

    switch (action) {
      case "add":
        await addUserFCM(id, FCM);
        break;
      case "remove":
        await removeUserFCM(id, FCM);
        break;
      default:
        throw new Error(
          `action can not be ${action}, valid actions: "add" or "remove"`
        );
    }

    return true;

    /**
     * this function insert the requested FCM into the user document
     * and throws an error if it doesn't find the user
     *
     * @param firebaseUserID
     * @param FCM
     *
     */
    async function addUserFCM(id: string, FCM: string) {
      const response = await User.updateOne(
        { _id: id },
        {
          $push: {
            FCMs: {
              $each: [FCM],
              $position: -1,
            },
          },
        }
      );
      if (response.n === 0) {
        throw new Error(`user with id ${id} does not exist`);
      }
      if (response.nModified === 0) {
        throw new Error(`an error occured while adding the FCM`);
      }
    }

    async function removeUserFCM(id: string, FCM: string) {
      const response = await User.updateOne(
        { _id: id },
        {
          $pull: {
            FCMs: FCM,
          },
        }
      );
      if (response.n === 0) {
        throw new Error(`user with id ${id} does not exist`);
      }
      if (response.nModified === 0) {
        throw new Error(`the FCM ${FCM} is already been deleted`);
      }
    }
  } catch (e) {
    console.log("error while creating a new fcm");
    throw new GraphQLError(e.message);
  }
};

export default newFCM;
