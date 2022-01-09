const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
//const User = require("../../src/Schema/User/User.model");

//const user = User.find();
//console.log(user);

exports.sendNotificationToTopic = functions.firestore
  .document("orders/{uid}")
  .onWrite(async (event) => {
    let message = {
      notification: {
        title: "titolo",
        body: "body",
      },
      topic: "boh",
    };

    let response = await admin.messaging().send(message);
    console.log(response);
  });
