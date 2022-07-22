const mongoose = require("mongoose");
const crypto = require("crypto");
let DAOCart = require("./cartModel");
const { Schema } = mongoose;

let { logger } = require("../utils/pino");

const OrderSchema = new Schema({
    items: [String],
    orderNumber: { type: String },
    date: { type: Date, default: Date.now },
    state: { type: String },
    email: { type: String },
    user: { type: String }
});

let orderModel = mongoose.model("Order", OrderSchema);

class Order {

    async sendOrder(user_id) {
        try {
            let productsInCart = await DAOCart.showProducts(user_id);
            let format = productsInCart.map(e => `${e.title}x${e.amount}`);
            let order_code = crypto.randomBytes(10).toString("hex");
            let dat = new Date().toDateString();
            let state = "SENT"

            let data = {
                items: format,
                orderNumber: order_code,
                date: dat,
                state: state,
                email: productsInCart[0].email
            }

            let order = orderModel(data);
            await order.save();
            return order;
        } catch (error) {
            logger.error(error);
        }
    }
}


module.exports = new Order();