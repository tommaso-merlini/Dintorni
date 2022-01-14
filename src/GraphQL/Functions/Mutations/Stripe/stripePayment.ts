import { GraphQLError } from "graphql";
import Product from "../../../../Schema/Product/Product.model";
import { MutationStripePaymentArgs } from "../../../Types/types";

const stripePayment = async (
  _: any,
  { productIDs }: MutationStripePaymentArgs,
  { stripe }
) => {
  try {
    if (productIDs.length === 0)
      throw new Error("order must have at least one product");
    var amount = 0;
    for (let i = 0; i < productIDs.length; i++) {
      var product = await Product.findById(productIDs[i], { price: 1 });
      amount += product.price;
    }
    if (amount === 0) throw new Error("amount must be >= 0");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "eur",
    });
    return paymentIntent.client_secret;
  } catch (e: any) {
    console.log("error while executing the stripe payment");
    throw new GraphQLError(e.message);
    return null;
  }
};

export default stripePayment;
