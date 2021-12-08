const { GraphQLError } = require("graphql");

const paymentIntent = async (
  _,
  { accountID, firebaseUserID, shopID },
  { stripe, db, resolvers, client }
) => {
  try {
    //getting the right payment details from firebse
    const cart = [];

    //get the company
    const shop = await resolvers.Query.shop(null, { id: shopID }, { client });
    const fee = shop.cashbackInfo.fee;
    const cashBack = shop.cashbackInfo.cashBack;
    const minPayment = shop.cashbackInfo.minPayment;

    const cartCollection = await db
      .collection(`Cart/${firebaseUserID}/${shopID}`)
      .get();
    cartCollection.forEach((doc) => {
      cart.push(doc.data());
    });

    console.log(`cart =>`, cart);

    //get the payment infos (amount, cashback)
    var total = 0;
    cart.map((item) => {
      total += item.price * item.quantity;
    });

    console.log(`total: ${total}`);

    //GET THE CASHBACK FROM FIREBASE
    var cbUser = 0;

    await db
      .collection("Cashback")
      .doc(`${firebaseUserID}`)
      .get()
      .then((snapshot) => {
        cbUser = snapshot.data();
        cbUser = cbUser.cb;
      });

    console.log(`cbuser =>`, cbUser);

    var totalToPay = total - cbUser;
    console.log(total);
    console.log(totalToPay);
    if (totalToPay < 0) {
      cbUser = Math.abs(totalToPay);

      totalToPay = 0;
    } else {
      cbUser = 0;
    }

    console.log(cbUser);

    if (total >= minPayment) {
      cbUser += (total * fee) / 100;
      //TODO: UPDATE THE CBUSER
      db.collection("Cashback").doc(firebaseUserID).update({ cb: cbUser });
    }

    //creating the payment intent
    const paymentIntent = await stripe.paymentIntents.create(
      {
        payment_method_types: ["card"],
        amount: 1000,
        currency: "eur",
        application_fee_amount: 10,
      },
      {
        stripeAccount: accountID,
      }
    );

    return paymentIntent.client_secret;
  } catch (e) {
    console.log(`error while initializing the payment intent`);
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = paymentIntent;
