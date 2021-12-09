const Product = require("../../../../Schema/Product/Product.model");
const Shop = require("../../../../Schema/Company/Shop/Shop.model");
const useDel = require("../../../../Redis/useDel/useDel");
require("dotenv").config();

const authenticateToken = require("../../../../JWT/AuthenticateToken");
const { GraphQLError } = require("graphql");

const deleteProduct = async (_, { id, firebaseCompanyID }, { req, admin, client }) => {
    try {
        if (process.env.NODE_ENV === "production") {
            const token = await admin.auth().verifyIdToken(req.headers.authorization);
            authenticateToken(token.uid, firebaseCompanyID);
        }

        //delete product in mongofn and in redis
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) throw new Error("could not find the product");
        await useDel(`product/${id}`, client);

        return true;
    } catch (e) {
        console.log("error while trying to delete the product");
        throw new GraphQLError(e.message);
        return false;
    }
};

module.exports = deleteProduct;
