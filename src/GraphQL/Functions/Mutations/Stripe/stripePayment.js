const { GraphQLError } = require("graphql");
const Product = require("../../../../Schema/Product/Product.model");

const stripePayment = async (_, { productIDs }, { stripe }) => {
  try {
    if (productIDs.length === 0)
      throw new Error("order must have at least one product");
    var amount = 0;
    for (i = 0; i < productIDs.length; i++) {
      var product = await Product.findById(productIDs[i], { price: 1 });
      amount += product.price;
    }
    if (amount === 0) throw new Error("amount must be >= 0");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "eur",
    });
    return paymentIntent.client_secret;
  } catch (e) {
    console.log("error while executing the stripe payment");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = stripePayment;
