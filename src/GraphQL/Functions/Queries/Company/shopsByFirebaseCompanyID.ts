import { GraphQLError } from "graphql";
import Shop from "../../../../Schema/Company/Shop/Shop.model";
import MongoFilter from "../../../MongoFilter/MongoFilter";
import { QueryShopsByFirebaseCompanyIdArgs } from "../../../Types/types";

const shopsByFirebaseCompanyID = async (
  _: any,
  { firebaseCompanyID }: QueryShopsByFirebaseCompanyIdArgs,
  __: any,
  info
) => {
  try {
    const filter = MongoFilter(info);
    const shops = await Shop.find(
      { firebaseCompanyID: firebaseCompanyID },
      filter
    );
    return shops;
  } catch (e: any) {
    console.log(
      "something went wrong while searching for the shops by company firebase id"
    );
    throw new GraphQLError(e.message);
    return null;
  }
};

export default shopsByFirebaseCompanyID;
