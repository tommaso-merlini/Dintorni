import Product from "../../../../Schema/Product/Product.model";
import useGet from "../../../../Redis/useGet/useGet";
import useSet from "../../../../Redis/useSet/useSet";
import { GraphQLError } from "graphql";
import { QueryProductArgs } from "../../../Types/types";
const product = async (_, { id }: QueryProductArgs, { client }) => {
  try {
    //check if the product is cached
    const redisProduct = await useGet(`product/${id}`, client);

    //if the product is cached return it
    if (redisProduct) {
      if (redisProduct.status === "not_active")
        throw new Error("product is not active");
      return redisProduct;
    }

    //get the product from mongodb if not cached
    const product = await Product.findById(id);

    if (!product) throw new Error(`product with id ${id} does not exist`);
    if (product.status === "not_active")
      throw new Error("product is not active");

    if (product) {
      await useSet(`product/${id}`, product, client);
    }

    return product;
  } catch (e: any) {
    console.log("error by fetching the product");
    throw new GraphQLError(e.message);
  }
};

export default product;
