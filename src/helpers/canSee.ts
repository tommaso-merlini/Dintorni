import { GraphQLError } from "graphql";

require("dotenv").config();

const canSee = async (
  creator: string,
  watcher: string,
  environment: string
) => {
  if (process.env.NODE_ENV == environment) {
    if (creator == watcher) {
      throw new Error("User not authorized");
    }
    return 0; //the user is authenticated
  }

  return 1; //the environment does not match
};

export default canSee;
