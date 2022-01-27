import mongoose from "mongoose";
import Cart from "../Cart/Cart.model";

const UserSchema = new mongoose.Schema({
  firebaseUserID: {
    type: String,
    required: true,
  },
  FCMs: [
    {
      type: String,
      required: true,
    },
  ],
  cashback: {
    type: Number,
    required: true,
  },
  likes: [
    {
      productID: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    },
  ],
  favourites: [
    {
      shopID: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    },
  ],
});

const User = mongoose.model("user", UserSchema);
export default User;
