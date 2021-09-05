const mongoose = require("mongoose");
const validator = require("validator");


const LightCompanySchema = new mongoose.Schema({
  name: { type: String,required: true },
  categories: [{ type: String, required: true }],
  openDays: { type: String, required: true },
  openHours: {type: String, required: true},
  isActive: {type: Boolean, required: true},
  likes: {type: Number, required: true},
  location: {
    type: {
      type: String,
      required: true,
    },
    coordinates: [],
  },
  cashbackInfo: {
    cashBack: {type: Number, required: true},
    fee: {type: Number, required: true},
    minPayment: {type: Number, required: true},
  },
  companyID: {type: mongoose.Types.ObjectId, required: true}
});

const LightCompany = mongoose.model("light_company", LightCompanySchema);
module.exports = LightCompany;
