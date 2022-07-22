let DAO = require("../../../models/cartModel");
let DAOorder = require("../../../models/orderModel");
let {logger} = require("../../../utils/pino");

class Cart {
    async showProducts(user_id) {
        try {
            let prodsInCart = await DAO.showProducts(user_id);
            return prodsInCart;
        } catch (error) {
            logger.error(error);
        }
    }

    async addProduct(id, size,email,user_id) {
        try {
            let newProd = await DAO.addProduct(id, size,email,user_id);
            return newProd;
        } catch (error) {
            logger.error(error);
        }
    }

    async deleteProd(id) {
        try {
            let delProd = await DAO.deleteProduct(id);
            return delProd;
        } catch (error) {
            logger.error(error);
        }
    }

    async showTotal(user_id) {
        try {
            let showTotal = await DAO.calculateTotal(user_id);
            return showTotal;
        } catch (error) {
            logger.error(error);
        }
    }

    async sendOrder(user_id) {
        try {
            let order = await DAOorder.sendOrder(user_id);
            return order;
        } catch (error) {
            logger.error(error);
        }
    }

    async resetCart(user_id) {
        try {
            let emptyCart = await DAO.resetCart(user_id);
            return emptyCart;
        } catch (error) {
            logger.error(error);
        }
    }
}

module.exports = new Cart();