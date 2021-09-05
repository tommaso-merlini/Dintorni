// const cron = require("node-cron");
// const express = require("express");
// const app = express();
// const { ApolloServer } = require("apollo-server-express");
// const mongoose = require("mongoose");
// const chalk = require("chalk"); //console.log colors
// const { instrument } = require("@socket.io/admin-ui");
// require("dotenv").config();

// //=====redis=====
// const redis = require("redis");
// const bluebird = require("bluebird");

// //======socket.io server======
// // const http = require("http");
// // const server = http.createServer(app);
// // const { Server } = require("socket.io");
// // const io = new Server(server, {
// //   cors: ["http://localhost:19006/", "https://admin.socket.io/"],
// // });

// //require apollo typedefs and resolvers
// const resolvers = require("./GraphQL/resolvers");
// const typeDefs = require("./GraphQL/typeDefs");

// const PORT = process.env.PORT;

// //starting the server asynchronusly
// console.log("==========server status==========");
// async function startServer() {
//   //=========redis server=========
//   const client = await redis.createClient();
//   bluebird.promisifyAll(redis.RedisClient.prototype);
//   bluebird.promisifyAll(redis.Multi.prototype);

//   console.log(chalk.bgGreen.black("redis server started :D"));
//   client.on("error", (err) => {
//     console.log("redis error: " + err);
//   });

//   //=========apollo server=========
//   const apolloserver = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: { client },
//   });
//   await apolloserver.start();
//   apolloserver.applyMiddleware({ app });

//   //=========mongoose connection=========
//   await mongoose.connect(process.env.MONGODB_ATLAS_URI, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   });
//   console.log(chalk.bgGreen.black("mongoose connected :D"));

//   // const orderChangeStream = mongoose.connection.collection("orders").watch();
//   // orderChangeStream.on("change", (change) => {
//   //   switch (change.operationType) {
//   //     case "insert":
//   //       const order = {
//   //         _id: change.fullDocument._id,
//   //         companyId: change.fullDocument.companyId,
//   //         userId: change.fullDocument.userId,
//   //       };
//   //       console.log("new order: ", order);
//   //   }
//   // });

//   //=========Running this function everyday at 23:59=========
//   cron.schedule("59 23 * * *", () => {
//     console.log("---------------------");
//     console.log("Running Cron Job");
//     console.log("---------------------");
//   });

//   //=========server start on port 5000=========
//   app.listen(PORT, () => {
//     console.log(
//       chalk.bgGreen.black(`server running on http://localhost:${PORT} :D`)
//     );
//     console.log("===========server logs===========");
//   });

//   //=========socket.io connection=========
//   // await io.on("connection", async (socket) => {
//   //   await console.log(chalk.greenBright(`${socket.id} connected`));

//   //   socket.on("disconnect", () => {
//   //     console.log(chalk.redBright(`${socket.id} disconnected`));
//   //   });
//   // });

//   // await server.listen(9000, () => {
//   //   console.log(chalk.bgGreen.black("socket listening on *:9000"));
//   // });

//   // instrument(io, { auth: false });
// }
// startServer();
