const { GraphQLError } = require("graphql");

const createStripeAccount = async (_, { email }, { stripe }) => {
  try {
    const account = await stripe.accounts.create({
      type: "standard",
      country: "IT",
      email: email,
    });

    return account.id;
  } catch (e) {
    console.log(`error while creating the stripe account`);
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = createStripeAccount;
