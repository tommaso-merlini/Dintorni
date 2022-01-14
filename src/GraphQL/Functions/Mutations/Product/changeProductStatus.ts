import authenticateToken from "../../../../JWT/AuthenticateToken";
import { GraphQLError } from "graphql";
import Product from "../../../../Schema/Product/Product.model";
import useDel from "../../../../Redis/useDel/useDel";
import { MutationChangeProductStatusArgs } from "../../../Types/types";
require("dotenv").config();

const changeProductStatus = async (
  _,
  { id, status, firebaseCompanyID }: MutationChangeProductStatusArgs,
  { req, admin, client }
) => {
  try {
    if (process.env.NODE_ENV === "production") {
      const token = await admin.auth().verifyIdToken(req.headers.authorization);
      authenticateToken(token.uid, firebaseCompanyID);
    }

    if (
      status != "active" &&
      status != "not_active" &&
      status != "finished" &&
      status != "finished_today"
    ) {
      throw new Error(`${status} is not a status`);
    }

    await Product.updateOne({ _id: id }, { status: status });
    await useDel(`product/${id}`, client);

    return true;
  } catch (e: any) {
    console.log("error while changing the product status");
    throw new GraphQLError(e.message);
    return false;
  }
};

export default changeProductStatus;
