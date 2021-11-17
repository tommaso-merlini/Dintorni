const account = async (_, { id }, { stripe }) => {
const { GraphQLError } = require("graphql");

    try {
        const account = await stripe.accounts.retrieve(id);

        return {
            id: account.id,
            details_submitted: account.details_submitted,
            payouts_enabled: account.payouts_enabled,
            charges_enabled: account.charges_enabled
        }
    } catch(e) {
        console.log(`error while retrieving the stripe account`);
        throw new GraphQLError(e.message);
        return null;
    }
}

module.exports = account;