const mongoose = require("mongoose");
const validator = require("validator");

mongoose.set("useCreateIndex", true);

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  firebaseShopID: { type: String, required: true, index: true },
  stripeID: {
    type: String,
    required: false,
  },
  categories: [{ type: String, required: true }],
  isActive: { type: Boolean, required: true },
  phone: { type: String, required: false },
  favourites: { type: Number, require: true },
  likes: { type: Number, required: true },
  image: { type: String, required: false },
  openDays: [{ type: Number, required: false }],
  openHours: { type: String, required: false },
  orderHours: { type: String, required: false },
  location: {
    type: {
      type: String,
      required: false,
    },
    coordinates: [],
  },
  address: {
    type: String,
    required: true,
  },
  stepsCompleted: {
    type: Number,
    required: true,
  },
});

// ShopSchema.index({ firebaseID: 1 });
ShopSchema.index({ location: "2dsphere" });

// ShopSchema.createIndexes([{ firebaseID: 1 }]);

const Shop = mongoose.model("shop", ShopSchema);
export default Shop;
