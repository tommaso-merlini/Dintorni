const Company = require("../Schema/Company/Company.model");
const Product = require("../Schema/Product/Product.model");
const User = require("../Schema/User.model");
const Order = require("../Schema/Order.model");

const createCompany = require("./Functions/Mutations/Company/createCompany");
const createProduct = require("./Functions/Mutations/Product/createProduct");
const deleteProduct = require("./Functions/Mutations/Product/deleteProduct");
const closeCompanies = require("./Functions/Queries/Company/closeCompanies");
const company = require("./Functions/Queries/Company/company");
const productsCompany = require("./Functions/Queries/Company/productsCompany");
const product = require("./Functions/Queries/Product/product");
const login = require("./Functions/Queries/login/login");
const companyProduct = require("./Functions/Queries/Product/companyProduct");
const activateCompany = require("./Functions/Mutations/Company/activateCompany");
const disactivateCompany = require("./Functions/Mutations/Company/disactivateCompany");
const closeProductsTitle = require("./Functions/Queries/Product/closeProductsTitle");
const updateCompany = require("./Functions/Mutations/Company/updateCompany");
const updateProduct = require("./Functions/Mutations/Product/updateProduct");
const companyByFirebaseID = require("./Functions/Queries/Company/companyByFirebaseID");
const addLike = require("./Functions/Mutations/Like/addLike");
const removeLike = require("./Functions/Mutations/Like/removeLike")
const addFavourite = require("./Functions/Mutations/Company/addFavourite");
const removeFavourite = require("./Functions/Mutations/Company/removeFavourite");


require("dotenv").config();

const resolvers = {
  Query: {
    company: company,
    companyByFirebaseID: companyByFirebaseID,
    // companyProducts: companyProducts,
    product: product,
    closeProductsTitle: closeProductsTitle,
    closeCompanies: closeCompanies,
    login: login
  },

  Mutation: {
    createProduct: createProduct,
    deleProduct: deleteProduct,
    updateProduct: updateProduct,
    createCompany: createCompany,
    activateCompany: activateCompany,
    disactivateCompany: disactivateCompany,
    updateCompany: updateCompany,
    addLike: addLike,
    removeLike: removeLike,
    addFavourite: addFavourite,
    removeFavourite: removeFavourite
  },

  Company: {
    products: productsCompany,
  },

  Product: {
    company: companyProduct,
  },
};

module.exports = resolvers;
