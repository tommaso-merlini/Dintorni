//IMPORTS

//=====node=====
const cron = require("node-cron");
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");

//=====apollo=====
const { ApolloServer } = require("apollo-server-express");
const depthLimit = require("graphql-depth-limit");

//=====mongoose=====
require("../helpers/initMongoDB");

//=========firebase=========
const checkAuth = require("../firebase/checkAuth");
const { firebase, db, admin, FieldValue } = require("../firebase/firebase");

//=========stripe=========
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

//=========jsonwebtoken=========
const expressJwt = require("express-jwt");
app.use(express.json());

//=====misc=====
const chalk = require("chalk"); //console.log colors
const cluster = require("cluster");
const os = require("os");
require("dotenv").config();
const cors = require("cors");
app.use(cors());

//require apollo typedefs and resolvers
const resolvers = require("../GraphQL/resolvers");
const typeDefs = require("../GraphQL/typeDefs");

//COSTANTS
const PORT = process.env.SERVER_PORT;
const numCpus = os.cpus().length;

//limit the graphql query size
app.use("*", (req, res, next) => {
  const query = req.query.query || req.body.query || "";
  if (query.length > 2000) {
    throw new Error("Query too large");
  }
  next();
});

//limit the amount of requests
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // every 15 minutes
  max: process.env.NODE_ENV != "production" ? 10000 : 1, // limit each IP to 50 requests per windowMs
  message: "Too many requests to the server, try again later",
});

//  apply to all requests
app.use(limiter);

//redis functions
const client = require("../Redis/redis");

//!======server instance======

async function startServer() {
  app.get("/", (req, res) => {
    res.json({ serverstatus: "ok" });
  });

  //=========apollo server=========
  const context = ({ req }) => {
    return {
      req,
      stripe,
      firebase,
      db,
      resolvers,
      admin,
      FieldValue,
      client,
    }; //* context variables for apollo
  };

  const apolloserver = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
    introspection: process.env.NODE_ENV !== "production",
    validationRules: [depthLimit(3)],
    formatError: (err) => {
      // Don't give the specific errors to the client
      if (
        err.extensions.code.startsWith("INTERNAL_SERVER_ERROR") &&
        process.env.NODE_ENV === "production"
      ) {
        return new Error("Internal server error");
      }
      if (
        err.extensions.code.startsWith("INTERNAL_SERVER_ERROR") &&
        process.env.NODE_ENV != "production"
      ) {
        return new Error(err.message);
      }

      if (
        err.extensions.code.startsWith("GRAPHQL_VALIDATION_FAILED") &&
        process.env.NODE_ENV === "production"
      ) {
        return new Error("bad graphql fields");
      }

      if (
        err.extensions.code.startsWith("GRAPHQL_VALIDATION_FAILED") &&
        process.env.NODE_ENV != "production"
      ) {
        return new Error(err.message);
      }
    },
  });
  apolloserver.start();
  apolloserver.applyMiddleware({ app });

  //=========Running this function everyday at 23:59=========
  cron.schedule("59 23 * * *", () => {
    console.log("---------------------");
    console.log("Running Cron Job");
    console.log("---------------------");
  });

  //=========server start on port 5000=========
  // if (cluster.isMaster) {
  //   for (let i = 0; i < numCpus; i++) {
  //     cluster.fork();
  //   }
  // } else {
  //   app.listen(PORT, () => {
  //     console.log(
  //       chalk.bgGreen.black(
  //         `server ${process.pid} running on http://localhost:${PORT} :D \n`
  //       )
  //     );
  //   });
  // }
  app.listen(PORT, () => {
    console.log(
      chalk.bgGreen.black(
        `server ${process.pid} running on http://localhost:${PORT} :D`
      )
    );
  });
}
startServer();
