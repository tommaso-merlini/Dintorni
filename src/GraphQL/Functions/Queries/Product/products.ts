import Product from "../../../../Schema/Product/Product.model";
import { GraphQLError, TypeInfo } from "graphql";
import MongoFilter from "../../../MongoFilter/MongoFilter";

interface productsParams {
  ids: string[];
}

const products = async (_: any, { ids }: productsParams, __: any, info) => {
  console.log("caio");

  try {
    const returnedIDs: string[] = [];
    const unkownIDs = [];
    const filter = MongoFilter(info);
    const products = await Product.find({ _id: { $in: ids } }, filter);
    products.map((product: { _id: string }) => {
      returnedIDs.push(JSON.stringify(product._id));
    });

    ids.map((id: string) => {
      if (!returnedIDs.includes(JSON.stringify(id))) {
        unkownIDs.push(id);
      }
    });

    //TODO: return the unkown ids as errors

    return products;
  } catch (e: any) {
    console.log("somthing went wrong while searching for products");
    throw new GraphQLError(e.message);
  }
};

export default products;
