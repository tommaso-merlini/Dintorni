const { GraphQLError } = require("graphql");

/**
 * @title Create The Order
 * @author Tommaso Merlini
 * @param clientSecret the id of the paymentIntent
 * @param accountID the id of the stripe company account
 * @returns true
 */

const createOrder = async (
  _,
  { clientSecret, accountID, firebaseUserID },
  { stripe, db }
) => {
  try {
    //retrieve the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(clientSecret, {
      stripeAccount: accountID,
    });
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
    db.collection("Orders").doc(code).set({
      shopID: metadata.shopID,
      status: "not_collected" /** @params (collected, not_collected, ) */,
      //TODO: add the other params
    });

    return true;
  } catch (e) {
    console.log(`error while  creating the order`);
    throw new GraphQLError(e.message);
  }
};

module.exports = createOrder;
