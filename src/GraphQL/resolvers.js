const createShop = require("./Functions/Mutations/Company/createShop");
const createProduct = require("./Functions/Mutations/Product/createProduct");
const deleteProduct = require("./Functions/Mutations/Product/deleteProduct");
const closeShops = require("./Functions/Queries/Company/closeShops");
const shop = require("./Functions/Queries/Company/shop");
const shops = require("./Functions/Queries/Company/shops");
const productsShop = require("./Functions/Queries/Company/productsShop");
const product = require("./Functions/Queries/Product/product");
const products = require("./Functions/Queries/Product/products");
const login = require("./Functions/Queries/login/login");
const shopProduct = require("./Functions/Queries/Product/shopProduct");
const activateShop = require("./Functions/Mutations/Company/activateShop");
const disactivateShop = require("./Functions/Mutations/Company/disactivateShop");
const closeProductsTitle = require("./Functions/Queries/Product/closeProductsTitle");
const updateShop = require("./Functions/Mutations/Company/updateShop");
const updateProduct = require("./Functions/Mutations/Product/updateProduct");
const shopByFirebaseID = require("./Functions/Queries/Company/shopByFirebaseID");
const addLike = require("./Functions/Mutations/Like/addLike");
const removeLike = require("./Functions/Mutations/Like/removeLike");
const addFavourite = require("./Functions/Mutations/Company/addFavourite");
const removeFavourite = require("./Functions/Mutations/Company/removeFavourite");
const favouriteShops = require("./Functions/Queries/Company/favouriteShops");
const stripePayment = require("./Functions/Mutations/Stripe/stripePayment");
const createOrder = require("./Functions/Mutations/Stripe/createOrder");
const createStripeAccount = require("./Functions/Mutations/Stripe/createStripeAccount");
const accountLink = require("./Functions/Mutations/Stripe/accountLink");
const account = require("./Functions/Queries/Stripe/account");
const paymentIntent = require("./Functions/Mutations/Stripe/paymentIntent");
const shopsByFirebaseCompanyID = require("./Functions/Queries/Company/shopsByFirebaseCompanyID");
const changeProductStatus = require("./Functions/Mutations/Product/changeProductStatus.js");

require("dotenv").config();

const resolvers = {
    Query: {
        shop: shop,
        shops: shops,
        shopByFirebaseID: shopByFirebaseID,
        // companyProducts: companyProducts,
        product: product,
        products: products,
        closeProductsTitle: closeProductsTitle,
        closeShops: closeShops,
        favouriteShops: favouriteShops,
        login: login,
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
        addLike: addLike,
        removeLike: removeLike,
        addFavourite: addFavourite,
        removeFavourite: removeFavourite,
        stripePayment: stripePayment,
        createOrder: createOrder,
        createStripeAccount: createStripeAccount,
        accountLink: accountLink,
        paymentIntent: paymentIntent,
    },

    Shop: {
        products: productsShop,
    },

    Product: {
        shop: shopProduct,
    },
};

module.exports = resolvers;
