const mongoose = require("mongoose");

const ProductLikeSchema = new mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, required: true },
    productID: { type: mongoose.Types.ObjectId, required: true }
});

const ProductLike = mongoose.model("product_like", ProductLikeSchema);
module.exports = ProductLike;
