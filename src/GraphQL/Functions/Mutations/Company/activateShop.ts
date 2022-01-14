import { GraphQLError } from "graphql";
import Shop from "../../../../Schema/Company/Shop/Shop.model";
import Product from "../../../../Schema/Product/Product.model";
import { MutationActivateShopArgs } from "../../../Types/types";

/**
 * @title Active Shop
 * @author Tommaso Merlini
 *
 * @param id the id of the shop
 *
 * @return Boolean!
 * @example
 * return true if everything was ok
 * return false if there was an error
 */

const activateShop = async (_: any, { id }: MutationActivateShopArgs) => {
  try {
    //update the shop
    await Shop.updateOne({ _id: id }, { isActive: true }, { upsert: false });

    //update the products of the shop
    await Product.updateMany(
      { shopID: id },
      { isActive: true },
      { upsert: false }
    );
    return true;
  } catch (e: any) {
    console.log("error while activating the shop");
    throw new GraphQLError(e.message);
    return false;
  }
};

export default activateShop;
