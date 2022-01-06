const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const CartSchema = new mongoose.Schema({
  firebaseUserID: {
    type: String,
    required: true,
  },
  shopID: {
    type: String,
    required: true,
  },
  products: [
    {
      id: mongoose.Types.ObjectId,
      quantity: Number,
      required: true,
    },
  ],
});

ShopSchema.createIndexes([{ firebaseUserID: 1, shopID: 1 }]);

const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart;
