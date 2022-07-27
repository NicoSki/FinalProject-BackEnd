const mongoose = require("mongoose");
const { db_credential_mongo } = require("../index");
let {logger} = require("../../utils/pino");


let connection;

(async () => {
    try {
        connection = await mongoose.connect(db_credential_mongo.mongo,{ 
            useUnifiedTopology:true,
            useNewUrlParser: true,
         });
        logger.info("Mongo DB is connected");
    } catch (error) {
        logger.error(error);
    }
})()

module.exports = { connection, mongoose };