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
    status: String!
  }

  type LightProduct {
    _id: ID!
    name: String!
    price: Float!
    weight: Float!
    shopID: ID!
    productID: ID!
    shop: Shop!
    status: String!
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
    products(limit: Int!, offset: Int!, auth: String!): [Product!]!
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
    image: String!
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

  type PaymentIntentProduct {
    id: ID!
    name: String!
    quantity: Int!
    price: Float!
    weight: Float!
  }

  type PaymentIntent {
    clientSecret: String!
    accountID: ID!
    total: Float!
    cashBack: Float!
    products: [PaymentIntentProduct!]!
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

  input PaymentIntentProductInput {
    id: ID!
    name: String!
    quantity: Int!
    price: Float!
    weight: Float!
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
    shopsByFirebaseCompanyID(firebaseCompanyID: String!): [Shop!]
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
    createProduct(input: productInput!, firebaseCompanyID: String!): Product
    deleProduct(id: ID!, firebaseCompanyID: String!): Boolean!
    updateProduct(id: ID!, input: updateProductInput!): Boolean!
    changeProductStatus(
      id: ID!
      status: String!
      firebaseCompanyID: String!
    ): Boolean!

    #======shop======
    createShop(input: shopInput!): ID
    activateShop(id: ID!): Boolean!
    disactivateShop(id: ID!): Boolean!
    updateShop(id: ID!, input: updateShopInput!): Boolean!

    #======like======
    like(id: ID!, to: String!, action: String!): Boolean!

    #======stripe======
    stripePayment(productIDs: [ID!]!): String
    createOrder(
      clientSecret: String!
      accountID: ID!
      products: [PaymentIntentProductInput!]
      firebaseUserID: String
      firebaseCompanyID: String
      shopID: ID
      fee: Float
      amount: Int
      timeStamp: String
      pickUpDate: String
      companyAccumulatedCashBack: Int
    ): Boolean! #all firebase vars
    createStripeAccount(email: String!): ID
    accountLink(accountID: ID!): String #//TODO: change the input variables in the client (accountId => accountID)
    paymentIntent(shopID: ID!, firebaseUserID: String!): PaymentIntent #//TODO: change the input variables in the client (accountId => accountID)
  }
`;

module.exports = typeDefs;
