const firebase = require("firebase/app")
require("firebase")
const { firebaseKey } = require("../secrets")
firebase.initializeApp(firebaseKey)
const storage = firebase.storage()
exports.module = { storage: storage, firebase: firebase }