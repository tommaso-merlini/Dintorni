const { GraphQLError } = require("graphql");
const PaymentIntent = require("../../../../Schema/Stripe/PaymentIntent.model");
require("dotenv").config();

/**
 * @title Create The Order
 * @author Tommaso Merlini | Nicolo Merlini
 *
 * @param paymentIntentID the id of the paymentIntent
 * @param accountID the id of the stripe company account
 * @param firebaseCompanyID
 * @param firebaseUserID
 * param shopID
 * param totalh
 * param totalToPay
 * param newCashback
 * param cbCompany
 * @param pickUpHour (Int)
 * @param TimeStamp (Int)
 * @param returns code
 */

//TODO: fare orderProducts =>
const createOrder = async (
  _,
  { paymentIntentID, accountID, firebaseUserID },
  { stripe, db, req }
) => {
  try {
    //authorize the user
    if (process.env.NODE_ENV === "production") {
      const token = await admin.auth().verifyIdToken(req.headers.authorization);
      console.log(token);
    }

    //retrieve the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentID,
      {
        stripeAccount: accountID,
      }
    );
    console.log(paymentIntent);
    const metadata = paymentIntent.metadata;
    const newCashbackUser = metadata.newCashBackUser;

    //set the new newCashbackUser
    await db
      .collection("CashbackUser")
      .doc(firebaseUserID)
      .set({ cashback: Number(newCashbackUser.toFixed(2)) });

    //creating order code
    const alphabet = "abcdefghilmnopqrstuvxz";
    const alphabeticCode =
      alphabet[Math.floor(Math.random() * alphabet.length)] +
      alphabet[Math.floor(Math.random() * alphabet.length)];
    const numericCode = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const code = alphabeticCode.toUpperCase() + numericCode;
    console.log(`code: ${code}`);

    //create the order on firebase
    await db.collection("Orders").doc(code).set({
      shopID: metadata.shopID,
      status: "not_collected" /** @params (collected, not_collected, ) */,
      //TODO: add the other params
      total: paymentIntent.amount,
    });

    return true;
  } catch (e) {
    console.log(`error while  creating the order`);
    throw new GraphQLError(e.message);
  }
};

module.exports = createOrder;
