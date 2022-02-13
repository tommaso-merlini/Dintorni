import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firebaseUserID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  cashback: {
    type: Number,
    required: true,
  },
  allTimeCashback: {
    type: Number,
    required: true,
  },
  location: {
    type: {
      type: String,
      required: true,
    },
    coordinates: [{ type: Number, required: false }],
    street: {
      type: String,
      required: false,
    },
  },
  createdAt: { type: Date, required: true, default: Date.now },
  FCMs: [
    {
      type: String,
      required: true,
    },
  ],
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

UserSchema.index({ firebaseUserID: 1 });

const User = mongoose.model("user", UserSchema);
export default User;
