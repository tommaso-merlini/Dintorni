const { gql } = require("apollo-server-express");

const typeDefs = gql`
  ########### mongodb collections ###########
  type Product {
    _id: ID!
    name: String!
    price: Float!
    weight: Float!
    images: [String!]!
    location: Location!
    description: String!
    companyID: ID!
    companyName: String!
    company: Company!
    likes: Int!
    isActive: Boolean!
  }

  type LightProduct {
    _id: ID!
    name: String!
    price: Float!
    weight: Float!
    companyID: ID!
    productID: ID!
    company: Company!
    isActive: Boolean!
    companyName: String!
  }

  type Company {
    _id: ID!
    name: String!
    address: String!
    categories: [String!]!
    email: String!
    openDays: String!
    image: String!
    openHours: String!
    orderHours: String!
    pickUpHours: String!
    isActive: Boolean!
    phone: String!
    location: Location!
    firebaseID: String!
    cashbackInfo: CashbackInfo!
    likes: Int!
    favourites: Int!
    products(limit: Int!, offset: Int!): [Product!]!
  }

  type LightCompany {
    _id: ID!
    name: String!
    categories: [String!]!
    openDays: String!
    openHours: String!
    isActive: Boolean!
    location: Location!
    cashbackInfo: CashbackInfo!
    companyID: ID!
    likes: Int!
  }

  type Location {
    type: String!
    coordinates: [Float]!
  }

  type CashbackInfo {
    cashBack: Int!
    fee: Int!
    minPayment: Int!
  }


  ########### inputs ###########

  input productInput {
    name: String!
    price: Float!
    weight: Float!
    images: [String!]!
    description: String
    companyID: ID!
  }

  input companyInput {
    name: String!
    address: String!
    categories: [String!]!
    email: String!
    openDays: String!
    image: String!
    openHours: String!
    orderHours: String!
    pickUpHours: String!
    isActive: Boolean!
    phone: String!
    location: locationInput!
    cashbackInfo: cashbackInfoInput!
    firebaseID: String!
  }

  input updateProductInput {
    name: String
    price: Float
    weight: Float
    images: [String!]
    description: String
    companyID: ID
  }

  input updateCompanyInput {
    name: String
    address: String
    categories: [String!]
    openDays: String
    image: String
    openHours: String
    orderHours: String
    pickUpHours: String
    isActive: Boolean
    phone: String
    location: locationInput
    cashbackInfo: cashbackInfoInput
    likes: Int
  }


  input locationInput {
    type: String!
    coordinates: [Float]!
  }

  input cashbackInfoInput {
    cashBack: Int!
    fee: Int!
    minPayment: Int!
  }

  input orderInput {
    companyId: ID!
    userId: ID!
    products: [ID!]!
  }
  

  ########### mutations and queries ###########
  type Query {
    #======products queries======
    product(id: ID!): Product
    closeProductsTitle(
      name: String!
      location: locationInput!
      range: Int!
    ): [Product]

    #======company queries======
    company(id: ID!): Company
    companyByFirebaseID(firebaseID: String!): Company
    closeCompanies(
      location: locationInput!
      category: String
      range: Int!
    ): [LightCompany!]!

    #======user queries======
    login(firebaseToken: String!, id: ID!): String #jwt
  }

  type Mutation {
    #======products======
    createProduct(input: productInput!): ID
    deleProduct(id: ID!, companyID: ID!): Boolean!
    updateProduct(id: ID!, input: updateProductInput!): Boolean!
    addFavourite(id: ID!): Boolean!
    removeFavourite(id: ID!): Boolean!

    #======company======
    createCompany(input: companyInput!): String #returns the jwt
    activateCompany(id: ID!): Boolean!
    disactivateCompany(id: ID!): Boolean!
    updateCompany(id: ID!, input: updateCompanyInput!): Boolean!

    #======like======
    addLike(id: ID!, type: String!): Boolean!
    removeLike(id: ID!, type: String!): Boolean!
  }
`;

module.exports = typeDefs;
