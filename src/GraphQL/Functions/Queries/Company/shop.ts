import Shop from "../../../../Schema/Company/Shop/Shop.model";
import useGet from "../../../../Redis/useGet/useGet";
import useSet from "../../../../Redis/useSet/useSet";
import { GraphQLError } from "graphql";
import { QueryShopArgs } from "../../../Types/types";

const shop = async (_: any, { id }: QueryShopArgs, { client }) => {
  try {
    //check if the shop is cached
    const redisShop = await useGet(`shop/${id}`, client);
    if (redisShop) {
      if (!redisShop.isActive) throw new Error(`shop is not active`);
      return redisShop;
    }

    //get the shop from mongodb
    const shop = await Shop.findById(id).lean();
    if (!shop) throw new Error(`shop with id ${id} does not exists`);
    if (!shop.isActive) throw new Error(`shop is not active`);

    //set shop in the cache
    await useSet(`shop/${id}`, shop, client);

    return shop;
  } catch (e: any) {
    console.log("error while fetching the shop");
    throw new GraphQLError(e.message);
    return null;
  }
};

export default shop;
