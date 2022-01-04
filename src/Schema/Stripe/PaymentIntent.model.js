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
  type: {
    type: String,
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
  cashbackUsed: {
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
  isActive: {
    type: Boolean,
    required: true,
  },
  products: [
    {
      id: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: { type: Number, required: true },
      weight: {
        type: Number,
        required: true,
      },
    },
  ],
});

PaymentIntentSchema.index({ firebaseUserID: 1, shopID: 1 });

const PaymentIntent = mongoose.model("payment_intent", PaymentIntentSchema);
module.exports = PaymentIntent;
