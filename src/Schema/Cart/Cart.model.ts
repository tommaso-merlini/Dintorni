const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const CartSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  shopID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  products: [
    {
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

CartSchema.index([{ userID: 1, shopID: 1 }]);

const Cart = mongoose.model("cart", CartSchema);
export default Cart;
