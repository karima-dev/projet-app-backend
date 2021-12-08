var firebase = require("firebase");
require("firebase/database");

let variables = require("./variables");
let config = {
  apiKey: "AIzaSyDYtQ1YLUUqqE_L-vBoEBF2wWzfxN6lXiU",
  authDomain: "mabiblio-7a91f.firebaseapp.com",
  projectId: "mabiblio-7a91f",
  storageBucket: "mabiblio-7a91f.appspot.com",
  messagingSenderId: "191802065243",
  appId: "1:191802065243:web:f8f97d7ee4dc1f61e99a7e",
  databaseURL: "https://mabiblio-7a91f-default-rtdb.firebaseio.com",
};

firebase.initializeApp(config);
let firebaseDb = firebase.database();

module.exports = { firebaseDb };
