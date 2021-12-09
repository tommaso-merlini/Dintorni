const Product = require("../../../../Schema/Product/Product.model");
const useDel = require("../../../../Redis/useDel/useDel.js");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const changeProductStatus = async (_, { id, status, firebaseCompanyId }, { req, admin, client }) => {
    try {
        if (process.env.NODE_ENV === "production") {
            const token = await admin.auth().verifyIdToken(req.headers.authorization);
            authenticateToken(token.uid, firebaseCompanyId);
        }

        if (status != "active" && status != "not_active" && status != "finished" && status != "finished_today") {
            throw new Error(`${status} is not a status`);
        }


        await Product.updateOne({ _id: id }, { status: status });
        await useDel(`product/${id}`, client);

        return true;
    } catch (e) {
        console.log("error while changing the product status");
        throw new GraphQLError(e.message);
        return false;
    }
};

module.exports = changeProductStatus;
