const { GraphQLError } = require("graphql");

const paymentIntent = async (
  _,
  { accountId, firebaseUserId, companyId },
  { stripe, db }
) => {
  try {
    //getting the right payment details from firebse
    const cart = [];

    const cartCollection = await db
      .collection(`Cart/${firebaseUserId}/${companyId}`)
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

    //creating the payment intent
    const paymentIntent = await stripe.paymentIntents.create(
      {
        payment_method_types: ["card"],
        amount: 1000,
        currency: "eur",
        application_fee_amount: 10,
      },
      {
        stripeAccount: accountId,
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
