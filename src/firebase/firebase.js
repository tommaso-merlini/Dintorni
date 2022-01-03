// Firebase App (the core Firebase SDK) is always required and must be listed first
const firebase = require("firebase/app");
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
require("firebase/analytics");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const admin = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyAWes5EYHZXsum0MfGz-Dl9-bVbxgA4dU0",
  authDomain: "fir-demo-7884d.firebaseapp.com",
  databaseURL: "https://fir-demo-7884d.firebaseio.com",
  projectId: "fir-demo-7884d",
  storageBucket: "fir-demo-7884d.appspot.com",
  messagingSenderId: "580322015075",
  appId: "1:580322015075:web:a58589848f3a5f7ecfc556",
  measurementId: "G-0NHPMZSFT8",
};

const serviceAccount = require("./fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-demo-7884d.firebaseio.com",
});

const db = getFirestore();

firebase.initializeApp(firebaseConfig);
module.exports = { admin, firebase, db, FieldValue };
