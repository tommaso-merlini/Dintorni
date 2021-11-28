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
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNTg1Zjk5MjExMmZmODgxMTEzOTlhMzY5NzU2MTc1YWExYjRjZjkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiY29tcGFueSIsImNvbXBhbnkiOnRydWUsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9maXItZGVtby03ODg0ZCIsImF1ZCI6ImZpci1kZW1vLTc4ODRkIiwiYXV0aF90aW1lIjoxNjM3ODc3MDM4LCJ1c2VyX2lkIjoiY2E4MzRJQUptQWN6eWN1azBHeEliOWcyZkg2MyIsInN1YiI6ImNhODM0SUFKbUFjenljdWswR3hJYjlnMmZINjMiLCJpYXQiOjE2MzgxMDg5NjQsImV4cCI6MTYzODExMjU2NCwiZW1haWwiOiJuaWNvbG8ubWVybGluaUBzdHVkZW50aS51bmlwci5pdCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJuaWNvbG8ubWVybGluaUBzdHVkZW50aS51bmlwci5pdCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Xcwmo8yn1OMt_kf6biQNIC9q1d-KXfBdiurXAEPaOM2QlK-BRqGjkGUZAsMJTgIFOlIAKLdbgkDKSGuKNlunEqeMgB6KOSzIL9czp37dXhUqPEjifuACqOygiSlG2LfKRGK6j-Dvo1jmWn6LF8XsYSTNDADt3bTF0ToclOZUdvitK22H8gZce0Wiz1Js3cfj08CyPLHV0frLNteoUBn9Nu3zhFapbjeNBm451dAIzKHH5RGtknQaDBOZcyI7FfZP-UAVNDsobnuLa5YHhYFg7B6SWEf3NiPna34bQyILe8kPyZOfQWhOMTsRRVeFh0ZTsqU-QNp9UoKzlHdRoB0kFg";

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
