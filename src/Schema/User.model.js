const validator = require("validator");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [validator.isEmail, "invalid email"],
  },
  FirebaseID: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: {
      type: String,
      required: true,
    },
    coordinates: [{ type: Number, required: true }],
  },
  lifePoints: { type: Number, required: true },
  cashBack: {
    availableCashBack: { type: Number, required: true },
    totalCashBack: { type: Number, required: true },
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
