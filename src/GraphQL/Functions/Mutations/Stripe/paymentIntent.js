const { GraphQLError, NoUndefinedVariablesRule } = require("graphql");
const Product = require("../../../../Schema/Product/Product.model.js");

/**
 * @title Create The Payment Intent
 * @author Tommaso Merlini
 * @param  shopID the mongoDB id of the shop_
 * @param firebaseUserID the id from firebase of the user
 * @returns {clientSecret, [products]}
 */

const paymentIntent = async (
  _,
  { shopID, firebaseUserID },
  { stripe, db, resolvers, client }
) => {
  try {
    var cart = [];
    var cbUser = 0;
    async function getStripeAccountID(firebaseCompanyID) {
      var accountID = 0;
      await db
        .collection("Impresa")
        .doc(`${firebaseCompanyID}`)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          accountID = data.stripeId;
        });
      return accountID;
    }

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

    const neededFields = {
      price: 1,
      weight: 1,
      name: 1,
    };
    async function getCartFromMongodb(cart) {
      const temporaryCart = cart;
      await Promise.all(
        temporaryCart.map(async (item, index) => {
          const product = await Product.findById(item.id, neededFields);
          temporaryCart[index].price = product.price;
          temporaryCart[index].weight = product.weight;
          temporaryCart[index].name = product.name;
        })
      );
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
        .collection("CashbackUser")
        .doc(`${firebaseUserID}`)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          cb = data.cb;
        });
      if (cb === undefined || cb === null) cb = 0; //if the user don't have cashback
      return cb;
    }

    //get the company from mongodb
    const shop = await resolvers.Query.shop(null, { id: shopID }, { client });
    const feeShop = shop.cashbackInfo.fee;
    const cashBackShop = shop.cashbackInfo.cashBack;
    const minPayment = shop.cashbackInfo.minPayment;
    const firebaseCompanyID = shop.firebaseCompanyID;

    //get the stripe accountID
    const accountID = await getStripeAccountID(firebaseCompanyID);
    console.log(`accountID: ${accountID}`);

    //get the cart from firebase
    cart = await getCartFromFirebase(firebaseUserID, shopID);

    //set the price for each product off mongodb
    cart = await getCartFromMongodb(cart);
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
    const cashBack = total >= minPayment ? (total * cashBackShop) / 100 : 0;
    const newCashBackUser = cbUser + cashBack;
    console.log(`new cashback user =>`, newCashBackUser);
    console.log(`cashback: ${cashBack}`);

    //get the dintorni fee
    const dintorniFee = (total * feeShop) / 100;
    console.log(`dintorniFee: ${dintorniFee}`);

    //calculate the total fee
    const application_fee_amount = dintorniFee + cashBack;
    console.log(`application_fee_amount: ${application_fee_amount}`);

    //const prova = Number((totalToPay * 100).toFixed(0));
    //const prova1 = Number((application_fee_amount * 100).toFixed(0));

    //console.log(prova);
    //console.log(prova1);

    //creating the payment intent
    const paymentIntent = await stripe.paymentIntents.create(
      {
        payment_method_types: ["card"],
        amount: Number((totalToPay * 100).toFixed(0)),
        currency: "eur",
        application_fee_amount: Number(
          (application_fee_amount * 100).toFixed(0)
        ),
        metadata: {
          newCashBackUser: newCashBackUser, //initial cashback user
          cashBack: cashBack, //accumulated cashback
          shopID: shopID,
          firebaseCompanyID: firebaseCompanyID,
        },
      },
      {
        stripeAccount: accountID,
      }
    );

    return {
      clientSecret: paymentIntent.client_secret,
      products: cart,
    };
  } catch (e) {
    console.log(`error while initializing the payment intent`);
    throw new GraphQLError(e.message);
  }
};

module.exports = paymentIntent;
