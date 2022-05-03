import { GraphQLError } from "graphql";
import Product from "../../../../Schema/Product/Product.model";
import getRequestedFields from "../../../../helpers/getRequestedFields";
import { QueryCloseProductsTitleArgs } from "../../../Types/types";

const closeProductsTitle = async (
  _: any,
  { name, location, range, limit, offset }: QueryCloseProductsTitleArgs,
  __: any,
  info
) => {
  try {
    if (limit < 0 || offset < 0) {
      throw new Error("limit and offset cannot be negative");
    }

    const closeProducts = await Product.aggregate([
      {
        $search: {
          index: "search",
          compound: {
            must: [
              {
                text: {
                  query: name,
                  path: "name",
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 4,
                  },
                },
              },
              {
                geoWithin: {
                  path: "location",
                  circle: {
                    center: {
                      type: "Point",
                      coordinates: [
                        location.coordinates[0],
                        location.coordinates[1],
                      ],
                    },
                    radius: range,
                  },
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          ...getRequestedFields(info),
          shopID: 1,
          score: {
            $meta: "searchScore",
          },
        },
      },
    ])
      .skip(offset)
      .limit(limit);

    return closeProducts;
  } catch (e: any) {
    console.log("error while fetching the close products by title");
    throw new GraphQLError(e.message);
    return null;
  }
};

export default closeProductsTitle;
