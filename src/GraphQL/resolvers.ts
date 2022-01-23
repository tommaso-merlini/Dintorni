import createShop from "./Functions/Mutations/Company/createShop";
import createProduct from "./Functions/Mutations/Product/createProduct";
import deleteProduct from "./Functions/Mutations/Product/deleteProduct";
import closeShops from "./Functions/Queries/Company/closeShops";
import shop from "./Functions/Queries/Company/shop";
import shops from "./Functions/Queries/Company/shops";
import productsShop from "./Functions/Queries/Company/productsShop";
import product from "./Functions/Queries/Product/product";
import products from "./Functions/Queries/Product/products";
import shopProduct from "./Functions/Queries/Product/shopProduct";
import activateShop from "./Functions/Mutations/Company/activateShop";
import disactivateShop from "./Functions/Mutations/Company/disactivateShop";
import closeProductsTitle from "./Functions/Queries/Product/closeProductsTitle";
import updateShop from "./Functions/Mutations/Company/updateShop";
import updateProduct from "./Functions/Mutations/Product/updateProduct";
import shopByFirebaseID from "./Functions/Queries/Company/shopByFirebaseID";
import like from "./Functions/Mutations/Actions/like";
import favouriteShops from "./Functions/Queries/Company/favouriteShops";
import stripePayment from "./Functions/Mutations/Stripe/stripePayment";
import createOrder from "./Functions/Mutations/Stripe/createOrder";
import createStripeAccount from "./Functions/Mutations/Stripe/createStripeAccount";
import accountLink from "./Functions/Mutations/Stripe/accountLink";
import account from "./Functions/Queries/Stripe/account";
import paymentIntent from "./Functions/Mutations/Stripe/paymentIntent";
import shopsByFirebaseCompanyID from "./Functions/Queries/Company/shopsByFirebaseCompanyID";
import changeProductStatus from "./Functions/Mutations/Product/changeProductStatus";
import addToCart from "./Functions/Mutations/Cart/addToCart";

import pubsub from "../helpers/initPubSub";
require("dotenv").config();

const resolvers = {
  Query: {
    shop: shop,
    shops: shops,
    shopByFirebaseID: shopByFirebaseID,
    product: product,
    products: products,
    closeProductsTitle: closeProductsTitle,
    closeShops: closeShops,
    favouriteShops: favouriteShops,
    account: account,
    shopsByFirebaseCompanyID: shopsByFirebaseCompanyID,
  },

  Mutation: {
    createProduct: createProduct,
    deleProduct: deleteProduct,
    updateProduct: updateProduct,
    changeProductStatus: changeProductStatus,
    createShop: createShop,
    activateShop: activateShop,
    disactivateShop: disactivateShop,
    updateShop: updateShop,
    like: like,
    stripePayment: stripePayment,
    createOrder: createOrder,
    createStripeAccount: createStripeAccount,
    accountLink: accountLink,
    paymentIntent: paymentIntent,
    addToCart: addToCart,
  },

  Subscription: {
    orderCreated: {
      subscribe: () => {
        const order = pubsub.asyncIterator(["ORDER_CREATED"]);
        return order;
      },
    },
  },

  Shop: {
    products: productsShop,
  },

  Product: {
    shop: shopProduct,
  },
};

export default resolvers;
