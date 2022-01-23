const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firebaseID: {
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
    type: String,
    required: true,
  },
  //cart:
});

const User = mongoose.model("user", UserSchema);
export default User;
