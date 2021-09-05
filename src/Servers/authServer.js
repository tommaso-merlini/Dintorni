//IMPORTS

//=====node=====
const express = require("express");
const app = express();

//=========jsonwebtoken=========
const jwt = require("jsonwebtoken");
app.use(express.json());


//=====misc=====
const chalk = require("chalk"); //console.log colors
const cluster = require("cluster");
const os = require("os");
require("dotenv").config();

//COSTANTS
const PORT = process.env.AUTH_SERVER_PORT;
const numCpus = os.cpus().length;



//!======server======

async function startServer() {
    //===================
    app.post("/login", (req, res) =>  {
      const username = req.body.username;
      const user = {username: username}
      const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN);
      res.json({accessToken})
    })
    
    const authenticateToken = (req, res, next) => {
      const authHeader = req.header["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token === null) return res.sendStatus(401);
    
      jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
      })
    }

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
