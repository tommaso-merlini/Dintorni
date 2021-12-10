const Product = require("../../../../Schema/Product/Product.model");
const MongoFilter = require("../../../MongoFilter/MongoFilter");
const { GraphQLError } = require("graphql");

const productsShop = async (company, { limit, offset, auth }, _, info) => {
    try {
        if (limit < 0 || offset < 0) {
            throw new Error("limit and offset cannot be negative");
        }

        //filter the query
        const filter = MongoFilter(info);

        const setAuth = () => {
            if (auth === "shop") {
                return { $exists: true }; //all categories
            }
            if (auth === "user") {
                return "active";
            }
            throw new Error("auth must be shop or user");
        };



        //get the products from mongodb if not cached
        const products = await Product.find({ shopID: company._id, status: setAuth() }, filter)
            .skip(offset)
            .limit(limit)
            .lean();

        return products;
    } catch (e) {
        console.log("error while fetching the productsCompany");
        throw new GraphQLError(e.message);
        return null;
    }
};

module.exports = productsShop;
