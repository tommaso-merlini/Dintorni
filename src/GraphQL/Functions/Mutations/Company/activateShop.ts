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
 */

const activateShop = async (_: any, { id }: MutationActivateShopArgs) => {
  try {
    await Shop.updateOne({ _id: id }, { isActive: true }, { upsert: false });

    //set product.IsActive = shop.IsActive
    await Product.updateMany(
      { shopID: id },
      { isActive: true },
      { upsert: false }
    );

    return true;
  } catch (e: any) {
    console.log("error while activating the shop");
    throw new GraphQLError(e.message);
  }
};

export default activateShop;
