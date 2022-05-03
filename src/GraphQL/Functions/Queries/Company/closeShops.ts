import Shop from "../../../../Schema/Company/Shop/Shop.model";
import getRequestedFields from "../../../../helpers/getRequestedFields";
import { GraphQLError } from "graphql";
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
    const requestedFields = getRequestedFields(info);

    const filterCategories = () => {
      if (category === null) {
        return { $exists: true }; //all categories
      }
      return category;
    };

    const filterCashback = () => {
      if (cashBack === null) {
        return 0; //all types of cashback
      }
      return cashBack;
    };

    const closeShops = await Shop.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [location.coordinates[0], location.coordinates[1]],
          },
          spherical: true,
          query: { categories: filterCategories() },
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
          "cashbackInfo.cashBack": { $gte: filterCashback() },
          isActive: true,
        },
      },
      { $project: requestedFields },
    ]);

    return closeShops;
  } catch (e: any) {
    console.log("error while fetching the close shops");
    throw new GraphQLError(e.message);
  }
};

export default closeShops;
