import { GraphQLError } from "graphql";
import Shop from "../../../../Schema/Company/Shop/Shop.model";
import getRequestedFields from "../../../../helpers/getRequestedFields";
import { QueryShopsByFirebaseCompanyIdArgs } from "../../../Types/types";

const shopsByFirebaseCompanyID = async (
  _: any,
  { firebaseCompanyID }: QueryShopsByFirebaseCompanyIdArgs,
  __: any,
  info
) => {
  try {
    const shops = await Shop.find(
      { firebaseCompanyID: firebaseCompanyID },
      getRequestedFields(info)
    );
    return shops;
  } catch (e: any) {
    console.log(
      "something went wrong while searching for the shops by company firebase id"
    );
    throw new GraphQLError(e.message);
  }
};

export default shopsByFirebaseCompanyID;
