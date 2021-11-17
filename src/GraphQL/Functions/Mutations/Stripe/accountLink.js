const accountLink = async (_, { accountId }, { stripe }) => {
    const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: 'https://www.comune.perugia.it/',
        return_url: 'https://www.comune.terni.it/',
        type: 'account_onboarding',
    });


    return accountLink.url;
}

module.exports = accountLink;