import { GraphQLError } from "graphql";
import { MutationAccountLinkArgs } from "../../../Types/types";

const accountLink = async (
  _: any,
  { accountID }: MutationAccountLinkArgs,
  { stripe }
) => {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountID,
      refresh_url: "https://www.comune.perugia.it/",
      return_url: "https://www.comune.terni.it/",
      type: "account_onboarding",
    });

    return accountLink.url;
  } catch (e: any) {
    console.log(`error while  creating the account link`);
    throw new GraphQLError(e.message);
  }
};

export default accountLink;
