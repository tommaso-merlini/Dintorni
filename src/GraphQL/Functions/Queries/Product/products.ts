import Product from "../../../../Schema/Product/Product.model";
import { GraphQLError, TypeInfo } from "graphql";
import getRequestedFields from "../../../../helpers/getRequestedFields";
import { QueryProductsArgs } from "../../../Types/types";

const products = async (_: any, { ids }: QueryProductsArgs, __: any, info) => {
  try {
    const products = await Product.find(
      { _id: { $in: ids } },
      getRequestedFields(info)
    );

    // check the unkown ids
    //const returnedIDs: string[] = [];
    //const unkownIDs = [];
    //products.map((product: { _id: string }) => {
    //  returnedIDs.push(JSON.stringify(product._id));
    //});
    //ids.map((id: string) => {
    //  if (!returnedIDs.includes(JSON.stringify(id))) {
    //    unkownIDs.push(id);
    //  }
    //});

    //TODO?: return the unkown ids as errors

    return products;
  } catch (e: any) {
    console.log("something went wrong while searching for products");
    throw new GraphQLError(e.message);
  }
};

export default products;
