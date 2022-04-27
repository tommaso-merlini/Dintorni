import { GraphQLError } from "graphql";
import getRequestedFields from "../../../../helpers/getRequestedFields";
import Shop from "../../../../Schema/Company/Shop/Shop.model";
import { QueryFavouriteShopsArgs } from "../../../Types/types";

const favouriteShops = async (
  _: any,
  { ids }: QueryFavouriteShopsArgs,
  __: any,
  info
) => {
  try {
    const requestedFields = getRequestedFields(info);

    var favouriteShops = await Shop.find(
      { _id: ids, isActive: true },
      requestedFields
    );

    //! ???
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
