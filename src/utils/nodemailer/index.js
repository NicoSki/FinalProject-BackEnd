let nodemailer = require("nodemailer");
let { logger } = require("../pino");

class Email {
    constructor(settings) {
        this.createTransport = nodemailer.createTransport(settings);
    }

    sendEmail(email) {
        try {
            this.createTransport.sendMail(email, function (error) {
                if (error) logger.fatal(error);

                this.createTransport.close();
            })
        } catch (error) {
            logger.fatal(error);
        }
    }
}

module.exports = Email;