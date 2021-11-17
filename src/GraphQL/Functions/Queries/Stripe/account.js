const account = async (_, { id }, { stripe }) => {
    const account = await stripe.accounts.retrieve(id);

    return {
        id: account.id,
        details_submitted: account.details_submitted,
        payouts_enabled: account.payouts_enabled,
        charges_enabled: account.charges_enabled
    }
}

module.exports = account;