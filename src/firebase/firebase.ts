// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
require("firebase/analytics");

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "@firebase/messaging";

import admin from "firebase-admin";
const Timestamp = admin.firestore.Timestamp;
const FieldValue = admin.firestore.FieldValue;

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "<your-api-key>",
  authDomain: "<your-auth-domain>",
  projectId: "<your-project-id>",
  storageBucket: "<your-storage-bucket-id>",
  messagingSenderId: "<your-message-sender-id>",
  appId: "<your-app-id>",
  measurementId: "<your-measurement-id>",
};

import serviceAccount from "./fbServiceAccountKey";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://fir-demo-7884d.firebaseio.com",
});

const db = admin.firestore();

firebase.initializeApp(firebaseConfig);
export { admin, firebase, db, FieldValue };
