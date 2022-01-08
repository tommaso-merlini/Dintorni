import { GraphQLError } from "graphql";
import MongoFilter from "../../../MongoFilter/MongoFilter";
import Shop from "../../../../Schema/Company/Shop/Shop.model";

interface favouriteShopsParams {
  ids: string[];
}

const favouriteShops = async (
  _: any,
  { ids }: favouriteShopsParams,
  __: any,
  info
) => {
  try {
    //get the requested fields and store them in a filter const
    const filter = MongoFilter(info);

    var favouriteShops = await Shop.find({ _id: ids, isActive: true }, filter);

    favouriteShops.map((shop: any) => {
      if (!shop) {
        favouriteShops.splice(favouriteShops.indexOf(shop), 1);
      }
    });

    if (favouriteShops.length === 0) {
      throw new Error(
        "all the favorite shops are either not active or non-existing"
      );
    }

    return favouriteShops;
  } catch (e: any) {
    console.log("error while fetching the favourite shops");
    throw new GraphQLError(e.message);
  }
};

export default favouriteShops;
