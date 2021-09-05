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
const createUser = require("./Functions/Mutations/User/createUser");
const updateProduct = require("./Functions/Mutations/Product/updateProduct");
const companyByFirebaseID = require("./Functions/Queries/Company/companyByFirebaseID");

require("dotenv").config();

const resolvers = {
  Query: {
    company: company,
    companyByFirebaseID: companyByFirebaseID,
    // companyProducts: companyProducts,
    product: product,
    closeProductsTitle: closeProductsTitle,
    closeCompanies: closeCompanies,
    companiesDistance: async (_, { companyCoords1, companyCoords2 }) => {
      const x1 = companyCoords1[0];
      const x2 = companyCoords2[0];
      const y1 = companyCoords1[1];
      const y2 = companyCoords2[1];

      return Math.sqrt(Math.pow(x2 - x1) + Math.pow(y1 - y2));
    },
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
    createUser: createUser,
    createOrder: async (_, { input }) => {
      try {
        const order = await new Order(input);
        await order.save();
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },

  Company: {
    products: productsCompany,
  },

  Product: {
    company: companyProduct,
  },
};

module.exports = resolvers;
