import { GraphQLError } from "graphql";
import Stripe from "stripe";

interface createStripeAccountParams {
  email: string;
}

const createStripeAccount = async (
  _: any,
  { email }: createStripeAccountParams,
  { stripe }: { stripe: Stripe }
) => {
  try {
    const account = await stripe.accounts.create({
      type: "standard",
      country: "IT",
      email: email,
    });

    return account.id;
  } catch (e: any) {
    console.log(`error while creating the stripe account`);
    throw new GraphQLError(e.message);
    return null;
  }
};

export default createStripeAccount;
