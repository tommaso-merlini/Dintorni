//IMPORTS

//=====node=====
const cron = require("node-cron");
const express = require("express");
const app = express();

//=====apollo=====
const { ApolloServer } = require("apollo-server-express");
const depthLimit = require("graphql-depth-limit");

//=====mongoose=====
require("../helpers/initMongoDB");

//=========firebase=========
const checkAuth = require("../firebase/checkAuth");
const {firebase} = require("../firebase/firebase");


//=========jsonwebtoken=========
const expressJwt = require("express-jwt");
app.use(express.json(), expressJwt({
  secret: process.env.SECRET_ACCESS_TOKEN,
  credentialsRequired: false,
  algorithms: ['HS256']
}));

//=====misc=====
const chalk = require("chalk"); //console.log colors
const cluster = require("cluster");
const os = require("os");
require("dotenv").config();
const cors = require('cors')
app.use(cors());

// const route = express.Router();

// route.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

//require apollo typedefs and resolvers
const resolvers = require("../GraphQL/resolvers");
const typeDefs = require("../GraphQL/typeDefs");

//COSTANTS
const PORT = process.env.SERVER_PORT;
const numCpus = os.cpus().length;

//limit the graphql query size
app.use('*', (req, res, next) => {
  const query = req.query.query || req.body.query || '';
  if (query.length > 2000) {
    throw new Error('Query too large');
  }
  next();
});



//!======server instance======

async function startServer() {
  //test
  // app.get('/', cors(corsOptions), (req, res, next) => {
  //   res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
  // })

  //=========apollo server=========
  const context = ({req}) => {
    return {user: req.user}
  };
  
  const apolloserver = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
    introspection: process.env.NODE_ENV !== "production",
    validationRules: [depthLimit(3)],
    formatError: (err) => {
      // Don't give the specific errors to the client
      if (err.message.startsWith("Database Error: ")) {
        return new Error("Internal server error");
      }

      if (err.extensions.code.startsWith("INTERNAL_SERVER_ERROR")) {
        return new Error(err.message);
      }

      if (err.extensions.code.startsWith("GRAPHQL_VALIDATION_FAILED")) {
        return new Error("bad graphql fields");
      }

      // Otherwise return the original error
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
  if (cluster.isMaster) {
    for (let i = 0; i < numCpus; i++) {
      cluster.fork();
    }
  } else {
    app.listen(PORT, () => {
      console.log(
        chalk.bgGreen.black(
          `server ${process.pid} running on http://localhost:${PORT} :D`
        )
      );
    });
  }
}
startServer();
