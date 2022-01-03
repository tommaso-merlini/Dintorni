const { GraphQLError } = require("graphql");
const PaymentIntent = require("../../../../Schema/Stripe/PaymentIntent.model");
require("dotenv").config();

/**
 * @title Create The Order
 * @author Tommaso Merlini | Nicolo Merlini
 *
 * @param {String} paymentIntentID the id of the paymentIntent
 * @param {String} accountID the id of the stripe company account
 * @param firebaseCompanyID
 * @param firebaseUserID
 * param shopID
 * param totalh
 * param totalToPay
 * param newCashback
 * param cbCompany
 * @param pickUpHour (Int)
 * @param TimeStamp (Int)
 * @returns code
 */
const createOrder = async (
  _,
  { paymentIntentID },
  { stripe, db, req, admin, FieldValue }
) => {
  try {
    //?authorize the user?
    // if (process.env.NODE_ENV === "production") {
    //   const token = await admin.auth().verifyIdToken(req.headers.authorization);
    //   console.log(token);
    // }

    //retrieve the payment intent from mongodb
    const paymentIntent = await PaymentIntent.findById(paymentIntentID);

    //check if the payment intent exists
    if (paymentIntent === null) {
      throw new Error(
        `the payment Intent with id ${paymentIntentID} does not exist`
      );
    }

    //check if the payment intent is active
    if (paymentIntent.isActive === false) {
      throw new Error(
        "the payment intent has already been redeemed. (isActive: false)"
      );
    }

    //retrieve the payment intent
    // const paymentIntent = await stripe.paymentIntents.retrieve(
    //   paymentIntentID,
    //   {
    //     stripeAccount: accountID,
    //   }
    // );

    //creating order code
    const alphabet = "abcdefghilmnopqrstuvxz";
    const alphabeticCode =
      alphabet[Math.floor(Math.random() * alphabet.length)] +
      alphabet[Math.floor(Math.random() * alphabet.length)];
    const numericCode = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const code = alphabeticCode.toUpperCase() + numericCode;

    //create the order on firebase
    await db.collection("Orders").doc(code).set({
      shopID: paymentIntent.shopID.toString(),
      status: "not_redeemed" /** @params (redeemed, not_redeemed, ) */,
      //TODO: add the other params
      total: paymentIntent.total,
    });

    //increment the user cashback by the accumulated cashback
    await db
      .collection("CashbackUser")
      .doc(paymentIntent.firebaseUserID)
      .update(
        {
          cb: FieldValue.increment(
            Number(paymentIntent.cashbackAccumulated.toFixed(2))
          ),
        },
        { merge: true } //create document if it does not exist
      );

    //TODO: increment the company cashback

    //disactivate the paymentIntent
    await PaymentIntent.updateOne(
      { _id: paymentIntentID },
      { isActive: false }
    );

    return code;
  } catch (e) {
    console.log(`error while  creating the order`);
    throw new GraphQLError(e.message);
  }
};

module.exports = createOrder;
