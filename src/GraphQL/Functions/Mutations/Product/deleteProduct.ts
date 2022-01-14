import { GraphQLError } from "graphql";
import Product from "../../../../Schema/Product/Product.model";
import Shop from "../../../../Schema/Company/Shop/Shop.model";
import useDel from "../../../../Redis/useDel/useDel";
import authenticateToken from "../../../../JWT/AuthenticateToken";
import { MutationDeleProductArgs } from "../../../Types/types";
require("dotenv").config();

interface deletedProductParams {
  id: string;
  firebaseCompanyID: string;
}

const deleteProduct = async (
  _,
  { id, firebaseCompanyID }: MutationDeleProductArgs,
  { req, admin, client }
) => {
  try {
    if (process.env.NODE_ENV === "production") {
      const token = await admin.auth().verifyIdToken(req.headers.authorization);
      authenticateToken(token.uid, firebaseCompanyID);
    }

    //delete product in mongofn and in redis
    const deletedProduct = await Product.updateOne(
      { _id: id },
      { status: "deleted" }
    );
    if (!deletedProduct) throw new Error("could not find the product");
    await useDel(`product/${id}`, client);

    return true;
  } catch (e: any) {
    console.log("error while trying to delete the product");
    throw new GraphQLError(e.message);
  }
};

export default deleteProduct;
