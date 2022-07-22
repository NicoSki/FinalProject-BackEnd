const mongoose = require("mongoose");
const { Schema } = mongoose;
let DAOProd = require("./productModel");
let DAOUser = require("./userModel");
let { logger } = require("../utils/pino");

const CartSchema = new Schema({
    title: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    amount: { type: Number, required: true },
    inCart: { type: Boolean, default: false },
    email: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: String }
});

let cartModel = mongoose.model("Cart", CartSchema);

class Cart {

    async addProduct(id, size, email, user_id) {
        try {

            let prodAdded = await DAOProd.particularProduct(id);
            let userFound = await DAOUser.findOne({ email: email });
            let productInCart = await cartModel.findOne({ title: prodAdded.title });

            if (!productInCart) {
                let prod_struct = {
                    title: prodAdded.title,
                    img: prodAdded.img,
                    price: prodAdded.price,
                    size,
                    amount: 1,
                    inCart: true,
                    email: userFound.email,
                    address: userFound.address,
                    date: new Date().toDateString(),
                    user: user_id
                }

                let newProd = cartModel(prod_struct);
                await newProd.save();
                return newProd;
            }

            let prodModified = await cartModel.updateOne({ title: prodAdded.title }, { $inc: { amount: 1 } });
            return prodModified;

        } catch (error) {
            logger.error(error);
        }
    }


    async showProducts(user_id) {
        try {
            let productsCart = await cartModel.find({ user: user_id });
            return productsCart;
        } catch (error) {
            logger.error(error);
        }
    }

    async deleteProduct(id) {
        try {
            let prodDeleted = await cartModel.deleteOne({ "_id": id });
            return prodDeleted;
        } catch (error) {
            logger.error(error);
        }
    }

    async calculateTotal(user_id) {
        try {
            let productsCart = await cartModel.find({user: user_id});
            let totalPrice = productsCart.map(e => e.price * e.amount);
            let finalPrice = totalPrice.reduce((a, b) => a + b, 0);
            return finalPrice;
        } catch (error) {
            logger.error(error);
        }
    }

    async resetCart(user_id) {
        try {
            let emptyCart = await cartModel.deleteMany({ user: user_id });
            return emptyCart;
        } catch (error) {
            logger.error(error);
        }
    }
}


module.exports = new Cart();