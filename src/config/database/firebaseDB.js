let admin = require("firebase-admin");

let serviceAccount = require("./fire_cred/proyfinal-backend-firebase-adminsdk-dgjd3-907fea9047.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };