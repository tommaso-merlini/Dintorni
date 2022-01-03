const mongoose = require("mongoose");

const PaymentIntentSchema = new mongoose.Schema({
  accountID: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  clientSecret: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  newCashback: {
    type: Number,
    required: true,
  },
  cashbackCompany: {
    type: Number,
    required: true,
  },
  cashbackAccumulated: {
    type: Number,
    required: true,
  },
  shopID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  firebaseCompanyID: {
    type: String,
    required: true,
  },
  firebaseUserID: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
});

PaymentIntentSchema.index({ firebaseUserID: 1, shopID: 1 });

const PaymentIntent = mongoose.model("payment_intent", PaymentIntentSchema);
module.exports = PaymentIntent;
