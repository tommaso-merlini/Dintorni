import { GraphQLError } from "graphql";
import { Stripe } from "stripe";

interface accountParams {
  id: string;
}

interface accountContext {
  stripe: Stripe;
}

const account = async (
  _: any,
  { id }: accountParams,
  { stripe }: accountContext
) => {
  try {
    const account = await stripe.accounts.retrieve(id);

    return {
      id: account.id,
      details_submitted: account.details_submitted,
      payouts_enabled: account.payouts_enabled,
      charges_enabled: account.charges_enabled,
    };
  } catch (e: any) {
    console.log(`error while retrieving the stripe account`);
    throw new GraphQLError(e.message);
    return null;
  }
};

export default account;
