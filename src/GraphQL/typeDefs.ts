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

  type Order {
    code: String!
    total: Float!
    firebaseUserID: String!
    firebaseCompanyID: String!
    shopID: ID!
    shopName: String!
    clientSecret: String
    paymentType: String!
    cashbackAccumulated: Float!
    cashbackCompany: Float!
    cashbackUsed: Float!
    pickUpHour: Int!
    timeStamp: Int!
    status: String!
    products: [ProductOrder!]!
  }

  type ProductOrder {
    _id: ID!
    productID: ID!
    name: String!
    price: Float!
    quantity: Int!
    weight: Float!
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
    type: String!
    paymentIntentID: ID!
    clientSecret: String
    accountID: ID!
    total: Float!
    cashBack: Float!
    cbUsed: Float!
    products: [PaymentIntentProduct!]!
  }

  type UserLocation { #//TODO: combine type Location adn UserLocation
    coordinates: [Float!]!
    type: String!
    street: String!
  }

  type User {
    id: ID!
    firebaseUserID: String!
    email: String!
    fullName: String!
    cashBack: Float!
    allTimeCashback: Float!
    location: UserLocation!
    FCMs: [String!]!
    likes: [ID!] #array of productIDs
    favourites: [ID!] #array of shopIDs
    createdAt: String!
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
    street: String
  }

  input cashbackInfoInput {
    cashBack: Int!
    fee: Int!
    minPayment: Int!
  }

  #//TODO: parametri cashBack
  input OrderInput {
    pickUpHour: String!
    timeStamp: String!
  }

  input PaymentIntentProductInput {
    id: ID!
    name: String!
    quantity: Int!
    price: Float!
    weight: Float!
  }

  input UserInput {
    email: String!
    fullName: String
    FCMs: [String!]!
  }

  input updateUserInput {
    fullName: String
    location: updateUserLocationInput
  }

  input updateUserLocationInput {
    coordinates: [Float!]!
    type: String!
    street: String!
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
    user(id: ID!): User

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

    #======cart======
    addToCart(productID: ID!, quantity: Int!, userID: ID!): Boolean!

    #======user======
    createUser(firebaseUserID: String!, input: UserInput!): Boolean!
    updateUser(firebaseUserID: ID!, input: updateUserInput!): Boolean!
    FCM(id: ID!, FCM: String!, action: String!): Boolean!

    #======stripe======
    stripePayment(productIDs: [ID!]!): String
    createOrder(paymentIntentID: ID!, options: OrderInput!): String! #all firebase vars
    createStripeAccount(email: String!): ID
    accountLink(accountID: ID!): String #//TODO: change the input variables in the client (accountId => accountID)
    paymentIntent(shopID: ID!, firebaseUserID: String!): PaymentIntent #//TODO: change the input variables in the client (accountId => accountID)
  }

  type Subscription {
    orderCreated: Order!
  }
`;

module.exports = typeDefs;
