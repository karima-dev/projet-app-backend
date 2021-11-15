const childsToArray = (data) => Object.values(data)
var firebaseConfig = require("../Configs/firebase")
const db = firebaseConfig.firebaseDb;
 
 
 

module.exports = { childsToArray }