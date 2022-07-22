let cartService = require("../../cart/service/cartService");
const Email = require("../../../utils/nodemailer");
let {logger} = require("../../../utils/pino");

class Order {
    async sendOrder(req, res) {
        try {
            let user_id = req.user.id;
            let info = await cartService.sendOrder(user_id);
            await cartService.resetCart(user_id);

            /*-------------------
                 NODEMAILER
            --------------------*/
        const newEmail = new Email({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                type: "login",
                user: "odessa35@ethereal.email",
                pass: 'keV8wHBpcB6qJ6CeDs'
            }
        });

        const mailOptions = {
            from: "Automatic Server",
            to: "odessa35@ethereal.email",
            subject: "Thanks for your Purchase!",
            html: `
                <h1>We received your order successfully</h1>

                <br>

                <p>Here i let you the code to recognize your order:
                <strong>${info.orderNumber}</strong>, Do not lose it!
                </p>

                <h3>Thanks for trust us!♥</h3>
                <h4>Atte: NCS FULL STACK DEVELOPER FROM ARGENTINA TO THE WHOLE WORLD</h4>
            `
        }

        await newEmail.sendEmail(mailOptions);
    
            res.render("order",{info});
        } catch (error) {
            logger.error(error);
        }
    }
}

module.exports = new Order();