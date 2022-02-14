import { QueryUserArgs } from "../../../Types/types";
import useGet from "../../../../Redis/useGet/useGet";
import useSet from "../../../../Redis/useSet/useSet";
import { GraphQLError } from "graphql";
import User from "../../../../Schema/User/User.model";

const user = async (_, { id }: QueryUserArgs, { client }) => {
  try {
    //check if the user is cached
    const redisUser = await useGet(`user/${id}`, client);

    //if the product is cached return it
    if (redisUser) {
      return redisUser;
    }

    //get the user from mongodb if not cached
    const user = await User.findById(id);
    if (!user) throw new Error(`user with id ${id} does not exist`);

    //cache the user
    await useSet(`user/${id}`, user, client);

    return user;
  } catch (e) {
    console.log("error by fetching the user");
    throw new GraphQLError(e.message);
  }
};

export default user;
