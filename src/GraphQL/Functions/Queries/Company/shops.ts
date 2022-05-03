import { GraphQLError } from "graphql";
import Shop from "../../../../Schema/Company/Shop/Shop.model";
import getRequestedFields from "../../../../helpers/getRequestedFields";
import { QueryShopsArgs } from "../../../Types/types";

const shops = async (_: any, { ids }: QueryShopsArgs, __: any, info) => {
  try {
    const shops = await Shop.find(
      { _id: { $in: ids } },
      getRequestedFields(info)
    );
    return shops;
  } catch (e: any) {
    console.log("something went wrong while searching for the shops");
    throw new GraphQLError(e.message);
  }
};

export default shops;
