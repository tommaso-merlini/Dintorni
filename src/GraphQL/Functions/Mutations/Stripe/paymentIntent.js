const { GraphQLError } = require("graphql");
const Product = require("../../../../Schema/Product/Product.model.js");
const PaymentIntent = require("../../../../Schema/Stripe/PaymentIntent.model.js");

/**
 * @title Create The Payment Intent
 * @author Tommaso Merlini | Nicolo Merlini
 * @param  shopID the mongoDB id of the shop_
 * @param firebaseUserID the id from firebase of the user
 * @returns {clientSecret, accountID, total, cashBack, cbUsed, [products]}
 */

const paymentIntent = async (
  _,
  { shopID, firebaseUserID },
  { stripe, db, resolvers, client }
) => {
  try {
    console.log("-----------");
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
      if (cart.length === 0) {
        throw new Error("This cart is empty or non-existing");
      }
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
      try {
        await db
          .collection("CashbackUser")
          .doc(`${firebaseUserID}`)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            cb = data.cb;
          });
      } catch (e) {
        //if the cb is not inserted in firebase => create document in firebase
        if (e.message == "Cannot read property 'cb' of undefined") {
          await db.collection("CashbackUser").doc(firebaseUserID).set({
            cb: 0,
          });
        }
      }
      return cb;
    }

    //get the shop from mongodb
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
    const cbUserInitial = await getCbUser(firebaseUserID);
    console.log(`cbuserInitial =>`, cbUserInitial);

    //calculate the total to pay
    const totalToPay = total < cbUserInitial ? 0 : total - cbUserInitial;
    cbUser = total < cbUserInitial ? total : cbUserInitial;
    let cbCompany = cbUser;
    console.log(`cbUser: ${cbUser}`);
    console.log(`total to pay =>`, totalToPay);
    console.log(`cbCompany(before): ${cbCompany}`);

    //get the new cashbackuser based on the cashback of the shop
    const cashBack = total >= minPayment ? (total * cashBackShop) / 100 : 0;
    const newCashBackUser = cbUser + cashBack;
    console.log(`new cashback user =>`, newCashBackUser);
    console.log(`cashback: ${cashBack}`);

    //get the dintorni fee
    const dintorniFee = (total * feeShop) / 100;
    console.log(`dintorniFee: ${dintorniFee}`);

    //calculate the total fee
    let application_fee_amount = dintorniFee + cashBack;
    console.log(`application_fee_amount(before): ${application_fee_amount}`);

    //calculate the cbCompany using cbUser for reducign the application_fee_amount
    if (cbUser > 0) {
      cbCompany = cbUser - application_fee_amount;
      application_fee_amount = 0;
      if (cbCompany < 0) {
        application_fee_amount = Math.abs(cbCompany);
        cbCompany = 0;
      }
    }
    console.log(`application_fee_amount(after): ${application_fee_amount}`);
    console.log(`cbCompany(after): ${cbCompany}`);

    //creating the payment intent
    //? if the user pays (<100 cent)?
    let newPaymentIntent = null;
    if (totalToPay > 0) {
      newPaymentIntent = await stripe.paymentIntents.create(
        {
          payment_method_types: ["card"],
          amount: Number((totalToPay * 100).toFixed(0)),
          currency: "eur",
          application_fee_amount: Number(
            (application_fee_amount * 100).toFixed(0)
          ),
          metadata: {
            cbUser: Number(newCashBackUser).toFixed(2), //cashback user
            cbCompany: Number(cbCompany).toFixed(2),
            cashBack: Number(cashBack).toFixed(2), //accumulated cashback
            shopID: shopID,
            firebaseCompanyID: firebaseCompanyID,
            dintorniFee: Number(dintorniFee).toFixed(2),
          },
        },
        {
          stripeAccount: accountID,
        }
      );
    }

    //create the paymentIntent in mongodb
    // * one cart per shop => one paymentIntent per shop
    const mongoPaymentIntent = await PaymentIntent.findOneAndUpdate(
      {
        firebaseUserID: firebaseUserID,
        shopID: shopID,
        isActive: true,
      },
      {
        accountID: accountID,
        shopID: shopID,
        clientSecret:
          newPaymentIntent != null ? newPaymentIntent.client_secret : null,
        type: newPaymentIntent != null ? "stripe" : "free",
        firebaseCompanyID: firebaseCompanyID,
        fee: dintorniFee,
        total: totalToPay,
        cashbackCompany: cbCompany,
        cashbackAccumulated: cashBack,
        cashbackUsed: Number(total - totalToPay).toFixed(2),
        isActive: true,
        products: cart,
        firebaseCompanyID: firebaseCompanyID,
        shopName: shop.name,
      },
      { upsert: true, new: true } //create a new one if it does not exist
    );

    console.log("-----------");
    return {
      type: totalToPay > 0 ? "stripe" : "free",
      paymentIntentID: mongoPaymentIntent._id,
      clientSecret:
        newPaymentIntent != null ? newPaymentIntent.client_secret : null,
      accountID: accountID,
      total: Number(totalToPay.toFixed(2)),
      cashBack: Number(cashBack.toFixed(2)),
      cbUsed: Number(total - totalToPay).toFixed(2),
      products: cart,
    };
  } catch (e) {
    console.log(`error while initializing the payment intent`);
    throw new GraphQLError(e.message);
  }
};

module.exports = paymentIntent;
