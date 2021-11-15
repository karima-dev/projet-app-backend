var firebase = require("firebase");
require("firebase/database");

let variables = require("./variables");
let config = {
  apiKey: variables.firebaseConfig.apiKey,
  authDomain: variables.firebaseConfig.authDomain,
  projectId: variables.firebaseConfig.projectId,
  storageBucket: variables.firebaseConfig.storageBucket,
  messagingSenderId: variables.firebaseConfig.messagingSenderId,
  appId: variables.firebaseConfig.appId,
  databaseURL: variables.firebaseConfig.databaseURL,
};

firebase.initializeApp(config);
let firebaseDb = firebase.database();

module.exports = { firebaseDb };
