const Product = require("../../../../Schema/Product/Product.model");
const { GraphQLError } = require("graphql");
const MongoFilter = require("../../../MongoFilter/MongoFilter");

const closeProductsTitle = async (
    _,
    { name, location, range, limit, offset },
    __,
    info
) => {
    try {
        if (limit < 0 || offset < 0) {
            throw new Error("limit and offset cannot be negative");
        }

        var filter = MongoFilter(info);

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
                    ...filter,
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
    } catch (e) {
        console.log("error while fetching the close products by title");
        throw new GraphQLError(e.message);
        return null;
    }
};

module.exports = closeProductsTitle;
