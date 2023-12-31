const mongoose = require("mongoose");
const validator = require("validator");

mongoose.set("useCreateIndex", true);

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  categories: [{ type: String, required: true }],
  email: { type: String, required: true },
  openDays: { type: String, required: true },
  image: { type: String, required: true },
  openHours: { type: String, required: true },
  orderHours: { type: String, required: true },
  pickUpHours: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  phone: { type: String, required: true },
  likes: { type: Number, required: true },
  favourites: { type: Number, require: true },
  location: {
    type: {
      type: String,
      required: true,
    },
    coordinates: [],
  },
  cashbackInfo: {
    cashBack: { type: Number, required: true },
    fee: { type: Number, required: true },
    minPayment: { type: Number, required: true },
  },
  firebaseCompanyID: { type: String, required: true, index: true },
});

// ShopSchema.index({ firebaseID: 1 });
ShopSchema.index({ location: "2dsphere" });

// ShopSchema.createIndexes([{ firebaseID: 1 }]);

const Shop = mongoose.model("shop", ShopSchema);
export default Shop;
