import { GraphQLError } from "graphql";
import Shop from "../../../../Schema/Company/Shop/Shop.model";
import useDel from "../../../../Redis/useDel/useDel";
import { UpdateShopInput } from "../../../Types/types";

/**
 * @title Update A Shop
 * @author Tommaso Merlini
 *
 * @param id the id of the shop
 *
 * @param input the updated fields
 *
 * @return Boolean!
 * @example
 * return true if everything was ok
 * return false if there was an error
 */

interface updateShopParams {
  id: string;
  input: UpdateShopInput;
}

const updateShop = async (
  _: any,
  { id, input }: updateShopParams,
  { client }
) => {
  try {
    //update the shop
    await Shop.updateOne({ _id: id }, input);

    //delete the shop from redis
    useDel(`company/${id}`, client);

    return true;
  } catch (e) {
    console.log("error while updating the shop");
    throw new GraphQLError(e.message);
    return false;
  }
};

export default updateShop;
