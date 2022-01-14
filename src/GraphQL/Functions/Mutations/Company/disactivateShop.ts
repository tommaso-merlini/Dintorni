import { GraphQLError } from "graphql";
import Shop from "../../../../Schema/Company/Shop/Shop.model";
import Product from "../../../../Schema/Product/Product.model";
import useDel from "../../../../Redis/useDel/useDel";
import { MutationDisactivateShopArgs } from "../../../Types/types";

/**
 * @title Disactive The Shop
 * @author Tommaso Merlini
 *
 * @param id the id of the shop
 *
 * @return Boolean!
 * @example
 * return true if everything was ok
 * return false if there was an error
 */

const disactivateShop = async (
  _: any,
  { id }: MutationDisactivateShopArgs,
  { client }
) => {
  try {
    //update the shop
    await Shop.updateOne({ _id: id }, { isActive: false }, { upsert: false });

    //update the products of the shop
    await Product.updateMany(
      { shopID: id },
      { isActive: false },
      { upsert: false }
    );

    //delete all the products form the cache where the shopID is equal to the id
    const products = await Product.find({ shopID: id });
    for (let i = 0; i < products.length; i++) {
      useDel(`product/${products[i]._id}`, client);
    }

    //delete the shop form the cache
    useDel(`shop/${id}`, client);

    return true;
  } catch (e: any) {
    console.log("error while disactivating the shop");
    throw new GraphQLError(e.message);
    return false;
  }
};

export default disactivateShop;
