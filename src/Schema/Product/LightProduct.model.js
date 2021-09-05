const mongoose = require("mongoose");

const LightProductSchema = new mongoose.Schema({
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
  isActive: {type: Boolean, required: true},
  companyID: { type: mongoose.Types.ObjectId, required: true },
  productID: { type: mongoose.Types.ObjectId, required: true },
});

const LightProduct = mongoose.model("light_product", LightProductSchema);
module.exports = LightProduct;
