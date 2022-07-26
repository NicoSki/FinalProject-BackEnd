require("dotenv").config();

let config = {
    dev: process.env.NODE_ENV !== "production",
    port: process.env.PORT,
    cors: process.env.CORS,
    passSecret: process.env.PASSPORT_SECRET
}


let db_credential_mongo = {
    mongo: process.env.MONGO_DB
}



module.exports = { config, db_credential_mongo };