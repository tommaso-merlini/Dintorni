import { admin } from "../firebase/firebase";
require("dotenv").config();

const canSee = async (creator: string, token: string, environment: string) => {
  if (process.env.NODE_ENV == environment) {
    try {
      const watcher = await admin.auth().verifyIdToken(token);

      if (creator == watcher.uid) {
        throw new Error("User not authorized");
      }

      return 0; //the user is authenticated
    } catch (e) {
      throw new Error(e);
    }
  }

  return 1; //the environment does not match
};

export default canSee;
