const mongoose = require("mongoose");

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
  //cart:
});

const User = mongoose.model("user", UserSchema);
export default User;
