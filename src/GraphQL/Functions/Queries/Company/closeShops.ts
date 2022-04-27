import Shop from "../../../../Schema/Company/Shop/Shop.model";
import getRequestedFields from "../../../../helpers/getRequestedFields";
import { GraphQLError } from "graphql";
import { LargeNumberLike } from "crypto";
import { QueryCloseShopsArgs } from "../../../Types/types";

const closeShops = async (
  _: any,
  { location, category, cashBack, range, limit, offset }: QueryCloseShopsArgs,
  __: any,
  info
) => {
  try {
    if (limit < 0 || offset < 0) {
      throw new Error("limit and offset cannot be negative");
    }

    //get the requested fields and store them in a filter const
    const filter = getRequestedFields(info);

    const setCategories = () => {
      if (category === null) {
        return { $exists: true }; //all categories
      }
      return category;
    };

    const setCashBack = () => {
      if (cashBack === null) {
        return 0; //all types of cashback
      }
      return cashBack;
    };

    var closeShops = await Shop.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [location.coordinates[0], location.coordinates[1]],
          },
          spherical: true,
          query: { categories: setCategories() },
          distanceField: "coordinates",
          minDistance: 0,
          maxDistance: range,
        },
      },
      {
        $skip: offset,
      },
      { $limit: limit },
      {
        $match: {
          // Filter documents that don't have balance > 0
          "cashbackInfo.cashBack": { $gte: setCashBack() },
          isActive: true,
        },
      },
      { $project: filter },
    ]);
    console.log(closeShops);

    return closeShops;
  } catch (e: any) {
    console.log("error while fetching the close shops");
    throw new GraphQLError(e.message);
    return null;
  }
};

export default closeShops;
