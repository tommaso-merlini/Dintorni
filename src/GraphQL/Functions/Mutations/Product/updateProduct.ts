import { GraphQLError, StringValueNode } from "graphql";
import Product from "../../../../Schema/Product/Product.model";
import useGet from "../../../../Redis/useGet/useGet";
import useSet from "../../../../Redis/useSet/useSet";
import merge from "merge";
import { UpdateProductInput } from "../../../Types/types";

interface updateProductParams {
  id: string;
  input: UpdateProductInput;
}

const updateProduct = async (
  _: any,
  { id, input }: updateProductParams,
  { user, client }
) => {
  try {
    await Product.updateOne({ _id: id }, input);
    //check if the product is cached
    const redisProduct = await useGet(`product/${id}`, client);

    //if the product already existed  update it
    if (redisProduct) {
      //merge the input with the product retured by redis
      const mergedProduct = merge(redisProduct, input);
      await useSet(`product/${id}`, mergedProduct, client);
    }
    return true;
  } catch (e: any) {
    console.log("error while updating the product");
    throw new GraphQLError(e.message);
    return false;
  }
};

export default updateProduct;
