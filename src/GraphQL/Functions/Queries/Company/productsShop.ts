import { GraphQLError } from "graphql";
import Product from "../../../../Schema/Product/Product.model";
import getRequestedFields from "../../../../helpers/getRequestedFields";

interface productsShopParams {
  limit: number;
  offset: number;
  auth: string; //TODO: change from auth to iAm
}

const productsShop = async (
  shop: { _id: string },
  { limit, offset, auth }: productsShopParams,
  _: any,
  info
) => {
  try {
    if (limit < 0 || offset < 0) {
      throw new Error("limit and offset cannot be negative");
    }

    //! ???
    const setAuth = () => {
      if (auth === "shop") {
        return { $exists: true }; //all categories
      }
      if (auth === "user") {
        return "active";
      }
      throw new Error("auth must be shop or user");
    };

    const requestedFields = getRequestedFields(info);
    const products = await Product.find(
      { shopID: shop._id, status: setAuth() },
      requestedFields
    )
      .skip(offset)
      .limit(limit)
      .lean();

    return products;
  } catch (e: any) {
    console.log("error while fetching the productsCompany");
    throw new GraphQLError(e.message);
    return null;
  }
};

export default productsShop;
