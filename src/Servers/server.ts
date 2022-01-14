//IMPORTS

//=====node=====
import cron from "node-cron";
import express, { Application, Request, Response } from "express";
import { createServer } from "http";
const app: Application = express();
const httpServer = createServer(app);
import rateLimit from "express-rate-limit";

//=====apollo=====
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { GraphQLError } from "graphql";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

//=====mongoose=====
require("../helpers/initMongoDB");

//=========firebase=========
//import checkAuth from "../firebase/checkAuth";
import { admin, firebase, db, FieldValue } from "../firebase/firebase";

//=========stripe=========
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

//=========jsonwebtoken=========
//const expressJwt = require("express-jwt");
app.use(express.json());

//=========RedisPubSub=========
import { RedisPubSub } from "graphql-redis-subscriptions";
const pubsub = new RedisPubSub();

//=====misc=====
import chalk from "chalk"; //console.log colors
import cluster from "cluster";
import os from "os";
require("dotenv").config();
import cors from "cors";
import { request } from "http";
app.use(cors());

//require apollo typedefs and resolvers
import resolvers from "../GraphQL/resolvers";
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
  const context = ({ req }: { req: Request }) => {
    return {
      req,
      stripe,
      firebase,
      db,
      resolvers,
      admin,
      FieldValue,
      client,
      pubsub,
    }; //* context variables for apollo
  };

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      // These are imported from `graphql`.
      execute,
      subscribe,
    },
    {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // Pass a different path here if your ApolloServer serves at
      // a different path.
      path: "/graphql",
    }
  );

  const apolloserver = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart(): Promise<any> {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    context: context,
    introspection: process.env.NODE_ENV !== "production",
    validationRules: [depthLimit(3)],
    formatError: (err) => {
      // Don't give the specific errors to the client (in production)
      if (
        err.extensions!.code.startsWith("INTERNAL_SERVER_ERROR") &&
        process.env.NODE_ENV === "production"
      ) {
        return new Error("internal server error");
      }

      if (
        err.extensions!.code.startsWith("GRAPHQL_VALIDATION_FAILED") &&
        process.env.NODE_ENV === "production"
      ) {
        return new Error("bad graphql fields");
      }

      if (
        err.extensions!.code.startsWith("GRAPHQL_VALIDATION_FAILED") &&
        process.env.NODE_ENV === "production"
      ) {
        return new Error("graphql validation failed");
      }

      return err;
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
  httpServer.listen(PORT, () => {
    console.log(
      chalk.bgGreen.black(
        `server ${process.pid} running on http://localhost:${PORT} :D`
      )
    );
  });
}
startServer();
