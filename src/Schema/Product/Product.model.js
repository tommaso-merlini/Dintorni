const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  images: [{ type: String, required: true }],
  description: { type: String, required: false },
  shopName: { type: String, required: true },
  likes: { type: Number, required: true },
  location: {
    type: {
      type: String,
      required: true,
    },
    coordinates: [{ type: Number, required: true }],
  },
  isActive: { type: Boolean, required: true },
  shopID: { type: mongoose.Types.ObjectId, required: true },
});

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
