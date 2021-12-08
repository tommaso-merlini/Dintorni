const { GraphQLError } = require("graphql");

const paymentIntent = async (
    _,
    { accountID, firebaseUserID, shopID },
    { stripe, db, resolvers, client }
) => {
    try {
        //getting the right payment details from firebse
        const cart = [];

        //get the company
        const shop = await resolvers.Query.shop(null, { id: shopID }, { client });
        const fee = shop.cashbackInfo.fee;
        const cashBack = shop.cashbackInfo.cashBack;
        const minPayment = shop.cashbackInfo.minPayment;

        const cartCollection = await db
            .collection(`Cart/${firebaseUserID}/${shopID}`)
            .get();
        cartCollection.forEach((doc) => {
            cart.push(doc.data());
        });

        console.log(`cart =>`, cart);


        //get the total of the cart
        var total = 0;
        cart.map((item) => {
            total += item.price * item.quantity;
        });

        console.log(`total: ${total}`);


        //get the cashback user
        var cbUser = 0;

        await db
            .collection("Cashback")
            .doc(`${firebaseUserID}`)
            .get()
            .then((snapshot) => {
                cbUser = snapshot.data();
                cbUser = cbUser.cb;
            });

        console.log(`cbuser =>`, cbUser);

        //calculate the total to pay
        const totalToPay = total < cbUser ? 0 : total - cbUser;
        var cbUser = total < cbUser ? cbUser - total : 0;
        console.log(`total to pay =>`, totalToPay);


        //get the new cashbackuser based on the cashback of the shop
        total >= minPayment ? cbUser += (total * cashBack) / 100 : cbUser = cbUser;
        console.log(`new cashback user =>`, cbUser);
        db.collection("Cashback").doc(firebaseUserID).update({ cb: cbUser });


        //get the dintorni fee


        //creating the payment intent
        const paymentIntent = await stripe.paymentIntents.create(
            {
                payment_method_types: ["card"],
                amount: 1000,
                currency: "eur",
                application_fee_amount: 10,
            },
            {
                stripeAccount: accountID,
            }
        );

        return paymentIntent.client_secret;
    } catch (e) {
        console.log(`error while initializing the payment intent`);
        throw new GraphQLError(e.message);
        return null;
    }
};

module.exports = paymentIntent;
