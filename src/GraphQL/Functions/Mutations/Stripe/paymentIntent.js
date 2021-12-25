const { GraphQLError } = require("graphql");
const Product = require("../../../../Schema/Product/Product.model.js");



const paymentIntent = async (
    _,
    { accountID, shopID, firebaseUserID },
    { stripe, db, resolvers, client }
) => {
    try {
        var cart = [];
        var cbUser = 0;

        async function getCartFromFirebase(firebaseUserID, shopID) {
            const cart = [];
            const cartCollection = await db
                .collection(`Cart/${firebaseUserID}/${shopID}`)
                .get();
            cartCollection.forEach((doc) => {
                cart.push({ id: doc.id, ...doc.data() });
            });
            return cart;
        }

        async function setCartPricesFromMongodb(cart) {
            const temporaryCart = cart;
            await Promise.all(temporaryCart.map(async (item, index) => {
                const product = await Product.findById(item.id, { price: 1 });
                temporaryCart[index].price = product.price;
            }));
            console.log(temporaryCart)
            return temporaryCart;
        }

        async function getTotal(cart) {
            var total = 0;
            cart.map((item) => {
                total += item.price * item.quantity;
            });
            return total;
        }

        async function getCbUser(firebaseUserID) {
            var cb = 0;
            await db
                .collection("Cashback")
                .doc(`${firebaseUserID}`)
                .get()
                .then((snapshot) => {
                    const data = snapshot.data();
                    cb = data.cb;
                });
            return cb;
        }





        //get the company from mongodb
        const shop = await resolvers.Query.shop(null, { id: shopID }, { client });
        const feeShop = shop.cashbackInfo.fee;
        const cashBackShop = shop.cashbackInfo.cashBack;
        const minPayment = shop.cashbackInfo.minPayment;

        //get the cart from firebase
        cart = await getCartFromFirebase(firebaseUserID, shopID);

        //set the price for each product off mongodb
        cart = await setCartPricesFromMongodb(cart);
        console.log(`cart =>`, cart);

        //get the total off the cart
        const total = await getTotal(cart);
        console.log(`total: ${total}`);

        //get the cashback user
        var cbUser = await getCbUser(firebaseUserID);
        console.log(`cbuser =>`, cbUser);

        //calculate the total to pay
        const totalToPay = total < cbUser ? 0 : total - cbUser;
        var cbUser = total < cbUser ? cbUser - total : 0;
        console.log(`total to pay =>`, totalToPay);


        //get the new cashbackuser based on the cashback of the shop
        const cashBack = total >= minPayment ? total * cashBackShop / 100 : 0;
        const newCashBackUser = cbUser + cashBack;
        console.log(`new cashback user =>`, newCashBackUser);
        //db.collection("Cashback").doc(firebaseUserID).update({ cb: cbUser });

        //get the dintorni fee
        const dintorniFee = (total * feeShop) / 100;

        //calculate the total fee
        var application_fee_amount = dintorniFee + cashBack;

        //creating the payment intent
        const paymentIntent = await stripe.paymentIntents.create(
            {
                payment_method_types: ["card"],
                amount: totalToPay * 100,
                currency: "eur",
                application_fee_amount: application_fee_amount * 100,
            },
            {
                stripeAccount: accountID,
            }
        );

        return paymentIntent.client_secret;
    } catch (e) {
        console.log(`error while initializing the payment intent`);
        throw new GraphQLError(e.message);
    }
};

module.exports = paymentIntent;
