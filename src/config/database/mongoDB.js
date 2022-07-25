const mongoose = require("mongoose");
// const { db_credential_mongo } = require("../index");
require("dotenv").config();
let {logger} = require("../../utils/pino");


let connection;

(async () => {
    try {
        connection = await mongoose.connect(process.env.MONGO_DB, { 
            useUnifiedTopology:true,
            useNewUrlParser: true,
         });
        logger.info("Mongo DB is connected");
    } catch (error) {
        logger.error(error);
    }
})()

module.exports = { connection, mongoose };