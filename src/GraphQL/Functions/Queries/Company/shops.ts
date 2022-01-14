import { GraphQLError } from "graphql";
import Shop from "../../../../Schema/Company/Shop/Shop.model";
const MongoFilter = require("../../../MongoFilter/MongoFilter");
import { QueryShopsArgs } from "../../../Types/types";

const shops = async (_: any, { ids }: QueryShopsArgs, __: any, info) => {
  try {
    //filter the query
    const filter = MongoFilter(info);
    const shops = await Shop.find({ _id: { $in: ids } }, filter);
    return shops;
  } catch (e: any) {
    console.log("something went wrong while searching for the shops");
    throw new GraphQLError(e.message);
    return null;
  }
};

export default shops;
