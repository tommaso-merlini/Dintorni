const resolvers = require("../resolvers");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

test("creates a stripe account and return the id", async () => {
  const result = await resolvers.Mutation.createStripeAccount(
    null,
    {
      email: "test@gmail.com",
    },
    { stripe: stripe }
  );

  expect(result).not.toBe(null);
});
