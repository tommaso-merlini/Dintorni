import { GraphQLError } from "graphql";
import PaymentIntent from "../../../../Schema/Stripe/PaymentIntent.model";
import { MutationCreateOrderArgs } from "../../../Types/types";
require("dotenv").config();

/**
 * @title Create The Order
 * @author Tommaso Merlini | Nicolo Merlini
 *
 * @param {String} paymentIntentID the id of the paymentIntent
 * @param pickUpHour
 * @param timeStamp
 * @returns code
 */

const createOrder = async (
  _: any,
  { paymentIntentID, options }: MutationCreateOrderArgs,
  { stripe, db, req, admin, FieldValue, pubsub }
) => {
  try {
    //retrieve the payment intent from mongodb
    const paymentIntent = await PaymentIntent.findById(paymentIntentID);

    //check if the payment intent exists
    if (paymentIntent === null) {
      throw new Error(
        `the payment Intent with id ${paymentIntentID} does not exist`
      );
    }

    //authorize the user
    if (process.env.NODE_ENV != "development") {
      const token = await admin.auth().verifyIdToken(req.headers.authorization);
      if (token.uid != paymentIntent.firebaseUserID) {
        throw new Error("User not authorized");
      }
    }

    //check the paymentIntent status on stripe
    if (paymentIntent.type === "stripe") {
      const PAYMENTINTENT_ID_LENGHT = 27;
      //retrieve the payment intent
      const stripePaymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntent.clientSecret.substring(0, PAYMENTINTENT_ID_LENGHT),
        {
          stripeAccount: paymentIntent.accountID,
        }
      );
      if (stripePaymentIntent && stripePaymentIntent.status != "succeeded") {
        throw new Error(
          `Payment Intent with id: ${paymentIntent.clientSecret.substring(
            0,
            PAYMENTINTENT_ID_LENGHT
          )} hasn't been paid yet`
        );
      }
    }

    //check if the payment intent is active
    if (
      paymentIntent.isActive === false //! check the paymentIntent status only outside of development
    ) {
      throw new Error(
        "the payment intent has already been redeemed. (isActive: false)"
      );
    }

    //creating order code
    const alphabet = "abcdefghilmnopqrstuvxz";
    const alphabeticCode =
      alphabet[Math.floor(Math.random() * alphabet.length)] +
      alphabet[Math.floor(Math.random() * alphabet.length)];
    const numericCode = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const code = alphabeticCode.toUpperCase() + numericCode;

    console.log(paymentIntent.products);

    const order = {
      code: code,
      shopID: paymentIntent.shopID.toString(),
      status: "not_redeemed" /** @params (redeemed, not_redeemed, ) */,
      total: paymentIntent.total,
      pickUpHour: parseInt(options.pickUpHour),
      timeStamp: parseInt(options.timeStamp),
      cashbackAccumulated: paymentIntent.cashbackAccumulated,
      cashbackUsed: paymentIntent.cashbackUsed,
      products: JSON.parse(JSON.stringify(paymentIntent.products)),
      firebaseUserID: paymentIntent.firebaseUserID,
      firebaseCompanyID: paymentIntent.firebaseCompanyID,
      cashbackCompany: paymentIntent.cashbackCompany,
      paymentType: paymentIntent.type,
      clientSecret: paymentIntent.clientSecret,
      shopName: paymentIntent.shopName,
    };

    //create the order on firebase
    await db.collection("Orders").doc(code).set(order);

    //get the cashbackUser
    let cashbackUser = 0;
    try {
      await db
        .collection("CashBackUser")
        .doc(paymentIntent.firebaseUserID)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          cashbackUser = data.cb;
        });
    } catch (e) {}

    //increment the user cashback (cashbackUsed + cashbackAccumulated)
    const incrementCashback = Number(
      (
        cashbackUser +
        paymentIntent.cashbackAccumulated -
        paymentIntent.cashbackUsed
      ).toFixed(2)
    );
    console.log(incrementCashback);
    await db
      .collection("CashbackUser")
      .doc(paymentIntent.firebaseUserID)
      .update(
        {
          cb: FieldValue.increment(incrementCashback),
        },
        { merge: true } //create document if it does not exist
      );

    //TODO: increment the company cashback

    //disactivate the paymentIntent
    await PaymentIntent.updateOne(
      { _id: paymentIntentID },
      { isActive: false }
    );

    //send message
    //TODO: query user on mongodb and get the user FCMs
    let message = {
      notification: {
        title: "ordine creato",
        body: `un ordine con codice ${code} e' stato appena effettuauto`,
      },
      token:
        "euRQ0hhoQaW-9tqecv3lTT:APA91bH4VnuRmaqrGs_aB0mbenLlh8yFRdP6EIS4ez3HgW58Oq3zTh7LciRtXahxryJufSKpDkouR_ZiBEH9mBq3wvblC6xuvmaI-K1nVB3oHN72UgxbjYfAaWM7IZyQJfLRWXrApB4X",
    };
    admin.messaging().send(message);

    //send order to graphql subscription
    pubsub.publish("ORDER_CREATED", { orderCreated: order });

    return code;
  } catch (e: any) {
    console.log(`error while  creating the order`);
    throw new GraphQLError(e.message);
  }
};

export default createOrder;
