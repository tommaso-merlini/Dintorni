const { GraphQLError } = require("graphql");

const paymentIntent = async (_, {}, { stripe }) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        payment_method_types: ["card"],
        amount: 1000,
        currency: "eur",
        application_fee_amount: 10,
      },
      {
        stripeAccount: "acct_1JaOy12e2xMzVpTZ",
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
