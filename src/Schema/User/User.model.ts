const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firebaseID: {
    type: String,
    required: true,
  },
  fcm: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);
export default User;
