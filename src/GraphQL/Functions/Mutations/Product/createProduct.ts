import { GraphQLError } from "graphql";
import Product from "../../../../Schema/Product/Product.model";
import Shop from "../../../../Schema/Company/Shop/Shop.model";
import authenticateToken from "../../../../JWT/AuthenticateToken";
import { MutationCreateProductArgs } from "../../../Types/types";
require("dotenv").config();

const createProduct = async (
  _: any,
  { input, firebaseCompanyID }: MutationCreateProductArgs,
  { req, admin }
) => {
  try {
    if (process.env.NODE_ENV === "production") {
      const token = await admin.auth().verifyIdToken(req.headers.authorization);
      authenticateToken(token.uid, firebaseCompanyID);
    }

    // const tokenID = token.uid;
    // let isCompany = token.company;
    // if(isCompany === undefined || isCompany === null) {
    //     isCompany = false;
    // }

    //if the user authenticates
    // authenticateToken(token.uid, firebaseCompanyId);

    //get the shop => it will be reusable for some details
    //TODO: add a filter to this request
    const shop = await Shop.findById(input.shopID);

    if (!shop)
      throw new Error(
        `it was impossible creating the product because the shop with id ${input.shopID} does not exist`
      );

    const status = shop.isActive ? "active" : "not_active";

    //if the user is logged in and the ids match
    const product = await new Product({
      ...input,
      location: shop.location,
      ShopName: shop.name,
      likes: 0,
      status: status,
    });
    const savedProduct = await product.save();

    return savedProduct;
  } catch (e: any) {
    console.log("error while creating the product");
    console.log(e.message);
    throw new GraphQLError(e.message);
    return null;
  }
};

export default createProduct;
