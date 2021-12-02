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
    shopID: ID!
    shopName: String!
    shop: Shop!
    likes: Int!
    isActive: Boolean!
  }

  type LightProduct {
    _id: ID!
    name: String!
    price: Float!
    weight: Float!
    shopID: ID!
    productID: ID!
    shop: Shop!
    isActive: Boolean!
    shopName: String!
  }

  type Shop {
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
    firebaseCompanyID: String!
    cashbackInfo: CashbackInfo!
    likes: Int!
    favourites: Int!
    products(limit: Int!, offset: Int!): [Product!]!
  }

  type LightShop {
    _id: ID!
    name: String!
    categories: [String!]!
    openDays: String!
    openHours: String!
    isActive: Boolean!
    location: Location!
    cashbackInfo: CashbackInfo!
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

  type StripeUser {
    id: ID!
    details_submitted: Boolean!
    payouts_enabled: Boolean!
    charges_enabled: Boolean!
  }

  type PaymentIntent {
    clientSecret: String!
    total: Float!
    totalToPay: Float!
    accumulatedCashback: Float!
    usedCb: Float!
    JWTCb: String!
    accumulatedCb: Float!
    orderCode: String!
  }

  ########### inputs ###########

  input productInput {
    name: String!
    price: Float!
    weight: Float!
    images: [String!]!
    description: String
    shopID: ID!
    shopName: String!
  }

  input shopInput {
    name: String!
    address: String!
    categories: [String!]!
    openDays: String!
    image: String!
    openHours: String!
    orderHours: String!
    pickUpHours: String!
    isActive: Boolean!
    phone: String!
    location: locationInput!
    cashbackInfo: cashbackInfoInput!
    firebaseCompanyID: ID!
  }

  input updateProductInput {
    name: String
    price: Float
    weight: Float
    images: [String!]
    description: String
    shopID: ID
  }

  input updateShopInput {
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

  #//TODO: change the input variables in the client (shopId => shopID)
  input orderInput {
    shopID: ID!
    userID: ID!
    products: [ID!]!
  }

  ########### mutations and queries ###########
  type Query {
    #======products queries======
    product(id: ID!): Product
    products(ids: [ID!]!): [Product!]
    closeProductsTitle(
      name: String!
      location: locationInput!
      range: Int!
      limit: Int!
      offset: Int!
    ): [Product]

    #======shop queries======
    shop(id: ID!): Shop
    shops(ids: [ID!]!): [Shop!]
    shopByFirebaseID(firebaseID: String!): Shop
    closeShops(
      location: locationInput!
      category: String
      cashBack: Int
      range: Int!
      limit: Int!
      offset: Int!
    ): [LightShop!]
    favouriteShops(ids: [ID!]!): [LightShop!] #//TODO: change the function name in the client (favouritesShops => favouriteShops)
    #======user queries======
    login(firebaseToken: String!, id: ID!): String #jwt
    #======stripe queries======
    account(id: ID!): StripeUser
  }

  type Mutation {
    #======products======
    createProduct(input: productInput!): ID
    deleProduct(id: ID!, shopID: ID!): Boolean!
    updateProduct(id: ID!, input: updateProductInput!): Boolean!
    addFavourite(id: ID!): Boolean!
    removeFavourite(id: ID!): Boolean!

    #======shop======
    createShop(input: shopInput!): ID
    activateShop(id: ID!): Boolean!
    disactivateShop(id: ID!): Boolean!
    updateShop(id: ID!, input: updateShopInput!): Boolean!

    #======like======
    addLike(id: ID!, type: String!): Boolean!
    removeLike(id: ID!, type: String!): Boolean!

    #======stripe======
    stripePayment(productIDs: [ID!]!): String
    createOrder( #//TODO: change the input variables in the client (userId => userID)
      userID: ID!
      shopID: ID!
      dateLimit: Int!
      pickUpHour: String!
    ): Boolean! #all firebase vars
    createStripeAccount(email: String!): ID
    accountLink(accountID: ID!): String #//TODO: change the input variables in the client (accountId => accountID)
    paymentIntent( #//TODO: change the input variables in the client (accountId => accountID)
      accountID: ID!
      firebaseUserID: ID!
      shopID: ID!
    ): PaymentIntent
  }
`;

module.exports = typeDefs;
