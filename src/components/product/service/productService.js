let DAO = require("../../../models/productModel");
let {logger} = require("../../../utils/pino");


class Product {
    async add(prod) {
        try {
            let newProd = await DAO.add(prod);
            return newProd;
        } catch (error) {
            logger.error(error);
        }
    }

    async categories(){
        try {
            let response = await DAO.categories();
            return response;
        } catch (error) {
            logger.error(error);
        }
    }

    async allProducts(){
        try {
            let response = await DAO.allProducts();
            return response;
        } catch (error) {
            logger.error(error);
        }
    }

    async deleteProduct(id){
        try {
            let response = await DAO.deleteProduct(id);
            return response;
        } catch (error) {
            logger.error(error);
        }
    }

    async showProduct(id){
        try {
            let response = await DAO.particularProduct(id);
            return response;
        } catch (error) {
            logger.error(error);
        }
    }

    async editProduct(id,edition){
        try {
            let response = await DAO.editProduct(id,edition);
            return response;
        } catch (error) {
            logger.error(error);
        }
    }
}

module.exports = new Product();