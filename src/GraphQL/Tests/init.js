const { createTestClient } = require("apollo-server-testing");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = require("../typeDefs");
const resolvers = require("../resolvers");

//context vars
const { firebase, db, admin } = require("../../firebase/firebase");
const client = require("../../Redis/redis");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const connectToDb = async () => {
  await mongoose
    .connect(process.env.MONGODB_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => console.error(error));
};

// const dropTestDb = async () => {
//   if (process.env.NODE_ENV === "test") {
//     await mongoose.connection.db
//       .dropDatabase()
//       .catch((error) => console.error(error));
//   }
// };

const closeDbConnection = async () => {
  await mongoose.connection.close().catch((error) => console.error(error));
};

const firebaseCompanyJwt =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNTg1Zjk5MjExMmZmODgxMTEzOTlhMzY5NzU2MTc1YWExYjRjZjkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiY29tcGFueSIsImNvbXBhbnkiOnRydWUsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9maXItZGVtby03ODg0ZCIsImF1ZCI6ImZpci1kZW1vLTc4ODRkIiwiYXV0aF90aW1lIjoxNjM4MjIzNzA5LCJ1c2VyX2lkIjoiY2E4MzRJQUptQWN6eWN1azBHeEliOWcyZkg2MyIsInN1YiI6ImNhODM0SUFKbUFjenljdWswR3hJYjlnMmZINjMiLCJpYXQiOjE2MzgyOTA4NjAsImV4cCI6MTYzODI5NDQ2MCwiZW1haWwiOiJuaWNvbG8ubWVybGluaUBzdHVkZW50aS51bmlwci5pdCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJuaWNvbG8ubWVybGluaUBzdHVkZW50aS51bmlwci5pdCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.LQuTR5368NUNUvm-AzpS8UJdw9AobyuLIMUPHQ8PF8x7pDK6fABmcilxzQZumSdSQUm0nOqPuAnogSwco5HQwZoak8fg2wmh6zO4W6jwqpPOqqlFXCKJPtl6mChhEvivO_iZlueuUGkol3kPxZcdazN3PK6KWlvpKXryzs4wCedYbBOp3Y0AiAaKgtwqcsnx45wpgRO_7YspJgntlagEaTDo6qdOlgWMfLorWTQ-Os_iCMbPkrNu8y9WSLhJaEXfmV0Ynv-9gDpbu5RhB2JuzHyV0Waf6Fq_uZ-KVhdTwrEJZaj6VmCXiL4rQ5Ng_R0bTMaohGrVaMcMXSYCJHQBMg";
const context = ({ req }) => {
  return {
    //req,
    stripe,
    firebase,
    db,
    resolvers,
    admin,
    client,
    req: { headers: { authorization: firebaseCompanyJwt } },
  }; //* context variables for apollo
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: context,
});

module.exports = {
  testClient: createTestClient(server),
  connectToDb,
  closeDbConnection,
  //dropTestDb,
};
