const { GraphQLError } = require("graphql");





const accountLink = async (_, { accountID }, { stripe }) => {
    try {
        const accountLink = await stripe.accountLinks.create({
            account: accountID,
            refresh_url: "https://www.comune.perugia.it/",
            return_url: "https://www.comune.terni.it/",
            type: "account_onboarding",
        });

        return accountLink.url;
    } catch (e) {
        console.log(`error while  creating the account link`);
        throw new GraphQLError(e.message);

    }
};

module.exports = accountLink;
