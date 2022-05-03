import { GraphQLError } from "graphql";
import Product from "../../../../Schema/Product/Product.model";
import getRequestedFields from "../../../../helpers/getRequestedFields";

interface productsShopParams {
  limit: number;
  offset: number;
  iAm: string; //TODO: change from iAm to auth and take the id, if it's equal to the _id then we can view all the products
}

const productsShop = async (
  shop: { _id: string },
  { limit, offset, iAm }: productsShopParams,
  _: any,
  info
) => {
  try {
    if (limit < 0 || offset < 0) {
      throw new Error("limit and offset cannot be negative");
    }

    //check the iAm
    if (iAm != "shop" && iAm != "user") {
      throw new Error("iAm must be shop or user");
    }

    const products = await Product.find(
      {
        shopID: shop._id,
        status: iAm === "shop" ? { $exists: true } : "active",
      },
      getRequestedFields(info)
    )
      .skip(offset)
      .limit(limit)
      .lean();

    return products;
  } catch (e: any) {
    console.log("error while fetching the productsCompany");
    throw new GraphQLError(e.message);
  }
};

export default productsShop;
