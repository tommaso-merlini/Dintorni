import Shop from "../../../../Schema/Company/Shop/Shop.model";
import useGet from "../../../../Redis/useGet/useGet";
import useSet from "../../../../Redis/useSet/useSet";
import { GraphQLError } from "graphql";

interface shopProductParams {
  shopID: string;
}

const shopProduct = async (
  { shopID }: shopProductParams,
  _: any,
  { client }: any
) => {
  try {
    const redisQuery = `shop/${shopID}`;

    // check if the shop are cached
    const redisShop = await useGet(redisQuery, client);

    //if the shop is cached return it
    if (redisShop) {
      if (!redisShop.isActive) throw new Error("shop is not active");
      return redisShop;
    }

    const shop = await Shop.findById(shopID);

    if (!shop) throw new Error(`shop with id ${shopID} does not exist`);
    if (!shop.isActive) throw new Error("shop is not active");

    //TODO: check if this this function can be used (all the elements are being used)
    //await useSet(redisQuery, shop, client);
    return shop;
  } catch (e: any) {
    console.log("error while fetching the shop product");
    throw new GraphQLError(e.message);
  }
};

export default shopProduct;
