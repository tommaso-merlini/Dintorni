const { GraphQLError } = require("graphql");
const createOrder = async (
    _,
    { clientSecret },
    { stripe }
) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve('pi_3KBILb2cRuCU3fXB0nYl5Mcq');
        console.log(paymentIntent);

        //creating order code
        const alphabet = "abcdefghilmnopqrstuvxz";
        const alphabeticCode =
            alphabet[Math.floor(Math.random() * alphabet.length)] +
            alphabet[Math.floor(Math.random() * alphabet.length)];
        const numericCode = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        const code = alphabeticCode + numericCode;

        return true;
    } catch (e) {
        console.log(`error while  creating the order`);
        throw new GraphQLError(e.message);
    }
};

module.exports = createOrder;
